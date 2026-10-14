"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { format, parseISO } from "date-fns";
import { media } from "@/data/media";
import { EXPERIENCES } from "@/data/experiences";
import { TRADITIONS } from "@/data/traditions";
import { INSTAGRAM_POSTS, sortedNews, upcomingEvents } from "@/data/sccs-content";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useLang } from "../sccs/i18n";
import { Crest, Photo, buttonStyles } from "../sccs/sccs-shared";
import { JourneyTabs } from "../sccs/journey";
import { MatriculationExplorer } from "../sccs/matriculation";
import { CATEGORY_LABEL } from "../sccs/campus-life";
import { InstagramGlyph } from "../sccs/footer";
import { Aurora, Marquee, Words, gsap, useGSAP } from "./motion";

/* ───────── Shared pieces ───────── */

const wrap = "mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12";
const h2 = "font-display text-balance text-[2.6rem] font-semibold leading-[1] tracking-[-0.03em] sm:text-6xl lg:text-7xl";

function More({ href, children, dark }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-base font-semibold transition-colors",
        dark ? "text-amber-400 hover:text-white" : "text-navy-800 hover:text-crimson-600",
      )}
    >
      {children}
      <span className={cn("grid h-8 w-8 place-items-center rounded-full transition-transform duration-300 group-hover:translate-x-1", dark ? "bg-white/10" : "bg-navy-800 text-white")}>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

/* ───────── Proof: four real numbers on the gradient field ───────── */

