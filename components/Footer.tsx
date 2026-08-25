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
  { label: "Sobre mí", href: "#about" },
  { label: "Especialidades", href: "#specialties" },
  { label: "Consulta", href: "#consulta" },
  { label: "Opiniones", href: "#testimonials" },
  { label: "Preguntas", href: "#faq" },
  { label: "Contacto", href: "#booking" },
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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <BrandWatermark />

      <Container className="relative z-10 section-y pb-mobile-nav md:pb-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1fr] lg:gap-10">
          <div className="md:col-span-2 lg:col-span-1">
            <Logo variant="footer" />
            <DoctorName className="mt-5 text-[clamp(2rem,4.5vw,2.75rem)] leading-[1.02] text-brand-aqua sm:text-[2.875rem]">
              {siteData.doctor.name}
            </DoctorName>
            <p className="prose-measure mt-3 text-sm leading-relaxed text-white/80">
              {siteData.doctor.fullTitle}. {siteData.doctor.audience}.
            </p>
            <p className="mt-4 text-sm tabular-nums text-white/65">
              {siteData.doctor.license}
            </p>
          </div>

          <nav aria-label="Enlaces del sitio" className="lg:pt-2">
            <p className="eyebrow text-white/55">Navegación</p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md text-sm text-white/80 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:pt-2">
            <p className="eyebrow text-white/55">Contacto</p>
            <ul className="mt-4 space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex items-center gap-2.5 rounded-md text-sm text-white/80 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
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
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  {siteData.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-xs text-white/60">
              © {year} {siteData.doctor.name}. Todos los derechos reservados.
            </p>
            <p className="mt-1 text-xs text-white/50">Buenos Aires, Argentina</p>
          </div>

          <a
            href="https://www.agustinaderdev.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Desarrollado por Agustin Ader — agustinaderdev.com (se abre en una pestaña nueva)"
            className="inline-flex items-center gap-2.5 rounded-md text-xs text-white/65 transition-colors duration-300 hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:shrink-0"
          >
            <SiteImage
              src="/images/logo-dev/logo-dev.webp"
              alt=""
              width={256}
              height={202}
              sizes="36px"
              className="h-7 w-auto shrink-0 object-contain drop-shadow-[0_0_1.5px_rgba(255,255,255,0.85)] sm:h-8"
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
