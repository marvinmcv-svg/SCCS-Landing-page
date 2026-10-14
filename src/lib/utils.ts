import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Smooth-scroll to an in-page anchor. Returns false when the target is not on this page. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Pads a scroll-progress mapping so its input range spans 0..1.
 * Chrome's accelerated scroll timelines drop an animation's value once
 * progress leaves the keyframe range, so every keyframe set must cover it.
 */
export function span<T>(input: number[], output: T[]): [number[], T[]] {
  const i = [...input];
  const o = [...output];
  if (i[0] > 0) {
    i.unshift(0);
    o.unshift(o[0]);
  }
  if (i[i.length - 1] < 1) {
    i.push(1);
    o.push(o[o.length - 1]);
  }
  return [i, o];
}
