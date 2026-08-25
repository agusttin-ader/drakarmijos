import { buildHomeJsonLd } from "@/lib/seo";

export function HomeJsonLd() {
  const schemas = buildHomeJsonLd();

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${String(schema["@type"])}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
