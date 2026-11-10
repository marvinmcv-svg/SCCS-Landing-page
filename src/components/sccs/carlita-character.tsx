"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type CarlitaMood = "idle" | "wave" | "thinking" | "talking";

/**
 * Marvz AI, the site's assistant, as an animated character: an illustrated bust in SVG,
 * modelled on his portrait (short black hair swept up with loose strands on the
 * forehead, strong straight brows, calm closed-mouth smile, red SCCS polo with the
 * white paw print and the SCCS crest, ink outlines on a red background).
 * Animations are pure CSS (see `.carlita-char` in globals.css) and switch with `mood`:
 * - idle: breathing, blinking, a slow nod
 * - wave: idle + a friendly wave
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
            {/* Short black hair: full on top, swept up, tapered sides, loose forehead strands */}
            <path d="M34.5 52 C32 40 34 27 44 21 C52 16 66 15 75 19 C83 22 88 30 86.5 41 L85.5 52 C84.5 46 83.5 41 81 38 C79 34 76 33 73 34 C68 30 60 31 55 33 C50 32 45 34 43 38 C40 41 37 45 34.5 52 Z" fill="#1A1210" stroke={ink} strokeWidth="0.8" />
            <path d="M43 22 C47 18 53 16.5 58 17" fill="none" stroke="#4A3A33" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
            <path d="M64 17 C70 17.5 76 20 80 24" fill="none" stroke="#4A3A33" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
            <path d="M55 33 C53 36 51.5 38 49 39.5" fill="none" stroke="#1A1210" strokeWidth="1.3" strokeLinecap="round" />
            <path d="M58 32.5 C58 35.5 56.5 38 55 39" fill="none" stroke="#1A1210" strokeWidth="1" strokeLinecap="round" />
            <path d="M62 33 C64 35 64.5 37.5 64 39" fill="none" stroke="#1A1210" strokeWidth="0.9" strokeLinecap="round" />

            {/* Strong, straight brows */}
            <g className="cc-brows" fill="none" stroke="#1A1210" strokeWidth="2.6" strokeLinecap="round">
              <path d="M41.5 47 Q47 44.6 53.5 46" />
              <path d="M66.5 46 Q73 44.6 78.5 47" />
            </g>

            {/* Almond eyes, a slight squint (blink + glance) */}
            <g className="cc-eyes">
              <g className="cc-eye">
                <path d="M42.5 52.5 Q47.5 49 53 52.3 Q47.5 54.6 42.5 52.5 Z" fill="#FFFFFF" stroke={ink} strokeWidth="0.7" />
                <circle className="cc-pupil" cx="48" cy="52.2" r="1.9" fill="#24150F" />
                <path d="M42.2 52.4 Q47.5 48.4 53.3 52" fill="none" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
              </g>
              <g className="cc-eye">
                <path d="M67 52.3 Q72.5 49 77.5 52.5 Q72.5 54.6 67 52.3 Z" fill="#FFFFFF" stroke={ink} strokeWidth="0.7" />
                <circle className="cc-pupil" cx="72" cy="52.2" r="1.9" fill="#24150F" />
                <path d="M66.7 52 Q72.5 48.4 77.8 52.4" fill="none" stroke={ink} strokeWidth="1.3" strokeLinecap="round" />
              </g>
            </g>

            {/* Broad nose, cheeks, light stubble shadow */}
            <path d="M58.5 55 L57.5 63" fill="none" stroke="#A9714C" strokeWidth="0.9" strokeLinecap="round" />
            <path d="M54.5 64.5 Q56 67.2 58.5 66.3 Q60 67.6 61.5 66.3 Q64 67.2 65.5 64.5" fill="none" stroke={ink} strokeWidth="1.1" strokeLinecap="round" />
            <ellipse cx="44" cy="63" rx="4.5" ry="2.6" fill="#D96E5A" opacity="0.22" />
            <ellipse cx="76" cy="63" rx="4.5" ry="2.6" fill="#D96E5A" opacity="0.22" />
            <path d="M48 76 Q60 85 72 76 Q66 82 60 82.5 Q54 82 48 76 Z" fill="#8C5A3C" opacity="0.18" />

            {/* Mouth: a calm closed-mouth smile, and an open mouth used while talking */}
            <g className="cc-smile">
              <path d="M50.5 72 Q55 70.4 60 71.2 Q65 70.4 69.5 72 Q65 75.6 60 75.6 Q55 75.6 50.5 72 Z" fill="#B0705A" />
              <path d="M50 72 Q60 74.6 70 72" fill="none" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
              <path d="M50 72 Q49.2 71.2 49 70.4 M70 72 Q70.8 71.2 71 70.4" fill="none" stroke={ink} strokeWidth="0.9" strokeLinecap="round" />
            </g>
            <g className="cc-talk">
              <path d="M52.5 71.5 Q60 69.6 67.5 71.5 Q66 78.5 60 78.5 Q54 78.5 52.5 71.5 Z" fill="#5A1F1A" stroke={ink} strokeWidth="1" />
              <path d="M54 71.8 Q60 70.6 66 71.8 L65.4 73 Q60 72.2 54.6 73 Z" fill="#FFFFFF" />
              <ellipse cx="60" cy="76.6" rx="3.6" ry="1.4" fill="#B5544A" />
            </g>
          </g>

          {/* Waving hand (our left, clear of the online dot) */}
          <g className="cc-hand">
            <path d="M6 124 L12 99 L25 101 L27 124 Z" fill={`url(#${polo})`} stroke={ink} strokeWidth="0.9" />
            <g fill="#C68E63" stroke={ink} strokeWidth="0.6">
              <ellipse cx="18" cy="92" rx="7" ry="8" />
              <rect x="11.6" y="78.5" width="3.1" height="11" rx="1.55" />
              <rect x="15.3" y="76.5" width="3.1" height="12" rx="1.55" />
              <rect x="19" y="77.5" width="3.1" height="11" rx="1.55" />
              <rect x="22.4" y="80.5" width="2.9" height="9.5" rx="1.45" />
              <rect x="8.6" y="86" width="3" height="8" rx="1.5" transform="rotate(-38 10.1 92)" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
