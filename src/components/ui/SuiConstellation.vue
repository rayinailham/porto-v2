<script setup lang="ts">
/**
 * SuiConstellation — full-bleed animated starfield with a slow comet streak.
 * - Pure SVG, deterministic seed positions, hardware-accelerated CSS animations.
 * - Honors prefers-reduced-motion (still renders, no movement).
 * - Sized to viewport via absolute fill; parent must be position:relative.
 */
interface Props {
  density?: number; // star count
}
const props = withDefaults(defineProps<Props>(), { density: 60 });

// Deterministic pseudo-random — same seed → same starfield every reload.
const seed = (i: number) => {
  const s = Math.sin((i + 1) * 9301.7) * 233280.3;
  return s - Math.floor(s);
};

const stars = Array.from({ length: props.density }, (_, i) => ({
  cx: seed(i) * 100,
  cy: seed(i + 100) * 100,
  r: 0.18 + seed(i + 200) * 0.85,
  d: 2.4 + seed(i + 300) * 5.2, // animation duration
  delay: seed(i + 400) * -6,
  opacity: 0.25 + seed(i + 500) * 0.65,
}));

// Three brighter "named" stars positioned along a diagonal — comet's lineage
const beacons = [
  { cx: 18, cy: 22, r: 1.6, label: "α" },
  { cx: 47, cy: 41, r: 1.9, label: "β" },
  { cx: 78, cy: 68, r: 1.4, label: "γ" },
];
</script>

<template>
  <div class="sui-constellation pointer-events-none absolute inset-0 overflow-hidden">
    <svg
      class="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <!-- Background mesh radial — Suisei's cosmic blue → comet warm -->
      <defs>
        <radialGradient id="sui-mesh-1" cx="78%" cy="22%" r="55%">
          <stop offset="0%" stop-color="#5cdcff" stop-opacity="0.32" />
          <stop offset="55%" stop-color="#0b1444" stop-opacity="0" />
        </radialGradient>
        <radialGradient id="sui-mesh-2" cx="18%" cy="78%" r="45%">
          <stop offset="0%" stop-color="#ffb359" stop-opacity="0.22" />
          <stop offset="60%" stop-color="#0b1444" stop-opacity="0" />
        </radialGradient>
        <linearGradient id="sui-comet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffd58a" stop-opacity="0" />
          <stop offset="60%" stop-color="#5cdcff" stop-opacity="0.65" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="1" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="100" height="100" fill="url(#sui-mesh-1)" />
      <rect x="0" y="0" width="100" height="100" fill="url(#sui-mesh-2)" />

      <!-- Starfield -->
      <g class="sui-stars">
        <circle
          v-for="(s, i) in stars"
          :key="i"
          :cx="s.cx"
          :cy="s.cy"
          :r="s.r"
          fill="#ffffff"
          :opacity="s.opacity"
          :style="{
            animationDuration: `${s.d}s`,
            animationDelay: `${s.delay}s`,
          }"
        />
      </g>

      <!-- Beacons — three brighter ref stars -->
      <g>
        <circle
          v-for="b in beacons"
          :key="b.label"
          :cx="b.cx"
          :cy="b.cy"
          :r="b.r"
          fill="#ffffff"
        >
          <animate
            attributeName="opacity"
            values="0.55;1;0.55"
            :dur="`${3.6 + b.cx * 0.04}s`"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>

    <!-- Comet streak — slow diagonal pass, repeats every ~14s -->
    <div class="sui-comet" aria-hidden="true">
      <span class="sui-comet__head" />
      <span class="sui-comet__tail" />
    </div>
  </div>
</template>

<style scoped>
.sui-constellation {
  background-color: #050922;
}

.sui-stars circle {
  animation: sui-twinkle linear infinite alternate;
  transform-origin: center;
  will-change: opacity;
}

@keyframes sui-twinkle {
  0% {
    opacity: 0.15;
  }
  100% {
    opacity: 1;
  }
}

/* Comet — head + tail composed via CSS, animated diagonally across viewport */
.sui-comet {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 70%;
  height: 70%;
  pointer-events: none;
  animation: sui-comet-fly 18s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  will-change: transform, opacity;
}

.sui-comet__head {
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 9999px;
  background: radial-gradient(
    circle at 30% 30%,
    #ffffff 0%,
    #ffd58a 45%,
    rgba(255, 213, 138, 0) 75%
  );
  box-shadow:
    0 0 18px 4px rgba(255, 213, 138, 0.55),
    0 0 36px 12px rgba(92, 220, 255, 0.18);
}

.sui-comet__tail {
  position: absolute;
  top: 1px;
  left: 4px;
  width: 240px;
  height: 1.5px;
  background: linear-gradient(
    to right,
    #ffffff 0%,
    rgba(255, 213, 138, 0.85) 8%,
    rgba(92, 220, 255, 0.55) 35%,
    rgba(92, 220, 255, 0) 100%
  );
  transform-origin: left center;
  transform: rotate(33deg) translate(-100%, -50%);
  filter: blur(0.4px);
}

@keyframes sui-comet-fly {
  0% {
    transform: translate(-30%, -30%);
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  68% {
    transform: translate(140%, 140%);
    opacity: 0;
  }
  100% {
    transform: translate(140%, 140%);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sui-stars circle {
    animation: none;
  }
  .sui-comet {
    animation: none;
    opacity: 0.4;
  }
}
</style>
