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
    title: "Respira Mejor",
    focus: "Rinología · oído, nariz y garganta",
    description:
      "Desviación de tabique, sinusitis, alergias, pérdida de olfato o respiración bucal en niños. Evaluación endoscópica y plan médico o quirúrgico según cada caso.",
  },
  {
    highlight: "dormirBien",
    index: "02",
    title: "Duerme Mejor",
    focus: "Ronquidos · apnea · bruxismo nocturno",
    description:
      "Estudio del sueño, CPAP, cirugía de vías aéreas superiores y la relación entre bruxismo, pausas respiratorias y fatiga diurna. Si no respiras bien, no duermes bien.",
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
      className="scroll-anchor section-divider bg-background-alt/50 section-y"
    >
      <Container>
        <SectionHeading
          id="specialties-heading"
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
          className="editorial-list overflow-hidden rounded-brand bg-background/70 shadow-card"
        >
          {specialties.map(({ highlight, index, title, focus, description }) => (
            <motion.li
              key={title}
              variants={shouldReduceMotion ? undefined : rowVariants}
              className="list-none"
            >
              <article
                className={cn(
                  "grid gap-5 px-4 py-9 transition-colors duration-300 sm:grid-cols-[auto_1fr_auto] sm:items-start sm:gap-8 sm:px-6 sm:py-11 lg:gap-12 lg:px-8 lg:py-12",
                  "hover:bg-background-alt/80",
                )}
              >
                <p aria-hidden className="index-number sm:pt-0.5">
                  {index}
                </p>

                <div className="min-w-0">
                  <p className="eyebrow tracking-[0.18em]">{focus}</p>
                  <h3
                    id={`specialty-${title.replace(/\s+/g, "-").toLowerCase()}`}
                    className="mt-2 font-display text-2xl font-light tracking-tight text-text-primary sm:text-[1.65rem]"
                  >
                    {title}
                  </h3>
                  <p className="prose-measure mt-3 text-base leading-relaxed text-text-secondary">
                    {description}
                  </p>
                </div>

                <div
                  aria-hidden
                  className="flex shrink-0 items-start opacity-90 sm:pt-1"
                >
                  <div className="rounded-full bg-background-alt/80 p-2 ring-1 ring-primary/8">
                    <HighlightBadge variant={highlight} className="size-10 sm:size-12" />
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </section>
  );
}
