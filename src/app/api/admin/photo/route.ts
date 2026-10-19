import { NextResponse } from "next/server";
import { collection, currentOf, defaultsOf, diff, sameShape, type Json } from "@/lib/content/engine";
import { readContentFresh, saveContent } from "@/lib/content/store";
import { guard, publish, storageError } from "@/lib/admin-api";

type Seg = string | number;
const isObj = (v: unknown): v is Record<string, Json> => typeof v === "object" && v !== null && !Array.isArray(v);
const isRef = (v: unknown): v is { $media: string } => isObj(v) && typeof v.$media === "string" && Object.keys(v).length === 1;

/** Put one library photo in one spot on the site: `{ collection, path, key }`. */
export async function PUT(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;

  const body = (await req.json().catch(() => null)) as { collection?: unknown; path?: unknown; key?: unknown } | null;
  const id = typeof body?.collection === "string" ? body.collection : "";
  const path = Array.isArray(body?.path) && body.path.every((s) => typeof s === "string" || (typeof s === "number" && Number.isInteger(s) && s >= 0)) ? (body.path as Seg[]) : null;
  const key = typeof body?.key === "string" ? body.key : "";
  if (!collection(id) || id === "media" || !path || !path.length) return NextResponse.json({ ok: false, error: "Unknown photo spot." }, { status: 400 });

  try {
    const doc = await readContentFresh();
    const library = currentOf("media", doc) as Record<string, Json>;
    if (!(key in library)) return NextResponse.json({ ok: false, error: "That photo is not in the library." }, { status: 400 });

    const value = currentOf(id, doc);
    // Walk to the spot's parent and check the spot holds a photo.
    let parent: Json = value;
    for (const seg of path.slice(0, -1)) {
      parent = Array.isArray(parent) ? parent[seg as number] : isObj(parent) ? parent[seg as string] : null;
      if (parent === null || parent === undefined) return NextResponse.json({ ok: false, error: "That photo spot no longer exists." }, { status: 409 });
    }
    const last = path[path.length - 1];
    const current = Array.isArray(parent) ? parent[last as number] : isObj(parent) ? parent[last as string] : undefined;
    if (!isRef(current)) return NextResponse.json({ ok: false, error: "That photo spot no longer exists." }, { status: 409 });
    if (Array.isArray(parent)) parent[last as number] = { $media: key };
    else (parent as Record<string, Json>)[last as string] = { $media: key };

    if (!sameShape(defaultsOf(id), value)) return NextResponse.json({ ok: false, error: "Could not place that photo." }, { status: 400 });
    const patch = diff(defaultsOf(id), value);
    const collections = { ...doc.collections };
    if (patch === undefined) delete collections[id];
    else collections[id] = patch;
    const next = { version: new Date().toISOString(), collections };
    await saveContent(next);
    publish();
    return NextResponse.json({ ok: true, version: next.version });
  } catch (err) {
    return storageError(err);
  }
}
