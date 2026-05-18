<script setup lang="ts">
interface Props {
  /** Optional emphasis variant for primary stack chips */
  variant?: "default" | "warm" | "cool";
}
withDefaults(defineProps<Props>(), { variant: "default" });
</script>

<template>
  <span
    class="chip-mono transition-colors duration-300 ease-haptic"
    :class="{
      'border-accent-warm/30 text-accent-warm/90': variant === 'warm',
      'border-accent-primary/30 text-accent-primary/90': variant === 'cool',
    }"
  >
    <slot />
  </span>
</template>
