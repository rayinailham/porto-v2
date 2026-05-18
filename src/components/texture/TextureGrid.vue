<script setup lang="ts">
interface Props {
  /** 0-1, default 0.03 (3%) */
  opacity?: number;
  /** Grid cell size in px */
  size?: number;
  /** Optional fade mask edges */
  fade?: "none" | "edges" | "top" | "bottom";
}

const props = withDefaults(defineProps<Props>(), {
  opacity: 0.03,
  size: 56,
  fade: "edges",
});

const fadeMask: Record<NonNullable<Props["fade"]>, string> = {
  none: "none",
  edges:
    "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
  top: "linear-gradient(180deg, black 0%, transparent 80%)",
  bottom: "linear-gradient(0deg, black 0%, transparent 80%)",
};
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 -z-10"
    :style="{
      opacity: props.opacity,
      backgroundImage: `linear-gradient(to right, rgb(255 255 255 / 1) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 1) 1px, transparent 1px)`,
      backgroundSize: `${props.size}px ${props.size}px`,
      maskImage: fadeMask[props.fade],
      WebkitMaskImage: fadeMask[props.fade],
    }"
    aria-hidden="true"
  />
</template>
