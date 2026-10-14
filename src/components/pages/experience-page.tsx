"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { EXPERIENCES, type Experience } from "@/data/experiences";
import { useLang } from "@/components/sccs/i18n";
import { Container, Kicker, Photo, Reveal, Section, buttonStyles } from "@/components/sccs/sccs-shared";
import { Gallery, PageHero, Split } from "@/components/sccs/page-kit";
import { ExperienceTile } from "@/components/sccs/campus-life";
import { FinalCta } from "@/components/sccs/final-cta";
import { cn } from "@/lib/utils";

export function ExperiencePage({ exp }: { exp: Experience }) {
  const { tr, t } = useLang();
  const idx = EXPERIENCES.findIndex((e) => e.slug === exp.slug);
  const prev = EXPERIENCES[(idx - 1 + EXPERIENCES.length) % EXPERIENCES.length];
  const next = EXPERIENCES[(idx + 1) % EXPERIENCES.length];
  const others = EXPERIENCES.filter((e) => e.slug !== exp.slug);
  const external = exp.cta.href.startsWith("http");

  return (
    <>
      <PageHero
        tall
        photo={exp.hero}
        kicker={tr(exp.kicker)}
        title={tr(exp.title)}
        lede={tr(exp.tagline)}
        crumbs={[
          { href: "/campus-life", label: t.nav.campusLife },
          { href: "/campus-life/jaguar-experience", label: t.campusLife.title },
          { href: `/campus-life/jaguar-experience/${exp.slug}`, label: tr(exp.title) },
        ]}
      />

      {/* Lede + facts */}
      <Section className="pb-0 sm:pb-0 lg:pb-0">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <Reveal>
              <p className="font-display text-2xl leading-snug text-navy-900 sm:text-3xl">{tr(exp.lede)}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className="divide-y divide-border rounded-2xl border border-border bg-card">
                <div className="px-6 pt-5">
                  <Kicker>{t.page.atAGlance}</Kicker>
                </div>
                {exp.facts.map((f) => (
                  <div key={f.value + f.label.en} className="flex items-baseline gap-5 px-6 py-5">
                    <dt className="font-display w-24 shrink-0 text-3xl font-semibold text-crimson-600">{f.value}</dt>
                    <dd className="text-sm text-mist">{tr(f.label)}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Story sections */}
      <Section>
        <Container className="space-y-20 lg:space-y-28">
          {exp.sections.map((s, i) => (
            <Split key={s.title.en} photo={s.image ?? exp.hero} title={tr(s.title)} body={tr(s.body)} reverse={i % 2 === 1} />
          ))}
        </Container>
      </Section>

      {/* Pillars */}
      <Section dark>
        <Container>
          <Reveal>
            <Kicker dark>{tr(exp.title)}</Kicker>
            <h2 className="font-display mt-4 text-3xl font-semibold text-white sm:text-4xl">{tr(exp.pillarsTitle)}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {exp.pillars.map((p, i) => (
              <Reveal as="li" key={p.title.en} delay={i * 0.07} className="bg-navy-950 p-7">
                <span className="block h-0.5 w-8 rounded-full bg-amber-400" aria-hidden="true" />
                <h3 className="mt-4 text-lg font-semibold text-white">{tr(p.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{tr(p.text)}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.1} className="mx-auto mt-20 max-w-3xl text-center">
            <Quote className="mx-auto h-8 w-8 text-amber-400" aria-hidden="true" />
            <p className="font-display mt-6 text-3xl font-medium italic leading-snug text-white sm:text-4xl">{tr(exp.quote)}</p>
          </Reveal>
        </Container>
      </Section>

      {/* Gallery */}
      <Section>
        <Container>
          <Gallery photos={exp.gallery} title={t.page.gallery} />
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link
              href={exp.cta.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={buttonStyles.primary}
            >
              {tr(exp.cta.label)}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/admissions#inquire" className={buttonStyles.outline}>
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </Container>
      </Section>

      {/* Prev / next */}
      <section className="border-t border-border bg-cream/50">
        <Container className="grid gap-px sm:grid-cols-2">
          {[prev, next].map((e, i) => (
            <Link
              key={e.slug}
              href={`/campus-life/jaguar-experience/${e.slug}`}
              className={cn("group flex min-h-28 flex-col justify-center gap-1 py-8", i === 1 && "sm:items-end sm:text-right")}
            >
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">
                {i === 0 && <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />}
                {i === 0 ? t.page.previous : t.page.next}
                {i === 1 && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />}
              </span>
              <span className="font-display text-2xl font-semibold text-navy-900 group-hover:text-navy-600">{tr(e.title)}</span>
            </Link>
          ))}
        </Container>
      </section>

      <Section>
        <Container>
          <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{t.page.related}</h2>
          <ul className="ios-scroll mt-8 flex snap-x gap-4 overflow-x-auto pb-4">
            {others.map((e) => (
              <li key={e.slug} className="w-[78vw] shrink-0 snap-start sm:w-80">
                <ExperienceTile exp={e} sizes="320px" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

export function JaguarExperienceHub() {
  const { t, tr } = useLang();
  return (
    <>
      <PageHero
        tall
        photo={EXPERIENCES.find((e) => e.slug === "friendship-games")!.hero}
        kicker={t.nav.campusLife}
        title={t.campusLife.title}
        lede={t.campusLife.intro}
        crumbs={[
          { href: "/campus-life", label: t.nav.campusLife },
          { href: "/campus-life/jaguar-experience", label: t.campusLife.title },
        ]}
      />
      <Section>
        <Container className="space-y-6">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.slug}>
              <Link
                href={`/campus-life/jaguar-experience/${e.slug}`}
                className="group grid overflow-hidden rounded-3xl border border-border bg-card transition-shadow duration-500 hover:shadow-[0_30px_70px_rgba(20,20,58,0.12)] lg:grid-cols-2"
              >
                <div className={cn("relative min-h-72 overflow-hidden lg:min-h-[26rem]", i % 2 === 1 && "lg:order-2")}>
                  <Photo photo={e.hero} className="absolute inset-0" sizes="(min-width:1024px) 50vw, 100vw" imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-crimson-600">
                    {tr(e.kicker)}
                  </p>
                  <h2 className="font-display mt-3 text-3xl font-semibold text-navy-900 sm:text-4xl">{tr(e.title)}</h2>
                  <p className="font-display mt-3 text-lg italic text-navy-700">{tr(e.tagline)}</p>
                  <p className="mt-4 line-clamp-4 leading-relaxed text-mist">{tr(e.lede)}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {e.facts.map((f) => (
                      <li key={f.value + f.label.en} className="rounded-full bg-cream px-3 py-1 text-xs text-navy-800">
                        <span className="font-semibold text-crimson-600">{f.value}</span> · {tr(f.label)}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy-600 group-hover:text-navy-800">
                    {t.campusLife.explore} · {tr(e.title)}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
