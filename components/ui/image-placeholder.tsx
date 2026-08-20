import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  label?: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "hero";
};

const aspectRatioClasses = {
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  hero: "aspect-[16/9] min-h-[400px]",
} as const;

export function ImagePlaceholder({
  label = "Foto pendiente — reemplazar con imagen real",
  className,
  aspectRatio = "landscape",
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        "bg-[linear-gradient(145deg,#F1ECE4_0%,#FAF8F5_55%,#EDE8DF_100%)]",
        aspectRatioClasses[aspectRatio],
        className,
      )}
      role="img"
      aria-label={label}
    >
      <span className="max-w-[220px] px-4 text-center text-sm text-text-secondary">
        {label}
      </span>
    </div>
  );
}
