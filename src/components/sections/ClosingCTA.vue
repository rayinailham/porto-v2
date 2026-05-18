<script setup lang="ts">
import AppButton from "@/components/ui/AppButton.vue";
import EyebrowTag from "@/components/ui/EyebrowTag.vue";
import StatusDot from "@/components/ui/StatusDot.vue";
import BlobLight from "@/components/texture/BlobLight.vue";
import TextureGrid from "@/components/texture/TextureGrid.vue";
</script>

<template>
  <section
    class="relative isolate overflow-hidden py-section"
    data-reveal-group
    aria-labelledby="cta-heading"
  >
    <!-- Final visual punch — large blob + grid corner -->
    <BlobLight color="warm" :size="780" x="78%" y="40%" :opacity="0.55" :blur="160" />
    <BlobLight color="cool" :size="520" x="10%" y="80%" :opacity="0.32" :blur="180" />
    <TextureGrid :opacity="0.04" :size="64" fade="edges" />

    <div class="shell relative">
      <div
        class="reveal-init relative overflow-hidden rounded-[32px] border border-line bg-bg-elevated/40 p-1.5 backdrop-blur-md"
        style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 40px 100px -50px rgba(0, 0, 0, 0.95);"
      >
        <!-- Inner core (Double-Bezel) -->
        <div
          class="relative grid grid-cols-1 gap-10 overflow-hidden rounded-[26px] bg-bg-base/85 px-8 py-14 md:grid-cols-12 md:px-14 md:py-20"
        >
          <!-- inner glow -->
          <div
            class="pointer-events-none absolute inset-0 -z-10"
            style="
              background:
                radial-gradient(120% 80% at 100% 50%, rgb(255 107 53 / 0.18) 0%, transparent 55%),
                radial-gradient(80% 60% at 0% 100%, rgb(0 102 255 / 0.10) 0%, transparent 60%);
            "
            aria-hidden="true"
          />

          <div class="md:col-span-7 lg:col-span-8">
            <EyebrowTag label="Hireable · let's talk" dot />
            <h2
              id="cta-heading"
              class="mt-6 text-balance font-display text-display-lg leading-[0.98] tracking-[-0.035em] text-ink-primary"
            >
              You ship products.
              <span class="block text-ink-muted/90">I ship the systems</span>
              <span class="block">underneath them.</span>
            </h2>
            <p class="mt-6 max-w-[52ch] text-body-md text-ink-muted">
              Looking for a senior backend &amp; AI engineer who can move from
              architecture diagram to production code without losing the thread?
              Drop a line — I reply within a working day.
            </p>

            <div class="mt-10 flex flex-wrap items-center gap-3">
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

          <!-- Side meta: live status card -->
          <aside class="md:col-span-5 lg:col-span-4">
            <div
              class="flex h-full flex-col justify-between gap-8 rounded-[20px] border border-line bg-bg-elevated/50 p-6 md:p-7"
              style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);"
            >
              <div class="flex items-center gap-3">
                <StatusDot color="success" />
                <span
                  class="font-mono text-mono-xs uppercase tracking-[0.2em] text-ink-muted"
                >
                  Online · UTC+7
                </span>
              </div>

              <dl class="space-y-5">
                <div class="flex items-baseline justify-between gap-4 border-b border-line/60 pb-4">
                  <dt class="font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle">
                    Reply window
                  </dt>
                  <dd class="font-display text-[15.5px] font-medium tracking-tight text-ink-primary">
                    &lt; 24 hours
                  </dd>
                </div>
                <div class="flex items-baseline justify-between gap-4 border-b border-line/60 pb-4">
                  <dt class="font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle">
                    Open to
                  </dt>
                  <dd class="font-display text-[15.5px] font-medium tracking-tight text-ink-primary">
                    Senior · Lead
                  </dd>
                </div>
                <div class="flex items-baseline justify-between gap-4">
                  <dt class="font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-subtle">
                    Engagement
                  </dt>
                  <dd class="font-display text-[15.5px] font-medium tracking-tight text-ink-primary">
                    Full-time · Contract
                  </dd>
                </div>
              </dl>

              <p class="text-[13.5px] leading-relaxed text-ink-muted">
                Based in Indonesia. Remote-friendly across timezones. Indonesian
                native, business English, basic 日本語.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>
