"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Glyph } from "./Art";
import { site } from "../lib/content";

const links = [
  { href: "/services", label: "Treatments" },
  { href: "/packages", label: "Packages" },
  { href: "/therapists", label: "Therapists" },
  { href: "/facilities", label: "The Spa" },
  { href: "/about", label: "Our Story" },
];

export function AnnouncementBar() {
  const message = `Serein Spa & Wellness — ${site.tagline} · Book online & reserve with a 20% deposit`;
  const repeated = Array.from({ length: 6 });
  return (
    <div className="overflow-hidden bg-forest text-ivory/85">
      <div className="flex w-max animate-marquee items-center py-2">
        {repeated.map((_, i) => (
          <span key={i} className="mx-6 flex items-center gap-3 whitespace-nowrap text-[11px] uppercase tracking-[0.24em]">
            <Glyph name="leaf" className="h-3 w-3 text-gold" />
            {message}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-ivory/90 shadow-[0_10px_40px_-20px_rgba(58,47,34,.35)] backdrop-blur-md" : "bg-ivory/60 backdrop-blur-sm"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/50 text-gold transition-colors group-hover:bg-gold/10">
            <Glyph name="lotus" className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[1.45rem] tracking-wide text-earth">Serein</span>
            <span className="block text-[10px] uppercase tracking-[0.36em] text-gold">Spa &amp; Wellness</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-[13px] font-medium tracking-wide transition-colors hover:text-gold ${
                isActive(l.href) ? "text-gold" : "text-earth/80"
              }`}
            >
              {l.label}
              {isActive(l.href) && <span className="absolute -bottom-1.5 left-1/2 h-px w-5 -translate-x-1/2 bg-gold" />}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/book" className="btn btn-primary hidden !px-6 !py-2.5 !text-[13px] sm:inline-flex">
            Book Now
          </Link>
          <Link href="/admin" className="hidden rounded-full border border-line p-2.5 text-earth/60 transition-colors hover:text-gold md:block" aria-label="Admin">
            <Glyph name="shield" className="h-4 w-4" />
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-earth lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-ivory px-5 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b border-line py-3.5 text-[15px] ${
                  isActive(l.href) ? "text-gold" : "text-earth"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-5 flex flex-col gap-3">
              <Link href="/book" className="btn btn-primary">Book Now</Link>
              <Link href="/admin" className="btn btn-outline">Admin Dashboard</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
