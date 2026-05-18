<script setup lang="ts">
import { stackGroups } from "@/data/portfolio";
import EyebrowTag from "@/components/ui/EyebrowTag.vue";
import TextureHalftone from "@/components/texture/TextureHalftone.vue";
</script>

<template>
  <section
    id="stack"
    class="relative isolate overflow-hidden py-section"
    data-reveal-group
    aria-labelledby="stack-heading"
  >
    <!-- Halftone fade at top edge -->
    <TextureHalftone position="top" :opacity="0.22" />

    <div class="shell">
      <div
        class="reveal-init grid grid-cols-1 gap-8 md:grid-cols-12"
      >
        <div class="md:col-span-5">
          <EyebrowTag label="Selected stack · 2026" />
          <h2
            id="stack-heading"
            class="mt-6 max-w-[18ch] text-balance font-display text-display-md text-ink-primary"
          >
            Opinionated, not omnivorous.
          </h2>
          <p class="mt-5 max-w-md text-body-md text-ink-muted">
            The default tools for the job. Each line below is something I've
            shipped with in the last six months — not a wishlist, and definitely
            not a logo grid.
          </p>
        </div>

        <div class="md:col-span-7">
          <dl class="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            <div
              v-for="(group, idx) in stackGroups"
              :key="group.category"
              class="reveal-init bg-bg-base p-7 md:p-8"
              :class="idx === 0 ? '' : ''"
            >
              <div class="flex items-baseline justify-between gap-4">
                <dt class="font-display text-[18px] font-semibold tracking-tight text-ink-primary">
                  {{ group.category }}
                </dt>
                <span class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">
                  {{ String(idx + 1).padStart(2, '0') }} / {{ String(stackGroups.length).padStart(2, '0') }}
                </span>
              </div>
              <p class="mt-1.5 text-[13.5px] text-ink-muted">{{ group.caption }}</p>

              <ul class="mt-5 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
                <li
                  v-for="item in group.items"
                  :key="item.name"
                  class="group flex items-baseline justify-between gap-3 border-b border-line/60 py-1.5 last:border-b-0"
                >
                  <span class="font-display text-[15.5px] font-medium tracking-tight text-ink-primary">
                    {{ item.name }}
                  </span>
                  <span class="font-mono text-mono-xs uppercase tracking-[0.14em] text-ink-subtle">
                    {{ item.note }}
                  </span>
                </li>
              </ul>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
