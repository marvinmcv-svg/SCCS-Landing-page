"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ACCEPTANCES, PRESTIGE } from "@/data/acceptances";
import { ACCREDITATIONS, MINISTRY } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useLang } from "./i18n";
import { Photo } from "./sccs-shared";
import { Marquee } from "../home/motion";

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
  const rail = useRef<HTMLUListElement>(null);
  const scrollBy = (d: number) => rail.current?.scrollBy({ left: d * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scrollBy(-1)} className={cn("pressable grid h-12 w-12 place-items-center rounded-full", dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-white text-navy-900 hover:bg-navy-100")} aria-label={tr({ en: "Previous", es: "Anterior" })}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button type="button" onClick={() => scrollBy(1)} className={cn("pressable grid h-12 w-12 place-items-center rounded-full", dark ? "bg-white/10 text-white hover:bg-white/20" : "bg-navy-800 text-white hover:bg-navy-700")} aria-label={tr({ en: "Next", es: "Siguiente" })}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <ul ref={rail} className={cn("ios-scroll -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto scroll-smooth px-5 pb-6 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:gap-6", className)}>
        {list.map((a, i) => (
          <li key={a.name + i} data-rise className="w-[72%] shrink-0 snap-start sm:w-[40%] lg:w-[calc((100%-4.5rem)/4)]">
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

/* ───────── The most selective universities that have admitted SCCS graduates ───────── */

function Seal({ name, logo, size = "md" }: { name: string; logo: string; size?: "sm" | "md" }) {
  return (
    <figure className="group flex flex-col items-center text-center">
      <span className={cn("grid place-items-center rounded-full bg-white shadow-[0_10px_30px_rgba(20,20,58,0.08)] ring-1 ring-navy-900/5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5", size === "sm" ? "h-24 w-24 p-4 sm:h-28 sm:w-28" : "h-28 w-28 p-5 sm:h-32 sm:w-32")}>
        <span className="relative block h-full w-full">
          <Image src={logo} alt="" fill sizes="128px" className="object-contain" />
        </span>
      </span>
      <figcaption className="mt-3 max-w-[9rem] text-sm font-medium leading-snug text-navy-900/80">{name}</figcaption>
    </figure>
  );
}

/** All seals in a calm grid (matriculation and profile pages). */
export function PrestigeWall({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4 lg:grid-cols-7", className)}>
      {PRESTIGE.map((u) => (
        <li key={u.name} data-rise>
          <Seal name={u.name} logo={u.logo} />
        </li>
      ))}
    </ul>
  );
}

/** Two rows of seals drifting in opposite directions (home page). */
export function PrestigeMarquee() {
  const half = Math.ceil(PRESTIGE.length / 2);
  const rows = [PRESTIGE.slice(0, half), PRESTIGE.slice(half)];
  return (
    <div className="space-y-10">
      {rows.map((row, r) => (
        <Marquee key={r} seconds={70} reverse={r === 1}>
          {row.map((u) => (
            <div key={u.name} className="w-40 shrink-0 px-4 sm:w-44">
              <Seal name={u.name} logo={u.logo} size="sm" />
            </div>
          ))}
        </Marquee>
      ))}
    </div>
  );
}
