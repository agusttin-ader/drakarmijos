import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type DoctorNameProps = ComponentPropsWithoutRef<"p" | "span"> & {
  as?: "p" | "span";
};

/** Tipografía de marca exclusiva para el nombre — Allura. */
export function DoctorName({
  as: Tag = "p",
  className,
  children,
  ...props
}: DoctorNameProps) {
  return (
    <Tag
      className={cn(
        "font-brand font-normal tracking-normal",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
