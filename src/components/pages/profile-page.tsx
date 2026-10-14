"use client";

import { useMemo, useState } from "react";
import { Download, Mail, Search } from "lucide-react";
import { media } from "@/data/media";
import { ACCEPTANCE_LIST } from "@/data/acceptances";
import { PROFILE_PDF, SCHOOL_PROFILE as P } from "@/data/profile";
import { cn } from "@/lib/utils";
import { useLang } from "@/components/sccs/i18n";
import { PageHero } from "@/components/sccs/page-kit";
import { buttonStyles } from "@/components/sccs/sccs-shared";
import { AcceptancePosters, AccreditationDetail } from "@/components/sccs/credentials";
import { Aurora, Words } from "@/components/home/motion";

const wrap = "mx-auto w-full max-w-7xl px-5 sm:px-8";
const h2 = "font-display text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-6xl";

/* ───────── AP trend: two small charts on one baseline, never two axes ───────── */

function TrendBars({ title, values, format }: { title: string; values: { year: string; v: number }[]; format: (n: number) => string }) {
  const max = Math.max(...values.map((d) => d.v));
  return (
    <figure>
      <figcaption className="text-base font-semibold text-navy-900">{title}</figcaption>
      <div className="mt-6 flex h-48 items-end gap-3 border-b border-navy-900/15 sm:gap-5" role="img" aria-label={`${title}: ${values.map((d) => `${d.year} ${format(d.v)}`).join(", ")}`}>
        {values.map((d, i) => {
          const last = i === values.length - 1;
          return (
            <div key={d.year} className="group relative flex h-full flex-1 flex-col items-center justify-end">
              <span className={cn("mb-2 text-sm font-semibold tabular-nums transition-opacity", last ? "text-navy-900 opacity-100" : "text-navy-900/70 opacity-0 group-hover:opacity-100")}>{format(d.v)}</span>
              <div
                data-bar-grow
                className={cn("w-full max-w-14 rounded-t-[4px] transition-colors", last ? "bg-navy-800" : "bg-navy-500/60 group-hover:bg-navy-600")}
                style={{ height: `${(d.v / max) * 82}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-3 sm:gap-5">
        {values.map((d) => (
          <span key={d.year} className="flex-1 text-center text-sm text-navy-900/65 tabular-nums">
            {d.year}
          </span>
        ))}
      </div>
    </figure>
  );
}

/* ───────── Acceptance list with region filter and search ───────── */

type Region = "all" | "northAmerica" | "europe" | "southAmerica";
const PREVIEW = 24;

function AcceptanceList() {
  const { tr } = useLang();
  const [region, setRegion] = useState<Region>("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);
  const total = ACCEPTANCE_LIST.northAmerica.length + ACCEPTANCE_LIST.europe.length + ACCEPTANCE_LIST.southAmerica.length;

  const shown = useMemo(() => {
    const pool = region === "all" ? [...ACCEPTANCE_LIST.northAmerica, ...ACCEPTANCE_LIST.europe, ...ACCEPTANCE_LIST.southAmerica].sort((a, b) => a.localeCompare(b)) : ACCEPTANCE_LIST[region];
    const q = query.trim().toLowerCase();
    return q ? pool.filter((u) => u.toLowerCase().includes(q)) : pool;
  }, [region, query]);

  const regions: Region[] = ["all", "northAmerica", "europe", "southAmerica"];
  const count = (r: Region) => (r === "all" ? total : ACCEPTANCE_LIST[r].length);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={tr(P.acceptancesTitle)}>
          {regions.map((r) => (
            <button
              key={r}
              type="button"
              role="tab"
              aria-selected={region === r}
              onClick={() => setRegion(r)}
              className={cn("min-h-11 rounded-full px-5 text-sm font-semibold transition-colors", region === r ? "bg-navy-800 text-white" : "bg-white text-navy-900 hover:bg-navy-100")}
            >
              {tr(P.regions[r])} <span className="ml-1 opacity-60">{count(r)}</span>
            </button>
          ))}
        </div>
        <label className="relative w-full lg:max-w-xs">
          <span className="sr-only">{tr(P.searchLabel)}</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-900/50" aria-hidden="true" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={tr(P.searchLabel)}
            className="h-12 w-full rounded-full bg-white pl-11 pr-4 text-base text-navy-900 outline-none ring-1 ring-inset ring-navy-900/10 focus:ring-2 focus:ring-amber-500"
          />
        </label>
      </div>
      <ul className="mt-10 columns-1 gap-10 sm:columns-2 lg:columns-3" aria-live="polite">
        {(expanded || query ? shown : shown.slice(0, PREVIEW)).map((u) => (
          <li key={u} className="break-inside-avoid py-2 text-base text-navy-900/85">
            {u}
          </li>
        ))}
      </ul>
      {!expanded && !query && shown.length > PREVIEW && (
        <button type="button" onClick={() => setExpanded(true)} className={cn(buttonStyles.outline, "mt-8 h-12 px-6")}>
          {tr({ en: `Show all ${shown.length}`, es: `Ver las ${shown.length}` })}
        </button>
      )}
      {shown.length === 0 && <p className="mt-8 text-navy-900/70">{tr({ en: "No universities match that search.", es: "Ninguna universidad coincide con esa búsqueda." })}</p>}
    </div>
  );
}

/* ───────── Page ───────── */

export function SchoolProfilePage() {
  const { tr, lang } = useLang();
  const crumbs = [
    { href: "/discover", label: lang === "es" ? "Descubre SCCS" : "Discover SCCS" },
    { href: "/discover/school-profile", label: tr(P.title) },
  ];

  return (
    <>
      <PageHero photo={media.graduationPac} kicker={tr(P.kicker)} title={tr(P.title)} lede={tr(P.lede)} crumbs={crumbs}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <a href={PROFILE_PDF} target="_blank" rel="noopener noreferrer" className={cn(buttonStyles.gold, "h-14 px-8 text-base")}>
            <Download className="h-5 w-5" aria-hidden="true" />
            {tr(P.download)}
          </a>
          <p className="text-base font-semibold text-white/90">CEEB {P.ceeb}</p>
        </div>
      </PageHero>

      {/* At a glance */}
      <section className="bg-ivory py-24 sm:py-32">
        <ul className={cn(wrap, "grid grid-cols-2 gap-x-8 gap-y-14 lg:grid-cols-4")}>
          {P.glance.map((g) => (
            <li key={g.value} data-rise>
              <p className="font-display text-6xl font-semibold leading-none tracking-[-0.04em] text-navy-900 tabular-nums sm:text-7xl">{g.value}</p>
              <p className="mt-4 text-lg text-navy-900/75">{tr(g.label)}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Our school + contacts */}
      <section className="bg-cream py-24 sm:py-32">
        <div className={cn(wrap, "grid gap-16 lg:grid-cols-12")}>
          <div className="lg:col-span-7">
            <h2 className={cn(h2, "text-navy-900")}>
              <Words text={tr(P.aboutTitle)} />
            </h2>
            <p data-rise className="mt-8 text-xl leading-relaxed text-navy-900/85">
              {tr(P.about)}
            </p>
            <p data-rise className="mt-6 text-lg leading-relaxed text-navy-900/75">
              {tr(P.calendar)}
            </p>
          </div>
          <div className="lg:col-span-5">
            <h3 data-rise className="font-display text-3xl font-semibold text-navy-900">
              {tr(P.contactsTitle)}
            </h3>
            <ul className="mt-6 space-y-3">
              {P.contacts.map((c) => (
                <li key={c.email} data-rise>
                  <a href={`mailto:${c.email}`} className="group flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-4 transition-colors hover:bg-navy-100">
                    <span>
                      <span className="block text-lg font-semibold text-navy-900">{c.name}</span>
                      <span className="block text-sm text-navy-900/65">{tr(c.role)}</span>
                    </span>
                    <Mail className="h-5 w-5 shrink-0 text-navy-800 transition-transform group-hover:translate-x-0.5" aria-label={c.email} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Accreditation */}
      <section className="relative isolate overflow-hidden py-24 sm:py-32">
        <Aurora />
        <div className={wrap}>
          <h2 className={cn(h2, "max-w-3xl text-white")}>
            <Words text={lang === "es" ? "Acreditado y conectado" : "Accredited and connected"} />
          </h2>
          <div className="mt-16">
            <AccreditationDetail />
          </div>
        </div>
      </section>

      {/* Advanced Placement */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className={wrap}>
          <h2 className={cn(h2, "text-navy-900")}>
            <Words text={tr(P.apTitle)} />
          </h2>
          <p data-rise className="mt-6 max-w-2xl text-xl leading-relaxed text-navy-900/80">
            {tr(P.apLede)}
          </p>
          <ul className="mt-16 grid gap-12 sm:grid-cols-3">
            {P.apHighlights.map((h) => (
              <li key={h.value} data-rise>
                <p className="font-display text-6xl font-semibold leading-none tracking-[-0.04em] text-crimson-600 tabular-nums">{h.value}</p>
                <p className="mt-4 text-lg text-navy-900/75">{tr(h.label)}</p>
              </li>
            ))}
          </ul>

          <div data-rise className="mt-24">
            <h3 className="font-display text-3xl font-semibold text-navy-900">{tr(P.apTrendTitle)}</h3>
            <div className="mt-10 grid gap-16 lg:grid-cols-2">
              <TrendBars title={lang === "es" ? "Estudiantes que rindieron AP" : "Students taking AP exams"} values={P.apTrend.map((d) => ({ year: d.year, v: d.students }))} format={(n) => String(n)} />
              <TrendBars title={lang === "es" ? "Puntaje promedio AP (escala de 1 a 5)" : "Mean AP score (out of 5)"} values={P.apTrend.map((d) => ({ year: d.year, v: d.mean }))} format={(n) => n.toFixed(2)} />
            </div>
            <table className="sr-only">
              <caption>{tr(P.apTrendTitle)}</caption>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>AP students</th>
                  <th>Exams</th>
                  <th>Students scoring 3+</th>
                  <th>Mean score</th>
                </tr>
              </thead>
              <tbody>
                {P.apTrend.map((d) => (
                  <tr key={d.year}>
                    <td>{d.year}</td>
                    <td>{d.students}</td>
                    <td>{d.exams}</td>
                    <td>{d.threePlus}</td>
                    <td>{d.mean}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-24 grid gap-16 lg:grid-cols-2">
            <div data-rise>
              <h3 className="font-display text-3xl font-semibold text-navy-900">{lang === "es" ? "Reconocimientos AP 2025" : "AP awards, 2025"}</h3>
              <ul className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10">
                {P.apAwards.map((a) => (
                  <li key={a.label.en}>
                    <p className="font-display text-5xl font-semibold leading-none text-navy-900">{a.value}</p>
                    <p className="mt-3 text-base text-navy-900/75">{tr(a.label)}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div data-rise>
              <h3 className="font-display text-3xl font-semibold text-navy-900">{tr(P.apCoursesTitle)}</h3>
              <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {P.apCourses.map((c) => (
                  <li key={c} className="text-base text-navy-900/85">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SAT */}
      <section className="bg-cream py-24 sm:py-28">
        <div className={wrap}>
          <h2 className={cn(h2, "text-navy-900")}>
            <Words text={tr(P.satTitle)} />
          </h2>
          <ul className="mt-14 grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
            {P.sat.map((s) => (
              <li key={s.label.en} data-rise>
                <p className="font-display text-6xl font-semibold leading-none tracking-[-0.04em] text-navy-900 tabular-nums">{s.value}</p>
                <p className="mt-4 text-lg text-navy-900/75">{tr(s.label)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Graduation requirements */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className={wrap}>
          <h2 className={cn(h2, "text-navy-900")}>
            <Words text={tr(P.diplomasTitle)} />
          </h2>
          <p data-rise className="mt-6 max-w-2xl text-xl text-navy-900/80">
            {tr(P.diplomasLede)}
          </p>
          <div className="mt-14 grid gap-8 lg:grid-cols-2">
            {[P.usDiploma, P.boDiploma].map((d) => (
              <div key={d.title.en} data-rise className="rounded-[1.75rem] bg-white p-7 sm:p-9">
                <table className="w-full text-left">
                  <caption className="font-display pb-6 text-left text-2xl font-semibold text-navy-900">{tr(d.title)}</caption>
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">{lang === "es" ? "Materia" : "Subject"}</th>
                      <th scope="col">{tr(P.creditsLabel)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {d.rows.map((r) => (
                      <tr key={r.subject.en} className="border-b border-navy-900/8">
                        <td className="py-3 text-base text-navy-900/85">{tr(r.subject)}</td>
                        <td className="py-3 text-right text-base font-semibold tabular-nums text-navy-900">{r.credits}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="pt-5 text-lg font-semibold text-navy-900">
                        {tr(P.totalLabel)} {tr(P.creditsLabel).toLowerCase()}
                      </td>
                      <td className="font-display pt-5 text-right text-3xl font-semibold tabular-nums text-crimson-600">{d.total}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grade scale */}
      <section className="bg-cream py-24 sm:py-28">
        <div className={wrap}>
          <h2 className={cn(h2, "text-navy-900")}>
            <Words text={tr(P.gradesTitle)} />
          </h2>
          <ul className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-13">
            {P.grades.map((g) => (
              <li key={g.letter} data-rise className="rounded-2xl bg-white px-3 py-5 text-center">
                <p className="font-display text-3xl font-semibold text-navy-900">{g.letter}</p>
                <p className="mt-1 text-sm tabular-nums text-navy-900/65">{g.range}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Campus and values */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className={cn(wrap, "grid gap-16 lg:grid-cols-2")}>
          <div>
            <h2 className={cn(h2, "text-navy-900")}>
              <Words text={tr(P.campusTitle)} />
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
              {P.facilities.map((f) => (
                <li key={f.en} data-rise className="text-lg text-navy-900/85">
                  {tr(f)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={cn(h2, "text-navy-900")}>
              <Words text={tr(P.valuesTitle)} />
            </h2>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {P.values.map((v) => (
                <li key={v.en} data-rise className="font-display text-3xl font-semibold text-crimson-600">
                  {tr(v)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Acceptances */}
      <section id="acceptances" className="scroll-mt-24 bg-cream py-24 sm:py-32">
        <div className={wrap}>
          <h2 className={cn(h2, "max-w-4xl text-navy-900")}>
            <Words text={tr(P.acceptancesTitle)} />
          </h2>
          <p data-rise className="mt-6 text-xl text-navy-900/80">
            {tr(P.acceptancesLede)}
          </p>
          <div className="mt-14">
            <AcceptancePosters />
          </div>
          <div className="mt-20">
            <AcceptanceList />
          </div>
        </div>
      </section>
    </>
  );
}
