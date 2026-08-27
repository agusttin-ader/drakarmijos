"use client";

import { useEffect, useRef } from "react";
import { useScrollContext } from "@/components/providers/smooth-scroll-provider";

export function ScrollProgress() {
  const { subscribeProgress } = useScrollContext();
  const barRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return subscribeProgress((progress) => {
      const bar = barRef.current;
      if (!bar) return;

      bar.style.transform = `scaleX(${progress})`;
      bar.style.willChange = "transform";

      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = window.setTimeout(() => {
        if (barRef.current) {
          barRef.current.style.willChange = "auto";
        }
        idleTimerRef.current = null;
      }, 160);
    });
  }, [subscribeProgress]);

  useEffect(() => {
    return () => {
      if (idleTimerRef.current !== null) {
        window.clearTimeout(idleTimerRef.current);
      }
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-primary/10"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-brand-aqua"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
