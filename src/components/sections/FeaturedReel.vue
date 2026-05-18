<script setup lang="ts">
/**
 * FeaturedReel — pinned horizontal scroll for the 3 primary featured projects.
 *
 * Uses GSAP ScrollTrigger to pin the viewport-sized container while translating
 * the inner track on the X axis. Lenis already drives ScrollTrigger.update via
 * useSmoothScroll, so this stays smooth on desktop.
 *
 * Disabled on <1024px (mobile keeps the vertical stack rendered by FeaturedWork).
 * Disabled on prefers-reduced-motion (renders panels stacked instead).
 */
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { FeaturedProject } from "@/data/portfolio";
import FeaturedPanel from "@/components/sections/FeaturedPanel.vue";

interface Props {
  projects: FeaturedProject[];
  totalLabel: string;
  statusLabel: (s: "active" | "shipped" | "ongoing") => string;
  statusColor: (s: "active" | "shipped" | "ongoing") => "warm" | "cool" | "success" | "muted";
}

const props = defineProps<Props>();

gsap.registerPlugin(ScrollTrigger);

const pinRef = ref<HTMLElement | null>(null);
const trackRef = ref<HTMLElement | null>(null);
const progressRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

const panelCount = computed(() => props.projects.length);

let st: ScrollTrigger | null = null;
let mm: ReturnType<typeof gsap.matchMedia> | null = null;

onMounted(() => {
  if (typeof window === "undefined") return;

  mm = gsap.matchMedia();

  // Desktop, no reduced-motion → pinned horizontal scroll
  mm.add(
    "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
    () => {
      const pinEl = pinRef.value;
      const trackEl = trackRef.value;
      if (!pinEl || !trackEl) return;

      const n = panelCount.value;

      // Distance the track must travel: full track width minus one viewport.
      // Using scrollWidth keeps it accurate even if a panel ends up slightly
      // wider/narrower than 100vw (scrollbars, sub-pixel rounding, etc.).
      const distance = () => trackEl.scrollWidth - window.innerWidth;

      const tween = gsap.to(trackEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pinEl,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          start: "top top",
          end: () => "+=" + distance(),
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Map progress 0..1 → 0..(n-1) → nearest panel index
            const idx = Math.min(
              n - 1,
              Math.round(self.progress * (n - 1)),
            );
            if (idx !== activeIndex.value) activeIndex.value = idx;

            if (progressRef.value) {
              progressRef.value.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      st = tween.scrollTrigger ?? null;

      // After mount, layout might shift due to fonts loading, etc.
      requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        tween.kill();
        st = null;
      };
    },
  );
});

onBeforeUnmount(() => {
  st?.kill();
  st = null;
  mm?.revert();
  mm = null;
});
</script>

<template>
  <!--
    Desktop (≥1024px, no reduced-motion): pinned horizontal reel.
    Mobile / reduced-motion: stacked panels, native vertical scroll.
  -->
  <div ref="pinRef" class="reel-pin relative">
    <!-- Pinned viewport: fills the screen on desktop -->
    <div class="reel-viewport relative h-auto w-full overflow-hidden lg:h-[100dvh] motion-reduce:lg:h-auto">
      <!-- Track: horizontal flex on desktop, vertical stack on mobile -->
      <div
        ref="trackRef"
        class="reel-track flex h-full flex-col lg:w-[300vw] lg:flex-row motion-reduce:lg:w-full motion-reduce:lg:flex-col"
        :style="{ '--panel-count': panelCount }"
      >
        <FeaturedPanel
          v-for="(p, i) in projects"
          :key="p.slug"
          :project="p"
          :index="String(i + 1).padStart(2, '0')"
          :total="totalLabel"
          :status-label="statusLabel(p.status)"
          :status-color="statusColor(p.status)"
          class="reel-panel border-b border-line lg:border-b-0 motion-reduce:lg:border-b motion-reduce:lg:border-line"
        />
      </div>

      <!-- Progress + counter overlay (desktop only) -->
      <div
        class="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden border-t border-line bg-bg-base/85 backdrop-blur-sm lg:block motion-reduce:lg:hidden"
      >
        <div class="shell-wide flex items-center justify-between gap-6 py-3 font-mono text-mono-xs uppercase text-ink-subtle">
          <span class="inline-flex items-center gap-3">
            <span class="text-ink-faint">Reel</span>
            <span class="text-ink-muted">
              {{ String(activeIndex + 1).padStart(2, '0') }}
              <span class="text-ink-faint"> / {{ totalLabel }}</span>
            </span>
          </span>

          <div class="relative h-px flex-1 max-w-[42vw] bg-line">
            <span
              ref="progressRef"
              class="absolute inset-y-0 left-0 right-0 origin-left scale-x-0 bg-accent-warm"
              style="transform: scaleX(0)"
              aria-hidden="true"
            />
          </div>

          <span class="inline-flex items-center gap-3 text-ink-muted">
            <span class="text-ink-faint">Scroll</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.25"
              stroke-linecap="square"
              stroke-linejoin="miter"
              class="h-3 w-3"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reel-panel {
  /* Each panel takes the full viewport on desktop, full width on mobile */
  width: 100%;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .reel-panel {
    width: 100vw;
    height: 100dvh;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reel-panel {
    height: auto !important;
    width: 100% !important;
  }
}
</style>

