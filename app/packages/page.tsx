import Link from "next/link";
import type { Metadata } from "next";
import SectionHeading from "../../components/SectionHeading";
import Reveal from "../../components/Reveal";
import { PackageCard } from "../../components/cards";
import { packages } from "../../lib/content";

export const metadata: Metadata = {
  title: "Spa Packages",
  description: "Curated multi-treatment spa packages, from relaxation escapes to luxury full-day journeys.",
};

export default function PackagesPage() {
  return (
    <div className="overflow-hidden">
      <section className="mx-auto max-w-4xl px-5 pb-16 pt-20 text-center sm:px-8 sm:pt-28">
        <Reveal>
          <span className="eyebrow">Spa packages</span>
          <h1 className="mt-5 text-balance font-display text-5xl leading-tight text-earth sm:text-6xl">
            Afternoons, packaged kindly
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Complete journeys that combine treatments into a single, seamless visit —
            priced more gently than booking each separately.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.slug} delay={i * 60}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Prefer to build your own?"
            title="Customized Wellness Package"
            intro="Combine any treatments from our menu into a day that fits you. We'll sequence it, time it, and take care of everything between."
          />
          <div className="mt-8 text-center">
            <Link href="/book" className="btn btn-primary">Start planning your day</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
