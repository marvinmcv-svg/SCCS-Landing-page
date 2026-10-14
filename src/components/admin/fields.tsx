"use client";

import { createContext, useContext, useState } from "react";
import { ArrowDown, ArrowUp, Copy, ImagePlus, Loader2, Plus, Trash2 } from "lucide-react";
import type { Json } from "@/lib/content/engine";
import { cn } from "@/lib/utils";
import { Thumb, uploadImage, type Library } from "./photos";
import { duplicate, humanize, isBilingual, isObj, isPhoto, isRef, itemTitle, type Path, type PhotoValue } from "./tree";

type Ctx = {
  enums: Record<string, string[]>;
  itemTitleKey?: string;
  library: Library;
  pickPhoto: (onPick: (key: string) => void) => void;
  set: (path: Path, value: Json) => void;
};

export const EditorContext = createContext<Ctx | null>(null);
const useEditor = () => useContext(EditorContext)!;

const input =
  "w-full rounded-xl bg-white px-3.5 text-[0.95rem] text-navy-950 ring-1 ring-inset ring-border outline-none transition focus:ring-2 focus:ring-amber-500";
const label = "mb-1.5 block text-sm font-semibold text-navy-900";

/* ───────── Text ───────── */

function TextInput({ value, onChange, id, long }: { value: string; onChange: (v: string) => void; id: string; long?: boolean }) {
  if (long) {
    return (
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={Math.min(10, Math.max(3, Math.ceil(value.length / 90)))}
        className={cn(input, "py-2.5 leading-relaxed")}
      />
    );
  }
  return <input id={id} value={value} onChange={(e) => onChange(e.target.value)} className={cn(input, "h-11")} />;
}

const isLong = (s: string) => s.length > 80 || s.includes("\n");

