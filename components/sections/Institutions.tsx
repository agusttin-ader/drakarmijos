import { BookConsultButton } from "@/components/book-consult-button";
import { Container } from "@/components/ui/container";
import { InstitutionLogo } from "@/components/ui/institution-logo";
import { siteData } from "@/lib/site-data";

export function Institutions() {
  return (
    <div aria-label="Instituciones y actividad" className="bg-background">
      <Container className="py-6 sm:py-10 md:py-12">
        <ul className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-8 md:gap-x-12 lg:gap-x-16">
          {siteData.institutions.map((item, index) => (
            <InstitutionLogo
              key={item.name}
              name={item.name}
              logo={item.logo}
              context="desktop"
              showSeparator={index > 0}
              maxWidthClass="max-w-[7.5rem] sm:max-w-[13rem] md:max-w-[15rem]"
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
