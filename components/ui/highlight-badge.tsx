"use client";

import { Moon, Wind } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type HighlightVariant = "respira" | "cirugiaNasal" | "dormirBien";

type HighlightBadgeProps = {
  variant: HighlightVariant;
  className?: string;
};

const windTransition = {
  duration: 2.35,
  ease: "easeInOut" as const,
  repeat: Infinity,
  repeatType: "mirror" as const,
};

const moonTransition = {
  duration: 3.6,
  ease: "easeInOut" as const,
  repeat: Infinity,
  repeatType: "mirror" as const,
};

const zzzTransition = (delay: number) => ({
  duration: 2.5,
  ease: "easeOut" as const,
  repeat: Infinity,
  delay,
});

function AnimatedWind({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      className={cn("inline-flex text-current", className)}
      aria-hidden
      animate={
        shouldReduceMotion
          ? undefined
          : { x: [0, 4, 0], opacity: [0.72, 1, 0.72] }
      }
      transition={windTransition}
    >
      <Wind className="size-full stroke-[1.5]" strokeWidth={1.5} />
    </motion.span>
  );
}

function SleepZzz({ index }: { index: number }) {
  const shouldReduceMotion = useReducedMotion();
  const offsets = [
    { right: "0.05em", top: "-0.15em", size: "0.42em" },
    { right: "-0.35em", top: "-0.55em", size: "0.5em" },
    { right: "-0.75em", top: "-0.95em", size: "0.38em" },
  ] as const;
  const o = offsets[index]!;

  return (
    <motion.span
      className="pointer-events-none absolute font-brand font-normal leading-none text-primary/50"
      style={{ right: o.right, top: o.top, fontSize: o.size }}
      aria-hidden
      animate={
        shouldReduceMotion
          ? undefined
          : {
              opacity: [0, 0.5, 0],
              y: [0, -4 - index * 2, -9 - index * 3],
              x: [0, 1 + index, 2 + index * 1.5],
            }
      }
      transition={zzzTransition(index * 0.42)}
    >
      z
    </motion.span>
  );
}

function AnimatedMoonSleep({ className }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className={cn("relative inline-flex text-current", className)} aria-hidden>
      {!shouldReduceMotion ? (
        <>
          <SleepZzz index={0} />
          <SleepZzz index={1} />
          <SleepZzz index={2} />
        </>
      ) : null}
      <motion.span
        className="inline-flex size-full"
        animate={
          shouldReduceMotion
            ? undefined
            : { rotate: [-8, 8, -8], y: [0, -1.5, 0] }
        }
        transition={moonTransition}
      >
        <Moon className="size-full stroke-[1.5]" strokeWidth={1.5} />
      </motion.span>
    </span>
  );
}

/** Icono animado por especialidad — liviano, solo transform/opacity. */
export function HighlightBadge({ variant, className }: HighlightBadgeProps) {
  const wrapClass = cn(
    "relative inline-flex shrink-0 items-center justify-center",
    className ?? "size-10 text-primary sm:size-12",
  );

  switch (variant) {
    case "respira":
      return <AnimatedWind className={wrapClass} />;
    case "cirugiaNasal":
      return <AnimatedWind className={wrapClass} />;
    case "dormirBien":
      return <AnimatedMoonSleep className={wrapClass} />;
    default:
      return null;
  }
}
