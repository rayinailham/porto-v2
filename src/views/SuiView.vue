<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";

/**
 * /sui — hidden Hololive tribute. Quiet typography, no real imagery.
 * Robots: noindex, nofollow.
 */
let metaRobots: HTMLMetaElement | null = null;
let originalTitle = "";

onMounted(() => {
  originalTitle = document.title;
  document.title = "// sui";
  metaRobots = document.createElement("meta");
  metaRobots.name = "robots";
  metaRobots.content = "noindex, nofollow";
  document.head.appendChild(metaRobots);
});

onBeforeUnmount(() => {
  if (metaRobots && metaRobots.parentNode) metaRobots.parentNode.removeChild(metaRobots);
  document.title = originalTitle;
});
</script>

<template>
  <div
    class="relative isolate flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6"
    style="background: linear-gradient(180deg, #03040a 0%, #050719 60%, #02030a 100%);"
  >
    <!-- Soft teal/indigo glow — Suisei nuance, not literal -->
    <div
      class="pointer-events-none absolute -z-10 h-[80vmin] w-[80vmin] rounded-full opacity-60"
      style="
        left: 50%;
        top: 38%;
        transform: translate(-50%, -50%);
        background: radial-gradient(closest-side, rgb(45 212 200 / 0.20) 0%, transparent 70%);
        filter: blur(110px);
      "
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute -z-10 h-[60vmin] w-[60vmin] rounded-full opacity-50"
      style="
        right: -20%;
        bottom: -10%;
        background: radial-gradient(closest-side, rgb(160 130 255 / 0.18) 0%, transparent 70%);
        filter: blur(140px);
      "
      aria-hidden="true"
    />

    <!-- Star micro-detail -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 opacity-[0.18]"
      style="
        background-image:
          radial-gradient(rgb(255 255 255 / 0.9) 1px, transparent 1.4px),
          radial-gradient(rgb(180 220 255 / 0.5) 1px, transparent 1.4px);
        background-size: 100px 100px, 60px 60px;
        background-position: 0 0, 30px 40px;
      "
      aria-hidden="true"
    />

    <main class="relative max-w-[44ch] text-center">
      <span
        class="inline-block font-mono text-[10px] uppercase tracking-[0.4em] text-white/40"
      >
        // sui · 2026
      </span>
      <h1
        class="mt-10 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.03em] text-white"
      >
        For the comet that
        <span class="block text-teal-200/90">never apologised</span>
        <span class="block text-white/85">for shining alone.</span>
      </h1>
      <p
        class="mt-12 max-w-prose text-balance font-body text-[15px] leading-relaxed text-white/55"
      >
        And for Riona, who reminded me you can build anything if you keep
        showing up. Code better when listening to streams. Always.
      </p>

      <p
        class="mt-16 font-mono text-[10px] uppercase tracking-[0.32em] text-white/30"
      >
        🎵 unlisted route · noindex
      </p>

      <router-link
        to="/"
        class="mt-12 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45 transition-colors duration-500 hover:text-white/80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-3 w-3"
        >
          <path d="m15 6-6 6 6 6" />
        </svg>
        <span>Back to portfolio</span>
      </router-link>
    </main>
  </div>
</template>
