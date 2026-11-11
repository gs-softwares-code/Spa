"use client";

// Self-contained, in-browser booking store. There is no external database —
// appointments live in localStorage (the browser is the single source of truth,
// which is the honest choice for a zero-third-party Vercel deployment).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  isSlotFree,
  makeId,
  makeRef,
  slotsForDay,
  type Appointment,
  type Slot,
} from "./content";

const STORAGE_KEY = "serein.bookings.v1";

type NewAppointment = {
  serviceSlug?: string;
  packageSlug?: string;
  therapistId: string;
  date: string;
  startTime: string;
  durationMin: number;
  guest: { name: string; email: string; phone: string };
  specialRequests?: string;
  depositPaid: boolean;
  status: "pending" | "confirmed";
};

type Result = { ok: true; appointment: Appointment } | { ok: false; error: string };

type BookingContextValue = {
  appointments: Appointment[];
  createAppointment: (input: NewAppointment) => Result;
  setStatus: (id: string, status: Appointment["status"]) => void;
  reschedule: (id: string, date: string, startTime: string) => Result;
  getSlots: (date: string, therapistId: string, durationMin: number) => Slot[];
  clearAll: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function loadAppointments(): Appointment[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Appointment[]) : [];
  } catch {
    return [];
  }
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  // Hydrate once on mount.
  useEffect(() => {
    setAppointments(loadAppointments());
  }, []);

  // Persist whenever appointments change (after initial hydrate).
  useEffect(() => {
    if (appointments.length === 0) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [appointments]);

  const createAppointment = useCallback(
    (input: NewAppointment): Result => {
      if (!input.guest.name.trim() || !input.guest.email.trim()) {
        return { ok: false, error: "Please provide your name and email." };
      }
      if (!isSlotFree(appointments, input.date, input.startTime, input.durationMin, input.therapistId)) {
        return { ok: false, error: "That slot was just booked by someone else. Please choose another time." };
      }
      const appointment: Appointment = {
        id: makeId(),
        ref: makeRef(),
        serviceSlug: input.serviceSlug,
        packageSlug: input.packageSlug,
        therapistId: input.therapistId,
        date: input.date,
        startTime: input.startTime,
        durationMin: input.durationMin,
        guest: input.guest,
        specialRequests: input.specialRequests,
        status: input.status,
        depositPaid: input.depositPaid,
        createdAt: new Date().toISOString(),
      };
      setAppointments((prev) => [...prev, appointment]);
      return { ok: true, appointment };
    },
    [appointments]
  );

  const setStatus = useCallback((id: string, status: Appointment["status"]) => {
    setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
  }, []);

  const reschedule = useCallback(
    (id: string, date: string, startTime: string): Result => {
      const existing = appointments.find((a) => a.id === id);
      if (!existing) return { ok: false, error: "Appointment not found." };
      if (!isSlotFree(appointments, date, startTime, existing.durationMin, existing.therapistId, id)) {
        return { ok: false, error: "That time is no longer available. Please choose another slot." };
      }
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, date, startTime } : a))
      );
      return { ok: true, appointment: { ...existing, date, startTime } };
    },
    [appointments]
  );

  const getSlots = useCallback(
    (date: string, therapistId: string, durationMin: number) =>
      slotsForDay(appointments, date, therapistId, durationMin),
    [appointments]
  );

  const clearAll = useCallback(() => {
    setAppointments([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(
    () => ({ appointments, createAppointment, setStatus, reschedule, getSlots, clearAll }),
    [appointments, createAppointment, setStatus, reschedule, getSlots, clearAll]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within a BookingProvider");
  return ctx;
}
