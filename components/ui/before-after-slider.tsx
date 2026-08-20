"use client";

import { useReducedMotion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";

export type BeforeAfterSliderProps = {
  beforeSrc?: string;
  afterSrc?: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

type ComparisonLayerProps = {
  src?: string;
  alt: string;
  variant: "before" | "after";
  placeholderLabel: string;
};

function ComparisonLayer({
  src,
  alt,
  variant,
  placeholderLabel,
}: ComparisonLayerProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 85vw, 33vw"
      />
    );
  }

  return (
    <>
      <div
        className={cn(
          "absolute inset-0",
          variant === "before"
            ? "bg-gradient-to-br from-primary/15 via-primary-light/25 to-background-alt"
            : "bg-gradient-to-br from-primary-light/20 via-primary/20 to-accent-sage/20",
        )}
        aria-hidden
      />
      <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-xs leading-relaxed text-text-secondary/75">
        {placeholderLabel}
      </span>
      <span className="sr-only">{alt}</span>
    </>
  );
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  className,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const [position, setPosition] = useState(50);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const percent = Math.min(
      100,
      Math.max(0, ((clientX - rect.left) / rect.width) * 100),
    );
    setPosition(percent);
  }, []);

  const startDrag = useCallback(
    (clientX: number) => {
      setHasInteracted(true);
      isDraggingRef.current = true;
      setIsDragging(true);
      updatePosition(clientX);
    },
    [updatePosition],
  );

  const stopDrag = useCallback(() => {
    isDraggingRef.current = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      if (!isDraggingRef.current) return;
      updatePosition(event.clientX);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
    };
  }, [stopDrag, updatePosition]);

  const handleContainerPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    startDrag(event.clientX);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    setHasInteracted(true);

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((current) => Math.max(0, current - 5));
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((current) => Math.min(100, current + 5));
    }
  };

  return (
    <figure className={cn("relative", className)}>
      <div
        ref={containerRef}
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-[0.5rem_1.25rem_0.5rem_1.25rem] bg-background-alt ring-1 ring-primary/10 select-none touch-none",
          isDragging && "cursor-ew-resize",
        )}
        onPointerDown={handleContainerPointerDown}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-between px-4 pt-4">
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/85 drop-shadow-[0_1px_2px_rgba(27,42,46,0.35)]">
            Antes
          </span>
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/85 drop-shadow-[0_1px_2px_rgba(27,42,46,0.35)]">
            Después
          </span>
        </div>

        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <ComparisonLayer
              src={beforeSrc}
              alt={beforeAlt}
              variant="before"
              placeholderLabel="Antes — reemplazar con foto clínica"
            />
          </div>
        </div>

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <div className="relative h-full w-full">
            <ComparisonLayer
            src={afterSrc}
            alt={afterAlt}
            variant="after"
            placeholderLabel="Después — reemplazar con foto clínica"
          />
          </div>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-white/75 shadow-[0_0_10px_rgba(15,92,92,0.12)]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
        />

        <div
          className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${position}%` }}
        >
          <button
            type="button"
            role="slider"
            aria-label="Arrastrar para comparar antes y después"
            aria-valuenow={Math.round(position)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-orientation="horizontal"
            onKeyDown={handleKeyDown}
            onPointerDown={(event) => {
              event.stopPropagation();
              startDrag(event.clientX);
            }}
            className={cn(
              "flex size-10 items-center justify-center rounded-full border border-white/90 bg-background/95 text-primary shadow-[0_4px_20px_-4px_rgba(15,92,92,0.3)] transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background-alt",
              !hasInteracted && !shouldReduceMotion && "animate-handle-hint",
              isDragging ? "cursor-grabbing" : "cursor-ew-resize",
            )}
          >
            <MoveHorizontal className="size-4 stroke-[1.5]" aria-hidden />
          </button>
        </div>
      </div>

      <figcaption className="sr-only">
        {beforeAlt}. {afterAlt}.
      </figcaption>
    </figure>
  );
}
