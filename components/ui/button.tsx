"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { useRef } from "react";
import { useFinePointer } from "@/lib/hooks/use-media-query";
import { motionTransition, premiumEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<HTMLMotionProps<"button">, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<HTMLMotionProps<"a">, keyof ButtonBaseProps> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const baseStyles =
  "relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "rounded-[1.625rem_0.375rem_1.625rem_0.375rem] bg-primary pl-7 text-white hover:bg-primary/92 before:absolute before:left-3 before:top-1/2 before:h-[42%] before:w-px before:-translate-y-1/2 before:bg-accent-gold/90",
  outline:
    "rounded-[1.625rem_0.375rem_1.625rem_0.375rem] border border-primary/30 bg-transparent text-primary hover:border-primary/50 hover:bg-primary/[0.03]",
};

const MAGNETIC_STRENGTH = 0.14;

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (variant !== "primary" || shouldReduceMotion || !buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((event.clientX - centerX) * MAGNETIC_STRENGTH);
    y.set((event.clientY - centerY) * MAGNETIC_STRENGTH);
  };

  const resetMagnet = () => {
    x.set(0);
    y.set(0);
  };

  const isMagnetic =
    variant === "primary" && !shouldReduceMotion && hasFinePointer && !href;
  const motionProps = {
    onMouseLeave: resetMagnet,
    onBlur: resetMagnet,
    whileTap: shouldReduceMotion ? undefined : { scale: 0.98 },
    transition: { ...motionTransition, ease: premiumEase },
    className: cn(baseStyles, variantStyles[variant], className),
  };

  if (href) {
    return (
      <motion.a href={href} {...motionProps} {...(props as HTMLMotionProps<"a">)}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      style={isMagnetic ? { x: springX, y: springY } : undefined}
      onMouseMove={handleMouseMove}
      {...motionProps}
      {...(props as HTMLMotionProps<"button">)}
    >
      {children}
    </motion.button>
  );
}
