/**
 * Swiss editorial scroll-reveal — minimal, crisp, no blur.
 * - Honors prefers-reduced-motion
 * - Targets `.reveal-init` for fade+lift, `.type-reveal` for clip-path sweep
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
    stagger = 0.06,
    start = "top 88%",
    duration = 0.8,
  } = opts;

  let triggers: ScrollTrigger[] = [];

  onMounted(() => {
    if (!root.value) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Type-reveal — clip-path sweep on big headlines
    const typeItems = Array.from(
      root.value.querySelectorAll<HTMLElement>(".type-reveal"),
    );

    // Standard reveal
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

    // Group standard reveals by [data-reveal-group]
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

    // Type-reveal — left-to-right clip sweep, no fade (keeps contrast crisp)
    typeItems.forEach((el) => {
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
  });

  onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill());
    triggers = [];
  });
}
