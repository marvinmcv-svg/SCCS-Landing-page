"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { HERO_SLIDES } from "@/data/home";
import { cn } from "@/lib/utils";
import { useLang } from "../sccs/i18n";
import { buttonStyles } from "../sccs/sccs-shared";
import { EASE_OUT, Words, gsap, useGSAP } from "./motion";

const SLIDE_SECONDS = 7;

/**
 * Full-bleed slideshow at the photographs' own brightness. The only darkening is a
 * scrim where the words sit (bottom-left) and a short band under the navigation.
 */
export function HomeHero() {
  const { t, tr } = useLang();
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const slides = HERO_SLIDES;

  // Entrance: words rise, then the line, then the actions.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: EASE_OUT } });
        tl.from("[data-word]", { yPercent: 115, duration: 1.2, stagger: 0.06 }, 0.2)
          .from("[data-hero-rise]", { y: 24, autoAlpha: 0, duration: 1, stagger: 0.1 }, 0.75)
          .from("[data-hero-controls]", { autoAlpha: 0, duration: 1 }, 1.1);
        // As the page scrolls away, the picture sinks and the words lift off.
        gsap.to("[data-hero-media]", { yPercent: 14, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
        gsap.to("[data-hero-copy]", { y: -60, autoAlpha: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "70% top", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  // Slide change: crossfade, a slow pull-back on the incoming photo, and the timer bar.
  useGSAP(
    () => {
      const frames = gsap.utils.toArray<HTMLElement>("[data-slide]");
      const bars = gsap.utils.toArray<HTMLElement>("[data-bar]");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      frames.forEach((f, i) => gsap.to(f, { autoAlpha: i === index ? 1 : 0, duration: reduce ? 0 : 1.4, ease: "power2.inOut" }));
      bars.forEach((b, i) => gsap.set(b, { scaleX: i < index ? 1 : 0 }));
      if (reduce) {
        gsap.set(bars[index], { scaleX: 1 });
        return;
      }
      const img = frames[index]?.querySelector("img");
      if (img) gsap.fromTo(img, { scale: 1.1 }, { scale: 1, duration: SLIDE_SECONDS + 1.5, ease: "none" });
      gsap.fromTo(
        bars[index],
        { scaleX: 0 },
        { scaleX: 1, duration: SLIDE_SECONDS, ease: "none", onComplete: () => setIndex((i) => (i + 1) % slides.length) },
      );
    },
    { scope: root, dependencies: [index, slides.length], revertOnUpdate: true },
  );

  return (
    <section ref={root} id="top" className="relative isolate flex h-[100svh] min-h-[38rem] items-end overflow-hidden bg-navy-950">
      <div data-hero-media className="absolute inset-0 -z-20">
        {slides.map((s, i) => (
          <div key={s.photo.src + i} data-slide className={cn("absolute inset-0", i !== 0 && "invisible opacity-0")}>
            <Image
              src={s.photo.src}
              alt={i === index ? tr(s.photo.alt) : ""}
              fill
              priority={i === 0}
              loading={i === 0 ? undefined : "eager"}
              sizes="100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
      {/* Scrims: a short band under the navigation, and a soft pool of shade behind the words */}
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy-950/55 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_90%_75%_at_0%_100%,rgba(20,20,58,0.82),rgba(20,20,58,0.42)_45%,transparent_72%)]" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-[90rem] flex-col gap-10 px-5 pb-12 sm:px-8 sm:pb-16 lg:flex-row lg:items-end lg:justify-between lg:px-12">
        <div data-hero-copy className="max-w-[68rem]">
          <h1 className="font-display text-balance text-[3rem] font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-7xl lg:text-[5.75rem] xl:text-[6.25rem]">
            <Words text={t.hero.title} />
          </h1>
          <p data-hero-rise className="mt-6 text-xl font-medium text-white/90 sm:text-2xl">
            {t.hero.sub}
          </p>
          <div data-hero-rise className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/admissions#inquire" className={cn(buttonStyles.gold, "h-14 px-9 text-base")}>
              {t.hero.ctaPrimary}
            </Link>
            <Link href="/admissions#inquire" className={cn(buttonStyles.glass, "h-14 px-8 text-base")}>
              {t.hero.ctaSecondary}
            </Link>
          </div>
        </div>

        <div data-hero-controls className="flex items-center gap-4 lg:w-72 lg:flex-col lg:items-stretch">
          <p className="hidden text-sm font-medium text-white/85 sm:block lg:text-right" aria-live="polite">
            {tr(slides[index].caption)}
          </p>
          <div className="flex flex-1 gap-2">
            {slides.map((s, i) => (
              <button
                key={s.photo.src + i}
                type="button"
                onClick={() => setIndex(i)}
                className="group relative h-11 flex-1"
                aria-label={tr(s.caption)}
                aria-current={i === index}
              >
                <span className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full bg-white/30 transition-colors group-hover:bg-white/50">
                  <span data-bar className="absolute inset-0 origin-left scale-x-0 rounded-full bg-white" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
