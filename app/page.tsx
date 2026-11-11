import Link from "next/link";
import { ArtPanel, Glyph } from "../components/Art";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { ServiceCard, PackageCard } from "../components/cards";
import {
  categories,
  services,
  packages,
  offers,
  testimonials,
  galleryItems,
  site,
} from "../lib/content";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <Intro />
      <SignatureTreatments />
      <FeaturedPackages />
      <WhyUs />
      <Atmosphere />
      <Philosophy />
      <Testimonials />
      <SpecialOffers />
      <Gallery />
    </div>
  );
}

/* ---------------------------------------------------------------- Hero ---- */

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center">
      <ArtPanel tone="forest" image="/images/hero.jpg" className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/80 to-forest/40" />
        <div className="blob absolute -right-24 top-10 h-[38rem] w-[38rem] opacity-25 animate-pulse-glow" style={{ background: "radial-gradient(circle at 40% 40%, #b39164, transparent 65%)" }} />
        <div className="blob absolute -left-28 bottom-[-10rem] h-[34rem] w-[34rem] opacity-30" style={{ background: "radial-gradient(circle at 40% 40%, #86947f, transparent 65%)" }} />
        <div className="absolute left-[8%] top-[20%] animate-drift opacity-40">
          <Glyph name="leaf" className="h-16 w-16 text-sage" />
        </div>
      </ArtPanel>

      <div className="relative mx-auto grid max-w-7xl min-h-[88vh] items-center gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12">
        <div className="animate-fade-up lg:col-span-7">
          <span className="flex items-center gap-3 text-gold-soft">
            <span className="gold-rule w-10" />
            <span className="eyebrow !text-gold-soft">A sanctuary of quiet wellness</span>
          </span>
          <h1 className="mt-6 text-balance font-display text-5xl leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">
            Reconnect With Your Inner Calm.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand/85">
            {site.name} is a contemporary luxury retreat where unhurried treatments,
            considered spaces and attentive touch invite you back to yourself.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/book" className="btn btn-gold hover:scale-105 transition-transform duration-300">Book Your Experience</Link>
            <Link href="/services" className="btn text-ivory border border-ivory/35 hover:bg-ivory/10 hover:border-ivory/60 transition-all duration-300">Explore treatments</Link>
          </div>
          <div className="mt-14 flex flex-wrap gap-8 text-ivory/70">
            <div className="transition-transform duration-300 hover:-translate-y-1">
              <div className="font-display text-3xl text-ivory">20+</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em]">Treatments</div>
            </div>
            <div className="transition-transform duration-300 hover:-translate-y-1">
              <div className="font-display text-3xl text-ivory">5</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em]">Master therapists</div>
            </div>
            <div className="transition-transform duration-300 hover:-translate-y-1">
              <div className="font-display text-3xl text-ivory">8</div>
              <div className="mt-1 text-xs uppercase tracking-[0.2em]">Quiet suites</div>
            </div>
          </div>
        </div>

        {/* Hero featured visual showcase with subtle float animation */}
        <div className="relative hidden lg:col-span-5 lg:block">
          <div className="relative mx-auto w-full max-w-md animate-float-slow">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-ivory/20 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.6)]">
              <ArtPanel tone="gold" image="/images/hero-floating.jpg" className="h-full w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-forest/80 p-5 backdrop-blur-md border border-ivory/15">
                  <span className="eyebrow !text-gold-soft">Signature Ambience</span>
                  <p className="mt-1.5 font-display text-xl text-ivory">Unhurried stillness & warm cedar retreats</p>
                </div>
              </ArtPanel>
            </div>

            {/* Floating decorative badge */}
            <div className="absolute -bottom-6 -left-8 flex items-center gap-3 rounded-full border border-ivory/25 bg-ivory/95 px-5 py-3 shadow-2xl backdrop-blur-md animate-drift">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 text-gold">
                <Glyph name="sparkle" className="h-5 w-5" />
              </span>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-earth">Pure Organic Botanicals</div>
                <div className="text-[11px] text-muted">100% gentle & natural</div>
              </div>
            </div>

            {/* Floating subtle ornament */}
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full border border-gold/40 animate-spin-slow pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-ivory/50">
        <Glyph name="arrow" className="h-5 w-5 rotate-90" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Intro ---- */

