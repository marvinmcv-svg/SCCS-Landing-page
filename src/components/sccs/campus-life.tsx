"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { format, parseISO } from "date-fns";
import { EXPERIENCES, type Experience } from "@/data/experiences";
import { TRADITIONS } from "@/data/traditions";
import { sortedNews, upcomingEvents, type CampusEvent, type NewsCategory, type NewsPost } from "@/data/sccs-content";
import { cn, span } from "@/lib/utils";
import { useStaticMotion } from "@/lib/use-static-motion";
import { useLang } from "./i18n";
import { Container, Photo, Reveal, Section, SectionHeading, TextLink } from "./sccs-shared";

/* ───────── Jaguar Experience mosaic ───────── */

const MOSAIC: { slug: string; cls: string; sizes: string }[] = [
  { slug: "friendship-games", cls: "lg:col-span-4 lg:row-span-2 lg:aspect-auto", sizes: "(min-width:1024px) 66vw, 100vw" },
  { slug: "innovation-hub", cls: "lg:col-span-2", sizes: "(min-width:1024px) 33vw, 100vw" },
  { slug: "performing-arts-center", cls: "lg:col-span-2", sizes: "(min-width:1024px) 33vw, 100vw" },
  { slug: "athletics", cls: "lg:col-span-2", sizes: "(min-width:1024px) 33vw, 100vw" },
  { slug: "science-labs", cls: "lg:col-span-2", sizes: "(min-width:1024px) 33vw, 100vw" },
  { slug: "library", cls: "lg:col-span-2", sizes: "(min-width:1024px) 33vw, 100vw" },
];

export function ExperienceTile({ exp, className, sizes, big }: { exp: Experience; className?: string; sizes: string; big?: boolean }) {
  const { tr, t } = useLang();
  return (
    <Link
      href={`/campus-life/jaguar-experience/${exp.slug}`}
      className={cn("group relative isolate block aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900 focus-visible:outline-offset-4", className)}
    >
      <Photo photo={exp.hero} className="absolute inset-0 -z-10" sizes={sizes} imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/85 via-navy-950/25 to-transparent" aria-hidden="true" />
      <div className="flex h-full flex-col justify-end p-5 sm:p-6">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-amber-400">{tr(exp.note)}</p>
        <p className={cn("font-display mt-1.5 font-semibold text-white", big ? "text-3xl sm:text-4xl" : "text-xl sm:text-2xl")}>{tr(exp.title)}</p>
        {big && <p className="mt-2 max-w-md text-sm text-white/80 sm:text-base">{tr(exp.tagline)}</p>}
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white/90 transition-colors group-hover:text-amber-400">
          {t.campusLife.explore}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function ExperienceMosaic() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:grid-rows-[repeat(3,minmax(0,15rem))]">
      {MOSAIC.map((m, i) => {
        const exp = EXPERIENCES.find((e) => e.slug === m.slug)!;
        return (
          <Reveal key={m.slug} delay={i * 0.06} className={cn(i === 0 && "sm:col-span-2", m.cls)}>
            <ExperienceTile exp={exp} sizes={m.sizes} big={i === 0} className={cn("h-full lg:aspect-auto", i === 0 && "sm:aspect-[16/9]")} />
          </Reveal>
        );
      })}
    </div>
  );
}

/* ───────── Beyond the Classroom chips ───────── */

