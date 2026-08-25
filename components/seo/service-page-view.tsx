import Link from "next/link";
import { BookConsultButton } from "@/components/book-consult-button";
import { ServiceJsonLd } from "@/components/seo/service-json-ld";
import { Container } from "@/components/ui/container";
import type { ServicePage } from "@/lib/service-pages";
import { servicePagesBySlug } from "@/lib/service-pages";

type ServicePageViewProps = {
  page: ServicePage;
};

export function ServicePageView({ page }: ServicePageViewProps) {
  return (
    <>
      <ServiceJsonLd page={page} />
      <article className="scroll-anchor section-y">
        <Container className="max-w-3xl">
          <nav aria-label="Breadcrumb" className="text-sm text-text-secondary">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  Inicio
                </Link>
              </li>
              <li aria-hidden className="text-primary/30">
                /
              </li>
              <li aria-current="page" className="text-text-primary">
                {page.eyebrow.split("·")[0]?.trim()}
              </li>
            </ol>
          </nav>

          <p className="eyebrow mt-8">{page.eyebrow}</p>
          <h1 className="mt-3 font-display text-[clamp(1.875rem,4.5vw,2.75rem)] font-light leading-[1.12] tracking-tight text-text-primary">
            {page.h1}
          </h1>
          <p className="prose-measure mt-5 text-lg leading-relaxed text-text-secondary">
            {page.lead}
          </p>

          <div className="mt-8">
            <BookConsultButton variant="primary">Agendar cita</BookConsultButton>
          </div>

          <div className="mt-14 space-y-12">
            {page.sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-display text-2xl font-light tracking-tight text-text-primary sm:text-[1.65rem]">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="prose-measure text-base leading-relaxed text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <section
            aria-labelledby={`${page.slug}-faq-heading`}
            className="mt-16 overflow-hidden rounded-brand bg-background-alt/60 shadow-card ring-1 ring-primary/10"
          >
            <div className="border-b border-primary/10 px-5 py-6 sm:px-7">
              <h2
                id={`${page.slug}-faq-heading`}
                className="font-display text-xl font-light text-text-primary sm:text-2xl"
              >
                Preguntas frecuentes
              </h2>
            </div>
            <dl className="divide-y divide-primary/10">
              {page.faqs.map((faq) => (
                <div key={faq.question} className="px-5 py-5 sm:px-7 sm:py-6">
                  <dt className="font-medium text-text-primary">{faq.question}</dt>
                  <dd className="prose-measure mt-2 text-sm leading-relaxed text-text-secondary sm:text-base">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {page.relatedSlugs.length > 0 ? (
            <aside className="mt-12 rounded-brand border border-primary/10 bg-background/80 p-5 sm:p-6">
              <p className="eyebrow">También te puede interesar</p>
              <ul className="mt-3 space-y-2">
                {page.relatedSlugs.map((slug) => {
                  const related = servicePagesBySlug[slug];
                  if (!related) return null;
                  return (
                    <li key={slug}>
                      <Link
                        href={`/${slug}`}
                        className="text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        {related.h1}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/#booking"
                    className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    Ver consultorios y contacto
                  </Link>
                </li>
              </ul>
            </aside>
          ) : null}

          <div className="mt-12 flex flex-wrap gap-4">
            <BookConsultButton variant="primary">Agendar cita</BookConsultButton>
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-text-secondary transition-colors hover:text-primary"
            >
              ← Volver al inicio
            </Link>
          </div>
        </Container>
      </article>
    </>
  );
}
