"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { HighlightBadge } from "@/components/ui/highlight-badge";
import type { HighlightVariant } from "@/components/ui/highlight-badge";
import { Reveal } from "@/components/motion/reveal";
import {
  getAlternatingRevealVariants,
  motionTransition,
  staggerDelay,
  viewportOnce,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type FrequentCase = {
  index: string;
  highlight: HighlightVariant;
  title: string;
  context: string;
  description: string;
};

const frequentCases: FrequentCase[] = [
  {
    index: "01",
    highlight: "dormirBien",
    title: "Ronquidos y apnea",
    context: "Sueño · estudio y CPAP",
    description:
      "Pacientes con ronquido habitual, pausas respiratorias o fatiga diurna. La evaluación define si hay apnea y qué opciones encajan: estudio del sueño, CPAP u otras alternativas.",
  },
  {
    index: "02",
    highlight: "cirugiaNasal",
    title: "Obstrucción nasal",
    context: "Rinología · septoplastia",
    description:
      "Desviación de tabique, sinusitis crónica o pérdida de olfato. Muchas veces el plan empieza con tratamiento médico; la cirugía se plantea solo cuando aporta un beneficio concreto.",
  },
  {
    index: "03",
    highlight: "respira",
    title: "Respiración bucal en niños",
    context: "Pediatría ORL",
    description:
      "Niños que respiran por la boca, con adenoides o amígdalas inflamadas. La familia recibe un plan claro: cuándo observar, cuándo estudiar y qué opciones hay antes de operar.",
  },
  {
    index: "04",
    highlight: "dormirBien",
    title: "Bruxismo y sueño fragmentado",
    context: "Sueño · mandíbula y fatiga",
    description:
      "Mandíbula trabada al despertar, dolores de cabeza matutinos o sueño que no repara. A veces el bruxismo se vincula con apnea o respiración nasal deficiente — no siempre es solo estrés.",
  },
];

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: staggerDelay + 0.04 },
  },
} as const;

export function Testimonials() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-anchor section-y-tight border-b border-brand-aqua/30 bg-background"
    >
      <Container>
        <Reveal from="left">
          <header className="border-b border-primary/10 pb-6 lg:grid lg:grid-cols-12 lg:gap-10 lg:pb-7 xl:gap-14">
            <div className="lg:col-span-7 xl:col-span-8">
              <div className="flex items-center gap-2.5">
                <span aria-hidden className="accent-rule w-8 sm:w-10" />
                <p className="eyebrow text-primary">Motivos de consulta</p>
              </div>
              <h2
                id="testimonials-heading"
                className="mt-3 font-display text-[clamp(1.625rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-tight text-text-primary"
              >
                Lo que más consultan.
              </h2>
            </div>
            <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.65] text-text-secondary lg:col-span-5 lg:mt-0 lg:flex lg:items-end lg:justify-end lg:text-right xl:col-span-4">
              Orientación general — cada caso se evalúa en consulta.
            </p>
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
          {frequentCases.map(
            ({ index, highlight, title, context, description }, i) => (
              <motion.li
                key={title}
                variants={
                  shouldReduceMotion
                    ? undefined
                    : {
                        hidden: getAlternatingRevealVariants(i).hidden,
                        visible: {
                          ...getAlternatingRevealVariants(i).visible,
                          transition: motionTransition,
                        },
                      }
                }
                className="grid list-none gap-3 py-6 sm:grid-cols-[2.75rem_1fr] sm:gap-5 sm:py-7 lg:py-8"
              >
                <p
                  aria-hidden
                  className="font-display text-xl font-light tabular-nums leading-none text-brand-aqua sm:pt-0.5 sm:text-2xl"
                >
                  {index}
                </p>
                <div className="min-w-0">
                  <p className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-text-secondary">
                    {context}
                  </p>
                  <div className="mt-1.5 flex items-baseline gap-2.5 sm:gap-3">
                    <h3 className="font-display text-[clamp(1.125rem,2.2vw,1.4rem)] font-light tracking-tight text-text-primary">
                      {title}
                    </h3>
                    <HighlightBadge
                      variant={highlight}
                      className="size-6 shrink-0 text-primary/70 sm:size-7"
                    />
                  </div>
                  <p className="mt-2.5 text-[0.9375rem] leading-[1.65] text-text-secondary sm:text-[0.975rem]">
                    {description}
                  </p>
                </div>
              </motion.li>
            ),
          )}
        </motion.ol>

        <Reveal from="up" delay={0.05}>
          <p className="mt-8 border-t border-primary/10 pt-6 text-[0.8125rem] text-text-secondary">
            <Link
              href="/#booking"
              className="font-semibold uppercase tracking-[0.14em] text-primary underline-offset-[5px] hover:underline"
            >
              Agendar consulta
            </Link>
            <span className="mx-2 text-primary/25" aria-hidden>
              ·
            </span>
            <Link
              href="/#faq"
              className="font-medium text-text-secondary underline-offset-4 hover:text-primary hover:underline"
            >
              Ver preguntas frecuentes
            </Link>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
