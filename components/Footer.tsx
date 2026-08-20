import Link from "next/link";
import { BrandWatermark } from "@/components/ui/brand-watermark";
import { Container } from "@/components/ui/container";
import {
  FooterHighlightDecor,
  HighlightBadge,
  highlightAssets,
} from "@/components/ui/highlight-badge";
import { Logo } from "@/components/ui/logo";
import {
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/social-icons";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Especialidades", href: "#specialties" },
  { label: "Resultados", href: "#before-after" },
  { label: "Sobre mí", href: "#about" },
  { label: "Testimonios", href: "#testimonials" },
  { label: "Contacto", href: "#booking" },
] as const;

const socialLinks = [
  {
    label: `Instagram — ${siteData.social.instagramHandle}`,
    href: siteData.social.instagram,
    handle: siteData.social.instagramHandle,
    icon: InstagramIcon,
    highlight: true,
  },
  {
    label: `LinkedIn — ${siteData.social.linkedinHandle}`,
    href: siteData.social.linkedin,
    handle: siteData.social.linkedinHandle,
    icon: LinkedInIcon,
    highlight: false,
  },
  {
    label: "WhatsApp — Consultas y turnos",
    href: siteData.contact.whatsappUrl,
    handle: siteData.contact.phone,
    icon: WhatsAppIcon,
    highlight: false,
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      <BrandWatermark />
      <FooterHighlightDecor />

      <Container className="relative z-10 section-y pb-mobile-nav md:pb-16">
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-10">
          <div>
            <Logo variant="footer" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">
              {siteData.doctor.title} · {siteData.doctor.specialty}.{" "}
              {siteData.doctor.audience}. {siteData.tagline.charAt(0).toUpperCase()}
              {siteData.tagline.slice(1)}.
            </p>

            <div
              aria-hidden
              className="mt-6 flex items-end gap-3 opacity-80 sm:gap-4"
            >
              {(Object.keys(highlightAssets) as Array<keyof typeof highlightAssets>).map(
                (variant) => (
                  <HighlightBadge
                    key={variant}
                    variant={variant}
                    size="sm"
                    className="opacity-90"
                  />
                ),
              )}
            </div>
          </div>

          <nav aria-label="Enlaces del sitio">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
              Navegación
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="rounded-md text-sm text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/70">
              Redes
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
                      className={cn(
                        "inline-flex items-center gap-2.5 rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
                        social.highlight
                          ? "font-medium text-white hover:text-primary-light"
                          : "text-white/80 hover:text-white",
                      )}
                    >
                      <Icon className="text-accent-gold" />
                      {social.handle}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 sm:mt-12">
          <p className="text-center text-xs text-white/70 sm:text-left">
            © {year} Dra. Karla Armijos — ORL. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
