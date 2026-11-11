"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Glyph, ArtPanel } from "./Art";
import { useBooking } from "../lib/store";
import {
  addDaysISO,
  bookingPolicy,
  formatDatePretty,
  formatMinutes,
  formatPrice,
  getPackage,
  getService,
  getTherapist,
  therapists,
  todayISO,
  servicesByCategory,
  categories,
} from "../lib/content";

type Props = {
  initialService?: string;
  initialPackage?: string;
  initialTherapist?: string;
};

const steps = ["Treatment", "Therapist", "Date & time", "Details", "Confirm"];

export default function BookingWizard({ initialService, initialPackage, initialTherapist }: Props) {
  const { appointments, createAppointment, getSlots } = useBooking();

  const [step, setStep] = useState(0);
  const [serviceSlug, setServiceSlug] = useState<string | undefined>(initialService);
  const [packageSlug, setPackageSlug] = useState<string | undefined>(initialPackage);
  const [therapistId, setTherapistId] = useState<string | undefined>(initialTherapist);
  const [date, setDate] = useState<string>(todayISO());
  const [startTime, setStartTime] = useState<string | undefined>(undefined);
  const [guest, setGuest] = useState({ name: "", email: "", phone: "" });
  const [specialRequests, setSpecialRequests] = useState("");
  const [depositAgreed, setDepositAgreed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<{ ref: string; date: string; startTime: string; total: number; deposit: number; name: string } | null>(null);

  const service = serviceSlug ? getService(serviceSlug) : undefined;
  const pkg = packageSlug ? getPackage(packageSlug) : undefined;
  const therapist = therapistId ? getTherapist(therapistId) : undefined;

  const durationMin = service?.durationMin ?? pkg?.durationMin ?? 60;
  const total = service ? service.price : pkg ? pkg.price : 0;
  const deposit = Math.round(total * (bookingPolicy.depositPercent / 100));

  const dates = useMemo(() => Array.from({ length: 14 }, (_, i) => addDaysISO(todayISO(), i)), []);
  const slots = date ? getSlots(date, therapistId || "", durationMin) : [];

  // ---- Validation per step ----
  const canNext = () => {
    if (step === 0) return !!(service || pkg);
    if (step === 1) return !!therapistId;
    if (step === 2) return !!date && !!startTime;
    if (step === 3) return guest.name.trim().length > 0 && /^\S+@\S+\.\S+$/.test(guest.email);
    return true;
  };

  const goNext = () => {
    setError(null);
    if (step === 3) {
      if (!depositAgreed) {
        setError("Please agree to the deposit to confirm your reservation.");
        return;
      }
      const res = createAppointment({
        serviceSlug,
        packageSlug,
        therapistId: therapistId!,
        date: date!,
        startTime: startTime!,
        durationMin,
        guest,
        specialRequests: specialRequests.trim() || undefined,
        depositPaid: true,
        status: "confirmed",
      });
      if (!res.ok) {
        setError(res.error);
        setStep(2); // return to slot selection if conflict
        setStartTime(undefined);
        return;
      }
      setConfirmed({
        ref: res.appointment.ref,
        date: res.appointment.date,
        startTime: res.appointment.startTime,
        total,
        deposit,
        name: guest.name.trim(),
      });
      setStep(4);
      return;
    }
    if (step === 2 && !startTime) {
      setError("Please choose an available time slot.");
      return;
    }
    setStep((s) => s + 1);
  };

  const goBack = () => {
    setError(null);
    setStep((s) => Math.max(0, s - 1));
  };

  // ---- Confirmation screen ----
  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <div className="card-solid overflow-hidden text-center">
          <div className="bg-forest px-8 py-10">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ivory">
              <Glyph name="check" className="h-8 w-8" />
            </span>
            <h2 className="mt-5 font-display text-3xl text-ivory">Your visit is reserved</h2>
            <p className="mt-2 text-sand/85">A confirmation will be sent to <span className="text-ivory">{guest.email}</span>.</p>
          </div>
          <div className="px-8 py-8">
            <p className="eyebrow">Reference</p>
            <p className="mt-1 font-display text-2xl text-gold">{confirmed.ref}</p>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 text-left text-sm">
              <div><dt className="text-muted">Treatment</dt><dd className="mt-0.5 font-medium text-earth">{service?.name || pkg?.name}</dd></div>
              <div><dt className="text-muted">Therapist</dt><dd className="mt-0.5 font-medium text-earth">{therapist?.name || "Available on arrival"}</dd></div>
              <div><dt className="text-muted">Date</dt><dd className="mt-0.5 font-medium text-earth">{formatDatePretty(confirmed.date)}</dd></div>
              <div><dt className="text-muted">Time</dt><dd className="mt-0.5 font-medium text-earth">{confirmed.startTime}</dd></div>
              <div><dt className="text-muted">Duration</dt><dd className="mt-0.5 font-medium text-earth">{formatMinutes(durationMin)}</dd></div>
              <div><dt className="text-muted">Deposit paid</dt><dd className="mt-0.5 font-medium text-earth">{formatPrice(confirmed.deposit)}</dd></div>
            </dl>

            <p className="mt-6 rounded-xl bg-cream px-5 py-4 text-xs leading-relaxed text-muted">
              The balance of <b>{formatPrice(confirmed.total - confirmed.deposit)}</b> is settled at the spa.
              Free rescheduling up to {bookingPolicy.rescheduleNoticeHours}h before; cancellations up to {bookingPolicy.cancelNoticeHours}h before.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={`mailto:${guest.email}?subject=${encodeURIComponent("Your Serein appointment — " + confirmed.ref)}&body=${encodeURIComponent("Thank you for booking with Serein Spa & Wellness.\n\nReference: " + confirmed.ref + "\nTreatment: " + (service?.name || pkg?.name) + "\nDate: " + formatDatePretty(confirmed.date) + " at " + confirmed.startTime + "\nDeposit: " + formatPrice(confirmed.deposit) + "\n\nWe look forward to welcoming you.")}`}
                className="btn btn-primary"
              >
                Email me the confirmation
              </a>
              <Link href="/admin" className="btn btn-outline">View in admin dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="text-center">
        <span className="eyebrow">Reservations</span>
        <h1 className="mt-4 font-display text-4xl text-earth sm:text-5xl">Book your experience</h1>
      </div>

      {/* Progress */}
      <div className="mx-auto mt-10 flex max-w-3xl items-center justify-between">
        {steps.map((label, i) => (
          <div key={label} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${i < step ? "bg-gold text-ivory" : i === step ? "bg-forest text-ivory" : "bg-line/30 text-muted"}`}>
                {i < step ? <Glyph name="check" className="h-4 w-4" /> : i + 1}
              </span>
              <span className={`mt-2 hidden text-[11px] uppercase tracking-wide sm:block ${i === step ? "text-earth" : "text-muted"}`}>{label}</span>
            </div>
            {i < steps.length - 1 && <div className={`mx-2 h-px flex-1 ${i < step ? "bg-gold" : "bg-line"}`} />}
          </div>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.7fr_1fr]">
        {/* Main panel */}
        <div>
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-sm text-red-700">
              <Glyph name="shield" className="mt-0.5 h-5 w-5 shrink-0" />
              {error}
            </div>
          )}

          {step === 0 && (
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-2xl text-earth">Choose a treatment</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {categories.map((c) => (
                    <div key={c.slug}>
                      <p className="field-label">{c.label}</p>
                      <div className="space-y-2">
                        {servicesByCategory(c.slug).map((s) => (
                          <button
                            key={s.slug}
                            onClick={() => { setServiceSlug(s.slug); setPackageSlug(undefined); }}
                            className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${serviceSlug === s.slug ? "border-gold bg-gold/10 text-earth" : "border-line bg-white/50 hover:border-gold/50"}`}
                          >
                            <span className="font-medium">{s.name}</span>
                            <span className="shrink-0 text-xs text-muted">{formatMinutes(s.durationMin)} · {formatPrice(s.price)}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl text-earth">…or a package</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[getPackage("relaxation-package"), getPackage("couple-retreat"), getPackage("weekend-wellness"), getPackage("luxury-spa-experience")].filter(Boolean).map((p) => (
                    <button
                      key={p!.slug}
                      onClick={() => { setPackageSlug(p!.slug); setServiceSlug(undefined); }}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${packageSlug === p!.slug ? "border-gold bg-gold/10 text-earth" : "border-line bg-white/50 hover:border-gold/50"}`}
                    >
                      <span className="font-medium">{p!.name}</span>
                      <span className="shrink-0 text-xs text-muted">{formatPrice(p!.price)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="font-display text-2xl text-earth">Choose your therapist</h2>
              <p className="mt-2 text-sm text-muted">Each specialist brings a different pace and focus. Book someone you know, or let us assign the best fit.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {therapists.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTherapistId(t.id)}
                    className={`flex items-center gap-4 rounded-xl border p-4 text-left transition-colors ${therapistId === t.id ? "border-gold bg-gold/10" : "border-line bg-white/50 hover:border-gold/50"}`}
                  >
                    <ArtPanel tone={t.tone} className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
                      <Glyph name="hands" className="h-6 w-6 text-ivory" />
                    </ArtPanel>
                    <span>
                      <span className="block font-medium text-earth">{t.name}</span>
                      <span className="block text-xs text-muted">{t.specializations.slice(0, 2).join(" · ")}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="font-display text-2xl text-earth">Pick a date &amp; time</h2>
              <p className="mt-2 text-sm text-muted">Slots update in real time. A slot that disappears means someone else just took it — the system prevents double-booking.</p>

              <div className="mt-6">
                <p className="field-label">Date</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map((d) => (
                    <button
                      key={d}
                      onClick={() => { setDate(d); setStartTime(undefined); }}
                      className={`shrink-0 rounded-xl border px-4 py-3 text-center transition-colors ${date === d ? "border-forest bg-forest text-ivory" : "border-line bg-white/60 hover:border-gold/60"}`}
                    >
                      <span className="block text-[11px] uppercase tracking-wide opacity-80">{new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" })}</span>
                      <span className="block font-display text-xl">{new Date(d + "T12:00:00").getDate()}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="field-label">Available times</p>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
                  {slots.map((s) => (
                    <button
                      key={s.time}
                      disabled={!s.available}
                      onClick={() => { setStartTime(s.time); setError(null); }}
                      className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                        !s.available
                          ? "cursor-not-allowed border-line/40 text-muted/40 line-through"
                          : startTime === s.time
                          ? "border-gold bg-gold text-ivory"
                          : "border-line bg-white/60 text-earth hover:border-gold"
                      }`}
                    >
                      {s.time}
                    </button>
                  ))}
                </div>
                {slots.length > 0 && !slots.some((s) => s.available) && (
                  <p className="mt-3 text-sm text-muted">This day is fully booked — try another date.</p>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="font-display text-2xl text-earth">Your details</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="field-label">Full name</label>
                  <input className="field" value={guest.name} onChange={(e) => setGuest({ ...guest, name: e.target.value })} placeholder="Alexandra Reed" />
                </div>
                <div>
                  <label className="field-label">Email</label>
                  <input className="field" type="email" value={guest.email} onChange={(e) => setGuest({ ...guest, email: e.target.value })} placeholder="you@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="field-label">Phone (optional)</label>
                  <input className="field" value={guest.phone} onChange={(e) => setGuest({ ...guest, phone: e.target.value })} placeholder="+1 (555) 000-0000" />
                </div>
                <div className="sm:col-span-2">
                  <label className="field-label">Special requests (optional)</label>
                  <textarea className="field min-h-[6rem] resize-none" value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)} placeholder="Pressure preference, aromas to avoid, occasion…" />
                </div>
              </div>

              <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-xl border border-line bg-white/50 px-5 py-4 text-sm">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-[#b39164]" checked={depositAgreed} onChange={(e) => setDepositAgreed(e.target.checked)} />
                <span className="text-earth/85">
                  I agree to reserve with a <b>{formatPrice(deposit)}</b> deposit ({bookingPolicy.depositPercent}% of {formatPrice(total)}).
                  The balance is settled at the spa.
                </span>
              </label>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-10 flex items-center justify-between">
            {step > 0 ? (
              <button onClick={goBack} className="btn btn-outline !py-2.5 !text-[13px]">Back</button>
            ) : (
              <Link href="/services" className="btn btn-outline !py-2.5 !text-[13px]">Browse treatments</Link>
            )}
            <button onClick={goNext} disabled={!canNext()} className={`btn !py-2.5 !text-[13px] ${canNext() ? "btn-primary" : "cursor-not-allowed opacity-40"}`}>
              {step === steps.length - 2 ? "Confirm reservation" : "Continue"}
            </button>
          </div>
        </div>

        {/* Summary rail */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="card-solid p-6">
            <h3 className="eyebrow">Your visit</h3>
            <div className="mt-5 space-y-4 text-sm">
              <SummaryRow label="Treatment" value={service?.name || pkg?.name || "Not selected"} />
              <SummaryRow label="Therapist" value={therapist?.name || "Not selected"} />
              <SummaryRow label="Duration" value={durationMin ? formatMinutes(durationMin) : "—"} />
              <SummaryRow label="Date" value={date ? formatDatePretty(date) : "—"} />
              <SummaryRow label="Time" value={startTime || "—"} />
            </div>
            <div className="mt-6 border-t border-line pt-4">
              <div className="flex items-center justify-between">
                <span className="text-muted">Total</span>
                <span className="font-display text-2xl text-gold">{formatPrice(total)}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted">
                <span>Deposit due now</span>
                <span className="font-medium text-earth">{formatPrice(deposit)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-0.5 font-medium text-earth">{value}</div>
    </div>
  );
}
