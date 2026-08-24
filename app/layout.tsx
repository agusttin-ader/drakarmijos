import type { Metadata, Viewport } from "next";
import { Pinyon_Script, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { Navbar } from "@/components/Navbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SkipLink } from "@/components/SkipLink";
import { IntroProvider } from "@/components/providers/intro-provider";
import { BookingModalProvider } from "@/components/providers/booking-modal-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { siteData } from "@/lib/site-data";
import "./globals.css";

/** Equivalente web a Humnst Lt BT (manual de marca). */
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

/** Equivalente web a Kaufmann BT — firma / nombre. */
const pinyonScript = Pinyon_Script({
  variable: "--font-pinyon-script",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Dra. Karla Armijos · Otorrinolaringóloga",
    template: "%s | Dra. Karla Armijos",
  },
  description: `${siteData.doctor.title} especializada en ${siteData.doctor.specialty}. ${siteData.doctor.audience}. ${siteData.tagline.charAt(0).toUpperCase()}${siteData.tagline.slice(1)}.`,
  generator: "Dra. Karla Armijos",
};

/** Bloquea zoom en mobile (pedido de producto). */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBFCFC" },
    { media: "(prefers-color-scheme: dark)", color: "#0F5C5C" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es-EC"
      className={`${sourceSans.variable} ${pinyonScript.variable} lenis lenis-smooth h-full`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScrollProvider>
          <BookingModalProvider>
            <IntroProvider>
              <SkipLink />
              <ScrollProgress />
              <Navbar />
              {children}
              <Footer />
              <MobileNav />
            </IntroProvider>
          </BookingModalProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
