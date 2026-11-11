"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Briefcase, CalendarDays, Check, FileText, Mail, Stethoscope } from "lucide-react";
import { PAGE_PHOTOS } from "@/data/page-photos";
import { CAMPUS, CAREERS, HISTORY, LEADERSHIP, SAFETY } from "@/data/pages";
import { PILLARS } from "@/data/nav";
import { SPOTLIGHTS } from "@/data/sccs-content";
import { useLang } from "@/components/sccs/i18n";
import { Container, Kicker, Photo, Reveal, Section, SectionHeading, buttonStyles } from "@/components/sccs/sccs-shared";
import { Gallery, IconCards, PageHero, RelatedLinks, Split, Tabs } from "@/components/sccs/page-kit";
import { JaguarSpirit, LearnerProfile, MissionValues, SafetyWellness, Timeline } from "@/components/sccs/discover";
import { FinalCta } from "@/components/sccs/final-cta";
import { cn } from "@/lib/utils";

function useDiscoverCrumb() {
  const { t } = useLang();
  return { href: "/discover", label: t.nav.discover };
}

function DiscoverRelated({ exclude }: { exclude: string }) {
  const { tr } = useLang();
  const photos = Object.values(PAGE_PHOTOS.discoverLinks);
  const items = PILLARS[0].children.map((c, i) => ({ href: c.href, label: tr(c.label), blurb: tr(c.blurb), photo: photos[i] })).filter((c) => c.href !== exclude);
  return <RelatedLinks items={items} />;
}

