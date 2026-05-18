/**
 * Lenis smooth scroll + GSAP integration.
 * Disabled on mobile (<1024px) and when prefers-reduced-motion is set.
 */
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onBeforeUnmount, onMounted } from "vue";

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function getLenis() {
  return lenisInstance;
}

export function useSmoothScroll() {
  let rafId: number | null = null;

  onMounted(() => {
    if (typeof window === "undefined") return;

    const isDesktop = window.innerWidth >= 1024;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || reduced) {
      // Native scroll only. Still init ScrollTrigger refresh on resize.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
    });

    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Sync gsap ticker
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.refresh();
  });

  onBeforeUnmount(() => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    lenisInstance?.destroy();
    lenisInstance = null;
  });
}
