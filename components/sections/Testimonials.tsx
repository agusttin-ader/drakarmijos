"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { motionTransition, premiumEase } from "@/lib/motion";
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
              : "fill-transparent text-primary/12",
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
    if (isPaused || shouldReduceMotion) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(interval);
  }, [isPaused, shouldReduceMotion]);

  const slideTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: motionTransition.duration, ease: premiumEase };

  const active = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-anchor border-t border-primary/8 bg-background-alt/35 section-y"
    >
      <Container>
        <div
          className="grid gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:gap-16 xl:gap-20"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setIsPaused(false);
            }
          }}
        >
          {/* Columna izquierda — meta de la reseña */}
          <div className="flex flex-col justify-between gap-10 border-l-2 border-brand-aqua/70 pl-6 sm:pl-8 lg:min-h-[320px]">
            <div>
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.24em] text-text-secondary">
                Opiniones
              </p>
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
                    initial={shouldReduceMotion ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, x: 8 }}
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

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={goToPrev}
                aria-label="Testimonio anterior"
                className="inline-flex size-9 items-center justify-center rounded-[0.625rem_0.125rem_0.625rem_0.125rem] text-text-secondary transition-colors hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
                      "h-px flex-1 transition-colors duration-300 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      activeIndex === index
                        ? "bg-brand-aqua"
                        : "bg-primary/15 hover:bg-primary/30",
                    )}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Testimonio siguiente"
                className="inline-flex size-9 items-center justify-center rounded-[0.625rem_0.125rem_0.625rem_0.125rem] text-text-secondary transition-colors hover:bg-background hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <ChevronRight className="size-4 stroke-[1.5]" aria-hidden />
              </button>
            </div>
          </div>

          {/* Columna derecha — cita */}
          <div
            aria-live="polite"
            aria-atomic="true"
            aria-roledescription="carousel"
            className="relative flex items-center lg:py-4"
          >
            <p
              aria-hidden
              className="pointer-events-none absolute -left-1 top-0 font-display text-[5.5rem] leading-none text-primary/[0.06] sm:text-[7rem] lg:-left-4"
            >
              &ldquo;
            </p>

            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={activeIndex}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={slideTransition}
                className="relative"
              >
                <blockquote>
                  <p className="font-display text-[clamp(1.35rem,2.6vw,2rem)] font-light leading-[1.5] text-text-primary lg:leading-[1.45]">
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

        <p className="mt-10 text-xs leading-relaxed text-text-secondary lg:mt-12 lg:pl-8 lg:text-right">
          Nombres ficticios · testimonios reales sujetos a autorización escrita
        </p>
      </Container>
    </section>
  );
}
