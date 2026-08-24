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
- `components/sections/` — secciones del homepage
- `components/ui/` — componentes reutilizables (`SiteImage`, `SitePhoto`, etc.)
- `lib/site-data.ts` — datos del consultorio, contacto y copy compartido
- `public/images/` — logo, highlights e imágenes clínicas
- `scripts/` — generación de assets de marca y optimización de fotos

## Assets de marca

```bash
python3 -m venv .venv-tools
.venv-tools/bin/pip install pymupdf pillow
.venv-tools/bin/python scripts/build-brand-assets.py "ruta/al/MANUAL DE LOGO.pdf"
```

Salida: `logo.png`, `logo-white.png`, `logo-completo.png`, `app/icon.png`, `app/apple-icon.png`.

Paleta: turquesa Pantone 318 C (`brand-aqua` `#98D6D5`) y gris Pantone 444 C.
CTAs usan `primary` (`#0F5C5C`). Tipografía web: Source Sans 3 + Pinyon Script (firma / nombre).

## Imágenes

`images.unoptimized: true` — sin Image Optimization de Vercel. Fotos estáticas en `/public`.

```bash
.venv-tools/bin/python scripts/optimize-site-images.py
```

Usar `SiteImage` / `SitePhoto` en componentes.

## Pendientes de contenido

- Testimonios con nombres ficticios (disclaimer en `Testimonials.tsx`)
- Retrato profesional de rostro (hoy hay fotos de quirófano)
- Aviso de privacidad / consentimiento del formulario
