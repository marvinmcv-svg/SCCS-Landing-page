import { NextResponse } from "next/server";
import { RESUME_MAX_BYTES, applicationSchema, resumeKind } from "@/lib/application-schema";
import { applicationStorageReady, saveApplication } from "@/lib/applications";

// In-memory per-IP rate limiter. Applications themselves are saved durably (see lib/applications).
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return fail("Too many requests", 429);

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return fail("Expected a multipart form", 400);
  }

  const text = (k: string) => {
    const v = form.get(k);
    return typeof v === "string" ? v : "";
  };
  const parsed = applicationSchema.safeParse({
    position: text("position"),
    positionSlug: text("positionSlug"),
    name: text("name"),
    email: text("email"),
    phone: text("phone"),
    location: text("location"),
    experience: text("experience"),
    link: text("link"),
    letter: text("letter"),
    consent: text("consent") === "true",
    website: text("website"),
  });
  if (!parsed.success) return fail(parsed.error.issues.map((i) => i.path.join(".")).join(", ") || "Invalid input", 400);

  const file = form.get("resume");
  if (!(file instanceof File) || file.size === 0) return fail("resume", 400);
  if (file.size > RESUME_MAX_BYTES) return fail("resume-size", 413);
  const bytes = new Uint8Array(await file.arrayBuffer());
  const kind = resumeKind(bytes);
  if (!kind) return fail("resume-type", 415);

  const id = crypto.randomUUID();
  // `consent` is required by the schema (always true here), so it is not stored.
  const { website, consent, ...data } = parsed.data;
  void consent;

  // Honeypot filled → pretend success, store nothing.
  if (website && website.trim() !== "") return NextResponse.json({ ok: true, id });

  if (!applicationStorageReady()) {
    console.error("[application] storage not configured; cannot keep the résumé");
    return fail("Storage not configured", 503);
  }
  try {
    await saveApplication({ id, receivedAt: new Date().toISOString(), ...data }, { name: file.name || `resume.${kind}`, kind, bytes });
  } catch (err) {
    console.error("[application] could not be saved", err);
    return fail("Could not save application", 500);
  }
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
