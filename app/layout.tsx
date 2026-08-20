import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
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

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: {
    default: "Dra. Karla Armijos - ORL",
    template: "%s | Dra. Karla Armijos - ORL",
  },
  description: `${siteData.doctor.title} especializada en ${siteData.doctor.specialty}. ${siteData.doctor.audience}. ${siteData.tagline.charAt(0).toUpperCase()}${siteData.tagline.slice(1)}.`,
  generator: "Dra. Karla Armijos",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} lenis lenis-smooth h-full`}
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
