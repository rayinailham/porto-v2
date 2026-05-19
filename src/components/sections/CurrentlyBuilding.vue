<script setup lang="ts">
import { ref } from "vue";
import StatusDot from "@/components/ui/StatusDot.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
import { useCounter } from "@/composables/useCounter";

const root = ref<HTMLElement | null>(null);
useCounter(root);
</script>

<template>
  <section
    ref="root"
    class="relative border-b border-line py-section-sm"
    data-reveal-group
    aria-label="Currently building"
  >
    <div class="shell-wide">
      <!-- Section marker -->
      <div
        class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
      >
        <span class="inline-flex items-center gap-3">
          <span class="text-ink-faint">01</span>
          <span>Live signal</span>
        </span>
        <span class="inline-flex items-center gap-2">
          <StatusDot color="warm" />
          <span class="text-ink-muted">In active build</span>
        </span>
      </div>

      <div class="grid grid-cols-12 gap-x-6 gap-y-10 pt-12">
        <!-- Lead text -->
        <div class="reveal-init col-span-12 lg:col-span-7">
          <h2
            class="max-w-[20ch] font-display text-display-md text-ink-primary track-snug"
            data-split="words"
          >
            Currently leading <span class="italic-accent text-accent-warm">WIS-FutureGuide</span>, a 9-service Go ecosystem for career guidance — <span class="italic-accent text-ink-muted">still actively shipping.</span>
          </h2>
          <div class="mt-8 flex flex-wrap gap-1.5">
            <MonoChip variant="warm">Go 1.24</MonoChip>
            <MonoChip>Clean Arch</MonoChip>
            <MonoChip>RabbitMQ</MonoChip>
            <MonoChip>Postgres 16</MonoChip>
            <MonoChip>9 services</MonoChip>
          </div>
        </div>

        <!-- Metric column — large numerals, hairline divided -->
        <dl
          class="col-span-12 grid grid-cols-2 gap-y-6 sm:grid-cols-3 sm:gap-y-0 lg:col-span-5"
          aria-label="Current build metrics"
        >
          <div class="reveal-init px-4 sm:px-6 sm:[&:not(:first-child)]:border-l sm:border-line">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">
              Services
            </dt>
            <dd
              class="mt-4 font-display text-[clamp(2rem,3.5vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-ink-primary num-tabular"
              data-counter="9"
            >0</dd>
          </div>
          <div class="reveal-init border-l border-line px-4 sm:px-6">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">
              Lanes
            </dt>
            <dd
              class="mt-4 font-display text-[clamp(2rem,3.5vw,3.25rem)] font-semibold leading-none tracking-[-0.04em] text-ink-primary num-tabular"
              data-counter="2"
            >0</dd>
            <span class="mt-2 inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              <span class="italic-accent normal-case tracking-normal text-ink-muted">sync</span>
              + <span class="italic-accent normal-case tracking-normal text-ink-muted">async</span>
            </span>
          </div>
          <div class="reveal-init col-span-2 mt-2 border-t border-line px-4 pt-6 sm:col-span-1 sm:mt-0 sm:border-l sm:border-t-0 sm:pt-0 sm:px-6">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">
              Last push
            </dt>
            <dd
              class="mt-4 font-display text-[clamp(1.25rem,1.8vw,1.6rem)] font-semibold leading-tight tracking-[-0.025em] text-ink-primary num-tabular"
            >
              May 26<span class="text-ink-faint">/26</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
