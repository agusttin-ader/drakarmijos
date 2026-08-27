import Link from "next/link";
import { BookConsultButton } from "@/components/book-consult-button";
import { DoctorName } from "@/components/ui/doctor-name";
import { Container } from "@/components/ui/container";
import { SiteImage } from "@/components/ui/site-image";
import { siteData } from "@/lib/site-data";

/** Hero A — atmósfera teal + bokeh aqua (sin rostros stock). */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative scroll-anchor flex min-h-[100svh] items-end overflow-hidden bg-primary-deep"
    >
      <SiteImage
        src="/images/hero/hero-atmosphere.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center scale-[1.02]"
      />

      {/* Legibilidad: sombra izquierda/abajo sin tapar el bokeh */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-primary-deep/78 via-primary-deep/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-primary-deep/70 via-primary-deep/28 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_22%,transparent_0%,rgba(6,28,28,0.28)_100%)]"
      />

      <Container className="relative z-10 w-full pb-16 pt-32 sm:pb-20 sm:pt-36 md:pb-24 lg:pb-28 lg:pt-40 2xl:pb-32 2xl:pt-44 3xl:pb-36 3xl:pt-48">
        <div className="hero-enter max-w-2xl text-white 2xl:max-w-3xl 3xl:max-w-4xl">
          <p className="eyebrow text-brand-aqua/95 2xl:text-xs">
            Rinología · Sueño · Buenos Aires
          </p>

          <DoctorName className="mt-5 text-[clamp(3rem,8.5vw,6rem)] leading-[1.02] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] 2xl:text-[clamp(3.75rem,6.5vw,6.75rem)] 3xl:text-[7rem] 4xl:text-[7.75rem]">
            {siteData.doctor.name}
          </DoctorName>

          <h1
            id="hero-heading"
            className="mt-5 max-w-xl font-display text-[clamp(1.65rem,3.5vw,2.35rem)] font-light leading-[1.2] tracking-tight text-white 2xl:max-w-2xl 2xl:text-[clamp(2.1rem,2.4vw,3rem)] 3xl:text-[3.25rem]"
          >
            Otorrino en Buenos Aires — ronquidos, apnea del sueño y rinología
          </h1>

          <p className="mt-4 max-w-xl font-display text-[clamp(1.35rem,3vw,1.85rem)] font-light leading-[1.25] tracking-tight text-brand-aqua/95 2xl:max-w-2xl 2xl:text-[clamp(1.65rem,2.2vw,2.25rem)]">
            Respira mejor. Duerme mejor.
          </p>

          <p className="prose-measure mt-5 text-base leading-relaxed text-white/85 sm:text-lg 2xl:text-xl 3xl:text-2xl">
            Otorrinolaringóloga en CEMIC y Hospital Británico. Consulta por oído,
            nariz y garganta, ronquidos, apnea, sinusitis y cirugía nasal. Un plan
            claro desde la primera visita — adultos y niños.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12 2xl:mt-14">
            <BookConsultButton
              variant="primary"
              className="bg-brand-aqua text-primary shadow-elevated before:bg-primary/40 hover:bg-brand-aqua/90 hover:shadow-elevated 2xl:px-8 2xl:py-3.5 2xl:text-base"
            >
              {siteData.cta.book}
            </BookConsultButton>
            <Link
              href="#specialties"
              className="rounded-md text-sm font-medium text-white/90 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-transparent 2xl:text-base"
            >
              Ver especialidades
            </Link>
          </div>

          <p className="mt-10 text-xs font-medium uppercase tracking-[0.16em] text-white/55 2xl:mt-12 2xl:text-sm">
            {siteData.doctor.title} · {siteData.doctor.license}
          </p>
        </div>
      </Container>
    </section>
  );
}
