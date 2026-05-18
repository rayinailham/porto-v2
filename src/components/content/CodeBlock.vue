<script setup lang="ts">
interface Props {
  /** code body — kept untrimmed for fidelity */
  code: string;
  language?: string;
  /** e.g. "internal/scheduler/runner.go:142" */
  file?: string;
  href?: string;
  caption?: string;
}
withDefaults(defineProps<Props>(), { language: "go" });
</script>

<template>
  <figure class="not-prose">
    <div class="border border-line">
      <div
        v-if="file"
        class="flex items-center justify-between gap-4 border-b border-line bg-bg-elevated/40 px-5 py-3"
      >
        <a
          v-if="href"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center gap-2 font-mono text-mono-sm text-ink-muted transition-colors hover:text-ink-primary"
        >
          <span
            class="inline-flex h-1.5 w-1.5 rounded-full bg-accent-warm"
            aria-hidden="true"
          />
          <span class="link-underline">{{ file }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.25"
            stroke-linecap="square"
            stroke-linejoin="miter"
            class="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </a>
        <span
          v-else
          class="inline-flex items-center gap-2 font-mono text-mono-sm text-ink-muted"
        >
          <span
            class="inline-flex h-1.5 w-1.5 rounded-full bg-accent-warm"
            aria-hidden="true"
          />
          {{ file }}
        </span>
        <span class="font-mono text-mono-xs uppercase text-ink-subtle">
          {{ language }}
        </span>
      </div>
      <pre
        class="overflow-x-auto bg-bg-base px-5 py-5 font-mono text-[12.5px] leading-[1.65] text-ink-primary/90"
      ><code>{{ code }}</code></pre>
    </div>
    <figcaption
      v-if="caption"
      class="mt-3 font-mono text-mono-xs uppercase text-ink-subtle"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
