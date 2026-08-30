/** Alturas por contexto — franja de instituciones y logos en contacto. */
export const institutionLogoSizes = {
  CEMIC: {
    desktop: "h-7 sm:h-11 md:h-12",
    clinic: "h-8 sm:h-9",
  },
  "Hospital Británico": {
    desktop: "h-8 sm:h-12 md:h-[3.25rem]",
    clinic: "h-9 sm:h-10",
  },
  FASO: {
    desktop: "h-9 sm:h-14 md:h-16",
    clinic: "h-10",
  },
  COMS: {
    desktop: "h-9 sm:h-12 md:h-14",
    clinic: "h-10 sm:h-11",
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
