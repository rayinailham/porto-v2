<script setup lang="ts">
import { ref } from "vue";
import { useTypography } from "@/composables/useTypography";
import HeroSection from "@/components/sections/HeroSection.vue";
import CurrentlyBuilding from "@/components/sections/CurrentlyBuilding.vue";
import PillarsSection from "@/components/sections/PillarsSection.vue";
import FeaturedWork from "@/components/sections/FeaturedWork.vue";
import SelectedStack from "@/components/sections/SelectedStack.vue";
import SideBSection from "@/components/sections/SideBSection.vue";
import ClosingCTA from "@/components/sections/ClosingCTA.vue";

const root = ref<HTMLElement | null>(null);
useTypography(root);
</script>

<template>
  <div ref="root" class="relative">
    <HeroSection />
    <CurrentlyBuilding />
    <PillarsSection />
    <FeaturedWork />
    <SelectedStack />
    <SideBSection />
    <ClosingCTA />
  </div>
</template>
