# drakarmijos

Sitio web profesional de la **Dra. Karla Armijos** — otorrinolaringóloga especializada en rinología y trastornos respiratorios del sueño.

## Stack

- [Next.js 16](https://nextjs.org) (App Router)
- TypeScript
- Tailwind CSS v4
- GSAP + Lenis (scroll y animaciones de sección)
- Framer Motion (micro-interacciones UI)

## Desarrollo

```bash
npm install
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Estructura

- `app/` — layout, página principal, estilos globales
- `components/sections/` — secciones del homepage (Hero, About, Booking, etc.)
- `components/ui/` — componentes reutilizables
- `lib/site-data.ts` — datos del consultorio, contacto y copy compartido
- `public/images/` — logo, íconos de highlights e imágenes del sitio

## Pendientes de contenido

Reemplazar placeholders de imágenes y testimonios ficticios antes de producción (ver labels en componentes About, BeforeAfter y Testimonials).
