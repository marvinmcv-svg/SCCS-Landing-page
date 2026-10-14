"use client";

import Link from "next/link";
import { format, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Clock, ExternalLink, Mail, MapPin, Minus, Phone, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { media } from "@/data/media";
import { ADMISSIONS_FAQ, CONTACT, LEADERSHIP_HONORS } from "@/data/pages";
import { PILLARS } from "@/data/nav";
import { SPOTLIGHTS, sortedNews, type NewsCategory, type NewsPost } from "@/data/sccs-content";
import { SITE } from "@/lib/site";
import { cn, EASE } from "@/lib/utils";
import { useLang } from "@/components/sccs/i18n";
import { Container, JaguarMotif, Kicker, Photo, Reveal, Section, SectionHeading, TextLink, buttonStyles } from "@/components/sccs/sccs-shared";
import { Gallery, PageHero, RelatedLinks, Split } from "@/components/sccs/page-kit";
import { InquireBlock, Stepper } from "@/components/sccs/admissions";
import { BeyondChips, CATEGORY_CHIP, CATEGORY_LABEL, EventsGrid, ExperienceMosaic, NewsCard, NewsPreview } from "@/components/sccs/campus-life";
import { AlumniCard, MothersClubCard, PaletteCard, ParentHubCard, TeamDirectory } from "@/components/sccs/community";
import { InstagramGrid } from "@/components/sccs/instagram-grid";
import { FinalCta } from "@/components/sccs/final-cta";

/* ───────── /admissions ───────── */
export function AdmissionsPage() {
  const { t, tr } = useLang();
  const a = t.admissions;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero photo={media.campusLawn} kicker={a.kicker} title={a.title} lede={a.intro} crumbs={[{ href: "/admissions", label: t.nav.admissions }]}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#inquire" className={cn(buttonStyles.gold, "h-13 px-8")}>
            {t.hero.ctaPrimary}
          </a>
          <a href="#inquire" className={cn(buttonStyles.outlineDark, "h-13 px-8")}>
            {t.hero.ctaSecondary}
          </a>
        </div>
      </PageHero>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <Kicker>{tr({ en: "A Tier-1 education", es: "Una educación de primer nivel" })}</Kicker>
              <h2 className="font-display mt-4 text-3xl font-semibold leading-tight text-navy-900 sm:text-4xl">
                {tr({ en: "The gateway to global opportunity.", es: "La puerta a las oportunidades globales." })}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-mist">
                {tr({
                  en: "Does your vision for your child include a premier American education led by licensed, international educators? Our admissions process is designed for families seeking rigorous preparation where English mastery and global fluency are the standard, and where every child is known.",
                  es: "¿Tu visión para tu hijo incluye una educación americana de primer nivel, guiada por educadores internacionales titulados? Nuestro proceso de admisión está pensado para familias que buscan una preparación exigente, donde el dominio del inglés y la fluidez global son la norma, y donde cada niño es conocido.",
                })}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <Photo photo={media.esLunchTrio} className="aspect-[4/3] rounded-2xl" sizes="(min-width:1024px) 40vw, 100vw" />
            </Reveal>
          </div>
          <div className="lg:pt-4">
            <Stepper />
          </div>
        </Container>
      </Section>
      <Section className="bg-cream/40">
        <Container>
          <InquireBlock />
        </Container>
      </Section>
      <Section id="faq">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <SectionHeading kicker="FAQ" title={tr({ en: "Questions families ask.", es: "Preguntas frecuentes." })} />
          <ul className="divide-y divide-border border-y border-border">
            {ADMISSIONS_FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q.en}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left">
                    <span className="font-display text-lg font-semibold text-navy-900 sm:text-xl">{tr(f.q)}</span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-crimson-600">
                      {isOpen ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: EASE }} className="overflow-hidden pb-5 pr-12 leading-relaxed text-mist">
                        {tr(f.a)}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /campus-life ───────── */
export function CampusLifeHub() {
  const { t, tr } = useLang();
  const c = t.campusLife;
  const photos = [media.fgPepRally, media.igReadingNight1, media.stuco3, media.pacStage];
  return (
    <>
      <PageHero tall photo={media.fgCheer} kicker={c.kicker} title={tr({ en: "Life as a Jaguar.", es: "La vida de un Jaguar." })} lede={c.intro} crumbs={[{ href: "/campus-life", label: t.nav.campusLife }]} />
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading kicker={c.kicker} title={c.title} />
            <TextLink href="/campus-life/jaguar-experience">{c.exploreAll}</TextLink>
          </div>
          <div className="mt-10">
            <ExperienceMosaic />
          </div>
        </Container>
      </Section>
      <Section className="bg-cream/50">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <SectionHeading title={c.beyondTitle} intro={c.beyondIntro} />
            <TextLink href="/campus-life/beyond-the-classroom" className="mt-4">
              {c.beyondCta}
            </TextLink>
          </div>
          <div className="lg:pt-4">
            <BeyondChips />
          </div>
        </Container>
      </Section>
      <Section id="events">
        <Container>
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <SectionHeading title={c.eventsTitle} intro={c.eventsIntro} />
          </div>
          <div className="mt-10">
            <EventsGrid />
          </div>
        </Container>
      </Section>
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <SectionHeading title={c.newsTitle} intro={c.newsIntro} />
            <TextLink href="/news">{c.allNews}</TextLink>
          </div>
          <div className="mt-10">
            <NewsPreview />
          </div>
          <div className="mt-20">
            <RelatedLinks items={PILLARS[3].children.map((ch, i) => ({ href: ch.href, label: tr(ch.label), blurb: tr(ch.blurb), photo: photos[i] }))} />
          </div>
        </Container>
      </Section>
      <InstagramGrid />
      <FinalCta />
    </>
  );
}

/* ───────── /campus-life/student-leadership ───────── */
export function StudentLeadershipPage() {
  const { t, tr } = useLang();
  const L = LEADERSHIP_HONORS;
  return (
    <>
      <PageHero photo={media.stuco3} kicker={tr(L.kicker)} title={tr(L.title)} lede={tr(L.lede)} crumbs={[{ href: "/campus-life", label: t.nav.campusLife }, { href: "/campus-life/student-leadership", label: tr(L.kicker) }]} />
      <Section>
        <Container>
          <SectionHeading kicker="STUCO" title={tr(L.stuco.title)} />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {[
              { label: "Middle School", body: L.stuco.ms, photo: media.stuco },
              { label: "High School", body: L.stuco.hs, photo: media.stuco2 },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08} className="overflow-hidden rounded-2xl border border-border bg-card">
                <Photo photo={s.photo} className="aspect-[16/8]" sizes="(min-width:1024px) 50vw, 100vw" />
                <div className="p-7">
                  <Kicker>{s.label}</Kicker>
                  <p className="mt-4 leading-relaxed text-mist">{tr(s.body)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <Section dark>
        <Container>
          <SectionHeading kicker="NJHS · NHS" title={tr({ en: "Honor societies", es: "Sociedades de honor" })} dark />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {L.societies.map((s, i) => (
              <Reveal key={s.title.en} delay={i * 0.08} className="rounded-2xl border border-white/10 bg-navy-900/70 p-7 sm:p-9">
                <h3 className="font-display text-2xl font-semibold text-white">{tr(s.title)}</h3>
                <p className="mt-3 text-cream/75">{tr(s.body)}</p>
                <ul className="mt-6 space-y-3">
                  {s.points.map((p) => (
                    <li key={p.en} className="flex gap-3 text-sm text-cream/90">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                      {tr(p)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
          <TextLink href="/learning#assessment" dark className="mt-8">
            {tr({ en: "Honor Roll criteria", es: "Criterios del Cuadro de Honor" })}
          </TextLink>
        </Container>
      </Section>
      <Section>
        <Container className="space-y-16">
          <Split photo={media.serviceTecho} title={tr(L.serviceTitle)} body={tr(L.serviceBody)} kicker="TECHO" />
          <Gallery photos={[media.serviceTechoBuild, media.serviceTechoTeam, media.serviceTecho]} />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /news ───────── */
export function NewsIndex() {
  const { t, tr } = useLang();
  const all = sortedNews();
  const [cat, setCat] = useState<"ALL" | NewsCategory>("ALL");
  const list = useMemo(() => all.filter((n) => cat === "ALL" || n.category === cat), [all, cat]);
  const cats: ("ALL" | NewsCategory)[] = ["ALL", "ACADEMICS", "ARTS", "ATHLETICS", "COMMUNITY"];
  return (
    <>
      <PageHero photo={media.fgBasketballAcs} kicker={t.nav.campusLife} title={t.campusLife.newsTitle} lede={t.campusLife.newsIntro} crumbs={[{ href: "/campus-life", label: t.nav.campusLife }, { href: "/news", label: t.campusLife.newsTitle }]} />
      <Section>
        <Container>
          <div role="group" aria-label={t.campusLife.newsTitle} className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cat === c}
                onClick={() => setCat(c)}
                className={cn("pressable min-h-10 rounded-full border px-4 text-sm", cat === c ? "border-navy-800 bg-navy-800 text-ivory" : "border-border bg-white text-navy-900 hover:border-amber-500")}
              >
                {c === "ALL" ? t.community.categories.ALL : tr(CATEGORY_LABEL[c])}
              </button>
            ))}
          </div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((n, i) => (
              <Reveal as="li" key={n.slug} delay={(i % 3) * 0.06}>
                <NewsCard post={n} />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
      <InstagramGrid />
    </>
  );
}

export function NewsArticle({ post }: { post: NewsPost }) {
  const { t, tr, dateLocale } = useLang();
  const more = sortedNews()
    .filter((n) => n.slug !== post.slug)
    .slice(0, 3);
  return (
    <>
      <PageHero photo={post.image} kicker={tr(CATEGORY_LABEL[post.category])} title={tr(post.title)} crumbs={[{ href: "/news", label: t.campusLife.newsTitle }, { href: `/news/${post.slug}`, label: tr(post.title) }]}>
        <time dateTime={post.date} className="text-sm text-white/75">
          {format(parseISO(post.date), "MMMM d, yyyy", { locale: dateLocale })}
        </time>
      </PageHero>
      <Section>
        <Container>
          <article className="mx-auto max-w-3xl">
            <p className="font-display text-2xl leading-snug text-navy-900 sm:text-3xl">{tr(post.excerpt)}</p>
            <div className="mt-10 space-y-6 text-lg leading-relaxed text-mist">
              {post.body.map((b, i) => (
                <p key={i}>{tr(b)}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span className={cn("rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider", CATEGORY_CHIP[post.category])}>{tr(CATEGORY_LABEL[post.category])}</span>
              {post.instagramUrl && (
                <a href={post.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-800">
                  {t.page.viewOnInstagram}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </article>
          {post.gallery && post.gallery.length > 0 && (
            <div className="mt-16">
              <Gallery photos={[post.image, ...post.gallery]} title={t.page.gallery} />
            </div>
          )}
          <div className="mt-16">
            <Link href="/news" className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-600">
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
              {t.campusLife.allNews}
            </Link>
          </div>
        </Container>
      </Section>
      <Section className="border-t border-border bg-cream/50">
        <Container>
          <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{t.page.related}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((n) => (
              <li key={n.slug}>
                <NewsCard post={n} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}

/* ───────── /community ───────── */
export function CommunityPage() {
  const { t } = useLang();
  const c = t.community;
  return (
    <>
      <PageHero photo={media.mothersClubGroup} kicker={c.kicker} title={c.title} lede={c.intro} crumbs={[{ href: "/community", label: t.nav.community }]} />
      <Section>
        <Container>
          <TeamDirectory />
        </Container>
      </Section>
      <Section className="bg-cream/50">
        <Container>
          <SectionHeading kicker="@sccsjaguars" title={c.spotlightTitle} intro={c.spotlightIntro} />
          <ul className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
            {SPOTLIGHTS.map((s) => (
              <li key={s.url} className="w-64 shrink-0 snap-start sm:w-72">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-lg">
                  <Photo photo={s.photo} fill={false} sizes="288px" />
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section>
        <Container className="grid gap-5 lg:grid-cols-3">
          <Reveal>
            <ParentHubCard />
          </Reveal>
          <Reveal delay={0.06}>
            <MothersClubCard />
          </Reveal>
          <Reveal delay={0.12} className="flex flex-col gap-5">
            <PaletteCard />
            <AlumniCard />
          </Reveal>
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /contact ───────── */
export function ContactPage() {
  const { t, tr } = useLang();
  const C = CONTACT;
  return (
    <>
      <PageHero photo={media.campusGardens} kicker={tr(C.kicker)} title={tr(C.title)} lede={tr(C.lede)} crumbs={[{ href: "/contact", label: tr(C.kicker) }]} />
      <Section>
        <Container>
          <ul className="grid gap-5 lg:grid-cols-3">
            {C.groups.map((g, i) => (
              <Reveal as="li" key={g.title.en} delay={i * 0.07} className="rounded-2xl border border-border bg-card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">{tr(g.note)}</p>
                <h2 className="font-display mt-2 text-2xl font-semibold text-navy-900">{tr(g.title)}</h2>
                <ul className="mt-5 space-y-3">
                  {g.lines.map((l) => (
                    <li key={l.label.en} className="border-t border-border pt-3">
                      <p className="text-sm text-mist">{tr(l.label)}</p>
                      <Link href={l.href} className="text-sm font-semibold text-navy-700 hover:text-navy-900">
                        {typeof l.value === "string" ? l.value : tr(l.value)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
      <Section className="pt-0 sm:pt-0 lg:pt-0">
        <Container>
          <div className="relative isolate grid overflow-hidden rounded-3xl bg-navy-950 text-cream lg:grid-cols-2">
            <Photo photo={media.campusLawn} className="min-h-72" sizes="(min-width:1024px) 50vw, 100vw" />
            <div className="relative p-8 sm:p-12">
              <JaguarMotif className="absolute -right-8 -top-8 h-48 w-48 text-amber-400/10" />
              <h2 className="font-display text-3xl font-semibold text-white">{tr(C.visitTitle)}</h2>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  {t.footer.address}
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  <a href={SITE.phoneHref} className="hover:text-amber-400">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  <a href={`mailto:${SITE.email}`} className="hover:text-amber-400">
                    {SITE.email}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                  {t.footer.hours}
                </li>
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={buttonStyles.gold}>
                  {tr(C.directions)}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <Link href="/admissions#inquire" className={buttonStyles.outlineDark}>
                  {t.nav.visit}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

/* ───────── 404 ───────── */
export function NotFoundView() {
  const { t } = useLang();
  return (
    <section className="relative isolate flex min-h-[80svh] items-center overflow-hidden bg-navy-950 text-center text-cream">
      <Photo photo={media.historyPond} className="absolute inset-0 -z-20 opacity-25" sizes="100vw" />
      <Container className="pt-28">
        <JaguarMotif className="mx-auto h-24 w-24 text-amber-400" />
        <p className="font-display mt-6 text-7xl font-semibold text-amber-400">404</p>
        <h1 className="font-display mt-4 text-4xl font-semibold text-white sm:text-5xl">{t.page.notFoundTitle}</h1>
        <p className="mx-auto mt-4 max-w-md text-cream/75">{t.page.notFoundBody}</p>
        <Link href="/" className={cn(buttonStyles.gold, "mt-8")}>
          {t.page.notFoundCta}
        </Link>
      </Container>
    </section>
  );
}
