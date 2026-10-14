import { NextResponse } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";

type StoredInquiry = { id: string; receivedAt: string; name: string; email: string; phone?: string; grade: string; tourDate?: string; message?: string };

// In-memory store and rate limiter. Email delivery / durable storage is a deployment-layer concern.
const store: StoredInquiry[] = [];
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

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues.map((i) => i.path.join(".")).join(", ") || "Invalid input" }, { status: 400 });
  }

  const id = crypto.randomUUID();
  const { website, ...data } = parsed.data;

  // Honeypot filled → pretend success, store nothing.
  if (website && website.trim() !== "") {
    return NextResponse.json({ ok: true, id });
  }

  store.push({ id, receivedAt: new Date().toISOString(), ...data });
  return NextResponse.json({ ok: true, id }, { status: 201 });
}
