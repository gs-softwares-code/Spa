import type { Metadata } from "next";
import Reveal from "../../components/Reveal";
import { TherapistCard } from "../../components/cards";
import { therapists } from "../../lib/content";

export const metadata: Metadata = {
  title: "Our Therapists",
  description: "Meet the therapists behind Serein — their specializations, practice and languages.",
};

export default function TherapistsPage() {
  return (
    <div className="overflow-hidden">
      <section className="relative">
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-20 text-center sm:px-8 sm:pt-28">
          <Reveal>
            <span className="eyebrow">The team</span>
            <h1 className="mt-5 text-balance font-display text-5xl leading-tight text-earth sm:text-6xl">
              Hands you can trust
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Every therapist at Serein is a dedicated practitioner — trained,
              experienced, and deeply attentive to your comfort.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {therapists.map((t, i) => (
            <Reveal key={t.id} delay={i * 60}>
              <TherapistCard therapist={t} />
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-muted">
          Certifications and credentials appear on therapist profiles once verified —
          we never publish unverified claims. Since you in touch if you&apos;d like a
          particular therapist for your visit.
        </p>
      </section>
    </div>
  );
}
