"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp, Square, X } from "lucide-react";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { cn, EASE } from "@/lib/utils";
import { useLang } from "./i18n";

type Msg = { role: "user" | "assistant"; content: string };

const OPEN_EVENT = "sccs:open-carlita";
export function openCarlita() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

const NUDGE_KEY = "sccs-carlita-nudged";

function CarlitaAvatar({ className, online = true }: { className?: string; online?: boolean }) {
  return (
    <span className={cn("relative block shrink-0 rounded-full ring-2 ring-amber-400", className)} aria-hidden="true">
      <Image src="/brand/carlita/carlita.jpg" alt="" width={160} height={160} className="h-full w-full rounded-full object-cover" />
      {online && <span className="absolute bottom-0 right-0 h-[28%] max-h-3.5 w-[28%] max-w-3.5 rounded-full border-2 border-white bg-emerald-500" />}
    </span>
  );
}

/** Turn emails, phone numbers and on-site paths into links; keep everything else as text. */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\/[a-z-]+(?:\/[a-z-]+)*(?:#[a-z-]+)?|[\w.+-]+@[\w-]+\.[\w.]+|\+591[\d\s]{7,13}\d)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (/^\/[a-z-]/.test(p)) {
          return (
            <Link key={i} href={p} className="font-semibold text-crimson-600 underline decoration-amber-500 underline-offset-2">
              {p}
            </Link>
          );
        }
        if (/@/.test(p) && /\.\w/.test(p)) {
          return (
            <a key={i} href={`mailto:${p.replace(/[.,]$/, "")}`} className="font-semibold text-crimson-600 underline decoration-amber-500 underline-offset-2">
              {p}
            </a>
          );
        }
        if (/^\+591/.test(p)) {
          return (
            <a key={i} href={`tel:${p.replace(/\s/g, "")}`} className="font-semibold text-crimson-600 underline decoration-amber-500 underline-offset-2">
              {p}
            </a>
          );
        }
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}

