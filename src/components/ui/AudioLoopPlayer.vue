<script setup lang="ts">
/**
 * AudioLoopPlayer — YouTube-backed ambient audio for the Off-clock section.
 *
 * Behavior:
 * - Loads YT IFrame API lazily (single global load promise).
 * - Auto-attempts to start playback when the section enters the viewport,
 *   muted first (to satisfy autoplay policies), then auto-unmutes on the
 *   first user pointer/keydown/scroll gesture anywhere in the document.
 * - Exposes a visible play/pause toggle that mirrors live YT state.
 * - Pauses when the section leaves the viewport for > 1.5s, resumes on
 *   re-entry.
 * - Honors prefers-reduced-motion (no autoplay; user must press play).
 * - All bookkeeping local to this component; no global side effects beyond
 *   the IFrame.
 */
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from "vue";
import EqualizerBars from "@/components/ui/EqualizerBars.vue";

interface Props {
  videoId: string;
  trigger: HTMLElement | null;
  title?: string;
  subtitle?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Kaiki Deishu's theme",
  subtitle: "signal · monogatari",
});

// ---------- YT API loader (singleton) ----------
let ytLoadPromise: Promise<NonNullable<typeof window.YT>> | null = null;
function loadYouTubeApi(): Promise<NonNullable<typeof window.YT>> {
  if (typeof window === "undefined") return Promise.reject(new Error("SSR"));
  if (window.YT && window.YT.Player) return Promise.resolve(window.YT);
  if (ytLoadPromise) return ytLoadPromise;

  ytLoadPromise = new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    tag.onerror = () => reject(new Error("Failed to load YouTube IFrame API"));

    const prevHook = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof prevHook === "function") prevHook();
      if (window.YT) resolve(window.YT);
      else reject(new Error("YT global missing after init"));
    };
    document.head.appendChild(tag);
  });
  return ytLoadPromise;
}

// ---------- Component state ----------
const mountRef = ref<HTMLDivElement | null>(null);
const player = shallowRef<any>(null);
const ready = ref(false);
const isPlaying = ref(false);
const isMuted = ref(true);
const userInteracted = ref(false);

let intersectionObserver: IntersectionObserver | null = null;
let leaveTimer: number | null = null;
let pollTimer: number | null = null;

const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Init ----------
const initPlayer = async () => {
  if (!mountRef.value) return;
  try {
    const YT = await loadYouTubeApi();
    if (!mountRef.value) return;

    const target = document.createElement("div");
    mountRef.value.appendChild(target);

    player.value = new YT.Player(target, {
      videoId: props.videoId,
      width: "0",
      height: "0",
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        loop: 1,
        playlist: props.videoId,
      },
      events: {
        onReady: () => {
          ready.value = true;
          // Lower volume — ambient, not foreground
          try {
            player.value.setVolume(28);
          } catch {
            /* ignore */
          }
        },
        onStateChange: (e: { data: number }) => {
          // 1 = playing, 2 = paused, 0 = ended (loop should re-fire)
          isPlaying.value = e.data === 1;
        },
      },
    });
  } catch {
    // Network blocked or YT unavailable — silently degrade
    ready.value = false;
  }
};

// ---------- Auto-attempt play (muted first, satisfies autoplay policy) ----------
const attemptAutoplay = () => {
  if (reduced() || !ready.value || !player.value) return;
  try {
    player.value.mute();
    isMuted.value = true;
    player.value.playVideo();
  } catch {
    /* ignore */
  }
};

// On first user gesture anywhere → unmute (still ambient at low volume)
const onFirstGesture = () => {
  if (userInteracted.value) return;
  userInteracted.value = true;
  if (player.value && ready.value && isPlaying.value) {
    try {
      player.value.unMute();
      isMuted.value = false;
    } catch {
      /* ignore */
    }
  }
};

const togglePlay = () => {
  if (!ready.value || !player.value) return;
  userInteracted.value = true;
  try {
    if (isPlaying.value) {
      player.value.pauseVideo();
    } else {
      player.value.unMute();
      isMuted.value = false;
      player.value.playVideo();
    }
  } catch {
    /* ignore */
  }
};

const toggleMute = () => {
  if (!ready.value || !player.value) return;
  userInteracted.value = true;
  try {
    if (isMuted.value) {
      player.value.unMute();
      isMuted.value = false;
    } else {
      player.value.mute();
      isMuted.value = true;
    }
  } catch {
    /* ignore */
  }
};

// ---------- Intersection observer on the trigger section ----------
const setupObserver = () => {
  if (!props.trigger || typeof IntersectionObserver === "undefined") return;
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (!e) return;
      if (e.isIntersecting) {
        if (leaveTimer !== null) {
          window.clearTimeout(leaveTimer);
          leaveTimer = null;
        }
        if (!isPlaying.value) attemptAutoplay();
      } else {
        if (leaveTimer !== null) window.clearTimeout(leaveTimer);
        leaveTimer = window.setTimeout(() => {
          if (player.value && isPlaying.value) {
            try {
              player.value.pauseVideo();
            } catch {
              /* ignore */
            }
          }
        }, 1500);
      }
    },
    { threshold: 0.25 },
  );
  intersectionObserver.observe(props.trigger);
};

