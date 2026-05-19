<script setup lang="ts">
import { computed, ref } from "vue";
import { useTypography } from "@/composables/useTypography";
import { allProjects, tagOptions, type WorkTag } from "@/data/portfolio";
import StatusDot from "@/components/ui/StatusDot.vue";
import MonoChip from "@/components/ui/MonoChip.vue";

const root = ref<HTMLElement | null>(null);
useTypography(root);

const activeTag = ref<WorkTag>("all");

const filtered = computed(() => {
  if (activeTag.value === "all") return allProjects;
  return allProjects.filter((p) => p.tags.includes(activeTag.value));
});

const counts = computed(() => {
  const map = new Map<WorkTag, number>();
  for (const opt of tagOptions) {
    map.set(
      opt.id,
      opt.id === "all"
        ? allProjects.length
        : allProjects.filter((p) => p.tags.includes(opt.id)).length,
    );
  }
  return map;
});

const statusColor = (s?: "active" | "shipped" | "ongoing") =>
  s === "active" ? ("warm" as const) : s === "shipped" ? ("success" as const) : ("cool" as const);
</script>

<template>
  <div ref="root" class="relative">
    <!-- Hero -->
    <section
      class="relative border-b border-line pt-[clamp(5.5rem,14vh,12rem)] pb-section-sm"
      data-reveal-group
    >
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">01</span>
            <span>Work — index</span>
          </span>
          <span class="hidden sm:inline">2024 → 2026</span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12 lg:pt-20">
          <h1
            class="col-span-12 max-w-[20ch] font-display text-display-xl text-ink-primary track-tight lg:col-span-8"
          >
            <span class="block" data-split="words">All public work,</span>
            <span class="block text-ink-muted" data-split="words">
              <span class="italic-accent text-ink-muted">in one place.</span>
            </span>
          </h1>
          <div class="reveal-init col-span-12 lg:col-span-4 lg:self-end">
            <div class="font-mono text-mono-xs uppercase text-ink-subtle">
              Showing
            </div>
            <div class="mt-3 font-display text-[clamp(2rem,3.2vw,2.75rem)] font-semibold leading-none tracking-[-0.04em] text-ink-primary">
              {{ String(filtered.length).padStart(2, '0') }}
              <span class="text-ink-faint">/ {{ String(allProjects.length).padStart(2, '0') }}</span>
            </div>
            <p class="mt-4 max-w-[36ch] text-body-md text-ink-muted">
              Filter by whatever matters to you. Three projects have full case
              studies; the rest link straight to the repo.
            </p>
          </div>
        </div>

        <!-- Tag filter — flat hairline pills -->
        <div
          class="reveal-init mt-section-sm flex flex-wrap items-center gap-x-1 gap-y-3 border-t border-line pt-6"
          role="tablist"
          aria-label="Filter projects by tag"
        >
          <button
            v-for="opt in tagOptions"
            :key="opt.id"
            type="button"
            role="tab"
            :aria-selected="activeTag === opt.id"
            class="group inline-flex items-baseline gap-2 border border-transparent px-3 py-1.5 font-mono text-mono-xs uppercase transition-colors duration-300 ease-haptic"
            :class="
              activeTag === opt.id
                ? 'border-ink-primary bg-ink-primary text-bg-base'
                : 'text-ink-muted hover:text-ink-primary'
            "
            @click="activeTag = opt.id"
          >
            <span>{{ opt.label }}</span>
            <span
              class="text-[10px] tracking-[0.2em]"
              :class="activeTag === opt.id ? 'text-bg-base/60' : 'text-ink-faint'"
            >
              {{ String(counts.get(opt.id) ?? 0).padStart(2, '0') }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Project list -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell-wide">
        <ul class="border-b border-line">
          <li
            v-for="(p, i) in filtered"
            :key="p.slug"
            class="reveal-init"
          >
            <component
              :is="p.caseStudy ? 'router-link' : 'a'"
              :to="p.caseStudy ? p.href : undefined"
              :href="p.caseStudy ? undefined : p.href"
              :target="p.caseStudy ? undefined : '_blank'"
              :rel="p.caseStudy ? undefined : 'noopener noreferrer'"
              class="group grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-t border-line py-7 transition-colors duration-500 ease-haptic hover:bg-bg-elevated/40 lg:py-8"
            >
              <span class="col-span-3 font-mono text-mono-xs uppercase text-ink-subtle md:col-span-1">
                <span class="text-ink-faint">{{ String(i + 1).padStart(2, '0') }}</span>
              </span>

              <div class="col-span-9 flex items-center gap-3 md:col-span-3">
                <StatusDot :color="statusColor(p.status)" />
                <h3 class="font-display text-[clamp(1rem,1.4vw,1.25rem)] font-semibold tracking-[-0.025em] text-ink-primary">
                  {{ p.title }}
                </h3>
              </div>

              <p class="col-span-12 max-w-[52ch] text-body-md text-ink-muted md:col-span-5">
                {{ p.oneLiner }}
              </p>

              <div class="col-span-12 hidden flex-wrap gap-1.5 md:col-span-2 md:flex">
                <MonoChip v-for="s in p.stack.slice(0, 2)" :key="s">{{ s }}</MonoChip>
              </div>

              <span class="col-span-12 inline-flex items-center justify-end gap-3 font-mono text-mono-xs uppercase text-ink-muted transition-colors duration-500 group-hover:text-accent-warm md:col-span-1">
                <span v-if="p.caseStudy" class="text-accent-warm">case</span>
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
            </component>
          </li>
        </ul>

        <p
          v-if="filtered.length === 0"
          class="mt-10 text-center font-mono text-mono-sm uppercase text-ink-muted"
        >
          No projects match this filter yet.
        </p>
      </div>
    </section>
  </div>
</template>
