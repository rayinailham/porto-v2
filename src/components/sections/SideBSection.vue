<script setup lang="ts">
/**
 * Side B — off-clock telemetry.
 * The personal layer of the portfolio. Hobby data presented as if it were
 * production metrics — Swiss restraint with a wink.
 */
import { computed } from "vue";
import EqualizerBars from "@/components/ui/EqualizerBars.vue";
import RegistrationMark from "@/components/ui/RegistrationMark.vue";
import { useTextRotator } from "@/composables/useTextRotator";

// Currently-on rotation — cycles every 3.6s
const onRotation = [
  { kind: "Build", value: "Carian Sorcery Sword + parry" },
  { kind: "Mobile", value: "Chaos Zero : Nightmare" },
  { kind: "Stream", value: "Suisei · Riona · Tsumugi" },
  { kind: "Anime", value: "Clevatess (just finished, blind run)" },
  { kind: "Loop", value: "Kaiki Deishu's theme" },
];
const rotationIdx = useTextRotator(onRotation.length, 3600);
const current = computed(() => onRotation[rotationIdx.value]);

// Elden Ring loadout history — left as a vertical log
const erLog = [
  { idx: "01", label: "FTH / STR", state: "retired" },
  { idx: "02", label: "Full STR", state: "retired" },
  { idx: "03", label: "Parry + knife", state: "retired" },
  { idx: "04", label: "Carian sorcery + parry", state: "active" },
];

// Side cards — three vertical mini-panels
const cards = [
  {
    kicker: "Mascot of choice",
    title: "Frostlass",
    body:
      "Weak by spec, sharper by play. If the win condition exists, I'll find it inside her potential ceiling.",
    meta: "ICE / GHOST",
  },
  {
    kicker: "Tabletop / dungeon",
    title: "Darkest Dungeon I",
    body:
      "Only the original — the sequel can wait. Stress is a resource, not a debuff.",
    meta: "RUN · 2024",
  },
  {
    kicker: "Anime that sticks",
    title: "Yoruwa Mijikashi, Arukeyo Otome",
    body:
      "Hundreds watched, one stayed. Last finished: Clevatess — went in blind, stayed for Alicia. Mature, never acts on emotion.",
    meta: "ON LOOP",
  },
];
</script>

