<script setup lang="ts">
import StatusDot from "@/components/ui/StatusDot.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
</script>

<template>
  <section
    class="relative isolate overflow-hidden border-b border-line pt-[clamp(8rem,18vh,12rem)] pb-section-sm"
    data-reveal-group
  >
    <div class="shell-wide">
      <!-- Section marker row -->
      <div
        class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
      >
        <span class="inline-flex items-center gap-3">
          <span class="text-ink-faint">00</span>
          <span>Index — Rayina Ilham</span>
        </span>
        <span class="hidden sm:inline">Portfolio · v2.0 · 2026</span>
      </div>

      <!-- Headline grid: 7/5 split, asymmetric Swiss -->
      <div class="mt-12 grid grid-cols-12 gap-x-6 gap-y-12 lg:mt-20">
        <!-- Side meta column (left rail) -->
        <aside
          class="reveal-init col-span-12 flex flex-col gap-6 lg:col-span-3"
        >
          <div>
            <div class="font-mono text-mono-xs uppercase text-ink-subtle">
              <span>A — Practice</span>
            </div>
            <p class="mt-3 max-w-[26ch] text-body-md text-ink-muted">
              Multi-service systems with AI under the hood — warehouse
              automation, RAG products, vision and audio pipelines.
            </p>
          </div>

          <div class="border-t border-line pt-6">
            <div class="font-mono text-mono-xs uppercase text-ink-subtle">
              <span>B — Stack of record</span>
            </div>
            <div class="mt-3 flex flex-wrap gap-1.5">
              <MonoChip variant="warm">Go 1.24</MonoChip>
              <MonoChip>uber-go/fx</MonoChip>
              <MonoChip>pgvector</MonoChip>
              <MonoChip>RabbitMQ</MonoChip>
              <MonoChip>FastAPI</MonoChip>
            </div>
          </div>
        </aside>

        <!-- Headline -->
        <h1
          class="col-span-12 lg:col-span-9"
        >
          <span class="block font-mono text-mono-xs uppercase text-ink-subtle reveal-init">
            <span class="text-ink-faint">§</span> Statement
          </span>
          <span
            class="mt-6 block font-display text-display-xl text-ink-primary track-tight"
          >
            <span class="block" data-split="words">Go-first microservice</span>
            <span class="block" data-split="words">
              <span class="italic-accent text-ink-primary">architect,</span> shipping
            </span>
            <span class="block" data-split="words">
              <span class="italic-accent text-accent-warm" data-split-skip>AI</span>
              <span class="text-ink-subtle"> / </span>in
              <span class="italic-accent text-ink-muted">production.</span>
            </span>
          </span>
        </h1>
      </div>

      <!-- Footer rail: status + cta + meta -->
      <div
        class="mt-section-sm grid grid-cols-12 gap-x-6 gap-y-8 border-t border-line pt-10"
        data-reveal-group
      >
        <!-- Status -->
        <div class="reveal-init col-span-12 sm:col-span-6 lg:col-span-3">
          <div class="font-mono text-mono-xs uppercase text-ink-subtle">
            <span>01 — Status</span>
          </div>
          <div class="mt-3 flex items-center gap-2 font-mono text-mono-sm uppercase text-ink-primary">
            <StatusDot color="success" />
            <span>Hireable · Q2 2026</span>
          </div>
        </div>

        <!-- Currently leading -->
        <div class="reveal-init col-span-12 sm:col-span-6 lg:col-span-3">
          <div class="font-mono text-mono-xs uppercase text-ink-subtle">
            <span>02 — Currently leading</span>
          </div>
          <div class="mt-3 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
            WIS-FutureGuide / 9 services
          </div>
        </div>

        <!-- Located -->
        <div class="reveal-init col-span-12 sm:col-span-6 lg:col-span-2">
          <div class="font-mono text-mono-xs uppercase text-ink-subtle">
            <span>03 — Located</span>
          </div>
          <div class="mt-3 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
            Indonesia · UTC+7
          </div>
        </div>

        <!-- CTA cluster -->
        <div
          class="reveal-init col-span-12 flex flex-wrap items-end gap-x-8 gap-y-3 lg:col-span-4 lg:justify-end"
        >
          <a
            href="#work"
            class="group inline-flex items-center gap-3 font-mono text-mono-xs uppercase text-ink-primary"
          >
            <span class="link-underline">See selected work</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="square"
              stroke-linejoin="miter"
              class="h-3 w-3 transition-transform duration-500 ease-haptic group-hover:translate-y-1"
            >
              <path d="M12 5v14" />
              <path d="m6 13 6 6 6-6" />
            </svg>
          </a>
          <a
            href="https://github.com/rayinailham"
            target="_blank"
            rel="noopener noreferrer"
            class="group inline-flex items-center gap-3 font-mono text-mono-xs uppercase text-ink-muted transition-colors duration-300 hover:text-ink-primary"
          >
            <span class="link-underline">GitHub · @rayinailham</span>
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

    <!-- Marquee strip — quiet typographic -->
    <div
      class="reveal-init relative mt-section-sm overflow-hidden border-y border-line bg-bg-base"
      data-lenis-prevent
    >
      <div
        class="flex w-max animate-marquee gap-16 py-4 font-mono text-mono-xs uppercase tracking-[0.28em] text-ink-faint"
        aria-hidden="true"
      >
        <template v-for="i in 2" :key="i">
          <span class="flex items-center gap-16 px-12">
            <span>Tetra Engine — warehouse</span>
            <span class="text-ink-faint">×</span>
            <span>FutureGuide — 9 services</span>
            <span class="text-ink-faint">×</span>
            <span>Rumi-Talk — streaming RAG</span>
            <span class="text-ink-faint">×</span>
            <span>Anevia — healthcare AI</span>
            <span class="text-ink-faint">×</span>
            <span>Clip-Autosubs — GPU pipeline</span>
            <span class="text-ink-faint">×</span>
            <span>mydoomscroll — OLED UX</span>
            <span class="text-ink-faint">×</span>
            <span class="text-ink-subtle">Side B — Carian sorcery + parry</span>
            <span class="text-ink-faint">×</span>
          </span>
        </template>
      </div>
    </div>
  </section>
</template>
