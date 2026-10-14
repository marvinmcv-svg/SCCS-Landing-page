import { NextResponse } from "next/server";
import { currentOf, defaultsOf, diff, type Json } from "@/lib/content/engine";
import { readContentFresh, saveContent, saveImage } from "@/lib/content/store";
import { guard, publish, storageError } from "@/lib/admin-api";

const MAX_BYTES = 4 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];

/**
 * Upload a photo. With `mode=file` it only stores the image and returns its URL (to replace
 * an existing library photo); otherwise it also adds a new photo to the library and returns its key.
 */
export async function POST(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;

  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof Blob) || !TYPES.includes(file.type)) return NextResponse.json({ ok: false, error: "Choose a JPG, PNG, WebP or AVIF image." }, { status: 400 });
  if (file.size > MAX_BYTES) return NextResponse.json({ ok: false, error: "That image is larger than 4 MB." }, { status: 413 });

  const width = Math.round(Number(form?.get("width")));
  const height = Math.round(Number(form?.get("height")));
  if (!(width > 0 && height > 0)) return NextResponse.json({ ok: false, error: "Could not read the image size." }, { status: 400 });
  const text = (k: string) => String(form?.get(k) ?? "").slice(0, 300);
  const name = text("name") || "photo.jpg";

  try {
    const src = await saveImage(name, file);
    if (form?.get("mode") === "file") return NextResponse.json({ ok: true, src, width, height });
    const key = `upload${Date.now().toString(36)}`;
    const photo = { src, width, height, alt: { en: text("altEn"), es: text("altEs") }, source: "upload" };

    const doc = await readContentFresh();
    const library = currentOf("media", doc) as Record<string, Json>;
    library[key] = photo;
    const patch = diff(defaultsOf("media"), library);
    const next = { version: new Date().toISOString(), collections: { ...doc.collections, ...(patch ? { media: patch } : {}) } };
    await saveContent(next);
    publish();
    return NextResponse.json({ ok: true, key, photo, version: next.version });
  } catch (err) {
    return storageError(err);
  }
}
