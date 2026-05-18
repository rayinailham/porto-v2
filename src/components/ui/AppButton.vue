<script setup lang="ts">
import { computed } from "vue";

interface Props {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  to?: string;
  external?: boolean;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  size: "md",
});

const tag = computed(() => {
  if (props.to) return "router-link" as const;
  if (props.href) return "a" as const;
  return "button" as const;
});

const sizeCls = {
  sm: "h-8 px-4 text-[12px]",
  md: "h-10 px-5 text-[13px]",
  lg: "h-12 px-6 text-[13.5px]",
};

const variantCls = {
  primary:
    "bg-ink-primary text-bg-base hover:bg-accent-warm hover:text-bg-base",
  ghost:
    "bg-transparent text-ink-primary border border-line hover:border-ink-primary",
  outline:
    "bg-transparent text-ink-primary border border-ink-primary hover:bg-ink-primary hover:text-bg-base",
};
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :to="to"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :aria-label="ariaLabel"
    class="group relative inline-flex select-none items-center justify-between gap-6 font-mono uppercase tracking-[0.18em] transition-all duration-500 ease-haptic active:translate-y-px"
    :class="[sizeCls[size], variantCls[variant]]"
  >
    <span class="whitespace-nowrap">
      <slot />
    </span>
    <span
      class="inline-flex shrink-0 items-center justify-center transition-transform duration-500 ease-haptic group-hover:translate-x-1"
      aria-hidden="true"
    >
      <slot name="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="square"
          stroke-linejoin="miter"
          class="h-3.5 w-3.5"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </slot>
    </span>
  </component>
</template>
