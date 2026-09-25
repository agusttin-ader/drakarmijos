"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { BookConsultButton } from "@/components/book-consult-button";
import { Container } from "@/components/ui/container";
import { SitePhoto } from "@/components/ui/site-photo";
import { siteCopy, siteData } from "@/lib/site-data";

/** Sobre mí — grid 12 cols, copy compacto, sidebar de confianza. */
export function About() {
  const licenseStat = siteData.stats.find((s) => s.label === "Matrícula");
  const institutionsStat = siteData.stats.find((s) => s.label === "Instituciones");

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-anchor section-y-tight bg-background"
    >
      <Container>
        <Reveal from="up">
        <header className="border-b border-primary/10 pb-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:pb-7 xl:gap-14">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="accent-rule w-8 sm:w-10" />
              <p className="eyebrow text-primary">Sobre mí</p>
            </div>
            <h2
              id="about-heading"
              className="mt-3 font-display text-[clamp(1.625rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-tight text-text-primary 2xl:text-[clamp(2rem,2.2vw,2.85rem)]"
            >
              Otorrinolaringóloga. Especialista en rinología y sueño.
            </h2>
          </div>
          <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.65] text-text-secondary lg:col-span-4 lg:mt-0 lg:flex lg:items-end lg:justify-end lg:text-right">
            {siteData.doctor.audience}. Consulta con tiempo para explicar cada paso.
          </p>
        </header>
        </Reveal>

        <div className="mt-0 grid min-w-0 items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10 xl:gap-14">
          <Reveal
            from="left"
            className="mx-auto w-full max-w-sm lg:col-span-4 lg:mx-0 lg:max-w-none xl:col-span-5"
          >
            <div className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-brand shadow-elevated ring-1 ring-brand-aqua/25">
                <SitePhoto
                  src="/images/about/dra-armijos-retrato.jpg"
                  alt={`${siteData.doctor.name}, otorrinolaringóloga especialista en rinología y trastornos del sueño`}
                  sizes="(max-width: 1023px) min(90vw, 24rem), min(36vw, 420px)"
                  objectPosition="object-[center_18%]"
                  className="aspect-[4/5] w-full rounded-none shadow-none ring-0"
                />
              </div>
            </div>
          </Reveal>

          <Reveal from="right" className="min-w-0 lg:col-span-5 xl:col-span-4">
            <div
              className="prose-measure space-y-4 text-[0.9375rem] leading-[1.65] text-text-secondary sm:text-[0.975rem] sm:leading-[1.7]"
            >
              <p>
                Diagnostico y trato patologías de oído, nariz y garganta, con foco en
                obstrucción nasal, alergias, ronquidos y apnea obstructiva del sueño.
                Atiendo adultos y niños en {siteCopy.clinicsListConjunction}. En consulta
                priorizo explicar cada estudio — endoscopia, polisomnografía, audiometría
                o wearables — antes de proponer cirugía o CPAP.
              </p>
              <p>
                Muchas personas llegan agotadas sin saber que la respiración nasal o una
                apnea leve pueden estar en el origen. Participo como disertante en
                congresos de rinología y ORL (Congreso Panamericano, Rino Argentina / FASO
                y Federación Argentina de Sociedades de ORL).
              </p>
            </div>

            <div
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-primary/10 pt-5 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-text-secondary"
            >
              {licenseStat ? (
                <span>
                  <span className="text-text-secondary">Matrícula </span>
                  <span className="text-text-primary">{licenseStat.value}</span>
                </span>
              ) : null}
              {institutionsStat ? (
                <span>
                  <span className="text-text-secondary">Sedes </span>
                  <span className="normal-case tracking-normal text-text-primary">
                    {institutionsStat.value}
                  </span>
                </span>
              ) : null}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 lg:hidden">
              <BookConsultButton variant="primary">{siteData.cta.book}</BookConsultButton>
              <Link
                href="#specialties"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                Especialidades →
              </Link>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.06} className="min-w-0 lg:col-span-3">
            <div className="rounded-brand bg-brand-mint-wash/80 px-5 py-6 ring-1 ring-brand-aqua/30 sm:px-6 lg:sticky lg:top-24">
              <p className="font-display text-base font-light leading-[1.65] text-text-primary sm:text-lg">
                “{siteData.doctor.quote}”
              </p>
              <p className="mt-5 text-[0.625rem] font-medium uppercase tracking-[0.18em] text-text-secondary">
                {siteData.doctor.title}
              </p>
              <p className="mt-1 text-sm text-text-primary">{siteData.doctor.license}</p>
              <BookConsultButton variant="primary" className="mt-6 hidden w-full sm:w-auto lg:inline-flex">
                {siteData.cta.book}
              </BookConsultButton>
              <div className="mt-4 hidden flex-col gap-2 lg:flex">
                <Link
                  href="#specialties"
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-primary underline-offset-[5px] hover:underline"
                >
                  Ver especialidades
                </Link>
                <Link
                  href={siteData.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-text-secondary underline-offset-[5px] hover:text-primary hover:underline"
                >
                  {siteData.social.instagramHandle}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
