"use client";

import { Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

export { gsap, ScrollTrigger, useGSAP };

export const EASE_OUT = "expo.out";
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

/**
 * Scroll choreography for everything inside `scope`, driven by data attributes so
 * the markup stays declarative and React keeps ownership of the DOM:
 *
 * - `data-words`     each word rises out of its own mask (use <Words>)
 * - `data-rise`      rises 28px and fades in; siblings entering together stagger 80ms
 * - `data-clip`      a picture opens from an inset mask while settling from 1.15x
 * - `data-parallax`  drifts against the scroll; the value is the travel in percent
 * - `data-count`     counts from 0 to its value when it enters (`data-decimals` for 3.15)
 * - `data-bars`      the `data-bar-grow` children rise from the baseline in turn
 *
 * Nothing is hidden before hydration, and with reduced motion nothing moves at all.
 */
export function useScrollChoreography(scope: React.RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const q = gsap.utils.selector(scope);

        q("[data-words]").forEach((el) => {
          gsap.from(el.querySelectorAll("[data-word]"), {
            yPercent: 115,
            duration: 1.1,
            ease: EASE_OUT,
            stagger: 0.045,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        ScrollTrigger.batch(q("[data-rise]"), {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.from(batch, { y: 28, autoAlpha: 0, duration: 0.95, ease: EASE_OUT, stagger: 0.08, overwrite: true }),
        });

        q("[data-clip]").forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", once: true } });
          tl.from(el, { clipPath: "inset(14% 10% 14% 10% round 28px)", duration: 1.4, ease: EASE_OUT });
          if (img) tl.from(img, { scale: 1.18, duration: 1.8, ease: EASE_OUT }, 0);
        });

        q("[data-bars]").forEach((el) => {
          gsap.from(el.querySelectorAll("[data-bar-grow]"), {
            scaleY: 0,
            transformOrigin: "50% 100%",
            duration: 1.2,
            ease: EASE_OUT,
            stagger: 0.08,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        q("[data-parallax]").forEach((el) => {
          const amount = Number(el.getAttribute("data-parallax")) || 10;
          gsap.fromTo(
            el,
            { yPercent: amount },
            { yPercent: -amount, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        q("[data-count]").forEach((el) => {
          const target = Number(el.getAttribute("data-count"));
          const decimals = Number(el.getAttribute("data-decimals") ?? 0);
          const state = { v: 0 };
          gsap.to(state, {
            v: target,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = state.v.toFixed(decimals);
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope, dependencies: deps, revertOnUpdate: true },
  );
}

/** A headline whose words rise out of individual masks. Text stays real text for readers and search. */
export function Words({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span data-words className={className}>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <span data-word className="inline-block will-change-transform">
              {w}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

/**
 * A slow-moving gradient field in the school colours: navy ground, with crimson,
 * amber and indigo light drifting across it. Transform-only, paused for reduced motion.
 */
export function Aurora({ className, tone = "night" }: { className?: string; tone?: "night" | "dusk" }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>("[data-orb]", ref.current).forEach((orb, i) => {
          gsap.to(orb, {
            xPercent: gsap.utils.random(-18, 18),
            yPercent: gsap.utils.random(-14, 14),
            scale: gsap.utils.random(0.9, 1.2),
            duration: gsap.utils.random(14, 22),
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: i * -3,
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );
  return (
    <div ref={ref} className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", tone === "night" ? "bg-navy-950" : "bg-navy-900", className)} aria-hidden="true">
      <div data-orb className="absolute -left-[20%] -top-[30%] h-[85%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(61,61,143,0.85),transparent)]" />
      <div data-orb className="absolute -right-[15%] top-[10%] h-[80%] w-[60%] rounded-full bg-[radial-gradient(closest-side,rgba(183,32,52,0.45),transparent)]" />
      <div data-orb className="absolute -bottom-[35%] left-[25%] h-[80%] w-[65%] rounded-full bg-[radial-gradient(closest-side,rgba(248,167,36,0.30),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,rgba(20,20,58,0.6))]" />
    </div>
  );
}

/** An endless horizontal row. Pauses under the pointer; becomes a wrapped list with reduced motion. */
export function Marquee({ children, className, seconds = 40, reverse }: { children: React.ReactNode; className?: string; seconds?: number; reverse?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const track = ref.current?.querySelector<HTMLElement>("[data-track]");
        if (!track) return;
        const tween = reverse
          ? gsap.fromTo(track, { xPercent: -50 }, { xPercent: 0, duration: seconds, ease: "none", repeat: -1 })
          : gsap.to(track, { xPercent: -50, duration: seconds, ease: "none", repeat: -1 });
        const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6 });
        const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
        ref.current?.addEventListener("pointerenter", slow);
        ref.current?.addEventListener("pointerleave", resume);
        return () => {
          ref.current?.removeEventListener("pointerenter", slow);
          ref.current?.removeEventListener("pointerleave", resume);
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [reverse, seconds] },
  );
  return (
    <div ref={ref} className={cn("overflow-hidden motion-reduce:overflow-visible", className)}>
      <div data-track className="flex w-max motion-reduce:w-auto motion-reduce:flex-wrap">
        <div className="flex shrink-0 motion-reduce:flex-wrap">{children}</div>
        <div className="flex shrink-0 motion-reduce:hidden" aria-hidden="true" inert>
          {children}
        </div>
      </div>
    </div>
  );
}

/** A figure like "13%", "3.15" or "1959" whose number counts up as it enters; prefix and suffix stay put. */
export function CountFigure({ value }: { value: string }) {
  const m = value.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!m) return <>{value}</>;
  const [, pre, num, post] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  // Years read as labels, not quantities: leave them still.
  if (!decimals && /^(19|20)\d\d$/.test(num) && !pre && !post) return <>{value}</>;
  return (
    <>
      {pre}
      <span data-count={num} data-decimals={decimals}>
        {num}
      </span>
      {post}
    </>
  );
}
