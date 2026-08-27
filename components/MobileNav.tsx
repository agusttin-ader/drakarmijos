"use client";

import Link from "next/link";
import { Calendar, Home, Layers, Quote, UserRound } from "lucide-react";
import { useBookingModal } from "@/components/providers/booking-modal-provider";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const mobileNavItems = [
  { href: "/#hero", label: "Inicio", icon: Home, action: "scroll" as const },
  { href: "/#about", label: "Sobre mí", icon: UserRound, action: "scroll" as const },
  { href: "/#specialties", label: "Áreas", icon: Layers, action: "scroll" as const },
  {
    href: "/#testimonials",
    label: "Opiniones",
    icon: Quote,
    action: "scroll" as const,
  },
  { href: "/#booking", label: siteData.cta.bookShort, icon: Calendar, action: "booking" as const },
] as const;

export function MobileNav() {
  const { open } = useBookingModal();

  return (
    <nav
      data-mobile-nav
      aria-label="Navegación móvil"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/10 bg-background/95 shadow-nav md:hidden"
    >
      <ul className="mx-auto grid max-w-lg grid-cols-5 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1.5">
        {mobileNavItems.map(({ href, label, icon: Icon, action }) => {
          const isBooking = action === "booking";

          const itemClassName = cn(
            "flex w-full flex-col items-center gap-0.5 px-1 py-1 text-[10px] font-medium leading-none transition-all duration-300",
            "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isBooking
              ? "text-primary"
              : "text-text-secondary hover:text-primary active:text-primary",
          );

          return (
            <li key={href}>
              {isBooking ? (
                <button type="button" onClick={open} className={itemClassName}>
                  <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-white shadow-soft">
                    <Icon className="size-4 stroke-[1.75]" aria-hidden />
                  </span>
                  <span className="leading-tight">{label}</span>
                </button>
              ) : (
                <Link href={href} className={itemClassName}>
                  <Icon className="size-4 stroke-[1.5]" aria-hidden />
                  <span className="leading-tight">{label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
