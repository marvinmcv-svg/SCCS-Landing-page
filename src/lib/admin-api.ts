import "server-only";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { isAdmin } from "./admin-auth";
import { CONTENT_TAG } from "./content/store";

/** Rejects requests that did not come from this site's own pages. */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Guard for admin-only mutations: same origin and a valid session. */
export async function guard(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "Bad origin" }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ ok: false, error: "Not signed in" }, { status: 401 });
  return null;
}

/** Makes the next request for any page render with the latest content. */
export function publish() {
  revalidateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
}

export function storageError(err: unknown) {
  const notConfigured = err instanceof Error && err.message === "STORAGE_NOT_CONFIGURED";
  return NextResponse.json(
    { ok: false, error: notConfigured ? "Storage is not connected. Connect a Vercel Blob store to this project, then redeploy." : "Could not save. Please try again." },
    { status: notConfigured ? 503 : 500 },
  );
}
