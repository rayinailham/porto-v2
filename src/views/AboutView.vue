<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTypography } from "@/composables/useTypography";
import { useCounter } from "@/composables/useCounter";
import { useTextRotator } from "@/composables/useTextRotator";
import MonoChip from "@/components/ui/MonoChip.vue";
import AppButton from "@/components/ui/AppButton.vue";
import EqualizerBars from "@/components/ui/EqualizerBars.vue";
import RegistrationMark from "@/components/ui/RegistrationMark.vue";
import AudioLoopPlayer from "@/components/ui/AudioLoopPlayer.vue";

const root = ref<HTMLElement | null>(null);
const offClockSection = ref<HTMLElement | null>(null);
useTypography(root);
useCounter(root);

// YouTube ID — Kaiki Deishu's theme (Monogatari)
const KAIKI_VIDEO_ID = "vwWMaReMUio";

onMounted(() => {
  document.title = "About · Rayina Ilham";
});

interface Beat {
  year: string;
  span: string;
  title: string;
  body: string;
  stack: string[];
}

const arc: Beat[] = [
  {
    year: "2024",
    span: "Foundations",
    title: "Android-first, then a sharp pivot.",
    body:
      "Started serious work in Kotlin + Jetpack Compose, with a Flutter side experiment. The Android year was less about shipping apps and more about absorbing structure: lifecycle, MVVM, layered code. Right at the tail end of the year that mental model started looking for a bigger surface to apply itself to.",
    stack: ["Kotlin", "Jetpack Compose", "Flutter"],
  },
  {
    year: "2025",
    span: "Anevia · capstone year",
    title: "Healthcare AI, full-stack capstone.",
    body:
      "Anevia was the proof: backend in Hapi.js + Postgres + Firebase, AI service in FastAPI + TensorFlow + YOLOv8 + OpenCV — a two-step model pipeline detecting anemia from conjunctiva. The capstone forced every layer at once and cemented two preferences: clean separation between API and inference, and Postgres-anchored architectures.",
    stack: ["Hapi.js", "FastAPI", "TensorFlow", "YOLOv8", "Postgres"],
  },
  {
    year: "2026",
    span: "Go-first · microservice maturity",
    title: "The opinionated stack lands.",
    body:
      "Go 1.24 + uber-go/fx + sqlx became the default. Built FutureGuide as nine cooperating Go services, took on Tetra Engine as AnterAja's technical entrance challenge, and shipped Rumi-Talk to keep the AI muscle warm. The pattern is set: clean architecture per service, contract-first messaging, ship the boring parts boring.",
    stack: ["Go 1.24", "uber-go/fx", "sqlx", "RabbitMQ", "pgvector"],
  },
];

interface OrgBeat {
  name: string;
  body: string;
  href: string;
}

const orgs: OrgBeat[] = [
  {
    name: "WIS-FutureGuide",
    body: "Lead the 9-service Go ecosystem — auth, assessment, analysis-worker, chat, payment, admin, notification, gateway, shared.",
    href: "https://github.com/WIS-futureguide",
  },
  {
    name: "prodiplan",
    body: "Education grading platform — session, grading, admin, auth — Bun + Hono. Lighter footprint, same patterns.",
    href: "https://github.com/prodiplan",
  },
  {
    name: "WIS-pptgenerator",
    body: "AI PPT generator with Xendit payment integration. TS + Python microservice combo.",
    href: "https://github.com/WIS-pptgenerator",
  },
];

interface Belief {
  num: string;
  title: string;
  body: string;
}

const beliefs: Belief[] = [
  {
    num: "01",
    title: "Architecture beats cleverness.",
    body:
      "The 'wow' line of code is a vanity metric. A boring system that fails predictably and recovers cleanly will outrun a clever system every quarter.",
  },
  {
    num: "02",
    title: "Postgres is the answer until proven otherwise.",
    body:
      "From relational data to vectors with pgvector, from cache to queue with LISTEN/NOTIFY — Postgres covers more ground than people give it credit for.",
  },
  {
    num: "03",
    title: "Async is a contract, not a vibe.",
    body:
      "Every event has a correlation_id, a topic, and a documented consumer. If you can't draw the fan-out on a napkin, the design isn't done.",
  },
  {
    num: "04",
    title: "Ship the dashboard.",
    body:
      "An invisible system is an unreliable system. Every backend project I take seriously gets a thin operational UI — not because users want it, but because future-me does.",
  },
];

