"use client";

import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const idleTimerRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const updateBar = (progress: number) => {
      const bar = barRef.current;
      if (!bar) return;

      const next = Math.max(0, Math.min(1, progress));
      if (Math.abs(next - lastProgressRef.current) < 0.0005) return;
      lastProgressRef.current = next;

      bar.style.transform = `scaleX(${next})`;
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
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      updateBar(max > 0 ? window.scrollY / max : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
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
