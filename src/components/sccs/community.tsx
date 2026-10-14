"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, ExternalLink, HeartHandshake, UtensilsCrossed } from "lucide-react";
import { useMemo, useState } from "react";
import { media } from "@/data/media";
import { PORTALS } from "@/data/pages";
import { TEAM, type TeamCategory } from "@/data/sccs-content";
import { cn, EASE } from "@/lib/utils";
import { useLang } from "./i18n";
import { Container, JaguarMotif, Photo, Reveal, Section, SectionHeading, TextLink, buttonStyles } from "./sccs-shared";

type Cat = "ALL" | TeamCategory;
type Div = "ALL" | "ES" | "MS" | "HS";

function initials(name: string) {
  return name
    .replace(/^Dr\.\s*/, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function FilterRow<T extends string>({ label, options, value, onChange }: { label: string; options: [T, string][]; value: T; onChange: (v: T) => void }) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map(([k, l]) => (
        <button
          key={k}
          type="button"
          aria-pressed={value === k}
          onClick={() => onChange(k)}
          className={cn(
            "pressable min-h-10 rounded-full border px-4 text-sm transition-colors",
            value === k ? "border-navy-800 bg-navy-800 text-ivory" : "border-border bg-white text-navy-900 hover:border-amber-500",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function TeamDirectory() {
  const { t, tr } = useLang();
  const c = t.community;
  const [cat, setCat] = useState<Cat>("ALL");
  const [div, setDiv] = useState<Div>("ALL");
  const [openBio, setOpenBio] = useState<string | null>(null);

  const members = useMemo(() => TEAM.filter((m) => (cat === "ALL" || m.category === cat) && (div === "ALL" || m.division === div || m.division === "ALL")), [cat, div]);

  return (
    <div id="team" className="scroll-mt-28">
      <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{c.teamTitle}</h3>
      <p className="mt-2 text-mist">{c.teamIntro}</p>
      <div className="mt-6 space-y-3">
        <FilterRow<Cat> label={c.teamTitle} value={cat} onChange={setCat} options={(Object.keys(c.categories) as Cat[]).map((k) => [k, c.categories[k]])} />
        <FilterRow<Div> label={c.divisions.ALL} value={div} onChange={setDiv} options={(Object.keys(c.divisions) as Div[]).map((k) => [k, c.divisions[k]])} />
      </div>
      <ul className="ios-scroll mt-8 grid max-h-[46rem] gap-4 pr-1 sm:grid-cols-2 lg:grid-cols-3">
        {members.length === 0 && <li className="py-10 text-mist sm:col-span-2 lg:col-span-3">{c.noTeam}</li>}
        {members.map((m, i) => {
          const isOpen = openBio === m.name;
          return (
            <li key={m.name} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center gap-4">
                <span
                  className={cn(
                    "font-display flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-semibold",
                    i % 2 === 0 ? "bg-navy-800 text-amber-400" : "bg-amber-500 text-navy-950",
                  )}
                  aria-hidden="true"
                >
                  {initials(m.name)}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-navy-900">{m.name}</p>
                  <p className="text-sm text-mist">{tr(m.role)}</p>
                  <span className="mt-1 inline-block rounded-full bg-cream px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider text-navy-800">{c.categories[m.category]}</span>
                </div>
              </div>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenBio(isOpen ? null : m.name)}
                className="mt-3 min-h-10 text-sm font-semibold text-navy-600 hover:text-navy-800"
              >
                {isOpen ? c.hideBio : c.readBio}
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden text-sm leading-relaxed text-mist"
                  >
                    {tr(m.bio)}
                  </motion.p>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function ParentHubCard() {
  const { t } = useLang();
  const c = t.community;
  return (
    <div id="parent-hub" className="scroll-mt-28 rounded-2xl border border-border bg-card p-7">
      <BookOpen className="h-6 w-6 text-crimson-600" aria-hidden="true" />
      <h3 className="font-display mt-4 text-2xl font-semibold text-navy-900">{c.parentHubTitle}</h3>
      <p className="mt-2 text-mist">{c.parentHubIntro}</p>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">{c.portalsTitle}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {PORTALS.map((p) => (
          <li key={p.name}>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="pressable inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-3.5 text-sm text-navy-900 hover:border-amber-500">
              {p.name}
              <ExternalLink className="h-3 w-3 text-mist" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-mist">{c.portalsNote}</p>
    </div>
  );
}

export function MothersClubCard() {
  const { t } = useLang();
  const c = t.community;
  return (
    <div id="mothers-club" className="scroll-mt-28 overflow-hidden rounded-2xl border border-border bg-card">
      <Photo photo={media.mothersClubTeam} className="aspect-[16/9]" sizes="(min-width:1024px) 33vw, 100vw" />
      <div className="p-7">
        <HeartHandshake className="h-6 w-6 text-crimson-600" aria-hidden="true" />
        <h3 className="font-display mt-4 text-2xl font-semibold text-navy-900">{c.mothersTitle}</h3>
        <p className="mt-2 leading-relaxed text-mist">{c.mothersBody}</p>
      </div>
    </div>
  );
}

export function PaletteCard() {
  const { t } = useLang();
  const c = t.community;
  return (
    <div id="dining" className="scroll-mt-28 rounded-2xl bg-navy-100 p-7">
      <UtensilsCrossed className="h-6 w-6 text-navy-800" aria-hidden="true" />
      <h3 className="font-display mt-4 text-2xl font-semibold text-navy-900">{c.paletteTitle}</h3>
      <p className="mt-2 leading-relaxed text-mist">{c.paletteBody}</p>
      <ul className="mt-5 divide-y divide-navy-800/10 rounded-xl bg-white/70">
        {c.palettePrices.map((p) => {
          const [label, price] = p.split(" · ");
          return (
            <li key={p} className="flex items-center justify-between px-4 py-3 text-sm">
              <span className="text-navy-900">{label}</span>
              <span className="font-display font-semibold text-crimson-600">{price}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-mist">{c.paletteNote}</p>
    </div>
  );
}

export function AlumniCard() {
  const { t } = useLang();
  const c = t.community;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-navy-950 p-7 text-cream">
      <JaguarMotif className="absolute -bottom-6 -right-6 h-40 w-40 text-amber-400/15" />
      <h3 className="font-display text-2xl font-semibold text-white">{c.alumniTitle}</h3>
      <p className="relative mt-2 leading-relaxed text-cream/75">{c.alumniBody}</p>
      <Link href="/contact" className={cn(buttonStyles.outlineGold, "relative mt-6 text-amber-400")}>
        {c.alumniCta}
      </Link>
    </div>
  );
}

export function Community() {
  const { t } = useLang();
  const c = t.community;
  return (
    <Section id="community">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading title={c.title} intro={c.intro} />
          <TextLink href="/community">{c.more}</TextLink>
        </div>
        <div className="mt-12">
          <TeamDirectory />
        </div>
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <MothersClubCard />
          </Reveal>
          <Reveal delay={0.06} className="flex flex-col gap-5">
            <ParentHubCard />
            <AlumniCard />
          </Reveal>
          <Reveal delay={0.12}>
            <PaletteCard />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
