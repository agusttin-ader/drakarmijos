import { Container } from "@/components/ui/container";
import { siteData } from "@/lib/site-data";

export function Institutions() {
  return (
    <section
      aria-label="Instituciones y actividad"
      className="section-divider border-b border-primary/8 bg-background-alt/80"
    >
      <Container className="py-8 md:py-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-12">
          <p className="eyebrow shrink-0 tracking-[0.2em]">Instituciones</p>
          <ul className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-5">
            {siteData.institutions.map((name, index) => (
              <li
                key={name}
                className="flex list-none items-center gap-x-3 sm:gap-x-5"
              >
                {index > 0 ? (
                  <span
                    aria-hidden
                    className="size-1 shrink-0 rounded-full bg-brand-aqua/70"
                  />
                ) : null}
                <span className="text-sm font-medium text-text-primary sm:text-[0.9375rem]">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
