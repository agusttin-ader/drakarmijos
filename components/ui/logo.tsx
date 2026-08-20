import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_WIDTH = 336;
const LOGO_HEIGHT = 332;

type LogoProps = {
  variant?: "header" | "footer";
  priority?: boolean;
  className?: string;
};

const variantConfig = {
  header: {
    ariaLabel: "Dra. Karla Armijos — Inicio",
    linkClassName:
      "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    imageClassName: "h-10 w-auto object-contain sm:h-11",
    sizes: "(max-width: 768px) 40px, 44px",
  },
  footer: {
    ariaLabel: "Dra. Karla Armijos — Inicio",
    linkClassName:
      "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
    imageClassName: "h-12 w-auto object-contain sm:h-14",
    sizes: "(max-width: 768px) 48px, 56px",
  },
} as const;

export function Logo({
  variant = "header",
  priority = false,
  className,
}: LogoProps) {
  const config = variantConfig[variant];

  return (
    <Link
      href="/"
      aria-label={config.ariaLabel}
      className={cn("inline-flex shrink-0", config.linkClassName, className)}
    >
      <Image
        src="/images/logo.png"
        alt=""
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        unoptimized
        sizes={config.sizes}
        className={cn("block", config.imageClassName)}
      />
    </Link>
  );
}
