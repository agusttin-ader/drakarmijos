import Image from "next/image";
import { cn } from "@/lib/utils";

/** Fondo de marca visible mientras la imagen carga y cuando todavía no hay foto. */
export const brandSurfaceGradient =
  "bg-[linear-gradient(145deg,#F1ECE4_0%,#FAF8F5_55%,#EDE8DF_100%)]";

const aspectRatioClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  hero: "aspect-[16/9] min-h-[400px]",
} as const;

type SharedProps = {
  className?: string;
  aspectRatio?: keyof typeof aspectRatioClasses;
};

type PendingProps = SharedProps & {
  src?: undefined;
  /** Texto visible mientras no haya foto real. */
  label?: string;
};

type LoadedProps = SharedProps & {
  src: string;
  /** Obligatorio cuando hay foto: describe la imagen para lectores de pantalla. */
  alt: string;
  priority?: boolean;
  sizes?: string;
};

type ImagePlaceholderProps = PendingProps | LoadedProps;

export function ImagePlaceholder(props: ImagePlaceholderProps) {
  const { className, aspectRatio = "landscape" } = props;

  const frameClassName = cn(
    "relative flex items-center justify-center overflow-hidden",
    brandSurfaceGradient,
    aspectRatioClasses[aspectRatio],
    className,
  );

  if (props.src !== undefined) {
    const { src, alt, priority = false, sizes = "(max-width: 1024px) 90vw, 45vw" } = props;

    return (
      <div className={frameClassName}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          quality={90}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const label = props.label ?? "Foto pendiente — reemplazar con imagen real";

  return (
    <div className={frameClassName} role="img" aria-label={label}>
      <span className="max-w-[220px] px-4 text-center text-sm text-text-secondary">
        {label}
      </span>
    </div>
  );
}
