import { siteUrl } from "@/lib/seo";
import type { ServicePage } from "@/lib/service-pages";
import { siteData } from "@/lib/site-data";

type ServiceJsonLdProps = {
  page: ServicePage;
};

export function ServiceJsonLd({ page }: ServiceJsonLdProps) {
  const pageUrl = `${siteUrl}/${page.slug}`;

  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: page.h1,
          item: pageUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      "@id": `${pageUrl}/#webpage`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: "es-AR",
      about: {
        "@type": "MedicalCondition",
        name: page.h1,
      },
      author: {
        "@type": "Physician",
        name: siteData.doctor.name,
        url: siteUrl,
      },
      provider: {
        "@type": "Physician",
        name: siteData.doctor.name,
        telephone: siteData.contact.phone,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${page.slug}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
