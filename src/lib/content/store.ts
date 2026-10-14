import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { unstable_cache } from "next/cache";
import { get, put } from "@vercel/blob";
import { EMPTY_DOC, applyContent, type OverrideDoc } from "./engine";

/**
 * Where admin edits live. On Vercel: a JSON file in Vercel Blob. In local
 * development without a Blob store: `.data/content.json` in the project.
 */
const DOC_PATH = "sccs-content/overrides.json";
const LOCAL_DOC = path.join(process.cwd(), ".data", "content.json");
export const CONTENT_TAG = "sccs-content";

export const blobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
const canUseLocalFiles = () => !blobConfigured() && process.env.VERCEL !== "1";

export function storageStatus(): "blob" | "local" | "none" {
  if (blobConfigured()) return "blob";
  return canUseLocalFiles() ? "local" : "none";
}

function parseDoc(text: string): OverrideDoc {
  const doc = JSON.parse(text) as OverrideDoc;
  if (typeof doc?.version !== "string" || typeof doc.collections !== "object" || !doc.collections) return EMPTY_DOC;
  return doc;
}

async function readDoc(): Promise<OverrideDoc> {
  try {
    if (blobConfigured()) {
      const res = await get(DOC_PATH, { access: "public", useCache: false });
      if (!res || res.statusCode !== 200) return EMPTY_DOC;
      return parseDoc(await new Response(res.stream).text());
    }
    if (canUseLocalFiles()) return parseDoc(await fs.readFile(LOCAL_DOC, "utf8"));
  } catch {
    /* no edits saved yet, or storage briefly unavailable: fall back to the defaults */
  }
  return EMPTY_DOC;
}

/** The saved edits, cached until the admin saves again. */
export const loadContent = unstable_cache(readDoc, ["sccs-content-doc"], { tags: [CONTENT_TAG] });

/** Loads the saved edits and applies them to the live data. Call before reading `src/data` on the server. */
export async function ensureContent() {
  const doc = await loadContent();
  applyContent(doc);
  return doc;
}

/** Reads the latest saved edits directly, skipping the cache (for the admin). */
export const readContentFresh = readDoc;

export async function saveContent(doc: OverrideDoc) {
  const body = JSON.stringify(doc);
  if (blobConfigured()) {
    await put(DOC_PATH, body, { access: "public", contentType: "application/json", addRandomSuffix: false, allowOverwrite: true, cacheControlMaxAge: 60 });
    return;
  }
  if (!canUseLocalFiles()) throw new Error("STORAGE_NOT_CONFIGURED");
  await fs.mkdir(path.dirname(LOCAL_DOC), { recursive: true });
  await fs.writeFile(LOCAL_DOC, body);
}

/** Stores an uploaded image and returns its public URL. */
export async function saveImage(name: string, file: Blob): Promise<string> {
  const safe = name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "") || "photo.jpg";
  if (blobConfigured()) {
    const res = await put(`sccs-uploads/${safe}`, file, { access: "public", addRandomSuffix: true, contentType: file.type || "image/jpeg" });
    return res.url;
  }
  if (!canUseLocalFiles()) throw new Error("STORAGE_NOT_CONFIGURED");
  const fileName = `${Date.now()}-${safe}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, fileName), Buffer.from(await file.arrayBuffer()));
  return `/uploads/${fileName}`;
}
