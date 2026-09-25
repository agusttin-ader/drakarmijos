import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = {
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"div">, "className" | "children">;

export function Container({ className, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-container px-4 sm:px-5 md:px-8 lg:px-12 xl:px-14",
        "2xl:max-w-container-2xl 2xl:px-16",
        "3xl:max-w-container-3xl 3xl:px-20",
        "4xl:max-w-container-4xl 4xl:px-24",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
