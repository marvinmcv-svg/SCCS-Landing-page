"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Globe2, GraduationCap, Landmark } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { media } from "@/data/media";
import { cn, EASE } from "@/lib/utils";
import { useLang } from "./i18n";
import { Container, Photo, Reveal, Section, SectionHeading, TextLink } from "./sccs-shared";

function Credential({ title, points, icon: Icon, flag }: { title: string; points: string[]; icon: typeof GraduationCap; flag: string }) {
  const [open, setOpen] = useState(false);
  const pointer = useRef<string>("mouse");
  return (
    <button
      type="button"
      aria-expanded={open}
      onPointerDown={(e) => (pointer.current = e.pointerType)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onClick={() => pointer.current !== "mouse" && setOpen((o) => !o)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      className={cn(
        "group relative w-full rounded-2xl border-2 bg-white p-6 text-left transition-[border-color,box-shadow] duration-300 sm:p-7",
        open ? "border-gold-500 shadow-[0_18px_48px_rgba(201,162,39,0.22)]" : "border-gold-500/40 shadow-[0_6px_24px_rgba(7,37,26,0.06)]",
      )}
    >
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-100 text-gold-600">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <span className="text-2xl" aria-hidden="true">
            {flag}
          </span>
          <h3 className="font-display text-xl font-semibold leading-snug text-jungle-900">{title}</h3>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            {points.map((p) => (
              <li key={p} className="flex gap-3 pt-4 text-sm text-mist">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
                {p}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </button>
  );
}

function ConvergencePaths() {
  const reduce = useReducedMotion();
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 1.4, delay, ease: EASE },
        };
  return (
    <svg viewBox="0 0 800 120" className="hidden h-28 w-full md:block" fill="none" aria-hidden="true" preserveAspectRatio="none">
      <motion.path d="M200 0 C200 70, 400 50, 400 120" stroke="#C9A227" strokeWidth="2" strokeDasharray="0" {...draw(0)} />
      <motion.path d="M600 0 C600 70, 400 50, 400 120" stroke="#C9A227" strokeWidth="2" {...draw(0.15)} />
      <circle cx="200" cy="2" r="4" fill="#C9A227" />
      <circle cx="600" cy="2" r="4" fill="#C9A227" />
    </svg>
  );
}

export function DualDiplomaDiagram() {
  const { t } = useLang();
  const d = t.dualDiploma;
  const [canHover, setCanHover] = useState(true);
  useEffect(() => setCanHover(window.matchMedia("(hover: hover)").matches), []);
  return (
    <div>
      <p className="mb-5 text-center text-xs font-medium uppercase tracking-[0.18em] text-mist">{canHover ? d.hoverHint : d.tapHint}</p>
      <div className="grid items-start gap-5 md:grid-cols-2 md:gap-8">
        <Reveal>
          <Credential title={d.usTitle} points={d.usPoints} icon={GraduationCap} flag="🇺🇸" />
        </Reveal>
        <Reveal delay={0.1}>
          <Credential title={d.boTitle} points={d.boPoints} icon={Landmark} flag="🇧🇴" />
        </Reveal>
      </div>
      <ConvergencePaths />
      <div className="mx-auto my-4 h-10 w-px bg-gold-500/60 md:hidden" aria-hidden="true" />
      <Reveal delay={0.2} className="mx-auto max-w-md text-center">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-jungle-800 text-gold-400 ring-4 ring-gold-500 ring-offset-4 ring-offset-ivory">
          <Globe2 className="h-10 w-10" aria-hidden="true" />
        </div>
        <h3 className="font-display mt-6 text-2xl font-semibold text-jungle-900">{d.globalTitle}</h3>
        <p className="mt-2 text-jungle-800">{d.globalBody}</p>
        <p className="mt-2 text-sm text-mist">{d.multiTrack}</p>
      </Reveal>
    </div>
  );
}

export function DualDiploma() {
  const { t } = useLang();
  const d = t.dualDiploma;
  return (
    <Section id="learning" className="bg-gradient-to-b from-ivory to-cream/50">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading kicker={d.kicker} title={d.title} />
            <Reveal delay={0.12}>
              <p className="mt-6 text-base leading-relaxed text-mist sm:text-lg">{d.body}</p>
            </Reveal>
            <Reveal delay={0.18} className="mt-6 flex flex-wrap gap-x-6">
              <TextLink href="/learning/dual-diploma">{d.more}</TextLink>
              <TextLink href="#journey">{d.cta}</TextLink>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="relative">
            <Photo photo={media.graduationPac} className="aspect-[4/3] rounded-2xl shadow-[0_24px_60px_rgba(7,37,26,0.18)]" sizes="(min-width:1024px) 45vw, 100vw" />
            <Photo
              photo={media.pacFlags}
              className="absolute -bottom-8 -left-4 hidden aspect-[4/3] w-44 rounded-xl border-4 border-ivory shadow-xl sm:block lg:-left-10 lg:w-56"
              sizes="240px"
            />
          </Reveal>
        </div>
        <div className="mt-20 lg:mt-24">
          <DualDiplomaDiagram />
        </div>
      </Container>
    </Section>
  );
}
