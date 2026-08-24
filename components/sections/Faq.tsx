"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
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
      className="scroll-anchor section-divider section-y"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <SectionHeading
            id="faq-heading"
            eyebrow="Preguntas"
            title="Lo que más me preguntan."
            subheading="Recuperación, estudios y cuándo consultar. Son orientaciones generales: tu caso se define en consulta."
          />

          <div className="overflow-hidden rounded-brand bg-background/70 shadow-card ring-1 ring-primary/10">
            {siteData.faqs.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div
                  key={item.question}
                  className={cn(
                    "border-b border-primary/10 last:border-b-0",
                    isOpen && "bg-background-alt/70",
                  )}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className={cn(
                        "flex w-full items-start justify-between gap-4 px-4 py-5 text-left transition-colors duration-300 sm:px-6 sm:py-6",
                        "hover:bg-background-alt/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                        isOpen && "border-l-2 border-l-brand-aqua pl-[calc(1rem-2px)] sm:pl-[calc(1.5rem-2px)]",
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
                            ? "border-primary/20 bg-primary/5 text-primary"
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
                          shouldReduceMotion
                            ? false
                            : { height: 0, opacity: 0 }
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
                        <p className="prose-measure px-4 pb-6 text-base leading-relaxed text-text-secondary sm:px-6 sm:pb-7">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
