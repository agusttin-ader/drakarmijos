"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { motionTransition } from "@/lib/motion";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-anchor border-t border-primary/8 section-y"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <SectionHeading
            id="faq-heading"
            variant="editorial"
            eyebrow="Preguntas"
            title="Lo que más me preguntan."
            subheading="Recuperación, estudios y cuándo consultar. Son orientaciones generales: tu caso se define en consulta."
          />

          <div className="divide-y divide-primary/10 border-y border-primary/10">
            {siteData.faqs.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div key={item.question} className="py-1">
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() =>
                        setOpenIndex(isOpen ? null : index)
                      }
                      className="flex w-full items-start justify-between gap-4 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <span className="font-display text-base font-normal leading-snug text-text-primary sm:text-lg">
                        {item.question}
                      </span>
                      <Plus
                        aria-hidden
                        className={cn(
                          "mt-0.5 size-5 shrink-0 stroke-[1.5] text-primary transition-transform duration-300",
                          isOpen && "rotate-45",
                        )}
                      />
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
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : motionTransition
                        }
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-10 text-base leading-relaxed text-text-secondary">
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
