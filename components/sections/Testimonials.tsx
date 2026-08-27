"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { premiumEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  context: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Llegué por ronquidos que mi pareja no soportaba más. La Dra. Armijos pidió una polisomnografía, me explicó la apnea leve y hoy uso CPAP sin miedo ni vergüenza.",
    name: "María G.",
    context: "Apnea del sueño · CEMIC",
    rating: 5,
  },
  {
    quote:
      "Tenía desviación de tabique y sinusitis crónica. Recuperé la respiración nasal y dejé los despertares con dolor de cabeza.",
    name: "Carlos R.",
    context: "Rinología · septoplastia",
    rating: 5,
  },
  {
    quote:
      "Consulté por mi hijo de 8 años que respiraba por la boca. En dos visitas entendimos el problema adenoideo. Duerme con la boca cerrada.",
    name: "Laura M.",
    context: "Pediatría ORL",
    rating: 5,
  },
  {
    quote:
      "Me despertaba con la mandíbula trabada. La Dra. vinculó el bruxismo con el sueño fragmentado. No fue solo estrés, como me decían antes.",
    name: "Jorge P.",
    context: "Bruxismo y sueño",
    rating: 5,
  },
];

const AUTOPLAY_MS = 8500;

function StarRating({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      aria-label={`${rating} de 5 estrellas`}
      role="img"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "size-4 sm:size-[1.125rem]",
            index < rating
              ? "fill-accent-gold text-accent-gold"
              : "fill-transparent text-primary/25",
          )}
          strokeWidth={1.25}
          aria-hidden
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + testimonials.length) % testimonials.length);
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
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, shouldReduceMotion, isInView]);

  const slideTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: premiumEase };

  const active = testimonials[activeIndex];

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
              <p className="eyebrow tracking-[0.24em]">Opiniones</p>
              <h2
                id="testimonials-heading"
                className="mt-3 font-display text-[clamp(1.65rem,3vw,2.25rem)] font-light leading-[1.12] tracking-tight text-text-primary"
              >
                Lo que escriben pacientes.
              </h2>

              <div className="mt-8 sm:mt-10">
                <StarRating rating={active.rating} />

                <p className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-2xl text-text-primary">
                    {active.rating}.0
                  </span>
                  <span className="text-xs uppercase tracking-[0.14em] text-text-secondary">
                    valoración
                  </span>
                </p>

                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeIndex}
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                    transition={slideTransition}
                    className="mt-8"
                  >
                    <p className="font-medium text-text-primary">{active.name}</p>
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
                aria-label="Testimonio anterior"
                className="inline-flex size-10 items-center justify-center rounded-control border border-primary/12 bg-background text-text-secondary shadow-card transition-all duration-300 hover:border-primary/25 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronLeft className="size-4 stroke-[1.5]" aria-hidden />
              </button>

              <div
                className="flex flex-1 items-center gap-2"
                role="tablist"
                aria-label="Seleccionar testimonio"
              >
                {testimonials.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    role="tab"
                    aria-selected={activeIndex === index}
                    aria-label={`Ver testimonio de ${item.name}`}
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
                aria-label="Testimonio siguiente"
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
              <p
                aria-hidden
                className="pointer-events-none absolute -left-1 top-4 font-display text-[5rem] leading-none text-primary/[0.06] sm:text-[6.5rem] lg:left-2 lg:top-6 lg:text-[7rem]"
              >
                &ldquo;
              </p>

              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={activeIndex}
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={slideTransition}
                  className="relative"
                >
                  <blockquote>
                    <p className="prose-measure font-display text-[clamp(1.35rem,2.6vw,2rem)] font-light leading-[1.5] text-text-primary lg:leading-[1.45]">
                      “{active.quote}”
                    </p>
                  </blockquote>

                  <figcaption className="sr-only">
                    {active.name}, {active.context}
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