function Bilingual({ value, path, name }: { value: { en: string; es: string }; path: Path; name: string }) {
  const { set } = useEditor();
  const long = isLong(value.en) || isLong(value.es);
  const id = path.join(".");
  return (
    <div>
      <p className={label}>{humanize(name)}</p>
      <div className="grid gap-3 lg:grid-cols-2">
        {(["en", "es"] as const).map((lang) => (
          <div key={lang} className="relative">
            <label htmlFor={`${id}.${lang}`} className="absolute right-3 top-2.5 z-10 rounded-full bg-cream px-2 py-0.5 text-[0.7rem] font-bold text-mist">
              {lang.toUpperCase()}
            </label>
            <TextInput id={`${id}.${lang}`} value={value[lang]} long={long} onChange={(v) => set([...path, lang], v)} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Primitive({ value, path, name }: { value: string | number | boolean | null; path: Path; name: string }) {
  const { set, enums } = useEditor();
  const id = path.join(".");
  if (typeof value === "boolean") {
    return (
      <label className="flex min-h-11 cursor-pointer items-center gap-3">
        <input type="checkbox" checked={value} onChange={(e) => set(path, e.target.checked)} className="h-5 w-5 accent-navy-800" />
        <span className="text-sm font-semibold text-navy-900">{humanize(name)}</span>
      </label>
    );
  }
  if (typeof value === "number") {
    return (
      <div>
        <label htmlFor={id} className={label}>
          {humanize(name)}
        </label>
        <input id={id} type="number" step="any" value={value} onChange={(e) => set(path, e.target.value === "" ? 0 : Number(e.target.value))} className={cn(input, "h-11 max-w-xs")} />
      </div>
    );
  }
  const text = value ?? "";
  const options = enums[name];
  if (options) {
    return (
      <div>
        <label htmlFor={id} className={label}>
          {humanize(name)}
        </label>
        <select id={id} value={text} onChange={(e) => set(path, e.target.value)} className={cn(input, "h-11 max-w-xs")}>
          {options.map((o) => (
            <option key={o} value={o}>
              {humanize(o)}
            </option>
          ))}
        </select>
      </div>
    );
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    return (
      <div>
        <label htmlFor={id} className={label}>
          {humanize(name)}
        </label>
        <input id={id} type="date" value={text} onChange={(e) => set(path, e.target.value)} className={cn(input, "h-11 max-w-xs")} />
      </div>
    );
  }
  return (
    <div>
      <label htmlFor={id} className={label}>
        {humanize(name)}
      </label>
      <TextInput id={id} value={text} long={isLong(text)} onChange={(v) => set(path, v)} />
    </div>
  );
}

/* ───────── Photos ───────── */

/** A photo chosen from the library (stored as a reference). */
function PhotoRef({ value, path, name }: { value: { $media: string }; path: Path; name: string }) {
  const { library, pickPhoto, set } = useEditor();
  const photo = library[value.$media];
  return (
    <div>
      <p className={label}>{humanize(name)}</p>
      <div className="flex items-center gap-4">
        <Thumb photo={photo} className="h-24 w-32 shrink-0 rounded-xl" />
        <div className="min-w-0">
          <p className="truncate text-sm text-mist">{photo?.alt.en ?? value.$media}</p>
          <button type="button" onClick={() => pickPhoto((key) => set(path, { $media: key }))} className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-full bg-navy-800 px-4 text-sm font-semibold text-white hover:bg-navy-700">
            <ImagePlus className="h-4 w-4" aria-hidden="true" />
            Change photo
          </button>
        </div>
      </div>
    </div>
  );
}

/** A photo stored directly (the library's own entries): replace the file, edit the description. */
export function PhotoOwn({ value, path, name }: { value: PhotoValue; path: Path; name: string }) {
  const { set } = useEditor();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function replace(file: File | undefined) {
    if (!file) return;
    setBusy(true);
    setError("");
    const res = await uploadImage(file, { mode: "file" });
    setBusy(false);
    if (!res.ok) return setError(res.error);
    set(path, { ...value, src: res.src, width: res.width, height: res.height, source: "upload" });
  }
  return (
    <div className="flex flex-col gap-3 rounded-2xl bg-white p-3 ring-1 ring-inset ring-border">
      <Thumb photo={value} className="aspect-[4/3] w-full rounded-xl" />
      <p className="truncate text-xs font-semibold text-mist">{name}</p>
      <label className="relative inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-full bg-navy-800 px-4 text-sm font-semibold text-white hover:bg-navy-700">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
        Replace image
        <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" className="sr-only" onChange={(e) => replace(e.target.files?.[0])} />
      </label>
      {error && <p className="text-xs font-medium text-crimson-600">{error}</p>}
      <Bilingual value={value.alt} path={[...path, "alt"]} name="Description" />
    </div>
  );
}

/* ───────── Lists & groups ───────── */

function ItemControls({ path, index, length, list }: { path: Path; index: number; length: number; list: Json[] }) {
  const { set } = useEditor();
  const move = (to: number) => {
    const next = list.slice();
    const [it] = next.splice(index, 1);
    next.splice(to, 0, it);
    set(path, next);
  };
  const btn = "grid h-9 w-9 place-items-center rounded-full text-navy-800 hover:bg-cream disabled:opacity-30";
  return (
    // Clicks here must not open or close the surrounding item.
    <span className="flex shrink-0 items-center gap-0.5" onClick={(e) => e.preventDefault()}>
      <button type="button" className={btn} disabled={index === 0} onClick={() => move(index - 1)} aria-label="Move up">
        <ArrowUp className="h-4 w-4" />
      </button>
      <button type="button" className={btn} disabled={index === length - 1} onClick={() => move(index + 1)} aria-label="Move down">
        <ArrowDown className="h-4 w-4" />
      </button>
      <button type="button" className={btn} onClick={() => set(path, [...list.slice(0, index + 1), duplicate(list[index]), ...list.slice(index + 1)])} aria-label="Duplicate">
        <Copy className="h-4 w-4" />
      </button>
      <button
        type="button"
        className={cn(btn, "text-crimson-600")}
        onClick={() => {
          if (window.confirm("Remove this item? You can undo by not saving.")) set(path, list.filter((_, i) => i !== index));
        }}
        aria-label="Remove"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </span>
  );
}

function ListField({ value, path, name }: { value: Json[]; path: Path; name: string }) {
  const { itemTitleKey, pickPhoto, set } = useEditor();
  const simple = value.every((v) => typeof v === "string" || isBilingual(v));
  const photos = value.length > 0 && value.every((v) => isRef(v) || isPhoto(v));

  const add = () => {
    if (photos) return pickPhoto((key) => set(path, [...value, { $media: key }]));
    if (value.length) set(path, [...value, duplicate(value[value.length - 1])]);
  };

  return (
    <div>
      <p className={label}>
        {humanize(name)} <span className="font-normal text-mist">({value.length})</span>
      </p>
      {photos ? (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {value.map((v, i) => (
            <li key={i} className="rounded-2xl bg-cream/70 p-2">
              {isRef(v) ? <PhotoRef value={v} path={[...path, i]} name={`Photo ${i + 1}`} /> : <Thumb photo={v as PhotoValue} className="aspect-[4/3] w-full rounded-xl" />}
              <div className="mt-1 flex justify-end">
                <ItemControls path={path} index={i} length={value.length} list={value} />
              </div>
            </li>
          ))}
        </ul>
      ) : simple ? (
        <ul className="space-y-2">
          {value.map((v, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                {isBilingual(v) ? <Bilingual value={v} path={[...path, i]} name={`${humanize(name)} ${i + 1}`} /> : <Primitive value={v as string} path={[...path, i]} name={`${humanize(name)} ${i + 1}`} />}
              </div>
              <div className={cn(isBilingual(v) ? "pt-7" : "pt-7")}>
                <ItemControls path={path} index={i} length={value.length} list={value} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-3">
          {value.map((v, i) => (
            <li key={i}>
              <details className="group rounded-2xl bg-cream/60 ring-1 ring-inset ring-border open:bg-white">
                <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-2 marker:hidden">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-800 text-xs font-bold text-white transition group-open:rotate-90" aria-hidden="true">
                    ›
                  </span>
                  <span className="min-w-0 flex-1 truncate font-semibold text-navy-900">{itemTitle(v, i, itemTitleKey)}</span>
                  <ItemControls path={path} index={i} length={value.length} list={value} />
                </summary>
                <div className="space-y-5 border-t border-border p-4 sm:p-5">
                  <Fields value={v} path={[...path, i]} />
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
      <button type="button" onClick={add} disabled={!photos && value.length === 0} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-cream px-4 text-sm font-semibold text-navy-900 hover:bg-navy-100 disabled:opacity-40">
        <Plus className="h-4 w-4" aria-hidden="true" />
        {photos ? "Add photo" : "Add item"}
      </button>
    </div>
  );
}

/** Renders one value of any kind. */
export function Field({ value, path, name }: { value: Json; path: Path; name: string }) {
  if (isRef(value)) return <PhotoRef value={value} path={path} name={name} />;
  if (isPhoto(value)) return <PhotoOwn value={value} path={path} name={name} />;
  if (isBilingual(value)) return <Bilingual value={value} path={path} name={name} />;
  if (Array.isArray(value)) return <ListField value={value} path={path} name={name} />;
  if (isObj(value)) {
    return (
      <fieldset className="rounded-2xl border-l-4 border-amber-500/70 bg-cream/40 py-3 pl-4 pr-2 sm:pl-5">
        <legend className="sr-only">{humanize(name)}</legend>
        <p className="mb-3 text-sm font-bold text-navy-900">{humanize(name)}</p>
        <div className="space-y-5">
          <Fields value={value} path={path} />
        </div>
      </fieldset>
    );
  }
  return <Primitive value={value} path={path} name={name} />;
}

/** The fields of an object (or a single value). */
export function Fields({ value, path }: { value: Json; path: Path }) {
  if (isObj(value) && !isRef(value) && !isPhoto(value) && !isBilingual(value)) {
    return (
      <>
        {Object.entries(value)
          .filter(([k]) => k !== "source")
          .map(([k, v]) => (
            <Field key={k} value={v} path={[...path, k]} name={k} />
          ))}
      </>
    );
  }
  return <Field value={value} path={path} name={String(path[path.length - 1] ?? "value")} />;
}
