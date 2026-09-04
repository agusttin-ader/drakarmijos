/**
 * Pantalla "estamos trabajando" solo en producción.
 * En local (`npm run dev`) siempre se ve el sitio completo para poder trabajar.
 * En Vercel: NEXT_PUBLIC_SITE_COMING_SOON=true hasta el lanzamiento.
 */
export const isSiteComingSoon =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_SITE_COMING_SOON === "true";
