"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { BookConsultButton } from "@/components/book-consult-button";
import { DoctorName } from "@/components/ui/doctor-name";
import { Container } from "@/components/ui/container";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { SitePhoto } from "@/components/ui/site-photo";
import { gsap } from "@/lib/gsap";
import { gsapDuration, gsapEase } from "@/lib/motion";
import { siteData } from "@/lib/site-data";

const MOBILE_QUERY = "(max-width: 767px)";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (
      shouldReduceMotion ||
      !sectionRef.current ||
      !imageRef.current ||
      !contentRef.current
    ) {
      return;
    }

    const mobileQuery = window.matchMedia(MOBILE_QUERY);
    if (mobileQuery.matches) {
      return;
    }

    gsap.set([imageRef.current, contentRef.current], {
      opacity: 0,
      force3D: true,
    });
    gsap.set(imageRef.current, { x: -40, force3D: true });
    gsap.set(contentRef.current, { x: 40, force3D: true });

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
            invalidateOnRefresh: true,
          },
        })
        .to(
          imageRef.current,
          {
            x: 0,
            opacity: 1,
            duration: gsapDuration,
            ease: gsapEase,
            force3D: true,
          },
          0,
        )
        .to(
          contentRef.current,
          {
            x: 0,
            opacity: 1,
            duration: gsapDuration,
            ease: gsapEase,
            force3D: true,
          },
          0.08,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="scroll-anchor brand-pattern section-y"
    >
      <Container>
        <div className="grid min-w-0 items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
          <div
            ref={imageRef}
            className="relative mx-auto w-full min-w-0 max-w-md lg:mx-0 lg:max-w-none md:will-change-transform"
          >
            <PhotoFrame className="shadow-card">
              <SitePhoto
                src="/images/fotos-qx/quirofano-endoscopia.jpg"
                alt={`${siteData.doctor.name} en quirófano durante un procedimiento endoscópico`}
                sizes="(max-width: 1023px) min(90vw, 28rem), 520px"
                objectPosition="object-[center_20%]"
                className="w-full rounded-none shadow-none ring-0"
              />
            </PhotoFrame>
            <div className="mt-6 sm:mt-8">
              <div
                aria-hidden
                className="mb-4 h-px w-16 bg-brand-aqua/80 sm:w-20"
              />
              <DoctorName className="text-[clamp(2.125rem,4.75vw,3rem)] leading-[1.08] text-text-primary">
                {siteData.doctor.name}
              </DoctorName>
              <p className="mt-3 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-text-secondary">
                {siteData.doctor.title} · {siteData.doctor.license}
              </p>
            </div>
          </div>

          <div ref={contentRef} className="md:will-change-transform">
            <p className="eyebrow">Sobre mí</p>
            <h2
              id="about-heading"
              className="mt-3 font-display text-[clamp(1.875rem,4vw,2.85rem)] font-light leading-[1.12] text-text-primary 2xl:text-[clamp(2.5rem,2.4vw,3.5rem)] 3xl:text-[3.75rem]"
            >
              Otorrinolaringóloga. Especialista en rinología y sueño.
            </h2>

            <blockquote className="mt-8 rounded-brand border border-primary/10 bg-background-alt/60 py-5 pl-5 pr-6 shadow-card sm:pl-6 sm:pr-8">
              <p className="prose-measure font-display text-lg font-light leading-relaxed text-text-primary sm:text-xl sm:leading-8">
                “{siteData.doctor.quote}”
              </p>
            </blockquote>

            <div className="prose-measure mt-8 space-y-5 text-base leading-relaxed text-text-secondary sm:text-[1.0625rem] sm:leading-8">
              <p>
                Diagnostico y trato patologías de oído, nariz y garganta, con
                foco en obstrucción nasal, alergias, ronquidos y apnea
                obstructiva del sueño. Atiendo adultos y niños en{" "}
                {siteData.clinics.map((c) => c.name).join(" y ")}.
              </p>
              <p>
                En consulta priorizo explicar cada estudio — endoscopia,
                polisomnografía, audiometría o el uso de wearables — antes de
                proponer cirugía o CPAP. Muchas personas llegan agotadas sin
                saber que la respiración nasal o una apnea leve pueden estar en
                el origen.
              </p>
              <p>
                Participo como disertante en congresos de rinología y ORL,
                entre ellos el Congreso Panamericano, Rino Argentina (FASO) y
                el congreso de la Federación Argentina de Sociedades de ORL.
              </p>
            </div>

            <dl className="mt-10 grid gap-4 border-t border-primary/10 pt-8 sm:grid-cols-3 sm:gap-4">
              {siteData.stats.map(({ label, value }) => (
                <div
                  key={label}
                  className="rounded-brand border border-primary/8 bg-background/80 px-4 py-4 shadow-card sm:px-5"
                >
                  <dt className="text-[0.625rem] font-medium uppercase tracking-[0.18em] text-text-secondary">
                    {label}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-light text-text-primary sm:text-xl">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <BookConsultButton variant="primary">{siteData.cta.book}</BookConsultButton>
              <a
                href="#specialties"
                className="text-sm font-medium text-primary underline-offset-4 transition-colors duration-300 hover:underline"
              >
                Ver especialidades →
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