export function BeyondChips() {
  const { tr } = useLang();
  const reduce = useReducedMotion();
  return (
    <ul className="flex flex-wrap gap-2.5">
      {TRADITIONS.map((tr_, i) => (
        <motion.li
          key={tr_.slug}
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: i * 0.03, duration: 0.4 }}
        >
          <Link
            href={`/campus-life/beyond-the-classroom/${tr_.slug}`}
            className="pressable group inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white px-4 text-sm font-medium text-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-500 hover:shadow-[0_8px_24px_rgba(248,167,36,0.22)]"
          >
            {tr(tr_.title)}
            <ArrowUpRight className="h-3.5 w-3.5 text-crimson-600 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}

/* ───────── Events ───────── */

const DIVISION_CHIP: Record<CampusEvent["division"], string> = {
  ES: "bg-navy-100 text-navy-800",
  MS: "bg-amber-100 text-crimson-600",
  HS: "bg-navy-800 text-white",
  COMMUNITY: "bg-cream text-navy-900",
};

export function EventCard({ e }: { e: CampusEvent }) {
  const { tr, dateLocale, t } = useLang();
  const d = parseISO(e.date);
  const divisionLabel = e.division === "COMMUNITY" ? t.campusLife.communityLabel : t.community.divisions[e.division];
  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-shadow duration-300 hover:shadow-[0_16px_40px_rgba(20,20,58,0.08)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex w-16 flex-col items-center rounded-xl border border-border py-2">
          <span className="font-display text-2xl font-semibold leading-none text-navy-900">{format(d, "d", { locale: dateLocale })}</span>
          <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-widest text-crimson-600">{format(d, "MMM", { locale: dateLocale }).replace(".", "").toUpperCase()}</span>
        </div>
        <span className={cn("rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider", DIVISION_CHIP[e.division])}>{divisionLabel}</span>
      </div>
      <p className="mt-3 text-xs capitalize text-mist">{format(d, "EEEE", { locale: dateLocale })}</p>
      <h3 className="mt-1 font-semibold leading-snug text-navy-900">{tr(e.title)}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{tr(e.desc)}</p>
      <Link href={e.href} className="group mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-800" aria-label={`${t.campusLife.addToCalendar}: ${tr(e.title)}`}>
        {t.campusLife.addToCalendar}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </article>
  );
}

export function EventsGrid({ limit = 8 }: { limit?: number }) {
  const events = upcomingEvents().slice(0, limit);
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {events.map((e, i) => (
        <Reveal as="li" key={e.date + e.title.en} delay={(i % 4) * 0.06}>
          <EventCard e={e} />
        </Reveal>
      ))}
    </ul>
  );
}

/* ───────── News ───────── */

export const CATEGORY_CHIP: Record<NewsCategory, string> = {
  ACADEMICS: "bg-navy-100 text-navy-800",
  ARTS: "bg-amber-100 text-crimson-600",
  ATHLETICS: "bg-navy-800 text-white",
  COMMUNITY: "bg-cream text-navy-900",
};

export const CATEGORY_LABEL: Record<NewsCategory, { en: string; es: string }> = {
  ACADEMICS: { en: "Academics", es: "Académico" },
  ARTS: { en: "Arts", es: "Artes" },
  ATHLETICS: { en: "Athletics", es: "Deportes" },
  COMMUNITY: { en: "Community", es: "Comunidad" },
};

export function NewsCard({ post, sizes = "(min-width:1024px) 33vw, 100vw" }: { post: NewsPost; sizes?: string }) {
  const { tr, dateLocale, t } = useLang();
  return (
    <Link href={`/news/${post.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow duration-300 hover:shadow-[0_20px_48px_rgba(20,20,58,0.1)]">
      <Photo photo={post.image} className="aspect-[16/10]" sizes={sizes} imgClassName="transition-transform duration-700 group-hover:scale-105" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3">
          <span className={cn("rounded-full px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider", CATEGORY_CHIP[post.category])}>{tr(CATEGORY_LABEL[post.category])}</span>
          <time dateTime={post.date} className="text-xs text-mist">
            {format(parseISO(post.date), "MMMM d, yyyy", { locale: dateLocale })}
          </time>
        </div>
        <h3 className="font-display mt-3 text-xl font-semibold leading-snug text-navy-900">{tr(post.title)}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{tr(post.excerpt)}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-600 group-hover:text-navy-800">
          {t.campusLife.readMore}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function NewsRow({ post }: { post: NewsPost }) {
  const { tr, dateLocale } = useLang();
  return (
    <Link href={`/news/${post.slug}`} className="group flex items-center gap-4 rounded-2xl p-2 transition-colors hover:bg-cream">
      <Photo photo={post.image} className="aspect-square w-20 shrink-0 rounded-xl" sizes="80px" />
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className={cn("rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider", CATEGORY_CHIP[post.category])}>{tr(CATEGORY_LABEL[post.category])}</span>
          <time dateTime={post.date} className="text-xs text-mist">
            {format(parseISO(post.date), "MMMM d, yyyy", { locale: dateLocale })}
          </time>
        </div>
        <p className="mt-1 font-semibold leading-snug text-navy-900 group-hover:text-navy-600">{tr(post.title)}</p>
      </div>
    </Link>
  );
}

export function NewsPreview() {
  const news = sortedNews().slice(0, 6);
  // Three large cards (featured first), the rest as compact rows.
  const big = [...news.filter((n) => n.featured), ...news.filter((n) => !n.featured)].slice(0, 3);
  const rows = news.filter((n) => !big.includes(n)).slice(0, 3);
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {big.map((n, i) => (
        <Reveal key={n.slug} delay={i * 0.06}>
          <NewsCard post={n} />
        </Reveal>
      ))}
      <ul className="grid gap-2 sm:grid-cols-3 lg:col-span-3">
        {rows.map((n) => (
          <li key={n.slug}>
            <NewsRow post={n} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CampusLife() {
  const { t } = useLang();
  const c = t.campusLife;
  return (
    <Section id="campus-life">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading kicker={c.kicker} title={c.title} intro={c.intro} />
          <TextLink href="/campus-life/jaguar-experience">{c.exploreAll}</TextLink>
        </div>
        <div className="mt-12">
          <ExperienceMosaic />
        </div>

        <div className="mt-20 grid gap-8 rounded-3xl bg-cream/70 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{c.beyondTitle}</h3>
            <p className="mt-3 text-mist">{c.beyondIntro}</p>
            <TextLink href="/campus-life/beyond-the-classroom" className="mt-3">
              {c.beyondCta}
            </TextLink>
          </div>
          <div className="lg:col-span-8 lg:pt-1">
            <BeyondChips />
          </div>
        </div>

        <div id="events" className="mt-20 scroll-mt-28">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{c.eventsTitle}</h3>
            <p className="text-mist">{c.eventsIntro}</p>
          </div>
          <div className="mt-8">
            <EventsGrid />
          </div>
        </div>

        <div className="mt-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{c.newsTitle}</h3>
              <p className="mt-2 text-mist">{c.newsIntro}</p>
            </div>
            <TextLink href="/news">{c.allNews}</TextLink>
          </div>
          <div className="mt-8">
            <NewsPreview />
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ───────── Jaguar Experience pan rail (home) ───────── */

export function ExperienceRail() {
  const { t, tr } = useLang();
  const c = t.campusLife;
  const reduce = useStaticMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      const rail = railRef.current;
      if (!rail) return;
      setTravel(Math.max(0, rail.scrollWidth - window.innerWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (railRef.current) ro.observe(railRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(p, ...span([0.04, 0.96], [0, -travel]));

  const cards = (
    <>
      <div className="flex w-[82vw] shrink-0 flex-col justify-center pr-6 sm:w-[26rem]">
        <h2 className="font-display text-4xl font-semibold leading-[1.05] text-navy-900 sm:text-5xl">{c.title}</h2>
        <p className="mt-5 max-w-sm text-base leading-relaxed text-mist sm:text-lg">{c.intro}</p>
      </div>
      {EXPERIENCES.map((e) => (
        <Link
          key={e.slug}
          href={`/campus-life/jaguar-experience/${e.slug}`}
          className="group relative isolate block h-[62svh] max-h-[36rem] w-[78vw] shrink-0 overflow-hidden rounded-3xl bg-navy-900 sm:w-[24rem] lg:w-[28rem]"
        >
          <Photo photo={e.hero} className="absolute inset-0 -z-10" sizes="(min-width:1024px) 28rem, 78vw" imgClassName="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" aria-hidden="true" />
          <div className="flex h-full flex-col justify-end p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">{tr(e.note)}</p>
            <p className="font-display mt-2 text-3xl font-semibold leading-tight text-white">{tr(e.title)}</p>
            <p className="mt-2 text-sm text-white/80">{tr(e.tagline)}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-amber-400">
              {c.explore}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
      <div className="flex w-[70vw] shrink-0 flex-col justify-center pl-4 sm:w-[22rem]">
        <p className="font-display text-2xl leading-snug text-navy-900">{c.beyondIntro}</p>
        <TextLink href="/campus-life/jaguar-experience" className="mt-4">
          {c.exploreAll}
        </TextLink>
      </div>
    </>
  );

  if (reduce) {
    return (
      <section id="campus-life" className="scroll-mt-28 py-16 sm:py-20">
        <div ref={railRef} className="flex snap-x snap-proximity gap-5 overflow-x-auto px-5 pb-4 sm:px-8 [&>*]:snap-start">
          {cards}
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="campus-life" className="relative scroll-mt-28" style={{ height: `calc(100svh + ${travel}px)` }}>
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div ref={railRef} style={{ x }} className="flex items-center gap-5 px-5 will-change-transform sm:px-8 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {cards}
        </motion.div>
      </div>
    </section>
  );
}

/** Home: what follows the rail. Traditions, the calendar and the newsroom, in flow. */
export function CampusLifeMore() {
  const { t } = useLang();
  const c = t.campusLife;
  return (
    <Section className="pt-0 sm:pt-4 lg:pt-6">
      <Container>
        <div className="grid gap-8 rounded-3xl bg-cream/70 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{c.beyondTitle}</h3>
            <p className="mt-3 text-mist">{c.beyondIntro}</p>
            <TextLink href="/campus-life/beyond-the-classroom" className="mt-3">
              {c.beyondCta}
            </TextLink>
          </div>
          <div className="lg:col-span-8 lg:pt-1">
            <BeyondChips />
          </div>
        </div>
        <div id="events" className="mt-20 scroll-mt-28">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{c.eventsTitle}</h3>
            <p className="text-mist">{c.eventsIntro}</p>
          </div>
          <div className="mt-8">
            <EventsGrid />
          </div>
        </div>
        <div className="mt-20">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{c.newsTitle}</h3>
              <p className="mt-2 text-mist">{c.newsIntro}</p>
            </div>
            <TextLink href="/news">{c.allNews}</TextLink>
          </div>
          <div className="mt-8">
            <NewsPreview />
          </div>
        </div>
      </Container>
    </Section>
  );
}
