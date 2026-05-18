<script setup lang="ts">
const year = new Date().getFullYear();

interface FooterLink {
  label: string;
  to?: string;
  href?: string;
}

const internal: FooterLink[] = [
  { label: "Work", to: "/work" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const external: FooterLink[] = [
  { label: "GitHub", href: "https://github.com/rayinailham" },
  { label: "LinkedIn", href: "https://linkedin.com/in/rayinailham" },
  { label: "Email", href: "mailto:rayinailham9@gmail.com" },
];

const meta = [
  { label: "Status", value: "Hireable" },
  { label: "Based in", value: "Indonesia" },
  { label: "Currently", value: "FutureGuide" },
];
</script>

<template>
  <footer class="relative mt-section-sm border-t border-line/60">
    <div class="shell py-16">
      <div
        class="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8"
        data-reveal-group
      >
        <div class="md:col-span-5 lg:col-span-6">
          <router-link
            to="/"
            class="flex items-center gap-2 font-display text-2xl font-bold tracking-tight"
          >
            <span class="relative grid h-7 w-7 place-items-center rounded-full bg-bg-elevated text-xs font-bold">
              R
              <span
                class="absolute right-0 top-0 h-1.5 w-1.5 -translate-y-0.5 translate-x-0.5 rounded-full bg-accent-warm"
                aria-hidden="true"
              />
            </span>
            <span>Rayina Ilham</span>
          </router-link>
          <p class="mt-4 max-w-md text-balance text-body-md text-ink-muted">
            Go-first microservice architect shipping AI in production. Built
            from Indonesia, deploying everywhere.
          </p>

          <nav class="mt-6 flex flex-wrap gap-2" aria-label="Site sections">
            <router-link
              v-for="i in internal"
              :key="i.label"
              :to="i.to!"
              class="rounded-full border border-line bg-bg-elevated/40 px-3 py-1 font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-muted transition-colors duration-500 hover:border-line-strong hover:bg-bg-elevated hover:text-ink-primary"
            >
              {{ i.label }}
            </router-link>
          </nav>
        </div>

        <div
          class="grid grid-cols-2 gap-y-6 md:col-span-7 md:grid-cols-12 lg:col-span-6"
        >
          <dl class="col-span-2 grid grid-cols-3 gap-4 md:col-span-7 md:grid-cols-3">
            <div
              v-for="m in meta"
              :key="m.label"
              class="border-t border-line/80 pt-3"
            >
              <dt class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">
                {{ m.label }}
              </dt>
              <dd class="mt-1 text-[15px] font-medium text-ink-primary">
                {{ m.value }}
              </dd>
            </div>
          </dl>
          <ul class="col-span-2 flex flex-col gap-3 md:col-span-5">
            <li v-for="l in external" :key="l.href">
              <a
                :href="l.href"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center justify-between rounded-2xl border border-line bg-bg-elevated/40 px-4 py-3 transition-all duration-500 ease-haptic hover:border-line-strong hover:bg-bg-elevated"
              >
                <span class="text-[14.5px] font-medium tracking-tight text-ink-primary">
                  {{ l.label }}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-4 w-4 text-ink-muted transition-all duration-500 ease-haptic group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:text-ink-primary"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col gap-4 border-t border-line/80 pt-6 font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle md:flex-row md:items-center md:justify-between"
      >
        <span>&copy; {{ year }} · Rayina Ilham</span>
        <span
          class="text-ink-muted/80 normal-case tracking-normal font-body text-[13px]"
        >
          🎵 Coded with Hololive on loop. Built in Vue + Vite.
        </span>
      </div>
    </div>
  </footer>
</template>
