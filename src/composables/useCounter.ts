/**
 * Count-up animation for numeric metrics.
 * Tied to ScrollTrigger so it only fires when the element enters the viewport.
 * Honors prefers-reduced-motion (just shows final value instantly).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onBeforeUnmount, onMounted, type Ref } from "vue";

interface Options {
  selector?: string;
  duration?: number;
  start?: string;
}

export function useCounter(root: Ref<HTMLElement | null>, opts: Options = {}) {
  const {
    selector = "[data-counter]",
    duration = 1.6,
    start = "top 90%",
  } = opts;

  const triggers: ScrollTrigger[] = [];

  onMounted(() => {
    if (!root.value) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const items = Array.from(root.value.querySelectorAll<HTMLElement>(selector));
    items.forEach((el) => {
      const target = parseFloat(el.dataset.counter ?? "0");
      const decimals = parseInt(el.dataset.counterDecimals ?? "0", 10);
      const suffix = el.dataset.counterSuffix ?? "";
      const prefix = el.dataset.counterPrefix ?? "";

      if (reduced || !Number.isFinite(target)) {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        return;
      }

      const obj = { v: 0 };
      const tween = gsap.to(obj, {
        v: target,
        duration,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = `${prefix}${obj.v.toFixed(decimals)}${suffix}`;
        },
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
  });

  onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill());
  });
}
