"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type SelectHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldStyles =
  "peer w-full rounded-field border border-primary/18 bg-background px-4 pb-3 pt-6 text-text-primary outline-none transition-[border-color,box-shadow] duration-300 placeholder:text-transparent focus:border-primary/45 focus:shadow-soft focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60";

const labelStyles =
  "pointer-events-none absolute left-4 top-4 origin-left text-sm text-text-secondary transition-all duration-300 peer-focus:top-2 peer-focus:text-xs peer-focus:text-primary peer-focus:-translate-y-0 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-primary peer-[:not(:placeholder-shown)]:-translate-y-0 peer-valid:top-2 peer-valid:text-xs peer-valid:text-primary peer-valid:-translate-y-0";

type FieldWrapperProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
};

function FieldWrapper({
  label,
  htmlFor,
  error,
  children,
  className,
}: FieldWrapperProps) {
  const errorId = `${htmlFor}-error`;

  return (
    <div className={cn("relative", className)}>
      {children}
      <label htmlFor={htmlFor} className={labelStyles}>
        {label}
      </label>
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type FloatingInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  function FloatingInput({ label, error, className, id, name, ...props }, ref) {
    const generatedId = useId();
    const fieldId = id ?? name ?? generatedId;
    const errorId = `${fieldId}-error`;

    return (
      <FieldWrapper label={label} htmlFor={fieldId} error={error}>
        <input
          ref={ref}
          id={fieldId}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(fieldStyles, error && "border-red-500/70", className)}
          placeholder=" "
          {...props}
        />
      </FieldWrapper>
    );
  },
);

type FloatingTextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
  };

export const FloatingTextarea = forwardRef<
  HTMLTextAreaElement,
  FloatingTextareaProps
>(function FloatingTextarea(
  { label, error, className, id, name, ...props },
  ref,
) {
  const generatedId = useId();
  const fieldId = id ?? name ?? generatedId;
  const errorId = `${fieldId}-error`;

  return (
    <FieldWrapper label={label} htmlFor={fieldId} error={error}>
      <textarea
        ref={ref}
        id={fieldId}
        name={name}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        rows={4}
        className={cn(
          fieldStyles,
          "min-h-[132px] resize-y",
          error && "border-red-500/70",
          className,
        )}
        placeholder=" "
        {...props}
      />
    </FieldWrapper>
  );
});

type FloatingSelectProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
};

/**
 * Selector custom con identidad de marca (reemplaza el <select> nativo del SO).
 * Compatible con react-hook-form vía ref + onChange/onBlur del input oculto.
 */
