import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "#0F5C5C",
        "primary-light": "#5EC9C4",
        background: "#FAF8F5",
        "background-alt": "#F1ECE4",
        "text-primary": "#1B2A2E",
        "text-secondary": "#5C6B6B",
        "accent-gold": "#C9A15D",
        "accent-gold-text": "#8A6D38",
        "accent-sage": "#7FA88A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      maxWidth: {
        container: "1400px",
      },
      spacing: {
        section: "6rem",
        "section-lg": "8rem",
      },
    },
  },
};

export default config;
