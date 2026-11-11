import Link from "next/link";
import { Glyph } from "./Art";
import { site } from "../lib/content";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-earth text-ivory/80">
      <div className="grain absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold">
                <Glyph name="lotus" className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-display text-2xl text-ivory">Serein</span>
                <span className="block text-[10px] uppercase tracking-[0.34em] text-gold">Spa &amp; Wellness</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ivory/60">
              A sanctuary of quiet, self-contained wellness. {site.tagline}.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="eyebrow text-gold-soft">Explore</h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Treatments", "/services"],
                ["Packages", "/packages"],
                ["Therapists", "/therapists"],
                ["The Spa & Facilities", "/facilities"],
                ["Our Story", "/about"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="transition-colors hover:text-gold-soft">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Visit */}
          <div>
            <h4 className="eyebrow text-gold-soft">Visit</h4>
            <ul className="mt-5 space-y-4 text-sm text-ivory/70">
              <li className="flex gap-3">
                <Glyph name="door" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{site.addressLine1}<br />{site.addressLine2}</span>
              </li>
              <li className="flex gap-3">
                <Glyph name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>{site.hours}</span>
              </li>
              <li className="flex gap-3">
                <Glyph name="chat" className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span><a href={`mailto:${site.email}`} className="hover:text-gold-soft">{site.email}</a><br />{site.phone}</span>
              </li>
            </ul>
          </div>

          {/* Note */}
          <div>
            <h4 className="eyebrow text-gold-soft">Good to know</h4>
            <ul className="mt-5 space-y-3 text-sm text-ivory/60">
              <li>Confirmations sent by email.</li>
              <li>20% deposit reserves your time; the balance is settled at the spa.</li>
              <li>Free rescheduling up to 12h before — cancellations up to 24h.</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/15 pt-6 text-xs text-ivory/45 sm:flex-row">
          <span>© 2026 {site.name}. All rights reserved.</span>
          <span className="flex items-center gap-4">
            <span>Follow {site.instagram}</span>
            <Link href="/book" className="text-gold-soft hover:text-gold">Book your visit</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
