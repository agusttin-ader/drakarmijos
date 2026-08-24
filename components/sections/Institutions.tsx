import { Container } from "@/components/ui/container";
import { siteData } from "@/lib/site-data";

export function Institutions() {
  return (
    <section
      aria-label="Instituciones y actividad"
      className="border-b border-primary/8 bg-background-alt/80"
    >
      <Container className="py-8 md:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-12">
          <p className="shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-text-secondary">
            Instituciones
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:gap-x-8">
            {siteData.institutions.map((name) => (
              <li
                key={name}
                className="list-none text-sm font-medium text-text-primary/80 sm:text-[0.9375rem]"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
