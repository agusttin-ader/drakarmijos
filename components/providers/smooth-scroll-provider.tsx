"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type ScrollContextValue = {
  lenis: Lenis | null;
  scrollProgress: number;
};

const ScrollContext = createContext<ScrollContextValue>({
  lenis: null,
  scrollProgress: 0,
});

export function useScrollContext() {
  return useContext(ScrollContext);
}

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mountedRef = useRef(false);

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

    // Sin Lenis (reduced motion): igual forzar inicio al cargar.
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
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const prefersCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    // Mobile / touch: scroll nativo (más liviano que Lenis + ticker GSAP).
    if (prefersReducedMotion || prefersCoarsePointer) {
      return;
    }

    const instance = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      anchors: true,
    });

    // Al refrescar / entrar: siempre arriba, sin restaurar scroll ni anclas.
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
    instance.scrollTo(0, { immediate: true });

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          instance.scrollTo(value, { immediate: true });
        }
        return instance.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onScroll = () => {
      if (!mountedRef.current) return;

      ScrollTrigger.update();
      const limit = instance.limit;
      setScrollProgress(limit > 0 ? instance.scroll / limit : 0);
    };

    instance.on("scroll", onScroll);

    const ticker = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const onRefresh = () => instance.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    requestAnimationFrame(() => {
      if (!mountedRef.current) return;
      setLenis(instance);
      ScrollTrigger.refresh();
    });

    return () => {
      instance.off("scroll", onScroll);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      gsap.ticker.remove(ticker);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
      instance.destroy();
      setLenis(null);
    };
  }, []);

  const value = useMemo(
    () => ({ lenis, scrollProgress }),
    [lenis, scrollProgress],
  );

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}