<template>
  <section
    id="side-b"
    class="relative isolate overflow-hidden border-b border-line py-section"
    data-reveal-group
    aria-labelledby="sideb-heading"
  >
    <!-- Decorative registration mark — top right -->
    <div class="pointer-events-none absolute right-6 top-10 hidden md:block">
      <RegistrationMark :size="36" :speed="48" />
    </div>

    <div class="shell-wide">
      <!-- Section marker -->
      <div
        class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
      >
        <span class="inline-flex items-center gap-3">
          <span class="text-ink-faint">B</span>
          <span>Side B · off-clock telemetry</span>
        </span>
        <span class="hidden items-center gap-3 sm:inline-flex">
          <EqualizerBars :bars="7" :height="12" :width="1.5" :gap="3" class="text-accent-warm" />
          <span class="text-ink-muted">audio · loops</span>
        </span>
      </div>

      <!-- Heading row -->
      <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
        <h2
          id="sideb-heading"
          class="reveal-init col-span-12 max-w-[22ch] font-display text-display-md text-ink-primary track-snug lg:col-span-8"
          data-split="words"
        >
          The other half — <span class="italic-accent text-ink-muted">what runs when the IDE is closed.</span>
        </h2>
        <p
          class="reveal-init col-span-12 max-w-[36ch] text-body-md text-ink-muted lg:col-span-4 lg:text-right"
        >
          Engineers are sharper when the off-time is documented too.
          File this under context, not credentials.
        </p>
      </div>

      <!-- Live rotation strip -->
      <div
        class="reveal-init mt-section-sm grid grid-cols-12 items-baseline gap-x-6 gap-y-4 border-y border-line py-6"
      >
        <div class="col-span-12 md:col-span-3">
          <div class="font-mono text-mono-xs uppercase text-ink-subtle">
            <span>B.01 — On rotation</span>
          </div>
        </div>
        <div class="col-span-12 md:col-span-9">
          <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
            <span
              class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-faint"
            >
              {{ current.kind }} /
            </span>
            <Transition
              mode="out-in"
              enter-active-class="transition-all duration-700 ease-haptic"
              enter-from-class="opacity-0 translate-y-1.5"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-500 ease-haptic"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1.5"
            >
              <span
                :key="current.value"
                class="font-display text-[clamp(1.35rem,2.4vw,2rem)] font-medium tracking-[-0.028em] text-ink-primary"
              >
                <span class="italic-accent text-ink-primary">{{ current.value }}</span>
              </span>
            </Transition>
          </div>
        </div>
      </div>

      <!-- Three personal cards -->
      <div
        class="grid grid-cols-1 border-b border-line md:grid-cols-3"
      >
        <article
          v-for="(c, i) in cards"
          :key="c.title"
          class="reveal-init group flex flex-col gap-6 border-line py-10 md:border-l md:px-8 md:py-12 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
        >
          <div class="flex items-baseline justify-between gap-3 font-mono text-mono-xs uppercase text-ink-subtle">
            <span class="inline-flex items-center gap-3">
              <span class="text-ink-faint">B.{{ String(i + 2).padStart(2, '0') }}</span>
              <span>{{ c.kicker }}</span>
            </span>
            <span class="text-ink-faint">{{ c.meta }}</span>
          </div>
          <h3
            class="font-display text-[clamp(1.5rem,2vw,1.85rem)] font-semibold tracking-[-0.03em] text-ink-primary"
          >
            <span class="italic-accent">{{ c.title }}</span>
          </h3>
          <p class="max-w-[36ch] text-body-md text-ink-muted">
            {{ c.body }}
          </p>
        </article>
      </div>

      <!-- Lower split: Elden Ring loadout log + audio loop card -->
      <div
        class="grid grid-cols-12 gap-x-6 gap-y-12 pt-section-sm"
      >
        <!-- Elden Ring log -->
        <div class="reveal-init col-span-12 lg:col-span-7">
          <div class="flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle">
            <span class="inline-flex items-center gap-3">
              <span class="text-ink-faint">B.05</span>
              <span>Tarnished — loadout log</span>
            </span>
            <span class="text-ink-muted">runs / 04</span>
          </div>

          <ol class="mt-2 divide-y divide-line">
            <li
              v-for="row in erLog"
              :key="row.idx"
              class="flex items-baseline gap-6 py-5"
            >
              <span class="font-mono text-mono-xs uppercase text-ink-faint">{{ row.idx }}</span>
              <span
                class="flex-1 font-display text-[clamp(1.1rem,1.4vw,1.35rem)] font-medium tracking-[-0.022em] text-ink-primary"
                :class="row.state === 'retired' ? 'text-ink-muted line-through decoration-line decoration-1 underline-offset-[6px]' : ''"
              >
                <span v-if="row.state === 'active'" class="italic-accent text-accent-warm">
                  {{ row.label }}
                </span>
                <span v-else>{{ row.label }}</span>
              </span>
              <span
                class="font-mono text-mono-xs uppercase"
                :class="row.state === 'active' ? 'text-accent-warm' : 'text-ink-faint'"
              >
                {{ row.state }}
              </span>
            </li>
          </ol>

          <p class="mt-6 max-w-[44ch] text-body-sm text-ink-muted">
            Currently — Carian sorcery sword in the right hand, parry shield in the left.
            Sidearm of choice still <span class="italic-accent text-ink-primary">Milady</span>;
            she catches the rhythm parries do not.
          </p>
        </div>

        <!-- Audio loop card -->
        <aside
          class="reveal-init col-span-12 flex flex-col border-l border-line pl-0 lg:col-span-5 lg:pl-12"
        >
          <div class="flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle">
            <span class="inline-flex items-center gap-3">
              <span class="text-ink-faint">B.06</span>
              <span>Audio · on loop</span>
            </span>
            <RegistrationMark :size="14" :speed="22" reverse />
          </div>

          <div class="mt-8 flex items-end gap-6">
            <EqualizerBars
              :bars="11"
              :height="56"
              :width="2"
              :gap="4"
              class="text-accent-warm"
            />
            <div>
              <div class="font-mono text-mono-xs uppercase text-ink-subtle">
                Now playing
              </div>
              <div
                class="mt-2 font-display text-[clamp(1.1rem,1.4vw,1.35rem)] font-semibold tracking-[-0.02em] text-ink-primary"
              >
                <span class="italic-accent">Kaiki Deishu's theme</span>
              </div>
              <div class="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                signal · monogatari
              </div>
            </div>
          </div>

          <dl class="mt-10 divide-y divide-line border-y border-line">
            <div class="flex items-baseline justify-between gap-4 py-3">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">VTuber rotation</dt>
              <dd class="font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                Suisei · Riona · Tsumugi
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">House label</dt>
              <dd class="font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                Hololive / VSPO
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-3">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Latest watch</dt>
              <dd class="font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                Clevatess · Alicia
              </dd>
            </div>
          </dl>

          <p class="mt-5 max-w-[36ch] text-body-sm text-ink-muted">
            <span class="italic-accent text-ink-primary">Alicia</span> — the one
            who never moves on emotion. Quiet engineering trait, honestly.
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>
