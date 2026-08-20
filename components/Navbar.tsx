"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookConsultButton } from "@/components/book-consult-button";
import { useScrollContext } from "@/components/providers/smooth-scroll-provider";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Especialidades", href: "#specialties" },
  { label: "Resultados", href: "#before-after" },
  { label: "Sobre mí", href: "#about" },
  { label: "Testimonios", href: "#testimonials" },
  { label: "Contacto", href: "#booking" },
] as const;

const HIDE_SCROLL_THRESHOLD = 48;

export function Navbar() {
  const { lenis } = useScrollContext();
  const shouldReduceMotion = useReducedMotion();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = (scroll: number, direction: number) => {
      const atTop = scroll <= HIDE_SCROLL_THRESHOLD;
      setIsAtTop(atTop);

      if (shouldReduceMotion) {
        setIsHidden(false);
        lastScrollY.current = scroll;
        return;
      }

      if (atTop) {
        setIsHidden(false);
        lastScrollY.current = scroll;
        return;
      }

      if (direction === -1) {
        setIsHidden(true);
      } else if (direction === 1) {
        setIsHidden(false);
      }

      lastScrollY.current = scroll;
    };

    if (lenis) {
      const onLenisScroll = () => handleScroll(lenis.scroll, lenis.direction);

      onLenisScroll();
      lenis.on("scroll", onLenisScroll);
      return () => lenis.off("scroll", onLenisScroll);
    }

    handleScroll(window.scrollY, 0);

    const onNativeScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY.current ? -1 : 1;
      handleScroll(currentScrollY, direction);
    };

    window.addEventListener("scroll", onNativeScroll, { passive: true });
    return () => window.removeEventListener("scroll", onNativeScroll);
  }, [lenis, shouldReduceMotion]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-[2px] z-50 transition-transform duration-500 ease-out motion-reduce:transition-none",
        isHidden && !shouldReduceMotion
          ? "-translate-y-[calc(100%+0.5rem)] pointer-events-none"
          : "translate-y-0",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-background-alt/95 backdrop-blur-md transition-opacity duration-500 ease-out motion-reduce:transition-none",
          isAtTop ? "opacity-0" : "opacity-100",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bg-primary/10 transition-opacity duration-500 ease-out motion-reduce:transition-none",
          isAtTop ? "opacity-0" : "opacity-100",
        )}
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 opacity-0 shadow-[0_8px_30px_-18px_rgba(15,92,92,0.35)] transition-opacity duration-500 ease-out motion-reduce:transition-none",
          !isAtTop && "opacity-100",
        )}
      />

      <Container className="relative flex h-16 items-center justify-between gap-3 sm:h-[4.25rem] sm:gap-4 lg:h-[4.75rem]">
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
          <Logo variant="header" priority />

          <Link
            href="/"
            className="min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="block truncate font-display text-[0.8125rem] leading-snug tracking-tight text-text-primary/90 sm:text-sm lg:text-[0.9375rem]">
              {siteData.doctor.name}
            </span>
            <span className="mt-0.5 hidden truncate text-[0.625rem] font-medium uppercase tracking-[0.16em] text-text-secondary/75 sm:block lg:text-[0.6875rem]">
              {siteData.doctor.title}
            </span>
          </Link>
        </div>

        <nav
          aria-label="Principal"
          className="hidden items-center gap-5 md:flex lg:gap-7 xl:gap-8"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md text-sm text-text-secondary transition-colors duration-300 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <BookConsultButton
          variant="primary"
          aria-label="Reservar consulta"
          className="px-4 py-2.5 text-xs sm:px-5 sm:text-sm"
        >
          <span className="sm:hidden">Reservar</span>
          <span className="hidden sm:inline">Reservar consulta</span>
        </BookConsultButton>
      </Container>
    </header>
  );
}
