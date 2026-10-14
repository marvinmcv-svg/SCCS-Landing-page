"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useScrollChoreography } from "../home/motion";
import { useLang } from "./i18n";
import { Header } from "./header";
import { Footer } from "./footer";
import { CommandPalette } from "./command-palette";
import { Carlita } from "./carlita";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  const pathname = usePathname();
  const main = useRef<HTMLElement>(null);
  // Scroll choreography for every page; re-scanned when the route changes.
  useScrollChoreography(main, [pathname]);
  // The admin portal has its own chrome.
  if (pathname?.startsWith("/admin")) return <>{children}</>;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.misc.skipToContent}
      </a>
      <Header />
      <main ref={main} id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CommandPalette />
      <Carlita />
    </div>
  );
}
