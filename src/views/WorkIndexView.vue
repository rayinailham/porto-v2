<script setup lang="ts">
import { computed, ref } from "vue";
import { useReveal } from "@/composables/useReveal";
import { allProjects, tagOptions, type WorkTag } from "@/data/portfolio";
import EyebrowTag from "@/components/ui/EyebrowTag.vue";
import StatusDot from "@/components/ui/StatusDot.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
import BlobLight from "@/components/texture/BlobLight.vue";
import TextureGrid from "@/components/texture/TextureGrid.vue";

const root = ref<HTMLElement | null>(null);
useReveal(root, { stagger: 0.05, start: "top 92%" });

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
    <section
      class="relative isolate overflow-hidden pb-section-sm pt-[clamp(7rem,16vh,11rem)]"
      data-reveal-group
    >
      <TextureGrid :opacity="0.03" :size="64" fade="edges" />
      <BlobLight color="warm" :size="540" x="14%" y="22%" :opacity="0.42" :blur="160" />

      <div class="shell relative">
        <div class="reveal-init flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div class="max-w-[44ch]">
            <EyebrowTag label="Work index · 2024 → 2026" />
            <h1 class="mt-6 text-balance font-display text-display-lg text-ink-primary">
              All public work, in one place.
            </h1>
            <p class="mt-5 max-w-md text-body-md text-ink-muted">
              Filter by what matters to you. Three projects have full case
              studies; the rest link straight to the repo.
            </p>
          </div>
          <div class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">
            <span>Showing {{ filtered.length }} of {{ allProjects.length }}</span>
          </div>
        </div>

        <!-- Tag filter -->
        <div
          class="reveal-init mt-12 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter projects by tag"
        >
          <button
            v-for="opt in tagOptions"
            :key="opt.id"
            type="button"
            role="tab"
            :aria-selected="activeTag === opt.id"
            class="group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-mono-xs uppercase tracking-[0.16em] transition-all duration-500 ease-haptic"
            :class="
              activeTag === opt.id
                ? 'border-ink-primary bg-ink-primary text-bg-base'
                : 'border-line bg-bg-elevated/40 text-ink-muted hover:border-line-strong hover:bg-bg-elevated hover:text-ink-primary'
            "
            @click="activeTag = opt.id"
          >
            <span>{{ opt.label }}</span>
            <span
              class="rounded-full px-1.5 py-px text-[10px] tracking-[0.1em]"
              :class="activeTag === opt.id ? 'bg-bg-base/15 text-bg-base' : 'bg-bg-base/40 text-ink-subtle'"
            >
              {{ counts.get(opt.id) }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Project list -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <ul class="grid grid-cols-1 gap-3 md:gap-4">
          <li
            v-for="p in filtered"
            :key="p.slug"
            class="reveal-init"
          >
            <component
              :is="p.caseStudy ? 'router-link' : 'a'"
              :to="p.caseStudy ? p.href : undefined"
              :href="p.caseStudy ? undefined : p.href"
              :target="p.caseStudy ? undefined : '_blank'"
              :rel="p.caseStudy ? undefined : 'noopener noreferrer'"
              class="group relative flex flex-col gap-4 overflow-hidden rounded-[20px] border border-line bg-bg-elevated/30 p-6 transition-all duration-700 ease-haptic hover:-translate-y-0.5 hover:border-line-strong hover:bg-bg-elevated/70 md:flex-row md:items-center md:gap-8 md:p-7"
              style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);"
            >
              <div class="flex shrink-0 items-center gap-3 md:w-[200px]">
                <StatusDot :color="statusColor(p.status)" />
                <span class="font-display text-[18px] font-semibold tracking-tight text-ink-primary">
                  {{ p.title }}
                </span>
              </div>

              <p class="flex-1 text-[14.5px] text-ink-muted">
                {{ p.oneLiner }}
              </p>

              <div class="flex flex-wrap gap-1.5">
                <MonoChip v-for="s in p.stack.slice(0, 4)" :key="s">{{ s }}</MonoChip>
              </div>

              <div class="flex shrink-0 items-center gap-2 md:ml-2">
                <span
                  v-if="p.caseStudy"
                  class="rounded-full border border-accent-warm/30 bg-accent-warm/10 px-2.5 py-1 font-mono text-mono-xs uppercase tracking-[0.16em] text-accent-warm/90"
                >
                  Case study
                </span>
                <span
                  class="grid h-8 w-8 place-items-center rounded-full border border-line bg-bg-elevated/70 text-ink-muted transition-all duration-500 ease-haptic group-hover:border-line-strong group-hover:text-ink-primary group-hover:translate-x-0.5 group-hover:-translate-y-px"
                  aria-hidden="true"
                >
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
                </span>
              </div>
            </component>
          </li>
        </ul>

        <p
          v-if="filtered.length === 0"
          class="mt-10 text-center font-mono text-mono-sm uppercase tracking-[0.16em] text-ink-muted"
        >
          No projects match this filter yet.
        </p>
      </div>
    </section>
  </div>
</template>
