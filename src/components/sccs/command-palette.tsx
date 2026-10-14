"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { ArrowUp, CalendarDays, Compass, FileText, Globe, GraduationCap, Hash, MapPin, Newspaper, Send, Sparkles, User } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PILLARS } from "@/data/nav";
import { EXPERIENCES } from "@/data/experiences";
import { TRADITIONS } from "@/data/traditions";
import { TEAM, sortedNews, upcomingEvents } from "@/data/sccs-content";
import { useLang } from "./i18n";

const OPEN_EVENT = "sccs:open-palette";

export function openPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CommandPalette() {
  const { t, tr, lang, toggleLang, dateLocale } = useLang();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      const [path, hash] = href.split("#");
      if ((path === "" || path === pathname) && hash) {
        // Same page — smooth-scroll after the dialog closes.
        requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }));
        return;
      }
      router.push(href);
    },
    [pathname, router],
  );

  const jumpTo = [
    { id: "stats", label: lang === "en" ? "At a glance" : "En resumen" },
    ...PILLARS.map((p) => ({ id: p.homeAnchor, label: tr(p.label) })),
  ];

  const pages = [
    ...PILLARS.flatMap((p) => p.children.map((c) => ({ href: c.href, label: tr(c.label), hint: tr(p.label) }))),
    ...EXPERIENCES.map((e) => ({ href: `/campus-life/jaguar-experience/${e.slug}`, label: tr(e.title), hint: t.campusLife.title })),
    ...TRADITIONS.map((tr_) => ({ href: `/campus-life/beyond-the-classroom/${tr_.slug}`, label: tr(tr_.title), hint: t.campusLife.beyondTitle })),
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent closeLabel={t.nav.close} aria-describedby={undefined}>
        <DialogTitle className="sr-only">{t.palette.title}</DialogTitle>
        <Command loop>
          <CommandInput placeholder={t.palette.placeholder} />
          <CommandList>
            <CommandEmpty>{t.palette.noResults}</CommandEmpty>

            <CommandGroup heading={t.palette.groups.jumpTo}>
              {jumpTo.map((j) => (
                <CommandItem key={j.id} value={`jump ${j.label}`} onSelect={() => go(`/#${j.id}`)}>
                  <Hash className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  {j.label}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading={t.palette.groups.actions}>
              <CommandItem value={t.palette.actions.apply} onSelect={() => go("/admissions#inquire")}>
                <GraduationCap className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {t.palette.actions.apply}
              </CommandItem>
              <CommandItem value={t.palette.actions.tour} onSelect={() => go("/admissions#inquire")}>
                <MapPin className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {t.palette.actions.tour}
              </CommandItem>
              <CommandItem value={t.palette.actions.inquire} onSelect={() => go("/admissions#inquire")}>
                <Send className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {t.palette.actions.inquire}
              </CommandItem>
              <CommandItem
                value={lang === "en" ? t.palette.actions.langEs : t.palette.actions.langEn}
                onSelect={() => {
                  toggleLang();
                  setOpen(false);
                }}
              >
                <Globe className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {lang === "en" ? t.palette.actions.langEs : t.palette.actions.langEn}
              </CommandItem>
              <CommandItem
                value={t.palette.actions.top}
                onSelect={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                <ArrowUp className="h-4 w-4 text-gold-600" aria-hidden="true" />
                {t.palette.actions.top}
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading={t.palette.groups.pages}>
              {pages.map((p) => (
                <CommandItem key={p.href + p.label} value={`${p.label} ${p.hint}`} onSelect={() => go(p.href)}>
                  {p.href.includes("jaguar-experience") ? (
                    <Sparkles className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  ) : p.href.includes("beyond") ? (
                    <Compass className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  ) : (
                    <FileText className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  )}
                  <span className="flex-1">{p.label}</span>
                  <span className="text-xs text-mist">{p.hint}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading={t.palette.groups.news}>
              {sortedNews().map((n) => (
                <CommandItem key={n.slug} value={`news ${tr(n.title)}`} onSelect={() => go(`/news/${n.slug}`)}>
                  <Newspaper className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  {tr(n.title)}
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading={t.palette.groups.events}>
              {upcomingEvents().map((e) => (
                <CommandItem key={e.date + e.title.en} value={`event ${tr(e.title)}`} onSelect={() => go(e.href)}>
                  <CalendarDays className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  <span className="flex-1">{tr(e.title)}</span>
                  <span className="text-xs text-mist">{format(parseISO(e.date), "d MMM", { locale: dateLocale })}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading={t.palette.groups.team}>
              {TEAM.map((m) => (
                <CommandItem key={m.name} value={`team ${m.name} ${tr(m.role)}`} onSelect={() => go("/community#team")}>
                  <User className="h-4 w-4 text-gold-600" aria-hidden="true" />
                  <span className="flex-1">{m.name}</span>
                  <span className="text-xs text-mist">{tr(m.role)}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <div className="flex items-center justify-end gap-1.5 border-t border-border px-4 py-2.5 text-[0.7rem] text-mist">
            <kbd className="rounded border border-border bg-white px-1.5 py-px">⌘K</kbd> {t.palette.hint}
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
