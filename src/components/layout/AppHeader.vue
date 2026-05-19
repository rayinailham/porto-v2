<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, computed, watch } from "vue";
import { useRoute } from "vue-router";

const scrolled = ref(false);
const menuOpen = ref(false);
let raf: number | null = null;
const route = useRoute();

const onScroll = () => {
  if (raf !== null) return;
  raf = requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 16;
    raf = null;
  });
};

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

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};
const closeMenu = () => {
  menuOpen.value = false;
};

// Close drawer when route changes
watch(
  () => route.fullPath,
  () => closeMenu(),
);

// Lock body scroll when drawer is open
watch(menuOpen, (open) => {
  if (typeof document === "undefined") return;
  document.body.style.overflow = open ? "hidden" : "";
});

const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeMenu();
};

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("keydown", onKey);
});
onBeforeUnmount(() => {
  if (raf !== null) cancelAnimationFrame(raf);
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("keydown", onKey);
  if (typeof document !== "undefined") document.body.style.overflow = "";
});
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-700 ease-haptic"
    :class="
      scrolled || menuOpen
        ? 'bg-bg-base/85 backdrop-blur-md border-b border-line'
        : 'bg-transparent border-b border-transparent'
    "
  >
    <!-- Scroll progress hairline -->
    <span
      class="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-accent-warm"
      style="transform: scaleX(var(--scroll-progress, 0))"
      aria-hidden="true"
    />

    <div class="shell-wide flex h-14 items-center justify-between gap-4 sm:gap-8">
      <router-link
        to="/"
        class="group flex min-w-0 items-center gap-3 font-mono text-mono-xs uppercase text-ink-primary"
        @click="closeMenu"
      >
        <span class="truncate font-display text-[14px] font-semibold tracking-[-0.025em] sm:text-[15px]">
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
        class="group hidden items-center gap-2 font-mono text-mono-xs uppercase text-ink-primary md:inline-flex"
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

      <!-- Mobile: hamburger button -->
      <button
        type="button"
        class="relative -mr-2 inline-flex h-11 w-11 shrink-0 items-center justify-center text-ink-primary md:hidden"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        aria-label="Toggle menu"
        @click="toggleMenu"
      >
        <span class="sr-only">{{ menuOpen ? "Close menu" : "Open menu" }}</span>
        <span
          class="relative block h-3.5 w-5"
          aria-hidden="true"
        >
          <span
            class="absolute left-0 right-0 h-px bg-current transition-all duration-500 ease-haptic"
            :class="menuOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'"
          />
          <span
            class="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-current transition-opacity duration-300"
            :class="menuOpen ? 'opacity-0' : 'opacity-100'"
          />
          <span
            class="absolute left-0 right-0 h-px bg-current transition-all duration-500 ease-haptic"
            :class="menuOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'"
          />
        </span>
      </button>
    </div>

    <!-- Mobile nav drawer — slides in below the bar -->
    <Transition
      enter-active-class="transition-all duration-500 ease-haptic"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-300 ease-haptic"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        id="mobile-nav"
        class="md:hidden"
      >
        <!-- Drawer panel -->
        <div class="border-t border-line bg-bg-base/95 backdrop-blur-md">
          <nav
            class="shell-wide flex flex-col py-3"
            aria-label="Mobile primary"
          >
            <router-link
              v-for="item in navItems"
              :key="item.label"
              :to="item.to"
              class="group flex items-baseline justify-between gap-4 border-b border-line/60 py-4 font-mono text-mono-sm uppercase tracking-[0.04em] transition-colors duration-300"
              :class="isActive(item.to) ? 'text-ink-primary' : 'text-ink-muted active:text-ink-primary'"
              @click="closeMenu"
            >
              <span class="inline-flex items-baseline gap-3">
                <span class="text-ink-faint">{{ item.num }}</span>
                <span>{{ item.label }}</span>
              </span>
              <span
                class="inline-flex items-center gap-2 text-ink-faint transition-colors"
                :class="isActive(item.to) ? 'text-accent-warm' : ''"
              >
                <span
                  v-if="isActive(item.to)"
                  class="h-1 w-6 bg-accent-warm"
                  aria-hidden="true"
                />
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
            </router-link>

            <a
              href="mailto:rayinailham9@gmail.com"
              class="mt-4 inline-flex items-center justify-between gap-3 border border-ink-primary bg-ink-primary px-4 py-3 font-mono text-mono-sm uppercase tracking-[0.18em] text-bg-base"
              @click="closeMenu"
            >
              <span class="inline-flex items-center gap-2">
                <span class="h-1.5 w-1.5 rounded-full bg-accent-success" aria-hidden="true" />
                <span>Get in touch</span>
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linecap="square"
                stroke-linejoin="miter"
                class="h-3.5 w-3.5"
              >
                <path d="M5 12h14" />
                <path d="m13 6 6 6-6 6" />
              </svg>
            </a>

            <p class="mt-4 mb-2 font-mono text-mono-2xs uppercase text-ink-faint">
              // hireable · UTC+7 · reply &lt; 24 hrs
            </p>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>
