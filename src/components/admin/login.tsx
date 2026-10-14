"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Crest } from "@/components/sccs/sccs-shared";

export function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
    const data = await res.json().catch(() => ({ ok: false }));
    setBusy(false);
    if (!data.ok) return setError(data.error ?? "Could not sign in.");
    router.refresh();
  }

  return (
    <main className="grid min-h-svh place-items-center bg-navy-950 px-5">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-2xl">
        <Crest className="mx-auto h-16 w-16" />
        <h1 className="font-display mt-5 text-center text-3xl font-semibold text-navy-900">SCCS Admin</h1>
        {configured ? (
          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block text-sm font-semibold text-navy-900">
              Username
              <input
                type="text"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1.5 h-12 w-full rounded-xl px-4 ring-1 ring-inset ring-border outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </label>
            <label className="block text-sm font-semibold text-navy-900">
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 h-12 w-full rounded-xl px-4 ring-1 ring-inset ring-border outline-none focus:ring-2 focus:ring-amber-500"
                required
              />
            </label>
            {error && (
              <p role="alert" className="text-sm font-medium text-crimson-600">
                {error}
              </p>
            )}
            <button type="submit" disabled={busy} className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-navy-800 font-bold text-white hover:bg-navy-700 disabled:opacity-60">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              Sign in
            </button>
          </form>
        ) : (
          <p className="mt-5 text-center text-sm leading-relaxed text-mist">
            The admin portal is not switched on yet. Add <strong>ADMIN_USERNAME</strong> and <strong>ADMIN_PASSWORD</strong> (at least 8 characters) as environment variables on the project in Vercel, then redeploy.
          </p>
        )}
      </div>
    </main>
  );
}
