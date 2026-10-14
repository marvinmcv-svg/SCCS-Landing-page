"use client";

import Link from "next/link";
import { Compass, Cpu, HeartHandshake, Languages, Shield, ShieldCheck, Smile, Stethoscope, Users } from "lucide-react";
import { media } from "@/data/media";
import { useLang } from "./i18n";
import { Container, JaguarMotif, Kicker, Photo, Reveal, Section, SectionHeading, TextLink } from "./sccs-shared";

const LEARNER_ICONS = [Languages, Compass, Cpu, Shield];
const SAFETY_ICONS = [ShieldCheck, HeartHandshake, Smile, Stethoscope];

export function MissionValues() {
  const { t } = useLang();
  const d = t.discover;
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <Reveal className="rounded-2xl border border-border bg-card p-7 lg:p-8">
        <h3 className="font-display text-2xl font-semibold text-jungle-900">{d.missionTitle}</h3>
        <p className="mt-4 leading-relaxed text-mist">{d.mission}</p>
      </Reveal>
      <Reveal delay={0.08} className="rounded-2xl border border-border bg-card p-7 lg:p-8">
        <h3 className="font-display text-2xl font-semibold text-jungle-900">{d.visionTitle}</h3>
        <p className="mt-4 leading-relaxed text-mist">{d.vision}</p>
      </Reveal>
      <Reveal delay={0.16} className="rounded-2xl border border-border bg-card p-7 lg:p-8">
        <h3 className="font-display text-2xl font-semibold text-jungle-900">{d.valuesTitle}</h3>
        <ul className="mt-4 space-y-3">
          {d.values.map((v) => (
            <li key={v.name}>
              <p className="font-semibold text-jungle-800">{v.name}</p>
              <p className="text-sm text-mist">{v.line}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export function LearnerProfile() {
  const { t } = useLang();
  const d = t.discover;
  return (
    <Reveal className="overflow-hidden rounded-3xl bg-jungle-100">
      <div className="grid lg:grid-cols-[1fr_1.4fr]">
        <Photo photo={media.esFriends2} className="min-h-64 lg:min-h-full" sizes="(min-width:1024px) 40vw, 100vw" />
        <div className="p-7 sm:p-10">
          <Kicker>{d.learnerTitle}</Kicker>
          <p className="font-display mt-4 text-2xl font-semibold text-jungle-900 sm:text-3xl">{d.learnerIntro}</p>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {d.learner.map((l, i) => {
              const Icon = LEARNER_ICONS[i];
              return (
                <li key={l.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-jungle-800 text-gold-400">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-jungle-900">{l.title}</p>
                    <p className="mt-1 text-sm text-mist">{l.line}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export function JaguarSpirit() {
  const { t } = useLang();
  return (
    <Reveal className="relative isolate overflow-hidden rounded-3xl bg-jungle-950 px-7 py-12 text-cream sm:px-12 sm:py-16">
      <Photo photo={media.fgCheer} className="absolute inset-0 -z-20 opacity-30" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-jungle-950 via-jungle-950/90 to-jungle-950/40" aria-hidden="true" />
      <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
        <JaguarMotif className="h-28 w-28 text-gold-400 sm:h-40 sm:w-40" />
        <div>
          <Kicker dark>{t.discover.jaguarKicker}</Kicker>
          <h3 className="font-display mt-4 text-3xl font-semibold text-white sm:text-4xl">{t.discover.jaguarTitle}</h3>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-cream/80">{t.discover.jaguarBody}</p>
        </div>
      </div>
    </Reveal>
  );
}

export function Timeline() {
  const { t } = useLang();
  const d = t.discover;
  return (
    <div>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h3 className="font-display text-2xl font-semibold text-jungle-900 sm:text-3xl">{d.timelineTitle}</h3>
          <p className="mt-2 text-mist">{d.timelineIntro}</p>
        </div>
        <TextLink href="/discover/history">{d.timelineCta}</TextLink>
      </div>
      <ol className="relative mt-10 grid gap-8 border-l border-gold-500/40 pl-7 lg:grid-cols-5 lg:gap-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8">
        {d.timeline.map((m, i) => (
          <Reveal as="li" key={m.year} delay={i * 0.08} className="relative">
            <span
              className="absolute -left-[2.15rem] top-1.5 h-3 w-3 rounded-full border-2 border-ivory bg-gold-500 ring-4 ring-gold-500/20 lg:-top-[2.45rem] lg:left-0"
              aria-hidden="true"
            />
            <p className="font-display text-3xl font-semibold text-gold-600">{m.year}</p>
            <p className="mt-2 font-semibold text-jungle-900">{m.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-mist">{m.text}</p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function SafetyWellness({ withCta = true }: { withCta?: boolean }) {
  const { t } = useLang();
  const d = t.discover;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
      <Reveal className="relative isolate min-h-[22rem] overflow-hidden rounded-3xl">
        <Photo photo={media.esLunchTrio} className="absolute inset-0 -z-10" sizes="(min-width:1024px) 50vw, 100vw" imgClassName="object-[50%_70%]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-jungle-950/90 via-jungle-950/30 to-transparent" aria-hidden="true" />
        <div className="flex h-full flex-col justify-end p-7 sm:p-10">
          <Kicker dark>{d.safetyTitle}</Kicker>
          <p className="font-display mt-4 max-w-md text-3xl font-semibold leading-tight text-white sm:text-4xl">{d.safetyIntro}</p>
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {d.safety.map((s, i) => {
          const Icon = SAFETY_ICONS[i];
          return (
            <Reveal key={s.title} delay={i * 0.07} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-jungle-100 text-jungle-800">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h4 className="mt-4 font-semibold text-jungle-900">{s.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-mist">{s.text}</p>
            </Reveal>
          );
        })}
        {withCta && (
          <div className="sm:col-span-2">
            <TextLink href="/discover/safety-wellness">{d.safetyCta}</TextLink>
          </div>
        )}
      </div>
    </div>
  );
}

export function Discover() {
  const { t } = useLang();
  const d = t.discover;
  return (
    <Section id="discover">
      <Container>
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading kicker={d.kicker} title={d.title} intro={d.intro} />
          <Reveal delay={0.1} className="grid grid-cols-5 gap-3">
            <Photo photo={media.campusLawn} className="col-span-3 aspect-[4/5] rounded-2xl" sizes="(min-width:1024px) 25vw, 60vw" />
            <div className="col-span-2 flex flex-col gap-3">
              <Photo photo={media.historyHalloween} className="aspect-square rounded-2xl" sizes="(min-width:1024px) 15vw, 40vw" imgClassName="object-[20%_50%]" />
              <Link href="/discover" className="flex flex-1 flex-col justify-end rounded-2xl bg-jungle-800 p-4 text-ivory transition-colors hover:bg-jungle-700">
                <Users className="h-5 w-5 text-gold-400" aria-hidden="true" />
                <span className="mt-2 text-sm font-semibold leading-snug">{d.advantageCta}</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-24">
          <MissionValues />
          <LearnerProfile />
          <JaguarSpirit />
          <Timeline />
          <div>
            <SafetyWellness />
          </div>
        </div>
      </Container>
    </Section>
  );
}