// Re-observe if trigger ref becomes available after mount
watch(
  () => props.trigger,
  (el, prev) => {
    if (prev && intersectionObserver) intersectionObserver.unobserve(prev);
    if (el) setupObserver();
  },
);

onMounted(async () => {
  await initPlayer();

  // Listen for any user gesture once → unmute on next opportunity
  const gestureEvents: (keyof DocumentEventMap)[] = [
    "pointerdown",
    "keydown",
    "wheel",
    "touchstart",
  ];
  const handler = () => {
    onFirstGesture();
    gestureEvents.forEach((ev) =>
      document.removeEventListener(ev, handler, { capture: true } as any),
    );
  };
  gestureEvents.forEach((ev) =>
    document.addEventListener(ev, handler, {
      capture: true,
      passive: true,
    } as any),
  );

  if (props.trigger) setupObserver();

  // Light poll to re-sync isPlaying flag (YT events occasionally miss)
  pollTimer = window.setInterval(() => {
    if (!player.value || !ready.value) return;
    try {
      const state = player.value.getPlayerState?.();
      if (state === 1 && !isPlaying.value) isPlaying.value = true;
      if (state === 2 && isPlaying.value) isPlaying.value = false;
    } catch {
      /* ignore */
    }
  }, 1500);
});

onBeforeUnmount(() => {
  if (intersectionObserver) intersectionObserver.disconnect();
  if (leaveTimer !== null) window.clearTimeout(leaveTimer);
  if (pollTimer !== null) window.clearInterval(pollTimer);
  try {
    player.value?.destroy?.();
  } catch {
    /* ignore */
  }
});

const stateLabel = computed(() => {
  if (!ready.value) return "Loading";
  if (!isPlaying.value) return "Paused";
  return isMuted.value ? "Playing · muted" : "Now playing";
});
</script>

<template>
  <div class="audio-player">
    <!-- Hidden YT iframe mount — kept off-flow but in DOM -->
    <div
      ref="mountRef"
      aria-hidden="true"
      class="pointer-events-none absolute h-px w-px overflow-hidden opacity-0"
    />

    <div class="flex items-end gap-6">
      <EqualizerBars
        :bars="11"
        :height="56"
        :width="2"
        :gap="4"
        :active="isPlaying"
        class="text-accent-warm"
      />
      <div class="flex-1">
        <div class="font-mono text-mono-xs uppercase text-ink-subtle">
          {{ stateLabel }}
        </div>
        <div
          class="mt-2 font-display text-[clamp(1.1rem,1.4vw,1.35rem)] font-semibold tracking-[-0.02em] text-ink-primary"
        >
          <span class="italic-accent">{{ title }}</span>
        </div>
        <div
          class="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint"
        >
          {{ subtitle }}
        </div>
      </div>
    </div>

    <!-- Controls -->
    <div
      class="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 font-mono text-mono-xs uppercase"
    >
      <button
        type="button"
        class="group inline-flex items-center gap-2 text-ink-primary transition-colors duration-300 hover:text-accent-warm disabled:cursor-not-allowed disabled:opacity-40"
        :disabled="!ready"
        :aria-pressed="isPlaying"
        :aria-label="isPlaying ? 'Pause Kaiki Deishu theme' : 'Play Kaiki Deishu theme'"
        @click="togglePlay"
      >
        <span class="relative inline-flex h-3 w-3 items-center justify-center">
          <!-- Play triangle -->
          <svg
            v-if="!isPlaying"
            viewBox="0 0 12 12"
            class="h-3 w-3"
            fill="currentColor"
          >
            <path d="M2 1.5v9l8-4.5z" />
          </svg>
          <!-- Pause bars -->
          <svg
            v-else
            viewBox="0 0 12 12"
            class="h-3 w-3"
            fill="currentColor"
          >
            <rect x="2" y="1.5" width="2.5" height="9" />
            <rect x="7.5" y="1.5" width="2.5" height="9" />
          </svg>
        </span>
        <span class="link-underline">{{ isPlaying ? "Pause loop" : "Play loop" }}</span>
      </button>

      <button
        v-if="isPlaying"
        type="button"
        class="text-ink-muted transition-colors duration-300 hover:text-ink-primary"
        :aria-pressed="!isMuted"
        :aria-label="isMuted ? 'Unmute' : 'Mute'"
        @click="toggleMute"
      >
        {{ isMuted ? "Unmute" : "Mute" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.audio-player {
  position: relative;
}
</style>
