import Link from "next/link";
import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";

/** Emblema cuadrado extraído del manual de marca (scripts/build-brand-assets.py). */
const LOGO_WIDTH = 2474;
const LOGO_HEIGHT = 2474;

type LogoProps = {
  variant?: "header" | "footer";
  /** Forzar emblema blanco (nav sobre foto oscura). */
  onDark?: boolean;
  priority?: boolean;
  className?: string;
};

const variantConfig = {
  header: {
    src: "/images/logo.png",
    ariaLabel: "Dra. Karla Armijos — Inicio",
    linkClassName:
      "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    imageClassName: "h-10 w-auto object-contain sm:h-11",
    sizes: "(max-width: 768px) 40px, 44px",
  },
  footer: {
    src: "/images/logo-white.png",
    ariaLabel: "Dra. Karla Armijos — Inicio",
    linkClassName:
      "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
    imageClassName: "h-12 w-auto object-contain sm:h-14",
    sizes: "(max-width: 768px) 48px, 56px",
  },
} as const;

export function Logo({
  variant = "header",
  onDark = false,
  priority = false,
  className,
}: LogoProps) {
  const config = variantConfig[variant];
  const src =
    variant === "header" && onDark ? "/images/logo-white.png" : config.src;

  return (
    <Link
      href="/"
      aria-label={config.ariaLabel}
      className={cn("inline-flex shrink-0", config.linkClassName, className)}
    >
      <SiteImage
        src={src}
        alt=""
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        priority={priority}
        sizes={config.sizes}
        className={cn("block", config.imageClassName)}
      />
    </Link>
  );
}
