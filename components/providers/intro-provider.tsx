"use client";

import { useEffect, useState, type ReactNode } from "react";

type IntroProviderProps = {
  children: ReactNode;
};

/** Fade-in inicial con CSS puro (sin framer-motion en el layout). */
export function IntroProvider({ children }: IntroProviderProps) {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setShowOverlay(false);
    }
  }, []);

  return (
    <>
      {showOverlay ? (
        <div
          aria-hidden
          className="intro-overlay pointer-events-none fixed inset-0 z-[100] bg-background"
          onAnimationEnd={() => setShowOverlay(false)}
        />
      ) : null}
      {children}
    </>
  );
}
