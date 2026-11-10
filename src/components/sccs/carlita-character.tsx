"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type CarlitaMood = "idle" | "wave" | "thinking" | "talking";

/**
 * Mr. Marvin, the site's assistant, as an animated character: an illustrated bust in SVG,
 * modelled on his portrait (short black hair swept up with loose strands on the
 * forehead, strong straight brows, straight serious brows, heavy-lidded eyes, a firm mouth with a slight smirk, stubble, red SCCS polo with the
 * white paw print and the SCCS crest, ink outlines on a red background).
 * Animations are pure CSS (see `.carlita-char` in globals.css) and switch with `mood`:
 * - idle: breathing, blinking, a slow nod
 * - wave: a cool chin-up nod with a raised brow (his greeting)
 * - thinking: eyes glance up, head tilts, brows lift
 * - talking: mouth opens and closes while he answers
 * Everything is static under prefers-reduced-motion.
 */
export function CarlitaCharacter({ mood = "idle", className }: { mood?: CarlitaMood; className?: string }) {
  const id = useId().replace(/:/g, "");
  const clip = `cc-clip-${id}`;
  const bg = `cc-bg-${id}`;
  const skin = `cc-skin-${id}`;
  const polo = `cc-polo-${id}`;
  const ink = "#2B1712";

  return (
    <svg viewBox="0 0 120 120" className={cn("carlita-char block", className)} data-mood={mood} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
        <radialGradient id={bg} cx="50%" cy="38%" r="72%">
          <stop offset="0%" stopColor="#EE7A6B" />
          <stop offset="100%" stopColor="#CF4A3F" />
        </radialGradient>
        <linearGradient id={skin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#DDAA80" />
          <stop offset="100%" stopColor="#C68E63" />
        </linearGradient>
        <linearGradient id={polo} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D23A35" />
          <stop offset="100%" stopColor="#B42A27" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <rect width="120" height="120" fill={`url(#${bg})`} />

        <g className="cc-body">
          {/* Red SCCS polo */}
          <path d="M4 124 C8 101 30 92 60 91 C90 92 112 101 116 124 Z" fill={`url(#${polo})`} stroke={ink} strokeWidth="1" />
          {/* Neck */}
          <path d="M48 76 L47 93 Q60 101 73 93 L72 76 Z" fill="#C68E63" stroke={ink} strokeWidth="0.9" />
          {/* Collar flaps and placket */}
          <path d="M47 90 L38 97 L44 108 L57 99 Z" fill="#C63230" stroke={ink} strokeWidth="1" strokeLinejoin="round" />
          <path d="M73 90 L82 97 L76 108 L63 99 Z" fill="#C63230" stroke={ink} strokeWidth="1" strokeLinejoin="round" />
          <path d="M57 99 L60 102 L63 99 L63 124 L57 124 Z" fill="#C2302D" stroke={ink} strokeWidth="0.8" />
          <circle cx="60" cy="106" r="0.9" fill={ink} opacity="0.7" />
          <circle cx="60" cy="113" r="0.9" fill={ink} opacity="0.7" />
          {/* White paw print (left chest) */}
          <g fill="#FFFFFF" opacity="0.95">
            <ellipse cx="31" cy="112" rx="3.6" ry="3" />
            <ellipse cx="26.6" cy="107.6" rx="1.3" ry="1.7" />
            <ellipse cx="29.6" cy="105.6" rx="1.3" ry="1.7" />
            <ellipse cx="33" cy="105.8" rx="1.3" ry="1.7" />
            <ellipse cx="35.6" cy="108.2" rx="1.3" ry="1.7" />
          </g>
          {/* SCCS crest (right chest) */}
          <image href="/brand/sccs-crest-180.png" x="80" y="102" width="12" height="13.5" preserveAspectRatio="xMidYMid meet" />

          <g className="cc-head">
            {/* Ears */}
            <path d="M35 51 C29 49 28 61 32 66 C34 68 36 67 36.5 65" fill="#C68E63" stroke={ink} strokeWidth="1" />
            <path d="M85 51 C91 49 92 61 88 66 C86 68 84 67 83.5 65" fill="#C68E63" stroke={ink} strokeWidth="1" />
            {/* Face: broad, slightly square jaw */}
            <path d="M35.5 46 C35 62 37 74 46 81 C51 85 56 86.5 60 86.5 C64 86.5 69 85 74 81 C83 74 85 62 84.5 46 C84 32 74 26 60 26 C46 26 36 32 35.5 46 Z" fill={`url(#${skin})`} stroke={ink} strokeWidth="1.1" />
            {/* Black hair: swept up and back with volume on top, deep corners at the temples,
                tapered sides, a few strands falling forward */}
            <path d="M35 53 C33 40 35 26 45 18 C53 12 68 10.5 77.5 15.5 C85.5 20.5 88.5 31 86.5 44 L85.4 53 C84.6 48 83.4 44.5 81 42.5 C79.6 37.5 77.4 32.6 73.4 31.2 C69.6 31.8 66.4 33.4 63.4 34.6 C60.4 35.8 57.4 36.6 55.2 36.1 C52 35.2 49.4 33.4 47.2 33.4 C45 35.2 43.6 39.2 41.6 43 C39.4 45.4 37.2 48.6 35 53 Z" fill="#140D0B" stroke="#2B1712" strokeWidth="0.8" />
            {/* tapered sides */}
            <path d="M35 53 C35.4 48.6 37.4 45.6 39.8 43.6 L41 45.6 C39 47.8 37.2 50.4 36.4 53.6 Z" fill="#3A2A23" opacity="0.9" />
            <path d="M85.4 53 C85 48.6 83.4 45.4 81.2 43.4 L80 45.4 C81.8 47.6 83.4 50.4 84.2 53.6 Z" fill="#3A2A23" opacity="0.9" />
            {/* volume swept up and back */}
            <path d="M44 22 C50 15.6 60 13.6 69 15 M47 27 C54 20.6 64 19.4 73 21.6 M52 31.4 C58 26.6 66 25.6 74 27.4" fill="none" stroke="#3E302A" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />
            <path d="M40 23.5 C41 18.5 44.5 14.6 49 13.4 C47 15.6 45.8 18 45.5 20.6 M70 12.6 C76 12.8 81.6 16 84.4 21.4 C81.4 19.2 77.6 18.2 74.4 18.4" fill="#140D0B" stroke="#140D0B" strokeWidth="1.2" strokeLinejoin="round" />
            {/* strands falling forward over the forehead */}
            <path d="M56 35.8 C53.6 38 51.8 40.6 51 43.6" fill="none" stroke="#140D0B" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M59.6 35 C59.6 38.2 58.2 40.8 56.4 42.4" fill="none" stroke="#140D0B" strokeWidth="1.1" strokeLinecap="round" />
            <path d="M53 35.4 C50.6 36.8 48.8 38.8 48 41" fill="none" stroke="#140D0B" strokeWidth="1" strokeLinecap="round" />

            {/* Thick brows, low and angled in: a serious, tough look */}
            <g className="cc-brows" fill="#140D0B" stroke="#140D0B" strokeWidth="0.6" strokeLinejoin="round">
              <path d="M40.5 46.6 Q46.5 44.4 54.5 47.6 L54 49.4 Q47 47.2 41 48.6 Z" />
              <path d="M79.5 46.6 Q73.5 44.4 65.5 47.6 L66 49.4 Q73 47.2 79 48.6 Z" />
            </g>

            {/* Narrow, heavy-lidded eyes (blink + glance) */}
            <g className="cc-eyes">
              <g className="cc-eye">
                <path d="M42.8 53.4 Q47.8 51.2 52.8 53 Q47.8 55.2 42.8 53.4 Z" fill="#F4ECE6" stroke="#2B1712" strokeWidth="0.6" />
                <circle className="cc-pupil" cx="48.2" cy="53.4" r="1.75" fill="#1C100B" />
                <path d="M42.4 53.2 Q47.8 50.3 53.2 52.7" fill="none" stroke="#2B1712" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M43.5 51.2 Q48 49.6 52.5 51" fill="none" stroke="#A9714C" strokeWidth="0.8" strokeLinecap="round" />
              </g>
              <g className="cc-eye">
                <path d="M67.2 53 Q72.2 51.2 77.2 53.4 Q72.2 55.2 67.2 53 Z" fill="#F4ECE6" stroke="#2B1712" strokeWidth="0.6" />
                <circle className="cc-pupil" cx="71.8" cy="53.4" r="1.75" fill="#1C100B" />
                <path d="M66.8 52.7 Q72.2 50.3 77.6 53.2" fill="none" stroke="#2B1712" strokeWidth="1.7" strokeLinecap="round" />
                <path d="M67.5 51 Q72 49.6 76.5 51.2" fill="none" stroke="#A9714C" strokeWidth="0.8" strokeLinecap="round" />
              </g>
            </g>

            <path d="M43.5 55.6 Q48 57.4 52.5 55.6 M67.5 55.6 Q72 57.4 76.5 55.6" fill="none" stroke="#9A6343" strokeWidth="0.8" strokeLinecap="round" opacity="0.8" />
            {/* Broad nose, hard smile lines, stubble shadow */}
            <path d="M58.5 55.5 L57.4 63.2" fill="none" stroke="#A9714C" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M54 64.6 Q55.6 67.6 58.4 66.5 Q60 67.8 61.6 66.5 Q64.4 67.6 66 64.6" fill="none" stroke="#2B1712" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M51.5 66.5 Q49.5 70 50.2 73.5 M68.5 66.5 Q70.5 70 69.8 73.5" fill="none" stroke="#A3694A" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M42 70 C44 79 51 85.5 60 85.8 C69 85.5 76 79 78 70 C75 77 68 81.5 60 81.8 C52 81.5 45 77 42 70 Z" fill="#5B3A2A" opacity="0.2" />
            <path d="M52 69.4 Q60 67.6 68 69.4 L67.2 70.6 Q60 69 52.8 70.6 Z" fill="#5B3A2A" opacity="0.25" />
            <ellipse cx="60" cy="80.5" rx="5" ry="2.4" fill="#5B3A2A" opacity="0.18" />

            {/* Mouth: flat and firm with a slight one-sided smirk; open mouth used while talking */}
            <g className="cc-smile">
              <path d="M52 73.2 Q56 72.2 60 72.6 Q64.5 72 68.6 72.5 Q64.5 76 60 76 Q55.5 76 52 73.2 Z" fill="#A76A55" />
              <path d="M51.5 73.2 Q57 73.9 62.5 73.5 Q66.6 73.2 68.8 72.4" fill="none" stroke="#2B1712" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M68.8 72.4 Q69.6 72 70 71.3" fill="none" stroke="#2B1712" strokeWidth="0.8" strokeLinecap="round" />
            </g>
            <g className="cc-talk">
              <path d="M53.5 72.2 Q60 71 66.5 72.2 Q65.2 77.2 60 77.2 Q54.8 77.2 53.5 72.2 Z" fill="#4A1A15" stroke="#2B1712" strokeWidth="1" />
              <path d="M55 72.5 Q60 71.7 65 72.5 L64.5 73.4 Q60 72.9 55.5 73.4 Z" fill="#F4ECE6" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
