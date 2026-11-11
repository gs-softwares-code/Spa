import type { Metadata } from "next";
import { ArtPanel, Glyph } from "../../components/Art";
import Reveal from "../../components/Reveal";
import { facilities } from "../../lib/content";

export const metadata: Metadata = {
  title: "The Spa & Facilities",
  description: "Tour Serein's treatment rooms, couples' suites, relaxation lounges, steam room and sauna.",
};

const toneCycle = ["sage", "sand", "gold-soft", "forest", "earth", "ivory", "sage-deep", "sand-deep"];

const imageForFacility: Record<string, string> = {
  "private-treatment-rooms": "/images/massage.jpg",
  "couples-suites": "/images/suite.jpg",
  "relaxation-lounges": "/images/lounge.jpg",
  "steam-rooms": "/images/steam.jpg",
  "sauna": "/images/sauna.jpg",
  "shower-facilities": "/images/pool.jpg",
  "reception-waiting": "/images/welcome.jpg",
  "wellness-amenities": "/images/aromatherapy.jpg",
};

export default function FacilitiesPage() {
  return (
    <div className="overflow-hidden">
      <section className="mx-auto max-w-3xl px-5 pb-16 pt-20 text-center sm:px-8 sm:pt-28">
        <Reveal>
          <span className="eyebrow">The spa</span>
          <h1 className="mt-5 text-balance font-display text-5xl leading-tight text-earth sm:text-6xl">
            Spaces made for stillness
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Natural light, soft material, and quiet everywhere. A tour of the rooms
            where your time at Serein unfolds.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((f, i) => (
            <Reveal key={f.slug} delay={(i % 4) * 60}>
              <div className="card group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <ArtPanel
                  tone={toneCycle[i % toneCycle.length]}
                  image={imageForFacility[f.slug]}
                  className="h-44"
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/60 bg-earth/40 text-ivory/95 backdrop-blur-md shadow transition-transform duration-500 group-hover:scale-110">
                      <Glyph name={f.icon} className="h-7 w-7" />
                    </span>
                  </div>
                </ArtPanel>
                <div className="p-6">
                  <h3 className="font-display text-xl text-earth">{f.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-14 max-w-2xl text-center text-sm leading-relaxed text-muted">
          Facilities shown reflect the spa&apos;s current offering and may evolve. Where a
          facility requires specific availability — for example the couples&apos; suites —
          we&apos;ll confirm it when you book.
        </p>
      </section>
    </div>
  );
}
