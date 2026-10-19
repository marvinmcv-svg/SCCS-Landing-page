/**
 * Every place a photo appears on the website, found by walking each collection for
 * photo references, and described in plain words: the website area, the page and
 * the spot on that page. Powers the admin's Photos hub.
 */
import { PAGE_PHOTO_INFO } from "@/data/page-photos";
import { currentOf, defaultsOf, type Json, type OverrideDoc } from "./engine";
import { COLLECTIONS } from "./registry";

export type SpotPath = (string | number)[];
export type PhotoSpot = {
  /** Unique id: collection and path. */
  id: string;
  collection: string;
  path: SpotPath;
  key: string;
  originalKey: string | null;
  area: string;
  page: string;
  href: string;
  label: string;
};

type Where = { area: string; page: string; href: string; label: string };

const isObj = (v: unknown): v is Record<string, Json> => typeof v === "object" && v !== null && !Array.isArray(v);
const isRef = (v: unknown): v is { $media: string } => isObj(v) && typeof v.$media === "string" && Object.keys(v).length === 1;

function text(v: Json | undefined): string {
  if (typeof v === "string") return v;
  if (isObj(v) && typeof v.en === "string") return v.en;
  return "";
}

/** "whySccsTile1" → "Why SCCS tile 1", "hero" → "Top banner". */
function words(key: string): string {
  const named: Record<string, string> = { hero: "Top banner", image: "Main photo", photo: "Photo", gallery: "Gallery" };
  if (named[key]) return named[key];
  const s = key
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .replace(/([0-9])([A-Za-z])/g, "$1 $2")
    .toLowerCase()
    .replace(/\bsccs\b/g, "SCCS")
    .replace(/\bstuco\b/g, "StuCo")
    .replace(/\bap\b/g, "AP");
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function itemName(item: Json | undefined, i: number): string {
  if (isObj(item)) for (const k of ["title", "name", "caption", "label", "university"]) if (text(item[k])) return text(item[k]);
  return `#${i + 1}`;
}

/** Describes the path inside an item: ["gallery", 2] → "Gallery · photo 3", ["sections", 1, "image"] → "Section: Robotics · Main photo". */
function describe(root: Json, path: SpotPath): string {
  const parts: string[] = [];
  let node: Json | undefined = root;
  for (let i = 0; i < path.length; i++) {
    const seg = path[i];
    const parent: Json | undefined = node;
    node = Array.isArray(parent) ? parent[seg as number] : isObj(parent) ? parent[seg as string] : undefined;
    if (typeof seg === "number") {
      if (isRef(node)) parts.push(`photo ${seg + 1}`);
      else parts.push(itemName(node, seg));
    } else if (!(seg === "image" || seg === "photo") || parts.length === 0) {
      parts.push(words(seg));
    }
  }
  return parts.join(" · ") || "Photo";
}

const itemPages: Record<string, { area: string; prefix: string; base: string }> = {
  experiences: { area: "Campus Life", prefix: "Jaguar Experience", base: "/campus-life/jaguar-experience/" },
  traditions: { area: "Campus Life", prefix: "Beyond the Classroom", base: "/campus-life/beyond-the-classroom/" },
  news: { area: "News & events", prefix: "News", base: "/news/" },
};

const fixedPages: Record<string, { area: string; page: string; href: string; section?: string }> = {
  heroSlides: { area: "Home & site-wide", page: "Home page", href: "/", section: "Hero slideshow" },
  acceptances: { area: "Home & site-wide", page: "Home page", href: "/#acceptances", section: "University acceptance posters" },
  instagram: { area: "Home & site-wide", page: "Home page", href: "/#events", section: "Instagram strip" },
  history: { area: "Discover SCCS", page: "Our History", href: "/discover/history" },
  safety: { area: "Discover SCCS", page: "Safety & Wellness", href: "/discover/safety-wellness" },
  campus: { area: "Discover SCCS", page: "Campus & Facilities", href: "/discover/campus" },
  spotlights: { area: "People", page: "Community", href: "/community", section: "Faculty spotlights" },
};

function locate(collection: string, value: Json, path: SpotPath): Where {
  if (collection === "pagePhotos") {
    const info = PAGE_PHOTO_INFO[path[0] as keyof typeof PAGE_PHOTO_INFO];
    const label = words(String(path[1])) + (typeof path[2] === "number" ? ` · photo ${path[2] + 1}` : "");
    return { area: info?.area ?? "Other", page: info?.page ?? words(String(path[0])), href: info?.href ?? "/", label };
  }
  const ip = itemPages[collection];
  if (ip && Array.isArray(value) && typeof path[0] === "number") {
    const item = value[path[0]];
    const slug = isObj(item) && typeof item.slug === "string" ? item.slug : "";
    return { area: ip.area, page: `${ip.prefix} · ${itemName(item, path[0])}`, href: ip.base + slug, label: describe(item, path.slice(1)) };
  }
  const fp = fixedPages[collection] ?? { area: "Other", page: words(collection), href: "/" };
  const label = describe(value, path);
  return { area: fp.area, page: fp.page, href: fp.href, label: fp.section ? `${fp.section} · ${label}` : label };
}

function walk(v: Json, path: SpotPath, out: { path: SpotPath; key: string }[]) {
  if (isRef(v)) out.push({ path, key: v.$media });
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, [...path, i], out));
  else if (isObj(v)) for (const [k, x] of Object.entries(v)) walk(x, [...path, k], out);
}

function at(root: Json, path: SpotPath): Json | undefined {
  let node: Json | undefined = root;
  for (const seg of path) node = Array.isArray(node) ? node[seg as number] : isObj(node) ? node[seg as string] : undefined;
  return node;
}

export const AREA_ORDER = ["Home & site-wide", "Discover SCCS", "Admissions & contact", "Learning & Outcomes", "Campus Life", "News & events", "People", "Other"];

export function photoSpots(doc: OverrideDoc, collections: string[]): PhotoSpot[] {
  const spots: PhotoSpot[] = [];
  for (const id of collections) {
    if (id === "media") continue;
    const value = currentOf(id, doc);
    const defaults = defaultsOf(id);
    const found: { path: SpotPath; key: string }[] = [];
    walk(value, [], found);
    for (const f of found) {
      const original = at(defaults, f.path);
      spots.push({
        id: `${id}:${f.path.join(".")}`,
        collection: id,
        path: f.path,
        key: f.key,
        originalKey: isRef(original) ? original.$media : null,
        ...locate(id, value, f.path),
      });
    }
  }
  const rank = (a: string) => {
    const i = AREA_ORDER.indexOf(a);
    return i < 0 ? AREA_ORDER.length : i;
  };
  // Stable: area order first, then the order the spots were found in.
  return spots.map((s, i) => ({ s, i })).sort((a, b) => rank(a.s.area) - rank(b.s.area) || a.i - b.i).map(({ s }) => s);
}

/** Every photo spot on the site, with the hero slideshow and each page's own layout photos ahead of list items. */
export function siteSpots(doc: OverrideDoc): PhotoSpot[] {
  const first = ["heroSlides", "pagePhotos"];
  return photoSpots(doc, [...first, ...COLLECTIONS.map((c) => c.id).filter((id) => !first.includes(id))]);
}

/** For each library photo, the places it appears ("Home page · Hero slideshow · Our campus"). */
export function photoUsage(doc: OverrideDoc): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const s of siteSpots(doc)) (out[s.key] ??= []).push(`${s.page} · ${s.label}`);
  return out;
}
