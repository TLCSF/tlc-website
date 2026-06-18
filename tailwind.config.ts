import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        moss: "#425747",
        cedar: "#7b4f36",
        clay: "#b87855",
        linen: "#f5eccf",
        paper: "#fffaf2",
        river: "#3e6671",
        gold: "#a5722b",
        creme: "#f5eccf"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 20px 60px rgba(24, 35, 31, 0.12)"
      }
    }
  },
  plugins: []
};

export default config;
