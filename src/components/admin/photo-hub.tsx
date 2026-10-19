"use client";

import { useMemo, useState } from "react";
import { Check, ExternalLink, ImagePlus, Loader2, RotateCcw, Search, X } from "lucide-react";
import type { PhotoSpot } from "@/lib/content/photo-spots";
import { cn } from "@/lib/utils";
import { PhotoPicker, Thumb, type Library } from "./photos";

type PageEntry = { id: string; area: string; page: string; href: string; count: number; changed: number };
type Notice = { kind: "ok" | "error"; text: string } | null;

const pageId = (s: PhotoSpot) => `${s.area}|${s.page}`;

/**
 * Every photo on the website, page by page. Pick a page, then change any photo on it:
 * choose one from the library or upload a new one. Each change goes live on its own.
 */
export function PhotoHub({ spots: initialSpots, library: initialLibrary }: { spots: PhotoSpot[]; library: Library }) {
  const [spots, setSpots] = useState(initialSpots);
  const [library, setLibrary] = useState(initialLibrary);
  const [selected, setSelected] = useState(() => (initialSpots[0] ? pageId(initialSpots[0]) : ""));
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState<PhotoSpot | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  const pages = useMemo(() => {
    const map = new Map<string, PageEntry>();
    for (const s of spots) {
      const id = pageId(s);
      const e = map.get(id) ?? { id, area: s.area, page: s.page, href: s.href, count: 0, changed: 0 };
      e.count++;
      if (s.originalKey && s.key !== s.originalKey) e.changed++;
      map.set(id, e);
    }
    return [...map.values()];
  }, [spots]);
  const areas = useMemo(() => [...new Set(pages.map((p) => p.area))], [pages]);

  const usage = useMemo(() => {
    const m = new Map<string, PhotoSpot[]>();
    for (const s of spots) m.set(s.key, [...(m.get(s.key) ?? []), s]);
    return m;
  }, [spots]);

  const q = query.trim().toLowerCase();
  const shown = q
    ? spots.filter((s) => [s.page, s.label, library[s.key]?.alt.en ?? "", library[s.key]?.alt.es ?? ""].some((t) => t.toLowerCase().includes(q)))
    : spots.filter((s) => pageId(s) === selected);
  const current = pages.find((p) => p.id === selected);

  async function place(spot: PhotoSpot, key: string) {
    const before = spot.key;
    setBusy(spot.id);
    setNotice(null);
    setSpots((all) => all.map((s) => (s.id === spot.id ? { ...s, key } : s)));
    try {
      const res = await fetch("/api/admin/photo", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ collection: spot.collection, path: spot.path, key }) });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error ?? "Could not save.");
      setNotice({ kind: "ok", text: `Saved and published: ${spot.page} · ${spot.label}` });
    } catch (err) {
      setSpots((all) => all.map((s) => (s.id === spot.id ? { ...s, key: before } : s)));
      setNotice({ kind: "error", text: err instanceof Error && err.message !== "Failed to fetch" ? err.message : "Could not reach the server. Try again." });
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="py-8">
      <div className="flex flex-wrap items-end gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-4xl font-semibold text-navy-900">Photos</h1>
          <p className="mt-2 max-w-2xl text-navy-900/75">
            Every photo on the website, page by page. Press <strong>Change photo</strong> to pick another one from the library or upload your own. Each change goes live straight away.
          </p>
        </div>
        <label className="relative w-full sm:w-80">
          <span className="sr-only">Search every photo</span>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages and photos"
            className="h-11 w-full rounded-full bg-white pl-10 pr-10 text-sm ring-1 ring-inset ring-border outline-none focus:ring-2 focus:ring-amber-500"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full hover:bg-cream" aria-label="Clear search">
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
      </div>

      {notice && (
        <p role="status" className={cn("mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold", notice.kind === "ok" ? "bg-emerald-50 text-emerald-700" : "bg-crimson-100 text-crimson-700")}>
          {notice.kind === "ok" && <Check className="h-4 w-4" aria-hidden="true" />}
          {notice.text}
        </p>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-[17rem_1fr]">
        {/* Pages */}
        <nav aria-label="Pages" className={cn("lg:sticky lg:top-6 lg:max-h-[calc(100svh-3rem)] lg:overflow-y-auto", q && "max-lg:hidden")}>
          <label className="lg:hidden">
            <span className="mb-1.5 block text-sm font-semibold text-navy-900">Page</span>
            <select value={selected} onChange={(e) => setSelected(e.target.value)} className="h-11 w-full rounded-xl bg-white px-3 text-sm ring-1 ring-inset ring-border">
              {areas.map((a) => (
                <optgroup key={a} label={a}>
                  {pages
                    .filter((p) => p.area === a)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.page} ({p.count})
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </label>
          <div className="max-lg:hidden">
            {areas.map((a) => (
              <div key={a} className="mb-5">
                <p className="px-3 pb-1 text-xs font-bold text-crimson-600">{a}</p>
                <ul>
                  {pages
                    .filter((p) => p.area === a)
                    .map((p) => {
                      const on = !q && p.id === selected;
                      return (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => {
                              setSelected(p.id);
                              setQuery("");
                            }}
                            aria-current={on}
                            className={cn("flex min-h-9 w-full items-center gap-2 rounded-xl px-3 text-left text-sm", on ? "bg-navy-800 font-semibold text-white" : "text-navy-900 hover:bg-white")}
                          >
                            <span className="min-w-0 flex-1 truncate">{p.page}</span>
                            {p.changed > 0 && <span className={cn("h-2 w-2 shrink-0 rounded-full", on ? "bg-amber-400" : "bg-amber-500")} title={`${p.changed} changed`} />}
                            <span className={cn("shrink-0 text-xs", on ? "text-white/70" : "text-mist")}>{p.count}</span>
                          </button>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Photos on the page */}
        <section aria-live="polite">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-display min-w-0 flex-1 text-2xl font-semibold text-navy-900">
              {q ? `${shown.length} ${shown.length === 1 ? "photo" : "photos"} found` : current?.page}
            </h2>
            {!q && current && (
              <a href={current.href} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-semibold text-navy-800 ring-1 ring-inset ring-border hover:bg-white">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                View page
              </a>
            )}
          </div>

          <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((s) => {
              const photo = library[s.key];
              const others = (usage.get(s.key)?.length ?? 1) - 1;
              const changed = Boolean(s.originalKey && s.key !== s.originalKey);
              return (
                <li key={s.id} className="flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-inset ring-border">
                  <div className="relative">
                    <Thumb photo={photo} className="aspect-[4/3] w-full" />
                    {busy === s.id && (
                      <span className="absolute inset-0 grid place-items-center bg-white/60">
                        <Loader2 className="h-6 w-6 animate-spin text-navy-800" />
                      </span>
                    )}
                    {changed && <span className="absolute left-3 top-3 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-navy-950">Changed</span>}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    {q && <p className="text-xs font-bold text-crimson-600">{s.page}</p>}
                    <p className="font-semibold text-navy-900">{s.label}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-mist">{photo?.alt.en || "No description"}</p>
                    {others > 0 && (
                      <p className="mt-1 text-xs text-mist" title={usage.get(s.key)?.filter((u) => u.id !== s.id).map((u) => `${u.page} · ${u.label}`).join("\n")}>
                        This photo also appears in {others} other {others === 1 ? "place" : "places"}
                      </p>
                    )}
                    <div className="mt-auto flex flex-wrap gap-2 pt-4">
                      <button
                        type="button"
                        disabled={busy !== null}
                        onClick={() => setTarget(s)}
                        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-navy-800 px-4 text-sm font-semibold text-white hover:bg-navy-700 disabled:opacity-50"
                      >
                        <ImagePlus className="h-4 w-4" aria-hidden="true" />
                        Change photo
                      </button>
                      {changed && s.originalKey && (
                        <button
                          type="button"
                          disabled={busy !== null}
                          onClick={() => place(s, s.originalKey!)}
                          className="inline-flex min-h-10 items-center gap-2 rounded-full px-3 text-sm font-semibold text-navy-800 hover:bg-cream disabled:opacity-50"
                        >
                          <RotateCcw className="h-4 w-4" aria-hidden="true" />
                          Restore original
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          {shown.length === 0 && <p className="mt-6 text-mist">No photos match “{query}”.</p>}
        </section>
      </div>

      {target && (
        <PhotoPicker
          library={library}
          title={`${target.page} · ${target.label}`}
          defaultAlt={`${target.page}: ${target.label}`}
          onClose={() => setTarget(null)}
          onUploaded={(key, photo) => setLibrary((l) => ({ ...l, [key]: photo }))}
          onPick={(key) => {
            const spot = target;
            setTarget(null);
            if (key !== spot.key) void place(spot, key);
          }}
        />
      )}
    </div>
  );
}
