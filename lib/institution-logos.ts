/** Alturas por contexto — una sola fuente para la franja, marquee y contacto. */
export const institutionLogoSizes = {
  CEMIC: {
    desktop: "h-8 sm:h-11 md:h-12",
    mobile: "h-8",
    clinic: "h-8 sm:h-9",
  },
  "Hospital Británico": {
    desktop: "h-9 sm:h-12 md:h-[3.25rem]",
    mobile: "h-9",
    clinic: "h-9 sm:h-10",
  },
  "Congreso Panamericano de ORL": {
    desktop: "h-9 sm:h-12 md:h-[3.25rem]",
    mobile: "h-9",
    clinic: "h-9",
  },
  "Rino Argentina": {
    desktop: "h-7 sm:h-10 md:h-11",
    mobile: "h-7",
    clinic: "h-7",
  },
  FASO: {
    desktop: "h-10 sm:h-14 md:h-16",
    mobile: "h-10",
    clinic: "h-10",
  },
} as const;

export type InstitutionLogoContext = keyof (typeof institutionLogoSizes)["CEMIC"];

export function institutionLogoClass(
  name: string,
  context: InstitutionLogoContext,
  fallback = "h-8 sm:h-11 md:h-12",
) {
  const sizes = institutionLogoSizes[name as keyof typeof institutionLogoSizes];
  return sizes?.[context] ?? fallback;
}
