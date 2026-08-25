import { InstitutionLogoImage } from "@/components/ui/institution-logo-image";
import {
  institutionLogoClass,
  type InstitutionLogoContext,
} from "@/lib/institution-logos";
import { cn } from "@/lib/utils";

type InstitutionLogoProps = {
  name: string;
  logo: string;
  context?: InstitutionLogoContext;
  showSeparator?: boolean;
  duplicate?: boolean;
  maxWidthClass?: string;
  className?: string;
};

export function InstitutionLogo({
  name,
  logo,
  context = "desktop",
  showSeparator = false,
  duplicate = false,
  maxWidthClass = "max-w-[9rem] sm:max-w-[13rem] md:max-w-[15rem]",
  className,
}: InstitutionLogoProps) {
  const isMobileStrip = context === "mobile";

  return (
    <li
      aria-hidden={duplicate || undefined}
      className={cn(
        "flex list-none items-center",
        isMobileStrip ? "gap-x-5" : "gap-x-8 lg:gap-x-10",
        className,
      )}
    >
      {showSeparator ? (
        <span
          aria-hidden
          className="size-1 shrink-0 rounded-full bg-primary/40"
        />
      ) : null}
      <InstitutionLogoImage
        src={logo}
        alt={duplicate ? "" : name}
        width={260}
        height={88}
        interactive={isMobileStrip ? "tap" : "hover"}
        className={cn(maxWidthClass, institutionLogoClass(name, context))}
      />
    </li>
  );
}
