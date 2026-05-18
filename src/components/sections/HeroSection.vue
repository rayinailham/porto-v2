<script setup lang="ts">
import EyebrowTag from "@/components/ui/EyebrowTag.vue";
import StatusDot from "@/components/ui/StatusDot.vue";
import AppButton from "@/components/ui/AppButton.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
import TextureGrid from "@/components/texture/TextureGrid.vue";
import BlobLight from "@/components/texture/BlobLight.vue";
</script>

<template>
  <section
    class="relative isolate overflow-hidden pb-section-sm pt-[clamp(7rem,16vh,11rem)]"
    data-reveal-group
  >
    <!-- Texture: grid 3% + 2 blob lights (warm + cool) -->
    <TextureGrid :opacity="0.035" :size="64" fade="edges" />
    <BlobLight color="warm" :size="640" x="14%" y="22%" :opacity="0.55" :blur="140" />
    <BlobLight color="cool" :size="520" x="86%" y="78%" :opacity="0.42" :blur="160" />

    <!-- Subtle vignette to anchor lights -->
    <div
      class="pointer-events-none absolute inset-0 -z-10"
      style="
        background:
          radial-gradient(80% 60% at 50% 40%, transparent 0%, rgb(10 10 11 / 0.55) 100%);
      "
      aria-hidden="true"
    />

    <div class="shell relative">
      <!-- Top meta row -->
      <div
        class="reveal-init flex flex-wrap items-center justify-between gap-4"
      >
        <EyebrowTag dot label="Available · Q2 2026" />
        <span class="hidden font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle md:inline">
          PORTFOLIO · v2 / 02
        </span>
      </div>

      <!-- Headline cluster -->
      <div class="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <h1
          class="reveal-init col-span-1 font-display text-display-xl text-balance text-ink-primary lg:col-span-9"
        >
          Go-first microservice
          <span class="block">
            architect
            <span class="relative inline-block">
              <span
                class="absolute -inset-x-2 -inset-y-1 -z-10 rounded-2xl bg-accent-warm/12 blur-md"
                aria-hidden="true"
              />
              <span class="text-accent-warm">shipping AI</span>
            </span>
            <span class="text-ink-subtle">/</span> in production.
          </span>
        </h1>

        <!-- Side meta column -->
        <aside
          class="reveal-init col-span-1 flex flex-col gap-6 self-end lg:col-span-3"
        >
          <p class="text-pretty text-body-md text-ink-muted">
            I design and ship multi-service systems with AI inside —
            warehouse automation, RAG products, vision and audio pipelines.
            Currently leading WIS-FutureGuide.
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <MonoChip variant="warm">Go 1.24</MonoChip>
            <MonoChip variant="cool">Vue 3</MonoChip>
            <MonoChip>pgvector</MonoChip>
            <MonoChip>uber-go/fx</MonoChip>
          </div>
        </aside>
      </div>

      <!-- CTA row + signature line -->
      <div
        class="reveal-init mt-12 flex flex-col gap-8 border-t border-line/70 pt-8 md:flex-row md:items-center md:justify-between"
      >
        <div class="flex flex-wrap items-center gap-3">
          <AppButton variant="primary" size="lg" href="#work">
            See selected work
          </AppButton>
          <AppButton
            variant="ghost"
            size="lg"
            href="https://github.com/rayinailham"
            external
          >
            GitHub · @rayinailham
            <template #icon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <path
                  d="M12 2C6.48 2 2 6.58 2 12.25c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.5-1.11-1.5-.91-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85.01 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z"
                />
              </svg>
            </template>
          </AppButton>
        </div>

        <div class="flex items-center gap-3">
          <StatusDot color="success" />
          <span class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-muted">
            Open to senior backend &amp; AI engineering roles
          </span>
        </div>
      </div>
    </div>

    <!-- Marquee strip — micro-detail at hero base -->
    <div
      class="reveal-init relative mt-section-sm overflow-hidden border-y border-line/60 bg-bg-base"
      data-lenis-prevent
    >
      <div
        class="flex w-max animate-marquee gap-12 py-5 font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle"
        aria-hidden="true"
      >
        <template v-for="i in 2" :key="i">
          <span class="flex items-center gap-12 px-8">
            <span>Tetra Engine · warehouse</span>
            <span class="text-ink-subtle/60">/</span>
            <span>FutureGuide · 9 services</span>
            <span class="text-ink-subtle/60">/</span>
            <span>Rumi-Talk · streaming RAG</span>
            <span class="text-ink-subtle/60">/</span>
            <span>Anevia · healthcare AI</span>
            <span class="text-ink-subtle/60">/</span>
            <span>Clip-Autosubs · GPU pipeline</span>
            <span class="text-ink-subtle/60">/</span>
            <span>mydoomscroll · OLED UX</span>
            <span class="text-ink-subtle/60">/</span>
          </span>
        </template>
      </div>
    </div>
  </section>
</template>
