"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { media } from "@/data/media";
import { span } from "@/lib/utils";
import { useStaticMotion } from "@/lib/use-static-motion";
import { useLang } from "./i18n";
import { Photo } from "./sccs-shared";

const NOW = new Date().getFullYear();

/**
 * A cue window in act progress: fade + rise in, plateau, fade out (scroll-craft cue contract).
 * The first cue is already on stage when the act pins; the last one stays as the act releases.
 */
function useCue(p: MotionValue<number>, from: number, to: number, edge?: "first" | "last") {
  const ramp = (to - from) * 0.25;
  const opacity = useTransform(
    p,
    ...span([from, from + ramp, to - ramp, to], edge === "first" ? [1, 1, 1, 0] : edge === "last" ? [0, 1, 1, 1] : [0, 1, 1, 0]),
  );
  const y = useTransform(p, ...span([from, from + ramp], edge === "first" ? [0, 0] : [28, 0]));
  return { opacity, y };
}

export function Founding() {
  const { t } = useLang();
  const f = t.founding;
  const reduce = useStaticMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const year = useTransform(p, ...span([0.04, 0.82], [1959, NOW]), { clamp: true });
  const yearText = useTransform(year, (v) => String(Math.round(v)));
  const thenO = useTransform(p, ...span([0.5, 0.78], [1, 0]));
  const nowO = useTransform(p, ...span([0.5, 0.78], [0, 1]));
  const zoom = useTransform(p, ...span([0, 1], [1.08, 1]));
  const l1 = useCue(p, 0, 0.36, "first");
  const l2 = useCue(p, 0.3, 0.66);
  const l3 = useCue(p, 0.62, 1, "last");
  const cues = [l1, l2, l3];

  if (reduce) {
    return (
      <section id="discover" aria-label={f.aria} className="relative isolate scroll-mt-28 overflow-hidden bg-navy-950 py-24 text-white">
        <Photo photo={media.historySoccer} className="absolute inset-0 -z-20 opacity-40" sizes="100vw" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/30" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="font-display text-7xl font-semibold text-amber-400">1959</p>
          <div className="mt-8 max-w-2xl space-y-6">
            {f.lines.map((l) => (
              <p key={l} className="font-display text-2xl leading-snug sm:text-3xl">
                {l}
              </p>
            ))}
          </div>
          <Link href="/discover/history" className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-amber-400">
            {f.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} id="discover" aria-label={f.aria} className="relative h-[300svh] scroll-mt-28 bg-navy-950">
      <div className="sticky top-0 h-[100svh] overflow-hidden text-white">
        {/* Ground: the same campus, then and now */}
        <motion.div className="absolute inset-0" style={{ scale: zoom }}>
          <motion.div className="absolute inset-0" style={{ opacity: thenO }}>
            <Photo photo={media.historySoccer} sizes="100vw" className="absolute inset-0" imgClassName="object-[35%_50%]" />
          </motion.div>
          <motion.div className="absolute inset-0" style={{ opacity: nowO }}>
            <Photo photo={media.campusLawn} sizes="100vw" className="absolute inset-0" imgClassName="object-[60%_50%]" />
          </motion.div>
        </motion.div>
        {/* Column scrim on the copy side only (band on phones) */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,20,58,0.95)_0%,rgba(20,20,58,0.75)_45%,rgba(20,20,58,0.15)_75%)] md:bg-[linear-gradient(90deg,rgba(20,20,58,0.94)_0%,rgba(20,20,58,0.8)_42%,rgba(20,20,58,0.1)_72%)]"
          aria-hidden="true"
        />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-20 sm:px-8 md:justify-center md:pb-0">
          <motion.p className="font-display text-[5.5rem] font-semibold leading-none tracking-[-0.04em] text-amber-400 tabular-nums sm:text-[8rem] lg:text-[10rem]" aria-hidden="true">
            {yearText}
          </motion.p>
          <div className="relative mt-6 h-[11rem] max-w-xl sm:h-[10rem]" aria-hidden="true">
            {f.lines.map((l, i) => (
              <motion.p
                key={l}
                style={cues[i]}
                className="font-display absolute inset-x-0 top-0 text-pretty text-[1.65rem] leading-snug sm:text-[2.1rem]"
              >
                {l}
              </motion.p>
            ))}
          </div>
          <motion.div style={{ opacity: l3.opacity }}>
            <Link href="/discover/history" className="inline-flex min-h-11 items-center gap-2 font-semibold text-amber-400 hover:text-amber-100">
              {f.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
        {/* Screen readers get the whole story at once */}
        <div className="sr-only">
          {f.lines.map((l) => (
            <p key={l}>{l}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
