import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subheading?: ReactNode;
  className?: string;
  id?: string;
};

/** Encabezado editorial de sección (eyebrow + título + subtítulo). */
export function SectionHeading({
  eyebrow,
  title,
  subheading,
  className,
  id,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6">
        {eyebrow ? (
          <p className="eyebrow shrink-0">{eyebrow}</p>
        ) : null}
        <div className="min-w-0 flex-1 border-primary/15 sm:border-t sm:pt-4">
          <h2
            id={id}
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-light leading-[1.1] tracking-tight text-text-primary 2xl:text-[clamp(2.25rem,2.2vw,3.25rem)] 3xl:text-[3.5rem]"
          >
            {title}
          </h2>
        </div>
      </div>
      {subheading ? (
        <p className="prose-measure mt-5 text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-[1.0625rem] sm:leading-8 2xl:mt-8 2xl:text-lg 2xl:leading-8">
          {subheading}
        </p>
      ) : null}
    </header>
  );
}
