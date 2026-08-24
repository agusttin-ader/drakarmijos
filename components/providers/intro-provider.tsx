"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { motionTransition, premiumEase } from "@/lib/motion";

type IntroProviderProps = {
  children: ReactNode;
};

const INTRO_DURATION = 0.65;

/** Fade-in inicial de la página (sin estado global). */
export function IntroProvider({ children }: IntroProviderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [showOverlay, setShowOverlay] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      setShowOverlay(false);
    }
  }, [shouldReduceMotion]);

  return (
    <>
      {showOverlay ? (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[100] bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            ...motionTransition,
            duration: INTRO_DURATION,
            ease: premiumEase,
            delay: 0.08,
          }}
          onAnimationComplete={() => setShowOverlay(false)}
        />
      ) : null}
      {children}
    </>
  );
}
