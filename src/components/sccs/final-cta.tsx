"use client";

import Link from "next/link";
import { media } from "@/data/media";
import { cn } from "@/lib/utils";
import { useLang } from "./i18n";
import { Container, Crest, Photo, Reveal, buttonStyles } from "./sccs-shared";

export function FinalCta() {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 py-20 text-center sm:py-28">
      <Photo photo={media.pacFlags} className="absolute inset-0 -z-20 opacity-20" sizes="100vw" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(248,167,36,0.22),transparent_60%),linear-gradient(to_bottom,rgba(20,20,58,0.85),rgba(20,20,58,0.95))]" aria-hidden="true" />
      <Container>
        <Reveal>
          <Crest className="mx-auto mb-8 h-24 w-24 drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)] sm:h-28 sm:w-28" />
        </Reveal>
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-4xl font-semibold leading-[1.1] text-white sm:text-5xl lg:text-6xl">{t.cta.title}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/80">{t.cta.subtitle}</p>
        </Reveal>
        <Reveal delay={0.2} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/admissions#inquire" className={cn(buttonStyles.gold, "h-14 px-9 text-base")}>
            {t.cta.primary}
          </Link>
          <Link href="/contact" className={cn(buttonStyles.outlineDark, "h-14 px-8 text-base")}>
            {t.cta.secondary}
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
