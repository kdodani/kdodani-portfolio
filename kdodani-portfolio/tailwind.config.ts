import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        editorial: "min(100%, 40rem)",
        scene: "min(100%, 52rem)",
        frame: "min(100%, 68rem)",
      },
      spacing: {
        "page-x": "clamp(1rem, 2.8vw + 0.65rem, 2.75rem)",
        "section-pad": "clamp(3.25rem, 5vh + 2rem, 5.75rem)",
      },
      colors: {
        accent: {
          DEFAULT: "rgb(var(--accent-hero-1) / <alpha-value>)",
          mid: "rgb(var(--accent-hero-2) / <alpha-value>)",
          blue: "rgb(var(--accent-hero-3) / <alpha-value>)",
          cyan: "rgb(var(--accent-hero-4) / <alpha-value>)",
          strong: "rgb(var(--accent-strong) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      backgroundImage: {
        "glow-radial":
          "radial-gradient(ellipse 90% 55% at 50% -15%, rgb(var(--accent-hero-1) / 0.13), transparent 58%)",
        "glow-corner":
          "radial-gradient(ellipse 55% 45% at 100% 0%, rgb(var(--accent-hero-3) / 0.11), transparent 55%)",
        "glow-sage":
          "radial-gradient(ellipse 50% 40% at 0% 100%, rgb(var(--accent-hero-2) / 0.08), transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
