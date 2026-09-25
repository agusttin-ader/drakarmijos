"use client";

import { BookConsultButton } from "@/components/book-consult-button";
import { Reveal, RevealItem, RevealStagger } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { InstitutionLogo } from "@/components/ui/institution-logo";
import { siteData } from "@/lib/site-data";

/** Puente de confianza bajo el hero — logos en color sobre crema. */
export function Institutions() {
  return (
    <div
      aria-label="Instituciones y actividad"
      className="border-y border-brand-aqua/25 bg-brand-mint-wash"
    >
      <Container className="py-5 sm:py-6 md:py-7">
        <Reveal from="up" className="mb-7 sm:mb-9">
          <div className="flex items-center justify-center gap-3">
            <span aria-hidden className="h-px w-8 bg-primary/20 sm:w-10" />
            <p className="eyebrow text-primary">Atención en</p>
            <span aria-hidden className="h-px w-8 bg-primary/20 sm:w-10" />
          </div>
        </Reveal>
        <RevealStagger>
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-5 sm:gap-x-10 md:gap-x-12 lg:gap-x-14">
            {siteData.institutions.map((item, index) => (
              <RevealItem
                key={item.name}
                index={index}
                className="flex list-none items-center gap-x-4 sm:gap-x-8 lg:gap-x-10"
              >
                <InstitutionLogo
                  name={item.name}
                  logo={item.logo}
                  context="desktop"
                  showSeparator={index > 0}
                  maxWidthClass="max-w-[7rem] sm:max-w-[11rem] md:max-w-[13rem]"
                  asListItem={false}
                />
              </RevealItem>
            ))}
          </ul>
        </RevealStagger>
      </Container>

      <div className="border-t border-primary/8 px-4 py-4 md:hidden">
        <Container className="px-0">
          <BookConsultButton variant="primary" className="w-full">
            {siteData.cta.book}
          </BookConsultButton>
        </Container>
      </div>
    </div>
  );
}
