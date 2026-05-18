/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0a0a0a",
          elevated: "#121214",
          raised: "#17171a",
        },
        ink: {
          primary: "#fafafa",
          muted: "#9a9aa3",
          subtle: "#5d5d66",
          faint: "#3a3a40",
        },
        line: {
          DEFAULT: "#212126",
          strong: "#33333a",
          faint: "#181820",
        },
        accent: {
          warm: "#ff5a1f",
          success: "#22c55e",
        },
      },
      fontFamily: {
        display: [
          "Inter Variable",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Helvetica",
          "sans-serif",
        ],
        body: [
          "Inter Variable",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono Variable",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        // Swiss editorial scale — disciplined, tight
        "display-xl": [
          "clamp(3rem, 6.5vw + 1rem, 6rem)",
          { lineHeight: "0.92", letterSpacing: "-0.045em", fontWeight: "600" },
        ],
        "display-lg": [
          "clamp(2.25rem, 4vw + 1rem, 3.75rem)",
          { lineHeight: "0.96", letterSpacing: "-0.04em", fontWeight: "600" },
        ],
        "display-md": [
          "clamp(1.75rem, 2.5vw + 1rem, 2.5rem)",
          { lineHeight: "1", letterSpacing: "-0.032em", fontWeight: "600" },
        ],
        "heading-lg": [
          "clamp(1.25rem, 1.2vw + 0.8rem, 1.625rem)",
          { lineHeight: "1.15", letterSpacing: "-0.022em", fontWeight: "500" },
        ],
        "heading-md": [
          "1.125rem",
          { lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "500" },
        ],
        "body-lg": [
          "1.0625rem",
          { lineHeight: "1.55", letterSpacing: "-0.005em" },
        ],
        "body-md": ["0.9375rem", { lineHeight: "1.65" }],
        "body-sm": ["0.8125rem", { lineHeight: "1.6" }],
        "mono-sm": [
          "0.75rem",
          { lineHeight: "1.5", letterSpacing: "0.04em" },
        ],
        "mono-xs": [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.2em" },
        ],
        "mono-2xs": [
          "0.625rem",
          { lineHeight: "1.4", letterSpacing: "0.24em" },
        ],
      },
      spacing: {
        section: "clamp(6.5rem, 13vw, 13rem)",
        "section-sm": "clamp(4rem, 8vw, 7rem)",
        "section-xs": "clamp(2.5rem, 5vw, 4rem)",
        gutter: "clamp(1.5rem, 3vw, 3rem)",
      },
      maxWidth: {
        shell: "1280px",
        prose: "60ch",
        narrow: "44ch",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "3px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        haptic: "cubic-bezier(0.32, 0.72, 0, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        700: "700ms",
        900: "900ms",
        1200: "1200ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.7)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        caret: {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        marquee: "marquee 64s linear infinite",
        caret: "caret 1.1s steps(1) infinite",
      },
    },
  },
  plugins: [],
};
