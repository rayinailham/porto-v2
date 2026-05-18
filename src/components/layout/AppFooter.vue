<script setup lang="ts">
const year = new Date().getFullYear();

interface FooterLink {
  label: string;
  to?: string;
  href?: string;
  meta?: string;
}

const internal: FooterLink[] = [
  { label: "Index", to: "/", meta: "00" },
  { label: "Work", to: "/work", meta: "01" },
  { label: "About", to: "/about", meta: "02" },
  { label: "Contact", to: "/contact", meta: "03" },
];

const external: FooterLink[] = [
  { label: "GitHub", href: "https://github.com/rayinailham", meta: "@rayinailham" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rayinailham", meta: "/in/rayinailham" },
  { label: "Email", href: "mailto:rayinailham9@gmail.com", meta: "rayinailham9@gmail.com" },
];

const meta = [
  { label: "Status", value: "Hireable" },
  { label: "Based", value: "Indonesia / UTC+7" },
  { label: "Currently", value: "WIS-FutureGuide" },
  { label: "Reply", value: "< 24 hrs" },
];
</script>

<template>
  <footer class="relative border-t border-line">
    <div class="shell-wide pt-section-sm pb-10">
      <!-- Wordmark + statement -->
      <div class="grid grid-cols-12 gap-8">
        <div class="col-span-12 lg:col-span-7">
          <div class="font-mono text-mono-xs uppercase text-ink-subtle">
            <span>00 — Sign-off</span>
          </div>
          <p
            class="mt-6 max-w-[18ch] font-display text-[clamp(2.5rem,5.5vw,4.5rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-ink-primary"
          >
            Build the system.
            <span class="block text-ink-faint">Ship the proof.</span>
          </p>
        </div>

        <div class="col-span-12 lg:col-span-5 lg:pt-12">
          <p class="max-w-[42ch] text-body-md text-ink-muted">
            Go-first microservice architect, also shipping AI in production.
            Based in Indonesia, deploying everywhere. Open to senior backend
            &amp; AI engineering roles — hit the inbox.
          </p>
        </div>
      </div>

      <!-- Hairline divider -->
      <div class="mt-section-sm border-t border-line" />

      <!-- Meta + nav grid -->
      <div class="grid grid-cols-12 gap-x-8 gap-y-12 pt-12">
        <!-- Meta dl -->
        <dl class="col-span-12 grid grid-cols-2 gap-x-6 gap-y-8 md:col-span-6 lg:col-span-5">
          <div
            v-for="m in meta"
            :key="m.label"
          >
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">
              {{ m.label }}
            </dt>
            <dd class="mt-2 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
              {{ m.value }}
            </dd>
          </div>
        </dl>

        <!-- Internal nav -->
        <nav class="col-span-6 md:col-span-3 lg:col-span-3" aria-label="Site sections">
          <div class="font-mono text-mono-xs uppercase text-ink-subtle">Index</div>
          <ul class="mt-6 space-y-3">
            <li v-for="i in internal" :key="i.label">
              <router-link
                :to="i.to!"
                class="group flex items-baseline gap-3 font-mono text-mono-sm uppercase tracking-[0.04em] text-ink-muted transition-colors duration-300 hover:text-ink-primary"
              >
                <span class="text-ink-faint">{{ i.meta }}</span>
                <span class="link-underline">{{ i.label }}</span>
              </router-link>
            </li>
          </ul>
        </nav>

        <!-- External -->
        <nav class="col-span-6 md:col-span-3 lg:col-span-4" aria-label="External links">
          <div class="font-mono text-mono-xs uppercase text-ink-subtle">Channels</div>
          <ul class="mt-6 space-y-3">
            <li v-for="l in external" :key="l.href">
              <a
                :href="l.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-baseline justify-between gap-4 font-mono text-mono-sm uppercase tracking-[0.04em] text-ink-muted transition-colors duration-300 hover:text-ink-primary"
              >
                <span class="link-underline">{{ l.label }}</span>
                <span class="truncate text-[10px] tracking-[0.16em] text-ink-faint normal-case">
                  {{ l.meta }}
                </span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Hairline + colophon -->
      <div
        class="mt-section-sm flex flex-col gap-3 border-t border-line pt-6 font-mono text-mono-xs uppercase text-ink-subtle md:flex-row md:items-center md:justify-between"
      >
        <span>&copy; {{ year }} · Rayina Ilham · All rights reserved</span>
        <span class="text-ink-faint">
          Vue 3 / Vite · GSAP · Lenis · set in Inter, Fraunces &amp; JetBrains Mono
        </span>
      </div>

      <!-- Side-B colophon line — playful, almost-invisible -->
      <div
        class="mt-3 flex flex-col gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint md:flex-row md:items-center md:justify-between"
      >
        <span>// off-clock · carian sorcery sword + parry, milady at the hip</span>
        <span>signal &mdash; kaiki deishu's theme on loop</span>
      </div>
    </div>
  </footer>
</template>
