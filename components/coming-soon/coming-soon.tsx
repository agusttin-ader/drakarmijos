"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Moon } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { DoctorName } from "@/components/ui/doctor-name";
import { siteData } from "@/lib/site-data";
import { motionTransition } from "@/lib/motion";

const floatingZzz = [
  { char: "Z", delay: 0, x: 0, size: "text-3xl sm:text-4xl" },
  { char: "z", delay: 0.55, x: 18, size: "text-2xl sm:text-3xl" },
  { char: "z", delay: 1.1, x: 34, size: "text-xl sm:text-2xl" },
] as const;

function FloatingZzz() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <p
        className="font-display text-3xl font-light tracking-widest text-primary/35"
        aria-hidden
      >
        Zzz
      </p>
    );
  }

  return (
    <div className="relative h-16 w-28 sm:h-20 sm:w-32" aria-hidden>
      {floatingZzz.map(({ char, delay, x, size }) => (
        <motion.span
          key={`${char}-${delay}`}
          className={`absolute bottom-0 left-0 font-display font-light text-primary/40 ${size}`}
          initial={{ opacity: 0, y: 8, x }}
          animate={{
            opacity: [0, 0.85, 0.85, 0],
            y: [8, -4, -28, -44],
            x: [x, x + 4, x + 10, x + 16],
          }}
          transition={{
            duration: 2.8,
            delay,
            repeat: Infinity,
            repeatDelay: 0.6,
            ease: "easeInOut",
          }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

export function ComingSoon() {
  const reduceMotion = useReducedMotion();

  return (
    <main
      id="main-content"
      className="relative flex min-h-dvh flex-1 flex-col items-center justify-center overflow-hidden px-6 py-16 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0 brand-pattern opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-aqua/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/8 blur-3xl"
        aria-hidden
      />

      <motion.div
        className="relative z-10 flex max-w-lg flex-col items-center gap-6 sm:gap-8"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionTransition}
      >
        <Logo priority className="scale-110" />

        <div className="space-y-2">
          <DoctorName className="text-4xl text-primary sm:text-5xl">
            {siteData.doctor.name}
          </DoctorName>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-text-secondary">
            {siteData.doctor.specialty}
          </p>
        </div>

        <motion.div
          className="flex flex-col items-center gap-3"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...motionTransition, delay: 0.15 }}
        >
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : {
                    scale: [1, 1.06, 1],
                    opacity: [0.7, 1, 0.7],
                  }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Moon
              className="size-9 text-primary/50 sm:size-10"
              strokeWidth={1.25}
              aria-hidden
            />
          </motion.div>
          <FloatingZzz />
        </motion.div>

        <div className="space-y-3">
          <h1 className="font-display text-2xl font-light text-text-primary sm:text-3xl">
            Estamos trabajando en algo nuevo
          </h1>
          <p className="prose-measure text-base leading-relaxed text-text-secondary sm:text-lg">
            Pronto vas a encontrar aquí información sobre otorrinolaringología,
            ronquidos, apnea del sueño y mucho más.
          </p>
        </div>

        <p className="text-sm text-text-secondary/80">
          Volvemos pronto. Gracias por tu paciencia.
        </p>
      </motion.div>
    </main>
  );
}
