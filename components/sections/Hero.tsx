import Link from "next/link";
import { BookConsultButton } from "@/components/book-consult-button";
import { DoctorName } from "@/components/ui/doctor-name";
import { BrandWatermark } from "@/components/ui/brand-watermark";
import { Container } from "@/components/ui/container";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { SiteImage } from "@/components/ui/site-image";
import { SitePhoto } from "@/components/ui/site-photo";
import { siteData } from "@/lib/site-data";

const HERO_IMAGE = "/images/fotos-qx/hero.jpg";

/** Hero editorial en desktop; foto de fondo en mobile. */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative scroll-anchor min-h-[100svh] overflow-hidden bg-primary-deep"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
      >
        <BrandWatermark className="bottom-auto left-[-6%] top-1/2 -translate-y-1/2 opacity-[0.22] blur-[72px] saturate-150" />
      </div>

      <div aria-hidden className="absolute inset-0 lg:hidden">
        <SiteImage
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_28%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-deep/92 via-primary-deep/55 to-primary-deep/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-deep/70 via-primary-deep/20 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-primary-deep/85 via-primary-deep/45 to-transparent sm:h-40" />
      </div>

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-end pb-16 pt-32 sm:pb-20 sm:pt-36 md:pb-24 lg:justify-center lg:pb-28 lg:pt-32 xl:pb-32 xl:pt-36 2xl:pb-36 2xl:pt-44 3xl:pb-40 3xl:pt-48">
        <div className="grid min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.82fr)] lg:gap-14 xl:gap-20 2xl:gap-24">
          <div className="min-w-0">
            <div className="hero-enter max-w-2xl text-white max-lg:shadow-on-photo lg:shadow-none 2xl:max-w-3xl 3xl:max-w-4xl">
              <p className="eyebrow inline-block max-lg:rounded-full max-lg:bg-primary-deep/85 max-lg:px-3.5 max-lg:py-1.5 max-lg:!text-white max-lg:backdrop-blur-sm lg:text-brand-aqua/95 2xl:text-xs">
                Rinología · Sueño · Buenos Aires
              </p>

              <DoctorName className="mt-5 text-[clamp(3rem,8.5vw,6rem)] leading-[1.02] text-white 2xl:text-[clamp(3.75rem,6.5vw,6.75rem)] 3xl:text-[7rem] 4xl:text-[7.75rem]">
                {siteData.doctor.name}
              </DoctorName>

              <h1
                id="hero-heading"
                className="mt-5 max-w-xl font-display text-[clamp(1.65rem,3.5vw,2.35rem)] font-light leading-[1.2] tracking-tight text-white 2xl:max-w-2xl 2xl:text-[clamp(2.1rem,2.4vw,3rem)] 3xl:text-[3.25rem]"
              >
                Otorrino en Buenos Aires — ronquidos, apnea del sueño y rinología
              </h1>

              <p className="mt-4 max-w-xl font-display text-[clamp(1.35rem,3vw,1.85rem)] font-light leading-[1.25] tracking-tight text-white lg:text-brand-aqua/95 2xl:max-w-2xl 2xl:text-[clamp(1.65rem,2.2vw,2.25rem)]">
                Respira mejor. Duerme mejor.
              </p>

              <p className="prose-measure mt-5 text-base leading-relaxed text-white/85 sm:text-lg 2xl:text-xl 3xl:text-2xl">
                Otorrinolaringóloga en CEMIC y Hospital Británico. Consulta por
                oído, nariz y garganta, ronquidos, apnea, sinusitis y cirugía
                nasal. Un plan claro desde la primera visita — adultos y niños.
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
          </div>

          <div className="hidden w-full min-w-0 lg:block lg:max-w-md xl:max-w-lg">
            <PhotoFrame
              caption="Rinología · quirófano"
              className="shadow-elevated ring-white/10"
            >
              <SitePhoto
                src={HERO_IMAGE}
                alt={`${siteData.doctor.name} en quirófano`}
                priority
                sizes="min(36vw, 28rem)"
                objectPosition="object-center"
                className="w-full rounded-none shadow-none ring-0"
              />
            </PhotoFrame>
          </div>
        </div>
      </Container>
    </section>
  );
}