export function Carlita() {
  const { t, lang } = useLang();
  const c = t.carlita;
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const [nudge, setNudge] = useState(false);

  // A short greeting slides out once per visit, then tucks itself away.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(NUDGE_KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (seen) return;
    const show = window.setTimeout(() => setNudge(true), 4500);
    const hide = window.setTimeout(() => setNudge(false), 16000);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, []);

  const dismissNudge = useCallback(() => {
    setNudge(false);
    try {
      sessionStorage.setItem(NUDGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (open) dismissNudge();
  }, [open, dismissNudge]);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, reduce]);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => launcherRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next: Msg[] = [...messages, { role: "user", content: q }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    try {
      const res = await fetch("/api/carlita", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: next }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) {
        const errText = res.status === 429 ? c.rateLimited : c.error;
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: errText }]);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: acc }]);
      }
    } catch (e) {
      if ((e as Error).name !== "AbortError") setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: c.error }]);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const stop = () => abortRef.current?.abort();

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.div
            className="fixed bottom-4 right-4 z-[70] flex items-end gap-3 sm:bottom-6 sm:right-6"
            initial={reduce ? false : { opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
          >
            <AnimatePresence>
              {nudge && (
                <motion.div
                  key="nudge"
                  role="status"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: 16, scale: 0.92 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: 12, scale: 0.95 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                  style={{ transformOrigin: "100% 100%" }}
                  className="relative mb-2 hidden max-w-[15rem] rounded-2xl rounded-br-md bg-white py-3 pl-4 pr-9 text-sm leading-snug text-navy-900 shadow-[0_12px_40px_rgba(20,20,58,0.2)] ring-1 ring-navy-800/10 sm:block"
                >
                  <button type="button" onClick={() => setOpen(true)} className="text-left">
                    {c.nudge}
                  </button>
                  <button type="button" onClick={dismissNudge} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full text-mist hover:bg-cream" aria-label={c.dismiss}>
                    <X className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button
              ref={launcherRef}
              type="button"
              onClick={() => setOpen(true)}
              whileHover={reduce ? undefined : { scale: 1.07 }}
              whileTap={reduce ? undefined : { scale: 0.94 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              className="group relative h-16 w-16 rounded-full shadow-[0_14px_40px_rgba(20,20,58,0.32)] sm:h-[4.5rem] sm:w-[4.5rem]"
              aria-label={c.open}
              title={c.launcher}
            >
              {!reduce && <span className="carlita-pulse absolute inset-0 rounded-full ring-2 ring-amber-400" aria-hidden="true" />}
              <CarlitaAvatar className="h-full w-full ring-[3px]" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label={c.title}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="tabbar-safe fixed inset-x-2 bottom-2 z-[70] flex max-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-3xl bg-ivory shadow-[0_30px_90px_rgba(20,20,58,0.35)] ring-1 ring-navy-800/10 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[38rem] sm:w-[25rem]"
          >
            <header className="flex items-center gap-3 bg-navy-800 px-5 py-4 text-white">
              <CarlitaAvatar className="h-12 w-12" />
              <div className="min-w-0 flex-1">
                <h2 className="font-semibold">{c.title}</h2>
                <p className="text-xs text-white/70">{c.subtitle}</p>
              </div>
              <button type="button" onClick={close} aria-label={c.close} className="pressable flex h-11 w-11 items-center justify-center rounded-full hover:bg-white/10">
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div ref={listRef} className="ios-scroll flex-1 space-y-3 overflow-y-auto px-4 py-5" aria-live="polite">
              <div className="flex gap-2.5">
                <CarlitaAvatar className="mt-0.5 h-8 w-8 ring-1" online={false} />
                <p className="max-w-[85%] rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-relaxed text-charcoal shadow-sm ring-1 ring-border">{c.greeting}</p>
              </div>
              {messages.length === 0 && (
                <ul className="flex flex-wrap gap-2 pl-9" aria-label={c.suggestionsLabel}>
                  {c.suggestions.map((s) => (
                    <li key={s}>
                      <button type="button" onClick={() => send(s)} className="pressable min-h-10 rounded-full border border-navy-800/15 bg-white px-3.5 text-left text-xs font-medium text-navy-800 hover:border-amber-500">
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {messages.map((m, i) =>
                m.role === "user" ? (
                  <p key={i} className="ml-auto max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tr-md bg-navy-800 px-4 py-3 text-sm leading-relaxed text-white">
                    {m.content}
                  </p>
                ) : (
                  <div key={i} className="flex gap-2.5">
                    <CarlitaAvatar className="mt-0.5 h-8 w-8 ring-1" online={false} />
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-tl-md bg-white px-4 py-3 text-sm leading-relaxed text-charcoal shadow-sm ring-1 ring-border">
                      {m.content ? (
                        <RichText text={m.content} />
                      ) : (
                        <span className="flex gap-1 py-1" aria-label={c.typing}>
                          {[0, 1, 2].map((d) => (
                            <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-navy-500" style={{ animationDelay: `${d * 120}ms` }} />
                          ))}
                        </span>
                      )}
                    </p>
                  </div>
                ),
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-border bg-white p-3"
            >
              <div className="flex items-end gap-2 rounded-2xl border border-input bg-ivory p-1.5 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/25">
                <label htmlFor="carlita-input" className="sr-only">
                  {c.placeholder}
                </label>
                <textarea
                  id="carlita-input"
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={1500}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  placeholder={c.placeholder}
                  className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2.5 py-2 text-sm outline-none placeholder:text-mist"
                />
                {busy ? (
                  <button type="button" onClick={stop} aria-label={c.stop} className="pressable flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-white">
                    <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                  </button>
                ) : (
                  <button type="submit" disabled={!input.trim()} aria-label={c.send} className="pressable flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-navy-950 disabled:opacity-40">
                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <p className="mt-2 px-1 text-[0.68rem] leading-snug text-mist">{c.disclaimer}</p>
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}
