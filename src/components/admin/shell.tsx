"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ExternalLink, LayoutGrid, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Crest } from "@/components/sccs/sccs-shared";
import type { CollectionMeta } from "./editor";

export function AdminShell({ collections, storage, children }: { collections: CollectionMeta[]; storage: "blob" | "local" | "none"; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const groups = [...new Set(collections.map((c) => c.group))];

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="min-h-svh bg-ivory lg:grid lg:grid-cols-[18rem_1fr]">
      <aside className="border-b border-border bg-white lg:sticky lg:top-0 lg:h-svh lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <div className="flex items-center gap-3 px-5 py-5">
          <Crest className="h-10 w-10" />
          <div>
            <p className="font-display text-lg font-semibold leading-none text-navy-900">SCCS Admin</p>
            <p className="mt-1 text-xs text-mist">Website content</p>
          </div>
        </div>
        <nav className="px-3 pb-6" aria-label="Sections">
          <Link href="/admin" className={cn("flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold", pathname === "/admin" ? "bg-navy-800 text-white" : "text-navy-900 hover:bg-cream")}>
            <LayoutGrid className="h-4 w-4" aria-hidden="true" />
            Overview
          </Link>
          <div className="mt-2 max-lg:flex max-lg:gap-2 max-lg:overflow-x-auto max-lg:pb-2">
            {groups.map((g) => (
              <div key={g} className="mt-4 max-lg:mt-0 max-lg:shrink-0">
                <p className="px-3 pb-1 text-xs font-bold text-mist max-lg:hidden">{g}</p>
                <ul className="max-lg:flex max-lg:gap-1">
                  {collections
                    .filter((c) => c.group === g)
                    .map((c) => {
                      const active = pathname === `/admin/${c.id}`;
                      return (
                        <li key={c.id}>
                          <Link
                            href={`/admin/${c.id}`}
                            className={cn("flex min-h-10 items-center whitespace-nowrap rounded-xl px-3 text-sm", active ? "bg-navy-800 font-semibold text-white" : "text-navy-900 hover:bg-cream")}
                          >
                            {c.label}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-1 border-t border-border pt-4">
            <a href="/" target="_blank" className="flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-navy-900 hover:bg-cream">
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open the website
            </a>
            <button type="button" onClick={signOut} className="flex min-h-10 w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold text-navy-900 hover:bg-cream">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Sign out
            </button>
          </div>
        </nav>
      </aside>
      <main className="min-w-0 px-4 sm:px-8">
        {storage === "none" && (
          <p role="alert" className="mt-4 rounded-2xl bg-crimson-100 p-4 text-sm font-medium text-crimson-700">
            Saving is switched off: this deployment has no storage. In Vercel, open the project, go to Storage, create a Blob store and connect it to this project, then redeploy.
          </p>
        )}
        {children}
      </main>
    </div>
  );
}