export function Stats() {
  const { t } = useLang();
  return (
    <section id="stats" className="relative isolate overflow-hidden py-20 text-white sm:py-28">
      <Aurora />
      <ul className={cn(wrap, "grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4")}>
        {t.stats.map((s) => (
          <li key={s.label} data-rise>
            <p className="font-display text-7xl font-semibold leading-none tracking-[-0.04em] tabular-nums sm:text-8xl lg:text-[7.5rem]">
              <span data-count={s.value}>{s.value}</span>
              <span className="text-amber-400">{s.suffix}</span>
            </p>
            <p className="mt-4 text-base font-semibold sm:text-lg">{s.label}</p>
            <p className="text-sm text-white/65">{s.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ───────── The SCCS Advantage ───────── */

export function Advantage() {
  const { t } = useLang();
  const h = t.home;
  return (
    <section id="discover" className="scroll-mt-24 bg-ivory py-28 sm:py-36">
      <div className={cn(wrap, "grid items-center gap-14 lg:grid-cols-12")}>
        <div className="lg:col-span-6">
          <h2 className={cn(h2, "text-navy-900")}>
            <Words text={h.advantageTitle} />
          </h2>
          <p data-rise className="mt-8 max-w-xl text-xl leading-relaxed text-navy-900/85 sm:text-2xl">
            {h.advantageBody}
          </p>
          <div data-rise className="mt-8">
            <More href="/discover">{h.advantageCta}</More>
          </div>
        </div>
        <div className="relative lg:col-span-6">
          <div data-clip className="overflow-hidden rounded-[2rem]">
            <Photo photo={media.campusLawn} className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" sizes="(min-width:1024px) 45vw, 100vw" />
          </div>
          <div data-parallax="18" className="absolute -bottom-10 -left-4 w-[42%] overflow-hidden rounded-[1.5rem] ring-8 ring-ivory sm:-left-10">
            <Photo photo={media.historyHalloween} className="aspect-square" sizes="(min-width:1024px) 20vw, 40vw" imgClassName="object-[20%_50%]" />
          </div>
        </div>
      </div>

      <div className={cn(wrap, "mt-28 sm:mt-36")}>
        <p data-rise className="text-lg font-semibold text-crimson-600">
          {h.learnerTitle}
        </p>
        <ul className="mt-8 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {t.discover.learner.map((l) => (
            <li key={l.title} data-rise>
              <p className="font-display text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl">{l.title}</p>
              <p className="mt-3 text-base leading-relaxed text-navy-900/75">{l.line}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── Safety & Wellness: one photograph, one promise ───────── */

export function Safety() {
  const { t } = useLang();
  const h = t.home;
  return (
    <section className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-navy-950 text-white">
      <div data-parallax="8" className="absolute -inset-y-[10%] inset-x-0 -z-20">
        <Photo photo={media.esLunchTrio} className="absolute inset-0" sizes="100vw" imgClassName="object-[50%_65%]" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(20,20,58,0.92),rgba(20,20,58,0.35)_50%,transparent_75%)]" aria-hidden="true" />
      <div className={cn(wrap, "py-16 sm:py-24")}>
        <h2 className={cn(h2, "max-w-4xl")}>
          <Words text={h.safetyTitle} />
        </h2>
        <p data-rise className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
          {h.safetyBody}
        </p>
        <div data-rise className="mt-8">
          <More href="/discover/safety-wellness" dark>
            {h.safetyCta}
          </More>
        </div>
      </div>
    </section>
  );
}

/* ───────── Dual Diploma: two credentials converge into one program ───────── */

function Flag({ kind }: { kind: "us" | "bo" }) {
  return kind === "us" ? (
    <svg viewBox="0 0 60 40" className="h-8 w-12 shrink-0 overflow-hidden rounded-md" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} y={i * 5.72} width="60" height="2.86" fill="#C8323A" />
      ))}
      <rect width="26" height="20" fill="#3A3D8C" />
    </svg>
  ) : (
    <svg viewBox="0 0 60 40" className="h-8 w-12 shrink-0 overflow-hidden rounded-md" aria-hidden="true">
      <rect width="60" height="13.4" fill="#D52B1E" />
      <rect y="13.3" width="60" height="13.4" fill="#F4E400" />
      <rect y="26.6" width="60" height="13.4" fill="#007934" />
    </svg>
  );
}

function Credential({ kind, title, points }: { kind: "us" | "bo"; title: string; points: string[] }) {
  return (
    <div data-credential={kind} className="rounded-[2rem] bg-white/[0.07] p-7 ring-1 ring-inset ring-white/15 backdrop-blur-xl sm:p-9">
      <Flag kind={kind} />
      <h3 className="font-display mt-6 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h3>
      <ul className="mt-6 space-y-3">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-base leading-snug text-white/85">
            <Check className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden="true" />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DualDiplomaHome() {
  const { t } = useLang();
  const d = t.dualDiploma;
  const ref = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
        const st = { trigger: "[data-credentials]", start: "top 85%", end: "top 35%", scrub: 0.6 };
        gsap.fromTo('[data-credential="us"]', { xPercent: -8, rotate: -2 }, { xPercent: 0, rotate: 0, ease: "none", scrollTrigger: st });
        gsap.fromTo('[data-credential="bo"]', { xPercent: 8, rotate: 2 }, { xPercent: 0, rotate: 0, ease: "none", scrollTrigger: st });
        gsap.from("[data-plus]", { scale: 0, rotate: -90, ease: "back.out(2)", duration: 0.9, scrollTrigger: { trigger: "[data-credentials]", start: "top 45%", once: true } });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <section ref={ref} id="learning" className="relative isolate scroll-mt-24 overflow-hidden py-28 text-white sm:py-36">
      <Aurora />
      <div className={wrap}>
        <div className="max-w-4xl">
          <h2 className={h2}>
            <Words text={d.title} />
          </h2>
          <p data-rise className="mt-8 max-w-2xl text-xl leading-relaxed text-white/85 sm:text-2xl">
            {t.home.dualBody}
          </p>
        </div>
        <div data-credentials className="relative mt-16 grid gap-5 lg:grid-cols-2 lg:gap-8">
          <Credential kind="us" title={d.usTitle} points={d.usPoints} />
          <span data-plus className="absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber-500 text-3xl font-semibold text-navy-950 shadow-[0_0_0_10px_rgba(20,20,58,0.6)] lg:grid" aria-hidden="true">
            +
          </span>
          <Credential kind="bo" title={d.boTitle} points={d.boPoints} />
        </div>
        <div data-rise className="mt-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <p className="text-lg text-white/85">
            <span className="font-display mr-3 text-4xl font-semibold text-amber-400">99%</span>
            {d.globalBody.replace(/^99%\s*/, "")}
          </p>
          <More href="/learning/dual-diploma" dark>
            {d.more}
          </More>
        </div>
      </div>
    </section>
  );
}

/* ───────── One journey, three chapters ───────── */

export function JourneyHome() {
  const { t } = useLang();
  const j = t.journey;
  return (
    <section id="journey" className="scroll-mt-24 bg-ivory py-28 sm:py-36">
      <div className={wrap}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <h2 className={cn(h2, "text-navy-900")}>
              <Words text={j.title} />
            </h2>
            <p data-rise className="mt-6 text-xl text-navy-900/80">
              {t.home.journeyIntro}
            </p>
          </div>
          <div data-rise>
            <More href="/learning/academic-journey">{j.more}</More>
          </div>
        </div>
        <div data-rise className="mt-14">
          <JourneyTabs />
        </div>
      </div>
    </section>
  );
}

/* ───────── The Jaguar Experience ───────── */

const BENTO: { slug: string; cls: string; sizes: string }[] = [
  { slug: "friendship-games", cls: "sm:col-span-2 lg:col-span-7 lg:row-span-2", sizes: "(min-width:1024px) 58vw, 100vw" },
  { slug: "innovation-hub", cls: "lg:col-span-5", sizes: "(min-width:1024px) 42vw, 50vw" },
  { slug: "performing-arts-center", cls: "lg:col-span-5", sizes: "(min-width:1024px) 42vw, 50vw" },
  { slug: "athletics", cls: "lg:col-span-4", sizes: "(min-width:1024px) 33vw, 50vw" },
  { slug: "science-labs", cls: "lg:col-span-4", sizes: "(min-width:1024px) 33vw, 50vw" },
  { slug: "library", cls: "sm:col-span-2 lg:col-span-4", sizes: "(min-width:1024px) 33vw, 100vw" },
];

export function ExperienceHome() {
  const { t, tr } = useLang();
  const c = t.campusLife;
  return (
    <section id="campus-life" className="scroll-mt-24 bg-cream py-28 sm:py-36">
      <div className={wrap}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <h2 className={cn(h2, "text-navy-900")}>
              <Words text={c.title} />
            </h2>
            <p data-rise className="mt-6 text-xl text-navy-900/80">
              {t.home.experienceIntro}
            </p>
          </div>
          <div data-rise>
            <More href="/campus-life/jaguar-experience">{c.exploreAll}</More>
          </div>
        </div>
        <div className="mt-14 grid auto-rows-[17rem] gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-[19rem] lg:gap-5">
          {BENTO.map((b, i) => {
            const exp = EXPERIENCES.find((e) => e.slug === b.slug);
            if (!exp) return null;
            return (
              <Link
                key={b.slug}
                href={`/campus-life/jaguar-experience/${exp.slug}`}
                data-rise
                className={cn("group relative isolate overflow-hidden rounded-[1.75rem] bg-navy-900", b.cls)}
              >
                <Photo
                  photo={exp.hero}
                  className="absolute inset-0 -z-10"
                  sizes={b.sizes}
                  imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/80 via-navy-950/10 to-transparent transition-opacity duration-500 group-hover:opacity-90" aria-hidden="true" />
                <div className="flex h-full flex-col justify-end p-6 sm:p-8">
                  <p className={cn("font-display font-semibold leading-tight text-white", i === 0 ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl")}>{tr(exp.title)}</p>
                  <p className="mt-2 max-w-md translate-y-2 text-base text-white/85 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-lg:translate-y-0 max-lg:opacity-100">
                    {tr(exp.tagline)}
                  </p>
                </div>
                <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-amber-500 group-hover:text-navy-950" aria-hidden="true">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────── Beyond the Classroom: the traditions roll past ───────── */

export function TraditionsMarquee() {
  const { t, tr } = useLang();
  return (
    <section className="overflow-hidden bg-ivory py-24 sm:py-32" aria-labelledby="traditions-title">
      <div className={cn(wrap, "flex flex-col justify-between gap-6 sm:flex-row sm:items-end")}>
        <h2 id="traditions-title" className={cn(h2, "text-navy-900")}>
          <Words text={t.home.traditionsTitle} />
        </h2>
        <div data-rise>
          <More href="/campus-life/beyond-the-classroom">{t.campusLife.beyondCta}</More>
        </div>
      </div>
      <Marquee className="mt-14" seconds={55}>
        {TRADITIONS.map((tr_) => (
          <Link
            key={tr_.slug}
            href={`/campus-life/beyond-the-classroom/${tr_.slug}`}
            className="group flex shrink-0 items-center gap-6 px-6 sm:gap-10 sm:px-10"
          >
            <span className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-36">
              <Photo photo={tr_.image} className="absolute inset-0" sizes="144px" imgClassName="transition-transform duration-700 group-hover:scale-110" />
            </span>
            <span className="font-display whitespace-nowrap text-5xl font-semibold tracking-[-0.03em] text-navy-900 transition-colors duration-300 group-hover:text-crimson-600 sm:text-7xl">
              {tr(tr_.title)}
            </span>
          </Link>
        ))}
      </Marquee>
    </section>
  );
}

/* ───────── University matriculation ───────── */

export function MatriculationHome() {
  const { t } = useLang();
  const m = t.matriculation;
  return (
    <section id="matriculation" className="relative isolate scroll-mt-24 overflow-hidden py-28 text-white sm:py-36">
      <Aurora tone="dusk" />
      <div className={wrap}>
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <h2 className={h2}>
              <Words text={m.title} />
            </h2>
            <p data-rise className="mt-6 text-xl text-white/85">
              {m.intro}
            </p>
          </div>
          <div data-rise>
            <More href="/learning/university-matriculation" dark>
              {m.more}
            </More>
          </div>
        </div>
        <div data-rise className="mt-14">
          <MatriculationExplorer />
        </div>
      </div>
    </section>
  );
}

/* ───────── Life at SCCS: news, the calendar, and Instagram ───────── */

export function LifeHome() {
  const { t, tr, dateLocale } = useLang();
  const c = t.campusLife;
  const news = sortedNews();
  const lead = [...news.filter((n) => n.featured), ...news.filter((n) => !n.featured)].slice(0, 3);
  const events = upcomingEvents().slice(0, 4);
  return (
    <section id="events" className="scroll-mt-24 bg-ivory py-28 sm:py-36">
      <div className={wrap}>
        <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
          <h2 className={cn(h2, "text-navy-900")}>
            <Words text={t.home.lifeTitle} />
          </h2>
          <div data-rise>
            <More href="/news">{c.allNews}</More>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-6">
          {lead.map((post) => (
            <Link key={post.slug} href={`/news/${post.slug}`} data-rise className="group block">
              <div className="overflow-hidden rounded-[1.75rem]">
                <Photo photo={post.image} className="aspect-[4/3]" sizes="(min-width:1024px) 33vw, 100vw" imgClassName="transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]" />
              </div>
              <p className="mt-5 text-sm font-semibold text-crimson-600">
                {tr(CATEGORY_LABEL[post.category])}
                <span className="font-normal text-navy-900/60"> · {format(parseISO(post.date), "MMMM d", { locale: dateLocale })}</span>
              </p>
              <h3 className="font-display mt-2 text-2xl font-semibold leading-snug text-navy-900 transition-colors group-hover:text-navy-600 sm:text-[1.7rem]">{tr(post.title)}</h3>
            </Link>
          ))}
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-12">
          <h3 data-rise className="font-display text-4xl font-semibold leading-tight text-navy-900 lg:col-span-4">
            {c.eventsTitle}
          </h3>
          <ul className="lg:col-span-8">
            {events.map((e) => {
              const d = parseISO(e.date);
              return (
                <li key={e.date + e.title.en} data-rise>
                  <Link href={e.href} className="group grid grid-cols-[5.5rem_1fr_auto] items-center gap-5 rounded-2xl px-2 py-5 transition-colors hover:bg-cream sm:px-4">
                    <span className="font-display text-navy-900">
                      <span className="block text-4xl font-semibold leading-none">{format(d, "d", { locale: dateLocale })}</span>
                      <span className="mt-1 block text-sm font-semibold capitalize text-crimson-600">{format(d, "MMMM", { locale: dateLocale })}</span>
                    </span>
                    <span>
                      <span className="block text-lg font-semibold text-navy-900 sm:text-xl">{tr(e.title)}</span>
                      <span className="mt-1 block text-sm text-navy-900/65">{tr(e.desc)}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 text-navy-800 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="mt-24">
        <div className={cn(wrap, "mb-8 flex items-center justify-between gap-4")}>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-11 items-center gap-3 text-lg font-semibold text-navy-900 hover:text-crimson-600">
            <InstagramGlyph className="h-6 w-6" />
            {c.followHandle}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </a>
        </div>
        <Marquee seconds={60}>
          {INSTAGRAM_POSTS.map((p) => (
            <a
              key={p.photo.src}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative mx-2 block h-64 w-64 shrink-0 overflow-hidden rounded-[1.5rem] sm:h-80 sm:w-80"
              aria-label={`${tr(p.caption)} · ${t.page.viewOnInstagram}`}
            >
              <Photo photo={p.photo} className="absolute inset-0" sizes="320px" imgClassName="transition-transform duration-700 group-hover:scale-105" />
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

/* ───────── Admissions ───────── */

export function AdmissionsHome() {
  const { t } = useLang();
  const a = t.admissions;
  return (
    <section id="admissions" className="scroll-mt-24 bg-cream py-28 sm:py-36">
      <div className={cn(wrap, "grid gap-14 lg:grid-cols-12")}>
        <div className="lg:col-span-6">
          <h2 className={cn(h2, "text-navy-900")}>
            <Words text={a.title} />
          </h2>
          <p data-rise className="mt-6 text-xl text-navy-900/80">
            {t.home.admissionsIntro}
          </p>
          <div data-rise className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/admissions#inquire" className={cn(buttonStyles.primary, "h-14 px-8 text-base")}>
              {t.home.admissionsCta}
            </Link>
            <Link href="/admissions" className={cn(buttonStyles.outline, "h-14 px-8 text-base")}>
              {a.more}
            </Link>
          </div>
        </div>
        <ol className="space-y-4 lg:col-span-6">
          {a.steps.map((s) => (
            <li key={s.title} data-rise className="rounded-[1.75rem] bg-white p-7 sm:p-9">
              <p className="text-sm font-semibold text-crimson-600">{s.phase}</p>
              <h3 className="font-display mt-2 text-3xl font-semibold text-navy-900">{s.title}</h3>
              <p className="mt-3 text-base text-navy-900/75">{s.points.join(" · ")}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ───────── Close ───────── */

export function FinalCtaHome() {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden py-32 text-center text-white sm:py-44">
      <Aurora />
      <div className={wrap}>
        <div data-rise className="mx-auto w-24 sm:w-28">
          <Crest className="h-auto w-full drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]" />
        </div>
        <h2 className={cn(h2, "mx-auto mt-10 max-w-5xl")}>
          <Words text={t.cta.title} />
        </h2>
        <p data-rise className="mx-auto mt-6 max-w-xl text-xl text-white/85">
          {t.cta.subtitle}
        </p>
        <div data-rise className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/admissions#inquire" className={cn(buttonStyles.gold, "h-14 px-9 text-base")}>
            {t.cta.primary}
          </Link>
          <Link href="/contact" className={cn(buttonStyles.glass, "h-14 px-8 text-base")}>
            {t.cta.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
