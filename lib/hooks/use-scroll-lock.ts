"use client";

import { useEffect } from "react";
import { useScrollContext } from "@/components/providers/smooth-scroll-provider";

/**
 * Bloquea el scroll de la página (Lenis + overflow) mientras `locked` es true.
 * Útil para menú móvil, modales, etc.
 */
export function useScrollLock(locked: boolean) {
  const { lenis } = useScrollContext();

  useEffect(() => {
    if (!locked) return;

    lenis?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = previousOverflow;
    };
  }, [locked, lenis]);
}