// Off-clock — text rotator for "now playing" line
const nowPlaying = [
  { kind: "Build", value: "Carian Sorcery Sword + parry" },
  { kind: "Sidearm", value: "Milady — she catches the rhythm" },
  { kind: "Mobile", value: "Chaos Zero : Nightmare" },
  { kind: "Stream", value: "Hoshimachi Suisei · Isaki Riona · Kokage Tsumugi" },
  { kind: "Anime", value: "Clevatess (blind run, Alicia stuck)" },
  { kind: "Loop", value: "Kaiki Deishu's theme" },
  { kind: "Mascot", value: "Frostlass · 6% win-rate engineering" },
];
const npIdx = useTextRotator(nowPlaying.length, 3400);
</script>

<template>
  <div ref="root" class="relative">
    <!-- Hero -->
    <section
      class="relative border-b border-line pt-[clamp(8rem,18vh,12rem)] pb-section-sm"
      data-reveal-group
    >
      <div class="shell-wide">
        <!-- Section marker -->
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">02</span>
            <span>About — file open</span>
          </span>
          <span class="hidden sm:inline">2024 → 2026</span>
        </div>

        <!-- Headline -->
        <h1
          class="col-span-12 mt-12 max-w-[20ch] font-display text-display-xl text-ink-primary track-tight lg:mt-20"
        >
          <span class="block" data-split="words">Two years from</span>
          <span class="block text-ink-muted" data-split="words">
            <span class="italic-accent">Kotlin lifecycle</span>
          </span>
          <span class="block" data-split="words">to Go microservice</span>
          <span class="block text-accent-warm" data-split="words">
            <span class="italic-accent">production paths.</span>
          </span>
        </h1>

        <!-- Lead + meta dl -->
        <div class="mt-section-sm grid grid-cols-12 gap-x-6 gap-y-12">
          <p class="reveal-init col-span-12 max-w-[52ch] text-body-lg text-ink-muted lg:col-span-7">
            I'm Rayina Ilham — engineer based in Indonesia. I design and ship
            multi-service systems with AI inside, from concept to production. My
            line of work sits where backend depth, microservice topology, and
            practical AI converge.
          </p>
          <dl class="col-span-12 grid grid-cols-2 lg:col-span-5">
            <div class="reveal-init border-l border-line px-5 py-3 first:border-l-0 first:pl-0">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Public repos</dt>
              <dd
                class="mt-3 font-display text-[clamp(1.75rem,2.4vw,2.25rem)] font-semibold leading-none tracking-[-0.04em] text-ink-primary num-tabular"
                data-counter="46"
              >0</dd>
            </div>
            <div class="reveal-init border-l border-line px-5 py-3">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Member since</dt>
              <dd class="mt-3 font-display text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold tracking-[-0.025em] text-ink-primary">
                May / 2023
              </dd>
            </div>
            <div class="reveal-init border-l border-line border-t px-5 py-3 first:border-l-0 first:pl-0">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Status</dt>
              <dd class="mt-3 inline-flex items-center gap-2 font-display text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold tracking-[-0.025em] text-ink-primary">
                <span class="status-dot text-accent-success" aria-hidden="true" />
                Hireable
              </dd>
            </div>
            <div class="reveal-init border-l border-t border-line px-5 py-3">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Based in</dt>
              <dd class="mt-3 font-display text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold tracking-[-0.025em] text-ink-primary">
                Indonesia
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Career arc — vertical hairline timeline -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">02.1</span>
            <span>Career arc</span>
          </span>
          <span class="hidden sm:inline">03 / 03</span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
          <h2
            class="reveal-init col-span-12 max-w-[20ch] font-display text-display-md text-ink-primary track-snug lg:col-span-7"
            data-split="words"
          >
            Three years, <span class="italic-accent text-ink-muted">three operating modes.</span>
          </h2>
          <p class="reveal-init col-span-12 max-w-[40ch] text-body-md text-ink-muted lg:col-span-5 lg:text-right">
            Each year inherits the previous year's structural lessons and applies
            them to a bigger surface.
          </p>
        </div>

        <ol class="mt-section-sm divide-y divide-line border-y border-line" aria-label="Career timeline">
          <li
            v-for="(b, i) in arc"
            :key="b.year"
            class="reveal-init grid grid-cols-12 gap-x-6 gap-y-5 py-10 lg:py-14"
          >
            <div class="col-span-12 lg:col-span-2">
              <div class="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink-primary num-tabular weight-shift">
                {{ b.year }}
              </div>
              <div class="mt-3 font-mono text-mono-xs uppercase text-ink-subtle">
                <span class="text-ink-faint">{{ String(i + 1).padStart(2, '0') }} / 03</span>
                <span class="ml-2">{{ b.span }}</span>
              </div>
            </div>

            <h3 class="col-span-12 max-w-[22ch] font-display text-heading-lg text-ink-primary lg:col-span-4">
              {{ b.title }}
            </h3>

            <div class="col-span-12 lg:col-span-6">
              <p class="max-w-[52ch] text-body-md text-ink-muted">
                {{ b.body }}
              </p>
              <div class="mt-5 flex flex-wrap gap-1.5">
                <MonoChip v-for="s in b.stack" :key="s">{{ s }}</MonoChip>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- Beliefs / operating principles -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">02.2</span>
            <span>Operating principles</span>
          </span>
          <span class="hidden sm:inline">04 / 04</span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
          <h2 class="reveal-init col-span-12 max-w-[18ch] font-display text-display-md text-ink-primary track-snug lg:col-span-7" data-split="words">
            Four positions <span class="italic-accent text-ink-muted">I'd defend in a code review.</span>
          </h2>
        </div>

        <ul class="mt-section-sm grid grid-cols-1 border-y border-line md:grid-cols-2">
          <li
            v-for="(b, i) in beliefs"
            :key="b.num"
            class="reveal-init flex flex-col px-6 py-10 md:px-8 md:py-12"
            :class="[
              i % 2 === 1 ? 'md:border-l md:border-line' : '',
              i >= 2 ? 'md:border-t md:border-line' : '',
              i > 0 && i % 2 === 0 ? 'border-t border-line md:border-t-0' : '',
              i === 1 ? 'border-t border-line md:border-t-0' : '',
              i === 3 ? 'border-t border-line md:border-t md:border-line' : '',
            ]"
          >
            <span class="font-mono text-mono-xs uppercase text-ink-subtle">
              <span class="text-ink-faint">{{ b.num }}</span>
              <span class="ml-2">/ 04</span>
            </span>
            <h3 class="mt-8 max-w-[22ch] font-display text-heading-lg text-ink-primary">
              {{ b.title }}
            </h3>
            <p class="mt-4 max-w-[42ch] text-body-md text-ink-muted">
              {{ b.body }}
            </p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Org work -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">02.3</span>
            <span>Org work</span>
          </span>
          <span class="text-ink-muted">{{ orgs.length }} entries</span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-8 pt-12">
          <h2 class="reveal-init col-span-12 max-w-[16ch] font-display text-display-md text-ink-primary track-snug lg:col-span-7" data-split="words">
            Where I lead, <span class="italic-accent text-ink-muted">not just contribute.</span>
          </h2>
          <p class="reveal-init col-span-12 max-w-[36ch] text-body-md text-ink-muted lg:col-span-5 lg:text-right">
            Beyond personal repos, I drive architecture and delivery for several
            GitHub organizations.
          </p>
        </div>

        <ul class="mt-section-sm divide-y divide-line border-y border-line">
          <li
            v-for="(o, i) in orgs"
            :key="o.name"
            class="reveal-init"
          >
            <a
              :href="o.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group grid grid-cols-12 items-baseline gap-x-6 gap-y-3 py-8 transition-colors duration-500 ease-haptic hover:bg-bg-elevated/40 lg:py-10"
            >
              <span class="col-span-12 font-mono text-mono-xs uppercase text-ink-subtle md:col-span-1">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <h3 class="col-span-12 font-display text-heading-lg text-ink-primary md:col-span-3">
                {{ o.name }}
              </h3>
              <p class="col-span-12 max-w-[52ch] text-body-md text-ink-muted md:col-span-7">
                {{ o.body }}
              </p>
              <span
                class="col-span-12 inline-flex items-center gap-2 justify-self-start font-mono text-mono-xs uppercase text-ink-muted transition-colors duration-500 group-hover:text-accent-warm md:col-span-1 md:justify-self-end"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.25"
                  stroke-linecap="square"
                  stroke-linejoin="miter"
                  class="h-3 w-3 transition-transform duration-500 ease-haptic group-hover:translate-x-1 group-hover:-translate-y-px"
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Off-clock — expanded with hobby telemetry + motion graphics -->
    <section
      ref="offClockSection"
      class="relative isolate overflow-hidden py-section"
      data-reveal-group
    >
      <!-- Decorative registration mark — top right -->
      <div class="pointer-events-none absolute right-6 top-10 hidden md:block">
        <RegistrationMark :size="32" :speed="44" />
      </div>

      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">02.4</span>
            <span>Off the clock</span>
          </span>
          <span class="hidden items-center gap-3 sm:inline-flex">
            <EqualizerBars :bars="6" :height="11" :width="1.5" :gap="3" class="text-accent-warm" />
            <span class="text-ink-muted">audio · loops</span>
          </span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-12 pt-12">
          <h2 class="reveal-init col-span-12 max-w-[16ch] font-display text-display-md text-ink-primary track-snug lg:col-span-5" data-split="words">
            The other half — <span class="italic-accent text-ink-muted">what runs when the IDE is closed.</span>
          </h2>
          <div class="col-span-12 lg:col-span-7">
            <p class="reveal-init max-w-[52ch] text-body-lg text-ink-primary">
              I code better when there's a Hololive stream on a second monitor.
              <span class="italic-accent text-ink-primary">Hoshimachi Suisei</span> and
              <span class="italic-accent text-ink-primary">Isaki Riona</span> are the regulars,
              with <span class="italic-accent text-ink-muted">Kokage Tsumugi</span> from VSPO
              dropping in. I clip on the side, which is where the After Effects and Premiere
              skills come from.
            </p>
            <p class="reveal-init mt-6 max-w-[52ch] text-body-md text-ink-muted">
              Languages: Indonesian (native), English (business), Japanese
              (basic). The Japanese is mostly so I understand the streams in real
              time — turns out it's also useful for reading source code from
              Japanese OSS authors.
            </p>
          </div>
        </div>

        <!-- Now-playing rotator strip -->
        <div
          class="reveal-init mt-section-sm grid grid-cols-12 items-baseline gap-x-6 gap-y-4 border-y border-line py-6"
        >
          <div class="col-span-12 md:col-span-3">
            <div class="font-mono text-mono-xs uppercase text-ink-subtle">
              <span>02.4 / B — Now playing</span>
            </div>
          </div>
          <div class="col-span-12 md:col-span-9">
            <div class="flex flex-wrap items-baseline gap-x-4 gap-y-2">
              <span class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-faint">
                {{ nowPlaying[npIdx].kind }} /
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
                  :key="nowPlaying[npIdx].value"
                  class="font-display text-[clamp(1.35rem,2.4vw,2rem)] font-medium tracking-[-0.028em] text-ink-primary"
                >
                  <span class="italic-accent text-ink-primary">{{ nowPlaying[npIdx].value }}</span>
                </span>
              </Transition>
            </div>
          </div>
        </div>

        <!-- Three-up hobby cards -->
        <div class="grid grid-cols-1 border-b border-line md:grid-cols-3">
          <article class="reveal-init flex flex-col gap-6 border-line py-10 md:border-l md:px-8 md:py-12 md:first:border-l-0 md:first:pl-0">
            <div class="flex items-baseline justify-between gap-3 font-mono text-mono-xs uppercase text-ink-subtle">
              <span class="inline-flex items-center gap-3">
                <span class="text-ink-faint">B.01</span>
                <span>Tarnished — current run</span>
              </span>
              <span class="text-ink-faint">ELDEN RING</span>
            </div>
            <h3 class="font-display text-[clamp(1.5rem,2vw,1.85rem)] font-semibold tracking-[-0.03em] text-ink-primary">
              <span class="italic-accent">Carian Sorcery Sword</span> + parry
            </h3>
            <p class="max-w-[36ch] text-body-md text-ink-muted">
              FTH/STR, Full STR, Parry + knife — all retired runs. Currently:
              sorcery in the right hand, parry shield in the left. Sidearm of choice still
              <span class="italic-accent text-ink-primary">Milady</span>.
            </p>
          </article>

          <article class="reveal-init flex flex-col gap-6 border-line py-10 md:border-l md:px-8 md:py-12">
            <div class="flex items-baseline justify-between gap-3 font-mono text-mono-xs uppercase text-ink-subtle">
              <span class="inline-flex items-center gap-3">
                <span class="text-ink-faint">B.02</span>
                <span>Mascot of choice</span>
              </span>
              <span class="text-ink-faint">ICE / GHOST</span>
            </div>
            <h3 class="font-display text-[clamp(1.5rem,2vw,1.85rem)] font-semibold tracking-[-0.03em] text-ink-primary">
              <span class="italic-accent">Frostlass</span>
            </h3>
            <p class="max-w-[36ch] text-body-md text-ink-muted">
              Weak by spec, sharper by play. If the win condition exists, I'll
              find it inside her potential ceiling.
            </p>
          </article>

          <article class="reveal-init flex flex-col gap-6 border-line py-10 md:border-l md:px-8 md:py-12 md:last:pr-0">
            <div class="flex items-baseline justify-between gap-3 font-mono text-mono-xs uppercase text-ink-subtle">
              <span class="inline-flex items-center gap-3">
                <span class="text-ink-faint">B.03</span>
                <span>Latest watch</span>
              </span>
              <span class="text-ink-faint">BLIND RUN</span>
            </div>
            <h3 class="font-display text-[clamp(1.5rem,2vw,1.85rem)] font-semibold tracking-[-0.03em] text-ink-primary">
              <span class="italic-accent">Clevatess</span>
            </h3>
            <p class="max-w-[36ch] text-body-md text-ink-muted">
              Went in blind, stayed for <span class="italic-accent text-ink-primary">Alicia</span> —
              mature, never acts on emotion. Quiet engineering trait.
            </p>
          </article>
        </div>

        <!-- Lower split: telemetry list + audio loop card -->
        <div class="grid grid-cols-12 gap-x-6 gap-y-12 pt-section-sm">
          <!-- Hobby dl -->
          <div class="reveal-init col-span-12 lg:col-span-7">
            <div class="flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle">
              <span class="inline-flex items-center gap-3">
                <span class="text-ink-faint">B.04</span>
                <span>Off-clock telemetry</span>
              </span>
              <span class="text-ink-muted">log · open</span>
            </div>

            <dl class="mt-2 divide-y divide-line">
              <div class="flex flex-wrap items-baseline justify-between gap-4 py-5">
                <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Mobile fixation</dt>
                <dd class="font-display text-[clamp(1rem,1.3vw,1.2rem)] font-medium tracking-[-0.022em] text-ink-primary">
                  <span class="italic-accent">Chaos Zero : Nightmare</span>
                </dd>
              </div>
              <div class="flex flex-wrap items-baseline justify-between gap-4 py-5">
                <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Tabletop / dungeon</dt>
                <dd class="font-display text-[clamp(1rem,1.3vw,1.2rem)] font-medium tracking-[-0.022em] text-ink-primary">
                  <span class="italic-accent">Darkest Dungeon I</span>
                  <span class="ml-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">only the original</span>
                </dd>
              </div>
              <div class="flex flex-wrap items-baseline justify-between gap-4 py-5">
                <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Anime · stuck</dt>
                <dd class="max-w-[34ch] text-right font-display text-[clamp(1rem,1.3vw,1.2rem)] font-medium tracking-[-0.022em] text-ink-primary">
                  <span class="italic-accent">Yoruwa Mijikashi, Arukeyo Otome</span>
                </dd>
              </div>
              <div class="flex flex-wrap items-baseline justify-between gap-4 py-5">
                <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Watched · approx</dt>
                <dd class="font-display text-[clamp(1rem,1.3vw,1.2rem)] font-medium tracking-[-0.022em] text-ink-primary num-tabular">
                  hundreds, possibly <span class="italic-accent">a thousand</span>
                </dd>
              </div>
              <div class="flex flex-wrap items-baseline justify-between gap-4 py-5">
                <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Character pull</dt>
                <dd class="max-w-[34ch] text-right font-display text-[clamp(1rem,1.3vw,1.2rem)] font-medium tracking-[-0.022em] text-ink-primary">
                  <span class="italic-accent">Alicia</span> — never on emotion
                </dd>
              </div>
            </dl>

            <div class="reveal-init mt-12 flex flex-wrap items-center gap-4">
              <AppButton variant="primary" to="/contact">Get in touch</AppButton>
              <AppButton variant="ghost" to="/work">See selected work</AppButton>
            </div>
          </div>

          <!-- Audio loop card -->
          <aside class="reveal-init col-span-12 flex flex-col border-l border-line pl-0 lg:col-span-5 lg:pl-12">
            <div class="flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle">
              <span class="inline-flex items-center gap-3">
                <span class="text-ink-faint">B.05</span>
                <span>Audio · on loop</span>
              </span>
              <RegistrationMark :size="14" :speed="22" reverse />
            </div>

            <div class="mt-8">
              <AudioLoopPlayer
                :video-id="KAIKI_VIDEO_ID"
                :trigger="offClockSection"
                title="Kaiki Deishu's theme"
                subtitle="signal · monogatari"
              />
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
                  Hololive · VSPO
                </dd>
              </div>
              <div class="flex items-baseline justify-between gap-4 py-3">
                <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Latest watch</dt>
                <dd class="font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                  Clevatess · Alicia
                </dd>
              </div>
            </dl>

            <p class="mt-5 max-w-[36ch] font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              // ambient · low volume · pauses when section leaves view
            </p>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>
