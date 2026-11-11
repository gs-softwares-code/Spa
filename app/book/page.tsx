import { Suspense } from "react";
import type { Metadata } from "next";
import BookingWizard from "../../components/BookingWizard";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Reserve your Serein treatment or package online — choose your therapist, pick a live-availability slot, and confirm with a deposit.",
};

export default function BookPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-32 text-center text-muted">Loading booking…</div>}>
      <BookingContent searchParams={searchParams} />
    </Suspense>
  );
}

async function BookingContent({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const read = (key: string) => (typeof sp[key] === "string" ? (sp[key] as string) : undefined);
  return (
    <BookingWizard
      initialService={read("service")}
      initialPackage={read("package")}
      initialTherapist={read("therapist")}
    />
  );
}
