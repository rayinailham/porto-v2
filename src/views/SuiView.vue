<script setup lang="ts">
/**
 * /sui — unlisted transmission page.
 * Design language: Suisei palette (cosmic deep blue + comet warm + ice cyan),
 * asymmetric bento, double-bezel cards, perpetual micro-motion.
 *
 * This page intentionally breaks from the global Swiss editorial system —
 * it's the off-record letter. Different rules apply.
 */
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import SuiConstellation from "@/components/ui/SuiConstellation.vue";
import StarMark from "@/components/ui/StarMark.vue";
import EqualizerBars from "@/components/ui/EqualizerBars.vue";
import AudioLoopPlayer from "@/components/ui/AudioLoopPlayer.vue";

const router = useRouter();
const KAIKI_VIDEO_ID = "vwWMaReMUio";

const stageRef = ref<HTMLElement | null>(null);
const audioTrigger = ref<HTMLElement | null>(null);

let metaRobots: HTMLMetaElement | null = null;
let originalTitle = "";

// Live "in-orbit" clock — JST, where the comet streams from
const jstNow = ref("");
let clockTimer: number | null = null;

const formatJst = () => {
  try {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Tokyo",
    });
    jstNow.value = fmt.format(new Date());
  } catch {
    jstNow.value = "—";
  }
};

// Magnetic CTA — the back-to-index button "pulls" toward cursor
const ctaRef = ref<HTMLElement | null>(null);
const ctaTransform = ref("translate(0px, 0px)");
const onCtaMove = (e: MouseEvent) => {
  const el = ctaRef.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = (e.clientX - cx) * 0.18;
  const dy = (e.clientY - cy) * 0.18;
  ctaTransform.value = `translate(${dx}px, ${dy}px)`;
};
const onCtaLeave = () => {
  ctaTransform.value = "translate(0px, 0px)";
};

// Transmission log — intercepted notes, not a status report
const log = computed(() => [
  { t: "T+00:00", body: "Carrier locked · 星街すいせい · she said kyou mo kawaii and meant every word" },
  { t: "T+00:14", body: "Six years to Budokan. Drew the model herself. Hoshiyomi still watching." },
  { t: "T+02:31", body: "響咲リオナ online · walked in like she already knew the setlist · 響咲連合 assembled" },
  { t: "T+04:47", body: "紡木こかげ · 40 hours on Getting Over It · came back the next day · Komorebito holding" },
  { t: "T+07:02", body: "Kaiki Deishu's theme on loop · this is where the build session starts" },
]);

// Two stat cards
const stats = [
  { kicker: "Comet luminosity", value: "12.4", unit: "mag", note: "rising" },
  { kicker: "Transmission lag", value: "+7", unit: "h UTC", note: "JST locked" },
];

// Manifest — the list, three columns of named recipients
const manifest = [
  {
    handle: "星街すいせい",
    role: "Comet · hololive 0th gen",
    glyph: "α",
    line: "Built her own model from scratch. Got rejected. Kept going anyway. Six years later — Budokan. Hoshiyomi know.",
  },
  {
    handle: "響咲リオナ",
    role: "FLOW GLOW leader · DEV_IS",
    glyph: "β",
    line: "Walks in cool, melts for small animals. Shonen manga reader. Raps. Leads. Shows up every time. 響咲連合.",
  },
  {
    handle: "紡木こかげ",
    role: "FPS · VSPO!",
    glyph: "γ",
    line: "Cried on debut. Spent 40 hours on Getting Over It. Came back the next day and cleared it. Komorebito.",
  },
];

onMounted(() => {
  originalTitle = document.title;
  document.title = "// sui";
  metaRobots = document.createElement("meta");
  metaRobots.name = "robots";
  metaRobots.content = "noindex, nofollow";
  document.head.appendChild(metaRobots);

  formatJst();
  clockTimer = window.setInterval(formatJst, 1000);
});

onBeforeUnmount(() => {
  if (metaRobots && metaRobots.parentNode)
    metaRobots.parentNode.removeChild(metaRobots);
  document.title = originalTitle;
  if (clockTimer !== null) window.clearInterval(clockTimer);
});

const goHome = () => router.push("/");
</script>

