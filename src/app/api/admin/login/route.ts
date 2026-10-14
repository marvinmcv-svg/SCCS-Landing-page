import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminConfigured, newSessionToken, passwordMatches } from "@/lib/admin-auth";
import { sameOrigin } from "@/lib/admin-api";

const attempts = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 8;

function limited(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ ok: false, error: "Bad origin" }, { status: 403 });
  if (!adminConfigured()) return NextResponse.json({ ok: false, error: "The admin password has not been set up yet." }, { status: 503 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many attempts. Try again in 10 minutes." }, { status: 429 });

  const body = (await req.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";
  if (!passwordMatches(password)) return NextResponse.json({ ok: false, error: "That password is not correct." }, { status: 401 });

  const token = newSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: token.maxAge,
  });
  return res;
}
