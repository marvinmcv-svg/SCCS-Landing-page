"use client";

/* eslint-disable @next/next/no-img-element -- admin thumbnails load any stored URL without image optimisation */

import { useMemo, useRef, useState } from "react";
import { ImagePlus, Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PhotoValue } from "./tree";

export type Library = Record<string, PhotoValue>;

/** Downscale to at most 2400px on the long side and re-encode as JPEG, so uploads stay small and fast. */
export async function prepareImage(file: File): Promise<{ blob: Blob; width: number; height: number }> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2400 / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), "image/jpeg", 0.86));
  return { blob, width, height };
}

export async function uploadImage(
  file: File,
  opts: { mode: "library" | "file"; altEn?: string; altEs?: string },
): Promise<{ ok: true; key?: string; photo?: PhotoValue; src: string; width: number; height: number } | { ok: false; error: string }> {
  try {
    const { blob, width, height } = await prepareImage(file);
    const form = new FormData();
    form.set("file", new File([blob], file.name.replace(/\.\w+$/, "") + ".jpg", { type: "image/jpeg" }));
    form.set("width", String(width));
    form.set("height", String(height));
    form.set("name", file.name.replace(/\.\w+$/, "") + ".jpg");
    form.set("mode", opts.mode);
    form.set("altEn", opts.altEn ?? "");
    form.set("altEs", opts.altEs ?? "");
    const res = await fetch("/api/admin/upload", { method: "POST", body: form });
    const data = await res.json();
    if (!data.ok) return { ok: false, error: data.error ?? "Upload failed." };
    return { ok: true, key: data.key, photo: data.photo, src: data.src ?? data.photo?.src, width: data.width ?? width, height: data.height ?? height };
  } catch {
    return { ok: false, error: "That file could not be read as an image." };
  }
}

export function Thumb({ photo, className }: { photo?: PhotoValue; className?: string }) {
  if (!photo) return <div className={cn("grid place-items-center bg-cream text-xs text-mist", className)}>Missing</div>;
  return <img src={photo.src} alt={photo.alt.en} loading="lazy" className={cn("object-cover", className)} />;
}

/** A modal to choose a photo from the library, or upload a new one into it. */
export function PhotoPicker({
  library,
  onPick,
  onClose,
  onUploaded,
}: {
  library: Library;
  onPick: (key: string) => void;
  onClose: () => void;
  onUploaded: (key: string, photo: PhotoValue) => void;
}) {
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [altEn, setAltEn] = useState("");
  const [altEs, setAltEs] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const entries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.entries(library)
      .filter(([k, p]) => !q || k.toLowerCase().includes(q) || p.alt.en.toLowerCase().includes(q) || p.alt.es.toLowerCase().includes(q))
      .reverse();
  }, [library, query]);

  async function upload() {
    const file = fileRef.current?.files?.[0];
    if (!file) return setError("Choose an image first.");
    if (!altEn.trim()) return setError("Describe the photo in English (for screen readers and search).");
    setBusy(true);
    setError("");
    const res = await uploadImage(file, { mode: "library", altEn, altEs });
    setBusy(false);
    if (!res.ok || !res.key || !res.photo) return setError(res.ok ? "Upload failed." : res.error);
    onUploaded(res.key, res.photo);
    onPick(res.key);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-label="Choose a photo">
      <div className="flex max-h-[92svh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="flex items-center gap-3 border-b border-border p-4 sm:p-5">
          <h2 className="font-display text-xl font-semibold text-navy-900">Choose a photo</h2>
          <label className="relative ml-auto flex-1 sm:max-w-xs">
            <span className="sr-only">Search photos</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" aria-hidden="true" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search photos" className="h-10 w-full rounded-full bg-cream pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-amber-500" />
          </label>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full hover:bg-cream" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-3 border-b border-border bg-cream/60 p-4 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end sm:p-5">
          <label className="text-sm font-medium text-navy-900">
            New photo
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="mt-1 block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-navy-800 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white" />
          </label>
          <label className="text-sm font-medium text-navy-900">
            Description (English)
            <input value={altEn} onChange={(e) => setAltEn(e.target.value)} className="mt-1 h-10 w-full rounded-xl bg-white px-3 text-sm ring-1 ring-border outline-none focus:ring-2 focus:ring-amber-500" />
          </label>
          <label className="text-sm font-medium text-navy-900">
            Descripción (Español)
            <input value={altEs} onChange={(e) => setAltEs(e.target.value)} className="mt-1 h-10 w-full rounded-xl bg-white px-3 text-sm ring-1 ring-border outline-none focus:ring-2 focus:ring-amber-500" />
          </label>
          <button type="button" onClick={upload} disabled={busy} className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-amber-500 px-5 text-sm font-bold text-navy-950 hover:bg-amber-400 disabled:opacity-60">
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
            Upload & use
          </button>
          {error && <p className="text-sm font-medium text-crimson-600 sm:col-span-4">{error}</p>}
        </div>

        <ul className="grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-4 sm:grid-cols-4 sm:p-5 lg:grid-cols-5">
          {entries.map(([key, photo]) => (
            <li key={key}>
              <button type="button" onClick={() => onPick(key)} className="group block w-full text-left">
                <Thumb photo={photo} className="aspect-[4/3] w-full rounded-xl ring-amber-500 transition group-hover:ring-4" />
                <span className="mt-1 block truncate text-xs text-mist">{photo.alt.en || key}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
