import Link from "next/link";
import { DoctorName } from "@/components/ui/doctor-name";
import { BrandWatermark } from "@/components/ui/brand-watermark";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { SiteImage } from "@/components/ui/site-image";
import {
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/social-icons";
import { siteData } from "@/lib/site-data";

const navLinks = [
  { label: "Sobre mí", href: "/#about" },
  { label: "Especialidades", href: "/#specialties" },
  { label: "Consulta", href: "/#consulta" },
  { label: "Opiniones", href: "/#testimonials" },
  { label: "Preguntas", href: "/#faq" },
  { label: "Contacto", href: "/#booking" },
] as const;

const serviceLinks = [
  { label: "Otorrino en Buenos Aires", href: "/otorrino-buenos-aires" },
  { label: "Ronquidos", href: "/ronquidos" },
  { label: "Apnea del sueño", href: "/apnea-del-sueno" },
] as const;

const socialLinks = [
  {
    label: `Instagram — ${siteData.social.instagramHandle}`,
    href: siteData.social.instagram,
    handle: siteData.social.instagramHandle,
    icon: InstagramIcon,
  },
  {
    label: `LinkedIn — ${siteData.social.linkedinHandle}`,
    href: siteData.social.linkedin,
    handle: siteData.social.linkedinHandle,
    icon: LinkedInIcon,
  },
  {
    label: "WhatsApp — Consultas y citas",
    href: siteData.contact.whatsappUrl,
    handle: siteData.contact.phone,
    icon: WhatsAppIcon,
  },
] as const;

const linkClassName =
  "rounded-md text-sm leading-snug text-white/80 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-primary";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <BrandWatermark />

      <Container className="relative z-10 py-10 pb-[calc(4.25rem+env(safe-area-inset-bottom,0px))] sm:py-12 md:py-16 md:pb-16 lg:py-20">
        <div className="grid gap-7 sm:gap-9 md:grid-cols-2 md:gap-10 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-8">
          <div className="md:col-span-2 lg:col-span-1">
            <Logo variant="footer" />
            <DoctorName className="mt-3 text-[clamp(1.75rem,5vw,2.75rem)] leading-[1.02] text-brand-aqua sm:mt-5 sm:text-[2.875rem]">
              {siteData.doctor.name}
            </DoctorName>
            <p className="prose-measure mt-2 text-sm leading-snug text-white/80 sm:mt-3 sm:leading-relaxed">
              {siteData.doctor.fullTitle}. {siteData.doctor.audience}.
            </p>
            <p className="mt-2.5 text-sm tabular-nums text-white/65 sm:mt-4">
              {siteData.doctor.license}
            </p>
          </div>

          <nav aria-label="Enlaces del sitio" className="lg:pt-2">
            <p className="eyebrow text-white/55">Navegación</p>
            <ul className="mt-2.5 space-y-1.5 sm:mt-4 sm:space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Consultas frecuentes" className="lg:pt-2">
            <p className="eyebrow text-white/55">Consultas</p>
            <ul className="mt-2.5 space-y-1.5 sm:mt-4 sm:space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:pt-2">
            <p className="eyebrow text-white/55">Contacto</p>
            <ul className="mt-2.5 space-y-2 sm:mt-4 sm:space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`inline-flex items-center gap-2 ${linkClassName}`}
                    >
                      <Icon className="text-brand-aqua" />
                      {social.handle}
                    </a>
                  </li>
                );
              })}
              <li>
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className={linkClassName}
                >
                  {siteData.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:pt-6">
          <div>
            <p className="text-xs leading-snug text-white/60">
              © {year} {siteData.doctor.name}. Todos los derechos reservados.
            </p>
            <p className="mt-0.5 text-xs text-white/50">Buenos Aires, Argentina</p>
          </div>

          <a
            href="https://www.agustinaderdev.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Desarrollado por Agustin Ader — agustinaderdev.com (se abre en una pestaña nueva)"
            className="inline-flex items-center gap-2 rounded-md text-xs text-white/65 transition-colors duration-300 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:gap-2.5 sm:shrink-0"
          >
            <SiteImage
              src="/images/logo-dev/logo-dev.webp"
              alt=""
              width={256}
              height={202}
              sizes="32px"
              className="h-6 w-auto shrink-0 object-contain drop-shadow-[0_0_1.5px_rgba(255,255,255,0.85)] sm:h-8"
            />
            <span>
              Desarrollado por{" "}
              <span className="font-medium text-white/85">Agustin Ader</span>
            </span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
