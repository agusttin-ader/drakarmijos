"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteImage } from "@/components/ui/site-image";
import {
  institutionLogoHover,
  institutionLogoHoverTransition,
  institutionLogoRest,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type InstitutionLogoImageProps = ComponentProps<typeof SiteImage> & {
  interactive?: "hover" | "tap";
  originClass?: string;
};

export function InstitutionLogoImage({
  className,
  interactive = "hover",
  originClass = "origin-center",
  ...props
}: InstitutionLogoImageProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <SiteImage
        {...props}
        className={cn(
          "w-auto shrink-0 object-contain object-left opacity-90 grayscale-[35%]",
          className,
        )}
      />
    );
  }

  const motionProps =
    interactive === "tap"
      ? { whileTap: institutionLogoHover }
      : { whileHover: institutionLogoHover };

  return (
    <motion.span
      className={cn("inline-flex shrink-0", originClass)}
      initial={institutionLogoRest}
      transition={institutionLogoHoverTransition}
      {...motionProps}
    >
      <SiteImage
        {...props}
        className={cn("w-auto shrink-0 object-contain object-left", className)}
      />
    </motion.span>
  );
}
