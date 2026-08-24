"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { BookConsultButton } from "@/components/book-consult-button";
import { Container } from "@/components/ui/container";
import { brandSurfaceGradient } from "@/components/ui/image-placeholder";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  fadeUpVariants,
  motionTransition,
  staggerDelay,
  viewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    index: "01",
    title: "Escucha",
    description:
      "Contame qué te pasa al respirar o al dormir: ronquidos, fatiga, obstrucción, otitis o lo que notaste en tus hijos. Arrancamos por tu historia, no por un protocolo genérico.",
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
      className="scroll-anchor border-t border-primary/8 section-y"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16 xl:gap-24">
          <div>
            <SectionHeading
              id="consulta-heading"
              variant="editorial"
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
              className="divide-y divide-primary/10 border-y border-primary/10"
            >
              {steps.map(({ index, title, description }) => (
                <motion.li
                  key={title}
                  variants={shouldReduceMotion ? undefined : itemVariants}
                  className="grid list-none gap-3 py-7 sm:grid-cols-[auto_1fr] sm:gap-6 sm:py-8"
                >
                  <p
                    aria-hidden
                    className="font-display text-2xl font-light leading-none text-brand-aqua sm:pt-0.5"
                  >
                    {index}
                  </p>
                  <div>
                    <h3 className="font-display text-xl font-light tracking-tight text-text-primary sm:text-[1.35rem]">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-prose text-base leading-relaxed text-text-secondary">
                      {description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            <div className="mt-10">
              <BookConsultButton variant="primary">Pedir turno</BookConsultButton>
            </div>
          </div>

          <figure
            className={cn(
              "relative mx-auto w-full max-w-md overflow-hidden rounded-[0.5rem_1.75rem_0.5rem_1.75rem] ring-1 ring-primary/10 lg:mx-0 lg:max-w-none lg:sticky lg:top-28",
              brandSurfaceGradient,
            )}
          >
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/fotos-qx/quirofano-procedimiento.jpg"
                alt="La Dra. Armijos durante una evaluación endoscópica en quirófano"
                fill
                quality={90}
                sizes="(max-width: 1023px) min(90vw, 28rem), 520px"
                className="object-cover object-[42%_center]"
              />
            </div>
            <figcaption className="border-t border-primary/8 bg-background/90 px-5 py-4 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-text-secondary backdrop-blur-sm sm:px-6">
              Evaluación endoscópica · plan a medida
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
