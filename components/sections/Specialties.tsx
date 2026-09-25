"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { HighlightBadge } from "@/components/ui/highlight-badge";
import type { HighlightVariant } from "@/components/ui/highlight-badge";
import {
  getAlternatingRevealVariants,
  motionTransition,
  staggerDelay,
  viewportOnce,
} from "@/lib/motion";
import { siteCopy } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type Specialty = {
  id: string;
  highlight: HighlightVariant;
  index: string;
  title: string;
  focus: string;
  description: string;
  details: string;
};

const specialties: Specialty[] = [
  {
    id: "respira-mejor",
    highlight: "respira",
    index: "01",
    title: "Respira Mejor",
    focus: "Rinología · oído, nariz y garganta",
    description:
      "Desviación de tabique, sinusitis, alergias, pérdida de olfato o respiración bucal en niños. Evaluación endoscópica y plan médico o quirúrgico según cada caso.",
    details: siteCopy.specialtiesPractice,
  },
  {
    id: "duerme-mejor",
    highlight: "dormirBien",
    index: "02",
    title: "Duerme Mejor",
    focus: "Ronquidos · apnea · bruxismo nocturno",
    description:
      "Estudio del sueño, CPAP, cirugía de vías aéreas superiores y la relación entre bruxismo, pausas respiratorias y fatiga diurna. Si no respiras bien, no duermes bien.",
    details:
      "El ronquido habitual no siempre es inofensivo. Si hay somnolencia diurna, ahogos o pausas, evalúo apnea y armo un plan claro: estudio del sueño, CPAP o cirugía cuando corresponde.",
  },
  {
    id: "cirugia-nasal",
    highlight: "cirugiaNasal",
    index: "03",
    title: "Cirugía Nasal",
    focus: "Rinoplastia funcional y estética",
    description:
      "Corrección de obstrucción nasal con criterio estético conservador. Cada nariz responde de forma distinta, así que el plan se define sobre tu anatomía y expectativas.",
    details:
      "Septoplastia, cornetes o rinoplastia funcional cuando hay indicación. Te explico tiempos, recuperación y límites realistas antes de decidir.",
  },
];

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay + 0.04 },
  },
} as const;

const rowVariants = (index: number) =>
  ({
    hidden: getAlternatingRevealVariants(index).hidden,
    visible: {
      ...getAlternatingRevealVariants(index).visible,
      transition: motionTransition,
    },
  }) as const;

/** Especialidades — grid ancho + panel lateral en desktop. */
export function Specialties() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="specialties"
      aria-labelledby="specialties-heading"
      className="scroll-anchor section-divider section-y-tight bg-background"
    >
      <Container>
        <Reveal from="right">
        <header className="border-b border-primary/10 pb-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:pb-7 xl:gap-14">
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="accent-rule w-8 sm:w-10"
              />
              <p className="eyebrow text-primary">Especialidades</p>
            </div>
            <h2
              id="specialties-heading"
              className="mt-3 font-display text-[clamp(1.625rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-tight text-text-primary 2xl:text-[clamp(2rem,2.2vw,2.85rem)]"
            >
              Qué veo en consulta.
            </h2>
            <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.65] text-text-secondary sm:text-base">
              Respiración nasal, ronquidos, apnea y cirugía nasal — opciones y
              límites explicados con claridad.
            </p>
          </div>
          <div className="mt-6 lg:col-span-5 lg:mt-0 lg:flex lg:items-end lg:justify-end xl:col-span-4">
            <p className="max-w-sm text-[0.8125rem] leading-relaxed text-text-secondary lg:text-right">
              Tres ejes de trabajo: vías aéreas, sueño y cirugía nasal funcional.
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
              "lg:grid lg:grid-cols-2 lg:gap-x-10 xl:gap-x-14 xl:[&>li:nth-child(3)]:col-span-2",
            )}
          >
            {specialties.map(
              ({ id, highlight, index, title, focus, description, details }, i) => (
                <motion.li
                  key={id}
                  variants={shouldReduceMotion ? undefined : rowVariants(i)}
                  className={cn("list-none", index === "03" && "xl:col-span-2")}
                >
                  <article
                    id={id}
                    className="scroll-anchor grid gap-3 py-6 sm:grid-cols-[2.75rem_1fr] sm:gap-5 sm:py-7 lg:py-8"
                  >
                    <p
                      aria-hidden
                      className="font-display text-xl font-light tabular-nums leading-none text-brand-aqua sm:pt-0.5 sm:text-2xl"
                    >
                      {index}
                    </p>

                    <div className="min-w-0">
                      <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-text-secondary">
                        {focus}
                      </p>
                      <div className="mt-1.5 flex items-baseline gap-2.5 sm:gap-3">
                        <h3 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] font-light tracking-tight text-text-primary">
                          {title}
                        </h3>
                        <HighlightBadge
                          variant={highlight}
                          className="size-6 shrink-0 stroke-[1.5] text-primary/70 sm:size-7"
                        />
                      </div>
                      <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-text-secondary sm:text-[0.975rem] sm:leading-[1.7]">
                        {description}{" "}
                        <span className="text-text-secondary">{details}</span>
                      </p>
                      <Link
                        href="/#booking"
                        className="mt-3 inline-flex text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-primary underline-offset-[5px] transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        Agendar consulta
                      </Link>
                    </div>
                  </article>
                </motion.li>
              ),
            )}
          </motion.ol>
      </Container>
    </section>
  );
}
