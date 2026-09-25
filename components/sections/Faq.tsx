"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { premiumEase } from "@/lib/motion";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  const accordionTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: premiumEase };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-anchor section-y-tight bg-brand-mint-wash/45"
    >
      <Container className="max-w-3xl lg:max-w-[52rem]">
        <Reveal from="up">
          <header className="text-center lg:text-left">
            <div className="flex items-center justify-center gap-2.5 lg:justify-start">
              <span
                aria-hidden
                className="hidden h-px w-8 bg-primary/20 sm:block sm:w-10"
              />
              <p className="eyebrow text-primary">Preguntas</p>
              <span
                aria-hidden
                className="hidden h-px w-8 bg-primary/20 sm:block sm:w-10"
              />
            </div>
            <h2
              id="faq-heading"
              className="mt-3 font-display text-[clamp(1.625rem,3.6vw,2.5rem)] font-light leading-[1.08] tracking-tight text-text-primary"
            >
              Dudas frecuentes
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[0.9375rem] leading-[1.65] text-text-secondary lg:mx-0">
              Recuperación, estudios y cómo agendar. Respuestas generales — en
              consulta vemos tu caso.
            </p>
          </header>
        </Reveal>

        <Reveal from="up" delay={0.06} className="mt-8 sm:mt-10 lg:mt-12">
          <div className="editorial-list border-y border-primary/15 bg-background/70">
            {siteData.faqs.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div key={item.question} className="list-none">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={cn(
                        "flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors duration-300 sm:px-6 sm:py-5",
                        "hover:bg-brand-mint-wash/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                        isOpen && "bg-brand-mint-wash/60",
                      )}
                    >
                      <span
                        className={cn(
                          "font-display text-base font-normal leading-snug sm:text-lg",
                          isOpen ? "text-primary" : "text-text-primary",
                        )}
                      >
                        {item.question}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          isOpen
                            ? "border-primary/25 bg-primary/5 text-primary"
                            : "border-primary/12 bg-background text-primary/80",
                        )}
                      >
                        {isOpen ? (
                          <Minus className="size-4 stroke-[1.75]" />
                        ) : (
                          <Plus className="size-4 stroke-[1.75]" />
                        )}
                      </span>
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          shouldReduceMotion ? false : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          shouldReduceMotion
                            ? undefined
                            : { height: 0, opacity: 0 }
                        }
                        transition={accordionTransition}
                        className="overflow-hidden"
                      >
                        <p className="prose-measure px-4 pb-5 text-[0.9375rem] leading-[1.65] text-text-secondary sm:px-6 sm:pb-6">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
