<script setup lang="ts">
import { pillars } from "@/data/portfolio";
import EyebrowTag from "@/components/ui/EyebrowTag.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
import TextureDots from "@/components/texture/TextureDots.vue";
</script>

<template>
  <section
    id="pillars"
    class="relative py-section"
    data-reveal-group
    aria-labelledby="pillars-heading"
  >
    <div class="shell">
      <div class="reveal-init flex flex-col items-start gap-6">
        <EyebrowTag label="Three pillars" />
        <h2
          id="pillars-heading"
          class="max-w-[26ch] text-balance font-display text-display-md text-ink-primary"
        >
          One engineer, three operating modes —
          <span class="text-ink-muted">all shipped, none theoretical.</span>
        </h2>
      </div>

      <ul
        class="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-3 md:gap-5"
      >
        <li
          v-for="p in pillars"
          :key="p.index"
          class="reveal-init group relative isolate overflow-hidden rounded-[24px] border border-line bg-bg-elevated/40 p-7 transition-all duration-700 ease-haptic hover:-translate-y-1 hover:border-line-strong hover:bg-bg-elevated/80"
          style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);"
        >
          <!-- per-card dots texture — only inside card -->
          <TextureDots :opacity="0.04" :size="14" fade="edges" />

          <div class="relative flex items-center justify-between">
            <span class="font-mono text-mono-xs uppercase tracking-[0.2em] text-ink-subtle">
              {{ p.index }} · {{ p.kicker }}
            </span>
            <span
              class="grid h-8 w-8 place-items-center rounded-full border border-line bg-bg-base/60 text-ink-muted transition-all duration-500 ease-haptic group-hover:border-line-strong group-hover:text-ink-primary"
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
                class="h-3.5 w-3.5 transition-transform duration-500 ease-haptic group-hover:translate-x-0.5 group-hover:-translate-y-px"
              >
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </span>
          </div>

          <h3
            class="relative mt-8 max-w-[20ch] text-balance font-display text-[clamp(1.4rem,2.2vw,1.85rem)] font-semibold leading-[1.15] tracking-tight text-ink-primary"
          >
            {{ p.title }}
          </h3>
          <p class="relative mt-4 max-w-prose text-body-md text-ink-muted">
            {{ p.body }}
          </p>

          <div
            class="relative mt-8 flex flex-wrap gap-1.5 border-t border-line/70 pt-5"
          >
            <MonoChip v-for="s in p.stack" :key="s">{{ s }}</MonoChip>
          </div>

          <div
            class="relative mt-5 flex items-center justify-between border-t border-line/70 pt-4 text-[13px]"
          >
            <span class="font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle">
              {{ p.proof.label }}
            </span>
            <span class="text-ink-primary">{{ p.proof.project }}</span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
