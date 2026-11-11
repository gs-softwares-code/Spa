import Link from "next/link";
import type { Metadata } from "next";
import { ArtPanel, Glyph } from "../../components/Art";
import SectionHeading from "../../components/SectionHeading";
import Reveal from "../../components/Reveal";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story, philosophy and standards behind Serein Spa & Wellness.",
};

const pillars = [
  { icon: "leaf", title: "Product & ingredient philosophy", body: "We select products for gentleness and quality — botanical, transparent, and kind to skin. We favour smaller, considered lines over crowded ingredient decks." },
  { icon: "shield", title: "Hygiene standards", body: "Freshly laundered linens for every guest, rigorously sanitised rooms, single-use essentials, and meticulous hand hygiene between treatments." },
  { icon: "hands", title: "Treatment approach", body: "We lead with listening. Pressure, pace and products adapt to you. We make no medical claims — we offer restoration, ritual and rest." },
  { icon: "sun", title: "Interior & ambience", body: "Soft, muted light; natural materials; silence treated as a material. Every room is designed to lower the pulse before your treatment begins." },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <ArtPanel tone="sage-deep" image="/images/lounge.jpg" className="h-[44vh] min-h-[22rem]">
          <div className="absolute inset-0 bg-earth/50 backdrop-blur-[2px]" />
          <div className="relative flex h-full items-center justify-center text-center">
            <div className="animate-fade-up px-6">
              <span className="eyebrow !text-gold-soft">Our story</span>
              <h1 className="mt-4 font-display text-5xl text-ivory sm:text-6xl">The house of quiet</h1>
            </div>
          </div>
        </ArtPanel>
      </section>

      {/* Brand story */}
      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 sm:py-24">
        <Reveal>
          <SectionHeading eyebrow="Brand story" title="Born from a belief in slowness" />
          <div className="prose-lux mt-8 text-base">
            <p>
              Serein began with a simple observation: we had equated wellness with
              productivity — more treatments, faster results, tighter schedules. What
              we actually craved was the opposite. We wanted a place where nothing was
              rushed, where the light was soft, and where the only goal was to feel,
              by the end, more like yourself.
            </p>
            <p>
              So we built that place. A small, considered spa where the word "hurry"
              doesn't exist, where therapists are given time to listen, and where the
              treatments are designed around the pause rather than the clock.
            </p>
            <p>
              The name Serein refers to the fine, cleansing rain that falls as the sun
              sets — a quiet, unannounced refreshment. It is the feeling we hope you
              carry out through the door.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Pillars */}
      <section className="bg-cream/60 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="What we stand for" title="The standards that shape every visit" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="card h-full p-7">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
                    <Glyph name={p.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl text-earth">{p.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24">
        <ArtPanel tone="forest" className="absolute inset-0" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <Reveal>
            <Glyph name="lotus" className="mx-auto h-10 w-10 text-gold-soft" />
            <h2 className="mt-6 font-display text-4xl text-ivory sm:text-5xl">
              Come and be still for a while.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sand/85">
              Book your first visit — or gift one to someone who could use the quiet.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/book" className="btn btn-gold">Book your experience</Link>
              <Link href="/services" className="btn text-ivory border border-ivory/35 hover:bg-ivory/10">Explore treatments</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
