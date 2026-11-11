import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtPanel, Glyph } from "../../../components/Art";
import { ServiceCard } from "../../../components/cards";
import {
  formatMinutes,
  formatPrice,
  getCategory,
  getService,
  services,
  servicesByCategory,
} from "../../../lib/content";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Treatment not found" };
  return {
    title: service.name,
    description: service.overview,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const cat = getCategory(service.category);
  const related = servicesByCategory(service.category).filter((s) => s.slug !== service.slug).slice(0, 3);
  const tone = { massage: "sage", body: "sand", facial: "gold-soft", wellness: "forest" }[service.category] || "sage";
  const image = {
    massage: "/images/massage.jpg",
    body: "/images/body.jpg",
    facial: "/images/facial.jpg",
    wellness: "/images/wellness.jpg",
  }[service.category] || "/images/massage.jpg";
  const icon = { massage: "hands", body: "leaf", facial: "droplet", wellness: "lotus" }[service.category] || "sparkle";

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <ArtPanel tone={tone} image={image} className="h-[46vh] min-h-[22rem]">
          <div className="flex h-full items-end">
            <div className="mx-auto w-full max-w-7xl px-5 pb-12 sm:px-8">
              <Link href={`/services#${service.category}`} className="inline-flex items-center gap-2 text-sm text-ivory/85 hover:text-ivory">
                <Glyph name="arrow" className="h-4 w-4 rotate-180" /> All {cat?.label.toLowerCase()}
              </Link>
            </div>
          </div>
        </ArtPanel>
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 sm:px-8">
          <div className="card -translate-y-1/2 p-7 sm:p-9">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                {cat && <span className="eyebrow">{cat.label}</span>}
                <h1 className="mt-2 font-display text-4xl leading-tight text-earth sm:text-5xl">{service.name}</h1>
                <p className="mt-3 max-w-xl text-muted">{service.tagline}</p>
              </div>
              <div className="flex shrink-0 items-center gap-6">
                <div className="text-center">
                  <div className="flex items-center gap-1.5 text-gold"><Glyph name="clock" className="h-5 w-5" /></div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">Duration</div>
                  <div className="font-display text-xl text-earth">{formatMinutes(service.durationMin)}</div>
                </div>
                <div className="text-center">
                  <div className="font-display text-3xl text-gold">{formatPrice(service.price)}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{service.priceNote || "per session"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview + side facts */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 className="font-display text-3xl text-earth">Overview</h2>
            <p className="prose-lux mt-4">{service.overview}</p>
            <h3 className="mt-10 font-display text-2xl text-earth">The experience</h3>
            <p className="prose-lux mt-4">{service.experience}</p>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h4 className="eyebrow">Benefits</h4>
                <ul className="mt-4 space-y-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-earth/85">
                      <Glyph name="check" className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="eyebrow">Ideal for</h4>
                <div className="mt-4 flex flex-wrap gap-2">
                  {service.suitability.map((s) => (
                    <span key={s} className="chip">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <div className="card-solid p-7">
              <h4 className="eyebrow">Before your visit</h4>
              <ul className="mt-4 space-y-3">
                {service.prep.map((p) => (
                  <li key={p} className="flex gap-3 text-sm text-earth/80">
                    <Glyph name="leaf" className="mt-0.5 h-4 w-4 shrink-0 text-sage-deep" /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card p-7 text-center">
              <ArtPanel tone="sage" className="mx-auto flex h-16 w-16 items-center justify-center rounded-full">
                <Glyph name={icon} className="h-7 w-7 text-ivory" />
              </ArtPanel>
              <p className="mt-4 text-sm text-muted">Reserve your appointment — choose your preferred therapist and a live-availability slot.</p>
              <Link href={`/book?service=${service.slug}`} className="btn btn-primary mt-5 w-full">
                Book {service.name}
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream/60 py-16">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <h2 className="font-display text-3xl text-earth">More in {cat?.label}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => <ServiceCard key={s.slug} service={s} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
