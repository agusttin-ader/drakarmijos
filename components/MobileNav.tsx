"use client";

import Link from "next/link";
import { Calendar, Home, Layers, Quote, UserRound } from "lucide-react";
import { useBookingModal } from "@/components/providers/booking-modal-provider";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { href: "#hero", label: "Inicio", icon: Home, action: "scroll" as const },
  { href: "#about", label: "Sobre mí", icon: UserRound, action: "scroll" as const },
  { href: "#specialties", label: "Áreas", icon: Layers, action: "scroll" as const },
  {
    href: "#testimonials",
    label: "Opiniones",
    icon: Quote,
    action: "scroll" as const,
  },
  { href: "#booking", label: "Turno", icon: Calendar, action: "booking" as const },
] as const;

export function MobileNav() {
  const { open } = useBookingModal();

  return (
    <nav
      data-mobile-nav
      aria-label="Navegación móvil"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/10 bg-background/95 backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {mobileNavItems.map(({ href, label, icon: Icon, action }) => (
          <li key={href}>
            {action === "booking" ? (
              <button
                type="button"
                onClick={open}
                className={cn(
                  "flex w-full flex-col items-center gap-0.5 px-1 py-1.5 text-[10px] font-medium text-text-secondary transition-colors",
                  "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "hover:text-primary active:text-primary",
                )}
              >
                <Icon className="size-[1.125rem] stroke-[1.5]" aria-hidden />
                <span className="leading-tight">{label}</span>
              </button>
            ) : (
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-1 py-1.5 text-[10px] font-medium text-text-secondary transition-colors",
                  "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  "hover:text-primary active:text-primary",
                )}
              >
                <Icon className="size-[1.125rem] stroke-[1.5]" aria-hidden />
                <span className="leading-tight">{label}</span>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
