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
  cool: "var(--accent-primary)",
  muted: "var(--ink-muted)",
};
</script>

<template>
  <span
    class="relative inline-flex h-2 w-2 shrink-0 rounded-full"
    :style="{ backgroundColor: colorVar[props.color] }"
    aria-hidden="true"
  >
    <span
      v-if="props.pulse"
      class="absolute inset-[-4px] rounded-full opacity-25"
      :style="{
        backgroundColor: colorVar[props.color],
        animation: 'pulse-soft 2.4s ease-in-out infinite',
      }"
    />
  </span>
</template>
