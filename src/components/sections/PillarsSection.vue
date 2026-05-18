<script setup lang="ts">
import { pillars } from "@/data/portfolio";
import MonoChip from "@/components/ui/MonoChip.vue";
</script>

<template>
  <section
    id="pillars"
    class="relative border-b border-line py-section"
    data-reveal-group
    aria-labelledby="pillars-heading"
  >
    <div class="shell-wide">
      <!-- Section marker -->
      <div
        class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
      >
        <span class="inline-flex items-center gap-3">
          <span class="text-ink-faint">02</span>
          <span>Three operating modes</span>
        </span>
        <span class="hidden sm:inline">Pillars / 03</span>
      </div>

      <!-- Heading row -->
      <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
        <h2
          id="pillars-heading"
          class="reveal-init col-span-12 max-w-[24ch] font-display text-display-md text-ink-primary lg:col-span-8 track-snug"
          data-split="words"
        >
          One engineer, <span class="italic-accent text-ink-primary">three modes</span> —
          <span class="text-ink-muted">all of it <span class="italic-accent">already running in prod.</span></span>
        </h2>
        <p class="reveal-init col-span-12 max-w-[36ch] text-body-md text-ink-muted lg:col-span-4 lg:text-right">
          Backend, microservice, and AI — actually shipped, not just sitting
          pretty in a README.
        </p>
      </div>

      <!-- Pillars list — vertical stack with hairline rules, NOT 3-card grid -->
      <ol class="mt-section-sm divide-y divide-line border-y border-line">
        <li
          v-for="p in pillars"
          :key="p.index"
          class="reveal-init group grid grid-cols-12 gap-x-6 gap-y-5 py-10 lg:py-14"
        >
          <!-- Numeral + kicker -->
          <div class="col-span-12 lg:col-span-2">
            <div class="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink-primary num-tabular weight-shift">
              {{ p.index }}
            </div>
            <div class="mt-3 font-mono text-mono-xs uppercase text-ink-subtle">
              {{ p.kicker }}
            </div>
          </div>

          <!-- Title -->
          <h3
            class="col-span-12 max-w-[18ch] font-display text-heading-lg text-ink-primary lg:col-span-4 transition-colors duration-700 ease-haptic group-hover:text-ink-primary"
          >
            {{ p.title }}
          </h3>

          <!-- Body + stack -->
          <div class="col-span-12 lg:col-span-4">
            <p class="max-w-[42ch] text-body-md text-ink-muted">
              {{ p.body }}
            </p>
            <div class="mt-5 flex flex-wrap gap-1.5">
              <MonoChip v-for="s in p.stack" :key="s">{{ s }}</MonoChip>
            </div>
          </div>

          <!-- Proof -->
          <div class="col-span-12 lg:col-span-2 lg:text-right">
            <div class="font-mono text-mono-xs uppercase text-ink-subtle">
              {{ p.proof.label }}
            </div>
            <div class="mt-3 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
              {{ p.proof.project }}
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
