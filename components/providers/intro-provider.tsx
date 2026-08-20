"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { motionTransition, premiumEase } from "@/lib/motion";

type IntroContextValue = {
  introComplete: boolean;
};

const IntroContext = createContext<IntroContextValue>({ introComplete: false });

export function useIntro() {
  return useContext(IntroContext);
}

type IntroProviderProps = {
  children: ReactNode;
};

const INTRO_DURATION = 0.65;

export function IntroProvider({ children }: IntroProviderProps) {
  const shouldReduceMotion = useReducedMotion();
  const [introComplete, setIntroComplete] = useState(
    shouldReduceMotion ?? false,
  );
  const [showOverlay, setShowOverlay] = useState(!shouldReduceMotion);

  useEffect(() => {
    if (shouldReduceMotion) {
      setIntroComplete(true);
      setShowOverlay(false);
    }
  }, [shouldReduceMotion]);

  return (
    <IntroContext.Provider value={{ introComplete }}>
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
          onAnimationComplete={() => {
            setIntroComplete(true);
            setShowOverlay(false);
          }}
        />
      ) : null}
      {children}
    </IntroContext.Provider>
  );
}
