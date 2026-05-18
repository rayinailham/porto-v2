/**
 * Swiss editorial scroll-reveal — minimal, crisp, no blur.
 * - Honors prefers-reduced-motion
 * - Targets `.reveal-init` for fade+lift, `.type-reveal` for clip-path sweep
 * - Detects already-in-viewport elements at mount and plays them immediately
 *   (avoids the stuck-invisible-above-the-fold case).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onBeforeUnmount, nextTick, type Ref } from "vue";

interface Options {
  selector?: string;
  stagger?: number;
  start?: string;
  duration?: number;
}

export function useReveal(root: Ref<HTMLElement | null>, opts: Options = {}) {
  const {
    selector = ".reveal-init",
    stagger = 0.06,
    start = "top 88%",
    duration = 0.8,
  } = opts;

  let triggers: ScrollTrigger[] = [];

  onMounted(async () => {
    if (!root.value) return;
    await nextTick();
    if (!root.value) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const typeItems = Array.from(
      root.value.querySelectorAll<HTMLElement>(".type-reveal"),
    );
    const items = Array.from(root.value.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0 && typeItems.length === 0) return;

    if (reduced) {
      items.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      typeItems.forEach((el) => {
        el.style.clipPath = "none";
      });
      return;
    }

    const isInViewport = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.95 && r.bottom > 0;
    };

    // Group standard reveals by [data-reveal-group]
    const groups = new Map<HTMLElement, HTMLElement[]>();
    items.forEach((el) => {
      const parent =
        el.closest<HTMLElement>("[data-reveal-group]") ?? root.value!;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent)!.push(el);
    });

    groups.forEach((groupItems, parent) => {
      const above = isInViewport(parent);
      if (above) {
        gsap.fromTo(
          groupItems,
          { y: 14, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            ease: "power3.out",
            stagger,
            delay: 0.05,
          },
        );
        return;
      }
      const tween = gsap.fromTo(
        groupItems,
        { y: 14, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration,
          ease: "power3.out",
          stagger,
          scrollTrigger: {
            trigger: parent,
            start,
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
      const t = tween.scrollTrigger;
      if (t) triggers.push(t);
    });

    // Type-reveal — left-to-right clip sweep
    typeItems.forEach((el) => {
      const above = isInViewport(el);
      if (above) {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 1.05, ease: "power4.out", delay: 0.1 },
        );
        return;
      }
      const tween = gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
      const t = tween.scrollTrigger;
      if (t) triggers.push(t);
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());
  });

  onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill());
    triggers = [];
  });
}
