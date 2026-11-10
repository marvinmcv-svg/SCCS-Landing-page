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
            {/* Black hair: full and tousled on top, tapered sides, strands falling over the forehead */}
            <path d="M34.5 53 C31 41 32 27 42 19.5 C49 14 60 12.5 69 14 C79 15.5 87 23 88 34 C88.5 41 87 47 85.5 53 C84.8 47 84 42.5 81.5 39.5 C80 37 77.5 36 75 36.5 C72 33.5 68 32.5 64 33.5 C61 32.6 57 32.6 54 33.8 C50 33 46 34.5 43.5 38 C40.5 41 37 46 34.5 53 Z" fill="#140D0B" stroke="#2B1712" strokeWidth="0.8" />
            {/* tufts on top */}
            <path d="M40 24 C42 18 47 15 51 15.5 C48 17.5 46 20 45.5 23 M55 14 C59 11.5 65 11.6 69 13.5 C65 13.8 62 15 60 17 M72 15.5 C78 16 83 20 85 25 C82 22.5 78.5 21.5 75.5 21.8" fill="#140D0B" stroke="#140D0B" strokeWidth="1.4" strokeLinejoin="round" />
            <path d="M44 23 C49 19 55 17.6 60 18.2 M64 18.4 C70 19 76 21.6 79 25" fill="none" stroke="#3E302A" strokeWidth="0.9" strokeLinecap="round" opacity="0.9" />
            {/* loose strands across the forehead */}
            <path d="M54 33.6 C51.5 37 49.5 39.4 46.5 41" fill="none" stroke="#140D0B" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M58.5 33 C58.8 36.5 57.2 39.6 54.8 41.2" fill="none" stroke="#140D0B" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M63 33.4 C66 35.4 67.4 38.4 66.6 41" fill="none" stroke="#140D0B" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M67 34 C70.5 35.6 72.6 38 72.8 40.5" fill="none" stroke="#140D0B" strokeWidth="1" strokeLinecap="round" />

            {/* Thick brows, low and angled in: a serious, tough look */}
            <g className="cc-brows" fill="#140D0B" stroke="#140D0B" strokeWidth="0.6" strokeLinejoin="round">
              <path d="M40.5 46.6 Q46.5 44.4 54.5 47.6 L54 49.4 Q47 47.2 41 48.6 Z" />
              <path d="M79.5 46.6 Q73.5 44.4 65.5 47.6 L66 49.4 Q73 47.2 79 48.6 Z" />
              {/* Two shaved slits in his left brow */}
              <g fill="#D6A178" stroke="none">
                <path d="M72.4 44.2 L73.6 44.2 L73.0 49.6 L71.8 49.6 Z" />
                <path d="M75.4 44.4 L76.6 44.4 L76.0 49.8 L74.8 49.8 Z" />
              </g>
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

            {/* Broad nose, hard smile lines, stubble shadow */}
            <path d="M58.5 55.5 L57.4 63.2" fill="none" stroke="#A9714C" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M54 64.6 Q55.6 67.6 58.4 66.5 Q60 67.8 61.6 66.5 Q64.4 67.6 66 64.6" fill="none" stroke="#2B1712" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M51.5 66.5 Q49.5 70 50.2 73.5 M68.5 66.5 Q70.5 70 69.8 73.5" fill="none" stroke="#A3694A" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M42 70 C44 79 51 85.5 60 85.8 C69 85.5 76 79 78 70 C75 77 68 81.5 60 81.8 C52 81.5 45 77 42 70 Z" fill="#5B3A2A" opacity="0.2" />
            <path d="M52 69.4 Q60 67.6 68 69.4 L67.2 70.6 Q60 69 52.8 70.6 Z" fill="#5B3A2A" opacity="0.25" />
            <ellipse cx="60" cy="80.5" rx="5" ry="2.4" fill="#5B3A2A" opacity="0.18" />

            {/* Mouth: flat and firm with a slight one-sided smirk; open mouth used while talking */}
            <g className="cc-smile">
              <path d="M51.5 72.8 Q56 71.6 60 72.2 Q64.5 71.4 69 72 Q64.5 75.6 60 75.6 Q55.5 75.6 51.5 72.8 Z" fill="#A76A55" />
              <path d="M51.2 72.9 Q57 73.8 62 73.3 Q66.5 72.8 69.4 71.4" fill="none" stroke="#2B1712" strokeWidth="1.3" strokeLinecap="round" />
              <path d="M69.4 71.4 Q70.4 70.6 70.8 69.6" fill="none" stroke="#2B1712" strokeWidth="0.9" strokeLinecap="round" />
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
