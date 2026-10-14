"use client";

import { useLang } from "./i18n";
import { Container, CountUp, Reveal } from "./sccs-shared";

export function StatBand() {
  const { t } = useLang();
  return (
    <section id="stats" className="scroll-mt-28 border-b border-border bg-cream/60">
      <Container className="grid grid-cols-2 gap-y-10 py-14 lg:grid-cols-4 lg:py-16">
        {t.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="flex flex-col items-center px-2 text-center">
            <p className="font-display text-5xl font-semibold text-crimson-600 sm:text-6xl">
              <CountUp value={s.value} />
              <span className="text-amber-500">{s.suffix}</span>
            </p>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.14em] text-navy-900 sm:text-sm">{s.label}</p>
            <p className="mt-1 text-xs text-mist">{s.note}</p>
          </Reveal>
        ))}
      </Container>
    </section>
  );
}
