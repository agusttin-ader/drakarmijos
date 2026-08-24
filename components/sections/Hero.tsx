import Image from "next/image";
import Link from "next/link";
import { BookConsultButton } from "@/components/book-consult-button";
import { Container } from "@/components/ui/container";
import { siteData } from "@/lib/site-data";

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative scroll-anchor flex min-h-[100svh] items-end overflow-hidden"
    >
      <Image
        src="/images/fotos-qx/quirofano-sala.jpg"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-[42%_center]"
      />

      {/* Plano de legibilidad: parte del tratamiento fotográfico, no un overlay decorativo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-[#0a2e2e]/88 via-[#0a2e2e]/45 to-[#0a2e2e]/20"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#0a2e2e]/70 via-[#0a2e2e]/25 to-transparent"
      />

      <Container className="relative z-10 w-full pb-16 pt-32 sm:pb-20 sm:pt-36 md:pb-24 lg:pb-28 lg:pt-40 2xl:pb-32 2xl:pt-44 3xl:pb-36 3xl:pt-48">
        <div className="hero-enter max-w-2xl text-white 2xl:max-w-3xl 3xl:max-w-4xl">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-brand-aqua/95 2xl:text-xs">
            Rinología · Sueño · Buenos Aires
          </p>

          <p className="mt-5 font-script text-[clamp(2.75rem,8vw,5.5rem)] leading-[1.05] text-white 2xl:text-[clamp(4rem,6vw,7rem)] 3xl:text-[7.5rem] 4xl:text-[8.5rem]">
            {siteData.doctor.name}
          </p>

          <h1
            id="hero-heading"
            className="mt-5 max-w-xl font-display text-[clamp(1.65rem,3.5vw,2.35rem)] font-light leading-[1.2] tracking-tight text-white 2xl:max-w-2xl 2xl:text-[clamp(2.1rem,2.4vw,3rem)] 3xl:text-[3.25rem]"
          >
            Respirá mejor. Dormí mejor.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-white/80 sm:text-lg 2xl:max-w-lg 2xl:text-xl 3xl:text-2xl">
            Oído, nariz y garganta. Ronquidos y apnea del sueño. Un plan claro
            desde la primera consulta.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 sm:mt-12 2xl:mt-14">
            <BookConsultButton
              variant="primary"
              className="bg-brand-aqua text-primary before:bg-primary/40 hover:bg-brand-aqua/90 2xl:px-8 2xl:py-3.5 2xl:text-base"
            >
              Pedir turno
            </BookConsultButton>
            <Link
              href="#specialties"
              className="rounded-md text-sm font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-transparent 2xl:text-base"
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
