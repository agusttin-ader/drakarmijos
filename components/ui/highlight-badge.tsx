import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";

export const highlightAssets = {
  orl: {
    src: "/images/highlights/orl.png",
    alt: "Otorrinolaringología — oído, nariz y garganta",
  },
  dormirBien: {
    src: "/images/highlights/dormir-bien.png",
    alt: "Dormir bien",
  },
} as const;

export type HighlightVariant = keyof typeof highlightAssets;

const HIGHLIGHT_SIZE = 512;

type HighlightBadgeProps = {
  variant: HighlightVariant;
  className?: string;
};

export function HighlightBadge({ variant, className }: HighlightBadgeProps) {
  const asset = highlightAssets[variant];

  return (
    <SiteImage
      src={asset.src}
      alt={asset.alt}
      width={HIGHLIGHT_SIZE}
      height={HIGHLIGHT_SIZE}
      sizes="48px"
      className={cn("size-12 object-contain", className)}
    />
  );
}
