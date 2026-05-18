<script setup lang="ts">
/**
 * StarMark — Suisei's signature five-point star, tuned for inline display.
 * Slow rotation when `spin` is true. Outer glow on hover (parent-driven).
 */
interface Props {
  size?: number;
  spin?: boolean;
}
withDefaults(defineProps<Props>(), { size: 22, spin: false });
</script>

<template>
  <span
    class="star-mark inline-flex items-center justify-center"
    :class="spin ? 'star-mark--spin' : ''"
    :style="{ width: `${size}px`, height: `${size}px` }"
    aria-hidden="true"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1">
      <path
        d="M12 2.6 14.6 9.4 21.8 9.8 16.2 14.4 18 21.4 12 17.4 6 21.4 7.8 14.4 2.2 9.8 9.4 9.4 Z"
        stroke-linejoin="round"
        stroke-linecap="round"
      />
    </svg>
  </span>
</template>

<style scoped>
.star-mark svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 4px rgba(92, 220, 255, 0.45));
}

.star-mark--spin svg {
  animation: sm-rotate 22s linear infinite;
  transform-origin: center;
}

@keyframes sm-rotate {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .star-mark--spin svg {
    animation: none;
  }
}
</style>
