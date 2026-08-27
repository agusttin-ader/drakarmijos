import Link from "next/link";
import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: "header" | "footer";
  /** Forzar emblema blanco (nav sobre foto oscura). */
  onDark?: boolean;
  priority?: boolean;
  className?: string;
};

const variantConfig = {
  header: {
    src: "/images/ui/logo-128.png",
    ariaLabel: "Dra. Karla Armijos — Inicio",
    linkClassName:
      "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    imageClassName: "h-10 w-auto object-contain sm:h-11",
    sizes: "(max-width: 768px) 40px, 44px",
    width: 128,
    height: 128,
  },
  footer: {
    src: "/images/ui/logo-white-256.png",
    ariaLabel: "Dra. Karla Armijos — Inicio",
    linkClassName:
      "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
    imageClassName: "h-12 w-auto object-contain sm:h-14",
    sizes: "(max-width: 768px) 48px, 56px",
    width: 256,
    height: 256,
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
    variant === "header" && onDark
      ? "/images/ui/logo-white-128.png"
      : config.src;

  return (
    <Link
      href="/"
      aria-label={config.ariaLabel}
      className={cn("inline-flex shrink-0", config.linkClassName, className)}
    >
      <SiteImage
        src={src}
        alt=""
        width={config.width}
        height={config.height}
        priority={priority}
        sizes={config.sizes}
        className={cn("block", config.imageClassName)}
      />
    </Link>
  );
}
