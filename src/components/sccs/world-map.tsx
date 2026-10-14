"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { COUNTRIES, type MatriculationEntry } from "@/data/sccs-content";
import { useLang } from "./i18n";

const W = 1000;
const H = 500;

function project(lat: number, lng: number): [number, number] {
  return [((lng + 180) / 360) * W, ((82 - lat) / 140) * H];
}

// Coarse coastlines as [lng, lat] — original artwork.
const LAND: number[][][] = [
  [[-168,68],[-160,70],[-140,70],[-128,71],[-110,73],[-95,74],[-82,74],[-70,68],[-61,60],[-55,52],[-60,47],[-66,44],[-70,42],[-74,40],[-76,35],[-81,31],[-80,25],[-82,28],[-85,30],[-90,29],[-94,29],[-97,26],[-96,20],[-91,21],[-87,21],[-88,17],[-84,10],[-79,8],[-81,8],[-85,11],[-92,15],[-97,17],[-105,20],[-110,24],[-113,28],[-115,31],[-117,33],[-121,35],[-124,40],[-124,46],[-127,50],[-132,55],[-137,58],[-146,60],[-151,59],[-158,57],[-164,54],[-168,60],[-166,64],[-168,68]],
  [[-52,60],[-44,60],[-40,64],[-32,68],[-22,70],[-20,75],[-25,80],[-38,82],[-50,82],[-58,78],[-56,72],[-54,66],[-52,60]],
  [[-81,8],[-76,11],[-70,12],[-64,10],[-60,8],[-52,5],[-50,0],[-44,-3],[-35,-6],[-37,-12],[-39,-18],[-46,-24],[-52,-30],[-58,-35],[-62,-39],[-65,-42],[-68,-47],[-70,-53],[-74,-52],[-73,-45],[-71,-37],[-70,-28],[-70,-18],[-75,-14],[-80,-6],[-81,-3],[-80,1],[-81,8]],
  [[-10,35],[-6,35],[3,37],[10,37],[20,32],[25,32],[32,31],[34,28],[37,22],[40,16],[43,11],[48,11],[51,12],[45,3],[41,-2],[40,-10],[36,-18],[33,-25],[28,-33],[20,-35],[18,-32],[12,-18],[9,-5],[9,4],[-8,4],[-13,9],[-17,15],[-16,20],[-13,26],[-10,30],[-10,35]],
  [[-9.5,37],[-9,43],[-4,48],[0,50],[4,52],[8,54],[9,57],[6,58],[5,61],[5,64],[12,66],[16,69],[24,71],[30,70],[40,67],[50,69],[60,70],[70,73],[85,74],[100,76],[112,74],[125,72],[135,72],[150,70],[165,69],[178,66],[178,64],[170,60],[162,54],[157,57],[150,60],[143,54],[138,46],[130,42],[126,40],[121,38],[122,32],[120,26],[114,22],[110,20],[107,10],[104,1],[103,7],[100,13],[97,16],[94,16],[91,22],[88,21],[80,13],[77,8],[73,15],[70,21],[66,25],[61,25],[57,26],[52,28],[48,30],[48,29],[51,27],[53,25],[56,24],[59,22],[55,17],[49,14],[43,12],[40,16],[38,20],[35,28],[34,31],[36,36],[28,36],[24,38],[20,40],[16,38],[12,44],[6,43],[0,39],[-2,36],[-6,36],[-9.5,37]],
  [[-5,50],[-3,53],[-5,56],[-4,58],[-2,58],[-1,55],[0,52],[1,51],[-5,50]],
  [[-10,52],[-9,54],[-7,55],[-6,54],[-6,52],[-9,51.5],[-10,52]],
  [[-24,65],[-22,66.5],[-18,66.5],[-14,65.5],[-17,64.5],[-22,64],[-24,65]],
  [[130,31],[134,34],[138,36],[141,39],[145,44],[142,40],[140,37],[136,36],[132,34],[130,31]],
  [[95,5.5],[99,2],[104,-2],[106,-6],[103,-5.5],[98,0],[95,5.5]],
  [[105,-6],[110,-7],[114,-8],[114,-8.7],[108,-7.7],[105,-6]],
  [[109,1.5],[112,3],[117,7],[119,1],[117,-2],[114,-3.5],[110,-2],[109,1.5]],
  [[119,1],[121,-2],[122,-5],[120,-5.5],[119,-2],[119,1]],
  [[131,-1],[136,-2],[141,-3],[145,-5],[149,-6],[147,-8],[141,-8],[135,-6],[131,-2],[131,-1]],
  [[120,18],[122,16],[124,13],[125,9],[122,8],[121,13],[120,18]],
  [[114,-22],[122,-18],[130,-12],[136,-12],[142,-11],[146,-19],[150,-25],[153,-28],[151,-34],[150,-37],[146,-39],[140,-36],[136,-35],[131,-32],[125,-33],[118,-35],[115,-30],[114,-22]],
  [[173,-35],[176,-37],[178,-38],[177,-40],[174,-41],[171,-43],[168,-46],[166,-46],[170,-43],[172,-40],[173,-35]],
  [[44,-16],[49,-13],[50,-16],[49,-25],[47,-25],[44,-20],[44,-16]],
  [[80,9],[82,8],[81,6],[80,6],[80,9]],
  [[-84,22],[-80,23],[-75,20],[-78,20],[-84,22]],
];

