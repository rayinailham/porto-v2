<script setup lang="ts">
interface Props {
  /** Color of the dot indicator */
  color?: "success" | "warm" | "cool" | "muted";
  /** Show pulsing aura */
  pulse?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  color: "success",
  pulse: true,
});

const colorVar: Record<NonNullable<Props["color"]>, string> = {
  success: "var(--accent-success)",
  warm: "var(--accent-warm)",
  cool: "var(--ink-primary)",
  muted: "var(--ink-muted)",
};
</script>

<template>
  <span
    class="relative inline-flex h-1.5 w-1.5 shrink-0 rounded-full"
    :style="{ backgroundColor: colorVar[props.color] }"
    aria-hidden="true"
  >
    <span
      v-if="props.pulse"
      class="absolute inset-[-3px] rounded-full opacity-20"
      :style="{
        backgroundColor: colorVar[props.color],
        animation: 'pulse-soft 2.4s ease-in-out infinite',
      }"
    />
  </span>
</template>
