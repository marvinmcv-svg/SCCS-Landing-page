"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Globe, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { PILLARS } from "@/data/nav";
import { cn, EASE } from "@/lib/utils";
import { useLang } from "./i18n";
import { LogoLockup, buttonStyles } from "./sccs-shared";
import { openPalette } from "./command-palette";

function LangToggle({ light }: { light: boolean }) {
  const { lang, toggleLang, t } = useLang();
  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={`${t.misc.localeLabel}: ${lang === "en" ? "English" : "Español"}`}
      className={cn(
        "pressable inline-flex min-h-11 items-center gap-2 rounded-full border px-3.5 text-xs font-semibold tracking-wide transition-colors",
        light ? "border-white/30 text-white/90 hover:border-white/60" : "border-border text-jungle-900 hover:border-gold-500",
      )}
    >
      <Globe className="h-3.5 w-3.5" aria-hidden="true" />
      <span className={cn(lang !== "en" && "opacity-50")}>EN</span>
      <span className="opacity-40">/</span>
      <span className={cn(lang !== "es" && "opacity-50")}>ES</span>
    </button>
  );
}

export function Header() {
  const { t, tr } = useLang();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const isHome = pathname === "/";

  // Glass state + home-page section tracking.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
      if (!isHome) return;
      let current: string | null = null;
      for (const p of PILLARS) {
        const el = document.getElementById(p.homeAnchor);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 140 && r.bottom > 140) current = p.id;
      }
      // Matriculation belongs to Learning & Outcomes.
      const m = document.getElementById("matriculation")?.getBoundingClientRect();
      const j = document.getElementById("journey")?.getBoundingClientRect();
      if ((m && m.top <= 140 && m.bottom > 140) || (j && j.top <= 140 && j.bottom > 140)) current = "learning";
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Route-based active pillar on inner pages.
  const routeActive = !isHome
    ? (PILLARS.find((p) => pathname.startsWith(p.href) || p.children.some((c) => pathname === c.href.split("#")[0]))?.id ??
      (pathname.startsWith("/news") ? "campus-life" : pathname.startsWith("/contact") ? "community" : null))
    : null;
  const activeId = isHome ? active : routeActive;

  // Scroll lock while the drawer is open; close on route change.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => setOpen(false), [pathname]);

  const light = !scrolled;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled ? "border-b border-border bg-ivory/90 shadow-[0_1px_24px_rgba(7,37,26,0.06)] backdrop-blur-xl" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Utility strip */}
        <div
          className={cn(
            "hidden items-center justify-end gap-4 pt-2 text-[0.7rem] font-medium transition-all duration-300 lg:flex",
            scrolled ? "h-0 overflow-hidden pt-0 opacity-0" : "h-7 opacity-100",
            light ? "text-white/75" : "text-mist",
          )}
        >
          <Link href="/community#parent-hub" className="hover:text-gold-400">
            {t.nav.families}
          </Link>
          <span className={cn("h-3 w-px", light ? "bg-white/30" : "bg-border")} aria-hidden="true" />
          <button type="button" onClick={openPalette} className="inline-flex items-center gap-1.5 hover:text-gold-400">
            <Search className="h-3 w-3" aria-hidden="true" />
            {t.nav.search}
            <kbd className={cn("rounded border px-1.5 py-px font-sans text-[0.62rem]", light ? "border-white/30" : "border-border")}>⌘K</kbd>
          </button>
        </div>

        {/* Main bar */}
        <div className={cn("flex items-center justify-between gap-4 transition-[height] duration-300", scrolled ? "h-[4.5rem]" : "h-20")}>
          <Link href="/" aria-label="Santa Cruz Cooperative School — home" className="pressable shrink-0">
            <LogoLockup variant={light ? "light" : "dark"} />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center">
              {PILLARS.map((p) => {
                const isActive = activeId === p.id;
                return (
                  <li key={p.id} className="group relative">
                    <Link
                      href={p.href}
                      data-active={isActive}
                      aria-current={!isHome && isActive ? "page" : undefined}
                      className={cn(
                        "sccs-link-underline inline-flex min-h-11 items-center gap-1 whitespace-nowrap px-2.5 text-[0.875rem] font-medium transition-colors 2xl:px-3.5",
                        isActive ? (light ? "text-gold-400" : "text-gold-600") : light ? "text-white/90 hover:text-white" : "text-jungle-900 hover:text-jungle-600",
                      )}
                    >
                      {tr(p.label)}
                      <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180" aria-hidden="true" />
                    </Link>
                    {/* Mega dropdown */}
                    <div className="invisible absolute left-1/2 top-full z-10 w-[22rem] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <ul className="overflow-hidden rounded-2xl border border-border bg-ivory p-2 shadow-[0_24px_60px_rgba(7,37,26,0.18)]">
                        {p.children.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="block rounded-xl px-4 py-3 transition-colors hover:bg-cream focus-visible:bg-cream">
                              <span className="block text-sm font-semibold text-jungle-900">{tr(c.label)}</span>
                              <span className="mt-0.5 block text-xs text-mist">{tr(c.blurb)}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openPalette}
              aria-label={t.nav.search}
              className={cn("pressable flex h-11 w-11 items-center justify-center rounded-full lg:hidden", light ? "text-white" : "text-jungle-900")}
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <div className="hidden sm:block">
              <LangToggle light={light} />
            </div>
            <Link href="/admissions#inquire" className={cn(buttonStyles.gold, "hidden whitespace-nowrap px-6 sm:inline-flex")}>
              {t.nav.apply}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t.misc.openMenu}
              aria-expanded={open}
              className={cn("pressable flex h-11 w-11 items-center justify-center rounded-full xl:hidden", light ? "text-white" : "text-jungle-900")}
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile drawer — rendered outside <header> so backdrop-filter doesn't become its containing block. */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-jungle-950/50 backdrop-blur-sm xl:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={t.nav.menu}
              className="tabbar-safe fixed inset-y-0 right-0 z-[61] flex w-full max-w-sm flex-col bg-ivory shadow-2xl xl:hidden"
              initial={reduce ? { opacity: 0 } : { x: "100%" }}
              animate={reduce ? { opacity: 1 } : { x: 0 }}
              exit={reduce ? { opacity: 0 } : { x: "100%" }}
              transition={reduce ? { duration: 0.15 } : { type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex h-20 items-center justify-between border-b border-border px-5">
                <LogoLockup />
                <button type="button" onClick={() => setOpen(false)} aria-label={t.nav.close} className="pressable flex h-11 w-11 items-center justify-center rounded-full text-jungle-900 hover:bg-cream">
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <nav aria-label="Mobile" className="ios-scroll flex-1 overflow-y-auto px-5 py-4">
                <ul>
                  {PILLARS.map((p, i) => (
                    <motion.li
                      key={p.id}
                      className="border-b border-border/70"
                      initial={reduce ? false : { opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: EASE }}
                    >
                      <div className="flex items-center justify-between">
                        <Link href={p.href} className={cn("font-display flex min-h-14 flex-1 items-center text-2xl", activeId === p.id ? "text-gold-600" : "text-jungle-900")}>
                          {tr(p.label)}
                        </Link>
                        <button
                          type="button"
                          aria-label={`${t.nav.explore} ${tr(p.label)}`}
                          aria-expanded={expanded === p.id}
                          onClick={() => setExpanded((e) => (e === p.id ? null : p.id))}
                          className="pressable flex h-11 w-11 items-center justify-center rounded-full text-jungle-800 hover:bg-cream"
                        >
                          <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", expanded === p.id && "rotate-180")} aria-hidden="true" />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {expanded === p.id && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden"
                          >
                            {p.children.map((c) => (
                              <li key={c.href}>
                                <Link href={c.href} className="flex min-h-11 items-center pb-2 pl-1 text-[0.95rem] text-mist hover:text-jungle-800">
                                  {tr(c.label)}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-3">
                  <LangToggle light={false} />
                  <Link href="/admissions#inquire" className={cn(buttonStyles.gold, "flex-1")}>
                    {t.nav.apply}
                  </Link>
                </div>
              </nav>
              <div className="border-t border-border px-5 py-4 text-xs text-mist">
                <a href="tel:+59133530808" className="hover:text-jungle-800">
                  +591 3 3530808
                </a>{" "}
                ·{" "}
                <a href="mailto:contactus@sccs.edu.bo" className="hover:text-jungle-800">
                  contactus@sccs.edu.bo
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
