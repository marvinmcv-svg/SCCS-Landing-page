import type { Json } from "@/lib/content/engine";

/** Pure helpers for the admin editor's value tree. */

export type Obj = Record<string, Json>;
export type Path = (string | number)[];
export type PhotoValue = { src: string; width: number; height: number; alt: { en: string; es: string }; source?: string };

export const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
export const isRef = (v: unknown): v is { $media: string } => isObj(v) && typeof v.$media === "string" && Object.keys(v).length === 1;
export const isBilingual = (v: unknown): v is { en: string; es: string } =>
  isObj(v) && Object.keys(v).length === 2 && typeof v.en === "string" && typeof v.es === "string";
export const isPhoto = (v: unknown): v is PhotoValue =>
  isObj(v) && typeof v.src === "string" && typeof v.width === "number" && typeof v.height === "number" && isObj(v.alt);

export const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

export function getAt(root: Json, path: Path): Json {
  return path.reduce<Json>((node, key) => (node as Record<string | number, Json>)[key], root);
}

/** Returns a copy of `root` with the value at `path` replaced (structural sharing elsewhere). */
export function setAt(root: Json, path: Path, value: Json): Json {
  if (path.length === 0) return value;
  const [head, ...rest] = path;
  if (Array.isArray(root)) {
    const next = root.slice();
    next[head as number] = setAt(root[head as number], rest, value);
    return next;
  }
  const obj = root as Obj;
  return { ...obj, [head]: setAt(obj[head as string], rest, value) };
}

/** Pair two same-shaped dictionaries so every string becomes `{ en, es }`. */
export function zipLanguages(en: Json, es: Json): Json {
  if (typeof en === "string") return { en, es: typeof es === "string" ? es : "" };
  if (Array.isArray(en)) return en.map((v, i) => zipLanguages(v, Array.isArray(es) ? es[i] : null));
  if (isObj(en)) return Object.fromEntries(Object.entries(en).map(([k, v]) => [k, zipLanguages(v, isObj(es) ? es[k] : null)]));
  return en;
}

export function unzipLanguages(tree: Json): [Json, Json] {
  if (isBilingual(tree)) return [tree.en, tree.es];
  if (Array.isArray(tree)) {
    const pairs = tree.map(unzipLanguages);
    return [pairs.map((p) => p[0]), pairs.map((p) => p[1])];
  }
  if (isObj(tree)) {
    const en: Obj = {};
    const es: Obj = {};
    for (const [k, v] of Object.entries(tree)) [en[k], es[k]] = unzipLanguages(v);
    return [en, es];
  }
  return [tree, tree];
}

/** "advantageTitle" → "Advantage title", "usPoints" → "US points". */
export function humanize(key: string) {
  if (key === "en") return "English";
  if (key === "es") return "Español";
  if (/^[A-Z_]+$/.test(key)) return key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, " ");
  const words = key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\bus\b/g, "US")
    .replace(/\bbo\b/g, "Bolivian")
    .replace(/\bcta\b/g, "button")
    .replace(/\bhref\b/g, "link")
    .replace(/\bfaq\b/g, "FAQ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

/** A short title for a list item: its name/title/question, or "Item n". */
export function itemTitle(item: Json, index: number, preferred?: string): string {
  const pick = (v: Json | undefined): string | null => {
    if (typeof v === "string" && v.trim()) return v;
    if (isBilingual(v) && v.en.trim()) return v.en;
    return null;
  };
  if (isObj(item)) {
    if (preferred && pick(item[preferred])) return pick(item[preferred])!;
    for (const k of ["title", "name", "label", "q", "university", "year", "phase", "caption", "date", "slug"]) {
      const p = pick(item[k]);
      if (p) return k === "date" && pick(item.title) ? `${p} · ${pick(item.title)}` : p;
    }
    for (const v of Object.values(item)) if (pick(v)) return pick(v)!;
  }
  if (isBilingual(item)) return item.en || `Item ${index + 1}`;
  if (typeof item === "string") return item || `Item ${index + 1}`;
  return `Item ${index + 1}`;
}

/** A copy of a list item to start a new one from. Slugs get a suffix so pages stay unique. */
export function duplicate(item: Json): Json {
  const copy = clone(item);
  if (isObj(copy) && typeof copy.slug === "string") copy.slug = `${copy.slug}-${Date.now().toString(36).slice(-4)}`;
  return copy;
}
