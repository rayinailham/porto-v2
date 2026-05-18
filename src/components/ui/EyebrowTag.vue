<script setup lang="ts">
interface Props {
  label?: string;
  /** Optional accent color class for the dot */
  dot?: boolean;
}
withDefaults(defineProps<Props>(), { dot: false });
</script>

<template>
  <span class="eyebrow">
    <span
      v-if="dot"
      class="h-1.5 w-1.5 rounded-full bg-accent-warm"
      aria-hidden="true"
    />
    <span>{{ label }}<slot /></span>
  </span>
</template>
