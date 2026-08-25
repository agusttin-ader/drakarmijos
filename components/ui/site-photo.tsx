import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";

const brandSurfaceGradient =
  "bg-[linear-gradient(145deg,#E8E0D4_0%,#F0E6D8_55%,#D9CCB8_100%)]";

type SitePhotoProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
};

/** Foto clínica en marco portrait con fondo de marca. */
export function SitePhoto({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 1024px) 90vw, 45vw",
  objectPosition = "object-center",
}: SitePhotoProps) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] min-w-0 overflow-hidden",
        brandSurfaceGradient,
        className,
      )}
    >
      <SiteImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", objectPosition)}
      />
    </div>
  );
}
