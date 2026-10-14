"use client";

import Link from "next/link";
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { media } from "@/data/media";
import { cn, EASE, span } from "@/lib/utils";
import { useStaticMotion } from "@/lib/use-static-motion";
import { useLang } from "./i18n";
import { Crest, Photo, buttonStyles } from "./sccs-shared";

/**
 * Layered hero (scroll-craft "hero depth"): planes built from real SCCS
 * photography move at different rates. Far: the campus gardens. Mid: two
 * photo plates (commencement, Friendship Games). Near: the crest. Copy rides
 * at 1x between the planes. Pointer adds a few pixels of lean on fine pointers.
 */
function usePointerLean() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth - 0.5);
      y.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);
  return { sx, sy };
}

function useLean(v: MotionValue<number>, px: number) {
  return useTransform(v, (n) => n * px);
}

export function Hero() {
  const { t } = useLang();
  const reduce = useStaticMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const { sx, sy } = usePointerLean();
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const set = () => setWide(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  // Scroll rates: far plane slowest, near plane fastest; copy holds until the exit.
  const farY = useTransform(p, ...span([0, 1], ["0%", "-8%"]));
  const farScale = useTransform(p, ...span([0, 1], [1.12, 1.02]));
  const plateAY = useTransform(p, ...span([0, 1], [0, -260]));
  const plateBY = useTransform(p, ...span([0, 1], [0, -420]));
  const plateBRot = useTransform(p, ...span([0, 1], [4, -2]));
  const crestY = useTransform(p, ...span([0, 1], [0, wide ? -620 : -120]));
  const crestO = useTransform(p, ...span([0, 0.12, 0.3], [1, 1, wide ? 1 : 0]));
  const crestRot = useTransform(p, ...span([0, 1], [-8, 6]));
  const copyY = useTransform(p, ...span([0.55, 1], [0, -80]));
  const copyO = useTransform(p, ...span([0.6, 0.95], [1, 0]));
  const scrim = useTransform(p, ...span([0, 1], [0.85, 1]));

  const farLX = useLean(sx, -10);
  const farLY = useLean(sy, -8);
  const midLX = useLean(sx, -22);
  const midLY = useLean(sy, -16);
  const nearLX = useLean(sx, -38);
  const nearLY = useLean(sy, -26);

  const enter = (delay: number) => (reduce ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay, ease: EASE } });

  return (
    <section ref={ref} id="top" className={cn("relative bg-navy-950", reduce ? "min-h-[100svh]" : "h-[170svh]")}>
      <div className={cn("overflow-hidden", reduce ? "relative min-h-[100svh]" : "sticky top-0 h-[100svh]")}>
        {/* Far plane: the campus */}
        <motion.div className="absolute inset-0" style={reduce ? undefined : { y: farY, scale: farScale }}>
          <motion.div className="absolute -inset-4" style={reduce ? undefined : { x: farLX, y: farLY }}>
            <Photo photo={media.campusGardens} priority sizes="100vw" className="absolute inset-0" imgClassName="object-[50%_60%]" />
          </motion.div>
        </motion.div>
        {/* Scrim only on the lead side where the copy sits, plus a floor fade */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,20,58,0.92)_0%,rgba(20,20,58,0.72)_38%,rgba(20,20,58,0.18)_70%,rgba(20,20,58,0.06)_100%)]"
          style={{ opacity: reduce ? 0.9 : scrim }}
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-950/80 to-transparent" aria-hidden="true" />

        {/* Mid plane: two photo plates (tablet and up) */}
        <motion.div className="pointer-events-none absolute inset-0 hidden md:block" style={reduce ? undefined : { x: midLX, y: midLY }} aria-hidden="true">
          <motion.div
            className="absolute right-[6%] top-[18%] w-[30vw] max-w-[30rem] overflow-hidden rounded-2xl border-[6px] border-white/90 shadow-[0_40px_80px_rgba(10,10,30,0.55)]"
            style={reduce ? { rotate: -3 } : { y: plateAY, rotate: -3 }}
          >
            <Photo photo={media.graduationPac} sizes="30vw" className="aspect-[4/3]" />
          </motion.div>
          <motion.div
            className="absolute right-[19%] top-[57%] w-[18vw] max-w-[18rem] overflow-hidden rounded-2xl border-[6px] border-white/90 shadow-[0_40px_80px_rgba(10,10,30,0.55)]"
            style={reduce ? { rotate: 4 } : { y: plateBY, rotate: plateBRot }}
          >
            <Photo photo={media.fgPepRally} sizes="18vw" className="aspect-[4/3]" />
          </motion.div>
        </motion.div>

        {/* Near plane: the crest */}
        <motion.div className="pointer-events-none absolute inset-0" style={reduce ? undefined : { x: nearLX, y: nearLY }} aria-hidden="true">
          <motion.div
            className="absolute bottom-[7%] right-[6%] w-24 drop-shadow-[0_24px_40px_rgba(10,10,30,0.6)] sm:w-32 md:bottom-[9%] md:right-[7%] md:w-40 lg:w-48"
            style={reduce ? { rotate: -8 } : { y: crestY, rotate: crestRot, opacity: crestO }}
          >
            <Crest className="h-auto w-full" />
          </motion.div>
        </motion.div>

        {/* Copy rides at 1x between the planes */}
        <motion.div style={reduce ? undefined : { y: copyY, opacity: copyO }} className="relative z-10 mx-auto flex h-full min-h-[100svh] w-full max-w-7xl flex-col justify-center px-5 pb-16 pt-32 sm:px-8">
          <motion.h1
            {...enter(0.15)}
            className="font-display max-w-[13ch] text-balance text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.025em] text-white sm:text-6xl lg:text-[5.4rem]"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p {...enter(0.35)} className="mt-6 max-w-[34ch] text-pretty text-lg leading-relaxed text-white/85 sm:text-xl">
            {t.hero.sub}
          </motion.p>
          <motion.div {...enter(0.55)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/admissions#inquire" className={cn(buttonStyles.gold, "h-14 px-9 text-base")}>
              {t.hero.ctaPrimary}
            </Link>
            <Link href="/admissions#inquire" className={cn(buttonStyles.outlineDark, "h-14 px-8 text-base")}>
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
