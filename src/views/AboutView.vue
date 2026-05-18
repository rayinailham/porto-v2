<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useReveal } from "@/composables/useReveal";
import { useCounter } from "@/composables/useCounter";
import MonoChip from "@/components/ui/MonoChip.vue";
import AppButton from "@/components/ui/AppButton.vue";

const root = ref<HTMLElement | null>(null);
useReveal(root);
useCounter(root);

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
          class="col-span-12 mt-12 max-w-[20ch] font-display text-display-xl text-ink-primary lg:mt-20"
        >
          <span class="block type-reveal">Two years from</span>
          <span class="block type-reveal text-ink-muted">Kotlin lifecycle</span>
          <span class="block type-reveal">to Go microservice</span>
          <span class="block type-reveal text-accent-warm">production paths.</span>
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
                class="mt-3 font-display text-[clamp(1.75rem,2.4vw,2.25rem)] font-semibold leading-none tracking-[-0.04em] text-ink-primary"
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
            class="reveal-init col-span-12 max-w-[20ch] font-display text-display-md text-ink-primary lg:col-span-7"
          >
            Three years, three operating modes.
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
              <div class="font-display text-[clamp(2.5rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.04em] text-ink-primary">
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
          <h2 class="reveal-init col-span-12 max-w-[18ch] font-display text-display-md text-ink-primary lg:col-span-7">
            Four positions I'd defend in a code review.
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
          <h2 class="reveal-init col-span-12 max-w-[16ch] font-display text-display-md text-ink-primary lg:col-span-7">
            Where I lead, not just contribute.
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

    <!-- Personal note -->
    <section class="relative py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">02.4</span>
            <span>Off the clock</span>
          </span>
        </div>

        <div class="grid grid-cols-12 gap-x-6 gap-y-12 pt-12">
          <h2 class="reveal-init col-span-12 max-w-[14ch] font-display text-display-md text-ink-primary lg:col-span-5">
            The other half.
          </h2>
          <div class="col-span-12 lg:col-span-7">
            <p class="reveal-init max-w-[52ch] text-body-lg text-ink-primary">
              I code better when there's a Hololive stream on a second monitor.
              Hoshimachi Suisei and Isaki Riona are the regulars; I clip on the
              side, which is where the After Effects and Premiere skills come
              from.
            </p>
            <p class="reveal-init mt-6 max-w-[52ch] text-body-md text-ink-muted">
              Languages: Indonesian (native), English (business), Japanese
              (basic). The Japanese is mostly so I understand the streams in real
              time — turns out it's also useful for reading source code from
              Japanese OSS authors.
            </p>
            <div class="reveal-init mt-12 flex flex-wrap items-center gap-4">
              <AppButton variant="primary" to="/contact">Get in touch</AppButton>
              <AppButton variant="ghost" to="/work">See selected work</AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
