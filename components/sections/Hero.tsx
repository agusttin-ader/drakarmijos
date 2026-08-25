import Link from "next/link";
import { BookConsultButton } from "@/components/book-consult-button";
import { DoctorName } from "@/components/ui/doctor-name";
import { Container } from "@/components/ui/container";
import { SiteImage } from "@/components/ui/site-image";
import { siteData } from "@/lib/site-data";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative scroll-anchor flex min-h-[100svh] items-end overflow-hidden bg-black"
    >
      <SiteImage
        src="/images/fotos-qx/quirofano-sala.jpg"
        alt="Dra. Karla Armijos en quirófano durante un procedimiento otorrinolaringológico"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[42%_center] scale-[1.02]"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/28 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/18 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,transparent_0%,rgba(0,0,0,0.14)_100%)]"
      />

      <Container className="relative z-10 w-full pb-16 pt-32 sm:pb-20 sm:pt-36 md:pb-24 lg:pb-28 lg:pt-40 2xl:pb-32 2xl:pt-44 3xl:pb-36 3xl:pt-48">
        <div className="hero-enter max-w-2xl text-white 2xl:max-w-3xl 3xl:max-w-4xl">
          <p className="eyebrow text-white drop-shadow-[0_1px_10px_rgba(0,0,0,0.55)] 2xl:text-xs">
            Rinología · Sueño · Buenos Aires
          </p>

          <DoctorName className="mt-5 text-[clamp(2.5rem,7vw,5rem)] leading-[1.05] text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.45)] 2xl:text-[clamp(3.25rem,5.5vw,5.75rem)] 3xl:text-[6rem] 4xl:text-[6.75rem]">
            {siteData.doctor.name}
          </DoctorName>

          <h1
            id="hero-heading"
            className="mt-5 max-w-xl font-display text-[clamp(1.65rem,3.5vw,2.35rem)] font-light leading-[1.2] tracking-tight text-white 2xl:max-w-2xl 2xl:text-[clamp(2.1rem,2.4vw,3rem)] 3xl:text-[3.25rem]"
          >
            Respira mejor. Duerme mejor.
          </h1>

          <p className="prose-measure mt-5 text-base leading-relaxed text-white/85 sm:text-lg 2xl:text-xl 3xl:text-2xl">
            Oído, nariz y garganta. Ronquidos y apnea del sueño. Un plan claro
            desde la primera consulta.
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

          <p className="mt-10 text-xs font-medium uppercase tracking-[0.16em] text-white/60 2xl:mt-12 2xl:text-sm">
            {siteData.doctor.title} · {siteData.doctor.license}
          </p>
        </div>
      </Container>
    </section>
  );
}