export const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  function FloatingSelect(
    {
      label,
      error,
      options,
      className,
      id,
      name,
      value,
      defaultValue,
      onChange,
      onBlur,
      disabled,
      required,
      "aria-invalid": ariaInvalid,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? name ?? generatedId;
    const listboxId = `${fieldId}-listbox`;
    const errorId = `${fieldId}-error`;
    const rootRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const hiddenRef = useRef<HTMLSelectElement | null>(null);

    const [open, setOpen] = useState(false);
    const [menuMounted, setMenuMounted] = useState(false);
    const [menuClosing, setMenuClosing] = useState(false);
    const closeTimerRef = useRef<number | null>(null);
    const [mounted, setMounted] = useState(false);
    const [menuRect, setMenuRect] = useState<{
      top: number;
      left: number;
      width: number;
      maxHeight: number;
    } | null>(null);
    const [internalValue, setInternalValue] = useState(
      String(defaultValue ?? value ?? ""),
    );

    const selectedValue =
      value !== undefined ? String(value) : internalValue;
    const selectedOption = options.find((o) => o.value === selectedValue);
    const hasValue = Boolean(selectedValue);

    useEffect(() => {
      setMounted(true);
      return () => {
        if (closeTimerRef.current !== null) {
          window.clearTimeout(closeTimerRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (value !== undefined) {
        setInternalValue(String(value));
      }
    }, [value]);

    const updateMenuRect = useCallback(() => {
      const trigger = triggerRef.current;
      if (!trigger) return;

      const rect = trigger.getBoundingClientRect();
      const gap = 8;
      const edgePadding = 16;
      const mobileNavReserve =
        window.matchMedia("(max-width: 767px)").matches ? 84 : 0;
      const menuCap = 256;

      const spaceBelow =
        window.innerHeight - rect.bottom - gap - edgePadding - mobileNavReserve;
      const spaceAbove = rect.top - gap - edgePadding;
      const openUpward = spaceBelow < 160 && spaceAbove > spaceBelow;
      const maxHeight = Math.max(
        120,
        Math.min(menuCap, openUpward ? spaceAbove : spaceBelow),
      );

      setMenuRect({
        top: openUpward
          ? Math.max(edgePadding, rect.top - gap - maxHeight)
          : rect.bottom + gap,
        left: Math.max(
          edgePadding,
          Math.min(rect.left, window.innerWidth - rect.width - edgePadding),
        ),
        width: rect.width,
        maxHeight,
      });
    }, []);

    const closeMenu = useCallback(() => {
      setOpen(false);
      setMenuClosing(true);

      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }

      closeTimerRef.current = window.setTimeout(() => {
        setMenuMounted(false);
        setMenuClosing(false);
        closeTimerRef.current = null;
      }, 150);
    }, []);

    const openMenu = useCallback(() => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }

      updateMenuRect();
      setMenuClosing(false);
      setMenuMounted(true);
      setOpen(true);
    }, [updateMenuRect]);

    useEffect(() => {
      if (!open) return;

      updateMenuRect();

      const onPointerDown = (event: PointerEvent) => {
        const target = event.target as Node;
        if (
          rootRef.current?.contains(target) ||
          listboxRef.current?.contains(target)
        ) {
          return;
        }
        closeMenu();
      };

      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") closeMenu();
      };

      window.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("resize", updateMenuRect);
      window.addEventListener("scroll", updateMenuRect, true);

      return () => {
        window.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("resize", updateMenuRect);
        window.removeEventListener("scroll", updateMenuRect, true);
      };
    }, [closeMenu, listboxId, open, updateMenuRect]);

    const setRefs = (node: HTMLSelectElement | null) => {
      hiddenRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const commitValue = (next: string) => {
      setInternalValue(next);
      closeMenu();

      const selectEl = hiddenRef.current;
      if (selectEl) {
        const descriptor = Object.getOwnPropertyDescriptor(
          HTMLSelectElement.prototype,
          "value",
        );
        descriptor?.set?.call(selectEl, next);
      }

      onChange?.({
        target: { value: next },
        currentTarget: { value: next },
      } as React.ChangeEvent<HTMLSelectElement>);
    };

    const dropdown =
      menuMounted && menuRect && mounted ? (
        <ul
          ref={listboxRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={fieldId}
          data-floating-select-listbox=""
          style={{
            position: "fixed",
            top: menuRect.top,
            left: menuRect.left,
            width: menuRect.width,
            maxHeight: menuRect.maxHeight,
            zIndex: 250,
          }}
          className={cn(
            "pointer-events-auto overflow-auto rounded-brand border border-primary/10 bg-background p-1.5 shadow-elevated ring-1 ring-primary/5 will-change-[transform,opacity]",
            menuClosing ? "select-dropdown-exit" : "select-dropdown-enter",
          )}
        >
          {options.map((option) => {
            const isSelected = option.value === selectedValue;

            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onPointerDown={(event) => event.preventDefault()}
                  onClick={() => commitValue(option.value)}
                  className={cn(
                    "flex w-full touch-manipulation items-center gap-3 rounded-field px-3.5 py-3.5 text-left transition-colors duration-200",
                    "hover:bg-brand-aqua/12 focus-visible:bg-brand-aqua/12 focus-visible:outline-none",
                    isSelected && "bg-primary/[0.06] ring-1 ring-primary/10",
                  )}
                >
                  <span
                    className={cn(
                      "min-w-0 flex-1 text-sm leading-snug",
                      isSelected
                        ? "font-medium text-primary"
                        : "text-text-primary",
                    )}
                  >
                    {option.label}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border transition-colors",
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-primary/20 bg-background text-transparent",
                    )}
                  >
                    <Check className="size-3 stroke-[2.5]" />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null;

    return (
      <div ref={rootRef} className={cn("relative", className)}>
        <select
          ref={setRefs}
          id={`${fieldId}-native`}
          name={name}
          required={required}
          disabled={disabled}
          value={selectedValue}
          onChange={onChange}
          onBlur={onBlur}
          tabIndex={-1}
          aria-hidden
          className="sr-only"
          {...rest}
        >
          <option value="" disabled>
            {" "}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          ref={triggerRef}
          type="button"
          id={fieldId}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-invalid={ariaInvalid ?? Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onBlur={
            onBlur as unknown as React.FocusEventHandler<HTMLButtonElement>
          }
          onClick={() => {
            if (disabled) return;
            if (open) closeMenu();
            else openMenu();
          }}
          className={cn(
            fieldStyles,
            "relative flex cursor-pointer items-start justify-between gap-3 text-left",
            open && "border-primary/45 shadow-soft",
            error && "border-red-500/70",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          <span className="min-w-0 flex-1">
            <span
              className={cn(
                "pointer-events-none absolute left-4 top-4 origin-left text-sm text-text-secondary transition-all duration-300",
                (hasValue || open) &&
                  "top-2 text-xs text-primary -translate-y-0",
              )}
            >
              {label}
            </span>
            <span
              className={cn(
                "block truncate text-base",
                hasValue ? "text-text-primary" : "text-transparent",
              )}
            >
              {selectedOption?.label ?? "Selecciona un motivo"}
            </span>
          </span>
          <span
            aria-hidden
            className={cn(
              "mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
              open ? "bg-primary/8 text-primary" : "bg-primary/5 text-primary/70",
            )}
          >
            <ChevronDown
              className={cn(
                "size-4 stroke-[1.75] transition-transform duration-300",
                open && "rotate-180",
              )}
            />
          </span>
        </button>

        {mounted && dropdown ? createPortal(dropdown, document.body) : null}

        {error ? (
          <p id={errorId} className="mt-1.5 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    );
  },
);
