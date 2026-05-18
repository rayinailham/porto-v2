<script setup lang="ts">
import { featured } from "@/data/portfolio";
import MonoChip from "@/components/ui/MonoChip.vue";
import StatusDot from "@/components/ui/StatusDot.vue";
import FeaturedCard from "@/components/sections/FeaturedCard.vue";

const large = featured.filter((f) => f.size !== "sm");
const thumbs = featured.filter((f) => f.size === "sm");

const totalLarge = String(large.length).padStart(2, "0");

const statusLabel = (s: "active" | "shipped" | "ongoing") =>
  s === "active" ? "Active build" : s === "shipped" ? "Shipped" : "Ongoing";

const statusColor = (s: "active" | "shipped" | "ongoing") =>
  s === "active" ? "warm" : s === "shipped" ? "success" : "cool";
</script>

<template>
  <section
    id="work"
    class="relative border-b border-line py-section"
    data-reveal-group
    aria-labelledby="work-heading"
  >
    <div class="shell-wide">
      <!-- Section marker -->
      <div
        class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
      >
        <span class="inline-flex items-center gap-3">
          <span class="text-ink-faint">03</span>
          <span>Selected work · 2024–2026</span>
        </span>
        <span class="hidden sm:inline">{{ totalLarge }} primary, {{ thumbs.length }} secondary</span>
      </div>

      <!-- Heading row -->
      <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
        <h2
          id="work-heading"
          class="reveal-init col-span-12 max-w-[22ch] font-display text-display-md text-ink-primary lg:col-span-8"
        >
          Selected work, with the receipts.
        </h2>
        <p class="reveal-init col-span-12 max-w-[40ch] text-body-md text-ink-muted lg:col-span-4 lg:text-right">
          A subset of what's public — chosen for impact, architectural depth,
          and the parts I'd happily defend in code review.
        </p>
      </div>

      <!-- Featured grid: hairline-divided 2-col layout -->
      <div
        class="reveal-init mt-section-sm grid grid-cols-1 border-t border-line lg:grid-cols-12"
      >
        <FeaturedCard
          :project="large[0]"
          :index="'01'"
          :total="totalLarge"
          class="lg:col-span-7 border-b border-line"
          :status-label="statusLabel(large[0].status)"
          :status-color="statusColor(large[0].status)"
        />

        <FeaturedCard
          :project="large[1]"
          :index="'02'"
          :total="totalLarge"
          tall
          class="lg:col-span-5 lg:row-span-2 border-b border-line lg:border-b-0"
          :status-label="statusLabel(large[1].status)"
          :status-color="statusColor(large[1].status)"
        />

        <FeaturedCard
          :project="large[2]"
          :index="'03'"
          :total="totalLarge"
          class="lg:col-span-7 border-b border-line"
          :status-label="statusLabel(large[2].status)"
          :status-color="statusColor(large[2].status)"
        />
      </div>

      <!-- Thumbnails: secondary works -->
      <div class="mt-section-sm" data-reveal-group>
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">03b</span>
            <span>Secondary index</span>
          </span>
          <span class="text-ink-muted">{{ thumbs.length }} entries</span>
        </div>

        <ul class="grid grid-cols-1 divide-y divide-line border-b border-line md:grid-cols-3 md:divide-x md:divide-y-0">
          <li
            v-for="(t, i) in thumbs"
            :key="t.slug"
            class="reveal-init group relative flex flex-col py-8 md:px-6 lg:px-8 lg:py-10 first:md:pl-0 last:md:pr-0"
          >
            <a
              :href="t.href"
              target="_blank"
              rel="noopener noreferrer"
              class="absolute inset-0 z-10"
              :aria-label="`Open ${t.title} on GitHub`"
            />
            <div class="flex items-baseline justify-between font-mono text-mono-xs uppercase text-ink-subtle">
              <span>
                <span class="text-ink-faint">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="ml-2">/ {{ String(thumbs.length).padStart(2, '0') }}</span>
              </span>
              <StatusDot :color="statusColor(t.status)" />
            </div>
            <h3
              class="mt-8 font-display text-[clamp(1.15rem,1.5vw,1.35rem)] font-semibold tracking-[-0.025em] text-ink-primary"
            >
              {{ t.title }}
            </h3>
            <p class="mt-3 max-w-[36ch] text-body-sm text-ink-muted">{{ t.oneLiner }}</p>
            <div class="mt-6 flex flex-wrap gap-1.5">
              <MonoChip v-for="s in t.stack.slice(0, 3)" :key="s">{{ s }}</MonoChip>
            </div>
            <div class="mt-auto pt-8">
              <span class="inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-ink-muted transition-colors duration-500 group-hover:text-accent-warm">
                <span class="link-underline">Repository</span>
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
            </div>
          </li>
        </ul>

        <div
          class="reveal-init mt-12 flex flex-col items-baseline justify-between gap-4 font-mono text-mono-xs uppercase text-ink-subtle md:flex-row"
        >
          <span>
            <span class="text-ink-faint">+18 / 24</span>
            <span class="ml-3 text-ink-muted">prodiplan, micro-auth, vocal-trainer, …</span>
          </span>
          <a
            href="https://github.com/rayinailham?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-2 text-ink-primary"
          >
            <span class="link-underline">Browse all repositories</span>
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
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
