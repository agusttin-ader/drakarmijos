"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookConsultButton } from "@/components/book-consult-button";
import { Container } from "@/components/ui/container";
import { PhotoFrame } from "@/components/ui/photo-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import { SiteImage } from "@/components/ui/site-image";
import {
  fadeUpVariants,
  motionTransition,
  staggerDelay,
  viewportOnce,
} from "@/lib/motion";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const steps = [
  {
    index: "01",
    title: "Escucha",
    description:
      "Cuéntame qué te pasa al respirar o al dormir: ronquidos, fatiga, obstrucción, otitis o lo que notaste en tus hijos. Empezamos por tu historia, no por un protocolo genérico.",
  },
  {
    index: "02",
    title: "Evaluación",
    description:
      "Examen ORL completo. Si hace falta, endoscopia en el momento para ver nariz y vías aéreas con claridad — y explicarte qué estoy viendo.",
  },
  {
    index: "03",
    title: "Estudios",
    description:
      "Solo lo necesario: polisomnografía, audiometría o monitoreo del sueño. Te digo para qué sirve cada pedido antes de hacerlo.",
  },
  {
    index: "04",
    title: "Plan",
    description:
      "Tratamiento médico, CPAP, cirugía o controles. Opciones, tiempos y límites por escrito en lenguaje claro, para que sepas qué esperar.",
  },
] as const;

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay + 0.04 },
  },
} as const;

const itemVariants = {
  hidden: fadeUpVariants.hidden,
  visible: {
    ...fadeUpVariants.visible,
    transition: motionTransition,
  },
} as const;

export function ConsultationPath() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="consulta"
      aria-labelledby="consulta-heading"
      className="scroll-anchor section-divider section-y"
    >
      <Container>
        <div className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 xl:gap-16 2xl:gap-20">
          <div className="min-w-0">
            <SectionHeading
              id="consulta-heading"
              eyebrow="La consulta"
              title="Cómo es el camino."
              subheading="Desde la primera visita hasta el plan: sin menú genérico y con tiempo para entender cada paso."
              className="mb-10 lg:mb-12"
            />

            <motion.ol
              variants={shouldReduceMotion ? undefined : listVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={viewportOnce}
              className="editorial-list overflow-hidden rounded-brand bg-background/60 shadow-card"
            >
              {steps.map(({ index, title, description }) => (
                <motion.li
                  key={title}
                  variants={shouldReduceMotion ? undefined : itemVariants}
                  className="relative grid list-none gap-3 px-4 py-7 transition-colors duration-300 hover:bg-background-alt/70 sm:grid-cols-[auto_1fr] sm:gap-6 sm:px-6 sm:py-8"
                >
                  <p aria-hidden className="index-number sm:pt-0.5">
                    {index}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-light tracking-tight text-text-primary sm:text-[1.35rem]">
                      {title}
                    </h3>
                    <p className="prose-measure mt-2 text-base leading-relaxed text-text-secondary">
                      {description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            <div className="mt-10">
              <BookConsultButton variant="primary">{siteData.cta.book}</BookConsultButton>
            </div>
          </div>

          <PhotoFrame
            caption="Consulta personalizada · plan claro"
            className={cn(
              "mx-auto w-full min-w-0 max-w-md lg:mx-0 lg:max-w-full lg:sticky lg:top-28",
            )}
          >
            <div className="relative aspect-[3/4] w-full">
              <SiteImage
                src="/images/fotos-qx/consulta-bata.jpeg"
                alt="La Dra. Armijos en consultorio, con bata blanca y especialización en rinología y trastornos del sueño"
                fill
                sizes="(max-width: 1023px) min(92vw, 28rem), min(40vw, 520px)"
                className="object-cover object-center"
              />
            </div>
          </PhotoFrame>
        </div>
      </Container>
    </section>
  );
}