<template>
  <div
    ref="stageRef"
    class="sui-stage relative isolate flex min-h-[100dvh] flex-col overflow-hidden font-sui text-sui-ink"
  >
    <!-- Constellation backdrop — full-bleed, always on -->
    <SuiConstellation :density="72" />

    <!-- Subtle film grain — fixed, pointer-none, no repaint cost -->
    <div class="sui-grain pointer-events-none fixed inset-0 z-[1]" aria-hidden="true" />

    <!-- Top transmission bar -->
    <header
      class="relative z-10 mx-auto mt-6 w-[min(96%,1380px)] rounded-full border border-white/10 bg-white/[0.04] px-2 py-2 backdrop-blur-xl"
    >
      <div
        class="flex items-center justify-between gap-3 rounded-full bg-white/[0.02] px-5 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
      >
        <div class="flex items-center gap-3">
          <span class="relative flex h-2 w-2">
            <span class="absolute inset-0 animate-ping rounded-full bg-sui-cyan/70" />
            <span class="relative h-2 w-2 rounded-full bg-sui-cyan" />
          </span>
          <span class="font-mono text-[11px] uppercase tracking-[0.32em] text-white/55">
            // sui · transmission
          </span>
        </div>

        <div
          class="hidden items-center gap-5 font-mono text-[11px] uppercase tracking-[0.28em] text-white/40 md:flex"
        >
          <span>JST · {{ jstNow }}</span>
          <span class="h-3 w-px bg-white/20" />
          <span>noindex · nofollow</span>
        </div>

        <button
          type="button"
          class="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1.5 pl-4 pr-1.5 font-mono text-[11px] uppercase tracking-[0.28em] text-white/70 transition-colors duration-500 hover:border-sui-cyan/40 hover:text-white"
          @click="goHome"
        >
          <span>Index</span>
          <span
            class="grid h-7 w-7 place-items-center rounded-full bg-white/10 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:bg-sui-cyan/25"
          >
            <svg viewBox="0 0 24 24" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="1.4">
              <path d="M5 12h14" stroke-linecap="round" />
              <path d="m13 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </header>

    <main class="relative z-10 flex flex-1 flex-col">
      <div
        class="mx-auto grid w-[min(96%,1380px)] grid-cols-12 gap-6 py-20 md:py-28 lg:py-36"
      >
        <!-- Eyebrow tag -->
        <div class="col-span-12">
          <span
            class="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white/65 backdrop-blur-md"
          >
            <StarMark :size="11" spin />
            <span>Off-record · letter № 01</span>
          </span>
        </div>

        <!-- Asymmetric headline — left 8 cols, with intentional white-space rhythm -->
        <h1
          class="col-span-12 mt-6 max-w-[18ch] font-display text-[clamp(2.85rem,7vw,6.25rem)] font-light leading-[0.94] tracking-[-0.035em] text-white lg:col-span-8 lg:mt-10"
        >
          For the
          <span class="sui-headline-accent">comet</span>
          that never apologised
          <br class="hidden md:inline" />
          for
          <span class="sui-headline-soft">shining alone</span>.
        </h1>

        <!-- Right rail — asymmetric meta column, sits lower than headline -->
        <aside class="col-span-12 mt-2 flex flex-col gap-4 lg:col-span-4 lg:mt-32">
          <p class="max-w-[34ch] text-[15px] leading-[1.65] text-white/65">
            For Riona, who shows up every stream like she has something to prove.
            For Kokage, who cried on debut and came back the next day.
            <span class="text-white/85">I code better with streams on. That's just true.</span>
          </p>
          <div class="mt-6 h-px w-12 bg-gradient-to-r from-sui-cyan via-sui-warm to-transparent" />
        </aside>

        <!-- BENTO — asymmetric, double-bezel cards. 12-col grid mapped manually. -->
        <section
          ref="audioTrigger"
          class="col-span-12 mt-16 grid grid-cols-12 gap-5 md:mt-24 lg:mt-28"
        >
          <!-- 1. Audio loop card — wide, primary -->
          <article class="sui-shell col-span-12 lg:col-span-7">
            <div class="sui-core flex flex-col gap-7 p-7 md:p-9">
              <header class="flex items-center justify-between">
                <span
                  class="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45"
                >
                  <StarMark :size="11" />
                  <span>01 / Audio bed</span>
                </span>
                <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-sui-cyan/80">
                  on loop
                </span>
              </header>

              <div>
                <h2
                  class="font-display text-[clamp(1.55rem,2.4vw,2.05rem)] font-light leading-[1.05] tracking-[-0.025em] text-white"
                >
                  Carrier signal — <span class="sui-italic">Kaiki Deishu's theme</span>
                </h2>
                <p class="mt-3 max-w-[44ch] text-[14px] leading-[1.6] text-white/55">
                  Plays automatically when this transmission loads. Volume runs
                  ambient. Mute toggle below if the orbit gets noisy.
                </p>
              </div>

              <div>
                <AudioLoopPlayer
                  :video-id="KAIKI_VIDEO_ID"
                  :trigger="audioTrigger"
                  title="Kaiki Deishu's theme"
                  subtitle="signal · monogatari"
                />
              </div>
            </div>
          </article>

          <!-- 2. Live clock + stats card — narrow, top right -->
          <article class="sui-shell col-span-12 lg:col-span-5">
            <div class="sui-core flex flex-col gap-7 p-7 md:p-9">
              <header class="flex items-center justify-between">
                <span
                  class="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45"
                >
                  <span class="text-white/30">02</span>
                  <span>Comet · live</span>
                </span>
                <span class="relative inline-flex h-2 w-2">
                  <span class="absolute inset-0 animate-ping rounded-full bg-sui-warm/60" />
                  <span class="relative h-2 w-2 rounded-full bg-sui-warm" />
                </span>
              </header>

              <div>
                <div class="font-mono text-[10px] uppercase tracking-[0.32em] text-white/40">
                  Tokyo · JST
                </div>
                <div
                  class="mt-3 font-mono text-[clamp(2.4rem,4.5vw,3.6rem)] font-light tabular-nums leading-none tracking-[-0.04em] text-white"
                >
                  {{ jstNow || "—" }}
                </div>
              </div>

              <dl class="grid grid-cols-2 gap-4 border-t border-white/8 pt-6">
                <div v-for="s in stats" :key="s.kicker">
                  <dt class="font-mono text-[10px] uppercase tracking-[0.28em] text-white/40">
                    {{ s.kicker }}
                  </dt>
                  <dd class="mt-2.5 flex items-baseline gap-1.5">
                    <span class="font-display text-[clamp(1.25rem,1.8vw,1.55rem)] font-light text-white">
                      {{ s.value }}
                    </span>
                    <span class="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      {{ s.unit }}
                    </span>
                  </dd>
                  <dd class="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-sui-cyan/70">
                    {{ s.note }}
                  </dd>
                </div>
              </dl>
            </div>
          </article>

          <!-- 3. Manifest — three slim cards in a row, names of recipients -->
          <article
            v-for="m in manifest"
            :key="m.handle"
            class="sui-shell col-span-12 md:col-span-4"
          >
            <div class="sui-core relative flex flex-col gap-5 overflow-hidden p-7 md:p-7">
              <span
                class="pointer-events-none absolute right-4 top-4 font-display text-[clamp(2.5rem,4vw,3.5rem)] font-light leading-none tracking-tight text-white/8"
              >
                {{ m.glyph }}
              </span>
              <span class="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                {{ m.role }}
              </span>
              <h3
                class="font-display text-[clamp(1.35rem,1.9vw,1.7rem)] font-light leading-none tracking-[-0.025em] text-white"
              >
                {{ m.handle }}
              </h3>
              <p class="text-[13.5px] leading-[1.55] text-white/60">
                {{ m.line }}
              </p>
              <div class="mt-auto flex items-center gap-2 pt-3">
                <EqualizerBars
                  :bars="5"
                  :height="10"
                  :width="1.4"
                  :gap="2.5"
                  class="text-sui-cyan"
                />
                <span class="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                  signal · live
                </span>
              </div>
            </div>
          </article>

          <!-- 4. Transmission log — wide, bottom -->
          <article class="sui-shell col-span-12">
            <div class="sui-core p-7 md:p-9">
              <header class="flex items-center justify-between">
                <span
                  class="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/45"
                >
                  <StarMark :size="11" />
                  <span>03 / Transmission log</span>
                </span>
                <span class="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                  {{ log.length }} entries · streaming
                </span>
              </header>

              <ul class="mt-7 divide-y divide-white/6">
                <li
                  v-for="(row, i) in log"
                  :key="row.t"
                  class="flex items-baseline gap-4 py-3.5 md:gap-8"
                  :style="{ animationDelay: `${i * 90}ms` }"
                >
                  <span class="font-mono text-[10px] uppercase tracking-[0.28em] text-sui-cyan/70 num-tabular">
                    {{ row.t }}
                  </span>
                  <span class="flex-1 font-display text-[14.5px] font-light tracking-[-0.012em] text-white/85">
                    {{ row.body }}
                  </span>
                  <span class="font-mono text-[10px] uppercase tracking-[0.28em] text-white/30">
                    received
                  </span>
                </li>
              </ul>
            </div>
          </article>
        </section>

          <!-- Sign-off — magnetic CTA, double-bezel pill -->
        <div class="col-span-12 mt-20 flex flex-col items-start gap-5 md:mt-28">
          <span
            class="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40"
          >
            04 / sign-off · transmission ends
          </span>
          <h2
            class="max-w-[20ch] font-display text-[clamp(1.85rem,3.5vw,3rem)] font-light leading-[1.04] tracking-[-0.03em] text-white"
          >
            Keep streaming.
            <span class="sui-italic text-white/65">I'll keep building.</span>
          </h2>

          <button
            ref="ctaRef"
            type="button"
            class="sui-cta-shell group mt-4"
            :style="{ transform: ctaTransform }"
            @mousemove="onCtaMove"
            @mouseleave="onCtaLeave"
            @click="goHome"
          >
            <span class="sui-cta-core">
              <span class="font-mono text-[11px] uppercase tracking-[0.32em]">
                Return to index
              </span>
              <span class="sui-cta-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" class="h-3.5 w-3.5">
                  <path d="M5 12h14" stroke-linecap="round" />
                  <path d="m13 6 6 6-6 6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </span>
          </button>
        </div>
      </div>
    </main>

    <!-- Bottom hairline + footnote -->
    <footer
      class="relative z-10 mx-auto mb-6 mt-12 flex w-[min(96%,1380px)] items-center justify-between rounded-full border border-white/8 bg-white/[0.03] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 backdrop-blur-md"
    >
      <span>// unlisted route · /sui</span>
      <span class="hidden md:inline">linked from nowhere · 2026</span>
      <span class="text-sui-cyan/70">end of transmission</span>
    </footer>
  </div>
