"use client";

import Link from "next/link";
import { ArrowRight, Award, Check } from "lucide-react";
import { media, type Photo as PhotoT } from "@/data/media";
import { CURRICULUM, DUAL_DIPLOMA, SUPPORT } from "@/data/pages";
import { PILLARS } from "@/data/nav";
import { AcceptancePosters } from "@/components/sccs/credentials";
import { useLang } from "@/components/sccs/i18n";
import { Container, Kicker, Photo, Reveal, Section, SectionHeading, buttonStyles } from "@/components/sccs/sccs-shared";
import { IconCards, PageHero, RelatedLinks, Tabs } from "@/components/sccs/page-kit";
import { DualDiplomaDiagram } from "@/components/sccs/dual-diploma";
import { DIVISION_PHOTOS } from "@/components/sccs/journey";
import { MatriculationExplorer } from "@/components/sccs/matriculation";
import { FinalCta } from "@/components/sccs/final-cta";
import { cn } from "@/lib/utils";

function useLearningCrumb() {
  const { t } = useLang();
  return { href: "/learning", label: t.nav.learning };
}

function LearningRelated({ exclude }: { exclude: string }) {
  const { tr } = useLang();
  const photos = [media.computerLabHs, media.igMath1, media.graduationPac, media.esFriends2, media.collegeFairPennant];
  const items = PILLARS[2].children.map((c, i) => ({ href: c.href, label: tr(c.label), blurb: tr(c.blurb), photo: photos[i] })).filter((c) => c.href !== exclude);
  return <RelatedLinks items={items} />;
}

