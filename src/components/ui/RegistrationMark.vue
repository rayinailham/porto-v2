<script setup lang="ts">
/**
 * RegistrationMark — Swiss printer's registration crosshair.
 * Rotates slowly while in viewport, freezes when off-screen (CSS-only).
 * Used as a non-decorative-feeling motion accent in section corners.
 */
interface Props {
  size?: number;
  speed?: number; // seconds per full rotation
  reverse?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 28,
  speed: 38,
  reverse: false,
});
</script>

<template>
  <span
    class="reg-mark relative inline-block text-ink-faint"
    :class="reverse ? 'reg-mark--rev' : ''"
    :style="{ width: `${size}px`, height: `${size}px`, ['--spin' as string]: `${speed}s` }"
    aria-hidden="true"
  >
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      stroke-width="0.85"
    >
      <circle cx="16" cy="16" r="11" />
      <circle cx="16" cy="16" r="5.5" />
      <line x1="16" y1="0" x2="16" y2="9" />
      <line x1="16" y1="23" x2="16" y2="32" />
      <line x1="0" y1="16" x2="9" y2="16" />
      <line x1="23" y1="16" x2="32" y2="16" />
    </svg>
  </span>
</template>

<style scoped>
.reg-mark {
  animation: reg-spin var(--spin, 38s) linear infinite;
}
.reg-mark--rev {
  animation-direction: reverse;
}
@keyframes reg-spin {
  to {
    transform: rotate(360deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .reg-mark {
    animation: none;
  }
}
</style>
