import type { CSSProperties } from "react";

/**
 * Self-contained visual system. All imagery is generated as soft, organic
 * gradients and line icons — no stock photography and no third-party image
 * hosts, keeping the app 100% self-contained on Vercel.
 */

export const toneGradients: Record<string, string> = {
  sage: "radial-gradient(130% 130% at 18% 8%, #aeb8a2 0%, #86947f 48%, #5c6b57 100%)",
  "sage-deep": "radial-gradient(130% 130% at 20% 10%, #6c7b66 0%, #5c6b57 55%, #3f4c3a 100%)",
  sand: "radial-gradient(130% 130% at 22% 12%, #f0e6d2 0%, #e7dbc6 50%, #d6c4a6 100%)",
  "sand-deep": "radial-gradient(130% 130% at 20% 10%, #e2d2b4 0%, #d6c4a6 55%, #bfa985 100%)",
  gold: "radial-gradient(130% 130% at 20% 10%, #d4bd95 0%, #b39164 52%, #97784d 100%)",
  "gold-soft": "radial-gradient(130% 130% at 20% 10%, #e0d0b2 0%, #cdb68e 52%, #b39164 100%)",
  earth: "radial-gradient(130% 130% at 20% 10%, #6b5646 0%, #4a3d31 55%, #332a22 100%)",
  forest: "radial-gradient(130% 130% at 20% 10%, #4e5d48 0%, #3f4c3a 55%, #2e3829 100%)",
  ivory: "radial-gradient(130% 130% at 20% 10%, #fffdf6 0%, #f3ecdf 55%, #e7dbc6 100%)",
  cream: "radial-gradient(130% 130% at 20% 10%, #faf4e8 0%, #f3ecdf 55%, #eadfcb 100%)",
};

export function ArtPanel({
  tone = "sage",
  image,
  className = "",
  children,
  grain = true,
}: {
  tone?: string;
  image?: string;
  className?: string;
  children?: React.ReactNode;
  grain?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden>
      <div className="absolute inset-0" style={{ background: toneGradients[tone] || toneGradients.sage }} />
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      {image && (
        <div className="absolute inset-0 bg-gradient-to-t from-earth/80 via-earth/30 to-black/20" />
      )}
      <div
        className="absolute -right-16 -top-16 h-64 w-64 opacity-40 blur-2xl"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.55), transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle at 40% 40%, rgba(255,255,255,0.5), transparent 65%)",
          filter: "blur(30px)",
        }}
      />
      {grain && <div className="grain absolute inset-0" />}
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

