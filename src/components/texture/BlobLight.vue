<script setup lang="ts">
interface Props {
  color?: "warm" | "cool" | "violet" | "emerald";
  size?: number;
  x?: string;
  y?: string;
  opacity?: number;
  blur?: number;
}

const props = withDefaults(defineProps<Props>(), {
  color: "warm",
  size: 480,
  x: "20%",
  y: "30%",
  opacity: 0.55,
  blur: 120,
});

const colorMap: Record<NonNullable<Props["color"]>, string> = {
  warm: "rgb(255 107 53 / 0.55)",
  cool: "rgb(0 102 255 / 0.45)",
  violet: "rgb(120 90 255 / 0.4)",
  emerald: "rgb(16 185 129 / 0.32)",
};
</script>

<template>
  <div
    class="pointer-events-none absolute -z-10 will-change-transform"
    :style="{
      width: `${props.size}px`,
      height: `${props.size}px`,
      left: props.x,
      top: props.y,
      opacity: props.opacity,
      transform: 'translate(-50%, -50%)',
      background: `radial-gradient(closest-side, ${colorMap[props.color]} 0%, transparent 70%)`,
      filter: `blur(${props.blur}px)`,
    }"
    aria-hidden="true"
  />
</template>
