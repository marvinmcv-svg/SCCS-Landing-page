import { Mail, Phone } from "lucide-react";
import { AdminLogin } from "@/components/admin/login";
import { AdminShell } from "@/components/admin/shell";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { collectionMetas } from "@/lib/admin-data";
import { storageStatus } from "@/lib/content/store";
import { listInquiries } from "@/lib/inquiries";

export const dynamic = "force-dynamic";

const when = (iso: string) => new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/La_Paz" });

export default async function AdminInquiries() {
  if (!(await isAdmin())) return <AdminLogin configured={adminConfigured()} />;
  const inquiries = await listInquiries();
  return (
    <AdminShell collections={collectionMetas()} storage={storageStatus()}>
      <div className="py-10">
        <h1 className="font-display text-4xl font-semibold text-navy-900 sm:text-5xl">Admissions inquiries</h1>
        <p className="mt-3 max-w-2xl text-lg text-navy-900/75">
          Every inquiry sent from the form on the Admissions page, newest first. Reply to families by email or phone; the form promises a reply within one school day.
        </p>
        {inquiries.length === 0 ? (
          <p className="mt-10 rounded-3xl bg-white p-8 text-mist ring-1 ring-inset ring-border">No inquiries yet.</p>
        ) : (
          <ul className="mt-10 space-y-3">
            {inquiries.map((q) => (
              <li key={q.id} className="rounded-3xl bg-white p-6 ring-1 ring-inset ring-border">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="font-display text-2xl font-semibold text-navy-900">{q.name}</p>
                  <p className="text-sm text-mist">{when(q.receivedAt)} (Bolivia)</p>
                </div>
                <p className="mt-1 text-sm font-semibold text-crimson-600">
                  {q.grade}
                  {q.tourDate && <span className="font-normal text-mist"> · Preferred tour date {q.tourDate}</span>}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <a href={`mailto:${q.email}`} className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-navy-600">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {q.email}
                  </a>
                  {q.phone && (
                    <a href={`tel:${q.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-navy-600">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {q.phone}
                    </a>
                  )}
                </div>
                {q.message && <p className="mt-4 whitespace-pre-line rounded-2xl bg-cream/60 p-4 text-navy-900/85">{q.message}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
