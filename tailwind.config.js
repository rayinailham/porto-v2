/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0a0a0b",
          elevated: "#111114",
          raised: "#16161a",
        },
        ink: {
          primary: "#f5f5f7",
          muted: "#8a8a93",
          subtle: "#5a5a63",
        },
        line: {
          DEFAULT: "#1f1f23",
          strong: "#2a2a30",
        },
        accent: {
          primary: "#0066ff",
          warm: "#ff6b35",
          success: "#10b981",
        },
      },
      fontFamily: {
        display: [
          "Plus Jakarta Sans Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        body: [
          "Inter Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono Variable",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        // Fluid clamp scale — premium editorial
        "display-xl": [
          "clamp(3.5rem, 8vw + 1rem, 6.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.04em", fontWeight: "700" },
        ],
        "display-lg": [
          "clamp(2.75rem, 5vw + 1rem, 4.5rem)",
          { lineHeight: "1", letterSpacing: "-0.035em", fontWeight: "700" },
        ],
        "display-md": [
          "clamp(2rem, 3vw + 1rem, 3rem)",
          { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" },
        ],
        "heading-lg": [
          "clamp(1.5rem, 1.5vw + 1rem, 2rem)",
          { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "heading-md": [
          "1.5rem",
          { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        "body-lg": [
          "1.125rem",
          { lineHeight: "1.6", letterSpacing: "-0.005em" },
        ],
        "body-md": ["1rem", { lineHeight: "1.6" }],
        "mono-sm": [
          "0.8125rem",
          { lineHeight: "1.5", letterSpacing: "0.01em" },
        ],
        "mono-xs": [
          "0.6875rem",
          { lineHeight: "1.4", letterSpacing: "0.12em" },
        ],
      },
      spacing: {
        section: "clamp(5rem, 10vw, 10rem)",
        "section-sm": "clamp(3rem, 6vw, 5rem)",
      },
      maxWidth: {
        shell: "1320px",
        prose: "65ch",
      },
      borderRadius: {
        "2.5xl": "1.25rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        haptic: "cubic-bezier(0.32, 0.72, 0, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      transitionDuration: {
        700: "700ms",
        900: "900ms",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.9", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(0.85)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
        marquee: "marquee 38s linear infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
      backgroundImage: {
        "noise-grain":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
