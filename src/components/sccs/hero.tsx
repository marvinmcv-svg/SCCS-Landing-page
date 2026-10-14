"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { media } from "@/data/media";
import { cn, EASE, scrollToId } from "@/lib/utils";
import { useLang } from "./i18n";
import { buttonStyles } from "./sccs-shared";

const SLIDES = [media.campusGardens, media.graduationPac, media.fgPepRally];
const SLIDE_MS = 7000;

export function Hero() {
  const { t, tr } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const overlay = useTransform(scrollYProgress, [0, 1], [0.72, 0.94]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay, ease: EASE } };

  return (
    <section ref={ref} id="top" className="relative flex min-h-[100svh] items-center overflow-hidden bg-navy-950">
      <div className="absolute inset-0" aria-hidden="true">
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <Image
              src={SLIDES[index].src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className={cn("object-cover", !reduce && "sccs-kenburns")}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/55 to-navy-950/85"
        style={{ opacity: reduce ? 0.8 : overlay }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy-800/25 mix-blend-multiply" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(248,167,36,0.18),transparent_55%)]" aria-hidden="true" />

      <motion.div style={reduce ? undefined : { y, opacity: fade }} className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-36 sm:px-8 lg:pb-32 lg:pt-40">
        <motion.p {...enter(0.15)} className="flex max-w-3xl items-start gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-amber-400 sm:items-center sm:text-xs">
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
          {t.hero.badge}
        </motion.p>
        <motion.h1 {...enter(0.3)} className="font-display mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
          {t.hero.title}
        </motion.h1>
        <motion.p {...enter(0.5)} className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl">
          {t.hero.sub}
        </motion.p>
        <motion.div {...enter(0.68)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link href="/admissions#inquire" className={cn(buttonStyles.gold, "h-14 px-9 text-base")}>
            {t.hero.ctaPrimary}
          </Link>
          <Link href="/admissions#inquire" className={cn(buttonStyles.outlineDark, "h-14 px-8 text-base")}>
            {t.hero.ctaSecondary}
          </Link>
        </motion.div>
        <motion.ul {...enter(0.85)} className="mt-10 flex flex-wrap gap-2.5">
          {t.hero.credentials.map((c) => (
            <li key={c} className="inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-navy-950/30 px-3.5 py-1.5 text-xs font-medium text-amber-100 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
              {c}
            </li>
          ))}
        </motion.ul>
      </motion.div>

      {/* Slide indicator */}
      <div className="absolute bottom-8 right-5 z-10 hidden items-center gap-4 sm:right-8 md:flex" aria-hidden="true">
        <span className="text-[0.68rem] uppercase tracking-[0.2em] text-white/60">{t.hero.slides[index]}</span>
        <div className="flex gap-1.5">
          {SLIDES.map((s, i) => (
            <span key={s.src} className={cn("h-0.5 rounded-full transition-all duration-700", i === index ? "w-8 bg-amber-400" : "w-3 bg-white/35")} />
          ))}
        </div>
      </div>
      <span className="sr-only">{tr(SLIDES[index].alt)}</span>

      <button
        type="button"
        onClick={() => scrollToId("stats")}
        className="absolute bottom-7 left-1/2 z-10 flex min-h-11 -translate-x-1/2 flex-col items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white/70 hover:text-amber-400"
      >
        {t.hero.scrollCue}
        <ChevronDown className="sccs-scroll-cue h-5 w-5" aria-hidden="true" />
      </button>
    </section>
  );
}
