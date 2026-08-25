import { BookConsultButton } from "@/components/book-consult-button";
import { Container } from "@/components/ui/container";
import { InstitutionLogo } from "@/components/ui/institution-logo";
import { siteData } from "@/lib/site-data";
import { InstitutionsMobileMarquee } from "@/components/sections/institutions-mobile-marquee";

export function Institutions() {
  return (
    <div aria-label="Instituciones y actividad" className="bg-background">
      <Container className="py-6 sm:py-10 md:py-12">
        <InstitutionsMobileMarquee />

        <ul className="hidden items-center justify-center gap-x-8 md:flex lg:gap-x-12 xl:gap-x-16">
          {siteData.institutions.map((item, index) => (
            <InstitutionLogo
              key={item.name}
              name={item.name}
              logo={item.logo}
              context="desktop"
              showSeparator={index > 0}
            />
          ))}
        </ul>
      </Container>

      <div className="border-b border-primary/8 px-4 pb-6 md:hidden">
        <Container className="px-0">
          <BookConsultButton variant="primary" className="w-full">
            {siteData.cta.book}
          </BookConsultButton>
        </Container>
      </div>
    </div>
  );
}
