<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed } from "vue";
import { useRoute } from "vue-router";

const scrolled = ref(false);
let raf: number | null = null;
const route = useRoute();

const onScroll = () => {
  if (raf !== null) return;
  raf = requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 24;
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
  to?: string;
  hash?: string;
}

const isHome = computed(() => route.path === "/");

const navItems = computed<NavItem[]>(() => {
  if (isHome.value) {
    return [
      { label: "Work", to: "/work" },
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
    ];
  }
  return [
    { label: "Home", to: "/" },
    { label: "Work", to: "/work" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];
});
</script>

<template>
  <header
    class="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 transition-all duration-700 ease-haptic"
    :class="scrolled ? 'pt-3' : 'pt-5'"
  >
    <nav
      class="pointer-events-auto group flex items-center gap-2 rounded-full border border-line/80 bg-bg-base/60 p-1 pl-4 backdrop-blur-2xl transition-all duration-700 ease-haptic"
      :class="
        scrolled
          ? 'shadow-[0_24px_60px_-30px_rgba(0,0,0,0.8)] bg-bg-base/85'
          : 'bg-bg-base/45'
      "
      style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05)"
    >
      <router-link
        to="/"
        class="flex items-center gap-2 pr-2 font-display text-[14px] font-semibold tracking-tight text-ink-primary"
      >
        <span
          class="relative grid h-6 w-6 place-items-center rounded-full bg-bg-elevated text-[10px] font-bold"
        >
          R
          <span
            class="absolute right-0 top-0 h-1.5 w-1.5 -translate-y-0.5 translate-x-0.5 rounded-full bg-accent-warm"
            aria-hidden="true"
          />
        </span>
        <span class="hidden sm:inline">Rayina Ilham</span>
      </router-link>

      <div
        class="hidden items-center gap-1 border-l border-line pl-2 md:flex"
        aria-label="Primary"
      >
        <template v-for="item in navItems" :key="item.label">
          <router-link
            v-if="item.to"
            :to="item.to"
            class="rounded-full px-3 py-1.5 font-mono text-mono-xs uppercase tracking-[0.16em] transition-colors duration-300 hover:bg-bg-elevated hover:text-ink-primary"
            active-class="bg-bg-elevated text-ink-primary"
            :class="route.path !== item.to ? 'text-ink-muted' : ''"
          >
            {{ item.label }}
          </router-link>
          <a
            v-else
            :href="item.hash"
            class="rounded-full px-3 py-1.5 font-mono text-mono-xs uppercase tracking-[0.16em] text-ink-muted transition-colors duration-300 hover:bg-bg-elevated hover:text-ink-primary"
          >
            {{ item.label }}
          </a>
        </template>
      </div>

      <a
        href="mailto:rayinailham9@gmail.com"
        class="ml-1 inline-flex h-9 items-center gap-2 rounded-full bg-ink-primary pl-3 pr-1 text-[12.5px] font-medium tracking-tight text-bg-base transition-all duration-500 ease-haptic hover:bg-white active:scale-[0.98]"
      >
        <span>Get in touch</span>
        <span
          class="grid h-7 w-7 place-items-center rounded-full bg-bg-base/10 transition-all duration-500 ease-haptic group-hover:translate-x-0.5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-3.5 w-3.5"
          >
            <path d="M7 17 17 7" />
            <path d="M8 7h9v9" />
          </svg>
        </span>
      </a>
    </nav>
  </header>
</template>