/* ───────── /discover ───────── */
export function AdvantagePage() {
  const { t, tr } = useLang();
  const d = t.discover;
  const body = [
    { value: "85%", label: { en: "Bolivian students", es: "Estudiantes bolivianos" } },
    { value: "15%", label: { en: "International & U.S. citizens", es: "Internacionales y ciudadanos de EE. UU." } },
    { value: "PK–12", label: { en: "Taught in English", es: "Enseñanza en inglés" } },
  ];
  return (
    <>
      <PageHero photo={PAGE_PHOTOS.advantage.hero} kicker={d.kicker} title={d.title} lede={d.intro} crumbs={[useDiscoverCrumb()]} imgPosition="object-[50%_60%]" />
      <Section>
        <Container className="space-y-20 lg:space-y-28">
          <MissionValues />
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
            <Reveal>
              <Kicker>{tr({ en: "A global classroom", es: "Un aula global" })}</Kicker>
              <h2 className="font-display mt-4 text-3xl font-semibold text-navy-900 sm:text-4xl">
                {tr({ en: "Built to mirror the universities our graduates attend.", es: "Pensado como las universidades a las que van nuestros graduados." })}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-mist">
                {tr({
                  en: "Founded by visionary Bolivian families and international energy companies, SCCS grew from an enclave for expatriate families into the region's premier private, coeducational preparatory school — with a significant population of dual-national learners.",
                  es: "Fundado por familias bolivianas visionarias y empresas energéticas internacionales, SCCS pasó de ser un enclave para familias extranjeras al principal colegio preparatorio privado y mixto de la región — con una importante población de estudiantes con doble nacionalidad.",
                })}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-3">
              {body.map((b) => (
                <div key={b.value} className="rounded-2xl border border-border bg-card p-6 text-center">
                  <p className="font-display text-4xl font-semibold text-crimson-600">{b.value}</p>
                  <p className="mt-2 text-sm text-mist">{tr(b.label)}</p>
                </div>
              ))}
            </Reveal>
          </div>
          <LearnerProfile />
          <JaguarSpirit />
          <Timeline />
          <div>
            <SectionHeading title={d.safetyTitle} />
            <div className="mt-8">
              <SafetyWellness />
            </div>
          </div>
          <DiscoverRelated exclude="/discover" />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /discover/history ───────── */
export function HistoryPage() {
  const { tr } = useLang();
  return (
    <>
      <PageHero photo={PAGE_PHOTOS.history.hero} kicker={tr(HISTORY.kicker)} title={tr(HISTORY.title)} lede={tr(HISTORY.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/history", label: tr(HISTORY.kicker) }]} />
      <Section>
        <Container>
          <ol className="relative space-y-20 lg:space-y-28">
            <span className="absolute bottom-0 left-4 top-0 hidden w-px bg-gradient-to-b from-amber-500 via-amber-500/40 to-transparent lg:left-1/2 lg:block" aria-hidden="true" />
            {HISTORY.chapters.map((c, i) => (
              <li key={c.year} className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-20">
                <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                  <Photo photo={c.image} className="aspect-[16/10] rounded-2xl shadow-[0_24px_60px_rgba(20,20,58,0.14)]" sizes="(min-width:1024px) 45vw, 100vw" />
                </Reveal>
                <Reveal delay={0.1}>
                  <p className="font-display text-6xl font-semibold text-amber-500/90 sm:text-7xl">{c.year}</p>
                  <h2 className="font-display mt-3 text-3xl font-semibold text-navy-900">{tr(c.title)}</h2>
                  <p className="mt-4 text-lg leading-relaxed text-mist">{tr(c.body)}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section className="bg-cream/50">
        <Container>
          <SectionHeading kicker={tr(HISTORY.thenNow)} title={tr(HISTORY.thenNowIntro)} />
          <div className="mt-10">
            <Gallery photos={HISTORY.gallery} />
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <DiscoverRelated exclude="/discover/history" />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /discover/safety-wellness ───────── */
export function SafetyPage() {
  const { tr } = useLang();
  return (
    <>
      <PageHero photo={PAGE_PHOTOS.safety.hero} kicker={tr(SAFETY.kicker)} title={tr(SAFETY.title)} lede={tr(SAFETY.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/safety-wellness", label: tr(SAFETY.kicker) }]} imgPosition="object-[50%_35%]" />
      <Section>
        <Container className="space-y-20 lg:space-y-28">
          {SAFETY.pillars.map((p, i) => (
            <Split key={p.title.en} photo={p.image} title={tr(p.title)} body={tr(p.body)} reverse={i % 2 === 1} kicker={`0${i + 1}`} />
          ))}
        </Container>
      </Section>
      <Section className="bg-navy-100/60">
        <Container>
          <SectionHeading kicker={tr({ en: "Child Protection", es: "Protección Infantil" })} title={tr({ en: "Revised every year. Shared by everyone.", es: "Revisada cada año. Compartida por todos." })} />
          <div className="mt-10">
            <Tabs
              label={tr(SAFETY.kicker)}
              tabs={SAFETY.tabs.map((tb) => ({
                id: tb.id,
                label: tr(tb.label),
                content: (
                  <div className="rounded-2xl bg-white p-7 sm:p-10">
                    <h3 className="font-display text-2xl font-semibold text-navy-900">{tr(tb.title)}</h3>
                    <div className="mt-4 space-y-4 leading-relaxed text-mist">
                      {tb.body.map((b, i) => (
                        <p key={i}>{tr(b)}</p>
                      ))}
                    </div>
                  </div>
                ),
              }))}
            />
          </div>
          <h3 className="font-display mt-16 text-2xl font-semibold text-navy-900">{tr(SAFETY.promiseTitle)}</h3>
          <div className="mt-6">
            <IconCards items={SAFETY.promise.map((p) => ({ title: tr(p.title), text: tr(p.text) }))} />
          </div>
          <div className="mt-10 flex flex-col items-start gap-5 rounded-2xl bg-navy-950 p-7 text-cream sm:flex-row sm:items-center sm:p-10">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-amber-500 text-navy-950">
              <Stethoscope className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h3 className="font-display text-2xl font-semibold text-white">{tr(SAFETY.medicalTitle)}</h3>
              <p className="mt-2 text-cream/75">{tr(SAFETY.medicalBody)}</p>
            </div>
            <Link href="/contact" className={buttonStyles.gold}>
              {tr(SAFETY.cta)}
            </Link>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <SafetyWellness withCta={false} />
          <div className="mt-20">
            <DiscoverRelated exclude="/discover/safety-wellness" />
          </div>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /discover/campus ───────── */
export function CampusPage() {
  const { tr } = useLang();
  return (
    <>
      <PageHero photo={PAGE_PHOTOS.campus.hero} kicker={tr(CAMPUS.kicker)} title={tr(CAMPUS.title)} lede={tr(CAMPUS.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/campus", label: tr(CAMPUS.kicker) }]} tall />
      <Section>
        <Container>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {CAMPUS.facilities.map((f, i) => {
              const inner = (
                <>
                  <Photo photo={f.image} className="aspect-[4/3]" sizes="(min-width:1024px) 25vw, 50vw" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                  <div className="flex flex-1 flex-col p-5">
                    <h2 className="font-semibold text-navy-900">{tr(f.title)}</h2>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-mist">{tr(f.text)}</p>
                    {"href" in f && f.href && <ArrowRight className="mt-3 h-4 w-4 text-crimson-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
                  </div>
                </>
              );
              const cls = "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-[0_18px_44px_rgba(20,20,58,0.1)]";
              return (
                <Reveal as="li" key={f.title.en} delay={(i % 4) * 0.06}>
                  {"href" in f && f.href ? (
                    <Link href={f.href} className={cls}>
                      {inner}
                    </Link>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>
      <Section className="bg-cream/50">
        <Container>
          <Gallery photos={PAGE_PHOTOS.campus.aroundCampus} title={tr({ en: "Around campus", es: "Por el campus" })} />
        </Container>
      </Section>
      <Section>
        <Container>
          <DiscoverRelated exclude="/discover/campus" />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /discover/leadership ───────── */
export function LeadershipPage() {
  const { tr } = useLang();
  return (
    <>
      <PageHero photo={PAGE_PHOTOS.leadership.hero} kicker={tr(LEADERSHIP.kicker)} title={tr(LEADERSHIP.title)} lede={tr(LEADERSHIP.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/leadership", label: tr(LEADERSHIP.kicker) }]} imgPosition="object-[50%_30%]" />
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-4xl rounded-3xl bg-navy-100/70 p-8 sm:p-12">
            <Kicker>{tr(LEADERSHIP.messageTitle)}</Kicker>
            <p className="font-display mt-6 text-2xl leading-snug text-navy-900 sm:text-3xl">“{tr(LEADERSHIP.message)}”</p>
          </Reveal>
          <div className="mt-20">
            <IconCards items={LEADERSHIP.blocks.map((b) => ({ title: tr(b.title), text: tr(b.text) }))} />
          </div>
        </Container>
      </Section>
      <Section className="bg-cream/50">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Reveal>
              <Photo photo={PAGE_PHOTOS.leadership.boardPhoto} className="aspect-[16/10] rounded-2xl" sizes="(min-width:1024px) 55vw, 100vw" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-semibold text-navy-900">{tr(LEADERSHIP.boardTitle)}</h2>
              <p className="mt-4 leading-relaxed text-mist">{tr(LEADERSHIP.boardBody)}</p>
              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {LEADERSHIP.board.map((b) => (
                  <li key={b.name} className="border-b border-border pb-2">
                    <p className="font-semibold text-navy-900">{b.name}</p>
                    <p className="text-xs text-mist">{tr(b.role)}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <DiscoverRelated exclude="/discover/leadership" />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /discover/careers ───────── */
type OpeningT = (typeof CAREERS.openings)[number];

const applyHref = (slug: string) => `/discover/careers/apply?role=${encodeURIComponent(slug)}`;

/** A long requirements list makes one card much taller than its neighbours; such a card takes a full row, with the list beside the summary. */
const isWide = (job: OpeningT) => job.points.length > 4;

function OpeningCard({ job, index }: { job: OpeningT; index: number }) {
  const { tr } = useLang();
  const wide = isWide(job);
  return (
    <Reveal as="li" delay={(index % 3) * 0.06} className={cn("h-full", wide && "md:col-span-full")}>
      {/* Wide cards become a two-column grid on large screens: summary and buttons on the left, requirements on the right. DOM order (summary, requirements, buttons) is the reading order on small screens. */}
      <article
        id={`job-${job.slug}`}
        className={cn(
          "flex h-full scroll-mt-28 flex-col rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg sm:p-7",
          wide && "lg:grid lg:grid-cols-[1.15fr_1fr] lg:grid-rows-[1fr_auto] lg:gap-x-10 lg:p-9",
        )}
      >
        <div className={cn(wide && "lg:col-start-1 lg:row-start-1")}>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-navy-100 px-3 py-1 text-navy-800">{tr(job.division)}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-navy-900">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {tr(job.start)}
            </span>
          </div>
          <h4 className="font-display mt-4 text-xl font-semibold leading-snug text-navy-900 sm:text-2xl">{tr(job.title)}</h4>
          <p className="mt-1 text-sm font-semibold text-crimson-600">{tr(job.detail)}</p>
          <p className="mt-4 text-sm leading-relaxed text-mist">{tr(job.summary)}</p>
        </div>
        {job.points.length > 0 && (
          <ul className={cn("mt-5 space-y-2 border-t border-border pt-5 text-sm text-navy-900/85", wide && "lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center lg:border-l lg:border-t-0 lg:py-2 lg:pl-10")}>
            {job.points.map((pt) => (
              <li key={pt.en} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-crimson-600" aria-hidden="true" />
                <span>{tr(pt)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className={cn("mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6", wide && "lg:col-start-1 lg:row-start-2")}>
          <Link href={applyHref(job.slug)} className={buttonStyles.primary}>
            {tr(CAREERS.applyLabel)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">: {tr(job.title)}</span>
          </Link>
          {job.posting && (
            <a href={job.posting} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-800 underline-offset-4 hover:text-crimson-600 hover:underline">
              <FileText className="h-4 w-4" aria-hidden="true" />
              {tr(CAREERS.postingLabel)}
              <span className="sr-only">: {tr(job.title)}</span>
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function Openings() {
  const { tr } = useLang();
  const groups = [
    { id: "leadership", label: tr(CAREERS.leadershipLabel), jobs: CAREERS.openings.filter((j) => j.group === "leadership") },
    { id: "faculty", label: tr(CAREERS.facultyLabel), jobs: CAREERS.openings.filter((j) => j.group !== "leadership") },
  ].filter((g) => g.jobs.length > 0);
  return (
    <>
      <SectionHeading title={tr(CAREERS.openingsTitle)} intro={tr(CAREERS.openingsIntro)} />
      <Reveal delay={0.16}>
        <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mist">
          <span className="inline-flex items-center gap-2 font-semibold text-navy-900">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-600 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-crimson-600" />
            </span>
            {tr(CAREERS.openingsKicker)} · {CAREERS.openings.length}
          </span>
          <span>{tr(CAREERS.postedOn)}</span>
          <a href={CAREERS.announcement} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-navy-800 hover:text-crimson-600">
            @sccsjaguars
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </p>
      </Reveal>
      {groups.length === 0 ? (
        <p className="mt-10 max-w-2xl rounded-2xl border border-border bg-card p-6 text-mist">{tr(CAREERS.noOpenings)}</p>
      ) : (
        groups.map((g) => (
          <div key={g.id} className="mt-12">
            <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-navy-900">
              <Briefcase className="h-4 w-4 text-crimson-600" aria-hidden="true" />
              {g.label}
              <span className="rounded-full bg-navy-100 px-2 py-0.5 text-xs tracking-normal text-navy-800">{g.jobs.length}</span>
            </h3>
            <ul className={cn("mt-5 grid gap-5 md:grid-cols-2", g.id !== "leadership" && "lg:grid-cols-3")}>
              {g.jobs.map((job, i) => (
                <OpeningCard key={job.slug} job={job} index={i} />
              ))}
            </ul>
          </div>
        ))
      )}
      <Reveal className="mt-8">
        <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-navy-800/25 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-navy-900">{tr(CAREERS.yearRoundTitle)}</p>
            <p className="mt-1 text-sm text-mist">{tr(CAREERS.yearRound)}</p>
          </div>
          <Link href={applyHref("year-round")} className={cn(buttonStyles.outline, "shrink-0")}>
            {tr(CAREERS.applyLabel)}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">: {tr(CAREERS.yearRoundTitle)}</span>
          </Link>
        </div>
      </Reveal>
    </>
  );
}

export function CareersPage() {
  const { tr, t } = useLang();
  return (
    <>
      <PageHero photo={PAGE_PHOTOS.careers.hero} kicker={tr(CAREERS.kicker)} title={tr(CAREERS.title)} lede={tr(CAREERS.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/careers", label: tr(CAREERS.kicker) }]} imgPosition="object-[50%_55%]" />
      <Section id="openings">
        <Container>
          <Openings />
        </Container>
      </Section>
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <IconCards items={CAREERS.why.map((b) => ({ title: tr(b.title), text: tr(b.text) }))} />
          <div id="apply" className="mt-16 grid scroll-mt-28 gap-10 rounded-2xl bg-navy-950 p-8 text-cream sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{tr(CAREERS.applyTitle)}</h2>
              <p className="mt-2 max-w-2xl text-cream/75">{tr(CAREERS.applyBody)}</p>
              <ol className="mt-5 space-y-2.5">
                {CAREERS.packet.map((p, i) => (
                  <li key={p.en} className="flex gap-3 text-cream/90">
                    <span className="font-display w-5 shrink-0 font-semibold text-amber-400">{i + 1}</span>
                    <span>{tr(p)}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link href="/discover/careers/apply" className={buttonStyles.gold}>
                  {tr(CAREERS.applyOnline)}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href="mailto:jobs@sccs.edu.bo" className={buttonStyles.outlineDark}>
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  jobs@sccs.edu.bo
                </a>
              </div>
              <p className="mt-8 text-sm font-semibold text-white">{tr(CAREERS.partnersTitle)}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {CAREERS.partners.map((p) => (
                  <li key={p.name}>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 items-center gap-1 rounded-full border border-white/20 px-4 text-sm text-cream/90 hover:border-amber-400 hover:text-amber-400">
                      {p.name}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
              <h3 className="font-display text-xl font-semibold text-white">{tr(CAREERS.qualificationsTitle)}</h3>
              <ul className="mt-5 space-y-3">
                {CAREERS.qualifications.map((q) => (
                  <li key={q.en} className="flex gap-3 text-sm leading-relaxed text-cream/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                    <span>{tr(q)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
      <Section className="bg-cream/50">
        <Container>
          <SectionHeading kicker="@sccsjaguars" title={t.community.spotlightTitle} intro={t.community.spotlightIntro} />
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {SPOTLIGHTS.map((s, i) => (
              <Reveal as="li" key={s.url} delay={(i % 4) * 0.05}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-border transition-shadow hover:shadow-lg">
                  <Photo photo={s.photo} fill={false} sizes="(min-width:1024px) 25vw, 50vw" />
                </a>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container>
          <DiscoverRelated exclude="/discover/careers" />
        </Container>
      </Section>
    </>
  );
}
