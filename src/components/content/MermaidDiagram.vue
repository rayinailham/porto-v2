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
        // Match dark editorial palette
        background: "#0a0a0b",
        primaryColor: "#16161a",
        primaryTextColor: "#f5f5f7",
        primaryBorderColor: "#2a2a30",
        secondaryColor: "#111114",
        secondaryTextColor: "#c8c8d0",
        secondaryBorderColor: "#1f1f23",
        tertiaryColor: "#0a0a0b",
        tertiaryTextColor: "#8a8a93",
        tertiaryBorderColor: "#1f1f23",
        lineColor: "#5a5a63",
        textColor: "#c8c8d0",
        mainBkg: "#16161a",
        nodeBorder: "#2a2a30",
        clusterBkg: "#111114",
        clusterBorder: "#1f1f23",
        edgeLabelBackground: "#0a0a0b",
        fontFamily: "JetBrains Mono Variable, JetBrains Mono, ui-monospace, monospace",
        fontSize: "13px",
      },
      flowchart: {
        curve: "basis",
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
  <figure class="not-prose my-10">
    <div
      class="relative overflow-hidden rounded-[24px] border border-line bg-bg-elevated/30 p-1.5"
      style="box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);"
    >
      <div
        class="overflow-x-auto rounded-[18px] border border-line/70 bg-bg-base/80 p-6 md:p-8"
      >
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
      class="mt-3 text-center font-mono text-mono-xs uppercase tracking-[0.18em] text-ink-subtle"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
