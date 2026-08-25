import { Moon, Wind, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const highlightIcons = {
  orl: Wind,
  dormirBien: Moon,
} as const satisfies Record<string, LucideIcon>;

export type HighlightVariant = keyof typeof highlightIcons;

type HighlightBadgeProps = {
  variant: HighlightVariant;
  className?: string;
};

/** Icono de área (sin PNG externos — menos peso y cero roturas). */
export function HighlightBadge({ variant, className }: HighlightBadgeProps) {
  const Icon = highlightIcons[variant];

  return (
    <Icon
      aria-hidden
      className={cn("size-10 stroke-[1.5] text-primary sm:size-12", className)}
    />
  );
}
