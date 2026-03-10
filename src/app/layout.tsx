import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BUSINESS } from "@/lib/constants";
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
  ],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${dmSerif.variable} font-body antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
