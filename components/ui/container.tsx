import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Container<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: ContainerProps<T>) {
  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full max-w-container px-4 sm:px-6 md:px-8 lg:px-16",
        "2xl:max-w-container-2xl 2xl:px-20",
        "3xl:max-w-container-3xl 3xl:px-24",
        "4xl:max-w-container-4xl 4xl:px-28",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
