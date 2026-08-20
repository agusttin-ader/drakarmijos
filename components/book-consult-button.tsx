"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useBookingModal } from "@/components/providers/booking-modal-provider";

type BookConsultButtonProps = {
  variant?: "primary" | "outline";
  className?: string;
  children: ReactNode;
  "aria-label"?: string;
};

export function BookConsultButton({
  variant = "primary",
  className,
  children,
  "aria-label": ariaLabel,
}: BookConsultButtonProps) {
  const { open } = useBookingModal();

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      aria-label={ariaLabel}
      onClick={open}
    >
      {children}
    </Button>
  );
}
