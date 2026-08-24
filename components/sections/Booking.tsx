"use client";

import { MapPin, Phone } from "lucide-react";
import { BookConsultButton } from "@/components/book-consult-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { siteData } from "@/lib/site-data";

export function Booking() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="scroll-anchor section-divider bg-background-alt/70 brand-pattern section-y"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
          <div className="surface-panel border-l-4 border-l-brand-aqua p-6 sm:p-8 lg:p-10">
            <p className="eyebrow">Contacto</p>
            <h2
              id="booking-heading"
              className="mt-3 font-display text-[clamp(1.875rem,4vw,2.75rem)] font-light leading-[1.1] tracking-tight text-text-primary"
            >
              Citas en CEMIC y Hospital Británico.
            </h2>
            <p className="prose-measure mt-4 text-base leading-relaxed text-text-secondary">
              Miércoles y jueves en CEMIC (Las Heras 2900). También atención en
              Hospital Británico. WhatsApp o formulario: te respondo por el
              mismo canal.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <BookConsultButton variant="primary" className="w-full sm:w-auto">
                {siteData.cta.book}
              </BookConsultButton>
              <Button
                href={siteData.contact.whatsappUrl}
                variant="outline"
                className="w-full gap-2.5 sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escríbeme por WhatsApp"
              >
                <WhatsAppIcon className="size-4 text-primary" />
                WhatsApp
              </Button>
            </div>
          </div>

          <aside
            aria-label="Información del consultorio"
            className="surface-panel overflow-hidden"
          >
            <ul className="editorial-list divide-y-0 border-y-0">
              {siteData.clinics.map((clinic) => (
                <li
                  key={clinic.name}
                  className="border-b border-primary/10 px-5 py-6 last:border-b-0 sm:px-6"
                >
                  <div className="flex gap-4">
                    <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                      <MapPin className="size-4 stroke-[1.75]" aria-hidden />
                    </span>
                    <div>
                      <p className="font-display text-lg font-light text-text-primary">
                        {clinic.name}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {clinic.address}
                      </p>
                      {clinic.hours ? (
                        <ul className="mt-3 space-y-1.5">
                          {clinic.hours.map(({ day, time }) => (
                            <li
                              key={day}
                              className="text-sm tabular-nums text-text-secondary"
                            >
                              <span className="font-medium text-text-primary">
                                {day}
                              </span>
                              {" · "}
                              {time}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </li>
              ))}

              <li className="border-b border-primary/10 px-5 py-6 sm:px-6">
                <div className="flex gap-4">
                  <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/5 text-primary">
                    <Phone className="size-4 stroke-[1.75]" aria-hidden />
                  </span>
                  <div>
                    <p className="font-display text-lg font-light text-text-primary">
                      WhatsApp / teléfono
                    </p>
                    <a
                      href={`tel:${siteData.contact.phoneHref}`}
                      className="mt-1 inline-block text-sm font-medium text-primary transition-colors duration-300 hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {siteData.contact.phone}
                    </a>
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="mt-1 block text-sm text-text-secondary transition-colors duration-300 hover:text-primary"
                    >
                      {siteData.contact.email}
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </Container>
    </section>
  );
}