/* ───────── /learning ───────── */
export function CurriculumPage() {
  const { tr } = useLang();
  const c = CURRICULUM;
  return (
    <>
      <PageHero photo={media.igMicroscope4} kicker={tr(c.kicker)} title={tr(c.title)} lede={tr(c.lede)} crumbs={[useLearningCrumb()]} />
      <Section>
        <Container>
          <SectionHeading kicker="CCSS · NGSS · AP" title={tr(c.standardsTitle)} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {c.standards.map((s, i) => (
              <Reveal as="li" key={s.title.en} delay={i * 0.05} className="rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-sm font-semibold text-crimson-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold text-navy-900">{tr(s.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{tr(s.text)}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
      <Section dark>
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo photo={media.collegeFair} className="aspect-[4/3] rounded-2xl" sizes="(min-width:1024px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker dark>SAT · AP · AP International Diploma</Kicker>
            <h2 className="font-display mt-4 text-3xl font-semibold text-white sm:text-4xl">{tr(c.edgeTitle)}</h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/75">{tr(c.edgeBody)}</p>
            <Link href="/learning/university-matriculation" className={cn(buttonStyles.gold, "mt-8")}>
              {tr({ en: "See where our graduates go", es: "Mira a dónde van nuestros graduados" })}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>
      </Section>
      <Section id="assessment">
        <Container>
          <SectionHeading kicker={tr(c.assessmentTitle)} title={tr(c.assessmentIntro)} />
          <div className="mt-10">
            <Tabs
              label={tr(c.assessmentTitle)}
              tabs={c.assessment.map((a) => ({
                id: a.id,
                label: tr(a.label),
                content: (
                  <div className="rounded-2xl border border-border bg-card p-7 sm:p-10">
                    <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{tr(a.title)}</h3>
                    <p className="mt-4 max-w-3xl text-lg leading-relaxed text-mist">{tr(a.body)}</p>
                  </div>
                ),
              }))}
            />
          </div>
        </Container>
      </Section>
      <Section className="bg-cream/50">
        <Container>
          <SectionHeading kicker={tr({ en: "Honor Roll · Grades 6–12", es: "Cuadro de Honor · 6.º a 12.º" })} title={tr(c.honorsTitle)} intro={tr(c.honorsIntro)} />
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {c.honors.map((h, i) => (
              <Reveal as="li" key={h.title.en} delay={i * 0.07} className={cn("rounded-2xl p-7", i === 0 ? "bg-navy-950 text-cream" : "border border-border bg-card")}>
                <Award className={cn("h-7 w-7", i === 0 ? "text-amber-400" : "text-crimson-600")} aria-hidden="true" />
                <h3 className={cn("font-display mt-4 text-2xl font-semibold", i === 0 ? "text-white" : "text-navy-900")}>{tr(h.title)}</h3>
                <p className={cn("mt-2 text-sm", i === 0 ? "text-cream/75" : "text-mist")}>{tr(h.text)}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-sm text-mist">{tr(c.honorsNote)}</p>
        </Container>
      </Section>
      <Section>
        <Container>
          <LearningRelated exclude="/learning" />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /learning/academic-journey ───────── */
const DIVISION_EXTRA: Record<string, { photos: PhotoT[]; cta: { en: string; es: string }; subjects: { en: string; es: string } }> = {
  es: {
    photos: [media.igMath2, media.esClassroom, media.igReadingNight5],
    cta: { en: "Schedule a private classroom observation", es: "Agenda una observación privada de clase" },
    subjects: {
      en: "Reading, Writing, Phonics, Math, Social Studies, Science, STEAM, Music, Art, Spanish, and Physical Education.",
      es: "Lectura, Escritura, Fonética, Matemáticas, Estudios Sociales, Ciencias, STEAM, Música, Arte, Lenguaje y Educación Física.",
    },
  },
  ms: {
    photos: [media.igMicroscope2, media.msClassroom, media.maker3dPrinter],
    cta: { en: "Explore our Middle School STEAM labs", es: "Explora los laboratorios STEAM de Middle School" },
    subjects: {
      en: "Common Core ELA and Mathematics, NGSS Science, Social Studies, Spanish, STEAM & Robotics, Fine Arts, and Physical Education.",
      es: "Lenguaje y Matemáticas Common Core, Ciencias NGSS, Estudios Sociales, Lenguaje (español), STEAM y Robótica, Bellas Artes y Educación Física.",
    },
  },
  hs: {
    photos: [media.computerLabHs, media.collegeFairReading, media.graduationPac],
    cta: { en: "View the University Matriculation map", es: "Ver el mapa de Matriculación Universitaria" },
    subjects: {
      en: "AP and Pre-AP courses, Innovation electives and advanced coding, NGSS lab sciences, Bolivian Bachillerato humanities, Fine Arts, and SHAPE-aligned PE.",
      es: "Cursos AP y Pre-AP, electivas de Innovación y programación avanzada, ciencias de laboratorio NGSS, humanidades del Bachillerato boliviano, Bellas Artes y Educación Física SHAPE.",
    },
  },
};

export function AcademicJourneyPage() {
  const { t, tr } = useLang();
  const j = t.journey;
  return (
    <>
      <PageHero photo={media.igMatter2} kicker={j.kicker} title={j.title} lede={j.intro} crumbs={[useLearningCrumb(), { href: "/learning/academic-journey", label: tr(PILLARS[2].children[1].label) }]}>
        <ul className="flex flex-wrap gap-2">
          {j.tabs.map((tb) => (
            <li key={tb.id}>
              <a href={`#${tb.id}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/30 px-4 text-sm text-white/90 backdrop-blur-sm hover:border-amber-400 hover:text-amber-400">
                {tb.label} <span className="text-amber-400">{tb.grades}</span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>
      {j.tabs.map((tb, i) => {
        const extra = DIVISION_EXTRA[tb.id];
        const href = tb.id === "hs" ? "/learning/university-matriculation" : tb.id === "ms" ? "/campus-life/jaguar-experience/innovation-hub" : "/admissions#inquire";
        return (
          <Section key={tb.id} id={tb.id} className={i % 2 === 1 ? "bg-cream/50" : undefined}>
            <Container>
              <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal className={cn(i % 2 === 1 && "lg:order-2")}>
                  <Photo photo={DIVISION_PHOTOS[tb.id]} className="aspect-[4/3] rounded-2xl" sizes="(min-width:1024px) 50vw, 100vw" />
                  <div className="mt-3 grid grid-cols-3 gap-3">
                    {extra.photos.map((p) => (
                      <Photo key={p.src} photo={p} className="aspect-square rounded-xl" sizes="(min-width:1024px) 16vw, 33vw" />
                    ))}
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <Kicker>
                    {tb.label} · {tb.grades}
                  </Kicker>
                  <h2 className="font-display mt-4 text-3xl font-semibold italic leading-tight text-navy-900 sm:text-4xl">{tb.tagline}</h2>
                  <p className="mt-5 text-lg leading-relaxed text-mist">{tb.body}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">{tr({ en: "Subjects", es: "Materias" })}</p>
                  <p className="mt-2 text-sm leading-relaxed text-navy-800">{tr(extra.subjects)}</p>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">{j.highlightsLabel}</p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {tb.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-sm text-navy-900">
                        <Check className="h-4 w-4 text-crimson-600" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href={href} className={buttonStyles.primary}>
                      {tr(extra.cta)}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link href="/admissions#inquire" className={buttonStyles.outline}>
                      {j.ctaLabel} {tb.label}
                    </Link>
                  </div>
                </Reveal>
              </div>
            </Container>
          </Section>
        );
      })}
      <Section>
        <Container>
          <LearningRelated exclude="/learning/academic-journey" />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /learning/dual-diploma ───────── */
export function DualDiplomaPage() {
  const { t, tr } = useLang();
  const d = t.dualDiploma;
  return (
    <>
      <PageHero photo={media.pacFlags} kicker={d.kicker} title={d.title} lede={tr(DUAL_DIPLOMA.lede)} crumbs={[useLearningCrumb(), { href: "/learning/dual-diploma", label: d.title }]} />
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="font-display text-2xl leading-snug text-navy-900 sm:text-3xl">{d.body}</p>
          </Reveal>
          <div className="mt-16">
            <DualDiplomaDiagram />
          </div>
        </Container>
      </Section>
      <Section className="bg-cream/50">
        <Container>
          <SectionHeading kicker={tr({ en: "From Grade 7", es: "Desde 7.º grado" })} title={tr(DUAL_DIPLOMA.multiTrackTitle)} intro={tr(DUAL_DIPLOMA.multiTrackBody)} />
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {DUAL_DIPLOMA.roadmap.map((r, i) => (
              <Reveal as="li" key={r.grade.en} delay={i * 0.07} className="relative rounded-2xl border border-border bg-card p-6">
                <span className="font-display text-sm text-crimson-600">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-display mt-2 text-2xl font-semibold text-navy-900">{tr(r.grade)}</p>
                <p className="mt-2 text-sm leading-relaxed text-mist">{tr(r.text)}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Photo photo={media.graduationPac} className="aspect-[4/3] rounded-2xl" sizes="(min-width:1024px) 50vw, 100vw" />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">{tr(DUAL_DIPLOMA.transferTitle)}</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist">{tr(DUAL_DIPLOMA.transferBody)}</p>
            <Link href="/contact" className={cn(buttonStyles.primary, "mt-8")}>
              {tr(DUAL_DIPLOMA.ctaRoadmap)}
            </Link>
          </Reveal>
        </Container>
      </Section>
      <Section>
        <Container>
          <LearningRelated exclude="/learning/dual-diploma" />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /learning/student-support ───────── */
export function SupportPage() {
  const { tr } = useLang();
  const s = SUPPORT;
  return (
    <>
      <PageHero photo={media.esFriends2} kicker={tr(s.kicker)} title={tr(s.title)} lede={tr(s.lede)} crumbs={[useLearningCrumb(), { href: "/learning/student-support", label: tr(s.kicker) }]} />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <Kicker>MTSS · UDL</Kicker>
            <h2 className="font-display mt-4 text-3xl font-semibold text-navy-900 sm:text-4xl">{tr(s.sstTitle)}</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist">{tr(s.sstBody)}</p>
          </Reveal>
          <IconCards cols={2} items={s.sst.map((x) => ({ title: tr(x.title), text: tr(x.text) }))} />
        </Container>
      </Section>
      <Section className="bg-navy-100/60">
        <Container>
          <SectionHeading kicker={tr({ en: "Counseling", es: "Orientación" })} title={tr({ en: "Support that grows with your child.", es: "Un apoyo que crece con tu hijo." })} />
          <div className="mt-10">
            <Tabs
              label={tr({ en: "Counseling by division", es: "Orientación por división" })}
              tabs={s.counseling.map((c) => ({
                id: c.id,
                label: tr(c.label),
                content: (
                  <div className="grid gap-8 rounded-2xl bg-white p-7 sm:p-10 lg:grid-cols-2">
                    <div>
                      <h3 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{tr(c.title)}</h3>
                      <p className="mt-4 text-lg leading-relaxed text-mist">{tr(c.body)}</p>
                    </div>
                    <ul className="space-y-3 self-center">
                      {c.points.map((p) => (
                        <li key={p.en} className="flex gap-3 text-navy-900">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100">
                            <Check className="h-3 w-3 text-crimson-600" aria-hidden="true" />
                          </span>
                          {tr(p)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ),
              }))}
            />
          </div>
        </Container>
      </Section>
      <Section>
        <Container>
          <LearningRelated exclude="/learning/student-support" />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}

/* ───────── /learning/university-matriculation ───────── */
export function MatriculationPage() {
  const { t, tr } = useLang();
  const m = t.matriculation;
  const college = SUPPORT.counseling.find((c) => c.id === "college")!;
  return (
    <>
      <PageHero photo={media.collegeFairPennant} kicker={m.kicker} title={m.title} lede={m.intro} crumbs={[useLearningCrumb(), { href: "/learning/university-matriculation", label: m.title }]} imgPosition="object-[50%_30%]" />
      <Section dark>
        <Container>
          <MatriculationExplorer />
        </Container>
      </Section>
      <Section className="bg-cream">
        <Container>
          <SectionHeading title={t.home.acceptancesTitle} intro={t.home.acceptancesIntro} />
          <div className="mt-12">
            <AcceptancePosters />
          </div>
          <Link href="/discover/school-profile#acceptances" className={cn(buttonStyles.outline, "mt-10")}>
            {t.home.acceptancesCta}
          </Link>
        </Container>
      </Section>
      <Section>
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="grid grid-cols-2 gap-3">
            <Photo photo={media.collegeFair} className="col-span-2 aspect-[16/9] rounded-2xl" sizes="(min-width:1024px) 50vw, 100vw" />
            <Photo photo={media.collegeFairFamilies} className="aspect-[4/3] rounded-2xl" sizes="25vw" />
            <Photo photo={media.collegeFairReading} className="aspect-[4/3] rounded-2xl" sizes="25vw" />
          </Reveal>
          <Reveal delay={0.1}>
            <Kicker>{tr(college.label)}</Kicker>
            <h2 className="font-display mt-4 text-3xl font-semibold text-navy-900 sm:text-4xl">{tr(college.title)}</h2>
            <p className="mt-5 text-lg leading-relaxed text-mist">{tr(college.body)}</p>
            <ul className="mt-6 space-y-3">
              {college.points.map((p) => (
                <li key={p.en} className="flex gap-3 text-navy-900">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-crimson-600" aria-hidden="true" />
                  {tr(p)}
                </li>
              ))}
            </ul>
            <Link href="/discover/school-profile" className={cn(buttonStyles.primary, "mt-8")}>
              {tr({ en: "Read the School Profile", es: "Lee el Perfil Escolar" })}
            </Link>
          </Reveal>
        </Container>
      </Section>
      <Section>
        <Container>
          <LearningRelated exclude="/learning/university-matriculation" />
        </Container>
      </Section>
      <FinalCta />
    </>
  );
}
