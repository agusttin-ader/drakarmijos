import Image from "next/image";
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
      <Image
        src="/images/logo-white.png"
        alt=""
        width={2474}
        height={2474}
        sizes="(max-width: 768px) 420px, 680px"
        className="aspect-square h-auto w-[clamp(320px,62vw,680px)] max-w-none -translate-x-[18%] translate-y-[18%] object-contain"
        priority={false}
      />
    </div>
  );
}
