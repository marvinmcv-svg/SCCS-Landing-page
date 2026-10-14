"use client";

import { useMemo, useState } from "react";
import { CLASS_YEARS, COUNTRIES, MATRICULATION, type CountryCode } from "@/data/sccs-content";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLang } from "./i18n";
import { Container, CountUp, Reveal, Section, SectionHeading, TextLink } from "./sccs-shared";
import { WorldMap } from "./world-map";

const darkTrigger = "rounded-full border-white/15 bg-navy-800 text-cream data-[placeholder]:text-cream/70 sm:w-56";

export function MatriculationExplorer() {
  const { t, tr } = useLang();
  const m = t.matriculation;
  const [country, setCountry] = useState<"ALL" | CountryCode>("ALL");
  const [year, setYear] = useState("ALL");

  const entries = useMemo(
    () => MATRICULATION.filter((e) => (country === "ALL" || e.country === country) && (year === "ALL" || e.years.split(",").includes(year))),
    [country, year],
  );
  const total = entries.reduce((s, e) => s + e.count, 0);

  const groups = useMemo(() => {
    const byCountry = new Map<CountryCode, typeof entries>();
    for (const e of entries) byCountry.set(e.country, [...(byCountry.get(e.country) ?? []), e]);
    return [...byCountry.entries()]
      .map(([code, list]) => ({ code, list: [...list].sort((a, b) => b.count - a.count), total: list.reduce((s, e) => s + e.count, 0) }))
      .sort((a, b) => b.total - a.total);
  }, [entries]);

  const countryCodes = Object.keys(COUNTRIES) as CountryCode[];

  return (
    <div className="grid gap-5 lg:grid-cols-12">
      <Reveal className="rounded-2xl border border-white/10 bg-navy-900/70 p-4 sm:p-6 lg:col-span-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select value={country} onValueChange={(v) => setCountry(v as "ALL" | CountryCode)}>
            <SelectTrigger className={darkTrigger} aria-label={m.countryFilter}>
              <SelectValue placeholder={m.countryFilter} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{m.allCountries}</SelectItem>
              {countryCodes.map((c) => (
                <SelectItem key={c} value={c}>
                  {COUNTRIES[c].flag} {tr(COUNTRIES[c].name)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className={`${darkTrigger} sm:w-44`} aria-label={m.yearFilter}>
              <SelectValue placeholder={m.yearFilter} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">{m.allYears}</SelectItem>
              {CLASS_YEARS.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="flex items-baseline gap-2 sm:ml-auto" aria-live="polite">
            <CountUp value={total} duration={1.2} className="font-display text-2xl font-semibold text-amber-400" />
            <span className="text-xs uppercase tracking-[0.16em] text-cream/60">{m.totalLabel}</span>
          </p>
        </div>
        <div className="mt-5">
          <WorldMap entries={entries} />
        </div>
        <p className="mt-4 text-xs text-cream/50">{m.caption}</p>
      </Reveal>

      <Reveal delay={0.1} className="rounded-2xl border border-white/10 bg-navy-900/70 p-5 sm:p-6 lg:col-span-4">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">{m.listTitle}</h3>
        <div className="ios-scroll mt-4 max-h-[430px] pr-2">
          {groups.length === 0 ? (
            <p className="py-8 text-center text-sm text-cream/60">{t.palette.noResults}</p>
          ) : (
            groups.map((g) => (
              <div key={g.code} className="mb-5">
                <p className="flex items-center justify-between border-b border-white/10 pb-2 text-sm font-semibold text-white">
                  <span>
                    {COUNTRIES[g.code].flag} {tr(COUNTRIES[g.code].name)}
                  </span>
                  <span className="font-display text-amber-400">{g.total}</span>
                </p>
                <ul>
                  {g.list.map((e) => (
                    <li key={e.university} className="flex items-start justify-between gap-3 py-2 text-sm">
                      <span>
                        <span className="block text-cream/90">{e.university}</span>
                        <span className="block text-xs text-cream/45">{e.years.split(",").join(" · ")}</span>
                      </span>
                      <span className="shrink-0 text-cream/60">{e.count}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </Reveal>
    </div>
  );
}

export function Matriculation({ withMore = true }: { withMore?: boolean }) {
  const { t } = useLang();
  const m = t.matriculation;
  return (
    <Section id="matriculation" dark>
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading kicker={m.kicker} title={m.title} intro={m.intro} dark />
          {withMore && (
            <TextLink href="/learning/university-matriculation" dark>
              {m.more}
            </TextLink>
          )}
        </div>
        <div className="mt-12">
          <MatriculationExplorer />
        </div>
      </Container>
    </Section>
  );
}
