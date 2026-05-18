/**
 * Text rotator — cycles through a list of strings with a smooth clip-mask
 * sweep. Used for "Currently / Now / On rotation" style typographic moments.
 *
 * Usage:
 *   const idx = useTextRotator(items.length, 3200)
 *   <span>{{ items[idx.value] }}</span>
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

export function useTextRotator(length: number, intervalMs = 3200) {
  const index = ref(0);
  let timer: number | null = null;

  onMounted(() => {
    if (length <= 1) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    timer = window.setInterval(() => {
      index.value = (index.value + 1) % length;
    }, intervalMs);
  });

  onBeforeUnmount(() => {
    if (timer !== null) window.clearInterval(timer);
  });

  return index;
}
