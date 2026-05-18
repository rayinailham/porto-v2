<script setup lang="ts">
interface Props {
  /** Optional emphasis variant for primary stack chips */
  variant?: "default" | "warm" | "cool";
}
withDefaults(defineProps<Props>(), { variant: "default" });
</script>

<template>
  <span
    class="chip-mono transition-colors duration-300"
    :class="{
      'border-accent-warm/40 text-accent-warm': variant === 'warm',
    }"
  >
    <slot />
  </span>
</template>
