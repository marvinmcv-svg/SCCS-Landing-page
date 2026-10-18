"use client";

/**
 * University destinations on an interactive 3D globe. Adapted from 21st.dev's
 * "Interactive Globe Explorer" (nexus-ui): a scroll-synced list beside a rotating
 * globe. Added: arcs from Santa Cruz to every destination, region filters, and the
 * school palette. Scrolling the list, clicking a name or clicking a pin all fly
 * the globe to that university.
 */
import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GlobeMethods, GlobeProps } from "react-globe.gl";
import { DESTINATIONS, HOME, type Destination, type Region } from "@/data/destinations";
import { cn } from "@/lib/utils";
import { useLang } from "./i18n";

const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center">
      <span className="h-14 w-14 animate-ping rounded-full bg-amber-400/30" />
    </div>
  ),
}) as React.ComponentType<GlobeProps & { ref?: React.MutableRefObject<GlobeMethods | undefined> }>;

type Filter = "all" | Region;

function useSquare(ref: React.RefObject<HTMLElement | null>) {
  const [size, setSize] = useState(460);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setSize(Math.max(280, Math.min(el.clientWidth, 620)));
    const ro = new ResizeObserver(update);
    ro.observe(el);
    update();
    return () => ro.disconnect();
  }, [ref]);
  return size;
}

