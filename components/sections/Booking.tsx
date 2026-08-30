import { Phone } from "lucide-react";
import { BookConsultButton } from "@/components/book-consult-button";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { InstitutionLogoImage } from "@/components/ui/institution-logo-image";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { institutionLogoClass } from "@/lib/institution-logos";
import { siteCopy, siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Booking() {
  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="scroll-anchor section-divider bg-background-alt/70 brand-pattern section-y"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-stretch lg:gap-16 xl:gap-20">
          <div className="surface-panel flex flex-col border-l-4 border-l-brand-aqua p-6 sm:p-8 lg:p-10">
            <div className="min-w-0">
              <p className="eyebrow">Contacto</p>
              <h2
                id="booking-heading"
                className="mt-3 font-display text-[clamp(1.875rem,4vw,2.5rem)] font-light leading-[1.12] tracking-tight text-text-primary xl:text-[2.35rem]"
              >
                Agendá tu consulta en Buenos Aires
              </h2>
              <p className="mt-3 text-sm font-medium tracking-[0.12em] text-primary uppercase">
                {siteCopy.clinicsFullLabels}
              </p>
              <p className="prose-measure mt-5 text-base leading-relaxed text-text-secondary">
                {siteCopy.bookingIntro} {siteData.contact.responseTime}.
              </p>
            </div>

            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:pt-10">
              <BookConsultButton
                variant="primary"
                className="w-full sm:w-auto sm:min-w-[11.5rem]"
              >
                {siteData.cta.book}
              </BookConsultButton>
              <Button
                href={siteData.contact.whatsappUrl}
                variant="outline"
                className="w-full gap-2.5 sm:w-auto sm:min-w-[11.5rem]"
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
            className="surface-panel flex flex-col overflow-hidden"
          >
            <ul className="editorial-list flex-1 divide-y divide-primary/10 border-y-0">
              {siteData.clinics.map((clinic) => (
                <li
                  key={clinic.name}
                  className="px-5 py-5 sm:px-6 sm:py-6"
                >
                  <InstitutionLogoImage
                    src={clinic.logo}
                    alt={clinic.name}
                    width={180}
                    height={56}
                    originClass="origin-left"
                    className={cn(
                      "w-auto object-left",
                      institutionLogoClass(clinic.name, "clinic", "h-9"),
                      clinic.name === "COMS" && "rounded-brand",
                    )}
                  />
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
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
                  {"website" in clinic && clinic.website ? (
                    <a
                      href={clinic.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-sm font-medium text-primary underline-offset-4 transition-colors duration-300 hover:underline"
                    >
                      Turno online en otorrinosdelsueno.com
                    </a>
                  ) : null}
                </li>
              ))}

              <li className="mt-auto border-t border-primary/10 px-5 py-5 sm:px-6 sm:py-6">
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
