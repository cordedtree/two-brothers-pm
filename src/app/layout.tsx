import type { Metadata } from "next";
import { Cormorant_Garamond, Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { FilmGrain } from "@/components/FilmGrain";
import { JsonLd } from '@/components/JsonLd';
import { getLocalBusinessSchema } from '@/lib/structured-data';

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Two Brother's Property Management | Eastern Kentucky Lawn Care & Property Services",
  description:
    "Eastern Kentucky's trusted lawn care and property management. Mowing, weed control, storm cleanup, seasonal maintenance — locally owned in Salyersville, KY. Call or text for a free estimate.",
  metadataBase: new URL("https://twobrotherspm.com"),
  openGraph: {
    title: "Two Brother's Property Management | Eastern Kentucky Lawn Care & Property Services",
    description:
      "Eastern Kentucky's trusted lawn care and property management. Mowing, weed control, storm cleanup, seasonal maintenance — locally owned in Salyersville, KY.",
    url: "https://twobrotherspm.com",
    siteName: "Two Brother's Property Management",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://twobrotherspm.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${syne.variable} ${spaceMono.variable} custom-cursor`}
      >
        <a href="#main-content" className="skip-to-content">Skip to main content</a>
        <JsonLd data={getLocalBusinessSchema()} />
        <FilmGrain />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