export function ToneDot({ tone, className = "" }: { tone: string; className?: string }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${className}`}
      style={{ background: toneGradients[tone] }}
    />
  );
}

type GlyphProps = { name: string; className?: string; style?: CSSProperties };

const paths: Record<string, React.ReactNode> = {
  hands: (
    <>
      <path d="M12 6v5" />
      <path d="M12 12c-1.5-1-3-1-4 0-1 .9-.6 2.3.3 3 .9.7 1.8.9 1.8 2.2" />
      <path d="M12 12c1.5-1 3-1 4 0 1 .9.6 2.3-.3 3-.9.7-1.8.9-1.8 2.2" />
      <path d="M12 8V5" /><path d="M9 9V7" /><path d="M15 9V7" />
      <path d="M12 16v3" /><path d="M9 17v1" /><path d="M15 17v1" />
    </>
  ),
  leaf: (
    <>
      <path d="M4 20c0-9 5-15 16-16 0 11-6 16-16 16Z" />
      <path d="M4 20c4-6 8-9 12-12" />
    </>
  ),
  droplet: (
    <>
      <path d="M12 3s6 6 6 11a6 6 0 0 1-12 0C6 9 12 3 12 3Z" />
      <path d="M9.5 14a2.5 2.5 0 0 0 2 2.4" />
    </>
  ),
  lotus: (
    <>
      <path d="M12 20c-4-2-6.5-5.5-6.5-9 2.5 1 4 3 4.5 5.5C11 14 11.5 12 12 10c.5 2 1 4 2 6.5 0.5-2.5 2-4.5 4.5-5.5 0 3.5-2.5 7-6.5 9Z" />
      <path d="M12 20v3" />
      <path d="M12 6V3" />
    </>
  ),
  door: (
    <>
      <path d="M4 21V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v17Z" />
      <path d="M4 21h16" />
      <circle cx="15" cy="11" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  heart: (
    <>
      <path d="M12 20s-7-4.5-9-9c-1.5-3.5 1-7 5-7 2 0 3.5 1 4 2 .5-1 2-2 4-2 4 0 6.5 3.5 5 7-2 4.5-9 9-9 9Z" />
    </>
  ),
  lounge: (
    <>
      <path d="M4 6h16" />
      <path d="M4 6c0 4 1.5 6 4 7" />
      <path d="M20 6c0 4-1.5 6-4 7" />
      <path d="M6 13c-1 2-1.5 4-1 5 1 1.5 12 1.5 14 0 .5-1 0-3-1-5" />
      <path d="M8 18.5c0 1.5 1 2 2.5 2M16 18.5c0 1.5-1 2-2.5 2" />
    </>
  ),
  steam: (
    <>
      <path d="M8 3c-1 .8-1 1.6 0 2.3C9 6 9 6.8 8 7.5" />
      <path d="M12 3c-1 .8-1 1.6 0 2.3 1 .7 1 1.5 0 2.2" />
      <path d="M16 3c-1 .8-1 1.6 0 2.3 1 .7 1 1.5 0 2.2" />
      <path d="M6 14c1-2 2-3 3.5-3 1.5 0 2 1 3.5 1s2-1 3.5-1c1.5 0 2.5 1 3.5 3" />
      <path d="M7.5 17.5c1-1.5 1.8-2.5 3-2.5 1.2 0 1.8 1 3 1s1.8-1 3-1c1.2 0 2 1 3 2.5" />
      <path d="M6 21h12" />
    </>
  ),
  flame: (
    <>
      <path d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-2 1-3.5 2-5 .5 1 1.5 1.5 2 2" />
      <path d="M12 21c-2 0-3-1-3-2.5 0-1 .5-1.7 1.2-2.3.6 1 1.5 1.5 2.3 1.5 1 0 2-1 2-2.5 0-.7-.2-1.3-.6-1.8 1.5.3 2.6 1.5 2.6 3C16.5 19.5 15 21 12 21Z" />
    </>
  ),
  bell: (
    <>
      <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 6 2 7H4c.5-1 2-3 2-7Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3Z" />
      <path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 10h16" />
      <path d="M8 3v4M16 3v4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: (
    <>
      <path d="M4 12.5 9 17.5 20 6.5" />
    </>
  ),
  star: (
    <>
      <path d="M12 3l2.6 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.4 20.1l1.4-6.3L3 9.5l6.4-.6L12 3Z" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  quote: (
    <>
      <path d="M10 8c-3 0-5 2-5 5 0 3 2 5 5 5l-1-3c-1 0-2-1-2-2 0-1 1-1.5 2-1.5V8Z" />
      <path d="M19 8c-3 0-5 2-5 5 0 3 2 5 5 5l-1-3c-1 0-2-1-2-2 0-1 1-1.5 2-1.5V8Z" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H4l1.5-2.5A8 8 0 1 1 21 12Z" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  waves: (
    <>
      <path d="M4 9c2-2 4-2 6 0s4 2 6 0 4-2 4 0" />
      <path d="M4 14c2-2 4-2 6 0s4 2 6 0 4-2 4 0" />
      <path d="M4 19c2-2 4-2 6 0s4 2 6 0 4-2 4 0" />
    </>
  ),
  ribbon: (
    <>
      <path d="M8 4h8v16l-4-3-4 3V4Z" />
    </>
  ),
};

export function Glyph({ name, className = "", style }: GlyphProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden
    >
      {paths[name] || paths.sparkle}
    </svg>
  );
}
