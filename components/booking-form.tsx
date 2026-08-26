"use client";

import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "@/components/ui/form-field";
import { WhatsAppIcon } from "@/components/ui/social-icons";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const visitReasons = [
  { value: "respira-mejor", label: "Respira Mejor — ORL (oído, nariz, garganta)" },
  { value: "dormi-mejor", label: "Duerme Mejor — Ronquidos y apnea del sueño" },
  { value: "alergia-sueno", label: "Alergia y respiración nasal" },
  { value: "bruxismo-sueno", label: "Bruxismo y calidad del sueño" },
  { value: "pediatria-orl", label: "Pediatría ORL — niños" },
  { value: "atencion-integral", label: "Atención Integral — Consultas ORL generales" },
] as const;

type BookingFormValues = {
  name: string;
  phone: string;
  reason: string;
  message: string;
};

type BookingFormProps = {
  onSuccess?: () => void;
  className?: string;
};

export function BookingForm({ onSuccess, className }: BookingFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      reason: "",
      message: "",
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

    const url = `https://wa.me/${siteData.contact.whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;

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
      className={cn("space-y-3", className)}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <FloatingInput
          label="Nombre completo"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          error={errors.name?.message}
          {...register("name", {
            required: "Ingresa tu nombre completo",
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
            required: "Ingresa un teléfono de contacto",
            minLength: {
              value: 8,
              message: "Ingresa un número válido",
            },
          })}
        />
      </div>

      <Controller
        name="reason"
        control={control}
        rules={{ required: "Selecciona un motivo de consulta" }}
        render={({ field, fieldState }) => (
          <FloatingSelect
            label="Motivo de consulta"
            options={[...visitReasons]}
            required
            name={field.name}
            value={field.value}
            onBlur={field.onBlur}
            ref={field.ref}
            aria-invalid={Boolean(fieldState.error)}
            error={fieldState.error?.message}
            onChange={(event) => field.onChange(event.target.value)}
          />
        )}
      />

      <FloatingTextarea
        label="Mensaje (opcional)"
        rows={2}
        aria-invalid={Boolean(errors.message)}
        error={errors.message?.message}
        className="min-h-[4.5rem] resize-none"
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
        el mensaje. Esos datos se usan solo para coordinar la consulta; no se
        guardan en un servidor propio. Te respondo en{" "}
        {siteData.contact.responseTime}.
      </p>
    </form>
  );
}
