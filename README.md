# Serein Spa & Wellness

A premium, production-ready spa and wellness website and booking platform, built as a
**full-stack Next.js** application that is **fully self-contained and runs on Vercel
alone — with zero third-party platform dependencies** (no external database, no
third-party auth, no real payment gateway).

> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 ·
> Cormorant Garamond + Inter (self-hosted via `next/font`)

---

## Running locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Production build & preview:

```bash
npm run build
npm run start
```

## Deploying to Vercel

Push this repository to GitHub, then import it in Vercel — no other services are
required. Deploy as the default Next.js project.

Environment variables (optional):

| Variable | Default | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_ADMIN_PASSCODE` | `serein-admin` | Admin dashboard passcode |

---

## Architecture & data persistence

Because the app must run self-contained on Vercel, there is deliberately **no
external database**. Bookings and admin data live in the browser as the source of
truth:

- **Catalog** (services, packages, therapists, facilities, offers, gallery) lives in
  [`lib/content.ts`](lib/content.ts) — a typed, single source used by every page.
- **Appointments & customer data** are managed by the client-side booking store
  ([`lib/store.tsx`](lib/store.tsx)), persisted to `localStorage`. This is the honest
  choice for a zero-third-party deployment.
- **Double-booking prevention** is enforced in the store:

  `isSlotFree` rejects any new booking that overlaps an existing one for the same
  date, therapist, and time window — unavailable slots are never shown as bookable.

This is a deliberate trade-off: on a purely static Vercel deploy there is no
persistent server-side store. If you later decide to allow a hosted database, the
store's API (`createAppointment`, `setStatus`, `reschedule`, `getSlots`) is the single
place to swap `localStorage` for server calls.

---

## Pages & features

| Route | What it delivers |
| --- | --- |
| `/` | Immersive homepage: hero, intro, signature treatments, featured packages, why-us, atmosphere, philosophy, testimonials, offers, gallery |
| `/services` | All four treatment families with pricing, duration, benefits |
| `/services/[slug]` | Treatment detail: overview, experience, prep, related treatments, booking CTA |
| `/packages` | Six spa packages with inclusions and pricing |
| `/therapists` | Therapist profiles (specializations, experience, languages) |
| `/facilities` | Facilities & experience tour |
| `/about` | Brand story, standards, philosophy |
| `/book` | Multi-step booking wizard → treatment/package → therapist → live date & slot availability → guest details → deposit → confirmation with reference |
| `/admin` | Secure admin dashboard: overview analytics, appointment management (confirm / cancel / reschedule), customer profiles, business settings & catalog |

### Booking flow
1. Choose a treatment or package
2. Choose a preferred therapist
3. Pick a date and see **real-time available slots** (unavailable ones are disabled)
4. Enter guest details + special requests
5. Confirm with a simulated 20% deposit → email-able confirmation with reference code

### Admin dashboard
- **Overview** — active bookings, today's visits, projected revenue, deposits, 7-day forecast
- **Appointments** — filter by status, confirm, cancel, and **reschedule** (with live slot validation)
- **Customers** — derived profiles with booking history and lifetime value
- **Business** — settings, 7-day bookings chart, and the service/package catalog

---

## Design system

Contemporary Luxury Wellness / Organic Minimalism:

- **Palette:** sage green, warm ivory, sand beige, muted gold, earthy brown
- **Type:** Cormorant Garamond (display) + Inter (body)
- **Imagery:** fully self-contained — soft layered gradients, organic blob shapes,
  and line glyphs replace stock photography (see [`components/Art.tsx`](components/Art.tsx))

---

## Compliance & honesty notes

- **No fabricated reviews** — testimonial cards are clearly labeled placeholders to
  be replaced with verified guest feedback.
- **No fabricated certifications** — therapist pages state experience and
  specialization only; certifications are added once verified.
- **No medical claims** — copy deliberately avoids unsupported health claims.
- **Placeholder contact details** use the reserved `(555)` number and
  `example.com`-style email/URL; replace them via `lib/content.ts` (`site` object).
- **Payments are simulated** — the 20% deposit is a booking confirmation step, not a
  real charge. Wire up a provider only if you explicitly opt into a third party.

---

## Project structure

```
app/                # Next.js App Router pages & layout
components/         # UI: nav, footer, cards, booking wizard, admin dashboard, art
lib/content.ts      # Domain data + slot/availability logic
lib/store.tsx       # Client booking store (localStorage persistence)
```
