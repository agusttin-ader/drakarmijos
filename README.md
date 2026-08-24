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
- `scripts/` — utilidades de assets (ver más abajo)

## Assets de marca

El logo, los favicons y la variante con firma se generan desde el manual de marca
en PDF. Para regenerarlos:

```bash
python3 -m venv .venv-tools
.venv-tools/bin/pip install pymupdf pillow
.venv-tools/bin/python scripts/build-brand-assets.py "ruta/al/MANUAL DE LOGO.pdf"
```

Salida: `logo.png` (emblema turquesa), `logo-white.png` (negativo para el footer),
`logo-completo.png` (emblema + firma), `app/icon.png` y `app/apple-icon.png`.

Paleta oficial: turquesa Pantone 318 C (`#98D6D5`, token `brand-aqua`) y gris
Pantone 444 C. El turquesa es demasiado claro para texto o botones, así que los
elementos interactivos usan `primary` (`#0F5C5C`).

Tipografía (equivalentes web del manual): **Source Sans 3** (Humnst Lt BT) y
**Great Vibes** (Kaufmann BT) para la firma / nombre.

## Pendientes de contenido

- Testimonios con nombres ficticios (ver disclaimer en `Testimonials.tsx`).
- Falta un retrato profesional de rostro; "Sobre mí" usa una foto de quirófano.
- Matrícula (`siteData.doctor.license`) y email cargados pero todavía sin mostrar.
- Sin aviso de privacidad ni consentimiento para los datos del formulario.
