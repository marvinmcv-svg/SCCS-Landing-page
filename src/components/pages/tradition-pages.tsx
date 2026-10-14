"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Check, MapPin, Users } from "lucide-react";
import { media } from "@/data/media";
import { MORE_TRADITIONS, TRADITIONS, TRADITION_GROUPS, type Tradition, type TraditionGroup } from "@/data/traditions";
import { EVENTS } from "@/data/sccs-content";
import { useLang } from "@/components/sccs/i18n";
import { Container, Kicker, Photo, Reveal, Section, SectionHeading, buttonStyles } from "@/components/sccs/sccs-shared";
import { Gallery, PageHero } from "@/components/sccs/page-kit";
import { EventCard, EventsGrid } from "@/components/sccs/campus-life";
import { FinalCta } from "@/components/sccs/final-cta";

function TraditionCard({ tr_ }: { tr_: Tradition }) {
  const { tr, t } = useLang();
  return (
    <Link href={`/campus-life/beyond-the-classroom/${tr_.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-[0_20px_48px_rgba(20,20,58,0.1)]">
      <Photo photo={tr_.image} className="aspect-[4/3]" sizes="(min-width:1024px) 33vw, 100vw" imgClassName="transition-transform duration-700 group-hover:scale-105" />
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-crimson-600">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {tr(tr_.when)}
        </p>
        <h3 className="font-display mt-2 text-2xl font-semibold text-navy-900">{tr(tr_.title)}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{tr(tr_.tagline)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 group-hover:text-navy-800">
          {t.campusLife.explore}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function BeyondHub() {
  const { t, tr } = useLang();
  const groups = Object.keys(TRADITION_GROUPS) as TraditionGroup[];
  return (
    <>
      <PageHero
        photo={media.igReadingNight1}
        kicker={t.nav.campusLife}
        title={t.campusLife.beyondTitle}
        lede={t.campusLife.beyondIntro}
        crumbs={[
          { href: "/campus-life", label: t.nav.campusLife },
          { href: "/campus-life/beyond-the-classroom", label: t.campusLife.beyondTitle },
        ]}
      >
        <ul className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <li key={g}>
              <a href={`#${g}`} className="inline-flex min-h-10 items-center rounded-full border border-white/30 px-4 text-sm text-white/90 backdrop-blur-sm hover:border-amber-400 hover:text-amber-400">
                {tr(TRADITION_GROUPS[g].title)}
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      {groups.map((g, gi) => (
        <Section key={g} id={g} className={gi % 2 === 1 ? "bg-cream/50" : undefined}>
          <Container>
            <SectionHeading kicker={`0${gi + 1}`} title={tr(TRADITION_GROUPS[g].title)} intro={tr(TRADITION_GROUPS[g].intro)} />
            <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TRADITIONS.filter((x) => x.group === g).map((x, i) => (
                <Reveal as="li" key={x.slug} delay={i * 0.06}>
                  <TraditionCard tr_={x} />
                </Reveal>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      <Section className="border-t border-border">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
            <div>
              <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{t.page.moreTitle}</h2>
              <p className="mt-3 text-mist">{t.page.moreIntro}</p>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {MORE_TRADITIONS.map((m) => (
                <li key={m.en} className="rounded-full border border-border bg-white px-4 py-2 text-sm text-navy-900">
                  {tr(m)}
                </li>
              ))}
            </ul>
          </div>
          <div id="calendar" className="mt-20 scroll-mt-28">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
              <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{t.campusLife.eventsTitle}</h2>
              <p className="text-mist">{t.campusLife.eventsIntro}</p>
            </div>
            <div className="mt-8">
              <EventsGrid />
            </div>
          </div>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

export function TraditionPage({ tradition }: { tradition: Tradition }) {
  const { t, tr } = useLang();
  const group = TRADITION_GROUPS[tradition.group];
  const related = TRADITIONS.filter((x) => x.slug !== tradition.slug && x.group === tradition.group).concat(TRADITIONS.filter((x) => x.group !== tradition.group)).slice(0, 3);
  const event = EVENTS.find((e) => e.href.endsWith(`/${tradition.slug}`));
  const facts = [
    { icon: CalendarDays, label: t.page.when, value: tr(tradition.when) },
    { icon: Users, label: t.page.who, value: tr(tradition.who) },
    { icon: MapPin, label: t.page.where, value: tr(tradition.where) },
  ];

  return (
    <>
      <PageHero
        photo={tradition.image}
        kicker={tr(group.title)}
        title={tr(tradition.title)}
        lede={tr(tradition.tagline)}
        crumbs={[
          { href: "/campus-life", label: t.nav.campusLife },
          { href: "/campus-life/beyond-the-classroom", label: t.campusLife.beyondTitle },
          { href: `/campus-life/beyond-the-classroom/${tradition.slug}`, label: tr(tradition.title) },
        ]}
      />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
            <div>
              <Reveal className="space-y-6">
                {tradition.body.map((p, i) => (
                  <p key={i} className={i === 0 ? "font-display text-2xl leading-snug text-navy-900 sm:text-3xl" : "text-lg leading-relaxed text-mist"}>
                    {tr(p)}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={0.1} className="mt-12 rounded-2xl bg-navy-100 p-7">
                <Kicker>{t.page.whatToExpect}</Kicker>
                <ul className="mt-5 space-y-3">
                  {tradition.expect.map((e) => (
                    <li key={e.en} className="flex gap-3 text-navy-900">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500">
                        <Check className="h-3 w-3 text-navy-950" aria-hidden="true" />
                      </span>
                      {tr(e)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <dl className="divide-y divide-border rounded-2xl border border-border bg-card">
                  {facts.map((f) => (
                    <div key={f.label} className="flex items-start gap-4 p-5">
                      <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-crimson-600" aria-hidden="true" />
                      <div>
                        <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-mist">{f.label}</dt>
                        <dd className="mt-1 font-semibold text-navy-900">{f.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Reveal>
              {event && (
                <Reveal delay={0.08}>
                  <EventCard e={event} />
                </Reveal>
              )}
              <Link href="/campus-life/beyond-the-classroom#calendar" className={buttonStyles.outline + " w-full"}>
                {t.page.fullCalendar}
              </Link>
            </aside>
          </div>
          {tradition.gallery && tradition.gallery.length > 0 && (
            <div className="mt-20">
              <Gallery photos={[tradition.image, ...tradition.gallery]} title={t.page.gallery} />
            </div>
          )}
        </Container>
      </Section>
      <Section className="border-t border-border bg-cream/50">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{t.page.related}</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((x) => (
              <li key={x.slug}>
                <TraditionCard tr_={x} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
