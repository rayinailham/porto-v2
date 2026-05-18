<script setup lang="ts">
/**
 * Konami code easter egg overlay.
 * Sequence: ↑ ↑ ↓ ↓ ← → ← → B A
 * - Triggers once per session (sessionStorage flag)
 * - Auto-fades after 3s, dismissible by Esc / click outside / dismiss button
 * - Respects prefers-reduced-motion (no transform animations)
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
    // restart from current key if it matches the start
    buffer.length = 0;
    if (matchesNext(e.key)) buffer.push(e.key);
  }
};

const trigger = () => {
  try {
    if (sessionStorage.getItem(SESSION_KEY)) return;
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // sessionStorage unavailable — still allow the firing in memory
  }
  open.value = true;
  // Auto-dismiss after 3s
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
        class="absolute inset-0 bg-bg-base/85 backdrop-blur-2xl"
        aria-hidden="true"
      />

      <!-- Card -->
      <div
        class="relative w-full max-w-md overflow-hidden rounded-[28px] border border-line bg-bg-elevated/80 p-1.5"
        style="
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.06),
            0 40px 100px -30px rgba(0, 0, 0, 0.95);
        "
        @click.stop
      >
        <div
          class="relative overflow-hidden rounded-[22px] bg-bg-base/85 px-7 py-9 text-center"
        >
          <!-- soft glows — Suisei nuance + warm accent -->
          <div
            class="pointer-events-none absolute -inset-1 -z-10 opacity-70"
            style="
              background:
                radial-gradient(60% 50% at 30% 20%, rgb(45 212 200 / 0.16) 0%, transparent 60%),
                radial-gradient(60% 60% at 80% 90%, rgb(255 107 53 / 0.18) 0%, transparent 60%);
            "
            aria-hidden="true"
          />

          <span
            class="font-mono text-mono-xs uppercase tracking-[0.32em] text-ink-subtle"
          >
            ↑↑↓↓←→←→BA
          </span>

          <h2
            id="konami-title"
            class="mt-6 font-display text-heading-lg text-ink-primary"
          >
            Hoshiyomi · Isaki Rengo detected.
          </h2>
          <p class="mt-3 text-balance text-body-md text-ink-muted">
            The comet, the gremlin, and the streams that keep the build green.
          </p>

          <div
            class="mt-7 flex items-center justify-center gap-2 font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle"
          >
            <span class="inline-flex h-1.5 w-1.5 rounded-full bg-teal-300" aria-hidden="true" />
            <span>SUI</span>
            <span class="text-ink-subtle/40">·</span>
            <span>RIONA</span>
            <span class="inline-flex h-1.5 w-1.5 rounded-full bg-accent-warm" aria-hidden="true" />
          </div>

          <button
            type="button"
            class="mt-7 inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated/70 px-4 py-1.5 font-mono text-mono-xs uppercase tracking-[0.2em] text-ink-muted transition-colors duration-500 hover:border-line-strong hover:text-ink-primary"
            @click="dismiss"
          >
            <span>Dismiss</span>
            <span class="font-body">esc</span>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
