/**
 * Scroll-reveal helper using GSAP + IntersectionObserver-friendly ScrollTrigger.
 * - Honors prefers-reduced-motion (skips animation, just sets visible).
 * - Targets `.reveal-init` items inside the provided root.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onMounted, onBeforeUnmount, type Ref } from "vue";

interface Options {
  selector?: string;
  stagger?: number;
  start?: string;
  duration?: number;
}

export function useReveal(root: Ref<HTMLElement | null>, opts: Options = {}) {
  const {
    selector = ".reveal-init",
    stagger = 0.08,
    start = "top 85%",
    duration = 0.9,
  } = opts;

  let triggers: ScrollTrigger[] = [];

  onMounted(() => {
    if (!root.value) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(root.value.querySelectorAll<HTMLElement>(selector));
    if (items.length === 0) return;

    if (reduced) {
      items.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
        el.style.filter = "none";
      });
      return;
    }

    // Group items by closest section so stagger feels natural per section.
    const groups = new Map<HTMLElement, HTMLElement[]>();
    items.forEach((el) => {
      const parent =
        el.closest<HTMLElement>("[data-reveal-group]") ?? root.value!;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent)!.push(el);
    });

    groups.forEach((groupItems, parent) => {
      const tween = gsap.fromTo(
        groupItems,
        { y: 28, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
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
  });

  onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill());
    triggers = [];
  });
}
