import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { BookingProvider } from "../lib/store";
import Navbar, { AnnouncementBar } from "../components/Navbar";
import Footer from "../components/Footer";
import { Glyph } from "../components/Art";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://serein-spa.example.com"),
  title: {
    default: "Serein Spa & Wellness — Reconnect With Your Inner Calm",
    template: "%s · Serein Spa & Wellness",
  },
  description:
    "A contemporary luxury spa and wellness centre. Massage, body treatments, bespoke facials, couples' rituals, and a seamless online booking experience.",
  keywords: ["spa", "wellness", "massage", "facial", "body treatment", "couples spa", "luxury spa"],
};

export const viewport: Viewport = {
  themeColor: "#faf6ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col">
        <BookingProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          {/* Floating book / contact action */}
          <Link
            href="/book"
            aria-label="Book an appointment"
            className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ivory shadow-[0_18px_40px_-14px_rgba(179,145,100,.9)] transition-transform hover:scale-105 hover:bg-gold-soft"
          >
            <Glyph name="calendar" className="h-6 w-6" />
          </Link>
        </BookingProvider>
      </body>
    </html>
  );
}
