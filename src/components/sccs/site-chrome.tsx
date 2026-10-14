"use client";

import { useLang } from "./i18n";
import { Header } from "./header";
import { Footer } from "./footer";
import { CommandPalette } from "./command-palette";
import { Carlita } from "./carlita";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const { t } = useLang();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {t.misc.skipToContent}
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <CommandPalette />
      <Carlita />
    </div>
  );
}
