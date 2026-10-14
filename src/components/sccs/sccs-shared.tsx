"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn, EASE } from "@/lib/utils";
import type { Photo } from "@/data/media";
import { useLang } from "./i18n";

/* ───────────────────────── Brand marks ───────────────────────── */

/**
 * The official SCCS crest, shield, staggered "SCCS" letters, and the U.S. and
 * Bolivian flags, redrawn as vector from the school's published logo so it
 * stays crisp at every size. `mono` renders a single-color version for dark grounds.
 */
export function Crest({ className, mono }: { className?: string; mono?: boolean }) {
  const id = useId().replace(/:/g, "");
  const ink = mono ? "#FFFFFF" : "#292963";
  const shield = "M50 62 Q256 -4 462 62 L452 300 Q440 420 256 500 Q72 420 60 300 Z";
  return (
    <svg viewBox="0 0 512 512" className={className} role="img" aria-label="SCCS crest">
      <defs>
        <clipPath id={`shield-${id}`}>
          <path d={shield} />
        </clipPath>
      </defs>
      <path d={shield} fill={mono ? "transparent" : "#FFFFFF"} />
      <g clipPath={`url(#shield-${id})`}>
        {/* U.S. flag */}
        <g>
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={40} y={285 + i * 13} width={212} height={6.5} fill={mono ? "#FFFFFF" : "#C8323A"} opacity={mono ? 0.85 : 1} />
          ))}
          <rect x={40} y={285} width={116} height={58} fill={mono ? "#FFFFFF" : "#3A3D8C"} />
          {!mono &&
            Array.from({ length: 4 }).flatMap((_, r) =>
              Array.from({ length: 6 }).map((__, c) => <circle key={`${r}-${c}`} cx={58 + c * 17 + (r % 2) * 8} cy={295 + r * 13} r={2.2} fill="#FFFFFF" opacity={0.85} />),
            )}
        </g>
        {/* Bolivian flag */}
        <rect x={262} y={285} width={230} height={39} fill={mono ? "#FFFFFF" : "#D52B1E"} />
        <rect x={262} y={324} width={230} height={38} fill={mono ? "transparent" : "#F4E400"} stroke={mono ? "#FFFFFF" : "none"} strokeWidth={mono ? 4 : 0} />
        <rect x={262} y={362} width={230} height={39} fill={mono ? "#FFFFFF" : "#007934"} />
      </g>
      <path d={shield} fill="none" stroke={ink} strokeWidth={13} strokeLinejoin="round" />
      <g fill={ink} fontFamily="var(--font-brand), 'Century Gothic', 'Montserrat', sans-serif" fontWeight={500} fontSize={96}>
        <text x={82} y={160}>S</text>
        <text x={158} y={196}>C</text>
        <text x={258} y={226}>C</text>
        <text x={352} y={254}>S</text>
      </g>
    </svg>
  );
}

export function JaguarMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* ears */}
      <path d="M22 30 L20 14 L36 22" />
      <path d="M74 30 L76 14 L60 22" />
      <path d="M24 25 L23.5 18.5 L30 22" />
      <path d="M72 25 L72.5 18.5 L66 22" />
      {/* head */}
      <path d="M26 24 C38 18 58 18 70 24 C80 32 81 50 74 62 C68 73 58 80 48 80 C38 80 28 73 22 62 C15 50 16 32 26 24 Z" />
      {/* brow */}
      <path d="M32 38 C38 34 44 35 46 40" />
      <path d="M64 38 C58 34 52 35 50 40" />
      {/* eyes */}
      <path d="M34 44 C37 40.5 42 40.5 44 44 C42 47 37 47 34 44 Z" />
      <path d="M62 44 C59 40.5 54 40.5 52 44 C54 47 59 47 62 44 Z" />
      {/* cheeks */}
      <path d="M28 54 C32 60 38 62 42 61" />
      <path d="M68 54 C64 60 58 62 54 61" />
      {/* nose + muzzle */}
      <path d="M43 56 L48 60 L53 56 C51 54 45 54 43 56 Z" />
      <path d="M48 60 V65 C46 68 42 69 40 67" />
      <path d="M48 65 C50 68 54 69 56 67" />
      {/* rosettes */}
      <circle cx="40" cy="28" r="1.4" />
      <circle cx="48" cy="26" r="1.4" />
      <circle cx="56" cy="28" r="1.4" />
      <circle cx="30" cy="66" r="1.2" />
      <circle cx="66" cy="66" r="1.2" />
    </svg>
  );
}

