"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "@/components/ui/form-field";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export const visitReasons = [
  { value: "respira-mejor", label: "Respirá Mejor — ORL (oído, nariz, garganta)" },
  { value: "dormi-mejor", label: "Dormí Mejor — Ronquidos y apnea del sueño" },
  { value: "alergia-sueno", label: "Alergia y respiración nasal" },
  { value: "bruxismo-sueno", label: "Bruxismo y calidad del sueño" },
  { value: "pediatria-orl", label: "Pediatría ORL — niños" },
  { value: "atencion-integral", label: "Atención Integral — Consultas ORL generales" },
] as const;

export type BookingFormValues = {
  name: string;
  phone: string;
  reason: string;
  message: string;
  consent: boolean;
};

type BookingFormProps = {
  variant?: "default" | "compact";
  onSuccess?: () => void;
  className?: string;
};

export function BookingForm({
  variant = "default",
  onSuccess,
  className,
}: BookingFormProps) {
  const isCompact = variant === "compact";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      reason: "",
      message: "",
      consent: false,
    },
  });

  const onSubmit = handleSubmit((values) => {
    const reasonLabel =
      visitReasons.find((reason) => reason.value === values.reason)?.label ??
      values.reason;

    const lines = [
      "Hola, quiero coordinar una consulta.",
      `Nombre: ${values.name.trim()}`,
      `Teléfono: ${values.phone.trim()}`,
      `Motivo: ${reasonLabel}`,
    ];

    const note = values.message.trim();
    if (note) {
      lines.push(`Mensaje: ${note}`);
    }

    // Queda constancia del consentimiento en el propio mensaje.
    lines.push("Acepto el aviso de privacidad del sitio.");

    const url = `https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;

    // Si el navegador bloquea la pestaña nueva, navegamos en la actual para no
    // perder la solicitud del paciente.
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.assign(url);
    }

    reset();
    onSuccess?.();
  });

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-label="Formulario de reserva de consulta"
      className={cn(isCompact ? "space-y-3" : "space-y-5", className)}
    >
      <div className={cn(isCompact && "grid gap-3 sm:grid-cols-2")}>
        <FloatingInput
          label="Nombre completo"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          error={errors.name?.message}
          {...register("name", {
            required: "Ingresá tu nombre completo",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres",
            },
          })}
        />

        <FloatingInput
          label="Teléfono / WhatsApp"
          type="tel"
          autoComplete="tel"
          aria-invalid={Boolean(errors.phone)}
          error={errors.phone?.message}
          {...register("phone", {
            required: "Ingresá un teléfono de contacto",
            minLength: {
              value: 8,
              message: "Ingresá un número válido",
            },
          })}
        />
      </div>

      <FloatingSelect
        label="Motivo de consulta"
        options={[...visitReasons]}
        required
        aria-invalid={Boolean(errors.reason)}
        error={errors.reason?.message}
        {...register("reason", {
          required: "Seleccioná un motivo de consulta",
        })}
      />

      <FloatingTextarea
        label="Mensaje (opcional)"
        rows={isCompact ? 2 : 4}
        aria-invalid={Boolean(errors.message)}
        error={errors.message?.message}
        className={cn(isCompact && "min-h-[4.5rem] resize-none")}
        {...register("message")}
      />

      <Button
        type="submit"
        variant="primary"
        className="w-full gap-2.5 sm:w-auto"
        disabled={isSubmitting}
      >
        <WhatsAppIcon className="size-4" />
        Continuar en WhatsApp
      </Button>

      <p className="text-xs leading-relaxed text-text-secondary">
        Al continuar se abre WhatsApp con tus datos ya escritos para que envíes
        el mensaje.
      </p>
    </form>
  );
}
