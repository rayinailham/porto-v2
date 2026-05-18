<script setup lang="ts">
import { computed } from "vue";
import type { FeaturedProject } from "@/data/portfolio";
import MonoChip from "@/components/ui/MonoChip.vue";
import StatusDot from "@/components/ui/StatusDot.vue";

interface Props {
  project: FeaturedProject;
  index: string;
  total: string;
  statusLabel: string;
  statusColor: "warm" | "cool" | "success" | "muted";
}

const props = defineProps<Props>();

const isInternal = computed(() => props.project.href.startsWith("/"));
</script>

<template>
  <article
    class="featured-panel group relative isolate flex h-full w-full flex-col"
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

    <div class="shell-wide flex h-full flex-col py-12 lg:py-16">
      <!-- Top meta row -->
      <div
        class="flex items-baseline justify-between gap-4 border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
      >
        <span class="inline-flex items-center gap-3">
          <span class="text-ink-faint">{{ project.index }}</span>
          <span>{{ index }} / {{ total }}</span>
        </span>
        <span class="inline-flex items-center gap-2 text-ink-muted">
          <StatusDot :color="statusColor" :pulse="project.status === 'active'" />
          <span>{{ statusLabel }}</span>
        </span>
      </div>

      <!-- Body grid -->
      <div class="grid flex-1 grid-cols-12 gap-x-8 gap-y-10 pt-10 lg:pt-14">
        <!-- Left: title + description -->
        <div class="col-span-12 flex flex-col lg:col-span-7">
          <h3
            class="max-w-[14ch] font-display font-semibold leading-[0.92] tracking-[-0.045em] text-ink-primary text-[clamp(3rem,7vw,6rem)]"
          >
            {{ project.title }}
          </h3>

          <p
            class="mt-8 max-w-[34ch] text-balance font-display text-[clamp(1.1rem,1.4vw,1.45rem)] font-medium leading-[1.35] tracking-[-0.018em] text-ink-primary/90"
          >
            {{ project.oneLiner }}
          </p>

          <p
            v-if="project.description"
            class="mt-5 max-w-[52ch] text-body-md text-ink-muted"
          >
            {{ project.description }}
          </p>

          <div class="mt-auto pt-12">
            <span
              class="relative z-10 inline-flex items-center gap-3 font-mono text-mono-xs uppercase text-ink-muted transition-colors duration-500 group-hover:text-accent-warm"
            >
              <span class="link-underline">{{
                project.caseStudy ? "Read case study" : "Open repository"
              }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="square"
                stroke-linejoin="miter"
                class="h-3.5 w-3.5 transition-transform duration-500 ease-haptic group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>

        <!-- Right: metric + role + stack -->
        <aside
          class="col-span-12 flex flex-col gap-10 border-line lg:col-span-5 lg:border-l lg:pl-10"
        >
          <div v-if="project.metric" class="flex flex-col gap-3">
            <span class="font-mono text-mono-xs uppercase text-ink-subtle">
              Signal
            </span>
            <div class="flex items-baseline gap-4">
              <span
                class="font-display font-semibold leading-none tracking-[-0.04em] text-ink-primary text-[clamp(2rem,3.6vw,3rem)] num-tabular"
              >
                {{ project.metric.value }}
              </span>
            </div>
            <span class="font-mono text-mono-xs uppercase text-ink-muted">
              {{ project.metric.label }}
            </span>
          </div>

          <div class="flex flex-col gap-3">
            <span class="font-mono text-mono-xs uppercase text-ink-subtle">
              Role
            </span>
            <span
              class="font-display text-[clamp(1.05rem,1.2vw,1.2rem)] font-medium tracking-[-0.018em] text-ink-primary"
            >
              {{ project.role }}
            </span>
          </div>

          <div class="flex flex-col gap-3">
            <span class="font-mono text-mono-xs uppercase text-ink-subtle">
              Stack
            </span>
            <div class="flex flex-wrap gap-1.5">
              <MonoChip v-for="s in project.stack" :key="s">{{ s }}</MonoChip>
            </div>
          </div>

          <div class="flex flex-col gap-3 border-t border-line pt-6">
            <span class="font-mono text-mono-xs uppercase text-ink-subtle">
              Tags
            </span>
            <div class="flex flex-wrap gap-x-3 gap-y-1 font-mono text-mono-xs uppercase text-ink-muted">
              <span v-for="t in project.tags" :key="t">/ {{ t }}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Hover edge accent -->
    <span
      class="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent-warm transition-transform duration-700 ease-haptic group-hover:scale-x-100"
      aria-hidden="true"
    />
  </article>
</template>

<style scoped>
.featured-panel {
  /* Vertical hairline between adjacent panels in the horizontal track */
  border-left: 1px solid var(--line);
}
.featured-panel:first-of-type {
  border-left: 0;
}
</style>
