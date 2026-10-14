"use client";

import Link from "next/link";
import { ArrowRight, Mail, Stethoscope } from "lucide-react";
import { media } from "@/data/media";
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
  const photos = [media.campusLawn, media.historyHalloween, media.esLunchTrio, media.campusGardens, media.board, media.teacherEs];
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
      <PageHero photo={media.campusLawn} kicker={d.kicker} title={d.title} lede={d.intro} crumbs={[useDiscoverCrumb()]} />
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
      <PageHero photo={media.historySoccer} kicker={tr(HISTORY.kicker)} title={tr(HISTORY.title)} lede={tr(HISTORY.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/history", label: tr(HISTORY.kicker) }]} />
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
      <PageHero photo={media.esFriends} kicker={tr(SAFETY.kicker)} title={tr(SAFETY.title)} lede={tr(SAFETY.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/safety-wellness", label: tr(SAFETY.kicker) }]} imgPosition="object-[50%_35%]" />
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
      <PageHero photo={media.campusGardens} kicker={tr(CAMPUS.kicker)} title={tr(CAMPUS.title)} lede={tr(CAMPUS.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/campus", label: tr(CAMPUS.kicker) }]} tall />
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
          <Gallery photos={[media.campusGardens, media.campusLawn, media.campusPlayground, media.campusPatio, media.gym, media.libraryLounge, media.pacFlags]} title={tr({ en: "Around campus", es: "Por el campus" })} />
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
      <PageHero photo={media.board} kicker={tr(LEADERSHIP.kicker)} title={tr(LEADERSHIP.title)} lede={tr(LEADERSHIP.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/leadership", label: tr(LEADERSHIP.kicker) }]} imgPosition="object-[50%_30%]" />
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
              <Photo photo={media.board} className="aspect-[16/10] rounded-2xl" sizes="(min-width:1024px) 55vw, 100vw" />
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
export function CareersPage() {
  const { tr, t } = useLang();
  return (
    <>
      <PageHero photo={media.teacherEs} kicker={tr(CAREERS.kicker)} title={tr(CAREERS.title)} lede={tr(CAREERS.lede)} crumbs={[useDiscoverCrumb(), { href: "/discover/careers", label: tr(CAREERS.kicker) }]} imgPosition="object-[50%_40%]" />
      <Section>
        <Container>
          <IconCards items={CAREERS.why.map((b) => ({ title: tr(b.title), text: tr(b.text) }))} />
          <div className="mt-16 flex flex-col items-start gap-5 rounded-2xl bg-navy-950 p-8 text-cream sm:flex-row sm:items-center sm:p-10">
            <div className="flex-1">
              <h2 className="font-display text-2xl font-semibold text-white sm:text-3xl">{tr(CAREERS.applyTitle)}</h2>
              <p className="mt-2 max-w-2xl text-cream/75">{tr(CAREERS.applyBody)}</p>
            </div>
            <a href="mailto:jobs@sccs.edu.bo" className={buttonStyles.gold}>
              <Mail className="h-4 w-4" aria-hidden="true" />
              jobs@sccs.edu.bo
            </a>
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
