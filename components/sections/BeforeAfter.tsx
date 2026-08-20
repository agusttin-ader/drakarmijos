"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BeforeAfterSlider,
  type BeforeAfterSliderProps,
} from "@/components/ui/before-after-slider";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  motionTransition,
  staggerDelay,
  viewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type BeforeAfterCase = Omit<BeforeAfterSliderProps, "className"> & {
  id: string;
  note: string;
};

const cases: BeforeAfterCase[] = [
  {
    id: "case-1",
    note: "Perfil · obstrucción nasal postraumática",
    beforeAlt: "Perfil nasal antes de rinoplastia — caso 1",
    afterAlt: "Perfil nasal después de rinoplastia — caso 1",
  },
  {
    id: "case-2",
    note: "Frontal · tabique desviado",
    beforeAlt: "Vista frontal antes de rinoplastia — caso 2",
    afterAlt: "Vista frontal después de rinoplastia — caso 2",
  },
  {
    id: "case-3",
    note: "Perfil · rinoplastia funcional",
    beforeAlt: "Perfil nasal antes de rinoplastia — caso 3",
    afterAlt: "Perfil nasal después de rinoplastia — caso 3",
  },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay + 0.04 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: motionTransition,
  },
} as const;

export function BeforeAfter() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="before-after"
      aria-labelledby="before-after-heading"
      className="scroll-anchor section-y"
    >
      <Container>
        <SectionHeading
          id="before-after-heading"
          variant="statement"
          title="Antes y después"
          subheading="Rinoplastia y procedimientos nasales. Imágenes con consentimiento informado; el resultado depende de anatomía, cicatrización y expectativas realistas."
          className="mb-12 lg:mb-16"
        />

        <motion.div
          variants={shouldReduceMotion ? undefined : gridVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "visible"}
          viewport={viewportOnce}
          className={cn(
            "flex gap-8 overflow-x-auto pb-2 snap-x snap-mandatory",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "md:grid md:grid-cols-3 md:gap-10 md:overflow-visible md:pb-0 md:snap-none",
          )}
        >
          {cases.map((patientCase) => (
            <motion.div
              key={patientCase.id}
              variants={shouldReduceMotion ? undefined : itemVariants}
              className="w-[min(85vw,420px)] shrink-0 snap-center md:w-auto"
            >
              <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-text-secondary">
                {patientCase.note}
              </p>
              <BeforeAfterSlider
                beforeSrc={patientCase.beforeSrc}
                afterSrc={patientCase.afterSrc}
                beforeAlt={patientCase.beforeAlt}
                afterAlt={patientCase.afterAlt}
              />
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-10 border-t border-primary/10 pt-6 text-xs leading-relaxed text-text-secondary sm:text-sm">
          Fotos publicadas con consentimiento del paciente. Los resultados pueden
          variar según cada caso.
        </p>
      </Container>
    </section>
  );
}
