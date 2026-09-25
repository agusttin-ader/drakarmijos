"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { premiumEase } from "@/lib/motion";

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.58, ease: premiumEase }}
    >
      {children}
    </MotionConfig>
  );
}