</template>

<style scoped>
/* ------- Suisei palette + scoped tokens ------- */
.sui-stage {
  /* Suisei: cosmic deep blue ground, ice-cyan primary, comet warm accent */
  --sui-bg: #050922;
  --sui-bg-elevated: #0c1240;
  --sui-bg-card: #0a0f33;
  --sui-cyan: #5cdcff;
  --sui-warm: #ffb359;
  --sui-soft: #b8a8ff; /* Suisei lavender — sparingly */
  --sui-ink: #e9eefc;
  --sui-ink-muted: rgba(233, 238, 252, 0.62);

  background-color: var(--sui-bg);
  color: var(--sui-ink);
}

/* Override font stack only inside this page — Plus Jakarta Sans for display */
.font-sui {
  font-family:
    "Plus Jakarta Sans Variable",
    "Plus Jakarta Sans",
    ui-sans-serif,
    system-ui,
    sans-serif;
  font-feature-settings: "ss01", "ss02";
  letter-spacing: -0.005em;
}

/* Custom Tailwind-like utility classes scoped to this page */
:deep(.text-sui-ink) {
  color: var(--sui-ink);
}
:deep(.text-sui-cyan),
.text-sui-cyan {
  color: var(--sui-cyan);
}
:deep(.text-sui-warm),
.text-sui-warm {
  color: var(--sui-warm);
}
:deep(.bg-sui-cyan) {
  background-color: var(--sui-cyan);
}
:deep(.bg-sui-warm) {
  background-color: var(--sui-warm);
}

