import { forwardRef, useId, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const fieldStyles =
  "peer w-full rounded-[0.75rem_0.25rem_0.75rem_0.25rem] border border-primary/12 bg-background px-4 pb-3 pt-6 text-text-primary outline-none transition-[border-color] duration-300 placeholder:text-transparent focus:border-primary/40 focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60";

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

type FloatingSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
};

export const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  function FloatingSelect(
    { label, error, options, className, id, name, ...props },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? name ?? generatedId;
    const errorId = `${fieldId}-error`;

    return (
      <FieldWrapper label={label} htmlFor={fieldId} error={error}>
        <select
          ref={ref}
          id={fieldId}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            fieldStyles,
            "invalid:text-transparent",
            "appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%234A5858%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22%3E%3Cpath d=%22m6 9 6 6 6-6%22/%3E%3C/svg%3E')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10",
            error && "border-red-500/70",
            className,
          )}
          {...props}
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
      </FieldWrapper>
    );
  },
);
