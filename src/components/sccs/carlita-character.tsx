"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

export type CarlitaMood = "idle" | "wave" | "thinking" | "talking";

/**
 * Carlita as an animated character: an illustrated bust drawn in SVG, modelled on
 * her photo (slicked-back dark hair with silver streaks, warm smile, red lipstick,
 * gold drop earrings, red top). Animations are pure CSS (see `.carlita-char` in
 * globals.css) and switch with `mood`:
 * - idle: breathing, blinking, swaying earrings
 * - wave: idle + a friendly wave
 * - thinking: eyes glance up, head tilts, brows lift
 * - talking: mouth opens and closes while she answers
 * Everything is static under prefers-reduced-motion.
 */
export function CarlitaCharacter({ mood = "idle", className }: { mood?: CarlitaMood; className?: string }) {
  const id = useId().replace(/:/g, "");
  const clip = `cc-clip-${id}`;
  const bg = `cc-bg-${id}`;
  const skin = `cc-skin-${id}`;
  const top = `cc-top-${id}`;

  return (
    <svg viewBox="0 0 120 120" className={cn("carlita-char block", className)} data-mood={mood} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clip}>
          <circle cx="60" cy="60" r="60" />
        </clipPath>
        <radialGradient id={bg} cx="50%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#FFF4DC" />
          <stop offset="100%" stopColor="#F6C76B" />
        </radialGradient>
        <linearGradient id={skin} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D9A07A" />
          <stop offset="100%" stopColor="#C38660" />
        </linearGradient>
        <linearGradient id={top} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D42A3C" />
          <stop offset="100%" stopColor="#A3172A" />
        </linearGradient>
      </defs>

      <g clipPath={`url(#${clip})`}>
        <rect width="120" height="120" fill={`url(#${bg})`} />

        <g className="cc-body">
          {/* Shoulders and red top */}
          <path d="M8 124 C12 100 34 90 60 90 C86 90 108 100 112 124 Z" fill={`url(#${top})`} />
          <path d="M46 91 Q60 104 74 91" fill="none" stroke="#8E1222" strokeWidth="1.6" strokeLinecap="round" />
          {/* Neck */}
          <path d="M50 76 L50 92 Q60 99 70 92 L70 76 Z" fill="#B97A55" />
          {/* Pearl and gold necklace */}
          <g fill="#F3E3B8" stroke="#C99A3E" strokeWidth="0.5">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
              const t = i / 8;
              const x = 47 + 26 * t;
              const y = 92 + 7 * Math.sin(Math.PI * t);
              return <circle key={i} cx={x} cy={y} r="1.5" />;
            })}
          </g>

          <g className="cc-head">
            {/* Hair behind the head (bun peeking at the crown) */}
            <ellipse cx="60" cy="24" rx="13" ry="7" fill="#2A1F1A" />
            {/* Ears */}
            <ellipse cx="34.5" cy="58" rx="4" ry="6" fill="#C38660" />
            <ellipse cx="85.5" cy="58" rx="4" ry="6" fill="#C38660" />
            {/* Earrings: gold drops that sway */}
            <g className="cc-earring cc-earring-l">
              <circle cx="34.5" cy="64.5" r="1.3" fill="#E2B04A" />
              <path d="M34.5 65.5 L34.5 70" stroke="#E2B04A" strokeWidth="1" />
              <path d="M34.5 70 L32 76 L34.5 79 L37 76 Z" fill="#E9BC55" stroke="#B88A2C" strokeWidth="0.5" />
            </g>
            <g className="cc-earring cc-earring-r">
              <circle cx="85.5" cy="64.5" r="1.3" fill="#E2B04A" />
              <path d="M85.5 65.5 L85.5 70" stroke="#E2B04A" strokeWidth="1" />
              <path d="M85.5 70 L83 76 L85.5 79 L88 76 Z" fill="#E9BC55" stroke="#B88A2C" strokeWidth="0.5" />
            </g>
            {/* Face */}
            <ellipse cx="60" cy="56" rx="25" ry="28.5" fill={`url(#${skin})`} />
            {/* Hair: slicked back, with silver streaks */}
            <path d="M34 54 C32 34 44 24 60 24 C76 24 88 34 86 54 C84 44 78 37 70 35 C64 34 56 34 50 35 C42 37 36 44 34 54 Z" fill="#2A1F1A" />
            <path d="M44 31 C52 27 68 27 76 31" fill="none" stroke="#9A918A" strokeWidth="1.6" strokeLinecap="round" opacity="0.85" />
            <path d="M40 37 C49 31 71 31 80 37" fill="none" stroke="#7D746D" strokeWidth="1.1" strokeLinecap="round" opacity="0.7" />
            <path d="M52 27 C56 26 64 26 68 27" fill="none" stroke="#B9B1AA" strokeWidth="1" strokeLinecap="round" opacity="0.8" />

            {/* Brows */}
            <g className="cc-brows" fill="none" stroke="#2A1F1A" strokeWidth="1.9" strokeLinecap="round">
              <path d="M42 44 Q48 40.5 54 43" />
              <path d="M66 43 Q72 40.5 78 44" />
            </g>

            {/* Eyes (blink + glance) */}
            <g className="cc-eyes">
              <g className="cc-eye">
                <ellipse cx="48" cy="51" rx="4.4" ry="3.2" fill="#FFFFFF" />
                <circle className="cc-pupil" cx="48" cy="51.3" r="2.3" fill="#2E1E16" />
                <path d="M43.2 49.6 Q48 46.4 52.8 49.6" fill="none" stroke="#1E1410" strokeWidth="1.3" strokeLinecap="round" />
              </g>
              <g className="cc-eye">
                <ellipse cx="72" cy="51" rx="4.4" ry="3.2" fill="#FFFFFF" />
                <circle className="cc-pupil" cx="72" cy="51.3" r="2.3" fill="#2E1E16" />
                <path d="M67.2 49.6 Q72 46.4 76.8 49.6" fill="none" stroke="#1E1410" strokeWidth="1.3" strokeLinecap="round" />
              </g>
            </g>

            {/* Nose and cheeks */}
            <path d="M59 56 Q57.6 62 60 63.2 Q62.2 63.6 63 62.4" fill="none" stroke="#A86E4B" strokeWidth="1.3" strokeLinecap="round" />
            <ellipse cx="43" cy="63" rx="5" ry="3" fill="#E07A6E" opacity="0.35" />
            <ellipse cx="77" cy="63" rx="5" ry="3" fill="#E07A6E" opacity="0.35" />

            {/* Mouth: a wide smile, and an open mouth used while talking */}
            <g className="cc-smile">
              <path d="M45.5 68 Q60 83 74.5 68 Q60 72.5 45.5 68 Z" fill="#9E1B2B" />
              <path d="M48.5 69.3 Q60 77.5 71.5 69.3 Q60 72.2 48.5 69.3 Z" fill="#FFFFFF" />
            </g>
            <g className="cc-talk">
              <ellipse cx="60" cy="72" rx="7" ry="4.6" fill="#9E1B2B" />
              <ellipse cx="60" cy="73.6" rx="4.2" ry="2" fill="#5E0E18" />
              <path d="M54 70.2 Q60 68.4 66 70.2" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
            </g>
          </g>

          {/* Waving hand (her right, our left, clear of the online dot) */}
          <g className="cc-hand">
            <path d="M6 124 L12 99 L25 101 L27 124 Z" fill={`url(#${top})`} />
            <g fill="#C98B62">
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
