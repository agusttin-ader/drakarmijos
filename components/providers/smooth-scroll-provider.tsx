"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";

type ProgressListener = (progress: number) => void;

type ScrollContextValue = {
  /** Reservado por compatibilidad; el sitio usa scroll nativo (sin Lenis). */
  lenis: null;
  /** Suscripción a progreso 0–1 sin re-renderizar el árbol. */
  subscribeProgress: (listener: ProgressListener) => () => void;
};

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  subscribeProgress: () => () => undefined,
});

export function useScrollContext() {
  return useContext(ScrollContext);
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

/** Scroll nativo inmediato — sin interpolación Lenis (evita el “delay”). */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const mountedRef = useRef(false);
  const progressListenersRef = useRef(new Set<ProgressListener>());
  const lastProgressRef = useRef(0);

  const subscribeProgress = useCallback((listener: ProgressListener) => {
    progressListenersRef.current.add(listener);
    listener(lastProgressRef.current);
    return () => {
      progressListenersRef.current.delete(listener);
    };
  }, []);

  const emitProgress = useCallback((progress: number) => {
    const next = Math.max(0, Math.min(1, progress));
    if (Math.abs(next - lastProgressRef.current) < 0.0005) return;
    lastProgressRef.current = next;
    progressListenersRef.current.forEach((listener) => listener(next));
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}`,
      );
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onNativeScroll = () => {
      if (!mountedRef.current) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      emitProgress(max > 0 ? window.scrollY / max : 0);
    };

    onNativeScroll();
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    return () => window.removeEventListener("scroll", onNativeScroll);
  }, [emitProgress]);

  const value = useMemo(
    () => ({ lenis: null, subscribeProgress }),
    [subscribeProgress],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}
