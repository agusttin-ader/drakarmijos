"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookConsultButton } from "@/components/book-consult-button";
import { useBookingModal } from "@/components/providers/booking-modal-provider";
import { useScrollContext } from "@/components/providers/smooth-scroll-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock";
import { motionTransition } from "@/lib/motion";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Sobre mí", href: "#about" },
  { label: "Especialidades", href: "#specialties" },
  { label: "Consulta", href: "#consulta" },
  { label: "Opiniones", href: "#testimonials" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "#booking" },
] as const;

const HIDE_SCROLL_THRESHOLD = 48;

export function Navbar() {
  const { lenis } = useScrollContext();
  const { open: openBooking } = useBookingModal();
  const shouldReduceMotion = useReducedMotion();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useScrollLock(isMenuOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-menu-open", isMenuOpen);
    return () => {
      document.documentElement.removeAttribute("data-menu-open");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = (scroll: number, direction: number) => {
      const atTop = scroll <= HIDE_SCROLL_THRESHOLD;
      setIsAtTop(atTop);

      if (shouldReduceMotion || isMenuOpen) {
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
  }, [lenis, shouldReduceMotion, isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) setIsMenuOpen(false);
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const onDarkChrome = isAtTop && !isMenuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out motion-reduce:transition-none",
          isHidden && !shouldReduceMotion && !isMenuOpen
            ? "-translate-y-[calc(100%+0.5rem)] pointer-events-none"
            : "translate-y-0",
        )}
      >
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-background/90 backdrop-blur-md transition-opacity duration-500 ease-out motion-reduce:transition-none",
            onDarkChrome ? "opacity-0" : "opacity-100",
          )}
        />
        <div
          aria-hidden
          className={cn(
            "absolute inset-x-0 bottom-0 h-px bg-primary/10 transition-opacity duration-500 ease-out motion-reduce:transition-none",
            onDarkChrome ? "opacity-0" : "opacity-100",
          )}
        />

        <Container className="relative flex h-16 items-center justify-between gap-3 sm:h-[4.25rem] sm:gap-4 lg:h-[4.75rem] 2xl:h-20 3xl:h-[5.5rem]">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
            <Logo variant="header" priority onDark={onDarkChrome} />

            <Link
              href="/"
              onClick={closeMenu}
              className={cn(
                "min-w-0 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                onDarkChrome
                  ? "focus-visible:ring-brand-aqua focus-visible:ring-offset-transparent"
                  : "focus-visible:ring-offset-background",
              )}
            >
              <span
                className={cn(
                  "block truncate font-script text-[1.35rem] leading-none tracking-normal sm:text-[1.5rem] 2xl:text-[1.65rem]",
                  onDarkChrome ? "text-white" : "text-text-primary",
                )}
              >
                {siteData.doctor.shortName}
              </span>
              <span
                className={cn(
                  "mt-1 hidden truncate text-[0.625rem] font-medium uppercase tracking-[0.16em] sm:block lg:text-[0.6875rem]",
                  onDarkChrome ? "text-white/70" : "text-text-secondary/80",
                )}
              >
                {siteData.doctor.title}
              </span>
            </Link>
          </div>

          <nav
            aria-label="Principal"
            className="hidden items-center gap-3.5 lg:flex xl:gap-6 2xl:gap-8"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md text-sm transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 2xl:text-[0.9375rem]",
                  onDarkChrome
                    ? "text-white/80 hover:text-white focus-visible:ring-brand-aqua focus-visible:ring-offset-transparent"
                    : "text-text-secondary hover:text-primary focus-visible:ring-primary focus-visible:ring-offset-background",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <a
              href={`tel:${siteData.contact.phoneHref}`}
              className={cn(
                "hidden rounded-md text-xs font-medium tabular-nums tracking-wide xl:inline-block 2xl:text-sm",
                onDarkChrome
                  ? "text-white/85 hover:text-white"
                  : "text-text-secondary hover:text-primary",
              )}
            >
              {siteData.contact.phone}
            </a>
            <BookConsultButton
              variant="primary"
              aria-label="Pedir turno"
              className={cn(
                "hidden px-4 py-2.5 text-xs sm:inline-flex sm:px-5 sm:text-sm",
                onDarkChrome &&
                  "bg-brand-aqua text-primary before:bg-primary/35 hover:bg-brand-aqua/90",
              )}
            >
              Pedir turno
            </BookConsultButton>

            <button
              ref={menuButtonRef}
              type="button"
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-md lg:hidden",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                onDarkChrome
                  ? "text-white focus-visible:ring-brand-aqua focus-visible:ring-offset-transparent"
                  : "text-text-primary focus-visible:ring-primary focus-visible:ring-offset-background",
              )}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
              aria-controls={menuId}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? (
                <X className="size-5 stroke-[1.5]" aria-hidden />
              ) : (
                <Menu className="size-5 stroke-[1.5]" aria-hidden />
              )}
            </button>
          </div>
        </Container>
      </header>

      {mounted
        ? createPortal(
            <AnimatePresence>
              {isMenuOpen ? (
                <motion.div
                  id={menuId}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menú de navegación"
                  initial={shouldReduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0 }}
                  transition={
                    shouldReduceMotion ? { duration: 0 } : motionTransition
                  }
                  className="fixed inset-0 z-40 bg-background lg:hidden"
                >
                  <div className="flex h-full flex-col px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-20 sm:px-6">
                    <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto">
                      <ul className="divide-y divide-primary/10 border-y border-primary/10">
                        {navLinks.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={closeMenu}
                              className="block py-4 font-display text-xl font-light text-text-primary transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </nav>

                    <div className="mt-6 space-y-4 border-t border-primary/10 pt-6">
                      <a
                        href={`tel:${siteData.contact.phoneHref}`}
                        className="block text-sm font-medium tabular-nums text-text-secondary"
                      >
                        {siteData.contact.phone}
                      </a>
                      <Button
                        type="button"
                        variant="primary"
                        className="w-full"
                        aria-label="Pedir turno"
                        onClick={() => {
                          closeMenu();
                          openBooking();
                        }}
                      >
                        Pedir turno
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
