"use client";

import { useEffect } from "react";

/**
 * Bloquea el scroll de la página mientras `locked` es true.
 * Útil para menú móvil, modales, etc.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
