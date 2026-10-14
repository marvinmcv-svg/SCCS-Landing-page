"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn, span } from "@/lib/utils";
import { useStaticMotion } from "@/lib/use-static-motion";
import { useLang } from "./i18n";
import { Crest } from "./sccs-shared";

/**
 * Signature move: the SCCS crest (U.S. flag left of centre, Bolivian flag right)
 * splits along its centre line into the two diplomas, holds while both are
 * read, then the halves travel back and seal into one shield.
 */
function MiniFlag({ kind }: { kind: "us" | "bo" }) {
  return kind === "us" ? (
    <svg viewBox="0 0 30 20" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} y={i * 2.86} width="30" height="1.43" fill="#C8323A" />
      ))}
      <rect width="30" height="20" fill="none" />
      <rect width="13" height="10" fill="#3A3D8C" />
    </svg>
  ) : (
    <svg viewBox="0 0 30 20" className="h-4 w-6 shrink-0 rounded-[2px]" aria-hidden="true">
      <rect width="30" height="6.67" fill="#D52B1E" />
      <rect y="6.67" width="30" height="6.67" fill="#F4E400" />
      <rect y="13.33" width="30" height="6.67" fill="#007934" />
    </svg>
  );
}

function CredentialPanel({ kind, title, points, className }: { kind: "us" | "bo"; title: string; points: string[]; className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-white/12 bg-white/[0.06] p-5 backdrop-blur-sm sm:p-6", className)}>
      <div className="flex items-center gap-3">
        <MiniFlag kind={kind} />
        <h3 className="font-display text-lg font-semibold leading-snug text-white sm:text-xl">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2">
        {points.map((pt) => (
          <li key={pt} className="flex gap-2.5 text-[0.82rem] leading-snug text-cream/85 sm:text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CrestSplit() {
  const { t } = useLang();
  const d = t.dualDiploma;
  const reduce = useStaticMotion();
  const ref = useRef<HTMLElement>(null);
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setWide(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // 0 = sealed, 1 = fully open. Opens, holds, closes.
  const open = useTransform(p, ...span([0.1, 0.32, 0.66, 0.84], [0, 1, 1, 0]));
  const spread = wide ? 27 : 26;
  const leftX = useTransform(open, (v) => `${-v * spread}vw`);
  const rightX = useTransform(open, (v) => `${v * spread}vw`);
  const halfRotL = useTransform(open, ...span([0, 1], [0, -6]));
  const halfRotR = useTransform(open, ...span([0, 1], [0, 6]));
  const crestScale = useTransform(open, ...span([0, 1], [1, wide ? 0.78 : 0.5]));
  const crestY = useTransform(open, ...span([0, 1], ["0vh", wide ? "-6vh" : "-25vh"]));
  const panelsO = useTransform(p, ...span([0.24, 0.34, 0.6, 0.68], [0, 1, 1, 0]));
  const panelsY = useTransform(p, ...span([0.24, 0.34], [24, 0]));
  const ringScale = useTransform(p, ...span([0.83, 0.95], [0.85, 1.7]));
  const ringO = useTransform(p, ...span([0.83, 0.87, 0.96], [0, 0.85, 0]));
  const sealO = useTransform(p, ...span([0.86, 0.93], [0, 1]));
  const sealY = useTransform(p, ...span([0.86, 0.93], [20, 0]));
  const leadO = useTransform(p, ...span([0, 0.08, 0.84, 0.9], [1, 1, 1, 0]));
  // Phones: the heading yields to the open crest, which rises into its place.
  const leadMobileO = useTransform(p, ...span([0.08, 0.18], [1, 0]));

  if (reduce) {
    return (
      <section id="learning" className="scroll-mt-28 bg-navy-950 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-8">
          <h2 className="font-display text-3xl font-semibold sm:text-5xl">{d.title}</h2>
          <p className="mt-3 text-lg text-amber-400">{d.splitLead}</p>
          <Crest className="mx-auto mt-10 h-40 w-40" />
          <div className="mx-auto mt-10 grid max-w-4xl gap-4 text-left md:grid-cols-2">
            <CredentialPanel kind="us" title={d.usTitle} points={d.usPoints} />
            <CredentialPanel kind="bo" title={d.boTitle} points={d.boPoints} />
          </div>
          <p className="mx-auto mt-8 max-w-xl text-cream/80">
            {d.parallel} {d.globalBody}
          </p>
          <Link href="/learning/dual-diploma" className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-amber-400">
            {d.more} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="learning" className="relative h-[420svh] scroll-mt-28 bg-navy-950" aria-label={d.title}>
      <div className="sticky top-0 h-[100svh] overflow-hidden text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(248,167,36,0.16),transparent_60%)]" aria-hidden="true" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(rgba(255,255,255,0.9)_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />

        {/* Heading */}
        <motion.div style={{ opacity: wide ? leadO : leadMobileO }} className="absolute inset-x-0 top-[13%] px-5 text-center md:top-[14%]">
          <h2 className="font-display text-[2rem] font-semibold leading-tight sm:text-5xl">{d.title}</h2>
          <p className="mt-2 text-base text-amber-400 sm:text-lg">{d.splitLead}</p>
        </motion.div>

        {/* The crest, in two halves */}
        <motion.div className="absolute left-1/2 top-1/2 h-[min(34vh,22rem)] w-[min(34vh,22rem)] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_30px_50px_rgba(0,0,0,0.45)]" style={{ scale: crestScale, y: crestY }} aria-hidden="true">
          <motion.div className="absolute inset-0" style={{ x: leftX, rotate: halfRotL, clipPath: "inset(0 50% 0 0)" }}>
            <Crest className="h-full w-full" />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ x: rightX, rotate: halfRotR, clipPath: "inset(0 0 0 50%)" }}>
            <Crest className="h-full w-full" />
          </motion.div>
          <motion.span className="absolute inset-[-6%] rounded-full border-2 border-amber-400" style={{ scale: ringScale, opacity: ringO }} />
        </motion.div>

        {/* The two diplomas */}
        <motion.div
          style={{ opacity: panelsO, y: panelsY }}
          className="absolute inset-x-0 bottom-[6%] mx-auto grid max-w-6xl gap-3 px-4 md:bottom-auto md:top-[56%] md:grid-cols-2 md:gap-[24vw] md:px-8"
        >
          <CredentialPanel kind="us" title={d.usTitle} points={d.usPoints} />
          <CredentialPanel kind="bo" title={d.boTitle} points={d.boPoints} />
        </motion.div>
        <motion.p style={{ opacity: panelsO }} className="absolute inset-x-0 top-[48%] hidden px-6 text-center text-sm font-medium tracking-wide text-cream/70 md:block">
          {d.parallel}
        </motion.p>

        {/* Sealed */}
        <motion.div style={{ opacity: sealO, y: sealY }} className="absolute inset-x-0 bottom-[10%] px-5 text-center md:bottom-[12%]">
          <p className="font-display text-3xl font-semibold sm:text-4xl">{d.seal}</p>
          <p className="mx-auto mt-3 max-w-xl text-cream/80">{d.globalBody}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-6">
            <Link href="/learning/dual-diploma" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-100">
              {d.more} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="#journey" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-100">
              {d.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
