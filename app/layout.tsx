import type { Viewport } from "next";
import { Allura, Source_Sans_3 } from "next/font/google";
import { AnchorSmoothScroll } from "@/components/providers/anchor-smooth-scroll";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SkipLink } from "@/components/SkipLink";
import { BookingModalProvider } from "@/components/providers/booking-modal-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { isSiteComingSoon } from "@/lib/site-config";
import { buildSiteMetadata } from "@/lib/seo";
import "./globals.css";

/** Cuerpo e interfaz — humanista, legible (Humnst Lt BT del manual). */
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

/** Nombre de marca — script elegante (Allura). No preload: no compite con LCP del hero. */
const allura = Allura({
  variable: "--font-brand",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: false,
  weight: "400",
});

export const metadata = isSiteComingSoon
  ? buildSiteMetadata({
      title: "Próximamente",
      description:
        "Sitio en construcción. Pronto vas a encontrar información sobre otorrinolaringología, ronquidos y apnea del sueño con la Dra. Karla Armijos.",
      robots: { index: false, follow: false },
      openGraph: {
        title: "Próximamente | Dra. Karla Armijos",
        description:
          "Estamos trabajando en algo nuevo. Volvemos pronto.",
      },
      twitter: {
        title: "Próximamente | Dra. Karla Armijos",
        description:
          "Estamos trabajando en algo nuevo. Volvemos pronto.",
      },
    })
  : buildSiteMetadata();

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F0E6D8" },
    { media: "(prefers-color-scheme: dark)", color: "#0F5C5C" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-AR"
      className={`${sourceSans.variable} ${allura.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <GoogleAnalytics />
        {isSiteComingSoon ? (
          children
        ) : (
          <>
            <AnchorSmoothScroll />
            <SmoothScrollProvider>
              <BookingModalProvider>
                <SkipLink />
                <ScrollProgress />
                <Navbar />
                {children}
                <Footer />
                <MobileNav />
              </BookingModalProvider>
            </SmoothScrollProvider>
          </>
        )}
      </body>
    </html>
  );
}
