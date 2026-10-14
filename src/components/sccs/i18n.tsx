"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { enUS, es as esLocale } from "date-fns/locale";
import { dictionaries, type Dict } from "@/data/dictionary";
import type { L, Lang } from "@/lib/i18n-types";

type Ctx = {
  lang: Lang;
  t: Dict;
  /** Resolve a bilingual string to the active language. */
  tr: (value: L) => string;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
  dateLocale: typeof enUS;
};

const LangContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "sccs-lang";

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "es") setLangState(saved);
    } catch {
      /* storage unavailable, stay on default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((l) => (l === "en" ? "es" : "en")), []);
  const tr = useCallback((value: L) => value[lang], [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, t: dictionaries[lang], tr, toggleLang, setLang, dateLocale: lang === "es" ? esLocale : enUS }),
    [lang, tr, toggleLang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