export function GlobeExplorer() {
  const { tr, lang } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const list = useMemo(() => (filter === "all" ? DESTINATIONS : DESTINATIONS.filter((d) => d.region === filter)), [filter]);
  const [activeId, setActiveId] = useState<string | undefined>(list[0]?.id);
  const active = list.find((d) => d.id === activeId) ?? list[0];

  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const stageRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const programmatic = useRef(false);
  const size = useSquare(stageRef);
  const [reduce, setReduce] = useState(false);
  useEffect(() => setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches), []);

  const fly = useCallback((d: Destination | undefined, ms = 900) => {
    if (d) globeRef.current?.pointOfView({ lat: d.lat - 6, lng: d.lng, altitude: 2.1 }, ms);
  }, []);

  const onReady = useCallback(() => {
    const c = globeRef.current?.controls();
    if (c) {
      c.enableZoom = false;
      c.autoRotate = !reduce;
      c.autoRotateSpeed = 0.35;
    }
    fly(active, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  useEffect(() => {
    fly(active);
  }, [active, fly]);

  const choose = (d: Destination) => {
    setActiveId(d.id);
    programmatic.current = true;
    itemRefs.current[d.id]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    window.setTimeout(() => (programmatic.current = false), 900);
  };

  // The name nearest the middle of the list becomes the active one as you scroll.
  const onScroll = () => {
    const box = listRef.current;
    if (!box || programmatic.current) return;
    const mid = box.getBoundingClientRect().top + box.clientHeight / 2;
    let best: Destination | undefined;
    let dist = Infinity;
    for (const d of list) {
      const el = itemRefs.current[d.id];
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const dd = Math.abs(r.top + r.height / 2 - mid);
      if (dd < dist) {
        dist = dd;
        best = d;
      }
    }
    if (best && best.id !== activeId) setActiveId(best.id);
  };

  const arcs = useMemo(() => list.map((d) => ({ ...d, startLat: HOME.lat, startLng: HOME.lng, endLat: d.lat, endLng: d.lng })), [list]);
  const points = useMemo(() => [...list, { id: "home", name: "SCCS", lat: HOME.lat, lng: HOME.lng } as Destination], [list]);

  const filters: { id: Filter; label: string; n: number }[] = [
    { id: "all", label: lang === "es" ? "Todas" : "All", n: DESTINATIONS.length },
    { id: "us", label: lang === "es" ? "Estados Unidos" : "United States", n: DESTINATIONS.filter((d) => d.region === "us").length },
    { id: "europe", label: lang === "es" ? "Europa" : "Europe", n: DESTINATIONS.filter((d) => d.region === "europe").length },
    { id: "bolivia", label: "Bolivia", n: DESTINATIONS.filter((d) => d.region === "bolivia").length },
  ];

  return (
    <div className="overflow-hidden rounded-[2rem] bg-navy-950 ring-1 ring-white/10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-8">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label={lang === "es" ? "Región" : "Region"}>
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                const first = f.id === "all" ? DESTINATIONS[0] : DESTINATIONS.find((d) => d.region === f.id);
                setActiveId(first?.id);
                listRef.current?.scrollTo({ top: 0 });
              }}
              className={cn(
                "pressable min-h-11 rounded-full px-4 text-sm font-semibold transition-colors",
                filter === f.id ? "bg-amber-500 text-navy-950" : "bg-white/10 text-white hover:bg-white/20",
              )}
            >
              {f.label} <span className="ml-1 opacity-60">{f.n}</span>
            </button>
          ))}
        </div>
        <p className="text-sm text-white/65">{lang === "es" ? "Promociones 2023, 2024 y 2025" : "Classes of 2023, 2024 and 2025"}</p>
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* The list */}
        <div className="relative order-2 lg:order-1">
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-navy-950 to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-navy-950 to-transparent" aria-hidden="true" />
          <div
            ref={listRef}
            onScroll={onScroll}
            className="h-[22rem] overflow-y-auto px-5 py-[9rem] [scrollbar-width:none] sm:px-8 lg:h-[38rem] lg:py-[17rem] [&::-webkit-scrollbar]:hidden"
          >
            <ul>
              {list.map((d) => {
                const on = d.id === active?.id;
                return (
                  <li key={d.id}>
                    <button
                      ref={(el) => {
                        itemRefs.current[d.id] = el;
                      }}
                      type="button"
                      onClick={() => choose(d)}
                      aria-current={on}
                      className={cn(
                        "font-display block w-full py-2 text-left text-2xl font-semibold leading-tight tracking-[-0.02em] transition-all duration-500 sm:text-3xl",
                        on ? "translate-x-1 text-amber-400" : "text-white/25 hover:text-white/50",
                      )}
                    >
                      {d.name}
                      <span className={cn("mt-1 block font-sans text-sm font-medium tracking-normal transition-opacity", on ? "text-white/80 opacity-100" : "h-0 overflow-hidden opacity-0")}>
                        {d.city} · {tr(d.country)}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* The globe */}
        <div ref={stageRef} className="relative order-1 grid place-items-center py-6 lg:order-2 lg:py-8">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(61,61,143,0.55),transparent)] blur-2xl" aria-hidden="true" />
          <div role="img" aria-label={lang === "es" ? `Globo con ${list.length} universidades` : `Globe showing ${list.length} universities`}>
            <Globe
              ref={globeRef}
              width={size}
              height={size}
              backgroundColor="rgba(0,0,0,0)"
              globeImageUrl="/globe/earth-night.jpg"
              showAtmosphere
              atmosphereColor="#6868B8"
              atmosphereAltitude={0.18}
              arcsData={arcs}
              arcColor={(a: object) => ((a as Destination).id === active?.id ? ["rgba(248,167,36,0.15)", "#FBBD4D"] : ["rgba(248,167,36,0.05)", "rgba(248,167,36,0.45)"])}
              arcStroke={(a: object) => ((a as Destination).id === active?.id ? 1.1 : 0.35)}
              arcAltitudeAutoScale={0.45}
              arcDashLength={0.5}
              arcDashGap={0.25}
              arcDashAnimateTime={reduce ? 0 : 2600}
              pointsData={points}
              pointLat="lat"
              pointLng="lng"
              pointColor={(p: object) => ((p as Destination).id === "home" ? "#B72034" : (p as Destination).id === active?.id ? "#FBBD4D" : "#F8A724")}
              pointAltitude={(p: object) => ((p as Destination).id === active?.id ? 0.06 : 0.015)}
              pointRadius={(p: object) => ((p as Destination).id === "home" ? 0.7 : (p as Destination).id === active?.id ? 0.55 : 0.32)}
              pointLabel={(p: object) => (p as Destination).name}
              onPointClick={(p: object) => {
                const d = list.find((x) => x.id === (p as Destination).id);
                if (d) choose(d);
              }}
              onGlobeReady={onReady}
              animateIn
            />
          </div>
          {active && (
            <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md lg:bottom-10">
              <span className="text-amber-400">SCCS</span> → {active.city}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