export function LogoLockup({ variant = "dark", className }: { variant?: "dark" | "light"; className?: string }) {
  const light = variant === "light";
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Crest mono={light} className={cn("h-12 w-12 shrink-0 transition-[filter] duration-500", light && "drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)]")} />
      <span className={cn("font-brand flex flex-col font-bold uppercase leading-[1.05] tracking-[0.02em]", light ? "text-white" : "text-navy-800")}>
        <span className="text-[0.98rem]">Santa Cruz</span>
        <span className="text-[0.7rem] tracking-[0.04em]">Cooperative School</span>
      </span>
    </span>
  );
}

/* ───────────────────────── Motion ───────────────────────── */

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  if (reduce) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

export function CountUp({ value, duration = 1.8, className }: { value: number; duration?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(reduce ? value : 0);
  const prev = useRef(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const controls = animate(prev.current, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    prev.current = value;
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ───────────────────────── Layout ───────────────────────── */

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>{children}</div>;
}

export function Section({
  id,
  children,
  className,
  dark,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-16 sm:py-20 lg:py-28", dark && "bg-navy-950 text-cream", className)}>
      {children}
    </section>
  );
}

export function Kicker({ children, dark, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]", dark ? "text-amber-400" : "text-crimson-600", className)}>
      <span className="h-px w-8 bg-amber-500" aria-hidden="true" />
      {children}
    </p>
  );
}

export function SectionHeading({
  kicker,
  title,
  intro,
  dark,
  className,
  align = "left",
  as: H = "h2",
}: {
  kicker?: string;
  title: string;
  intro?: string;
  dark?: boolean;
  className?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn(align === "center" && "mx-auto flex flex-col items-center text-center", className)}>
      {kicker && (
        <Reveal>
          <Kicker dark={dark}>{kicker}</Kicker>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <H className={cn("font-display mt-4 text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.75rem]", dark ? "text-white" : "text-navy-900")}>
          {title}
        </H>
      </Reveal>
      {intro && (
        <Reveal delay={0.12}>
          <p className={cn("mt-5 max-w-2xl text-base leading-relaxed sm:text-lg", dark ? "text-cream/75" : "text-mist")}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ───────────────────────── Media ───────────────────────── */

export function Photo({
  photo,
  className,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  fill = true,
  imgClassName,
}: {
  photo: Photo;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  imgClassName?: string;
}) {
  const { tr } = useLang();
  if (!fill) {
    return (
      <Image
        src={photo.src}
        alt={tr(photo.alt)}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        priority={priority}
        className={cn("h-auto w-full", imgClassName, className)}
      />
    );
  }
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image src={photo.src} alt={tr(photo.alt)} fill sizes={sizes} priority={priority} className={cn("object-cover", imgClassName)} />
    </div>
  );
}

/* ───────────────────────── Actions ───────────────────────── */

const buttonBase =
  "pressable inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-[background-color,box-shadow,color,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500";

export const buttonStyles = {
  gold: cn(buttonBase, "bg-amber-500 px-7 font-bold text-navy-950 shadow-[0_8px_32px_rgba(248,167,36,0.4)] hover:bg-amber-400 hover:shadow-[0_10px_40px_rgba(248,167,36,0.6)]"),
  outlineDark: cn(buttonBase, "border border-white/40 bg-white/5 px-7 text-white backdrop-blur-sm hover:bg-white/15"),
  outline: cn(buttonBase, "border border-navy-800/20 bg-white px-6 text-navy-900 hover:border-amber-500 hover:text-navy-700"),
  primary: cn(buttonBase, "bg-navy-800 px-7 text-ivory hover:bg-navy-700"),
  outlineGold: cn(buttonBase, "border border-amber-500 px-6 text-amber-400 hover:bg-amber-500 hover:text-navy-950"),
};

export function TextLink({ href, children, dark, className }: { href: string; children: React.ReactNode; dark?: boolean; className?: string }) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex min-h-11 items-center gap-2 text-sm font-semibold",
        dark ? "text-amber-400 hover:text-amber-100" : "text-crimson-600 hover:text-crimson-700",
        className,
      )}
    >
      <span className="sccs-link-underline">{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

export function GoldDot() {
  return <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden="true" />;
}
