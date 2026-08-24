import Link from "next/link";
import { BrandWatermark } from "@/components/ui/brand-watermark";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
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
    label: "WhatsApp — Consultas y turnos",
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
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
          <div>
            <Logo variant="footer" />
            <p className="mt-5 font-script text-3xl text-brand-aqua sm:text-4xl">
              {siteData.doctor.name}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75">
              {siteData.doctor.fullTitle}. {siteData.doctor.audience}.
            </p>
            <p className="mt-4 text-sm text-white/65">{siteData.doctor.license}</p>
          </div>

          <nav aria-label="Enlaces del sitio">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
              Navegación
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/60">
              Contacto
            </p>
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
                      className="inline-flex items-center gap-2.5 rounded-md text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-aqua focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
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

        <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/60">
            © {year} {siteData.doctor.name}. Todos los derechos reservados.
          </p>
          <p className="text-xs text-white/50">Buenos Aires, Argentina</p>
        </div>
      </Container>
    </footer>
  );
}
