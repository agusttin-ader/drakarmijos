"use client";

import { useScrollContext } from "@/components/providers/smooth-scroll-provider";

export function ScrollProgress() {
  const { scrollProgress } = useScrollContext();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] bg-primary/10"
    >
      <div
        className="h-full origin-left bg-brand-aqua will-change-transform"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  );
}
