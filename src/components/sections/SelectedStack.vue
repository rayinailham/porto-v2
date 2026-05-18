<script setup lang="ts">
import { stackGroups } from "@/data/portfolio";
</script>

<template>
  <section
    id="stack"
    class="relative border-b border-line py-section"
    data-reveal-group
    aria-labelledby="stack-heading"
  >
    <div class="shell-wide">
      <!-- Section marker -->
      <div
        class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
      >
        <span class="inline-flex items-center gap-3">
          <span class="text-ink-faint">04</span>
          <span>Selected stack · 2026</span>
        </span>
        <span class="hidden sm:inline">{{ stackGroups.length }} categories</span>
      </div>

      <!-- Heading row -->
      <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
        <h2
          id="stack-heading"
          class="reveal-init col-span-12 max-w-[18ch] font-display text-display-md text-ink-primary lg:col-span-8 track-snug"
          data-split="words"
        >
          Opinionated, <span class="italic-accent text-ink-muted">not a buffet.</span>
        </h2>
        <p class="reveal-init col-span-12 max-w-[40ch] text-body-md text-ink-muted lg:col-span-4 lg:text-right">
          The defaults I actually reach for. Everything below has shipped in
          the last six months. Not a wishlist.
        </p>
      </div>

      <!-- Stack groups — vertical hairline-divided columns -->
      <div
        class="mt-section-sm grid grid-cols-1 border-y border-line md:grid-cols-3"
      >
        <div
          v-for="(group, idx) in stackGroups"
          :key="group.category"
          class="reveal-init flex flex-col border-line py-10 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
        >
          <div class="flex items-baseline justify-between gap-3 font-mono text-mono-xs uppercase text-ink-subtle">
            <span class="inline-flex items-center gap-3">
              <span class="text-ink-faint">{{ String(idx + 1).padStart(2, '0') }}</span>
              <span class="text-ink-muted">{{ group.caption }}</span>
            </span>
          </div>

          <h3 class="mt-6 font-display text-heading-lg text-ink-primary">
            {{ group.category }}
          </h3>

          <ul class="mt-8 divide-y divide-line border-y border-line">
            <li
              v-for="item in group.items"
              :key="item.name"
              class="flex items-baseline justify-between gap-4 py-3"
            >
              <span class="font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                {{ item.name }}
              </span>
              <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                {{ item.note }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
