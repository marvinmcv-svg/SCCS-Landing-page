/**
 * The content engine behind the admin portal.
 *
 * Every editable collection is a live object exported from `src/data/*`. The code's
 * values are the defaults; edits made in the admin are stored as a small diff and
 * merged back onto those same objects (in place) wherever the site renders: on the
 * server for every request that renders a page, and in the browser before the first
 * render. Components keep importing their data exactly as before.
 *
 * Photos are referenced by library key (`{ "$media": "campusLawn" }`) in stored JSON,
 * so replacing a photo in the library updates every place it appears.
 */
import { media, type Photo } from "@/data/media";
import { COLLECTIONS, type CollectionDef } from "./registry";

export type Json = null | boolean | number | string | Json[] | { [k: string]: Json };
export type OverrideDoc = { version: string; collections: Record<string, Json> };
export const EMPTY_DOC: OverrideDoc = { version: "seed", collections: {} };

type MediaRef = { $media: string };
const MEDIA_ID = "media";

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);
const isRef = (v: unknown): v is MediaRef => isObj(v) && typeof v.$media === "string" && Object.keys(v).length === 1;
export const isPhotoLike = (v: unknown): v is Photo =>
  isObj(v) && typeof v.src === "string" && typeof v.width === "number" && typeof v.height === "number" && isObj(v.alt);

const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v)) as T;

/* ───────── Serialize / hydrate ───────── */

// Identity map from the live library objects to their keys, taken before any edit is applied.
const mediaKeyOf = new Map<object, string>(Object.entries(media).map(([k, v]) => [v as object, k]));

function serialize(value: unknown, top = false): Json {
  if (!top && isObj(value) && mediaKeyOf.has(value)) return { $media: mediaKeyOf.get(value)! };
  if (Array.isArray(value)) return value.map((v) => serialize(v));
  if (isObj(value)) {
    const out: Record<string, Json> = {};
    for (const [k, v] of Object.entries(value)) if (v !== undefined && typeof v !== "function") out[k] = serialize(v);
    return out;
  }
  return value as Json;
}

const mediaLive = media as unknown as Record<string, Photo>;

function hydrate(value: Json): unknown {
  if (isRef(value)) return mediaLive[value.$media] ?? mediaLive.campusLawn;
  if (Array.isArray(value)) return value.map(hydrate);
  if (isObj(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, hydrate(v as Json)]));
  return value;
}

/** Defaults exactly as written in code, captured once at load before anything is applied. */
// The library's own entries stay plain photo objects; everywhere else a library photo becomes a reference.
const pristine: Record<string, Json> = Object.fromEntries(
  COLLECTIONS.map((c) => [c.id, c.id === MEDIA_ID ? (clone(media) as unknown as Json) : serialize(c.target, true)]),
);

export function defaultsOf(id: string): Json {
  return clone(pristine[id]);
}

/* ───────── Diff / merge ───────── */

/** The smallest description of how `next` differs from `base`; undefined when equal. Arrays are replaced whole. */
export function diff(base: Json, next: Json): Json | undefined {
  if (isObj(base) && isObj(next) && !isRef(base) && !isRef(next)) {
    const out: Record<string, Json> = {};
    for (const k of Object.keys(next)) {
      const d = k in base ? diff(base[k] as Json, next[k] as Json) : (next[k] as Json);
      if (d !== undefined) out[k] = d;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return JSON.stringify(base) === JSON.stringify(next) ? undefined : next;
}

export function merge(base: Json, patch: Json | undefined): Json {
  if (patch === undefined) return clone(base);
  if (isObj(base) && isObj(patch) && !isRef(base) && !isRef(patch)) {
    const out: Record<string, Json> = clone(base) as Record<string, Json>;
    for (const [k, v] of Object.entries(patch)) out[k] = k in base ? merge(base[k] as Json, v as Json) : clone(v as Json);
    return out;
  }
  return clone(patch);
}

export function currentOf(id: string, doc: OverrideDoc): Json {
  return merge(pristine[id], doc.collections[id]);
}

/* ───────── Shape check ───────── */

/** True when `next` has the same kinds of values as the defaults, so the site's components can render it. */
export function sameShape(base: Json, next: Json): boolean {
  if (isRef(base) || isPhotoLike(base)) return isRef(next) || isPhotoLike(next);
  if (Array.isArray(base)) {
    if (!Array.isArray(next)) return false;
    const model = base[0];
    return model === undefined || next.every((n) => sameShape(model, n));
  }
  if (isObj(base)) {
    if (!isObj(next)) return false;
    return Object.keys(next).every((k) => !(k in base) || sameShape(base[k] as Json, next[k] as Json));
  }
  return typeof base === typeof next;
}

/* ───────── Apply ───────── */

function replaceInPlace(target: unknown, value: unknown) {
  if (Array.isArray(target) && Array.isArray(value)) {
    target.splice(0, target.length, ...value);
  } else if (isObj(target) && isObj(value)) {
    for (const k of Object.keys(target)) if (!(k in value)) delete target[k];
    Object.assign(target, value);
  }
}

let appliedVersion = "seed";

/** Brings every live collection in line with `doc`. Cheap when the version has not changed. */
export function applyContent(doc: OverrideDoc) {
  if (doc.version === appliedVersion) return;

  // The library first, in place, so every reference to a photo sees the new picture.
  const lib = currentOf(MEDIA_ID, doc) as Record<string, Photo>;
  for (const k of Object.keys(mediaLive)) if (!(k in lib)) delete mediaLive[k];
  for (const [k, p] of Object.entries(lib)) {
    if (mediaLive[k]) Object.assign(mediaLive[k], clone(p));
    else mediaLive[k] = clone(p);
  }

  for (const c of COLLECTIONS) {
    if (c.id === MEDIA_ID) continue;
    replaceInPlace(c.target, hydrate(currentOf(c.id, doc)));
  }
  appliedVersion = doc.version;
}

export function collection(id: string): CollectionDef | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}
