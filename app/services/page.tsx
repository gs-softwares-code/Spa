import type { Metadata } from "next";
import SectionHeading from "../../components/SectionHeading";
import Reveal from "../../components/Reveal";
import { ServiceCard } from "../../components/cards";
import { categories, servicesByCategory } from "../../lib/content";

export const metadata: Metadata = {
  title: "Treatments & Services",
  description:
    "Explore Serein's massage therapy, body treatments, bespoke facials and wellness experiences — each with durations, pricing and benefits.",
};

export default function ServicesPage() {
  return (
    <div className="overflow-hidden">
      {/* Header */}
      <section className="relative">
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-20 text-center sm:px-8 sm:pt-28">
          <Reveal>
            <span className="eyebrow">Treatments</span>
            <h1 className="mt-5 text-balance font-display text-5xl leading-tight text-earth sm:text-6xl">
              Care, curated for you
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Four families of treatment. Every one begins with a conversation and
              ends with you, a little more at ease.
            </p>
          </Reveal>
        </div>
      </section>

      {categories.map((cat, idx) => (
        <section key={cat.slug} id={cat.slug} className={idx % 2 === 1 ? "bg-cream/60" : ""}>
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <span className="eyebrow">{cat.label}</span>
                  <h2 className="mt-2 font-display text-3xl text-earth sm:text-4xl">{cat.blurb}</h2>
                </div>
              </div>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {servicesByCategory(cat.slug).map((s, i) => (
                <Reveal key={s.slug} delay={i * 60}>
                  <ServiceCard service={s} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
