import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subheading?: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  id?: string;
  /** editorial: dash + title inline · minimal: title only · statement: large with side rule */
  variant?: "default" | "editorial" | "minimal" | "statement";
};

export function SectionHeading({
  eyebrow,
  title,
  subheading,
  className,
  align = "left",
  id,
  variant = "default",
}: SectionHeadingProps) {
  if (variant === "minimal") {
    return (
      <header className={cn("max-w-2xl", className)}>
        <h2
          id={id}
          className="font-display text-3xl leading-[1.12] tracking-tight text-text-primary sm:text-4xl lg:text-[2.65rem]"
        >
          {title}
        </h2>
        {subheading ? (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-text-secondary sm:text-lg">
            {subheading}
          </p>
        ) : null}
      </header>
    );
  }

  if (variant === "editorial") {
    return (
      <header
        className={cn(
          "max-w-3xl",
          align === "center" && "mx-auto text-center",
          className,
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6",
            align === "center" && "sm:flex-col sm:items-center",
          )}
        >
          {eyebrow ? (
            <p className="shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-text-secondary">
              {eyebrow}
            </p>
          ) : null}
          <div
            className={cn(
              "min-w-0 flex-1 border-primary/15 sm:border-t sm:pt-4",
              align === "center" && "sm:border-t-0 sm:pt-0",
            )}
          >
            <h2
              id={id}
              className="font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.1] tracking-tight text-text-primary"
            >
              {title}
            </h2>
          </div>
        </div>
        {subheading ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:mt-6 sm:text-[1.0625rem] sm:leading-8">
            {subheading}
          </p>
        ) : null}
      </header>
    );
  }

  if (variant === "statement") {
    return (
      <header
        className={cn(
          "grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-12 xl:gap-16",
          className,
        )}
      >
        <h2
          id={id}
          className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-tight text-text-primary"
        >
          {title}
        </h2>
        {subheading ? (
          <p className="border-l border-accent-gold/50 pl-5 text-sm leading-relaxed text-text-secondary sm:text-base sm:leading-7 lg:mb-1">
            {subheading}
          </p>
        ) : null}
      </header>
    );
  }

  return (
    <header
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        align === "right" && "ml-auto text-right",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-text-secondary">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="font-display text-3xl leading-[1.15] tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem]"
      >
        {title}
      </h2>
      {subheading ? (
        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          {subheading}
        </p>
      ) : null}
    </header>
  );
}
