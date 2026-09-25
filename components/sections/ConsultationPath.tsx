"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { BookConsultButton } from "@/components/book-consult-button";
import { siteData } from "@/lib/site-data";
import {
  getAlternatingRevealVariants,
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

const itemVariants = (index: number) =>
  ({
    hidden: getAlternatingRevealVariants(index).hidden,
    visible: {
      ...getAlternatingRevealVariants(index).visible,
      transition: motionTransition,
    },
  }) as const;

export function ConsultationPath() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="consulta"
      aria-labelledby="consulta-heading"
      className="scroll-anchor section-divider section-y-tight bg-background-alt/40"
    >
      <Container>
        <Reveal from="left">
        <header className="border-b border-primary/10 pb-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:pb-7 xl:gap-14">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="accent-rule w-8 sm:w-10"
              />
              <p className="eyebrow text-primary">La consulta</p>
            </div>
            <h2
              id="consulta-heading"
              className="mt-3 font-display text-[clamp(1.625rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-tight text-text-primary 2xl:text-[clamp(2rem,2.2vw,2.85rem)]"
            >
              Cómo es el camino.
            </h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.65] text-text-secondary sm:text-base">
              Desde la primera visita hasta el plan: sin menú genérico y con tiempo
              para entender cada paso.
            </p>
          </div>
          <div className="mt-6 lg:col-span-5 lg:mt-0 lg:flex lg:items-end lg:justify-end xl:col-span-4">
            <p className="max-w-sm text-[0.8125rem] leading-relaxed text-text-secondary lg:text-right">
              Cuatro momentos: escucha, examen, estudios con criterio y plan por
              escrito.
            </p>
          </div>
        </header>
        </Reveal>

        <motion.ol
            variants={shouldReduceMotion ? undefined : listVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "visible"}
            viewport={viewportOnce}
            className={cn(
              "editorial-list mt-0 min-w-0",
              "lg:grid lg:grid-cols-2 lg:gap-x-10 xl:gap-x-14",
            )}
          >
            {steps.map(({ index, title, description }, stepIndex) => (
              <motion.li
                key={title}
                variants={shouldReduceMotion ? undefined : itemVariants(stepIndex)}
                className="grid list-none gap-3 py-6 sm:grid-cols-[2.75rem_1fr] sm:gap-5 sm:py-7 lg:py-8"
              >
                <p
                  aria-hidden
                  className="font-display text-xl font-light tabular-nums leading-none text-brand-aqua sm:pt-0.5 sm:text-2xl"
                >
                  {index}
                </p>
                <div>
                  <h3 className="font-display text-[clamp(1.125rem,2.2vw,1.35rem)] font-light tracking-tight text-text-primary">
                    {title}
                  </h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.65] text-text-secondary sm:text-[0.975rem]">
                    {description}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ol>

        <Reveal from="right">
        <div className="mt-8 flex flex-col gap-4 border-t border-primary/10 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
          <BookConsultButton variant="primary">{siteData.cta.book}</BookConsultButton>
          <Link
            href="/#booking"
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Sedes y horarios →
          </Link>
        </div>
        </Reveal>
      </Container>
    </section>
  );
}
