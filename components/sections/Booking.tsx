"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { BookConsultButton } from "@/components/book-consult-button";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { InstitutionLogoImage } from "@/components/ui/institution-logo-image";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { institutionLogoClass } from "@/lib/institution-logos";
import { siteCopy, siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

function mapsSearchUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

const directoryLabelClass =
  "text-[0.625rem] font-semibold uppercase tracking-[0.2em] text-text-secondary";

export function Booking() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="scroll-anchor section-divider section-y-tight bg-background"
    >
      <Container>
        <Reveal from="left">
          <header className="border-b border-primary/10 pb-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:pb-7 xl:gap-14">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="flex items-center gap-2.5">
              <span aria-hidden className="accent-rule w-8 sm:w-10" />
              <p className="eyebrow text-primary">Contacto</p>
            </div>
            <h2
              id="booking-heading"
              className="mt-3 font-display text-[clamp(1.625rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-tight text-text-primary"
            >
              Agendá tu consulta en Buenos Aires
            </h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.65] text-text-secondary sm:text-base">
              {siteCopy.clinicsListConjunction}. Horarios fijos en CEMIC y COMS; en
              Hospital Británico coordino según agenda.
            </p>
          </div>
          <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.65] text-text-primary/88 lg:col-span-5 lg:mt-0 lg:flex lg:items-end lg:justify-end lg:text-right xl:col-span-4">
            {siteCopy.bookingIntro} {siteData.contact.responseTime}.
          </p>
        </header>
        </Reveal>

        <Reveal from="right" delay={0.05}>
        <div
          className="flex flex-col gap-4 border-b border-primary/10 bg-brand-mint-wash/40 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-3 sm:py-5"
          aria-label="Acciones de contacto"
        >
          <BookConsultButton variant="primary" className="w-full sm:w-auto">
            {siteData.cta.book}
          </BookConsultButton>
          <span
            aria-hidden
            className="hidden h-4 w-px shrink-0 bg-primary/15 sm:block"
          />
          <a
            href={siteData.contact.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline sm:w-auto"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            WhatsApp
          </a>
          <span aria-hidden className="hidden text-primary/25 sm:inline">
            ·
          </span>
          <a
            href={`tel:${siteData.contact.phoneHref}`}
            className="text-sm font-medium tabular-nums text-text-primary underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            {siteData.contact.phone}
          </a>
          <span aria-hidden className="hidden text-primary/25 sm:inline">
            ·
          </span>
          <a
            href={`mailto:${siteData.contact.email}`}
            className="break-all text-sm font-medium text-text-primary underline-offset-4 transition-colors hover:text-primary hover:underline sm:break-normal"
          >
            {siteData.contact.email}
          </a>
        </div>
        </Reveal>

        <Reveal from="left" delay={0.08}>
        <div className="mt-0 min-w-0">
          <div
            className="hidden border-b border-primary/10 pb-3 pt-8 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0 xl:gap-x-8"
            aria-hidden
          >
            <div className={cn(directoryLabelClass, "lg:col-span-2 lg:text-center")}>
              Sede
            </div>
            <div className={cn(directoryLabelClass, "lg:col-span-4")}>Ubicación</div>
            <div className={cn(directoryLabelClass, "lg:col-span-3")}>Horarios</div>
            <div className={cn(directoryLabelClass, "lg:col-span-3 lg:text-right")}>
              Acción
            </div>
          </div>

          <ul className="editorial-list">
            {siteData.clinics.map((clinic) => (
              <li
                key={clinic.name}
                className="list-none py-5 sm:py-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-6 lg:py-8 xl:gap-x-8"
              >
                <div className="flex flex-col items-center lg:col-span-2">
                  <InstitutionLogoImage
                    src={clinic.logo}
                    alt={clinic.name}
                    width={160}
                    height={48}
                    originClass="origin-center"
                    className={cn(
                      "mx-auto w-auto max-w-[9rem] object-center sm:max-w-[10rem]",
                      institutionLogoClass(clinic.name, "clinic", "h-7 sm:h-8"),
                      clinic.name === "COMS" && "rounded-brand",
                    )}
                  />
                </div>

                <div className="mt-4 min-w-0 lg:col-span-4 lg:mt-0">
                  <p className={cn(directoryLabelClass, "mb-2 lg:sr-only")}>
                    Ubicación
                  </p>
                  <p className="text-[0.9375rem] leading-relaxed text-text-primary/88 sm:text-base">
                    {clinic.address}
                  </p>
                </div>

                <div className="mt-5 lg:col-span-3 lg:mt-0">
                  <p className={cn(directoryLabelClass, "mb-2 lg:sr-only")}>
                    Horarios
                  </p>
                  {clinic.hours?.length ? (
                    <ul className="space-y-1">
                      {clinic.hours.map(({ day, time }) => (
                        <li
                          key={day}
                          className="text-[0.9375rem] tabular-nums text-text-primary/88"
                        >
                          <span className="font-semibold text-text-primary">{day}</span>
                          {" · "}
                          {time}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[0.9375rem] leading-relaxed text-text-secondary">
                      Según agenda institucional
                    </p>
                  )}
                </div>

                <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 lg:col-span-3 lg:mt-0 lg:justify-end">
                  <p className={cn(directoryLabelClass, "mb-1 w-full lg:sr-only")}>
                    Acción
                  </p>
                  <a
                    href={mapsSearchUrl(clinic.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
                  >
                    <MapPin className="size-3.5 shrink-0 stroke-[2]" aria-hidden />
                    Cómo llegar
                    <ArrowUpRight className="size-3.5 shrink-0 opacity-70" aria-hidden />
                  </a>
                  {"website" in clinic && clinic.website ? (
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
                    >
                      Turno online
                      <ArrowUpRight className="size-3.5 shrink-0 opacity-70" aria-hidden />
                    </a>
                  ) : null}
                  {!clinic.hours?.length ? (
                    <a
                      href={siteData.contact.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary underline-offset-4 transition-colors hover:text-primary hover:underline"
                    >
                      Consultar por WhatsApp
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 flex flex-col gap-2 border-t border-primary/10 pt-6 text-[0.8125rem] leading-relaxed text-text-secondary sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-6">
            <span>Respuesta por formulario o WhatsApp: {siteData.contact.responseTime}.</span>
            <Link
              href={siteData.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold uppercase tracking-[0.14em] text-text-secondary underline-offset-[5px] hover:text-primary hover:underline"
            >
              {siteData.social.instagramHandle}
            </Link>
          </p>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
