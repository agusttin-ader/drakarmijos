"use client";

import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type InstitutionLogoImageProps = ComponentProps<typeof SiteImage> & {
  interactive?: "hover" | "tap";
  originClass?: string;
};

/** CSS-only hover — evita animar `filter` con Framer (caro en paint). */
export function InstitutionLogoImage({
  className,
  interactive = "hover",
  originClass = "origin-center",
  ...props
}: InstitutionLogoImageProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 opacity-90 grayscale-[35%] transition-[opacity,filter,transform] duration-300 ease-out motion-reduce:transition-none",
        originClass,
        interactive === "hover" &&
          "hover:scale-[1.04] hover:opacity-100 hover:grayscale-0",
        interactive === "tap" &&
          "active:scale-[1.04] active:opacity-100 active:grayscale-0",
      )}
    >
      <SiteImage
        {...props}
        className={cn("w-auto shrink-0 object-contain object-left", className)}
      />
    </span>
  );
}
