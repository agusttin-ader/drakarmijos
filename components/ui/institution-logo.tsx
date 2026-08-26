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
  maxWidthClass?: string;
  className?: string;
};

export function InstitutionLogo({
  name,
  logo,
  context = "desktop",
  showSeparator = false,
  maxWidthClass = "max-w-[9rem] sm:max-w-[13rem] md:max-w-[15rem]",
  className,
}: InstitutionLogoProps) {
  return (
    <li
      className={cn(
        "flex list-none items-center gap-x-4 sm:gap-x-8 lg:gap-x-10",
        className,
      )}
    >
      {showSeparator ? (
        <span
          aria-hidden
          className="hidden size-1 shrink-0 rounded-full bg-primary/40 sm:block"
        />
      ) : null}
      <InstitutionLogoImage
        src={logo}
        alt={name}
        width={260}
        height={88}
        interactive="hover"
        className={cn(maxWidthClass, institutionLogoClass(name, context))}
      />
    </li>
  );
}
