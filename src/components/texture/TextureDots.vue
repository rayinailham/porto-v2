<script setup lang="ts">
interface Props {
  opacity?: number;
  size?: number;
  fade?: "none" | "edges" | "top";
}

const props = withDefaults(defineProps<Props>(), {
  opacity: 0.05,
  size: 18,
  fade: "edges",
});

const fadeMask = {
  none: "none",
  edges: "radial-gradient(ellipse 70% 60% at 50% 50%, black 40%, transparent 100%)",
  top: "linear-gradient(180deg, black 0%, transparent 80%)",
};
</script>

<template>
  <div
    class="pointer-events-none absolute inset-0 -z-10"
    :style="{
      opacity: props.opacity,
      backgroundImage: `radial-gradient(rgb(255 255 255 / 0.85) 1px, transparent 1px)`,
      backgroundSize: `${props.size}px ${props.size}px`,
      maskImage: fadeMask[props.fade],
      WebkitMaskImage: fadeMask[props.fade],
    }"
    aria-hidden="true"
  />
</template>
