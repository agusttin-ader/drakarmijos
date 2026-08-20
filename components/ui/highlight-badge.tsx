import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const highlightAssets = {
  orl: {
    src: "/images/highlights/orl.png",
    alt: "Otorrinolaringología — oído, nariz y garganta",
    label: "#ORL",
  },
  turnos: {
    src: "/images/highlights/turnos.png",
    alt: "Turnos y consultas",
    label: "#Turnos",
  },
  dormirBien: {
    src: "/images/highlights/dormir-bien.png",
    alt: "Dormir bien",
    label: "#DormirBien",
  },
} as const;

export type HighlightVariant = keyof typeof highlightAssets;

const HIGHLIGHT_SIZE = 512;

const sizeClasses = {
  sm: "size-12",
  md: "size-16",
  lg: "size-20",
} as const;

type HighlightBadgeProps = {
  variant: HighlightVariant;
  size?: keyof typeof sizeClasses;
  className?: string;
  href?: string;
  showLabel?: boolean;
};

export function HighlightBadge({
  variant,
  size = "md",
  className,
  href,
  showLabel = false,
}: HighlightBadgeProps) {
  const asset = highlightAssets[variant];
  const image = (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={HIGHLIGHT_SIZE}
      height={HIGHLIGHT_SIZE}
      unoptimized
      className={cn("object-contain", sizeClasses[size], className)}
    />
  );

  const content = (
    <figure className={cn("inline-flex flex-col items-center gap-2", showLabel && "gap-2.5")}>
      {image}
      {showLabel ? (
        <figcaption className="text-[0.625rem] font-medium uppercase tracking-[0.12em] text-text-secondary/70">
          {asset.label}
        </figcaption>
      ) : null}
    </figure>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        aria-label={asset.alt}
      >
        {content}
      </Link>
    );
  }

  return content;
}

type HighlightDecorProps = {
  className?: string;
};

export function FooterHighlightDecor({ className }: HighlightDecorProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <Image
        src={highlightAssets.orl.src}
        alt=""
        width={HIGHLIGHT_SIZE}
        height={HIGHLIGHT_SIZE}
        unoptimized
        className="absolute -right-2 top-8 size-14 opacity-[0.12] sm:size-16 lg:right-12 lg:top-16 lg:size-20"
      />
      <Image
        src={highlightAssets.turnos.src}
        alt=""
        width={HIGHLIGHT_SIZE}
        height={HIGHLIGHT_SIZE}
        unoptimized
        className="absolute bottom-24 right-16 size-12 opacity-[0.1] sm:size-14 lg:bottom-28 lg:right-32 lg:size-[4.5rem]"
      />
      <Image
        src={highlightAssets.dormirBien.src}
        alt=""
        width={HIGHLIGHT_SIZE}
        height={HIGHLIGHT_SIZE}
        unoptimized
        className="absolute bottom-8 left-[58%] size-11 opacity-[0.11] sm:size-[3.25rem] lg:bottom-12 lg:left-[62%] lg:size-16"
      />
    </div>
  );
}
