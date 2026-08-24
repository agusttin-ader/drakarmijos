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
        "primary-light": "#5EC9C4",
        // Fondos limpios cercanos al papel del manual / recetario.
        background: "#FBFCFC",
        "background-alt": "#F3F7F7",
        // Pantone 444 C como base; un punto más oscuro para lectura web.
        "text-primary": "#3A4244",
        "text-secondary": "#6B7577",
        "accent-gold": "#C9A15D",
        "accent-gold-text": "#8A6D38",
        "accent-sage": "#7FA88A",
      },
      fontFamily: {
        // Humnst Lt BT → Source Sans 3 (humanista, cercana al manual).
        sans: ["var(--font-source-sans)", "sans-serif"],
        display: ["var(--font-source-sans)", "sans-serif"],
        // Kaufmann BT → Great Vibes (firma / nombre de marca).
        script: ["var(--font-great-vibes)", "cursive"],
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
