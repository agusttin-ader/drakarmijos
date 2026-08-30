"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { premiumEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type FrequentCase = {
  title: string;
  context: string;
  description: string;
};

const frequentCases: FrequentCase[] = [
  {
    title: "Ronquidos y apnea",
    context: "Sueño · estudio y CPAP",
    description:
      "Pacientes con ronquido habitual, pausas respiratorias o fatiga diurna. La evaluación define si hay apnea y qué opciones encajan: estudio del sueño, CPAP u otras alternativas.",
  },
  {
    title: "Obstrucción nasal",
    context: "Rinología · septoplastia",
    description:
      "Desviación de tabique, sinusitis crónica o pérdida de olfato. Muchas veces el plan empieza con tratamiento médico; la cirugía se plantea solo cuando aporta un beneficio concreto.",
  },
  {
    title: "Respiración bucal en niños",
    context: "Pediatría ORL",
    description:
      "Niños que respiran por la boca, con adenoides o amígdalas inflamadas. La familia recibe un plan claro: cuándo observar, cuándo estudiar y qué opciones hay antes de operar.",
  },
  {
    title: "Bruxismo y sueño fragmentado",
    context: "Sueño · mandíbula y fatiga",
    description:
      "Mandíbula trabada al despertar, dolores de cabeza matutinos o sueño que no repara. A veces el bruxismo se vincula con apnea o respiración nasal deficiente — no siempre es solo estrés.",
  },
];

const AUTOPLAY_MS = 8500;

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + frequentCases.length) % frequentCases.length);
  }, []);

  const goToNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  const goToPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "80px", threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || shouldReduceMotion || !isInView) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % frequentCases.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, shouldReduceMotion, isInView]);

  const slideTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: premiumEase };

  const active = frequentCases[activeIndex];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className="scroll-anchor section-divider bg-background-alt/35 section-y"
    >
      <Container>
        <div
          className="grid gap-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          <div className="surface-panel flex flex-col justify-between gap-10 border-l-4 border-l-brand-aqua p-6 sm:p-8 lg:min-h-[340px]">
            <div>
              <p className="eyebrow tracking-[0.24em]">Consulta</p>
              <h2
                id="testimonials-heading"
                className="mt-3 font-display text-[clamp(1.65rem,3vw,2.25rem)] font-light leading-[1.12] tracking-tight text-text-primary"
              >
                Motivos frecuentes de consulta.
              </h2>

              <div className="mt-8 sm:mt-10">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                    transition={slideTransition}
                  >
                    <p className="font-display text-2xl font-light text-text-primary">
                      {active.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {active.context}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Motivo anterior"
                className="inline-flex size-10 items-center justify-center rounded-control border border-primary/12 bg-background text-text-secondary shadow-card transition-all duration-300 hover:border-primary/25 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronLeft className="size-4 stroke-[1.5]" aria-hidden />
              </button>

              <div
                className="flex flex-1 items-center gap-2"
                role="tablist"
                aria-label="Seleccionar motivo de consulta"
              >
                {frequentCases.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === index}
                    aria-label={`Ver ${item.title}`}
                    onClick={() => goTo(index)}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      activeIndex === index
                        ? "bg-brand-aqua"
                        : "bg-primary/12 hover:bg-primary/25",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Motivo siguiente"
                className="inline-flex size-10 items-center justify-center rounded-control border border-primary/12 bg-background text-text-secondary shadow-card transition-all duration-300 hover:border-primary/25 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronRight className="size-4 stroke-[1.5]" aria-hidden />
              </button>
            </div>
          </div>

          <div
            aria-live="polite"
            aria-atomic="true"
            aria-roledescription="carousel"
            className="relative flex items-center lg:py-4"
          >
            <div className="surface-panel relative w-full p-6 sm:p-8 lg:p-10">
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={activeIndex}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={slideTransition}
                  className="relative"
                >
                  <p className="prose-measure font-display text-[clamp(1.35rem,2.6vw,2rem)] font-light leading-[1.5] text-text-primary lg:leading-[1.45]">
                    {active.description}
                  </p>

                  <figcaption className="sr-only">
                    {active.title}, {active.context}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
