import { NextResponse } from "next/server";
import { collection, currentOf, defaultsOf, diff, sameShape, type Json } from "@/lib/content/engine";
import { readContentFresh, saveContent } from "@/lib/content/store";
import { guard, publish, storageError } from "@/lib/admin-api";

/** Save one collection. The body carries the whole edited value; only the difference from the defaults is stored. */
export async function PUT(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;

  const body = (await req.json().catch(() => null)) as { id?: unknown; value?: unknown } | null;
  const id = typeof body?.id === "string" ? body.id : "";
  if (!collection(id) || body?.value === undefined) return NextResponse.json({ ok: false, error: "Unknown section." }, { status: 400 });

  const value = body.value as Json;
  if (!sameShape(defaultsOf(id), value)) return NextResponse.json({ ok: false, error: "Some fields have the wrong kind of value." }, { status: 400 });

  try {
    const doc = await readContentFresh();
    const patch = diff(defaultsOf(id), value);
    const collections = { ...doc.collections };
    if (patch === undefined) delete collections[id];
    else collections[id] = patch;
    const next = { version: new Date().toISOString(), collections };
    await saveContent(next);
    publish();
    return NextResponse.json({ ok: true, version: next.version, value: currentOf(id, next) });
  } catch (err) {
    return storageError(err);
  }
}

/** Put one collection back to the defaults written in the site's code. */
export async function DELETE(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;
  const id = new URL(req.url).searchParams.get("id") ?? "";
  if (!collection(id)) return NextResponse.json({ ok: false, error: "Unknown section." }, { status: 400 });
  try {
    const doc = await readContentFresh();
    const collections = { ...doc.collections };
    delete collections[id];
    const next = { version: new Date().toISOString(), collections };
    await saveContent(next);
    publish();
    return NextResponse.json({ ok: true, version: next.version, value: defaultsOf(id) });
  } catch (err) {
    return storageError(err);
  }
}
