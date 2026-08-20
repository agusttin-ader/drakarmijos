"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { gsap } from "@/lib/gsap";
import { gsapDuration, gsapEase } from "@/lib/motion";
import { siteData } from "@/lib/site-data";

const credentials = [
  siteData.doctor.specialty,
  "CEMIC · Hospital Británico",
  siteData.doctor.audience,
] as const;

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
      className="scroll-anchor border-t border-primary/8 bg-background-alt/40 section-y"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 xl:gap-28">
          <div
            ref={imageRef}
            className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none md:will-change-transform"
          >
            <div className="overflow-hidden rounded-[0.625rem_1.75rem_0.625rem_1.75rem]">
              <ImagePlaceholder
                aspectRatio="portrait"
                label="Retrato en consultorio — reemplazar con foto de la Dra. Armijos"
                className="min-h-[360px] w-full rounded-none sm:min-h-[440px] lg:min-h-[480px]"
              />
            </div>
          </div>

          <div ref={contentRef} className="md:will-change-transform">
            <h2
              id="about-heading"
              className="font-display text-[clamp(1.875rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-text-primary"
            >
              Sobre mí
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
              {siteData.doctor.title} · rinología y trastornos respiratorios del
              sueño
            </p>

            <div className="mt-8 space-y-5 border-l border-primary/12 pl-6 text-base leading-relaxed text-text-secondary sm:pl-8 sm:text-[1.0625rem] sm:leading-8">
              <p>
                Diagnostico y trato patologías de oído, nariz y garganta, con
                foco en obstrucción nasal, ronquidos y apnea obstructiva del
                sueño. Atiendo adultos y niños en{" "}
                {siteData.clinics.map((c) => c.name).join(" y ")}.
              </p>
              <p>
                En consulta priorizo explicar cada estudio — endoscopia,
                polisomnografía, audiometría — antes de proponer cirugía o CPAP.
                Muchas personas llegan agotadas sin saber que la respiración
                nasal o una apnea leve pueden estar en el origen.
              </p>
              <p className="font-display text-lg text-text-primary">
                {siteData.tagline.charAt(0).toUpperCase()}
                {siteData.tagline.slice(1)}.
              </p>
            </div>

            <ul
              className="mt-8 flex flex-col gap-3 sm:mt-10"
              aria-label="Credenciales"
            >
              {credentials.map((credential) => (
                <li key={credential} className="list-none">
                  <Badge variant="credential">{credential}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
