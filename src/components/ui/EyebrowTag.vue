<script setup lang="ts">
interface Props {
  label?: string;
  /** Optional warm dot prefix */
  dot?: boolean;
}
withDefaults(defineProps<Props>(), { dot: false });
</script>

<template>
  <span class="eyebrow">
    <span
      v-if="dot"
      class="h-1 w-1 rounded-full bg-accent-warm"
      aria-hidden="true"
    />
    <span>{{ label }}<slot /></span>
  </span>
</template>
