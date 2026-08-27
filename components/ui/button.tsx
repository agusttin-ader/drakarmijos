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
  "relative inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] motion-reduce:active:scale-100";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "rounded-pill bg-primary pl-7 text-white shadow-soft hover:bg-primary/92 hover:shadow-card active:bg-primary/88 before:absolute before:left-3 before:top-1/2 before:h-[42%] before:w-px before:-translate-y-1/2 before:bg-brand-aqua/90",
  outline:
    "rounded-pill border border-primary/25 bg-background/80 text-primary shadow-card hover:border-primary/45 hover:bg-primary/[0.04] hover:shadow-soft active:bg-primary/[0.06]",
};

const MAGNETIC_STRENGTH = 0.14;

function MagneticButton({
  className,
  children,
  variant,
  ...props
}: ButtonAsButton & { variant: ButtonVariant }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
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

  return (
    <motion.button
      ref={buttonRef}
      type="button"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMagnet}
      onBlur={resetMagnet}
      transition={{ ...motionTransition, ease: premiumEase }}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function Button({
  variant = "primary",
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasFinePointer = useFinePointer();
  const isMagnetic =
    variant === "primary" && !shouldReduceMotion && hasFinePointer && !href;

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  if (isMagnetic) {
    return (
      <MagneticButton
        variant={variant}
        className={className}
        {...(props as ButtonAsButton)}
      >
        {children}
      </MagneticButton>
    );
  }

  return (
    <button
      type="button"
      className={cn(baseStyles, variantStyles[variant], className)}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
