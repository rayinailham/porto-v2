<script setup lang="ts">
import StatusDot from "@/components/ui/StatusDot.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
</script>

<template>
  <section
    class="relative isolate overflow-hidden py-section-sm"
    data-reveal-group
    aria-label="Currently building"
  >
    <div class="shell">
      <div
        class="reveal-init group relative overflow-hidden rounded-[28px] border border-line bg-bg-elevated/60 p-1.5 backdrop-blur-md"
        style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 30px 80px -50px rgba(0, 0, 0, 0.9);"
      >
        <!-- Inner core (Double-Bezel inner) -->
        <div
          class="relative grid grid-cols-1 items-center gap-8 overflow-hidden rounded-[22px] bg-bg-base/85 px-7 py-7 md:grid-cols-12 md:gap-6 md:px-9 md:py-8"
        >
          <!-- subtle cool wash -->
          <div
            class="pointer-events-none absolute inset-0 opacity-60"
            style="
              background:
                radial-gradient(120% 80% at 0% 50%, rgb(0 102 255 / 0.06) 0%, transparent 60%);
            "
            aria-hidden="true"
          />

          <div class="md:col-span-7">
            <div class="flex items-center gap-3">
              <StatusDot color="warm" />
              <span
                class="font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-muted"
              >
                Currently · live signal
              </span>
            </div>
            <h2 class="mt-3 font-display text-heading-lg text-ink-primary">
              Leading <span class="text-accent-primary">WIS-FutureGuide</span> —
              a 9-service Go microservice ecosystem for career guidance, in active
              development.
            </h2>
            <div class="mt-4 flex flex-wrap items-center gap-2">
              <MonoChip variant="cool">Go</MonoChip>
              <MonoChip>Clean Arch</MonoChip>
              <MonoChip>RabbitMQ</MonoChip>
              <MonoChip>Postgres</MonoChip>
              <MonoChip variant="warm">9 services</MonoChip>
            </div>
          </div>

          <!-- Live commit-like metrics -->
          <dl
            class="md:col-span-5 grid grid-cols-3 gap-3 self-stretch"
            aria-label="Current build metrics"
          >
            <div
              v-for="m in [
                { v: '9', l: 'cooperating services' },
                { v: '2 lanes', l: 'sync + async' },
                { v: 'May 26', l: 'last push' },
              ]"
              :key="m.l"
              class="rounded-2xl border border-line bg-bg-elevated/60 px-4 py-3"
            >
              <dt
                class="font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle"
              >
                {{ m.l }}
              </dt>
              <dd
                class="mt-1 font-display text-[clamp(1.25rem,1.6vw,1.6rem)] font-semibold tracking-tight text-ink-primary"
              >
                {{ m.v }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
