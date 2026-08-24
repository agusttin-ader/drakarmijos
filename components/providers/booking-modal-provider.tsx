"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { BookingForm } from "@/components/booking-form";
import { Button } from "@/components/ui/button";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock";
import { motionTransition } from "@/lib/motion";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type BookingModalContextValue = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(null);

export function useBookingModal() {
  const context = useContext(BookingModalContext);

  if (!context) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }

  return context;
}

function BookingModalOverlay() {
  const { isOpen, close } = useBookingModal();
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useScrollLock(isOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsSubmitted(false);
      return;
    }

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [close, isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <div className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Cerrar formulario"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={motionTransition}
            className="absolute inset-0 bg-text-primary/55 backdrop-blur-[2px]"
            onClick={close}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-modal-title"
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }
              }
              transition={motionTransition}
              className={cn(
                "pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-modal bg-background shadow-elevated ring-1 ring-primary/12",
              )}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative px-5 pb-5 pt-5 sm:px-7 sm:pb-7 sm:pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 border-l-2 border-brand-aqua pl-4 pr-2 sm:pl-5">
                    <p className="text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-text-secondary">
                      {siteData.cta.bookShort}
                    </p>
                    <h2
                      id="booking-modal-title"
                      className="mt-1 font-display text-2xl tracking-tight text-text-primary"
                    >
                      Reserva tu consulta
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      Completa el formulario y te responderé a la brevedad.
                    </p>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={close}
                    aria-label="Cerrar"
                    className="inline-flex size-9 shrink-0 items-center justify-center rounded-full text-text-primary/70 transition-colors hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <X className="size-4 stroke-[1.75]" aria-hidden />
                  </button>
                </div>

                <div className="mt-5">
                  {isSubmitted ? (
                    <div className="py-4 text-center" role="status">
                      <p className="font-display text-xl text-text-primary">
                        Te llevamos a WhatsApp
                      </p>
                      <p className="mt-2 text-sm text-text-secondary">
                        Tu mensaje ya está escrito con los datos del formulario.
                        Envíalo desde WhatsApp y te respondo con la cita más
                        cercana disponible.
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-6"
                        onClick={close}
                      >
                        Cerrar
                      </Button>
                    </div>
                  ) : (
                    <BookingForm onSuccess={() => setIsSubmitted(true)} />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

type BookingModalProviderProps = {
  children: ReactNode;
};

export function BookingModalProvider({ children }: BookingModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ open, close, isOpen }),
    [close, isOpen, open],
  );

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModalOverlay />
    </BookingModalContext.Provider>
  );
}
