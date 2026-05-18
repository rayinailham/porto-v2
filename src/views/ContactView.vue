<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useTypography } from "@/composables/useTypography";
import StatusDot from "@/components/ui/StatusDot.vue";
import AppButton from "@/components/ui/AppButton.vue";

const root = ref<HTMLElement | null>(null);
useTypography(root);

onMounted(() => {
  document.title = "Contact · Rayina Ilham";
});

interface Channel {
  num: string;
  label: string;
  handle: string;
  href: string;
  note: string;
  primary?: boolean;
}

const channels: Channel[] = [
  {
    num: "01",
    label: "Email",
    handle: "rayinailham9@gmail.com",
    href: "mailto:rayinailham9@gmail.com",
    note: "Best for project briefs and offers — I usually reply inside 24h.",
    primary: true,
  },
  {
    num: "02",
    label: "LinkedIn",
    handle: "linkedin.com/in/rayinailham",
    href: "https://linkedin.com/in/rayinailham",
    note: "For recruiter chats and longer intros.",
  },
  {
    num: "03",
    label: "GitHub",
    handle: "github.com/rayinailham",
    href: "https://github.com/rayinailham",
    note: "Source of truth for everything I've shipped publicly. Receipts.",
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
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">03</span>
            <span>Contact — channels open</span>
          </span>
          <span class="inline-flex items-center gap-2">
            <StatusDot color="success" />
            <span class="text-ink-muted">UTC+7 · online</span>
          </span>
        </div>

        <h1
          class="mt-12 max-w-[18ch] font-display text-display-xl text-ink-primary track-tight lg:mt-20"
        >
          <span class="block" data-split="words">Hireable.</span>
          <span class="block text-ink-muted" data-split="words">
            <span class="italic-accent text-ink-muted">Let's talk.</span>
          </span>
        </h1>
        <p class="reveal-init mt-10 max-w-[52ch] text-body-lg text-ink-muted">
          Three channels, no form. Pick whichever fits your context — I read
          all of them.
        </p>
      </div>
    </section>

    <!-- Channels -->
    <section class="relative border-b border-line py-section" data-reveal-group>
      <div class="shell-wide">
        <div
          class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">03.1</span>
            <span>Channels</span>
          </span>
          <span class="text-ink-muted">{{ channels.length }} open</span>
        </div>

        <ul class="border-b border-line">
          <li
            v-for="c in channels"
            :key="c.label"
            class="reveal-init"
          >
            <a
              :href="c.href"
              :target="c.href.startsWith('mailto:') ? undefined : '_blank'"
              :rel="c.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'"
              class="group grid grid-cols-12 items-baseline gap-x-6 gap-y-3 border-t border-line py-10 transition-colors duration-500 ease-haptic hover:bg-bg-elevated/40 lg:py-14"
            >
              <span class="col-span-12 font-mono text-mono-xs uppercase text-ink-subtle md:col-span-1">
                {{ c.num }}
              </span>
              <span class="col-span-12 font-mono text-mono-xs uppercase text-ink-muted md:col-span-2">
                {{ c.label }}
                <span v-if="c.primary" class="ml-2 text-accent-warm">primary</span>
              </span>
              <h2
                class="col-span-12 max-w-[28ch] font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink-primary md:col-span-7"
              >
                {{ c.handle }}
              </h2>
              <span
                class="col-span-12 inline-flex items-center gap-2 justify-self-start font-mono text-mono-xs uppercase text-ink-muted transition-colors duration-500 group-hover:text-accent-warm md:col-span-2 md:justify-self-end"
              >
                <span class="link-underline">Open</span>
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
              <p class="col-span-12 max-w-[60ch] text-body-md text-ink-muted md:col-span-10 md:col-start-3">
                {{ c.note }}
              </p>
            </a>
          </li>
        </ul>

        <!-- Footnote dl -->
        <dl class="mt-section-sm grid grid-cols-1 border-y border-line md:grid-cols-3">
          <div class="reveal-init px-6 py-8 md:px-8 md:py-10">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Reply window</dt>
            <dd class="mt-4 inline-flex items-center gap-2 font-display text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold tracking-[-0.025em] text-ink-primary">
              <StatusDot color="success" />
              &lt; 24 hrs · weekdays
            </dd>
          </div>
          <div class="reveal-init border-t border-line px-6 py-8 md:border-l md:border-t-0 md:px-8 md:py-10">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Open to</dt>
            <dd class="mt-4 font-display text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold tracking-[-0.025em] text-ink-primary">
              Senior · Lead · Contract
            </dd>
          </div>
          <div class="reveal-init border-t border-line px-6 py-8 md:border-l md:border-t-0 md:px-8 md:py-10">
            <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Languages</dt>
            <dd class="mt-4 font-display text-[clamp(1.05rem,1.5vw,1.25rem)] font-semibold tracking-[-0.025em] text-ink-primary">
              ID native · EN business · JP basic
            </dd>
          </div>
        </dl>

        <div class="reveal-init mt-12 flex flex-wrap items-center gap-4">
          <AppButton variant="ghost" to="/work">Browse selected work</AppButton>
        </div>
      </div>
    </section>
  </div>
</template>
