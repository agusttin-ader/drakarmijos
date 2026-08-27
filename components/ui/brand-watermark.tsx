import { SiteImage } from "@/components/ui/site-image";
import { cn } from "@/lib/utils";

type BrandWatermarkProps = {
  className?: string;
};

export function BrandWatermark({ className }: BrandWatermarkProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute bottom-0 left-0 z-0 select-none opacity-[0.08]",
        className,
      )}
    >
      <SiteImage
        src="/images/ui/logo-white-680.png"
        alt=""
        width={680}
        height={680}
        sizes="(max-width: 768px) 320px, 520px"
        className="aspect-square h-auto w-[clamp(280px,55vw,520px)] max-w-none -translate-x-[18%] translate-y-[18%] object-contain"
      />
    </div>
  );
}
