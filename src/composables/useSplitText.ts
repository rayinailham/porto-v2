/**
 * Split-text reveal — wraps each word inside a clip mask, then animates
 * the inner span from translateY(110%) → 0 with a tight stagger.
 *
 * Usage:
 *   <h1 ref="el" data-split="words"> ... </h1>
 *   useSplitText(el)
 *
 * - Honors prefers-reduced-motion (renders unchanged, no transform).
 * - Preserves nested elements (e.g. <span class="italic-accent">) by walking
 *   the tree and only splitting text nodes.
 * - One ScrollTrigger per element; cleaned up on unmount.
 * - Idempotent: marks split nodes so re-running on the same root is safe.
 * - Calls ScrollTrigger.refresh() after Lenis is up so positions are correct.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onBeforeUnmount, onMounted, type Ref, nextTick } from "vue";

gsap.registerPlugin(ScrollTrigger);

interface Options {
  selector?: string;
  start?: string;
  duration?: number;
  stagger?: number;
  ease?: string;
}

const SPLIT_DONE = "data-split-done";

function splitNode(node: Node, frag: DocumentFragment | HTMLElement) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    if (!text.trim()) {
      frag.appendChild(document.createTextNode(text));
      return;
    }
    const tokens = text.split(/(\s+)/);
    tokens.forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
        return;
      }
      const wrap = document.createElement("span");
      wrap.className = "split-word";
      const inner = document.createElement("span");
      inner.className = "split-inner";
      inner.textContent = tok;
      wrap.appendChild(inner);
      frag.appendChild(wrap);
    });
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    frag.appendChild(node.cloneNode(true));
    return;
  }

  const el = node as HTMLElement;
  // Don't split inside elements explicitly opted out
  if (el.dataset.splitSkip !== undefined) {
    frag.appendChild(el.cloneNode(true));
    return;
  }

  const clone = el.cloneNode(false) as HTMLElement;
  el.childNodes.forEach((child) => splitNode(child, clone));
  frag.appendChild(clone);
}

function splitElement(el: HTMLElement) {
  if (el.getAttribute(SPLIT_DONE) === "1") return;
  const frag = document.createDocumentFragment();
  el.childNodes.forEach((child) => splitNode(child, frag));
  el.innerHTML = "";
  el.appendChild(frag);
  el.setAttribute(SPLIT_DONE, "1");
}

export function useSplitText(root: Ref<HTMLElement | null>, opts: Options = {}) {
  const {
    selector = "[data-split='words']",
    start = "top 88%",
    duration = 0.95,
    stagger = 0.045,
    ease = "expo.out",
  } = opts;

  const triggers: ScrollTrigger[] = [];

  onMounted(async () => {
    if (!root.value) return;
    // Wait one tick so child components have rendered
    await nextTick();
    if (!root.value) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const targets = Array.from(root.value.querySelectorAll<HTMLElement>(selector));
    targets.forEach((el) => {
      splitElement(el);
      const inners = el.querySelectorAll<HTMLElement>(".split-inner");
      if (!inners.length) return;

      if (reduced) {
        // No transform — text already visible from CSS
        return;
      }

      // Set initial state via GSAP only (CSS no longer hides it).
      gsap.set(inners, { yPercent: 110 });

      // If element is already in / past viewport at mount (above the fold),
      // ScrollTrigger may not fire its onEnter. Detect that and play immediately.
      const rect = el.getBoundingClientRect();
      const inViewport = rect.top < window.innerHeight * 0.95;

      if (inViewport) {
        gsap.to(inners, {
          yPercent: 0,
          duration,
          ease,
          stagger,
          delay: 0.08,
        });
        return;
      }

      const tween = gsap.to(inners, {
        yPercent: 0,
        duration,
        ease,
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: "play none none none",
          once: true,
        },
      });
      const t = tween.scrollTrigger;
      if (t) triggers.push(t);
    });

    // Refresh ScrollTrigger after layout settles (Lenis, fonts, etc.)
    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill());
  });
}
