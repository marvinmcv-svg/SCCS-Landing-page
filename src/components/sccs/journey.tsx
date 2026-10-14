"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { media, type Photo as PhotoT } from "@/data/media";
import { useStaticMotion } from "@/lib/use-static-motion";
import { cn, EASE } from "@/lib/utils";
import { useLang } from "./i18n";
import { Photo } from "./sccs-shared";

export const DIVISION_PHOTOS: Record<string, PhotoT> = {
  es: media.igMatter1,
  ms: media.msLaptops,
  hs: media.collegeFairPennant,
};

export function JourneyTabs({ initial = 0 }: { initial?: number }) {
  const { t } = useLang();
  const j = t.journey;
  const reduce = useStaticMotion();
  const [active, setActive] = useState(initial);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const tab = j.tabs[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % j.tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + j.tabs.length) % j.tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = j.tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={j.title} className="flex gap-1 overflow-x-auto border-b border-border sm:gap-6">
        {j.tabs.map((tb, i) => (
          <button
            key={tb.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${tb.id}`}
            aria-selected={active === i}
            aria-controls={`panel-${tb.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn("relative min-h-14 shrink-0 px-3 pb-3 pt-2 text-left transition-colors", active === i ? "text-navy-900" : "text-mist hover:text-navy-800")}
          >
            <span className="block text-sm font-semibold sm:text-base">{tb.label}</span>
            <span className="block text-xs text-crimson-600">{tb.grades}</span>
            {active === i && (
              <motion.span layoutId="journey-underline" className="absolute inset-x-0 -bottom-px h-0.5 bg-amber-500" transition={{ type: "spring", stiffness: 420, damping: 36 }} />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-14"
        >
          <Photo photo={DIVISION_PHOTOS[tab.id]} className="aspect-[4/3] rounded-2xl" sizes="(min-width:1024px) 50vw, 100vw" />
          <div>
            <p className="font-display text-3xl font-medium italic leading-snug text-navy-900 sm:text-4xl">{tab.tagline}</p>
            <p className="mt-5 leading-relaxed text-mist">{tab.body}</p>
            <p className="mt-8 text-sm font-semibold text-crimson-600">{j.highlightsLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tab.highlights.map((h) => (
                <li key={h} className="rounded-full border border-navy-800/15 bg-navy-100 px-3.5 py-1.5 text-sm text-navy-800">
                  {h}
                </li>
              ))}
            </ul>
            <Link href="/admissions#inquire" className="group mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-600 hover:text-navy-800">
              <span className="sccs-link-underline">
                {j.ctaLabel} {tab.label}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
