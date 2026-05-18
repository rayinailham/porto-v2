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
  sm: "h-9 pl-4 pr-1.5 text-[13px] gap-2",
  md: "h-11 pl-5 pr-1.5 text-[14px] gap-2.5",
  lg: "h-12 pl-6 pr-2 text-[15px] gap-3",
};

const iconSizeCls = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-9 w-9",
};

const variantCls = {
  primary:
    "bg-ink-primary text-bg-base hover:bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]",
  ghost:
    "bg-bg-elevated/60 text-ink-primary hover:bg-bg-elevated border border-line backdrop-blur-md",
  outline:
    "bg-transparent text-ink-primary border border-line hover:border-line-strong hover:bg-bg-elevated/40",
};

const innerIconBg = {
  primary: "bg-bg-base/10 text-bg-base",
  ghost: "bg-ink-primary/8 text-ink-primary",
  outline: "bg-ink-primary/8 text-ink-primary",
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
    class="group relative inline-flex select-none items-center rounded-full font-medium tracking-tight transition-all duration-500 ease-haptic active:scale-[0.98]"
    :class="[sizeCls[size], variantCls[variant]]"
  >
    <span class="whitespace-nowrap">
      <slot />
    </span>
    <span
      class="ml-1 inline-flex items-center justify-center rounded-full transition-all duration-500 ease-haptic group-hover:translate-x-0.5 group-hover:-translate-y-px"
      :class="[iconSizeCls[size], innerIconBg[variant]]"
      aria-hidden="true"
    >
      <slot name="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-3.5 w-3.5"
        >
          <path d="M7 17 17 7" />
          <path d="M8 7h9v9" />
        </svg>
      </slot>
    </span>
  </component>
</template>
