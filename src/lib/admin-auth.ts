import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin sign-in. A username and password set as ADMIN_USERNAME and ADMIN_PASSWORD
 * in the hosting environment (never in the code). A successful sign-in sets an
 * httpOnly cookie holding an expiry time signed with those credentials, so changing
 * either one signs everyone out.
 */
export const ADMIN_COOKIE = "sccs_admin";
const SESSION_HOURS = 12;

const username = () => (process.env.ADMIN_USERNAME ?? "").trim();

export const adminConfigured = () => username().length > 0 && (process.env.ADMIN_PASSWORD ?? "").length >= 8;

function sign(value: string) {
  return createHmac("sha256", `sccs-admin:${username()}:${process.env.ADMIN_PASSWORD}`).update(value).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export function credentialsMatch(user: string, password: string) {
  if (!adminConfigured()) return false;
  // Compare digests so the comparison takes the same time whatever the input length.
  const userOk = safeEqual(sign(`user:${user.trim().toLowerCase()}`), sign(`user:${username().toLowerCase()}`));
  const passOk = safeEqual(sign(`pw:${password}`), sign(`pw:${process.env.ADMIN_PASSWORD}`));
  return userOk && passOk;
}

export function newSessionToken() {
  const exp = String(Date.now() + SESSION_HOURS * 3600_000);
  return { value: `${exp}.${sign(exp)}`, maxAge: SESSION_HOURS * 3600 };
}

function tokenValid(token: string | undefined) {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !safeEqual(sig, sign(exp))) return false;
  return Number(exp) > Date.now();
}

export async function isAdmin() {
  const jar = await cookies();
  return tokenValid(jar.get(ADMIN_COOKIE)?.value);
}
