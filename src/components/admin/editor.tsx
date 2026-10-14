"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, ExternalLink, Loader2, RotateCcw, Save } from "lucide-react";
import type { Json } from "@/lib/content/engine";
import { cn } from "@/lib/utils";
import { EditorContext, Field, Fields, PhotoOwn } from "./fields";
import { PhotoPicker, type Library } from "./photos";
import { humanize, isObj, setAt, unzipLanguages, zipLanguages, type Path, type PhotoValue } from "./tree";

export type CollectionMeta = {
  id: string;
  label: string;
  group: string;
  description: string;
  href: string;
  bilingualPair?: boolean;
  enums?: Record<string, string[]>;
  itemTitle?: string;
};

type Status = { kind: "idle" | "saving" | "saved" | "error"; message?: string };

export function CollectionEditor({ meta, initial, library: initialLibrary }: { meta: CollectionMeta; initial: Json; library: Library }) {
  const toEditable = useCallback(
    (v: Json) => (meta.bilingualPair && isObj(v) ? zipLanguages(v.en, v.es) : v),
    [meta.bilingualPair],
  );
  const [value, setValue] = useState<Json>(() => toEditable(initial));
  const [baseline, setBaseline] = useState(() => JSON.stringify(toEditable(initial)));
  const [library, setLibrary] = useState<Library>(initialLibrary);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [picker, setPicker] = useState<null | ((key: string) => void)>(null);

  const dirty = JSON.stringify(value) !== baseline;
  const isLibrary = meta.id === "media";

  const set = useCallback((path: Path, next: Json) => {
    setValue((v) => setAt(v, path, next));
    setStatus({ kind: "idle" });
  }, []);

  const save = useCallback(async () => {
    setStatus({ kind: "saving" });
    let payload: Json = value;
    if (meta.bilingualPair) {
      const [en, es] = unzipLanguages(value);
      payload = { en, es };
    }
    try {
      const res = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: meta.id, value: payload }) });
      const data = await res.json();
      if (!data.ok) return setStatus({ kind: "error", message: data.error ?? "Could not save." });
      const fresh = toEditable(data.value);
      setValue(fresh);
      setBaseline(JSON.stringify(fresh));
      if (isLibrary) setLibrary(data.value as Library);
      setStatus({ kind: "saved", message: "Saved and published." });
    } catch {
      setStatus({ kind: "error", message: "Could not reach the server. Check your connection and try again." });
    }
  }, [value, meta.id, meta.bilingualPair, toEditable, isLibrary]);

  async function reset() {
    if (!window.confirm(`Put “${meta.label}” back to the original website content? Your edits to this section will be removed.`)) return;
    setStatus({ kind: "saving" });
    const res = await fetch(`/api/admin/content?id=${encodeURIComponent(meta.id)}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({ ok: false }));
    if (!data.ok) return setStatus({ kind: "error", message: data.error ?? "Could not reset." });
    const fresh = toEditable(data.value);
    setValue(fresh);
    setBaseline(JSON.stringify(fresh));
    setStatus({ kind: "saved", message: "Back to the original content." });
  }

  // ⌘S / Ctrl+S saves; leaving with unsaved edits asks first.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (dirty) void save();
      }
    };
    const onLeave = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("beforeunload", onLeave);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("beforeunload", onLeave);
    };
  }, [dirty, save]);

  const ctx = useMemo(
    () => ({ enums: meta.enums ?? {}, itemTitleKey: meta.itemTitle, library, pickPhoto: (fn: (key: string) => void) => setPicker(() => fn), set }),
    [meta.enums, meta.itemTitle, library, set],
  );

  return (
    <EditorContext.Provider value={ctx}>
      <div className="sticky top-0 z-30 -mx-4 border-b border-border bg-ivory/90 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-crimson-600">{meta.group}</p>
            <h1 className="font-display truncate text-3xl font-semibold text-navy-900">{meta.label}</h1>
          </div>
          <Link href={meta.href} target="_blank" className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-navy-800 hover:bg-cream">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            View page
          </Link>
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-semibold text-navy-800 hover:bg-cream">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Reset
          </button>
          <button
            type="button"
            onClick={save}
            disabled={!dirty || status.kind === "saving"}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-navy-800 px-6 text-sm font-bold text-white transition hover:bg-navy-700 disabled:bg-navy-800/40"
          >
            {status.kind === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {dirty ? "Save & publish" : "Saved"}
          </button>
        </div>
        <p className="mt-2 text-sm text-mist">{meta.description}</p>
        {status.message && (
          <p role="status" className={cn("mt-2 inline-flex items-center gap-1.5 text-sm font-semibold", status.kind === "error" ? "text-crimson-600" : "text-emerald-700")}>
            {status.kind === "saved" && <Check className="h-4 w-4" aria-hidden="true" />}
            {status.message}
          </p>
        )}
      </div>

      <div className="py-8">
        {isLibrary && isObj(value) ? (
          <>
          <button
            type="button"
            onClick={() => setPicker(() => () => undefined)}
            className="mb-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-amber-500 px-5 text-sm font-bold text-navy-950 hover:bg-amber-400"
          >
            Upload a new photo
          </button>
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Object.entries(value)
              .reverse()
              .map(([key, photo]) => (
                <li key={key}>
                  <PhotoOwn value={photo as PhotoValue} path={[key]} name={humanize(key)} />
                </li>
              ))}
          </ul>
          </>
        ) : isObj(value) && !Array.isArray(value) ? (
          <div className="space-y-4">
            {Object.entries(value).map(([key, v]) => (
              <details key={key} className="group rounded-3xl bg-white ring-1 ring-inset ring-border" open={Object.keys(value).length <= 4}>
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 px-5 marker:hidden sm:px-6">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-500 text-sm font-bold text-navy-950 transition group-open:rotate-90" aria-hidden="true">
                    ›
                  </span>
                  <span className="font-display text-xl font-semibold text-navy-900">{humanize(key)}</span>
                </summary>
                <div className="space-y-6 border-t border-border p-5 sm:p-6">
                  <Fields value={v} path={[key]} />
                </div>
              </details>
            ))}
          </div>
        ) : (
          <div className="space-y-6 rounded-3xl bg-white p-5 ring-1 ring-inset ring-border sm:p-6">
            <Field value={value} path={[]} name="items" />
          </div>
        )}
      </div>

      {picker && (
        <PhotoPicker
          library={library}
          onClose={() => setPicker(null)}
          onUploaded={(key, photo) => {
            setLibrary((l) => ({ ...l, [key]: photo }));
            // The upload is already saved; on the library page show it right away.
            if (isLibrary) {
              setValue((v) => ({ ...(v as Record<string, Json>), [key]: photo }));
              setBaseline((b) => JSON.stringify({ ...JSON.parse(b), [key]: photo }));
            }
          }}
          onPick={(key) => {
            picker(key);
            setPicker(null);
          }}
        />
      )}
    </EditorContext.Provider>
  );
}
