"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { Glyph } from "./Art";
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
  packages,
  services,
  todayISO,
  type Appointment,
} from "../lib/content";

const PASSCODE = process.env.NEXT_PUBLIC_ADMIN_PASSCODE || "serein-admin";
const SESSION_KEY = "serein.admin.session";

type Tab = "overview" | "appointments" | "customers" | "business";

export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false);
  const [code, setCode] = useState("");
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY) === "1") setAuthed(true);
    } catch { /* ignore */ }
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === PASSCODE) {
      setAuthed(true);
      try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* ignore */ }
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const logout = () => {
    setAuthed(false);
    try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
  };

  if (!authed) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-5">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
          <Glyph name="shield" className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl text-earth">Staff access</h1>
        <p className="mt-2 text-center text-sm text-muted">Enter the admin passcode to manage the spa.</p>
        <form onSubmit={login} className="mt-6 w-full">
          <input
            type="password"
            className="field text-center"
            placeholder="Passcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus
          />
          {authError && <p className="mt-3 text-sm text-red-600">Incorrect passcode — please try again.</p>}
          <button className="btn btn-primary mt-4 w-full" type="submit">Enter dashboard</button>
        </form>
        <p className="mt-6 text-xs text-muted/70">
          Demo passcode: <code className="text-earth">serein-admin</code> — set{" "}
          <code className="text-earth">NEXT_PUBLIC_ADMIN_PASSCODE</code> for your own.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="mt-2 font-display text-4xl text-earth">Spa management</h1>
        </div>
        <button onClick={logout} className="btn btn-outline self-start !py-2.5 !text-[13px]">Sign out</button>
      </div>

      <Tabs />
    </div>
  );
}

