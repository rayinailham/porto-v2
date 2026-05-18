<script setup lang="ts">
/**
 * EqualizerBars — minimal Swiss audio visualization.
 * Pure CSS animation, hardware-accelerated, deterministic phase per bar.
 * Used as a subtle motion graphic when referencing audio / theme songs.
 */
interface Props {
  bars?: number;
  height?: number; // px
  width?: number; // bar width px
  gap?: number; // px
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  bars: 9,
  height: 28,
  width: 2,
  gap: 4,
  color: "currentColor",
});

// Pseudo-random but deterministic delays/durations per bar
const seeds = Array.from({ length: props.bars }, (_, i) => {
  const dur = 0.75 + ((i * 0.21) % 0.85);
  const delay = ((i * 0.137) % 0.9) * -1; // negative so they're already mid-cycle
  const baseScale = 0.3 + ((i * 0.31) % 0.55);
  return { dur, delay, baseScale };
});
</script>

<template>
  <span
    class="eq-root inline-flex items-end"
    :style="{ height: `${height}px`, gap: `${gap}px`, color }"
    aria-hidden="true"
  >
    <span
      v-for="(s, i) in seeds"
      :key="i"
      class="eq-bar"
      :style="{
        width: `${width}px`,
        animationDuration: `${s.dur}s`,
        animationDelay: `${s.delay}s`,
        ['--base' as string]: s.baseScale,
      }"
    />
  </span>
</template>

<style scoped>
.eq-root {
  /* Nothing here — bars handle their own anim */
}
.eq-bar {
  display: inline-block;
  height: 100%;
  background-color: currentColor;
  transform-origin: bottom center;
  transform: scaleY(var(--base));
  animation: eq-pulse linear infinite alternate;
  will-change: transform;
}

@keyframes eq-pulse {
  0% {
    transform: scaleY(var(--base));
  }
  100% {
    transform: scaleY(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .eq-bar {
    animation: none;
    transform: scaleY(0.6);
  }
}
</style>
