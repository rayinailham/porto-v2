<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useTypography } from "@/composables/useTypography";
import { useCounter } from "@/composables/useCounter";
import { getCaseStudy, caseStudySlugs } from "@/data/case-studies";
import StatusDot from "@/components/ui/StatusDot.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
import AppButton from "@/components/ui/AppButton.vue";
import MermaidDiagram from "@/components/content/MermaidDiagram.vue";
import CodeBlock from "@/components/content/CodeBlock.vue";

const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug as string);
const study = computed(() => getCaseStudy(slug.value));

if (!study.value) {
  router.replace({ path: "/work" });
}

watchEffect(() => {
  if (!study.value) return;
  if (typeof document !== "undefined") {
    document.title = `${study.value.title} · case study · Rayina Ilham`;
  }
});

const root = ref<HTMLElement | null>(null);
useTypography(root);
useCounter(root);

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
      class="relative border-b border-line pt-[clamp(8rem,18vh,12rem)] pb-section-sm"
      data-reveal-group
    >
      <div class="shell-wide">
        <!-- Back link -->
        <div class="reveal-init">
          <router-link
            to="/work"
            class="group inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-ink-muted transition-colors duration-300 hover:text-ink-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="square"
              stroke-linejoin="miter"
              class="h-3 w-3 transition-transform duration-500 ease-haptic group-hover:-translate-x-1"
            >
              <path d="M19 12H5" />
              <path d="m11 18-6-6 6-6" />
            </svg>
            <span class="link-underline">Work index</span>
          </router-link>
        </div>

        <!-- Section marker -->
        <div
          class="reveal-init mt-10 flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">CS</span>
            <span>Case study · {{ study.year }}</span>
          </span>
          <span class="inline-flex items-center gap-4">
            <span class="inline-flex items-center gap-2">
              <StatusDot :color="statusColor" :pulse="study.status === 'active'" />
              <span class="text-ink-muted">{{ statusLabel }}</span>
            </span>
            <span class="text-ink-faint">~{{ readingMinutes }} min read</span>
          </span>
        </div>

        <!-- Title -->
        <h1
          class="mt-12 max-w-[20ch] font-display text-display-xl text-ink-primary track-tight lg:mt-16"
        >
          <span class="block" data-split="words">{{ study.title }}</span>
        </h1>

        <p class="reveal-init mt-10 max-w-[60ch] text-body-lg text-ink-muted">
          {{ study.oneLiner }}
        </p>

        <!-- Meta dl -->
        <dl class="mt-section-sm grid grid-cols-2 border-y border-line md:grid-cols-4">
          <div class="reveal-init px-5 py-6 md:border-l md:border-line first:md:border-l-0">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Role</dt>
            <dd class="mt-3 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
              {{ study.role }}
            </dd>
          </div>
          <div class="reveal-init px-5 py-6 md:border-l md:border-line">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Team</dt>
            <dd class="mt-3 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
              {{ study.team }}
            </dd>
          </div>
          <div class="reveal-init border-t border-line px-5 py-6 md:border-l md:border-t-0">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Duration</dt>
            <dd class="mt-3 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
              {{ study.duration }}
            </dd>
          </div>
          <div class="reveal-init border-t border-line px-5 py-6 md:border-l md:border-t-0">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Year</dt>
            <dd class="mt-3 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
              {{ study.year }}
            </dd>
          </div>
        </dl>

        <div class="reveal-init mt-10 flex flex-wrap gap-1.5">
          <MonoChip v-for="s in study.stack" :key="s">{{ s }}</MonoChip>
        </div>

        <div class="reveal-init mt-10 flex flex-wrap gap-4">
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

    <!-- 01 · Problem -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">01</span>
            <span>Problem</span>
          </span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
          <h2
            class="reveal-init col-span-12 max-w-[16ch] font-display text-display-md text-ink-primary track-snug lg:col-span-5"
            data-split="words"
          >
            The brief, <span class="italic-accent text-ink-muted">in one breath.</span>
          </h2>
          <div class="col-span-12 lg:col-span-7">
            <p class="reveal-init max-w-[60ch] text-body-lg text-ink-primary">
              {{ study.problem.lead }}
            </p>
            <div class="reveal-init mt-6 space-y-5 text-body-md text-ink-muted">
              <p v-for="(p, i) in study.problem.body" :key="i" class="max-w-[60ch] text-pretty">
                {{ p }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 · Architecture -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">02</span>
            <span>Architecture</span>
          </span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
          <div class="col-span-12 lg:col-span-4">
            <h2 class="reveal-init max-w-[14ch] font-display text-display-md text-ink-primary track-snug" data-split="words">
              How the parts <span class="italic-accent text-ink-muted">fit.</span>
            </h2>
            <p class="reveal-init mt-5 max-w-[36ch] text-body-md text-ink-muted">
              Mermaid diagram, themed for the editorial palette. Refresh to
              re-render if the topology updates.
            </p>
          </div>
          <div class="col-span-12 lg:col-span-8">
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

    <!-- 03 · Tech decisions -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">03</span>
            <span>Tech decisions</span>
          </span>
          <span class="text-ink-muted">{{ study.decisions.length }} entries</span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
          <h2
            class="reveal-init col-span-12 max-w-[18ch] font-display text-display-md text-ink-primary track-snug lg:col-span-5"
            data-split="words"
          >
            What got picked, <span class="italic-accent text-ink-muted">and why.</span>
          </h2>
        </div>

        <ol class="mt-section-sm divide-y divide-line border-y border-line">
          <li
            v-for="(d, i) in study.decisions"
            :key="d.title"
            class="reveal-init grid grid-cols-12 items-baseline gap-x-6 gap-y-4 py-10"
          >
            <span class="col-span-12 font-mono text-mono-xs uppercase text-ink-subtle md:col-span-1">
              <span class="text-ink-faint">.{{ String(i + 1).padStart(2, '0') }}</span>
            </span>
            <h3 class="col-span-12 max-w-[20ch] font-display text-heading-lg text-ink-primary md:col-span-4">
              {{ d.title }}
            </h3>
            <p class="col-span-12 max-w-[60ch] text-body-md text-ink-muted md:col-span-7">
              {{ d.body }}
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- 04 · Challenges -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">04</span>
            <span>Challenges</span>
          </span>
          <span class="text-ink-muted">{{ study.challenges.length }} resolved</span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
          <h2
            class="reveal-init col-span-12 max-w-[20ch] font-display text-display-md text-ink-primary track-snug lg:col-span-7"
            data-split="words"
          >
            The parts that hurt — <span class="italic-accent text-ink-muted">and the fix.</span>
          </h2>
        </div>

        <ul class="mt-section-sm space-y-0 divide-y divide-line border-y border-line">
          <li
            v-for="(c, i) in study.challenges"
            :key="c.title"
            class="reveal-init py-10 lg:py-14"
          >
            <div class="flex items-baseline justify-between gap-3 font-mono text-mono-xs uppercase text-ink-subtle">
              <span class="inline-flex items-center gap-3">
                <span class="text-ink-faint">{{ String(i + 1).padStart(2, '0') }}</span>
                <span>Challenge</span>
              </span>
            </div>
            <h3 class="mt-5 max-w-[26ch] font-display text-heading-lg text-ink-primary">
              {{ c.title }}
            </h3>

            <div class="mt-8 grid grid-cols-1 border-y border-line md:grid-cols-2">
              <div class="px-5 py-6 md:px-7 md:py-8">
                <span class="inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-accent-warm">
                  <span class="h-1.5 w-1.5 rounded-full bg-accent-warm" aria-hidden="true" />
                  Problem
                </span>
                <p class="mt-4 max-w-[52ch] text-body-md text-ink-muted">
                  {{ c.problem }}
                </p>
              </div>
              <div class="border-t border-line px-5 py-6 md:border-l md:border-t-0 md:px-7 md:py-8">
                <span class="inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-accent-success">
                  <span class="h-1.5 w-1.5 rounded-full bg-accent-success" aria-hidden="true" />
                  Solution
                </span>
                <p class="mt-4 max-w-[52ch] text-body-md text-ink-primary/90">
                  {{ c.solution }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- 05 · Outcome -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">05</span>
            <span>Outcome</span>
          </span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
          <h2
            class="reveal-init col-span-12 max-w-[20ch] font-display text-display-md text-ink-primary track-snug lg:col-span-5"
            data-split="words"
          >
            What it ended up <span class="italic-accent text-ink-muted">being.</span>
          </h2>
          <div class="col-span-12 lg:col-span-7">
            <p class="reveal-init max-w-[60ch] text-body-lg text-ink-primary">
              {{ study.outcome.lead }}
            </p>
          </div>
        </div>

        <dl class="mt-section-sm grid grid-cols-2 border-y border-line md:grid-cols-4">
          <div
            v-for="(m, i) in study.outcome.metrics"
            :key="m.label"
            class="reveal-init px-5 py-8 md:border-l md:border-line"
            :class="[
              i === 0 ? 'md:border-l-0' : '',
              i >= 2 ? 'border-t border-line md:border-t-0' : '',
            ]"
          >
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">
              {{ m.label }}
            </dt>
            <dd class="mt-4 font-display text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-none tracking-[-0.04em] text-ink-primary">
              {{ m.value }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <!-- 06 · Code highlights -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">06</span>
            <span>Code highlights</span>
          </span>
          <span class="text-ink-muted">{{ study.codeHighlights.length }} snippets</span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
          <h2 class="reveal-init col-span-12 max-w-[24ch] font-display text-display-md text-ink-primary track-snug lg:col-span-7" data-split="words">
            The bits I'd defend <span class="italic-accent text-ink-muted">in a code review.</span>
          </h2>
        </div>

        <div class="mt-section-sm space-y-12">
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
    </section>

    <!-- Prev/Next -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell-wide">
        <div class="grid grid-cols-1 border-y border-line md:grid-cols-2">
          <router-link
            v-if="prevSlug"
            :to="`/work/${prevSlug}`"
            class="reveal-init group flex flex-col gap-3 px-5 py-10 transition-colors duration-500 ease-haptic hover:bg-bg-elevated/40 md:px-8 md:py-12"
          >
            <span class="inline-flex items-center gap-3 font-mono text-mono-xs uppercase text-ink-subtle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="square"
                stroke-linejoin="miter"
                class="h-3 w-3 transition-transform duration-500 ease-haptic group-hover:-translate-x-1"
              >
                <path d="M19 12H5" />
                <path d="m11 18-6-6 6-6" />
              </svg>
              <span>Previous study</span>
            </span>
            <h3 class="max-w-[24ch] font-display text-heading-lg text-ink-primary transition-colors duration-500 group-hover:text-accent-warm">
              {{ prevTitle }}
            </h3>
          </router-link>
          <span v-else class="hidden md:block" />

          <router-link
            v-if="nextSlug"
            :to="`/work/${nextSlug}`"
            class="reveal-init group flex flex-col gap-3 border-t border-line px-5 py-10 text-right transition-colors duration-500 ease-haptic hover:bg-bg-elevated/40 md:border-l md:border-t-0 md:px-8 md:py-12"
          >
            <span class="inline-flex items-center justify-end gap-3 font-mono text-mono-xs uppercase text-ink-subtle">
              <span>Next study</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="square"
                stroke-linejoin="miter"
                class="h-3 w-3 transition-transform duration-500 ease-haptic group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </span>
            <h3 class="max-w-[24ch] self-end font-display text-heading-lg text-ink-primary transition-colors duration-500 group-hover:text-accent-warm">
              {{ nextTitle }}
            </h3>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