function Tabs() {
  const [tab, setTab] = useState<Tab>("overview");
  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: "overview", label: "Overview", icon: "sun" },
    { id: "appointments", label: "Appointments", icon: "calendar" },
    { id: "customers", label: "Customers", icon: "heart" },
    { id: "business", label: "Business", icon: "ribbon" },
  ];
  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2 border-b border-line pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${tab === t.id ? "bg-forest text-ivory" : "text-muted hover:bg-sage/10 hover:text-earth"}`}
          >
            <Glyph name={t.icon} className="h-4 w-4" /> {t.label}
          </button>
        ))}
      </div>
      <div className="mt-8">
        {tab === "overview" && <Overview />}
        {tab === "appointments" && <Appointments />}
        {tab === "customers" && <Customers />}
        {tab === "business" && <Business />}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- Overview ---- */

function appointmentValue(a: Appointment): number {
  if (a.serviceSlug) return getService(a.serviceSlug)?.price || 0;
  if (a.packageSlug) return getPackage(a.packageSlug)?.price || 0;
  return 0;
}

function Overview() {
  const { appointments } = useBooking();
  const today = todayISO();

  const stats = useMemo(() => {
    const active = appointments.filter((a) => a.status !== "cancelled");
    const todays = active.filter((a) => a.date === today);
    const revenue = active.reduce((sum, a) => sum + appointmentValue(a), 0);
    const deposits = active.reduce((sum, a) => sum + Math.round(appointmentValue(a) * (bookingPolicy.depositPercent / 100)), 0);
    const byStatus = {
      confirmed: active.filter((a) => a.status === "confirmed").length,
      pending: active.filter((a) => a.status === "pending").length,
      cancelled: appointments.filter((a) => a.status === "cancelled").length,
    };
    return { active: active.length, todays, revenue, deposits, byStatus };
  }, [appointments, today]);

  const nextUp = useMemo(
    () =>
      appointments
        .filter((a) => a.status !== "cancelled" && a.date >= today)
        .sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime))
        .slice(0, 5),
    [appointments, today]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
        <StatCard icon="calendar" label="Total active bookings" value={String(stats.active)} />
        <StatCard icon="sun" label="Today's visits" value={String(stats.todays.length)} />
        <StatCard icon="ribbon" label="Projected revenue" value={formatPrice(stats.revenue)} />
        <StatCard icon="shield" label="Deposits collected" value={formatPrice(stats.deposits)} />
      </div>

      <div className="card-solid p-6">
        <h3 className="eyebrow">Status breakdown</h3>
        <div className="mt-4 space-y-3 text-sm">
          <Bar label="Confirmed" count={stats.byStatus.confirmed} total={stats.active} color="bg-forest" />
          <Bar label="Awaiting confirmation" count={stats.byStatus.pending} total={stats.active} color="bg-gold" />
          <Bar label="Cancelled" count={stats.byStatus.cancelled} total={stats.active} color="bg-sand-deep" />
        </div>
      </div>

      <div className="card-solid p-6 lg:col-span-3">
        <h3 className="eyebrow">Upcoming visits</h3>
        {nextUp.length === 0 ? (
          <p className="mt-4 text-sm text-muted">No upcoming bookings yet — share the booking link!</p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-wide text-muted">
                  <th className="pb-3">Ref</th><th className="pb-3">Guest</th><th className="pb-3">Treatment</th>
                  <th className="pb-3">Date</th><th className="pb-3">Time</th><th className="pb-3">Value</th>
                </tr>
              </thead>
              <tbody>
                {nextUp.map((a) => (
                  <tr key={a.id} className="border-t border-line">
                    <td className="py-3 font-medium text-gold">{a.ref}</td>
                    <td className="py-3">{a.guest.name}</td>
                    <td className="py-3">{displayName(a)}</td>
                    <td className="py-3">{formatDatePretty(a.date)}</td>
                    <td className="py-3">{a.startTime}</td>
                    <td className="py-3 font-medium">{formatPrice(appointmentValue(a))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="card-solid p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/15 text-sage-deep">
        <Glyph name={icon} className="h-5 w-5" />
      </span>
      <div className="mt-4 font-display text-3xl text-earth">{value}</div>
      <div className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{label}</div>
    </div>
  );
}

function Bar({ label, count, total, color }: { label: string; count: number; total: number; color: string }) {
  const pct = total ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted">
        <span>{label}</span><span className="text-earth">{count}</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-line/40">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------- Appointments ---- */

function displayName(a: Appointment): string {
  if (a.serviceSlug) return getService(a.serviceSlug)?.name || "Treatment";
  if (a.packageSlug) return getPackage(a.packageSlug)?.name || "Package";
  return "Custom";
}

function Appointments() {
  const { appointments, setStatus, reschedule, getSlots } = useBooking();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "upcoming" | "cancelled">("all");
  const today = todayISO();
  const [rsDate, setRsDate] = useState(today);
  const [rsTime, setRsTime] = useState<string | undefined>();
  const [rsError, setRsError] = useState<string | null>(null);

  const list = useMemo(() => {
    let arr = [...appointments].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (filter === "upcoming") arr = arr.filter((a) => a.status !== "cancelled" && a.date >= today);
    if (filter === "cancelled") arr = arr.filter((a) => a.status === "cancelled");
    return arr;
  }, [appointments, filter, today]);

  const statusBadge = (s: Appointment["status"]) => {
    const map = {
      confirmed: "bg-forest text-ivory",
      pending: "bg-gold text-ivory",
      cancelled: "bg-sand-deep text-earth",
    };
    return <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${map[s]}`}>{s}</span>;
  };

  const openRs = (a: Appointment) => {
    setExpanded(expanded === a.id ? null : a.id);
    setRsDate(a.date);
    setRsTime(undefined);
    setRsError(null);
  };

  const doReschedule = (a: Appointment) => {
    if (!rsTime) { setRsError("Choose a new time."); return; }
    const res = reschedule(a.id, rsDate, rsTime);
    if (!res.ok) { setRsError(res.error); return; }
    setExpanded(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {(["all", "upcoming", "cancelled"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${filter === f ? "bg-forest text-ivory" : "bg-white/60 text-muted hover:text-earth"}`}>
              {f}
            </button>
          ))}
        </div>
        <span className="text-sm text-muted">{list.length} shown</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[52rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted">
              <th className="pb-3">Ref</th><th className="pb-3">Guest</th><th className="pb-3">Treatment</th>
              <th className="pb-3">Therapist</th><th className="pb-3">Date</th><th className="pb-3">Time</th>
              <th className="pb-3">Status</th><th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((a) => (
              <Fragment key={a.id}>
                <tr className="border-t border-line">
                  <td className="py-3.5 font-medium text-gold">{a.ref}</td>
                  <td className="py-3.5">
                    <div className="font-medium text-earth">{a.guest.name}</div>
                    <div className="text-xs text-muted">{a.guest.email}</div>
                  </td>
                  <td className="py-3.5">{displayName(a)}<div className="text-xs text-muted">{formatMinutes(a.durationMin)}</div></td>
                  <td className="py-3.5">{getTherapist(a.therapistId)?.name || "TBA"}</td>
                  <td className="py-3.5">{formatDatePretty(a.date)}</td>
                  <td className="py-3.5">{a.startTime}</td>
                  <td className="py-3.5">{statusBadge(a.status)}</td>
                  <td className="py-3.5">
                    <div className="flex justify-end gap-2">
                      {a.status === "cancelled" ? (
                        <button onClick={() => setStatus(a.id, "confirmed")} className="chip !text-[11px] hover:bg-forest hover:text-ivory">Reinstate</button>
                      ) : (
                        <>
                          {a.status !== "confirmed" && (
                            <button onClick={() => setStatus(a.id, "confirmed")} className="chip !text-[11px] hover:bg-forest hover:text-ivory">Confirm</button>
                          )}
                          <button onClick={() => openRs(a)} className="chip !text-[11px] hover:bg-gold hover:text-ivory">Reschedule</button>
                          <button onClick={() => setStatus(a.id, "cancelled")} className="chip !text-[11px] hover:bg-red-100 hover:text-red-700">Cancel</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
                {expanded === a.id && (
                  <tr>
                    <td colSpan={8} className="bg-cream/60 py-5 pl-8 pr-5">
                      <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
                        <div>
                          <label className="field-label">New date</label>
                          <select className="field" value={rsDate} onChange={(e) => { setRsDate(e.target.value); setRsTime(undefined); }}>
                            {Array.from({ length: 14 }, (_, i) => addDaysISO(today, i)).map((d) => (
                              <option key={d} value={d}>{formatDatePretty(d)}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="field-label">New time</label>
                          <div className="flex flex-wrap gap-2">
                            {getSlots(rsDate, a.therapistId, a.durationMin).map((s) => (
                              <button
                                key={s.time}
                                disabled={!s.available}
                                onClick={() => { setRsTime(s.time); setRsError(null); }}
                                className={`rounded-lg border px-2.5 py-1.5 text-xs font-medium ${!s.available ? "cursor-not-allowed text-muted/40 line-through" : rsTime === s.time ? "border-gold bg-gold text-ivory" : "border-line bg-white text-earth hover:border-gold"}`}
                              >
                                {s.time}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {rsError && <span className="text-xs text-red-600">{rsError}</span>}
                          <button onClick={() => doReschedule(a)} className="btn btn-primary !py-2 !text-[12px]">Apply new time</button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {list.length === 0 && <p className="py-10 text-center text-muted">No appointments in this view.</p>}
    </div>
  );
}

/* ------------------------------------------------------------ Customers ---- */

function Customers() {
  const { appointments } = useBooking();

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone: string; bookings: Appointment[] }>();
    appointments.forEach((a) => {
      const key = a.guest.email.toLowerCase();
      const existing = map.get(key);
      if (existing) {
        existing.bookings.push(a);
      } else {
        map.set(key, { name: a.guest.name, email: a.guest.email, phone: a.guest.phone, bookings: [a] });
      }
    });
    return Array.from(map.values()).sort((x, y) => y.bookings.length - x.bookings.length);
  }, [appointments]);

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-muted">
              <th className="pb-3">Customer</th><th className="pb-3">Contact</th>
              <th className="pb-3">Bookings</th><th className="pb-3">Last visit</th><th className="pb-3">Lifetime value</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => {
              const active = c.bookings.filter((b) => b.status !== "cancelled");
              const last = active.sort((a, b) => b.date.localeCompare(a.date))[0];
              const value = active.reduce((sum, b) => sum + appointmentValue(b), 0);
              const prefs = Array.from(new Set(active.map((b) => displayName(b)))).slice(0, 3);
              return (
                <tr key={c.email} className="border-t border-line align-top">
                  <td className="py-4">
                    <div className="font-medium text-earth">{c.name}</div>
                    <div className="text-xs text-muted">{c.bookings.length} booking{c.bookings.length !== 1 ? "s" : ""}</div>
                  </td>
                  <td className="py-4 text-muted">{c.email}{c.phone ? <div className="text-xs">{c.phone}</div> : null}</td>
                  <td className="py-4">
                    <div className="flex max-w-[16rem] flex-wrap gap-1.5">
                      {prefs.map((p) => <span key={p} className="chip !text-[10px]">{p}</span>)}
                    </div>
                  </td>
                  <td className="py-4">{last ? formatDatePretty(last.date) : "—"}</td>
                  <td className="py-4 font-medium text-gold">{formatPrice(value)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {customers.length === 0 && <p className="py-10 text-center text-muted">No customers yet.</p>}
    </div>
  );
}

/* -------------------------------------------------------------- Business ---- */

function Business() {
  const { appointments } = useBooking();
  const today = todayISO();

  const weekly = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => addDaysISO(today, i));
    return days.map((d) => ({
      day: new Date(d + "T12:00:00").toLocaleDateString("en-US", { weekday: "short" }),
      count: appointments.filter((a) => a.status !== "cancelled" && a.date === d).length,
    }));
  }, [appointments, today]);

  const maxCount = Math.max(1, ...weekly.map((w) => w.count));

  const servicesSnapshot = { services, packages };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 7-day bookings */}
      <div className="card-solid p-6">
        <h3 className="eyebrow">Bookings — next 7 days</h3>
        <div className="mt-6 flex h-44 items-end justify-between gap-3">
          {weekly.map((w) => (
            <div key={w.day} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium text-earth">{w.count}</span>
              <div className="w-full rounded-t-lg bg-sage/70" style={{ height: `${(w.count / maxCount) * 100}%` }} />
              <span className="text-[11px] uppercase text-muted">{w.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="card-solid p-6">
        <h3 className="eyebrow">Business settings</h3>
        <dl className="mt-5 space-y-3 text-sm">
          <Setting label="Deposit rate" value={`${bookingPolicy.depositPercent}%`} />
          <Setting label="Cancellation notice" value={`${bookingPolicy.cancelNoticeHours} hours`} />
          <Setting label="Rescheduling notice" value={`${bookingPolicy.rescheduleNoticeHours} hours`} />
          <Setting label="Appointment slots" value={formatMinutes(bookingPolicy.slotStepMin)} />
          <Setting label="Hours" value="Mon – Sat · 9am – 7pm" />
        </dl>
        <p className="mt-5 rounded-xl bg-cream px-4 py-3 text-xs text-muted">
          Promotions, gallery and staff management are configured in the site content files (lib/content.ts). These settings are displayed here for reference.
        </p>
      </div>

      {/* Service catalog */}
      <div className="card-solid p-6 lg:col-span-2">
        <h3 className="eyebrow">Service & package catalog</h3>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-2 text-xs uppercase tracking-wide text-muted">Treatments</h4>
            <div className="overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-sm">
                <tbody>
                  {servicesSnapshot.services.map((s) => (
                    <tr key={s.name} className="border-t border-line first:border-t-0">
                      <td className="px-4 py-2.5">{s.name}</td>
                      <td className="px-4 py-2.5 text-right text-muted">{formatMinutes(s.durationMin)}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gold">{formatPrice(s.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-xs uppercase tracking-wide text-muted">Packages</h4>
            <div className="overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-sm">
                <tbody>
                  {servicesSnapshot.packages.map((p) => (
                    <tr key={p.name} className="border-t border-line first:border-t-0">
                      <td className="px-4 py-2.5">{p.name}</td>
                      <td className="px-4 py-2.5 text-right font-medium text-gold">{formatPrice(p.price)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-3 last:border-b-0">
      <span className="text-muted">{label}</span>
      <span className="font-medium text-earth">{value}</span>
    </div>
  );
}