/* These work because of how Vue scoped CSS handles utilities — but to be safe,
   we re-declare via attribute selectors so build CSS resolves them. */
.sui-stage :where([class*="text-sui-cyan"]) {
  color: var(--sui-cyan);
}
.sui-stage :where([class*="text-sui-warm"]) {
  color: var(--sui-warm);
}
.sui-stage :where([class*="bg-sui-cyan"]) {
  background-color: var(--sui-cyan);
}
.sui-stage :where([class*="bg-sui-warm"]) {
  background-color: var(--sui-warm);
}
.sui-stage :where([class*="border-sui-cyan"]) {
  border-color: var(--sui-cyan);
}

/* Headline accents — ice cyan with delicate inner glow, italic accent in serif */
.sui-headline-accent {
  color: var(--sui-cyan);
  font-style: italic;
  font-weight: 300;
  font-family: "Fraunces Variable", "Fraunces", ui-serif, Georgia, serif;
  font-variation-settings: "SOFT" 80, "WONK" 0, "opsz" 144;
  text-shadow:
    0 0 28px rgba(92, 220, 255, 0.32),
    0 0 1px rgba(92, 220, 255, 0.6);
  padding-right: 0.04em;
}
.sui-headline-soft {
  color: rgba(255, 255, 255, 0.86);
  font-style: italic;
  font-weight: 300;
  font-family: "Fraunces Variable", "Fraunces", ui-serif, Georgia, serif;
  font-variation-settings: "SOFT" 80, "WONK" 0, "opsz" 144;
  padding-right: 0.04em;
}
.sui-italic {
  color: rgba(255, 255, 255, 0.78);
  font-style: italic;
  font-weight: 380;
  font-family: "Fraunces Variable", "Fraunces", ui-serif, Georgia, serif;
  font-variation-settings: "SOFT" 80, "WONK" 0, "opsz" 144;
}

