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
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { useIsClient } from "@/lib/hooks/use-is-client";
import { useScrollLock } from "@/lib/hooks/use-scroll-lock";
import {
  modalBackdropTransition,
  modalPanelTransition,
  modalPanelVariants,
} from "@/lib/motion";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const BookingForm = dynamic(
  () => import("@/components/booking-form").then((m) => m.BookingForm),
  { ssr: false, loading: () => (
    <p className="py-8 text-center text-sm text-text-secondary" aria-live="polite">
      Cargando formulario…
    </p>
  ) },
);

type BookingModalContextValue = {
  open: () => void;
  close: () => void;
};

const BookingModalContext = createContext<BookingModalContextValue | null>(
  null,
);

export function useBookingModal() {
  const context = useContext(BookingModalContext);

  if (!context) {
    throw new Error("useBookingModal must be used within BookingModalProvider");
  }

  return context;
}

type BookingModalOverlayProps = {
  isOpen: boolean;
  close: () => void;
};

function BookingModalOverlay({ isOpen, close }: BookingModalOverlayProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const mounted = useIsClient();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    setIsSubmitted(false);
    close();
  }, [close]);

  useScrollLock(isOpen);

  useEffect(() => {
    void import("@/components/booking-form");
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 32);

    return () => {
      window.clearTimeout(focusTimer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    document.documentElement.dataset.bookingOpen = "true";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      delete document.documentElement.dataset.bookingOpen;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleClose, isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen ? (
        <div key="booking-modal-root" className="fixed inset-0 z-[100]">
          <motion.button
            type="button"
            aria-label="Cerrar formulario"
            className="absolute inset-0 bg-text-primary/55"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            transition={modalBackdropTransition}
            onClick={handleClose}
          />

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-modal-title"
              variants={shouldReduceMotion ? undefined : modalPanelVariants}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              exit={shouldReduceMotion ? undefined : "exit"}
              transition={modalPanelTransition}
              className={cn(
                "pointer-events-auto relative z-10 flex max-h-[min(100dvh-2rem,calc(100dvh-env(safe-area-inset-bottom)-1rem))] w-full max-w-lg flex-col overflow-hidden rounded-modal bg-background shadow-elevated ring-1 ring-primary/12",
              )}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative overflow-y-auto overscroll-contain px-5 pb-5 pt-5 will-change-auto sm:px-7 sm:pb-7 sm:pt-6">
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
                      Respuesta estimada: {siteData.contact.responseTime}.
                    </p>
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={handleClose}
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
                        onClick={handleClose}
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

  const value = useMemo(() => ({ open, close }), [close, open]);

  return (
    <BookingModalContext.Provider value={value}>
      {children}
      <BookingModalOverlay isOpen={isOpen} close={close} />
    </BookingModalContext.Provider>
  );
}
