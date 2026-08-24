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
      className="scroll-anchor border-t border-primary/8 bg-background-alt/70 brand-pattern section-y"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          <div>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-text-secondary">
              Contacto
            </p>
            <h2
              id="booking-heading"
              className="mt-3 font-display text-[clamp(1.875rem,4vw,2.75rem)] font-light leading-[1.1] tracking-tight text-text-primary"
            >
              Turnos en CEMIC y Hospital Británico.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
              Miércoles y jueves en CEMIC (Las Heras 2900). También atención en
              Hospital Británico. WhatsApp o formulario: te respondo por el
              mismo canal.
            </p>

            <div className="mt-10 space-y-4">
              <BookConsultButton variant="primary">
                Pedir turno
              </BookConsultButton>
              <div>
                <Button
                  href={siteData.contact.whatsappUrl}
                  variant="outline"
                  className="gap-2.5"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Escribime por WhatsApp"
                >
                  <WhatsAppIcon className="size-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          <aside aria-label="Información del consultorio">
            <ul className="divide-y divide-primary/10 border-y border-primary/10">
              {siteData.clinics.map((clinic) => (
                <li key={clinic.name} className="py-6">
                  <div className="flex gap-4">
                    <MapPin
                      className="mt-1 size-4 shrink-0 stroke-[1.5] text-brand-aqua"
                      aria-hidden
                    />
                    <div>
                      <p className="font-display text-lg font-light text-text-primary">
                        {clinic.name}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                        {clinic.address}
                      </p>
                      {clinic.hours ? (
                        <ul className="mt-3 space-y-1">
                          {clinic.hours.map(({ day, time }) => (
                            <li
                              key={day}
                              className="text-sm tabular-nums text-text-secondary"
                            >
                              <span className="text-text-primary">{day}</span>
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

              <li className="py-6">
                <div className="flex gap-4">
                  <Phone
                    className="mt-1 size-4 shrink-0 stroke-[1.5] text-brand-aqua"
                    aria-hidden
                  />
                  <div>
                    <p className="font-display text-lg font-light text-text-primary">
                      WhatsApp / teléfono
                    </p>
                    <a
                      href={`tel:${siteData.contact.phoneHref}`}
                      className="mt-1 inline-block text-sm text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {siteData.contact.phone}
                    </a>
                    <a
                      href={`mailto:${siteData.contact.email}`}
                      className="mt-1 block text-sm text-text-secondary transition-colors hover:text-primary"
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
