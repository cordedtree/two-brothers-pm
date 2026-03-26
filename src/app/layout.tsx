import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BUSINESS } from "@/lib/constants";
import { getLocalBusinessJsonLd } from "@/lib/json-ld";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS.name} | ${BUSINESS.location}`,
    template: `%s | ${BUSINESS.name}`,
  },
  description: `Reliable lawn care and property management in ${BUSINESS.location} and surrounding counties. Mowing, weed control, storm cleanup, and more. Free estimates.`,
  keywords: [
    "lawn care Salyersville KY",
    "property management Magoffin County",
    "mowing service Eastern Kentucky",
    "storm cleanup Salyersville",
    "weed control Eastern KY",
    "lawn mowing Magoffin County",
    "property cleanup Eastern Kentucky",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  metadataBase: new URL("https://twobrotherspm.com"),
  openGraph: {
    title: `${BUSINESS.name} | ${BUSINESS.location}`,
    description: `Reliable lawn care and property management in ${BUSINESS.location} and surrounding counties. Free estimates.`,
    type: "website",
    locale: "en_US",
    siteName: BUSINESS.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1024,
        height: 576,
        alt: `${BUSINESS.name} - ${BUSINESS.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.name} | ${BUSINESS.location}`,
    description: `Reliable lawn care and property management in ${BUSINESS.location}. Free estimates.`,
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getLocalBusinessJsonLd();

  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable} font-body antialiased`}>
        {/* Skip to content — accessibility */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-dark-green focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:outline-none"
        >
          Skip to content
        </a>

        <Header />
        <main id="main">{children}</main>
        <Footer />

        {/* JSON-LD structured data for search engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
