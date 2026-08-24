import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PhotoFrameProps = {
  children: ReactNode;
  className?: string;
  caption?: ReactNode;
};

/** Marco editorial unificado para fotos clínicas. */
export function PhotoFrame({ children, className, caption }: PhotoFrameProps) {
  return (
    <figure className={cn("photo-frame", className)}>
      {children}
      {caption ? (
        <figcaption className="border-t border-primary/8 bg-background/95 px-5 py-3.5 text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-text-secondary backdrop-blur-sm sm:px-6">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
