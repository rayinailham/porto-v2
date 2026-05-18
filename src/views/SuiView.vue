<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";

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
    class="relative isolate flex min-h-[100dvh] flex-col bg-bg-base"
  >
    <!-- Top hairline marker -->
    <header class="border-b border-line">
      <div class="shell-wide flex h-14 items-center justify-between font-mono text-mono-xs uppercase text-ink-subtle">
        <span>// sui · transmission</span>
        <router-link
          to="/"
          class="link-underline text-ink-muted transition-colors hover:text-ink-primary"
        >
          ← Index
        </router-link>
      </div>
    </header>

    <main class="flex flex-1 flex-col justify-center">
      <div class="shell-wide grid grid-cols-12 gap-x-6 gap-y-12 py-section">
        <!-- Left rail · meta -->
        <aside class="col-span-12 lg:col-span-3">
          <div class="font-mono text-mono-xs uppercase text-ink-subtle">
            <span>00 — Off-record</span>
          </div>
          <p class="mt-6 max-w-[28ch] text-body-md text-ink-muted">
            An unlisted page. Quiet by design. Linked from nowhere.
          </p>
          <div class="mt-10 border-t border-line pt-5 font-mono text-mono-xs uppercase text-ink-faint">
            noindex · nofollow
          </div>
        </aside>

        <!-- Headline -->
        <div class="col-span-12 lg:col-span-9">
          <h1
            class="max-w-[14ch] font-display text-display-xl text-ink-primary"
          >
            <span class="block">For the comet that</span>
            <span class="block text-accent-warm">never apologised</span>
            <span class="block text-ink-muted">for shining alone.</span>
          </h1>

          <p
            class="mt-12 max-w-[44ch] text-body-lg text-ink-muted"
          >
            And for Riona, who reminded me you can build anything if you keep
            showing up. Code better when listening to streams. Always.
          </p>

          <div
            class="mt-section-sm grid max-w-md grid-cols-2 border-y border-line"
          >
            <div class="px-5 py-5">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Comet</dt>
              <dd class="mt-3 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                星街すいせい
              </dd>
            </div>
            <div class="border-l border-line px-5 py-5">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Gremlin</dt>
              <dd class="mt-3 font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                伊咲リオナ
              </dd>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer hairline -->
    <footer class="border-t border-line">
      <div class="shell-wide flex h-14 items-center justify-between font-mono text-mono-xs uppercase text-ink-subtle">
        <span class="text-ink-faint">unlisted route</span>
        <span class="text-ink-muted">// sui · 2026</span>
      </div>
    </footer>
  </div>
</template>