function Intro() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="eyebrow">Welcome to Serein</span>
          <h2 className="mt-5 text-balance font-display text-4xl leading-tight text-earth sm:text-5xl">
            A slower, gentler way to care for yourself.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Serein means the fine, cleansing rain that falls after sunset. It is the
            feeling we design for — the hush between treatments, the warmth of a
            heated bed, the scent of botanical oil on skin. Our therapists work
            unhurried, our rooms stay softly lit, and the world, for a while,
            recedes.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/about" className="btn btn-outline">Our story</Link>
            <Link href="/book" className="btn btn-primary">Book your visit</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- Signature treatments ---- */

function SignatureTreatments() {
  return (
    <section className="bg-cream/60 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Signature treatments"
          title="A ritual for every need"
          intro="Four families of care, each built around a different way of slowing down. Every treatment is led by a dedicated therapist and tailored to you."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/services#${c.slug}`}
              className="group card p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgba(58,47,34,.5)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sage/15 text-sage-deep transition-colors group-hover:bg-gold/15 group-hover:text-gold">
                <Glyph name={c.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-display text-2xl text-earth">{c.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.blurb}</p>
              <span className="mt-4 flex items-center gap-2 text-sm font-medium text-gold">
                Explore <Glyph name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------- Featured packages ---- */

function FeaturedPackages() {
  const featured = [packages[1], packages[2], packages[3]];
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Spa packages"
          title="Curated escapes, packaged kindly"
          intro="Multi-treatment journeys that flow effortlessly from one ritual to the next — each a complete afternoon of care."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {featured.map((pkg) => (
            <Reveal key={pkg.slug}><PackageCard pkg={pkg} /></Reveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/packages" className="btn btn-outline">View all packages</Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- WhyUs ---- */

const whyPoints = [
  { icon: "leaf", title: "Botanical, not chemical", body: "In-house blends and considered products, chosen for their gentleness on skin and mind." },
  { icon: "clock", title: "Unhurried by design", body: "We never double-book, and every appointment runs at the pace your body asks for." },
  { icon: "shield", title: "Hygiene, quietly rigorous", body: "High hygiene standards — freshly laundered linens, sanitised spaces, and single-use essentials." },
  { icon: "heart", title: "Therapists who listen", body: "Your preferences, pressure and comfort are the brief. We adapt, always." },
];

function WhyUs() {
  return (
    <section className="relative">
      <ArtPanel tone="ivory" className="absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading align="left" eyebrow="Why Serein" title="Wellness that respects you" />
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {whyPoints.map((p) => (
                <Reveal key={p.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
                    <Glyph name={p.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-earth">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={120}>
            <ArtPanel tone="sage" className="blob h-[26rem] w-full sm:h-[30rem]">
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <Glyph name="lotus" className="h-12 w-12 text-ivory/80" />
                <p className="max-w-xs font-display text-2xl leading-snug text-ivory">
                  “Quiet rooms, slow hands, and a little more of you left at the end.”
                </p>
              </div>
            </ArtPanel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Atmosphere ---- */

function Atmosphere() {
  const shots = [
    { tone: "sand", label: "The relaxation lounge", image: "/images/lounge.jpg" },
    { tone: "gold-soft", label: "Treatment rooms", image: "/images/massage.jpg" },
    { tone: "forest", label: "The steam room", image: "/images/steam.jpg" },
  ];
  return (
    <section className="bg-earth py-24 text-ivory sm:py-28 relative overflow-hidden">
      <div className="blob absolute -right-20 -top-20 h-96 w-96 opacity-10" style={{ background: "radial-gradient(circle, #b39164, transparent 70%)" }} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 relative">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading align="left" tone="light" eyebrow="The atmosphere" title="A space designed to lower your pulse" />
          <Link href="/facilities" className="btn text-ivory border border-ivory/30 hover:bg-ivory/10 hover:scale-105 transition-all duration-300 shrink-0">Tour the spa</Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {shots.map((s, idx) => (
            <Reveal key={s.label} delay={idx * 100}>
              <div className="group overflow-hidden rounded-[1.5rem] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                <ArtPanel tone={s.tone} image={s.image} className="h-[22rem]">
                  <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="relative flex h-full items-end p-6">
                    <span className="rounded-full bg-ink/40 border border-ivory/20 px-4 py-2 text-sm font-medium text-ivory backdrop-blur-md transition-all duration-300 group-hover:bg-gold/80 group-hover:border-gold">
                      {s.label}
                    </span>
                  </div>
                </ArtPanel>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Philosophy ---- */

function Philosophy() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <SectionHeading align="left" eyebrow="Our philosophy" title="Wellness is a practice, not a product" />
          <div className="prose-lux mt-6 text-base">
            <p>
              We hold that true spa care is less about what is applied to the body and
              more about the attention brought to it. We keep our treatments evidence-
              aware and our claims honest — we offer relaxation, restoration and ritual,
              not medical promises.
            </p>
            <p>
              Every product is chosen for quality and gentleness; every therapist is
              trained to listen; every room is kept quiet. The result is a space where
              you can simply be, unhurried, for an hour or an afternoon.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              ["Treatments", "20+"],
              ["Therapists", "5"],
              ["Private suites", "8"],
              ["Avg. visit", "2h"],
            ].map(([label, value]) => (
              <div key={label} className="card-solid p-7 text-center">
                <div className="font-display text-4xl text-gold">{value}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">{label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------- Testimonials ---- */

function Testimonials() {
  return (
    <section className="bg-cream/60 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Guest voices" title="Kind words, quietly gathered" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Reveal key={t.attribution}>
              <div className="card relative h-full p-8">
                <Glyph name="quote" className="h-8 w-8 text-gold/50" />
                <p className="mt-4 font-display text-xl leading-relaxed text-earth">{t.quote}</p>
                <p className="mt-6 border-t border-line pt-4 text-xs text-muted">{t.attribution}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted/70">
          These are placeholder quotes for the design preview — the live site will feature verified guest reviews.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------- Special offers ---- */

function SpecialOffers() {
  return (
    <section className="py-24 sm:py-28 relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Current offers" title="A gentle invitation" />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {offers.map((o, idx) => (
            <Reveal key={o.slug} delay={idx * 100}>
              <div
                className={`group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                  o.featured ? "bg-forest text-ivory shadow-[0_30px_70px_-24px_rgba(63,76,58,.9)]" : "card-solid"
                }`}
              >
                {/* Offer visual banner */}
                <div className="relative h-44 w-full overflow-hidden">
                  <ArtPanel tone={o.featured ? "forest" : "sand"} image={o.image} className="h-full w-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ivory/80 text-earth backdrop-blur-md shadow">
                        <Glyph name="ribbon" className="h-5 w-5 text-gold" />
                      </span>
                    </div>
                  </ArtPanel>
                </div>

                <div className="flex flex-1 flex-col justify-between p-7">
                  <div>
                    <h3 className={`font-display text-2xl ${o.featured ? "text-ivory" : "text-earth"}`}>{o.title}</h3>
                    <p className={`mt-3 text-sm leading-relaxed ${o.featured ? "text-sand/85" : "text-muted"}`}>{o.body}</p>
                  </div>
                  <Link
                    href="/book"
                    className={`btn mt-7 w-full !py-2.5 !text-[13px] transition-transform duration-300 group-hover:scale-[1.02] ${
                      o.featured ? "btn-gold shadow-lg" : "btn-outline"
                    }`}
                  >
                    {o.cta}
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Gallery ---- */

function Gallery() {
  return (
    <section className="relative">
      <ArtPanel tone="sand" className="absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-28">
        <div className="flex flex-col items-center text-center">
          <SectionHeading eyebrow={`Follow ${site.instagram}`} title="Moments from the spa" />
        </div>
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {galleryItems.map((g, i) => (
            <Reveal key={g.label + i} delay={i * 60}>
              <div className="group overflow-hidden rounded-2xl shadow-sm hover:shadow-lg transition-all">
                <ArtPanel tone={g.tone} image={g.image} className="aspect-square">
                  <div className="flex h-full items-end p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="w-full text-center rounded-full bg-ink/60 px-3 py-1.5 text-[11px] font-medium text-ivory backdrop-blur-md">{g.label}</span>
                  </div>
                </ArtPanel>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-2 text-sm text-muted">
            <Glyph name="sparkle" className="h-4 w-4 text-gold" />
            Designed for serene moments and unhurried retreats.
          </span>
        </div>
      </div>
    </section>
  );
}
