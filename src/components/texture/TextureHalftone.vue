<script setup lang="ts">
interface Props {
  position?: "top" | "bottom";
  opacity?: number;
}

const props = withDefaults(defineProps<Props>(), {
  position: "top",
  opacity: 0.18,
});

const fadeDirection =
  props.position === "top"
    ? "linear-gradient(180deg, black 0%, transparent 100%)"
    : "linear-gradient(0deg, black 0%, transparent 100%)";
</script>

<template>
  <div
    class="pointer-events-none absolute inset-x-0 -z-10 h-40"
    :class="props.position === 'top' ? 'top-0' : 'bottom-0'"
    :style="{
      opacity: props.opacity,
      backgroundImage: `radial-gradient(rgb(255 255 255 / 1) 1px, transparent 1.4px)`,
      backgroundSize: `8px 8px`,
      maskImage: fadeDirection,
      WebkitMaskImage: fadeDirection,
    }"
    aria-hidden="true"
  />
</template>
