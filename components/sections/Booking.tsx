"use client";

import { MapPin, Phone } from "lucide-react";
import { BookConsultButton } from "@/components/book-consult-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HighlightBadge } from "@/components/ui/highlight-badge";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { siteData } from "@/lib/site-data";

const clinicInfo = {
  phone: siteData.contact.phone,
  whatsappUrl: siteData.contact.whatsappUrl,
};

export function Booking() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="scroll-anchor border-t border-primary/8 bg-background-alt/60 section-y"
    >
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20 xl:gap-28">
          <div>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-text-secondary">
              Turnos
            </p>
            <h2
              id="booking-heading"
              className="mt-3 font-display text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-text-primary"
            >
              Coordiná tu consulta
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
              Miércoles y jueves en CEMIC (Las Heras 2900). También atención en
              Hospital Británico. Escribime por WhatsApp o abrí el formulario.
            </p>

            <div className="mt-10 border-l-2 border-accent-gold/60 pl-6 sm:pl-8">
              <HighlightBadge variant="turnos" size="sm" className="mb-5" />
              <p className="text-sm leading-relaxed text-text-secondary">
                Indicá si consultás por ronquidos, apnea, obstrucción nasal,
                rinoplastia o pediatría ORL. Te respondo con el turno más
                cercano disponible.
              </p>
              <BookConsultButton variant="primary" className="mt-8">
                Abrir formulario de reserva
              </BookConsultButton>
            </div>
          </div>

          <aside aria-label="Información del consultorio">
            <h3 className="font-display text-xl tracking-tight text-text-primary sm:text-2xl">
              Consultorios
            </h3>

            <ul className="mt-8 divide-y divide-primary/10">
              {siteData.clinics.map((clinic) => (
                <li key={clinic.name} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex gap-4">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 stroke-[1.5] text-text-secondary"
                      aria-hidden
                    />
                    <div>
                      <p className="font-medium text-text-primary">{clinic.name}</p>
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
                    className="mt-0.5 size-4 shrink-0 stroke-[1.5] text-text-secondary"
                    aria-hidden
                  />
                  <div>
                    <p className="font-medium text-text-primary">WhatsApp / teléfono</p>
                    <a
                      href={`tel:${clinicInfo.phone.replace(/\s/g, "")}`}
                      className="mt-1 inline-block text-sm text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {clinicInfo.phone}
                    </a>
                  </div>
                </div>
              </li>
            </ul>

            <Button
              href={clinicInfo.whatsappUrl}
              variant="outline"
              className="mt-10 gap-2.5"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribime por WhatsApp"
            >
              <WhatsAppIcon className="size-4" />
              Escribime por WhatsApp
            </Button>
          </aside>
        </div>
      </Container>
    </section>
  );
}
