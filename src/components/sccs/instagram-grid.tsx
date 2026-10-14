"use client";

import { INSTAGRAM_POSTS } from "@/data/sccs-content";
import { SITE } from "@/lib/site";
import { useLang } from "./i18n";
import { Container, Photo, Reveal, buttonStyles } from "./sccs-shared";
import { InstagramGlyph } from "./footer";

export function InstagramGrid() {
  const { t, tr } = useLang();
  const c = t.campusLife;
  return (
    <section className="border-y border-border bg-cream/50 py-16 sm:py-20" aria-labelledby="ig-title">
      <Container>
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 id="ig-title" className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
              {c.followTitle}
            </h2>
            <p className="mt-2 text-mist">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-crimson-600 hover:text-amber-500">
                {c.followHandle}
              </a>{" "}
              · {c.followCaption}
            </p>
          </div>
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={buttonStyles.outline}>
            <InstagramGlyph className="h-4 w-4" />
            {c.followCta}
          </a>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {INSTAGRAM_POSTS.map((p, i) => (
            <Reveal as="li" key={p.photo.src} delay={(i % 4) * 0.05}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="group relative block aspect-square overflow-hidden rounded-2xl" aria-label={`${tr(p.caption)} — ${t.page.viewOnInstagram}`}>
                <Photo photo={p.photo} className="absolute inset-0" sizes="(min-width:1024px) 25vw, 50vw" imgClassName="transition-transform duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy-950/60 p-4 text-center text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <InstagramGlyph className="h-7 w-7" />
                  {tr(p.caption)}
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