/* ------- Double-Bezel cards (Doppelrand) ------- */
.sui-shell {
  position: relative;
  padding: 6px;
  border-radius: 30px;
  background:
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.06) 0%,
      rgba(255, 255, 255, 0.02) 60%,
      rgba(255, 255, 255, 0.04) 100%
    );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 0 rgba(255, 255, 255, 0.04),
    0 30px 60px -30px rgba(5, 9, 34, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: transform 700ms cubic-bezier(0.32, 0.72, 0, 1),
    border-color 700ms cubic-bezier(0.32, 0.72, 0, 1),
    box-shadow 700ms cubic-bezier(0.32, 0.72, 0, 1);
  will-change: transform;
}
.sui-shell:hover {
  border-color: rgba(92, 220, 255, 0.22);
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    inset 0 -1px 0 rgba(255, 255, 255, 0.06),
    0 36px 72px -24px rgba(5, 9, 34, 0.75),
    0 0 0 1px rgba(92, 220, 255, 0.12);
}

.sui-core {
  position: relative;
  border-radius: 24px; /* shell radius - shell padding */
  background:
    radial-gradient(
      circle at 0% 0%,
      rgba(92, 220, 255, 0.06) 0%,
      transparent 38%
    ),
    radial-gradient(
      circle at 100% 100%,
      rgba(255, 179, 89, 0.05) 0%,
      transparent 35%
    ),
    rgba(10, 15, 51, 0.85);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.06),
    inset 0 0 0 1px rgba(255, 255, 255, 0.04);
  overflow: hidden;
}

/* ------- Magnetic CTA — double-bezel pill ------- */
.sui-cta-shell {
  display: inline-block;
  padding: 6px;
  border-radius: 9999px;
  background: linear-gradient(
    180deg,
    rgba(92, 220, 255, 0.18) 0%,
    rgba(255, 179, 89, 0.12) 100%
  );
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 24px 48px -16px rgba(92, 220, 255, 0.28);
  transition: transform 350ms cubic-bezier(0.32, 0.72, 0, 1);
  cursor: pointer;
}
.sui-cta-shell:active {
  transform: scale(0.98) !important;
}

.sui-cta-core {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px 14px 26px;
  border-radius: 9999px;
  background: linear-gradient(180deg, #0c1240 0%, #050922 100%);
  color: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transition: background 600ms cubic-bezier(0.32, 0.72, 0, 1);
}
.group:hover .sui-cta-core {
  background: linear-gradient(180deg, #122067 0%, #060c2e 100%);
}

.sui-cta-icon {
  display: inline-grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  background: rgba(92, 220, 255, 0.16);
  color: var(--sui-cyan);
  transition: transform 600ms cubic-bezier(0.32, 0.72, 0, 1),
    background 500ms cubic-bezier(0.32, 0.72, 0, 1);
}
.group:hover .sui-cta-icon {
  background: rgba(92, 220, 255, 0.32);
  transform: translate(2px, -1px) scale(1.05);
}

/* ------- Film grain overlay ------- */
.sui-grain {
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>");
  opacity: 0.05;
  mix-blend-mode: overlay;
}

/* Hardcoded num-tabular here since the global utility might not reach */
.num-tabular {
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum", "lnum";
}

/* Mobile collapse — strict single-column behavior already from grid-cols-12,
   plus typography easing on small screens. */
@media (max-width: 768px) {
  .sui-shell {
    border-radius: 22px;
    padding: 5px;
  }
  .sui-core {
    border-radius: 17px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sui-shell,
  .sui-core,
  .sui-cta-shell,
  .sui-cta-icon,
  .sui-cta-core {
    transition: none;
  }
}
</style>
