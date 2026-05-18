<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useReveal } from "@/composables/useReveal";
import { getCaseStudy, caseStudySlugs } from "@/data/case-studies";
import EyebrowTag from "@/components/ui/EyebrowTag.vue";
import StatusDot from "@/components/ui/StatusDot.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
import AppButton from "@/components/ui/AppButton.vue";
import BlobLight from "@/components/texture/BlobLight.vue";
import TextureGrid from "@/components/texture/TextureGrid.vue";
import MermaidDiagram from "@/components/content/MermaidDiagram.vue";
import CodeBlock from "@/components/content/CodeBlock.vue";

const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug as string);
const study = computed(() => getCaseStudy(slug.value));

if (!study.value) {
  // Redirect to /work if slug missing
  router.replace({ path: "/work" });
}

// Dynamic document title — make share previews and tab labels useful
watchEffect(() => {
  if (!study.value) return;
  if (typeof document !== "undefined") {
    document.title = `${study.value.title} · case study · Rayina Ilham`;
  }
});

const root = ref<HTMLElement | null>(null);
useReveal(root, { stagger: 0.06, start: "top 90%" });

// Reading time — rough heuristic from problem + decisions + challenges + outcome.
const readingMinutes = computed(() => {
  if (!study.value) return 0;
  const text = [
    study.value.problem.lead,
    ...study.value.problem.body,
    ...study.value.decisions.map((d) => d.body),
    ...study.value.challenges.map((c) => `${c.problem} ${c.solution}`),
    study.value.outcome.lead,
  ].join(" ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(2, Math.round(words / 220));
});

const statusLabel = computed(() => {
  if (!study.value) return "";
  return study.value.status === "active"
    ? "Active build"
    : study.value.status === "shipped"
    ? "Shipped"
    : "Ongoing";
});

const statusColor = computed(() => {
  if (!study.value) return "muted" as const;
  return study.value.status === "active"
    ? ("warm" as const)
    : study.value.status === "shipped"
    ? ("success" as const)
    : ("cool" as const);
});

// Sibling navigation for prev/next case study
const siblingIndex = computed(() => caseStudySlugs.indexOf(slug.value));
const prevSlug = computed(() => {
  const i = siblingIndex.value;
  return i > 0 ? caseStudySlugs[i - 1] : null;
});
const nextSlug = computed(() => {
  const i = siblingIndex.value;
  return i >= 0 && i < caseStudySlugs.length - 1
    ? caseStudySlugs[i + 1]
    : null;
});
const prevTitle = computed(() =>
  prevSlug.value ? getCaseStudy(prevSlug.value)?.title : null,
);
const nextTitle = computed(() =>
  nextSlug.value ? getCaseStudy(nextSlug.value)?.title : null,
);
</script>

<template>
  <div v-if="study" ref="root" class="relative">
    <!-- Hero -->
    <section
      class="relative isolate overflow-hidden pb-section-sm pt-[clamp(7rem,16vh,11rem)]"
      data-reveal-group
    >
      <TextureGrid :opacity="0.035" :size="64" fade="edges" />
      <BlobLight
        :color="study.emphasis === 'cool' ? 'cool' : study.emphasis === 'warm' ? 'warm' : 'violet'"
        :size="640"
        x="14%"
        y="22%"
        :opacity="0.5"
        :blur="160"
      />
      <BlobLight color="cool" :size="480" x="86%" y="78%" :opacity="0.32" :blur="180" />
      <div
        class="pointer-events-none absolute inset-0 -z-10"
        style="
          background:
            radial-gradient(80% 60% at 50% 40%, transparent 0%, rgb(10 10 11 / 0.55) 100%);
        "
        aria-hidden="true"
      />

      <div class="shell relative">
        <div class="reveal-init">
          <router-link
            to="/work"
            class="inline-flex items-center gap-2 font-mono text-mono-xs uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-3 w-3"
            >
              <path d="m15 6-6 6 6 6" />
            </svg>
            <span>Work index</span>
          </router-link>
        </div>

        <div class="reveal-init mt-8 flex flex-wrap items-center gap-3">
          <EyebrowTag :label="`Case study · ${study.year}`" />
          <span
            class="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated/60 px-3 py-1 font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-muted backdrop-blur-md"
          >
            <StatusDot :color="statusColor" :pulse="study.status === 'active'" />
            <span>{{ statusLabel }}</span>
          </span>
          <span
            class="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated/40 px-3 py-1 font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle"
          >
            ~{{ readingMinutes }} min read
          </span>
        </div>

        <h1
          class="reveal-init mt-8 max-w-[18ch] text-balance font-display text-display-lg text-ink-primary"
        >
          {{ study.title }}
        </h1>
        <p
          class="reveal-init mt-6 max-w-prose text-pretty text-body-lg text-ink-muted"
        >
          {{ study.oneLiner }}
        </p>

        <div
          class="reveal-init mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
        >
          <div class="bg-bg-base/85 p-5">
            <dt class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">Role</dt>
            <dd class="mt-2 text-[14.5px] font-medium text-ink-primary">{{ study.role }}</dd>
          </div>
          <div class="bg-bg-base/85 p-5">
            <dt class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">Team</dt>
            <dd class="mt-2 text-[14.5px] font-medium text-ink-primary">{{ study.team }}</dd>
          </div>
          <div class="bg-bg-base/85 p-5">
            <dt class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">Duration</dt>
            <dd class="mt-2 text-[14.5px] font-medium text-ink-primary">{{ study.duration }}</dd>
          </div>
          <div class="bg-bg-base/85 p-5">
            <dt class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">Year</dt>
            <dd class="mt-2 text-[14.5px] font-medium text-ink-primary">{{ study.year }}</dd>
          </div>
        </div>

        <div class="reveal-init mt-10 flex flex-wrap gap-1.5">
          <MonoChip v-for="s in study.stack" :key="s">{{ s }}</MonoChip>
        </div>

        <div class="reveal-init mt-10 flex flex-wrap gap-3">
          <AppButton
            v-for="(l, i) in study.links"
            :key="l.href"
            :variant="i === 0 ? 'primary' : 'ghost'"
            :href="l.href"
            external
          >
            {{ l.label }}
          </AppButton>
        </div>
      </div>
    </section>

    <!-- Problem -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              01 · Problem
            </span>
            <h2 class="reveal-init mt-3 max-w-[16ch] text-balance font-display text-heading-lg text-ink-primary">
              The brief, in one breath.
            </h2>
          </div>
          <div class="md:col-span-8">
            <p class="reveal-init text-pretty text-body-lg text-ink-primary">
              {{ study.problem.lead }}
            </p>
            <div class="reveal-init mt-6 space-y-4 text-body-md text-ink-muted">
              <p v-for="(p, i) in study.problem.body" :key="i" class="text-pretty">
                {{ p }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Architecture -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              02 · Architecture
            </span>
            <h2 class="reveal-init mt-3 max-w-[16ch] text-balance font-display text-heading-lg text-ink-primary">
              How the parts fit.
            </h2>
            <p class="reveal-init mt-4 max-w-md text-body-md text-ink-muted">
              Mermaid diagram, themed to match the editorial palette. Refresh
              to re-render if the topology updates.
            </p>
          </div>
          <div class="md:col-span-8">
            <div class="reveal-init">
              <MermaidDiagram
                :code="study.architectureDiagram.code"
                :caption="study.architectureDiagram.caption"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tech decisions -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              03 · Tech decisions
            </span>
            <h2 class="reveal-init mt-3 max-w-[18ch] text-balance font-display text-heading-lg text-ink-primary">
              What got picked, and why.
            </h2>
          </div>
          <ul class="md:col-span-8">
            <li
              v-for="(d, i) in study.decisions"
              :key="d.title"
              class="reveal-init grid grid-cols-12 items-baseline gap-4 border-t border-line/70 py-7 first:border-t-0 first:pt-0"
            >
              <span class="col-span-12 font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle md:col-span-1">
                .{{ String(i + 1).padStart(2, '0') }}
              </span>
              <div class="col-span-12 md:col-span-11">
                <h3 class="font-display text-[18px] font-semibold tracking-tight text-ink-primary">
                  {{ d.title }}
                </h3>
                <p class="mt-2 max-w-prose text-pretty text-body-md text-ink-muted">{{ d.body }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Challenges -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              04 · Challenges
            </span>
            <h2 class="reveal-init mt-3 max-w-[18ch] text-balance font-display text-heading-lg text-ink-primary">
              The parts that hurt — and the fix.
            </h2>
          </div>
          <ul class="md:col-span-8 space-y-5">
            <li
              v-for="(c, i) in study.challenges"
              :key="c.title"
              class="reveal-init relative overflow-hidden rounded-[24px] border border-line bg-bg-elevated/40 p-1.5"
              style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);"
            >
              <div class="rounded-[18px] bg-bg-base/85 p-7 md:p-8">
                <span class="font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle">
                  Challenge {{ String(i + 1).padStart(2, '0') }}
                </span>
                <h3 class="mt-3 font-display text-heading-md text-ink-primary">
                  {{ c.title }}
                </h3>
                <div class="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div class="rounded-2xl border border-line bg-bg-elevated/50 p-5">
                    <span class="font-mono text-mono-xs uppercase tracking-[0.16em] text-accent-warm">
                      Problem
                    </span>
                    <p class="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                      {{ c.problem }}
                    </p>
                  </div>
                  <div class="rounded-2xl border border-line bg-bg-elevated/50 p-5">
                    <span class="font-mono text-mono-xs uppercase tracking-[0.16em] text-accent-success">
                      Solution
                    </span>
                    <p class="mt-3 text-[14.5px] leading-relaxed text-ink-primary/90">
                      {{ c.solution }}
                    </p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Outcome -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              05 · Outcome
            </span>
            <h2 class="reveal-init mt-3 max-w-[18ch] text-balance font-display text-heading-lg text-ink-primary">
              What it ended up being.
            </h2>
          </div>
          <div class="md:col-span-8">
            <p class="reveal-init max-w-prose text-pretty text-body-lg text-ink-primary">
              {{ study.outcome.lead }}
            </p>
            <dl
              class="reveal-init mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4"
            >
              <div
                v-for="m in study.outcome.metrics"
                :key="m.label"
                class="bg-bg-base/85 p-5"
              >
                <dt class="font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle">
                  {{ m.label }}
                </dt>
                <dd class="mt-2 font-display text-[clamp(1.35rem,2vw,1.75rem)] font-semibold tracking-tight text-ink-primary">
                  {{ m.value }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <!-- Code highlights -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              06 · Code highlights
            </span>
            <h2 class="reveal-init mt-3 max-w-[16ch] text-balance font-display text-heading-lg text-ink-primary">
              The bits I'd defend in a code review.
            </h2>
          </div>
          <div class="md:col-span-8">
            <div v-for="snip in study.codeHighlights" :key="snip.file" class="reveal-init">
              <CodeBlock
                :code="snip.code"
                :file="snip.file"
                :href="snip.href"
                :language="snip.language"
                :caption="snip.caption"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Prev/Next nav -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <router-link
            v-if="prevSlug"
            :to="`/work/${prevSlug}`"
            class="reveal-init group flex items-center justify-between rounded-2xl border border-line bg-bg-elevated/40 px-6 py-5 transition-all duration-500 ease-haptic hover:-translate-y-0.5 hover:border-line-strong"
          >
            <div>
              <div class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">
                ← Previous study
              </div>
              <div class="mt-1 font-display text-[16px] font-semibold tracking-tight text-ink-primary">
                {{ prevTitle }}
              </div>
            </div>
          </router-link>
          <span v-else class="hidden md:block" />

          <router-link
            v-if="nextSlug"
            :to="`/work/${nextSlug}`"
            class="reveal-init group flex items-center justify-between rounded-2xl border border-line bg-bg-elevated/40 px-6 py-5 text-right transition-all duration-500 ease-haptic hover:-translate-y-0.5 hover:border-line-strong"
          >
            <div class="ml-auto">
              <div class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">
                Next study →
              </div>
              <div class="mt-1 font-display text-[16px] font-semibold tracking-tight text-ink-primary">
                {{ nextTitle }}
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
