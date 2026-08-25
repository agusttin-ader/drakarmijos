import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type DoctorNameProps = ComponentPropsWithoutRef<"p" | "span"> & {
  as?: "p" | "span";
};

/** Tipografía de marca exclusiva para el nombre — Cormorant Garamond. */
export function DoctorName({
  as: Tag = "p",
  className,
  children,
  ...props
}: DoctorNameProps) {
  return (
    <Tag
      className={cn(
        "font-brand font-medium tracking-[-0.015em]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
