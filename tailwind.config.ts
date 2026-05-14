import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      backgroundImage: {
        "glow-radial":
          "radial-gradient(ellipse 90% 55% at 50% -15%, rgb(167 139 250 / 0.14), transparent 58%)",
        "glow-corner":
          "radial-gradient(ellipse 55% 45% at 100% 0%, rgb(96 165 250 / 0.12), transparent 55%)",
        "glow-sage":
          "radial-gradient(ellipse 50% 40% at 0% 100%, rgb(134 239 172 / 0.1), transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
