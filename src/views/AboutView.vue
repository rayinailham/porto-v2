<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useReveal } from "@/composables/useReveal";
import EyebrowTag from "@/components/ui/EyebrowTag.vue";
import MonoChip from "@/components/ui/MonoChip.vue";
import AppButton from "@/components/ui/AppButton.vue";
import BlobLight from "@/components/texture/BlobLight.vue";
import TextureGrid from "@/components/texture/TextureGrid.vue";
import TextureHalftone from "@/components/texture/TextureHalftone.vue";

const root = ref<HTMLElement | null>(null);
useReveal(root, { stagger: 0.06, start: "top 90%" });

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
      class="relative isolate overflow-hidden pb-section-sm pt-[clamp(7rem,16vh,11rem)]"
      data-reveal-group
    >
      <TextureGrid :opacity="0.035" :size="64" fade="edges" />
      <BlobLight color="warm" :size="600" x="14%" y="22%" :opacity="0.5" :blur="160" />
      <BlobLight color="cool" :size="480" x="86%" y="78%" :opacity="0.32" :blur="180" />

      <div class="shell relative">
        <div class="reveal-init">
          <EyebrowTag label="About · 2024 → 2026" />
        </div>
        <h1
          class="reveal-init mt-8 max-w-[20ch] text-balance font-display text-display-xl text-ink-primary"
        >
          Two years from
          <span class="text-ink-muted">Kotlin lifecycle</span>
          <span class="block">to Go microservice</span>
          <span class="text-accent-warm">production paths.</span>
        </h1>

        <div class="reveal-init mt-10 grid grid-cols-1 gap-10 md:grid-cols-12">
          <p class="md:col-span-7 max-w-prose text-pretty text-body-lg text-ink-muted">
            I'm Rayina Ilham — engineer based in Indonesia. I design and ship
            multi-service systems with AI inside, from concept to production. My
            line of work sits where backend depth, microservice topology, and
            practical AI converge.
          </p>
          <dl class="md:col-span-5 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line">
            <div class="bg-bg-base/85 p-5">
              <dt class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">Public repos</dt>
              <dd class="mt-2 font-display text-[20px] font-semibold tracking-tight text-ink-primary">46</dd>
            </div>
            <div class="bg-bg-base/85 p-5">
              <dt class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">Member since</dt>
              <dd class="mt-2 font-display text-[20px] font-semibold tracking-tight text-ink-primary">May 2023</dd>
            </div>
            <div class="bg-bg-base/85 p-5">
              <dt class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">Status</dt>
              <dd class="mt-2 font-display text-[20px] font-semibold tracking-tight text-ink-primary">Hireable</dd>
            </div>
            <div class="bg-bg-base/85 p-5">
              <dt class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">Based in</dt>
              <dd class="mt-2 font-display text-[20px] font-semibold tracking-tight text-ink-primary">Indonesia</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- Career arc — vertical timeline -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              Career arc
            </span>
            <h2 class="reveal-init mt-3 max-w-[16ch] text-balance font-display text-heading-lg text-ink-primary">
              Three years, three operating modes.
            </h2>
            <p class="reveal-init mt-4 max-w-md text-body-md text-ink-muted">
              The trajectory is consistent: each year inherits the previous
              year's structural lessons and applies them to a bigger surface.
            </p>
          </div>

          <ol class="md:col-span-8 relative" aria-label="Career timeline">
            <span
              class="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-line via-line/60 to-transparent"
              aria-hidden="true"
            />
            <li
              v-for="(b, i) in arc"
              :key="b.year"
              class="reveal-init relative pl-10 pb-12 last:pb-0"
            >
              <span
                class="absolute left-0 top-1 grid h-4 w-4 place-items-center"
                aria-hidden="true"
              >
                <span class="h-2 w-2 rounded-full bg-accent-warm" />
                <span class="absolute inset-0 rounded-full border border-accent-warm/40" />
              </span>

              <div class="flex flex-wrap items-baseline gap-4">
                <span class="font-display text-[22px] font-bold tracking-tight text-ink-primary">
                  {{ b.year }}
                </span>
                <span class="font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle">
                  {{ b.span }} · {{ String(i + 1).padStart(2, '0') }} / 03
                </span>
              </div>
              <h3 class="mt-3 max-w-[26ch] text-balance font-display text-heading-md text-ink-primary">
                {{ b.title }}
              </h3>
              <p class="mt-3 max-w-prose text-pretty text-body-md text-ink-muted">
                {{ b.body }}
              </p>
              <div class="mt-4 flex flex-wrap gap-1.5">
                <MonoChip v-for="s in b.stack" :key="s">{{ s }}</MonoChip>
              </div>
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- Beliefs / operating principles -->
    <section class="relative py-section-sm" data-reveal-group>
      <TextureHalftone position="top" :opacity="0.18" />
      <div class="shell relative">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              Operating principles
            </span>
            <h2 class="reveal-init mt-3 max-w-[14ch] text-balance font-display text-heading-lg text-ink-primary">
              Four positions I'd defend in a code review.
            </h2>
          </div>
          <ul class="md:col-span-8 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            <li
              v-for="b in beliefs"
              :key="b.num"
              class="reveal-init relative overflow-hidden rounded-[20px] border border-line bg-bg-elevated/40 p-7 transition-all duration-700 ease-haptic hover:-translate-y-0.5 hover:border-line-strong"
              style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);"
            >
              <span class="font-mono text-mono-xs uppercase tracking-[0.2em] text-ink-subtle">
                {{ b.num }}
              </span>
              <h3 class="mt-6 max-w-[18ch] text-balance font-display text-[18px] font-semibold leading-[1.25] tracking-tight text-ink-primary">
                {{ b.title }}
              </h3>
              <p class="mt-3 max-w-prose text-[14.5px] leading-relaxed text-ink-muted">
                {{ b.body }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Organizations led -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              Org work
            </span>
            <h2 class="reveal-init mt-3 max-w-[14ch] text-balance font-display text-heading-lg text-ink-primary">
              Where I lead, not just contribute.
            </h2>
            <p class="reveal-init mt-4 max-w-md text-body-md text-ink-muted">
              Beyond personal repos, I drive architecture and delivery for
              several GitHub organizations.
            </p>
          </div>

          <ul class="md:col-span-8 divide-y divide-line/70 border-y border-line/70">
            <li
              v-for="o in orgs"
              :key="o.name"
              class="reveal-init"
            >
              <a
                :href="o.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex flex-col gap-3 py-6 transition-colors duration-500 ease-haptic md:flex-row md:items-center md:justify-between md:gap-8"
              >
                <div class="flex-1">
                  <h3 class="font-display text-[18px] font-semibold tracking-tight text-ink-primary">
                    {{ o.name }}
                  </h3>
                  <p class="mt-1 max-w-prose text-[14.5px] text-ink-muted">{{ o.body }}</p>
                </div>
                <span
                  class="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line bg-bg-elevated/60 text-ink-muted transition-all duration-500 ease-haptic group-hover:border-line-strong group-hover:text-ink-primary group-hover:translate-x-0.5 group-hover:-translate-y-px"
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
                    class="h-3.5 w-3.5"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Personal note -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div class="md:col-span-4">
            <span class="reveal-init font-mono text-mono-xs uppercase tracking-[0.22em] text-ink-subtle">
              Off the clock
            </span>
            <h2 class="reveal-init mt-3 max-w-[14ch] text-balance font-display text-heading-lg text-ink-primary">
              The other half.
            </h2>
          </div>
          <div class="md:col-span-8">
            <p class="reveal-init max-w-prose text-pretty text-body-lg text-ink-primary">
              I code better when there's a Hololive stream on a second monitor.
              Hoshimachi Suisei and Isaki Riona are the regulars; I clip on the
              side, which is where the After Effects and Premiere skills come from.
            </p>
            <p class="reveal-init mt-5 max-w-prose text-pretty text-body-md text-ink-muted">
              Languages: Indonesian (native), English (business), Japanese
              (basic). The Japanese is mostly so I understand the streams in real
              time — turns out it's also useful for reading source code from
              Japanese OSS authors.
            </p>
            <div class="reveal-init mt-10 flex flex-wrap items-center gap-3">
              <AppButton variant="primary" to="/contact">
                Get in touch
              </AppButton>
              <AppButton variant="ghost" to="/work">
                See selected work
              </AppButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
