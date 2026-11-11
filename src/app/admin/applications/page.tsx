import { ExternalLink, FileText, Mail, MapPin, Phone } from "lucide-react";
import { AdminLogin } from "@/components/admin/login";
import { AdminShell } from "@/components/admin/shell";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { collectionMetas } from "@/lib/admin-data";
import { storageStatus } from "@/lib/content/store";
import { listApplications } from "@/lib/applications";

export const dynamic = "force-dynamic";

const when = (iso: string) => new Date(iso).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short", timeZone: "America/La_Paz" });
const size = (bytes: number) => (bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`);

export default async function AdminApplications() {
  if (!(await isAdmin())) return <AdminLogin configured={adminConfigured()} />;
  const applications = await listApplications();
  const positions = [...new Set(applications.map((a) => a.position))];
  return (
    <AdminShell collections={collectionMetas()} storage={storageStatus()}>
      <div className="py-10">
        <h1 className="font-display text-4xl font-semibold text-navy-900 sm:text-5xl">Job applications</h1>
        <p className="mt-3 max-w-2xl text-lg text-navy-900/75">
          Every application sent from the Apply form on the careers page, newest first, with the résumé attached. Reply to candidates by email. The open positions themselves are edited under <b>Work at SCCS</b>.
        </p>
        {positions.length > 0 && (
          <p className="mt-4 text-sm text-mist">
            {applications.length} application{applications.length === 1 ? "" : "s"} for {positions.length} position{positions.length === 1 ? "" : "s"}.
          </p>
        )}
        {applications.length === 0 ? (
          <p className="mt-10 rounded-3xl bg-white p-8 text-mist ring-1 ring-inset ring-border">No applications yet.</p>
        ) : (
          <ul className="mt-10 space-y-3">
            {applications.map((a) => (
              <li key={a.id} className="rounded-3xl bg-white p-6 ring-1 ring-inset ring-border">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="font-display text-2xl font-semibold text-navy-900">{a.name}</p>
                  <p className="text-sm text-mist">{when(a.receivedAt)} (Bolivia)</p>
                </div>
                <p className="mt-1 text-sm font-semibold text-crimson-600">
                  {a.position}
                  <span className="font-normal text-mist"> · {a.experience} experience</span>
                </p>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <a href={`mailto:${a.email}?subject=${encodeURIComponent(`Your application: ${a.position}`)}`} className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-navy-600">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {a.email}
                  </a>
                  {a.phone && (
                    <a href={`tel:${a.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-navy-600">
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {a.phone}
                    </a>
                  )}
                  {a.location && (
                    <span className="inline-flex items-center gap-1.5 text-navy-800">
                      <MapPin className="h-4 w-4" aria-hidden="true" />
                      {a.location}
                    </span>
                  )}
                  {a.link && (
                    <a href={a.link} target="_blank" rel="noopener noreferrer nofollow" className="inline-flex items-center gap-1.5 font-semibold text-navy-800 hover:text-navy-600">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Profile link
                    </a>
                  )}
                </div>
                <div className="mt-3 text-sm">
                  {a.resume.url ? (
                    <a href={a.resume.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-navy-800 px-4 py-2 font-semibold text-ivory hover:bg-navy-700">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      Résumé: {a.resume.name} ({size(a.resume.size)})
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-mist">
                      <FileText className="h-4 w-4" aria-hidden="true" />
                      Résumé saved locally: {a.resume.localPath}
                    </span>
                  )}
                </div>
                <p className="mt-4 whitespace-pre-line rounded-2xl bg-cream/60 p-4 text-navy-900/85">{a.letter}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminShell>
  );
}
