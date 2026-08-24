"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { HighlightBadge } from "@/components/ui/highlight-badge";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HighlightVariant } from "@/components/ui/highlight-badge";
import {
  fadeUpVariants,
  motionTransition,
  staggerDelay,
  viewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type Specialty = {
  highlight: HighlightVariant;
  index: string;
  title: string;
  focus: string;
  description: string;
};

const specialties: Specialty[] = [
  {
    highlight: "orl",
    index: "01",
    title: "Respirá Mejor",
    focus: "Rinología · oído, nariz y garganta",
    description:
      "Desviación de tabique, sinusitis, alergias, pérdida de olfato o respiración bucal en niños. Evaluación endoscópica y plan médico o quirúrgico según cada caso.",
  },
  {
    highlight: "dormirBien",
    index: "02",
    title: "Dormí Mejor",
    focus: "Ronquidos · apnea · bruxismo nocturno",
    description:
      "Estudio del sueño, CPAP, cirugía de vías aéreas superiores y la relación entre bruxismo, pausas respiratorias y fatiga diurna. Si no respirás bien, no dormís bien.",
  },
  {
    highlight: "orl",
    index: "03",
    title: "Cirugía Nasal",
    focus: "Rinoplastia funcional y estética",
    description:
      "Corrección de obstrucción nasal con criterio estético conservador. Cada nariz responde de forma distinta, así que el plan se define sobre tu anatomía y expectativas.",
  },
];

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay + 0.06 },
  },
} as const;

const rowVariants = {
  hidden: fadeUpVariants.hidden,
  visible: {
    ...fadeUpVariants.visible,
    transition: motionTransition,
  },
} as const;

export function Specialties() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="specialties"
      aria-labelledby="specialties-heading"
      className="scroll-anchor border-t border-primary/8 bg-background-alt/50 section-y"
    >
      <Container>
        <SectionHeading
          id="specialties-heading"
          variant="editorial"
          eyebrow="Especialidades"
          title="Qué veo en consulta."
          subheading="Problemas de respiración nasal, ronquidos, apnea y cirugía nasal. Te explico opciones, tiempos y límites con claridad."
          className="mb-14 lg:mb-20"
        />

        <motion.ol
          variants={shouldReduceMotion ? undefined : listVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
          className="divide-y divide-primary/10 border-y border-primary/10"
        >
          {specialties.map(({ highlight, index, title, focus, description }) => (
            <motion.li
              key={title}
              variants={shouldReduceMotion ? undefined : rowVariants}
              className="list-none"
            >
              <article
                className={cn(
                  "grid gap-6 py-10 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8 sm:py-12 lg:gap-12 lg:py-14",
                )}
              >
                <p
                  aria-hidden
                  className="font-display text-3xl font-light leading-none text-brand-aqua sm:text-4xl"
                >
                  {index}
                </p>

                <div className="min-w-0">
                  <p className="text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-text-secondary">
                    {focus}
                  </p>
                  <h3
                    id={`specialty-${title.replace(/\s+/g, "-").toLowerCase()}`}
                    className="mt-2 font-display text-2xl font-light tracking-tight text-text-primary sm:text-[1.65rem]"
                  >
                    {title}
                  </h3>
                  <p className="mt-3 max-w-prose text-base leading-relaxed text-text-secondary">
                    {description}
                  </p>
                </div>

                <div
                  aria-hidden
                  className="hidden shrink-0 opacity-90 sm:block lg:pt-1"
                >
                  <HighlightBadge variant={highlight} size="sm" />
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
