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
  <figure class="not-prose my-8">
    <div
      class="relative overflow-hidden rounded-[20px] border border-line bg-bg-elevated/40"
      style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);"
    >
      <div
        v-if="file"
        class="flex items-center justify-between gap-4 border-b border-line/70 bg-bg-base/60 px-5 py-3"
      >
        <a
          v-if="href"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          class="group inline-flex items-center gap-2 font-mono text-mono-sm text-ink-muted transition-colors hover:text-ink-primary"
        >
          <span
            class="inline-flex h-2 w-2 rounded-full bg-accent-warm/80"
            aria-hidden="true"
          />
          <span class="underline decoration-line decoration-from-font underline-offset-4 group-hover:decoration-ink-muted">{{ file }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-px"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </a>
        <span
          v-else
          class="inline-flex items-center gap-2 font-mono text-mono-sm text-ink-muted"
        >
          <span
            class="inline-flex h-2 w-2 rounded-full bg-accent-warm/80"
            aria-hidden="true"
          />
          {{ file }}
        </span>
        <span
          class="font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle"
        >
          {{ language }}
        </span>
      </div>
      <pre
        class="overflow-x-auto bg-bg-base/85 px-5 py-5 font-mono text-[13px] leading-[1.65] text-ink-primary/90"
      ><code>{{ code }}</code></pre>
    </div>
    <figcaption
      v-if="caption"
      class="mt-3 text-center font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
