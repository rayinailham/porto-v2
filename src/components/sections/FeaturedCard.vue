<script setup lang="ts">
import { computed } from "vue";
import type { FeaturedProject } from "@/data/portfolio";
import MonoChip from "@/components/ui/MonoChip.vue";
import StatusDot from "@/components/ui/StatusDot.vue";

interface Props {
  project: FeaturedProject;
  tall?: boolean;
  index: string;
  total: string;
  statusLabel: string;
  statusColor: "warm" | "cool" | "success" | "muted";
}

const props = withDefaults(defineProps<Props>(), {
  tall: false,
});

const isInternal = computed(() => props.project.href.startsWith("/"));
</script>

<template>
  <article
    class="group relative isolate flex h-full flex-col border-l border-line transition-colors duration-700 ease-haptic hover:border-accent-warm"
  >
    <router-link
      v-if="isInternal"
      :to="project.href"
      class="absolute inset-0 z-20"
      :aria-label="`Open ${project.title} case study`"
    />
    <a
      v-else
      :href="project.href"
      target="_blank"
      rel="noopener noreferrer"
      class="absolute inset-0 z-20"
      :aria-label="`Open ${project.title} on GitHub`"
    />

    <!-- Inner padding -->
    <div class="flex h-full flex-col px-6 pt-6 pb-7 lg:px-8 lg:pt-8 lg:pb-10">
      <!-- Top meta row -->
      <div class="flex items-baseline justify-between gap-3">
        <span class="font-mono text-mono-xs uppercase text-ink-subtle">
          <span class="text-ink-faint">{{ index }}</span>
          <span class="ml-2">/ {{ total }}</span>
        </span>
        <span class="inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-ink-muted">
          <StatusDot
            :color="statusColor"
            :pulse="project.status === 'active'"
          />
          <span>{{ statusLabel }}</span>
        </span>
      </div>

      <!-- Title block -->
      <h3
        class="mt-12 max-w-[18ch] font-display font-semibold leading-[1] tracking-[-0.04em] text-ink-primary"
        :class="
          tall
            ? 'text-[clamp(2rem,3.4vw,2.75rem)]'
            : 'text-[clamp(1.75rem,2.6vw,2.25rem)]'
        "
      >
        {{ project.title }}
      </h3>

      <!-- One-liner -->
      <p
        class="mt-5 max-w-[42ch] text-balance text-body-md text-ink-primary/85"
      >
        {{ project.oneLiner }}
      </p>
      <p
        v-if="project.description"
        class="mt-3 max-w-[48ch] text-body-sm text-ink-muted"
      >
        {{ project.description }}
      </p>

      <!-- Optional metric -->
      <div
        v-if="project.metric"
        class="mt-6 inline-flex items-baseline gap-3 border-t border-line pt-5 self-start"
      >
        <span class="font-display text-[clamp(1.25rem,1.6vw,1.6rem)] font-semibold tracking-[-0.025em] text-ink-primary">
          {{ project.metric.value }}
        </span>
        <span class="font-mono text-mono-xs uppercase text-ink-subtle">
          {{ project.metric.label }}
        </span>
      </div>

      <div class="flex-1" />

      <!-- Footer: stack + role + CTA arrow -->
      <div
        class="mt-10 flex flex-wrap items-end justify-between gap-4 border-t border-line pt-5"
      >
        <div class="flex flex-col gap-3">
          <span class="font-mono text-mono-xs uppercase text-ink-subtle">
            {{ project.role }}
          </span>
          <div class="flex flex-wrap gap-1.5">
            <MonoChip v-for="s in project.stack.slice(0, 5)" :key="s">{{ s }}</MonoChip>
          </div>
        </div>

        <span
          class="relative z-10 inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-ink-muted transition-colors duration-500 group-hover:text-accent-warm"
        >
          <span v-if="project.caseStudy">Case study</span>
          <span v-else>Repository</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="square"
            stroke-linejoin="miter"
            class="h-3 w-3 transition-transform duration-500 ease-haptic group-hover:translate-x-1 group-hover:-translate-y-px"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </span>
      </div>
    </div>
  </article>
</template>
