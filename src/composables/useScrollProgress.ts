/**
 * Scroll progress hairline — tracks document scroll, returns 0..1.
 * Updates a CSS variable `--scroll-progress` on document.documentElement
 * so consumers can `scaleX: var(--scroll-progress)` cheaply (transform only).
 */
import { onMounted, onBeforeUnmount } from "vue";

export function useScrollProgress() {
  let raf: number | null = null;

  const update = () => {
    raf = null;
    const scrollTop = window.scrollY;
    const max =
      document.documentElement.scrollHeight - window.innerHeight || 1;
    const p = Math.min(1, Math.max(0, scrollTop / max));
    document.documentElement.style.setProperty("--scroll-progress", String(p));
  };

  const onScroll = () => {
    if (raf !== null) return;
    raf = requestAnimationFrame(update);
  };

  onMounted(() => {
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
  });

  onBeforeUnmount(() => {
    if (raf !== null) cancelAnimationFrame(raf);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", update);
  });
}
