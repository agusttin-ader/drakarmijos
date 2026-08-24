import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "editorial" | "credential" | "inline";

type BadgeProps = {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
};

const variantStyles: Record<BadgeVariant, string> = {
  editorial:
    "text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-text-secondary before:mr-2 before:content-['—']",
  credential:
    "border-l-2 border-brand-aqua/80 py-0.5 pl-3 text-sm text-text-primary",
  inline:
    "text-sm text-text-secondary before:mr-1.5 before:text-brand-aqua before:content-['·'] first:before:content-none",
};

export function Badge({
  children,
  className,
  variant = "editorial",
}: BadgeProps) {
  return (
    <span className={cn("inline-block", variantStyles[variant], className)}>
      {children}
    </span>
  );
}
