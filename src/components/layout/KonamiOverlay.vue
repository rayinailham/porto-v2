<script setup lang="ts">
/**
 * Konami code easter egg overlay.
 * Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
 * - Triggers once per session (sessionStorage flag)
 * - Auto-fades after 3s, dismissible by Esc / click outside / dismiss button
 */
import { onBeforeUnmount, onMounted, ref } from "vue";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
const SESSION_KEY = "konami:fired";

const open = ref(false);
const buffer: string[] = [];
let autoTimer: number | null = null;

const matchesNext = (key: string) => {
  const expected = SEQUENCE[buffer.length];
  return expected.toLowerCase() === key.toLowerCase();
};

const onKeyDown = (e: KeyboardEvent) => {
  if (open.value) {
    if (e.key === "Escape") dismiss();
    return;
  }

  if (matchesNext(e.key)) {
    buffer.push(e.key);
    if (buffer.length === SEQUENCE.length) {
      buffer.length = 0;
      trigger();
    }
  } else {
    buffer.length = 0;
    if (matchesNext(e.key)) buffer.push(e.key);
  }
};

const trigger = () => {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // ignore
  }
  open.value = true;
  if (autoTimer !== null) window.clearTimeout(autoTimer);
  autoTimer = window.setTimeout(() => dismiss(), 3000);
};

const dismiss = () => {
  open.value = false;
  if (autoTimer !== null) window.clearTimeout(autoTimer);
  autoTimer = null;
};

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeyDown);
  if (autoTimer !== null) window.clearTimeout(autoTimer);
});
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-500 ease-haptic"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-700 ease-haptic"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="konami-title"
      @click="dismiss"
    >
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-bg-base/85 backdrop-blur-md"
        aria-hidden="true"
      />

      <!-- Card — flat Swiss panel -->
      <div
        class="relative w-full max-w-md border border-line bg-bg-elevated p-10"
        @click.stop
      >
        <div class="flex items-center justify-between font-mono text-mono-xs uppercase text-ink-subtle">
          <span>// transmission · 04</span>
          <span class="inline-flex items-center gap-1.5">
            <span class="h-1 w-1 rounded-full bg-accent-warm" aria-hidden="true" />
            <span class="text-ink-faint">SIDE-B</span>
          </span>
        </div>

        <p class="mt-6 font-mono text-mono-sm uppercase tracking-[0.32em] text-ink-faint">
          ↑↑↓↓←→←→BA
        </p>

        <h2
          id="konami-title"
          class="mt-6 font-display text-heading-lg text-ink-primary"
        >
          <span class="italic-accent">Hoshiyomi</span> · Isaki Rengo · Tsumugi-gumi detected.
        </h2>
        <p class="mt-3 max-w-[36ch] text-body-md text-ink-muted">
          The comet, the gremlin, the office cat — and somewhere
          <span class="italic-accent text-ink-primary">Frostlass</span> running a 6% win-rate build.
        </p>

        <div
          class="mt-8 flex items-baseline justify-between gap-4 border-t border-line pt-5 font-mono text-mono-xs uppercase text-ink-subtle"
        >
          <span class="inline-flex items-center gap-2">
            <span class="h-1 w-1 rounded-full bg-accent-warm" aria-hidden="true" />
            SUI · RIONA · TSUMUGI
          </span>
          <button
            type="button"
            class="text-ink-muted transition-colors duration-300 hover:text-ink-primary"
            @click="dismiss"
          >
            Dismiss · esc
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
