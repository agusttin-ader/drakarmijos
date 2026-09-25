import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      screens: {
        "3xl": "1920px",
        "4xl": "2560px",
      },
      colors: {
        // Pantone 318 C — relleno del sello (foto de perfil IG @dra.karmijos).
        "brand-aqua": "#98D6D5",
        "brand-mint-soft": "#D8EFEE",
        "brand-mint-wash": "#ECF6F5",
        // Teal profundo — texto, CTAs, contraste (luna / sueño del emblema).
        primary: "#0B4B4B",
        "primary-deep": "#063636",
        "primary-light": "#5BB8B6",
        // Papel frío tipo feed — menos amarillo que la crema anterior.
        background: "#FAFAF8",
        "background-alt": "#EFF6F5",
        "background-muted": "#E2ECEB",
        "text-primary": "#132828",
        /** Cuerpo y metadatos — más oscuro que #476060 para WCAG en fondos mint/crema. */
        "text-secondary": "#2E4545",
        // Reglas editoriales (sustituye dorado; misma función visual).
        "accent-line": "#98D6D5",
        "accent-gold": "#98D6D5",
      },
      borderRadius: {
        brand: "0.5rem 1.75rem 0.5rem 1.75rem",
        pill: "1.625rem 0.375rem 1.625rem 0.375rem",
        control: "0.625rem 0.125rem 0.625rem 0.125rem",
        field: "0.75rem 0.25rem 0.75rem 0.25rem",
        modal: "1.25rem 0.375rem 1.25rem 0.375rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(11, 75, 75, 0.08)",
        card: "0 2px 16px -4px rgba(11, 75, 75, 0.07)",
        elevated: "0 16px 48px -20px rgba(11, 75, 75, 0.12)",
        nav: "0 1px 0 0 rgba(11, 75, 75, 0.06), 0 8px 24px -12px rgba(11, 75, 75, 0.08)",
        mint: "0 12px 40px -16px rgba(152, 214, 213, 0.45)",
      },
      fontFamily: {
        sans: ["var(--font-source-sans)", "sans-serif"],
        display: ["var(--font-source-sans)", "sans-serif"],
        brand: ["var(--font-brand)", "Georgia", "serif"],
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
