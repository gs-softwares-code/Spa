import type { Metadata } from "next";
import AdminDashboard from "../../components/AdminDashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Serein Spa management — appointments, customers and business analytics.",
  robots: { index: false },
};

export default function AdminPage() {
  return <AdminDashboard />;
}