const HOLES: number[][][] = [
  [[-94,57],[-86,55],[-79,58],[-83,63],[-90,64],[-94,60],[-94,57]],
  [[10,54.5],[19,55],[21,58.5],[19,60],[22,63],[18,60],[16,57],[11,56],[10,54.5]],
  [[28,42],[33,41],[38,42],[41,43],[38,46],[33,47],[29,46],[28,42]],
  [[48,47],[52,44],[53,40],[51,37],[48,38],[46,42],[48,47]],
];

function pointInPoly(lng: number, lat: number, poly: number[][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

let dotCache: [number, number][] | null = null;

function buildDots(): [number, number][] {
  if (dotCache) return dotCache;
  const dots: [number, number][] = [];
  const step = 12.5;
  for (let y = 6; y < H; y += step) {
    for (let x = 6; x < W; x += step) {
      const lng = (x / W) * 360 - 180;
      const lat = 82 - (y / H) * 140;
      if (HOLES.some((h) => pointInPoly(lng, lat, h))) continue;
      if (LAND.some((p) => pointInPoly(lng, lat, p))) dots.push([x, y]);
    }
  }
  dotCache = dots;
  return dots;
}

const DotsLayer = memo(function DotsLayer({ dots }: { dots: [number, number][] }) {
  return (
    <g fill="#6868B8" opacity={0.55}>
      {dots.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.1} />
      ))}
    </g>
  );
});

export function WorldMap({ entries }: { entries: MatriculationEntry[] }) {
  const { t, tr } = useLang();
  const reduce = useReducedMotion();
  const dots = useMemo(buildDots, []);
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const m = t.matriculation;

  // Filter changes reset any selection.
  useEffect(() => {
    setSelected(null);
    setHovered(null);
  }, [entries]);

  const hoveredEntry = entries.find((e) => e.university === hovered);
  const selectedEntry = entries.find((e) => e.university === selected);
  const equatorY = project(0, 0)[1];
  const grads = (n: number) => `${n} ${n === 1 ? m.gradLabel : m.gradsLabel}`;

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={m.mapAria}>
        <DotsLayer dots={dots} />
        <line x1={0} x2={W} y1={equatorY} y2={equatorY} stroke="#F8A724" strokeOpacity={0.12} strokeDasharray="3 8" strokeWidth={1} />
        {entries.map((e, i) => {
          const [x, y] = project(e.lat, e.lng);
          const r = 4 + Math.sqrt(e.count) * 1.5;
          const dim = hovered !== null && hovered !== e.university;
          const label = `${e.university}: ${grads(e.count)}`;
          return (
            <g key={e.university} transform={`translate(${x} ${y})`}>
              <motion.g
                role="button"
                tabIndex={0}
                aria-label={label}
                aria-pressed={selected === e.university}
                style={{ cursor: "pointer", outline: "none" }}
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1, opacity: dim ? 0.35 : 1 }}
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 320, damping: 22, delay: 0.04 * i }}
                onMouseEnter={() => setHovered(e.university)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(e.university)}
                onBlur={() => setHovered(null)}
                onClick={() => setSelected((s) => (s === e.university ? null : e.university))}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    setSelected((s) => (s === e.university ? null : e.university));
                  }
                }}
              >
                {e.count >= 5 && !reduce && <circle r={r} fill="#F8A724" className="sccs-pin-pulse" />}
                <circle r={r + 6} fill="transparent" />
                <circle r={r} fill="#F8A724" stroke="#14143A" strokeWidth={1.4} />
                <circle r={r * 0.38} fill="#FEF1D8" opacity={0.9} />
                {selected === e.university && <circle r={r + 4} fill="none" stroke="#FEF1D8" strokeWidth={1.5} />}
              </motion.g>
            </g>
          );
        })}
      </svg>

      {hoveredEntry && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-xl border border-white/10 bg-navy-950/95 px-3.5 py-2.5 text-xs shadow-xl backdrop-blur"
          style={{
            left: `${(project(hoveredEntry.lat, hoveredEntry.lng)[0] / W) * 100}%`,
            top: `calc(${(project(hoveredEntry.lat, hoveredEntry.lng)[1] / H) * 100}% - 14px)`,
          }}
        >
          <p className="whitespace-nowrap font-semibold text-white">{hoveredEntry.university}</p>
          <p className="mt-0.5 whitespace-nowrap text-cream/70">
            {COUNTRIES[hoveredEntry.country].flag} {tr(COUNTRIES[hoveredEntry.country].name)} · <span className="text-amber-400">{grads(hoveredEntry.count)}</span>
          </p>
        </div>
      )}

      {selectedEntry && (
        <div className="absolute bottom-2 left-2 z-10 flex max-w-[calc(100%-1rem)] items-start gap-3 rounded-xl border border-amber-400/30 bg-navy-950/95 p-3.5 pr-12 text-xs shadow-2xl backdrop-blur sm:bottom-4 sm:left-4">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-white">{selectedEntry.university}</p>
            <p className="mt-0.5 text-cream/70">
              {COUNTRIES[selectedEntry.country].flag} {tr(COUNTRIES[selectedEntry.country].name)} · {grads(selectedEntry.count)} · {selectedEntry.years.split(",").length} {m.classesLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelected(null)}
            aria-label={m.dismiss}
            className="absolute right-1 top-1 flex h-10 w-10 items-center justify-center rounded-full text-cream/70 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
