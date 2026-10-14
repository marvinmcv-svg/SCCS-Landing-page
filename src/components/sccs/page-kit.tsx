"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ChevronRight as Sep } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo as PhotoT } from "@/data/media";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useStaticMotion } from "@/lib/use-static-motion";
import { cn, EASE } from "@/lib/utils";
import { useLang } from "./i18n";
import { Container, Kicker, Photo, Reveal } from "./sccs-shared";
import { EASE_OUT, Words, gsap, useGSAP } from "../home/motion";

export type Crumb = { href: string; label: string };

export function Breadcrumbs({ items, dark = true }: { items: Crumb[]; dark?: boolean }) {
  const { t } = useLang();
  const all = [{ href: "/", label: t.page.home }, ...items];
  return (
    <nav aria-label={t.page.breadcrumb}>
      <ol className={cn("flex flex-wrap items-center gap-1.5 text-xs", dark ? "text-white/65" : "text-mist")}>
        {all.map((c, i) => (
          <li key={c.href + i} className="flex items-center gap-1.5">
            {i > 0 && <Sep className="h-3 w-3 opacity-60" aria-hidden="true" />}
            {i === all.length - 1 ? (
              <span aria-current="page" className={dark ? "text-amber-400" : "text-navy-800"}>
                {c.label}
              </span>
            ) : (
              <Link href={c.href} className="hover:text-amber-400">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  photo,
  kicker,
  title,
  lede,
  crumbs,
  children,
  imgPosition,
  tall,
}: {
  photo: PhotoT;
  kicker: string;
  title: string;
  lede?: string;
  crumbs: Crumb[];
  children?: React.ReactNode;
  imgPosition?: string;
  tall?: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-word]", { yPercent: 115, duration: 1.1, ease: EASE_OUT, stagger: 0.05, delay: 0.1 });
        gsap.from("[data-page-rise]", { y: 22, autoAlpha: 0, duration: 0.9, ease: EASE_OUT, stagger: 0.08, delay: 0.35 });
        gsap.fromTo("[data-page-media] img", { scale: 1.14 }, { scale: 1, duration: 2.4, ease: EASE_OUT });
        gsap.to("[data-page-media]", { yPercent: 12, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
      });
      return () => mm.revert();
    },
    { scope: root },
  );
  return (
    <section ref={root} className={cn("relative isolate flex items-end overflow-hidden bg-navy-950", tall ? "min-h-[88svh]" : "min-h-[72svh]")}>
      <div data-page-media className="absolute inset-0 -z-20">
        <Photo photo={photo} priority className="absolute inset-0" sizes="100vw" imgClassName={imgPosition} />
      </div>
      {/* The photograph keeps its own brightness; shade sits only under the navigation and the words. */}
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-navy-950/60 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_95%_80%_at_0%_100%,rgba(20,20,58,0.85),rgba(20,20,58,0.45)_45%,transparent_75%)]" aria-hidden="true" />
      <Container className="pb-14 pt-40 sm:pb-20">
        <div data-page-rise>
          <Breadcrumbs items={crumbs} />
        </div>
        <div data-page-rise className="mt-6">
          <Kicker dark>{kicker}</Kicker>
        </div>
        <h1 className="font-display mt-3 max-w-5xl text-balance text-[2.6rem] font-semibold leading-[1] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
          <Words text={title} />
        </h1>
        {lede && (
          <p data-page-rise className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {lede}
          </p>
        )}
        {children && (
          <div data-page-rise className="mt-8">
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}

export function Gallery({ photos, title }: { photos: PhotoT[]; title?: string }) {
  const { tr, t } = useLang();
  const [open, setOpen] = useState<number | null>(null);
  const prev = useCallback(() => setOpen((i) => (i === null ? i : (i - 1 + photos.length) % photos.length)), [photos.length]);
  const next = useCallback(() => setOpen((i) => (i === null ? i : (i + 1) % photos.length)), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  const current = open !== null ? photos[open] : null;
  return (
    <div>
      {title && <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{title}</h2>}
      <ul className={cn("grid grid-cols-2 gap-3 sm:gap-4", photos.length !== 4 && "lg:grid-cols-3", title && "mt-8")}>
        {photos.map((p, i) => (
          <Reveal as="li" key={p.src + i} delay={(i % 3) * 0.06} className={cn(i === 0 && photos.length > 4 && "col-span-2 row-span-2", i === 0 && photos.length === 3 && "col-span-2 lg:col-span-1")}>
            <button type="button" onClick={() => setOpen(i)} className="group relative block h-full min-h-40 w-full overflow-hidden rounded-2xl" aria-label={tr(p.alt)}>
              <Photo photo={p} className={cn("absolute inset-0")} sizes="(min-width:1024px) 33vw, 50vw" imgClassName="transition-transform duration-700 group-hover:scale-105" />
              <span className="invisible block aspect-[4/3]" aria-hidden="true" />
            </button>
          </Reveal>
        ))}
      </ul>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent closeLabel={t.nav.close} aria-describedby={undefined} className="top-1/2 max-w-5xl -translate-y-1/2 border-white/10 bg-navy-950 p-0" overlayClassName="bg-navy-950/90">
          <DialogTitle className="sr-only">{t.page.gallery}</DialogTitle>
          {current && (
            <figure>
              <div className="relative flex max-h-[75vh] items-center justify-center bg-black">
                <Image src={current.src} alt={tr(current.alt)} width={current.width} height={current.height} sizes="(min-width:1024px) 1024px, 100vw" className="h-auto max-h-[75vh] w-auto" />
              </div>
              <figcaption className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-cream/80">
                <span>{tr(current.alt)}</span>
                <span className="flex shrink-0 gap-1">
                  <button type="button" onClick={prev} aria-label="Previous" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10">
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <button type="button" onClick={next} aria-label="Next" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10">
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </span>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function RelatedLinks({ items, title }: { items: { href: string; label: string; blurb?: string; photo?: PhotoT }[]; title?: string }) {
  const { t } = useLang();
  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-navy-900 sm:text-3xl">{title ?? t.page.related}</h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <Reveal as="li" key={it.href} delay={i * 0.06}>
            <Link href={it.href} className="group flex h-full items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-shadow hover:shadow-[0_14px_36px_rgba(20,20,58,0.08)]">
              {it.photo && <Photo photo={it.photo} className="aspect-square w-20 shrink-0 rounded-xl" sizes="80px" />}
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-navy-900 group-hover:text-navy-600">{it.label}</span>
                {it.blurb && <span className="mt-0.5 block text-sm text-mist">{it.blurb}</span>}
              </span>
              <ArrowRight className="h-4 w-4 shrink-0 text-crimson-600 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

export function Prose({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-5 text-base leading-relaxed text-mist sm:text-lg", className)}>{children}</div>;
}

export function Split({ photo, title, body, reverse, kicker, children }: { photo: PhotoT; title: string; body: string; reverse?: boolean; kicker?: string; children?: React.ReactNode }) {
  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div data-clip className={cn("overflow-hidden rounded-[1.75rem]", reverse && "lg:order-2")}>
        <Photo photo={photo} className="aspect-[4/3]" sizes="(min-width:1024px) 50vw, 100vw" />
      </div>
      <Reveal delay={0.08}>
        {kicker && <Kicker>{kicker}</Kicker>}
        <h2 className={cn("font-display text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.025em] text-navy-900 sm:text-5xl", kicker && "mt-3")}>{title}</h2>
        <p className="mt-5 text-lg leading-relaxed text-navy-900/75">{body}</p>
        {children}
      </Reveal>
    </div>
  );
}

export function IconCards({ items, cols = 4 }: { items: { title: string; text: string }[]; cols?: 2 | 3 | 4 }) {
  return (
    <ul className={cn("grid gap-4 sm:grid-cols-2", cols === 3 && "lg:grid-cols-3", cols === 4 && "lg:grid-cols-4")}>
      {items.map((it, i) => (
        <Reveal as="li" key={it.title} delay={i * 0.06} className="rounded-2xl border border-border bg-card p-6">
          <span className="font-display text-sm font-semibold text-crimson-600">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-semibold text-navy-900">{it.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist">{it.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

export function Tabs({ tabs, label }: { tabs: { id: string; label: string; content: React.ReactNode }[]; label: string }) {
  const [active, setActive] = useState(0);
  const reduce = useStaticMotion();
  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = e.key === "ArrowRight" ? (i + 1) % tabs.length : e.key === "ArrowLeft" ? (i - 1 + tabs.length) % tabs.length : null;
    if (n === null) return;
    e.preventDefault();
    setActive(n);
    (document.getElementById(`tab-${tabs[n].id}`) as HTMLButtonElement | null)?.focus();
  };
  return (
    <div>
      <div role="tablist" aria-label={label} className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tb, i) => (
          <button
            key={tb.id}
            id={`tab-${tb.id}`}
            role="tab"
            aria-selected={active === i}
            aria-controls={`panel-${tb.id}`}
            tabIndex={active === i ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "pressable min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors",
              active === i ? "border-navy-800 bg-navy-800 text-ivory" : "border-border bg-white text-navy-900 hover:border-amber-500",
            )}
          >
            {tb.label}
          </button>
        ))}
      </div>
      <motion.div
        key={tabs[active].id}
        id={`panel-${tabs[active].id}`}
        role="tabpanel"
        aria-labelledby={`tab-${tabs[active].id}`}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="mt-6"
      >
        {tabs[active].content}
      </motion.div>
    </div>
  );
}
