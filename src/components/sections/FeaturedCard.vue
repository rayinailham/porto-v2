<script setup lang="ts">
import { computed } from "vue";
import type { FeaturedProject } from "@/data/portfolio";
import MonoChip from "@/components/ui/MonoChip.vue";
import StatusDot from "@/components/ui/StatusDot.vue";
import BlobLight from "@/components/texture/BlobLight.vue";

interface Props {
  project: FeaturedProject;
  tall?: boolean;
  statusLabel: string;
  statusColor: "warm" | "cool" | "success" | "muted";
  emphasis?: "warm" | "cool" | "neutral";
}

const props = withDefaults(defineProps<Props>(), {
  tall: false,
  emphasis: "neutral",
});

const blobColor = computed<"warm" | "cool" | "violet">(() =>
  props.emphasis === "warm"
    ? "warm"
    : props.emphasis === "cool"
    ? "cool"
    : "violet",
);

const isInternal = computed(() => props.project.href.startsWith("/"));
</script>

<template>
  <article
    class="group relative isolate overflow-hidden rounded-[28px] border border-line bg-bg-elevated/40 p-1.5 backdrop-blur-md transition-all duration-700 ease-haptic hover:-translate-y-1 hover:border-line-strong"
    style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 30px 80px -50px rgba(0, 0, 0, 0.85);"
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

    <!-- Inner core (Double-Bezel inner) -->
    <div
      class="relative flex h-full flex-col overflow-hidden rounded-[22px] bg-bg-base/85"
      :class="
        tall
          ? 'p-7 md:p-8 md:min-h-[520px]'
          : 'p-7 md:p-8 md:min-h-[280px]'
      "
    >
      <BlobLight
        :color="blobColor"
        :size="tall ? 380 : 320"
        x="100%"
        y="0%"
        :opacity="0.5"
        :blur="100"
      />

      <div class="relative z-10 flex items-center justify-between gap-3">
        <span
          class="font-mono text-mono-xs uppercase tracking-[0.2em] text-ink-subtle"
        >
          {{ project.index }} · {{ project.role }}
        </span>
        <span
          class="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated/70 px-2.5 py-1 font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-muted"
        >
          <StatusDot
            :color="statusColor"
            :pulse="project.status === 'active'"
          />
          <span>{{ statusLabel }}</span>
        </span>
      </div>

      <h3
        class="relative z-10 mt-10 font-display text-[clamp(1.85rem,3.2vw,2.65rem)] font-semibold leading-[1.05] tracking-tight text-ink-primary"
      >
        {{ project.title }}
      </h3>
      <p
        class="relative z-10 mt-3 max-w-[40ch] text-balance text-[15px] font-medium text-ink-primary/85"
      >
        {{ project.oneLiner }}
      </p>
      <p
        v-if="project.description"
        class="relative z-10 mt-3 max-w-[55ch] text-[14.5px] leading-relaxed text-ink-muted"
      >
        {{ project.description }}
      </p>

      <div
        v-if="project.metric"
        class="relative z-10 mt-6 inline-flex items-baseline gap-3 self-start rounded-2xl border border-line bg-bg-elevated/50 px-4 py-2.5"
      >
        <span
          class="font-display text-[clamp(1.1rem,1.6vw,1.4rem)] font-semibold tracking-tight text-ink-primary"
        >
          {{ project.metric.value }}
        </span>
        <span
          class="font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle"
        >
          {{ project.metric.label }}
        </span>
      </div>

      <div class="flex-1" />

      <div
        class="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/70 pt-5"
      >
        <div class="flex flex-wrap gap-1.5">
          <MonoChip v-for="s in project.stack" :key="s">{{ s }}</MonoChip>
        </div>
        <span
          v-if="project.caseStudy"
          class="inline-flex items-center gap-1.5 rounded-full border border-accent-warm/30 bg-accent-warm/10 px-2.5 py-1 font-mono text-mono-xs uppercase tracking-[0.16em] text-accent-warm/90"
        >
          Case study
        </span>
      </div>
    </div>
  </article>
</template>
