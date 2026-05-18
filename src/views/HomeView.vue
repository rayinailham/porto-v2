<script setup lang="ts">
import { ref } from "vue";
import { useReveal } from "@/composables/useReveal";
import HeroSection from "@/components/sections/HeroSection.vue";
import CurrentlyBuilding from "@/components/sections/CurrentlyBuilding.vue";
import PillarsSection from "@/components/sections/PillarsSection.vue";
import FeaturedWork from "@/components/sections/FeaturedWork.vue";
import SelectedStack from "@/components/sections/SelectedStack.vue";
import ClosingCTA from "@/components/sections/ClosingCTA.vue";

const root = ref<HTMLElement | null>(null);
useReveal(root, { stagger: 0.08, start: "top 88%" });
</script>

<template>
  <div ref="root" class="relative">
    <HeroSection />
    <CurrentlyBuilding />
    <PillarsSection />
    <FeaturedWork />
    <SelectedStack />
    <ClosingCTA />
  </div>
</template>
