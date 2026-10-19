import Link from "next/link";
import { ArrowRight, ImagePlus, Images } from "lucide-react";
import { AdminLogin } from "@/components/admin/login";
import { AdminShell } from "@/components/admin/shell";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { collectionMetas } from "@/lib/admin-data";
import { currentOf } from "@/lib/content/engine";
import { siteSpots } from "@/lib/content/photo-spots";
import { readContentFresh, storageStatus } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function AdminHome() {
  if (!(await isAdmin())) return <AdminLogin configured={adminConfigured()} />;
  const metas = collectionMetas();
  const doc = await readContentFresh();
  const edited = new Set(Object.keys(doc.collections));
  const sections = metas.filter((m) => !m.hidden && m.group !== "Photos");
  const groups = [...new Set(sections.map((m) => m.group))];
  const spots = siteSpots(doc);
  const pageCount = new Set(spots.map((s) => s.page)).size;
  const libraryCount = Object.keys(currentOf("media", doc) as object).length;
  return (
    <AdminShell collections={metas} storage={storageStatus()}>
      <div className="py-10">
        <h1 className="font-display text-4xl font-semibold text-navy-900 sm:text-5xl">Website content</h1>
        <p className="mt-3 max-w-2xl text-lg text-navy-900/75">
          Change photos page by page, or edit the words in any section. Changes go live as soon as you save, and every section can be put back to its original content with Reset.
        </p>
        {doc.version !== "seed" && <p className="mt-2 text-sm text-mist">Last published {new Date(doc.version).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}</p>}
        <section className="mt-10">
          <h2 className="text-sm font-bold text-crimson-600">Photos</h2>
          <ul className="mt-3 grid gap-3 md:grid-cols-2">
            <li>
              <Link href="/admin/photos" className="group flex h-full items-start gap-5 rounded-3xl bg-navy-900 p-6 text-white transition hover:bg-navy-800">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-500 text-navy-950">
                  <Images className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="font-display block text-2xl font-semibold">Photos by page</span>
                  <span className="mt-1 block text-sm leading-relaxed text-white/75">
                    Every photo on the website, organised by page: {spots.length} photos across {pageCount} pages. Pick a page, then change any photo or upload a new one.
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400">
                    Change photos
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
            <li>
              <Link href="/admin/media" className="group flex h-full items-start gap-5 rounded-3xl bg-white p-6 ring-1 ring-inset ring-border transition hover:ring-amber-500">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-100 text-navy-800">
                  <ImagePlus className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="flex-1">
                  <span className="font-display block text-2xl font-semibold text-navy-900">Photo library</span>
                  <span className="mt-1 block text-sm leading-relaxed text-mist">
                    All {libraryCount} photos in one place. Upload new ones, replace a picture everywhere it appears, and see where each photo is used.
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800">
                    Open the library
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          </ul>
        </section>
        {groups.map((g) => (
          <section key={g} className="mt-10">
            <h2 className="text-sm font-bold text-crimson-600">{g}</h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {sections
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
