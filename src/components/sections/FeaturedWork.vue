<script setup lang="ts">
import { featured } from "@/data/portfolio";
import EyebrowTag from "@/components/ui/EyebrowTag.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
import StatusDot from "@/components/ui/StatusDot.vue";
import FeaturedCard from "@/components/sections/FeaturedCard.vue";

const large = featured.filter((f) => f.size !== "sm");
const thumbs = featured.filter((f) => f.size === "sm");

const statusLabel = (s: "active" | "shipped" | "ongoing") =>
  s === "active" ? "Active build" : s === "shipped" ? "Shipped" : "Ongoing";

const statusColor = (s: "active" | "shipped" | "ongoing") =>
  s === "active" ? "warm" : s === "shipped" ? "success" : "cool";
</script>

<template>
  <section
    id="work"
    class="relative py-section"
    data-reveal-group
    aria-labelledby="work-heading"
  >
    <div class="shell">
      <div
        class="reveal-init flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
      >
        <div class="max-w-[40ch]">
          <EyebrowTag label="Featured · 06 · 2026" />
          <h2
            id="work-heading"
            class="mt-6 text-balance font-display text-display-md text-ink-primary"
          >
            Selected work, with the receipts.
          </h2>
        </div>
        <p class="max-w-md text-body-md text-ink-muted">
          A subset of what's public — chosen for impact, architectural depth,
          and the parts I'd happily defend in a code review.
        </p>
      </div>

      <!-- Bento: 8/4 grid, FutureGuide tall on right -->
      <div
        class="reveal-init mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-12 md:gap-5"
      >
        <FeaturedCard
          :project="large[0]"
          class="md:col-span-8"
          :status-label="statusLabel(large[0].status)"
          :status-color="statusColor(large[0].status)"
          :emphasis="large[0].emphasis ?? 'neutral'"
        />

        <FeaturedCard
          :project="large[1]"
          class="md:col-span-4 md:row-span-2"
          tall
          :status-label="statusLabel(large[1].status)"
          :status-color="statusColor(large[1].status)"
          :emphasis="large[1].emphasis ?? 'neutral'"
        />

        <FeaturedCard
          :project="large[2]"
          class="md:col-span-8"
          :status-label="statusLabel(large[2].status)"
          :status-color="statusColor(large[2].status)"
          :emphasis="large[2].emphasis ?? 'neutral'"
        />
      </div>

      <!-- Thumbnails: 3 small -->
      <ul
        class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5"
        data-reveal-group
      >
        <li
          v-for="t in thumbs"
          :key="t.slug"
          class="reveal-init group relative isolate overflow-hidden rounded-[20px] border border-line bg-bg-elevated/40 p-6 transition-all duration-700 ease-haptic hover:-translate-y-0.5 hover:border-line-strong hover:bg-bg-elevated/80"
          style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);"
        >
          <a
            :href="t.href"
            target="_blank"
            rel="noopener noreferrer"
            class="absolute inset-0 z-10"
            :aria-label="`Open ${t.title} on GitHub`"
          />
          <div class="flex items-center justify-between">
            <span
              class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle"
            >
              {{ t.index }}
            </span>
            <StatusDot :color="statusColor(t.status)" />
          </div>
          <h3
            class="mt-6 font-display text-[clamp(1.15rem,1.6vw,1.4rem)] font-semibold tracking-tight text-ink-primary"
          >
            {{ t.title }}
          </h3>
          <p class="mt-2 text-[14.5px] text-ink-muted">{{ t.oneLiner }}</p>
          <div class="mt-5 flex flex-wrap gap-1.5">
            <MonoChip v-for="s in t.stack.slice(0, 3)" :key="s">{{ s }}</MonoChip>
          </div>
        </li>
      </ul>

      <div
        class="reveal-init mt-12 flex flex-col items-start justify-between gap-4 border-t border-line/70 pt-6 md:flex-row md:items-center"
      >
        <p
          class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle"
        >
          + 18 more on github · prodiplan, micro-auth, vocal-trainer, …
        </p>
        <a
          href="https://github.com/rayinailham?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center gap-2 text-[14.5px] font-medium tracking-tight text-ink-primary"
        >
          <span
            class="border-b border-line transition-colors duration-500 group-hover:border-ink-primary"
          >
            Browse all repositories
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-3.5 w-3.5 transition-all duration-500 ease-haptic group-hover:translate-x-0.5 group-hover:-translate-y-px"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
