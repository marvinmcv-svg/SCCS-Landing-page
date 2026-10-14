"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ACCEPTANCES } from "@/data/acceptances";
import { ACCREDITATIONS, MINISTRY } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLang } from "./i18n";
import { Photo } from "./sccs-shared";

/* ───────── Accreditations & memberships ───────── */

/** The four badges in a quiet row. `size` picks the footer (small) or a full band. */
export function AccreditationLogos({ size = "md", className }: { size?: "sm" | "md"; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap items-center", size === "sm" ? "gap-x-6 gap-y-4" : "justify-center gap-x-12 gap-y-8 sm:gap-x-16", className)}>
      {ACCREDITATIONS.map((a) => (
        <li key={a.id}>
          <a href={a.href} target="_blank" rel="noopener noreferrer" className="block opacity-90 transition-opacity duration-300 hover:opacity-100" aria-label={a.name}>
            <Image
              src={a.logo}
              alt={a.name}
              width={a.id === "amisa" ? 540 : 300}
              height={a.id === "amisa" ? 208 : 300}
              className={cn("w-auto object-contain", size === "sm" ? "h-12" : a.id === "amisa" ? "h-14 sm:h-16" : "h-20 sm:h-24")}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Full accreditation section: each badge with what it means. Sits on a dark field. */
export function AccreditationDetail() {
  const { tr } = useLang();
  return (
    <div>
      <ul className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        {ACCREDITATIONS.map((a) => (
          <li key={a.id} data-rise>
            <div className="flex h-28 items-center">
              <Image src={a.logo} alt="" width={a.id === "amisa" ? 540 : 300} height={a.id === "amisa" ? 208 : 300} className={cn("w-auto object-contain", a.id === "amisa" ? "h-16" : "h-24")} />
            </div>
            <p className="mt-6 text-sm font-semibold text-amber-400">{tr(a.kind)}</p>
            <h3 className="font-display mt-1 text-2xl font-semibold text-white">{a.name}</h3>
            <p className="mt-3 text-base leading-relaxed text-white/80">{tr(a.text)}</p>
            <a href={a.href} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-white hover:text-amber-400">
              {a.href.replace(/^https?:\/\/(www\.)?/, "")}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <p data-rise className="mt-14 text-lg text-white/85">
        <span className="font-semibold text-white">{tr(MINISTRY.title)}.</span> {tr(MINISTRY.text)}
      </p>
    </div>
  );
}

/* ───────── University acceptances ───────── */

/** Senior acceptance posters. Tapping one opens it full size, with next/previous. */
export function AcceptancePosters({ dark, className }: { dark?: boolean; className?: string }) {
  const { tr, lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const list = ACCEPTANCES;
  const current = open === null ? null : list[open];
  const step = (d: number) => setOpen((i) => (i === null ? i : (i + d + list.length) % list.length));
  const label = lang === "es" ? "Admisiones universitarias" : "University acceptances";

  return (
    <>
      <ul className={cn("-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0", className)}>
        {list.map((a, i) => (
          <li key={a.name + i} data-rise className="w-[72%] shrink-0 snap-start sm:w-[42%] lg:w-auto">
            <button type="button" onClick={() => setOpen(i)} className="group block w-full text-left" aria-label={`${label}: ${a.name}`}>
              <div className="overflow-hidden rounded-[1.5rem] bg-white shadow-[0_20px_50px_rgba(10,10,30,0.18)]">
                <Photo photo={a.photo} className="aspect-[4/5]" sizes="(min-width:1024px) 22vw, 70vw" imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]" />
              </div>
              <p className={cn("mt-4 text-lg font-semibold", dark ? "text-white" : "text-navy-900")}>{a.name}</p>
              <p className={cn("mt-1 text-sm leading-relaxed", dark ? "text-white/70" : "text-navy-900/65")}>{a.universities.slice(0, 3).join(" · ")}</p>
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={current !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent aria-describedby={undefined} className="top-1/2 max-w-[min(92vw,30rem)] -translate-y-1/2 border-0 bg-transparent p-0 shadow-none" overlayClassName="bg-navy-950/90">
          {current && (
            <div>
              <DialogTitle className="sr-only">
                {label}: {current.name}
              </DialogTitle>
              <div className="relative overflow-hidden rounded-2xl">
                <Photo photo={current.photo} className="aspect-[4/5]" sizes="(min-width:640px) 30rem, 92vw" priority />
              </div>
              <p className="sr-only">{current.universities.join(", ")}</p>
              {list.length > 1 && (
                <div className="mt-4 flex items-center justify-between text-white">
                  <button type="button" onClick={() => step(-1)} className="grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-white/25" aria-label={tr({ en: "Previous", es: "Anterior" })}>
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <p className="font-semibold">{current.name}</p>
                  <button type="button" onClick={() => step(1)} className="grid h-12 w-12 place-items-center rounded-full bg-white/15 hover:bg-white/25" aria-label={tr({ en: "Next", es: "Siguiente" })}>
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
