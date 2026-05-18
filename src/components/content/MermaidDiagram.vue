<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

interface Props {
  /** Mermaid source code */
  code: string;
  /** Optional caption shown below diagram */
  caption?: string;
}

const props = defineProps<Props>();
const host = ref<HTMLElement | null>(null);
const error = ref<string | null>(null);

let nextId = 0;
const uid = `mermaid-${Date.now()}-${nextId++}`;

const render = async () => {
  if (!host.value) return;
  error.value = null;
  try {
    const { default: mermaid } = await import("mermaid");
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        background: "#0a0a0a",
        primaryColor: "#17171a",
        primaryTextColor: "#fafafa",
        primaryBorderColor: "#33333a",
        secondaryColor: "#121214",
        secondaryTextColor: "#c8c8d0",
        secondaryBorderColor: "#212126",
        tertiaryColor: "#0a0a0a",
        tertiaryTextColor: "#9a9aa3",
        tertiaryBorderColor: "#212126",
        lineColor: "#5d5d66",
        textColor: "#c8c8d0",
        mainBkg: "#17171a",
        nodeBorder: "#33333a",
        clusterBkg: "#121214",
        clusterBorder: "#212126",
        edgeLabelBackground: "#0a0a0a",
        fontFamily:
          "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace",
        fontSize: "12.5px",
      },
      flowchart: {
        curve: "linear",
        padding: 16,
        htmlLabels: true,
      },
      securityLevel: "loose",
    });
    const { svg } = await mermaid.render(uid, props.code.trim());
    if (host.value) host.value.innerHTML = svg;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Failed to render diagram";
  }
};

onMounted(render);
watch(() => props.code, render);
</script>

<template>
  <figure class="not-prose">
    <div class="border border-line bg-bg-base">
      <div class="overflow-x-auto px-6 py-8 md:px-10 md:py-12">
        <div
          v-if="error"
          class="font-mono text-mono-sm text-accent-warm"
          role="alert"
        >
          mermaid render error · {{ error }}
        </div>
        <div
          ref="host"
          class="mermaid-host flex justify-center [&_svg]:!max-w-full [&_svg]:!h-auto"
        />
      </div>
    </div>
    <figcaption
      v-if="caption"
      class="mt-3 font-mono text-mono-xs uppercase text-ink-subtle"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
