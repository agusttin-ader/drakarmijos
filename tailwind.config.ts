import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
      colors: {
        // Turquesa Pantone 318 C del manual. Demasiado claro para texto o
        // botones: usarlo en superficies, acentos y detalles.
        "brand-aqua": "#98D6D5",
        // Teal profundo para CTAs y contraste (derivado del aqua de marca).
        primary: "#0F5C5C",
        "primary-deep": "#0A2E2E",
        "primary-light": "#5EC9C4",
        // Fondos papel/tiza cálidos (crema con más calor).
        background: "#F0E6D8",
        "background-alt": "#E6DBC9",
        "background-muted": "#D9CCB8",
        // Texto con contraste WCAG AA+ sobre fondos claros.
        "text-primary": "#1B2A2E",
        "text-secondary": "#4A5759",
        "accent-gold": "#A87F2E",
      },
      borderRadius: {
        brand: "0.5rem 1.75rem 0.5rem 1.75rem",
        pill: "1.625rem 0.375rem 1.625rem 0.375rem",
        control: "0.625rem 0.125rem 0.625rem 0.125rem",
        field: "0.75rem 0.25rem 0.75rem 0.25rem",
        modal: "1.25rem 0.375rem 1.25rem 0.375rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(15, 92, 92, 0.08)",
        card: "0 2px 16px -4px rgba(15, 92, 92, 0.07)",
        elevated: "0 16px 48px -20px rgba(15, 92, 92, 0.14)",
        nav: "0 1px 0 0 rgba(15, 92, 92, 0.06), 0 8px 24px -12px rgba(15, 92, 92, 0.1)",
      },
      fontFamily: {
        // Humnst Lt BT → Source Sans 3 (humanista, cercana al manual).
        sans: ["var(--font-source-sans)", "sans-serif"],
        display: ["var(--font-source-sans)", "sans-serif"],
        // Kaufmann BT → Pinyon Script (firma / nombre de marca).
        script: ["var(--font-pinyon-script)", "cursive"],
      },
      maxWidth: {
        container: "1400px",
        "container-2xl": "1680px",
        "container-3xl": "1920px",
        "container-4xl": "2200px",
      },
      spacing: {
        section: "6rem",
        "section-lg": "8rem",
        "section-xl": "10rem",
        "section-2xl": "12rem",
      },
    },
  },
};

export default config;
