<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import { useRoute } from "vue-router";

const scrolled = ref(false);
let raf: number | null = null;
const route = useRoute();

const onScroll = () => {
  if (raf !== null) return;
  raf = requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 16;
    raf = null;
  });
};

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onBeforeUnmount(() => {
  if (raf !== null) cancelAnimationFrame(raf);
  window.removeEventListener("scroll", onScroll);
});

interface NavItem {
  label: string;
  to: string;
  num: string;
}

const navItems = computed<NavItem[]>(() => [
  { label: "Index", to: "/", num: "00" },
  { label: "Work", to: "/work", num: "01" },
  { label: "About", to: "/about", num: "02" },
  { label: "Contact", to: "/contact", num: "03" },
]);

const isActive = (to: string) => {
  if (to === "/") return route.path === "/";
  return route.path.startsWith(to);
};
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-haptic"
    :class="
      scrolled
        ? 'bg-bg-base/80 backdrop-blur-md border-b border-line'
        : 'bg-transparent border-b border-transparent'
    "
  >
    <!-- Scroll progress hairline -->
    <span
      class="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-accent-warm"
      style="transform: scaleX(var(--scroll-progress, 0))"
      aria-hidden="true"
    />

    <div class="shell-wide flex h-14 items-center justify-between gap-8">
      <router-link
        to="/"
        class="group flex items-center gap-3 font-mono text-mono-xs uppercase text-ink-primary"
      >
        <span class="font-display text-[15px] font-semibold tracking-[-0.025em]">
          Rayina Ilham
        </span>
        <span class="hidden text-ink-subtle md:inline">— portfolio / v2</span>
      </router-link>

      <nav
        class="hidden items-center gap-8 md:flex"
        aria-label="Primary"
      >
        <router-link
          v-for="item in navItems"
          :key="item.label"
          :to="item.to"
          class="group inline-flex items-baseline gap-1.5 font-mono text-mono-xs uppercase transition-colors duration-300"
          :class="isActive(item.to) ? 'text-ink-primary' : 'text-ink-muted hover:text-ink-primary'"
        >
          <span class="text-ink-faint">{{ item.num }}</span>
          <span class="relative">
            {{ item.label }}
            <span
              v-if="isActive(item.to)"
              class="absolute -bottom-[7px] left-0 right-0 h-px bg-accent-warm"
              aria-hidden="true"
            />
          </span>
        </router-link>
      </nav>

      <a
        href="mailto:rayinailham9@gmail.com"
        class="group inline-flex items-center gap-2 font-mono text-mono-xs uppercase text-ink-primary"
      >
        <span class="hidden h-1.5 w-1.5 rounded-full bg-accent-success md:inline-block" aria-hidden="true" />
        <span class="link-underline">Get in touch</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.25"
          stroke-linecap="square"
          stroke-linejoin="miter"
          class="h-3 w-3 transition-transform duration-500 ease-haptic group-hover:translate-x-1"
        >
          <path d="M5 12h14" />
          <path d="m13 6 6 6-6 6" />
        </svg>
      </a>
    </div>
  </header>
</template>
