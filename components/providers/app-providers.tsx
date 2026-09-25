"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { BookingModalProvider } from "@/components/providers/booking-modal-provider";
import { premiumEase } from "@/lib/motion";

type AppProvidersProps = {
  children: ReactNode;
};

/** Un solo boundary cliente: motion global + modal de cita. */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.58, ease: premiumEase }}
    >
      <BookingModalProvider>{children}</BookingModalProvider>
    </MotionConfig>
  );
}
