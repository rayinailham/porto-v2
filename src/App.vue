<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useSmoothScroll } from "@/composables/useSmoothScroll";
import { useScrollProgress } from "@/composables/useScrollProgress";
import AppHeader from "@/components/layout/AppHeader.vue";
import AppFooter from "@/components/layout/AppFooter.vue";
import KonamiOverlay from "@/components/layout/KonamiOverlay.vue";

useSmoothScroll();
useScrollProgress();

const route = useRoute();
const isQuiet = computed(() => route.path === "/sui");
</script>

<template>
  <div class="relative isolate flex min-h-[100dvh] flex-col">
    <AppHeader v-if="!isQuiet" />
    <main class="flex-1">
      <router-view v-slot="{ Component, route: r }">
        <component :is="Component" :key="r.fullPath" />
      </router-view>
    </main>
    <AppFooter v-if="!isQuiet" />
    <KonamiOverlay />
  </div>
</template>
