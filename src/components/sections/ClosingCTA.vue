<script setup lang="ts">
import StatusDot from "@/components/ui/StatusDot.vue";
import AppButton from "@/components/ui/AppButton.vue";
</script>

<template>
  <section
    class="relative isolate overflow-hidden py-section"
    data-reveal-group
    aria-labelledby="cta-heading"
  >
    <div class="shell-wide">
      <!-- Section marker -->
      <div
        class="reveal-init flex items-baseline justify-between border-b border-line pb-5 font-mono text-mono-xs uppercase text-ink-subtle"
      >
        <span class="inline-flex items-center gap-3">
          <span class="text-ink-faint">05</span>
          <span>Sign-off · transmission</span>
        </span>
        <span class="inline-flex items-center gap-2">
          <StatusDot color="success" />
          <span class="text-ink-muted">Online · UTC+7</span>
        </span>
      </div>

      <div class="grid grid-cols-12 gap-x-6 gap-y-12 pt-section-sm">
        <!-- Headline -->
        <div class="col-span-12 lg:col-span-8">
          <h2
            id="cta-heading"
            class="reveal-init max-w-[20ch] font-display text-display-lg text-ink-primary"
          >
            <span class="block type-reveal">You ship products.</span>
            <span class="block type-reveal text-ink-muted">I ship the systems</span>
            <span class="block type-reveal">underneath them.</span>
          </h2>

          <p class="reveal-init mt-10 max-w-[48ch] text-body-md text-ink-muted">
            Looking for a senior backend &amp; AI engineer who can move from
            architecture diagram to production code without losing the thread?
            Drop a line — I reply within a working day.
          </p>

          <div class="reveal-init mt-12 flex flex-wrap items-center gap-4">
            <AppButton
              variant="primary"
              size="lg"
              href="mailto:rayinailham9@gmail.com"
            >
              rayinailham9@gmail.com
            </AppButton>
            <AppButton
              variant="ghost"
              size="lg"
              href="https://linkedin.com/in/rayinailham"
              external
            >
              LinkedIn
            </AppButton>
          </div>
        </div>

        <!-- Side meta — flat 4-row dl, hairline divided -->
        <aside class="col-span-12 lg:col-span-4 lg:border-l lg:border-line lg:pl-12">
          <div class="reveal-init font-mono text-mono-xs uppercase text-ink-subtle">
            Coordinates
          </div>
          <dl class="reveal-init mt-6 divide-y divide-line border-y border-line">
            <div class="flex items-baseline justify-between gap-4 py-4">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Reply</dt>
              <dd class="font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                &lt; 24 hours
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-4">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Open to</dt>
              <dd class="font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                Senior · Lead
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-4">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Engagement</dt>
              <dd class="font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                Full-time · Contract
              </dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 py-4">
              <dt class="font-mono text-mono-xs uppercase text-ink-subtle">Languages</dt>
              <dd class="font-display text-[14.5px] font-medium tracking-[-0.012em] text-ink-primary">
                ID · EN · 日本語
              </dd>
            </div>
          </dl>
          <p class="reveal-init mt-6 max-w-[36ch] text-body-sm text-ink-muted">
            Based in Indonesia. Remote-friendly across timezones. Indonesian
            native, business English, basic Japanese.
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>
