"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn, EASE } from "@/lib/utils";
import type { Photo } from "@/data/media";
import { useLang } from "./i18n";

/* ───────────────────────── Brand marks ───────────────────────── */

export function Crest({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 56" className={className} aria-hidden="true">
      <path d="M24 2 L44 8 V26 C44 40 35 49 24 54 C13 49 4 40 4 26 V8 Z" fill="#0F3D2E" stroke="#C9A227" strokeWidth="2" />
      <path d="M24 6.5 L40 11.3 V26 C40 37.6 32.7 45.2 24 49.4 C15.3 45.2 8 37.6 8 26 V11.3 Z" fill="none" stroke="#C9A227" strokeOpacity="0.55" strokeWidth="0.8" />
      <g fill="none" stroke="#C9A227" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15.5 21 L17 15.5 L20.5 18.5" />
        <path d="M32.5 21 L31 15.5 L27.5 18.5" />
        <path d="M17 18.5 C19.5 16.8 28.5 16.8 31 18.5 C33.5 22 33.2 28.5 29.5 32.5 C27.5 34.6 25.8 35.5 24 35.5 C22.2 35.5 20.5 34.6 18.5 32.5 C14.8 28.5 14.5 22 17 18.5 Z" />
        <path d="M19.8 24.2 C20.8 23.4 22 23.5 22.6 24.4" />
        <path d="M28.2 24.2 C27.2 23.4 26 23.5 25.4 24.4" />
        <path d="M22.4 29 L24 30.4 L25.6 29" />
      </g>
      <path d="M21 42 L24 44.5 L27 42" fill="none" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
      <Crest className={cn("h-11 w-9 shrink-0", light && "drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]")} />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-xl font-semibold", light ? "text-white" : "text-jungle-900")}>SCCS</span>
        <span className={cn("mt-1 text-[0.6rem] uppercase tracking-[0.18em]", light ? "text-white/70" : "text-mist")}>
          Santa Cruz Cooperative School
        </span>
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
    <section id={id} className={cn("scroll-mt-28 py-16 sm:py-20 lg:py-28", dark && "bg-jungle-950 text-cream", className)}>
      {children}
    </section>
  );
}

export function Kicker({ children, dark, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]", dark ? "text-gold-400" : "text-gold-600", className)}>
      <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
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
        <H className={cn("font-display mt-4 text-3xl font-semibold leading-[1.12] sm:text-4xl lg:text-[2.75rem]", dark ? "text-white" : "text-jungle-900")}>
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
  "pressable inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-[background-color,box-shadow,color,border-color] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500";

export const buttonStyles = {
  gold: cn(buttonBase, "bg-gold-500 px-7 font-bold text-jungle-950 shadow-[0_8px_32px_rgba(201,162,39,0.4)] hover:bg-gold-400 hover:shadow-[0_10px_40px_rgba(201,162,39,0.6)]"),
  outlineDark: cn(buttonBase, "border border-white/40 bg-white/5 px-7 text-white backdrop-blur-sm hover:bg-white/15"),
  outline: cn(buttonBase, "border border-jungle-800/20 bg-white px-6 text-jungle-900 hover:border-gold-500 hover:text-jungle-700"),
  primary: cn(buttonBase, "bg-jungle-800 px-7 text-ivory hover:bg-jungle-700"),
  outlineGold: cn(buttonBase, "border border-gold-500 px-6 text-gold-600 hover:bg-gold-500 hover:text-jungle-950"),
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
        dark ? "text-gold-400 hover:text-gold-100" : "text-jungle-600 hover:text-jungle-800",
        className,
      )}
    >
      <span className="sccs-link-underline">{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  );
}

export function GoldDot() {
  return <span className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />;
}
