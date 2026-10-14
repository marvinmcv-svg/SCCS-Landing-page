import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdminLogin } from "@/components/admin/login";
import { AdminShell } from "@/components/admin/shell";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { collectionMetas } from "@/lib/admin-data";
import { readContentFresh, storageStatus } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  if (!(await isAdmin())) return <AdminLogin configured={adminConfigured()} />;
  const metas = collectionMetas();
  const doc = await readContentFresh();
  const edited = new Set(Object.keys(doc.collections));
  const groups = [...new Set(metas.map((m) => m.group))];
  return (
    <AdminShell collections={metas} storage={storageStatus()}>
      <div className="py-10">
        <h1 className="font-display text-4xl font-semibold text-navy-900 sm:text-5xl">Website content</h1>
        <p className="mt-3 max-w-2xl text-lg text-navy-900/75">
          Choose a section to edit. Changes go live as soon as you press Save &amp; publish. Every section can be put back to its original content with Reset.
        </p>
        {doc.version !== "seed" && <p className="mt-2 text-sm text-mist">Last published {new Date(doc.version).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p>}
        {groups.map((g) => (
          <section key={g} className="mt-10">
            <h2 className="text-sm font-bold text-crimson-600">{g}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {metas
                .filter((m) => m.group === g)
                .map((m) => (
                  <li key={m.id}>
                    <Link href={`/admin/${m.id}`} className="group flex h-full flex-col rounded-3xl bg-white p-5 ring-1 ring-inset ring-border transition hover:ring-amber-500">
                      <span className="flex items-center gap-2">
                        <span className="font-display text-xl font-semibold text-navy-900">{m.label}</span>
                        {edited.has(m.id) && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-600">Edited</span>}
                      </span>
                      <span className="mt-2 flex-1 text-sm leading-relaxed text-mist">{m.description}</span>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
                        Edit
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </AdminShell>
  );
}
