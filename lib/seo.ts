import type { Metadata } from "next";
import { siteData } from "@/lib/site-data";

const DEFAULT_SITE_URL = "https://www.drakarmijos.com";

function resolveSiteUrl(raw?: string): string {
  const value = (raw ?? "").trim() || DEFAULT_SITE_URL;
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withProtocol);
    url.hash = "";
    url.search = "";
    return url.origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const seoKeywords = [
  "otorrino",
  "otorrino Buenos Aires",
  "otorrinolaringólogo",
  "otorrinolaringóloga",
  "otorrinolaringóloga Buenos Aires",
  "ronquidos",
  "ronquidos tratamiento",
  "apnea del sueño",
  "apnea del sueño Buenos Aires",
  "rinología",
  "rinoplastia funcional",
  "CEMIC otorrino",
  "Hospital Británico otorrino",
  "ORL adultos y niños",
  "Dra. Karla Armijos",
] as const;

const defaultTitle =
  "Otorrino Buenos Aires · Ronquidos y Apnea del Sueño | Dra. Karla Armijos";

const defaultDescription =
  "Otorrino en Buenos Aires (CABA). Ronquidos, apnea del sueño, rinología y ORL pediátrica. Turnos en CEMIC y Hospital Británico. Dra. Karla Armijos — adultos y niños.";

export const defaultOpenGraphImage = {
  url: "/images/hero/hero-atmosphere.jpg",
  width: 1536,
  height: 1024,
  alt: "Dra. Karla Armijos — otorrinolaringóloga en Buenos Aires",
} as const;

/** Token de Google Search Console (meta tag). Configurar en Vercel: GOOGLE_SITE_VERIFICATION */
const googleSiteVerification =
  process.env.GOOGLE_SITE_VERIFICATION ??
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export function buildSiteMetadata(overrides?: Partial<Metadata>): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: defaultTitle,
      template: "%s | Dra. Karla Armijos",
    },
    description: defaultDescription,
    keywords: [...seoKeywords],
    authors: [{ name: siteData.doctor.name, url: siteUrl }],
    creator: siteData.doctor.name,
    publisher: siteData.doctor.name,
    category: "health",
    alternates: {
      canonical: "/",
    },
    ...(googleSiteVerification
      ? { verification: { google: googleSiteVerification } }
      : {}),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "es_AR",
      url: siteUrl,
      siteName: siteData.doctor.name,
      title: defaultTitle,
      description: defaultDescription,
      images: [defaultOpenGraphImage],
    },
    twitter: {
      card: "summary_large_image",
      title: defaultTitle,
      description: defaultDescription,
      images: [defaultOpenGraphImage.url],
    },
    ...overrides,
  };
}

const clinicGeo = {
  CEMIC: {
    streetAddress: "Av. Las Heras 2900",
    locality: "Ciudad Autónoma de Buenos Aires",
    region: "CABA",
    postalCode: "C1425",
    country: "AR",
  },
  "Hospital Británico": {
    streetAddress: "Perdriel 74",
    locality: "Ciudad Autónoma de Buenos Aires",
    region: "CABA",
    postalCode: "C1280",
    country: "AR",
  },
} as const;

export function buildHomeJsonLd() {
  const physicianId = `${siteUrl}/#physician`;

  const clinics = siteData.clinics.map((clinic) => {
    const geo = clinicGeo[clinic.name as keyof typeof clinicGeo];
    return {
      "@type": "MedicalClinic",
      "@id": `${siteUrl}/#clinic-${clinic.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: `${siteData.doctor.name} — ${clinic.name}`,
      url: siteUrl,
      image: `${siteUrl}${clinic.logo}`,
      telephone: siteData.contact.phone,
      address: {
        "@type": "PostalAddress",
        ...geo,
      },
      parentOrganization: {
        "@type": "Organization",
        name: clinic.name,
      },
      physician: { "@id": physicianId },
    };
  });

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteData.doctor.name,
      description: defaultDescription,
      inLanguage: "es-AR",
      publisher: { "@id": physicianId },
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      "@id": physicianId,
      name: siteData.doctor.name,
      url: siteUrl,
      image: `${siteUrl}/images/logo-completo.png`,
      description: siteData.doctor.fullTitle,
      medicalSpecialty: [
        "Otolaryngologic",
        "Sleep Medicine",
        "Rhinology",
      ],
      knowsAbout: [
        "Ronquidos",
        "Apnea del sueño",
        "Rinología",
        "Sinusitis",
        "Desviación de tabique",
        "Respiración bucal",
        "Cirugía nasal",
        "Pediatría ORL",
      ],
      identifier: siteData.doctor.license,
      telephone: siteData.contact.phone,
      email: siteData.contact.email,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Matrícula profesional",
        identifier: siteData.doctor.license,
      },
      sameAs: [siteData.social.instagram, siteData.social.linkedin],
      areaServed: {
        "@type": "City",
        name: "Buenos Aires",
      },
      availableService: [
        {
          "@type": "MedicalProcedure",
          name: "Consulta otorrinolaringológica",
          url: `${siteUrl}/#respira-mejor`,
          description:
            "Evaluación de oído, nariz y garganta en adultos y niños.",
        },
        {
          "@type": "MedicalProcedure",
          name: "Tratamiento de ronquidos y apnea del sueño",
          url: `${siteUrl}/#duerme-mejor`,
          description:
            "Diagnóstico, estudio del sueño, CPAP y cirugía de vías aéreas superiores.",
        },
        {
          "@type": "MedicalProcedure",
          name: "Rinología y cirugía nasal",
          url: `${siteUrl}/#cirugia-nasal`,
          description:
            "Evaluación de desviación de tabique, sinusitis y rinoplastia funcional.",
        },
        {
          "@type": "MedicalProcedure",
          name: "ORL pediátrica",
          url: `${siteUrl}/#respira-mejor`,
          description:
            "Consulta otorrinolaringológica en niños: respiración bucal, adenoides y otitis.",
        },
      ],
      worksFor: clinics.map((clinic) => ({ "@id": clinic["@id"] })),
    },
    ...clinics,
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: siteData.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];
}
