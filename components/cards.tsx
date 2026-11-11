import Link from "next/link";
import { ArtPanel, Glyph } from "./Art";
import {
  formatMinutes,
  formatPrice,
  getCategory,
  type Service,
  type SpaPackage,
  type Therapist,
} from "../lib/content";

const toneForService: Record<string, string> = {
  massage: "sage",
  body: "sand",
  facial: "gold-soft",
  wellness: "forest",
};

const imageForService: Record<string, string> = {
  massage: "/images/massage.jpg",
  body: "/images/body.jpg",
  facial: "/images/facial.jpg",
  wellness: "/images/wellness.jpg",
};

const iconForService: Record<string, string> = {
  massage: "hands",
  body: "leaf",
  facial: "droplet",
  wellness: "lotus",
};

export function ServiceCard({ service }: { service: Service }) {
  const cat = getCategory(service.category);
  const tone = toneForService[service.category] || "sage";
  const icon = iconForService[service.category] || "sparkle";
  const image = imageForService[service.category] || "/images/massage.jpg";
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-28px_rgba(58,47,34,.5)]"
    >
      <ArtPanel tone={tone} image={image} className="h-48">
        <div className="flex h-full items-center justify-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/60 bg-earth/40 text-ivory/95 backdrop-blur-md transition-transform duration-500 group-hover:scale-110 shadow-lg">
            <Glyph name={icon} className="h-8 w-8" />
          </span>
        </div>
      </ArtPanel>
      <div className="p-6">
        {cat && <span className="eyebrow">{cat.label}</span>}
        <h3 className="mt-2 font-display text-2xl text-earth">{service.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{service.tagline}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="flex items-center gap-2 text-xs text-muted">
            <Glyph name="clock" className="h-3.5 w-3.5 text-gold" />
            {formatMinutes(service.durationMin)}
          </span>
          <span className="font-display text-xl text-gold">{formatPrice(service.price)}</span>
        </div>
        <span className="btn btn-outline mt-5 w-full !py-2.5 !text-[13px] group-hover:bg-gold/10">
          View treatment
        </span>
      </div>
    </Link>
  );
}

const toneForPackage: Record<string, string> = {
  "relaxation-package": "sand",
  "couple-retreat": "gold",
  "full-body-rejuvenation": "sage-deep",
  "weekend-wellness": "forest",
  "luxury-spa-experience": "earth",
  "customized-wellness-package": "ivory",
};

const imageForPackage: Record<string, string> = {
  "relaxation-package": "/images/lounge.jpg",
  "couple-retreat": "/images/suite.jpg",
  "full-body-rejuvenation": "/images/stones.jpg",
  "weekend-wellness": "/images/pool.jpg",
  "luxury-spa-experience": "/images/aromatherapy.jpg",
  "customized-wellness-package": "/images/welcome.jpg",
};

export function PackageCard({ pkg }: { pkg: SpaPackage }) {
  const tone = toneForPackage[pkg.slug] || "sand";
  const image = imageForPackage[pkg.slug];
  return (
    <div className={`group relative flex flex-col overflow-hidden rounded-[1.5rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${pkg.featured ? "bg-forest text-ivory shadow-[0_30px_70px_-28px_rgba(63,76,58,.9)]" : "card-solid"}`}>
      {pkg.featured && (
        <span className="absolute right-5 top-5 z-20 flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ivory shadow-md">
          <Glyph name="star" className="h-3 w-3" /> Signature
        </span>
      )}
      <ArtPanel tone={tone} image={image} className="h-44" grain={pkg.featured}>
        <div className="flex h-full items-center justify-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ivory/60 bg-earth/40 text-ivory/95 backdrop-blur-md shadow">
            <Glyph name="ribbon" className="h-6 w-6" />
          </span>
        </div>
      </ArtPanel>
      <div className={`flex flex-1 flex-col p-6 ${pkg.featured ? "" : ""}`}>
        <h3 className={`font-display text-2xl ${pkg.featured ? "text-ivory" : "text-earth"}`}>{pkg.name}</h3>
        <p className={`mt-1.5 text-sm ${pkg.featured ? "text-sand/80" : "text-muted"}`}>{pkg.tagline}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className={`flex items-center gap-2 text-xs ${pkg.featured ? "text-sand/70" : "text-muted"}`}>
            <Glyph name="clock" className="h-3.5 w-3.5 text-gold" />
            {formatMinutes(pkg.durationMin)}
          </span>
          <span className={`font-display text-xl ${pkg.featured ? "text-gold-soft" : "text-gold"}`}>
            {formatPrice(pkg.price)}
            {pkg.priceNote && <span className="ml-1 text-xs font-sans text-muted">{pkg.priceNote}</span>}
          </span>
        </div>
        <ul className={`mt-5 space-y-2.5 text-sm ${pkg.featured ? "text-ivory/85" : "text-earth/85"}`}>
          {pkg.includes.map((inc) => (
            <li key={inc} className="flex gap-2.5">
              <Glyph name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${pkg.featured ? "text-gold-soft" : "text-gold"}`} />
              {inc}
            </li>
          ))}
        </ul>
        <Link
          href={`/book?package=${pkg.slug}`}
          className={`btn mt-6 w-full !py-2.5 !text-[13px] ${pkg.featured ? "btn-gold" : "btn-primary"}`}
        >
          Reserve this package
        </Link>
      </div>
    </div>
  );
}

const toneForTherapist: Record<string, string> = {
  sage: "sage",
  sand: "sand",
  earth: "earth",
  ivory: "ivory",
  gold: "gold",
};

const imageForTherapist: Record<string, string> = {
  "amara-jensen": "/images/therapist-1.jpg",
  "sofia-marchetti": "/images/therapist-2.jpg",
  "daniel-okafor": "/images/therapist-4.jpg",
  "lena-novak": "/images/therapist-3.jpg",
  "priya-raman": "/images/therapist-5.jpg",
};

export function TherapistCard({ therapist }: { therapist: Therapist }) {
  const tone = toneForTherapist[therapist.tone] || "sage";
  const image = imageForTherapist[therapist.id] || "/images/therapist-1.jpg";
  return (
    <div className="card group overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <ArtPanel tone={tone} image={image} className="h-52">
        <div className="absolute inset-0 bg-gradient-to-t from-earth/90 via-earth/30 to-transparent" />
      </ArtPanel>
      <div className="p-6">
        <h3 className="font-display text-xl text-earth">{therapist.name}</h3>
        <p className="mt-1 text-xs text-muted">{therapist.experienceYears} years of practice</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {therapist.specializations.map((s) => (
            <span key={s} className="chip !text-[11px]">{s}</span>
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-earth/80">{therapist.bio}</p>
        <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
          {therapist.languages.map((l) => (
            <span key={l} className="flex items-center gap-1.5">
              <Glyph name="chat" className="h-3.5 w-3.5 text-gold" /> {l}
            </span>
          ))}
        </p>
        <Link href={`/book?therapist=${therapist.id}`} className="btn btn-outline mt-5 w-full !py-2.5 !text-[13px]">
          Book with {therapist.name.split(" ")[0]}
        </Link>
      </div>
    </div>
  );
}
