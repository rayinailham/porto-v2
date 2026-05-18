<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useReveal } from "@/composables/useReveal";
import EyebrowTag from "@/components/ui/EyebrowTag.vue";
import StatusDot from "@/components/ui/StatusDot.vue";
import AppButton from "@/components/ui/AppButton.vue";
import BlobLight from "@/components/texture/BlobLight.vue";
import TextureGrid from "@/components/texture/TextureGrid.vue";

const root = ref<HTMLElement | null>(null);
useReveal(root, { stagger: 0.06, start: "top 90%" });

onMounted(() => {
  document.title = "Contact · Rayina Ilham";
});

const channels = [
  {
    label: "Email",
    handle: "rayinailham9@gmail.com",
    href: "mailto:rayinailham9@gmail.com",
    note: "Best for project briefs and offers · I reply within 24h.",
    primary: true,
  },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/rayinailham",
    href: "https://linkedin.com/in/rayinailham",
    note: "For recruiter conversations and longer-form intros.",
    primary: false,
  },
  {
    label: "GitHub",
    handle: "github.com/rayinailham",
    href: "https://github.com/rayinailham",
    note: "Source of truth for everything I've shipped publicly.",
    primary: false,
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
      <BlobLight color="warm" :size="640" x="80%" y="22%" :opacity="0.55" :blur="160" />
      <BlobLight color="cool" :size="480" x="14%" y="78%" :opacity="0.32" :blur="180" />

      <div class="shell relative">
        <div class="reveal-init">
          <EyebrowTag label="Contact · UTC+7" dot />
        </div>
        <h1
          class="reveal-init mt-8 max-w-[18ch] text-balance font-display text-display-xl text-ink-primary"
        >
          Hireable.
          <span class="block text-ink-muted">Let's talk.</span>
        </h1>
        <p class="reveal-init mt-6 max-w-[55ch] text-pretty text-body-lg text-ink-muted">
          Three channels, no form. Pick whichever lines up with your context —
          I read all of them.
        </p>
      </div>
    </section>

    <!-- Channels -->
    <section class="relative py-section-sm" data-reveal-group>
      <div class="shell">
        <ul class="grid grid-cols-1 gap-4 md:gap-5">
          <li
            v-for="c in channels"
            :key="c.label"
            class="reveal-init"
          >
            <a
              :href="c.href"
              :target="c.href.startsWith('mailto:') ? undefined : '_blank'"
              :rel="c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
              class="group relative flex flex-col gap-5 overflow-hidden rounded-[24px] border bg-bg-elevated/40 p-7 transition-all duration-700 ease-haptic hover:-translate-y-1 hover:border-line-strong md:flex-row md:items-center md:gap-8 md:p-9"
              :class="
                c.primary
                  ? 'border-accent-warm/30 hover:border-accent-warm/60'
                  : 'border-line'
              "
              style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);"
            >
              <div
                v-if="c.primary"
                class="pointer-events-none absolute inset-0 -z-10 opacity-50"
                style="
                  background:
                    radial-gradient(60% 80% at 100% 50%, rgb(255 107 53 / 0.18) 0%, transparent 60%);
                "
                aria-hidden="true"
              />

              <div class="flex shrink-0 items-center gap-3 md:w-[140px]">
                <span
                  class="font-mono text-mono-xs uppercase tracking-[0.2em] text-ink-subtle"
                >
                  {{ c.label }}
                </span>
              </div>

              <div class="flex-1 min-w-0">
                <p
                  class="font-display text-[clamp(1.15rem,1.8vw,1.5rem)] font-semibold tracking-tight text-ink-primary"
                >
                  {{ c.handle }}
                </p>
                <p class="mt-2 max-w-prose text-[14.5px] text-ink-muted">
                  {{ c.note }}
                </p>
              </div>

              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-bg-elevated/70 text-ink-muted transition-all duration-500 ease-haptic group-hover:border-line-strong group-hover:text-ink-primary group-hover:translate-x-0.5 group-hover:-translate-y-px"
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
                  class="h-4 w-4"
                >
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </a>
          </li>
        </ul>

        <!-- Footnote — what to expect -->
        <div
          class="reveal-init mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3"
        >
          <div class="bg-bg-base/85 p-6">
            <div class="flex items-center gap-3">
              <StatusDot color="success" />
              <span class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-muted">
                Reply window
              </span>
            </div>
            <p class="mt-3 font-display text-[18px] font-semibold tracking-tight text-ink-primary">
              &lt; 24 hours · weekdays
            </p>
          </div>
          <div class="bg-bg-base/85 p-6">
            <span class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">
              Open to
            </span>
            <p class="mt-3 font-display text-[18px] font-semibold tracking-tight text-ink-primary">
              Senior · Lead · Contract
            </p>
          </div>
          <div class="bg-bg-base/85 p-6">
            <span class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle">
              Languages
            </span>
            <p class="mt-3 font-display text-[18px] font-semibold tracking-tight text-ink-primary">
              ID native · EN business · JP basic
            </p>
          </div>
        </div>

        <div class="reveal-init mt-12 flex flex-wrap items-center gap-3">
          <AppButton variant="ghost" to="/work">
            Browse selected work
          </AppButton>
        </div>
      </div>
    </section>
  </div>
</template>
