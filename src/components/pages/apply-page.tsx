"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Check, FileText, Loader2, Mail, Paperclip } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { CAREERS } from "@/data/pages";
import { PAGE_PHOTOS } from "@/data/page-photos";
import { EXPERIENCE_VALUES, RESUME_ACCEPT, RESUME_MAX_BYTES, applicationSchema, type ApplicationInput } from "@/lib/application-schema";
import { cn, EASE } from "@/lib/utils";
import { useLang } from "@/components/sccs/i18n";
import { Container, Reveal, Section, buttonStyles } from "@/components/sccs/sccs-shared";
import { PageHero } from "@/components/sccs/page-kit";
import { Field, inputCls } from "@/components/sccs/admissions";

const F = CAREERS.form;
export const YEAR_ROUND_SLUG = "year-round";
export const GENERAL_SLUG = "general";

type ResumeError = "resume" | "resumeSize" | "resumeType" | null;
const RESUME_EXT = /\.(pdf|docx?)$/i;

function usePositions() {
  return useMemo(
    () => [
      ...CAREERS.openings.map((j) => ({ slug: j.slug, title: j.title, job: j })),
      { slug: YEAR_ROUND_SLUG, title: F.yearRoundOption, job: undefined },
      { slug: GENERAL_SLUG, title: F.generalOption, job: undefined },
    ],
    [],
  );
}

function ApplicationForm({ initialSlug, onSlugChange }: { initialSlug: string; onSlugChange: (slug: string) => void }) {
  const { tr } = useLang();
  const positions = usePositions();
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<ResumeError>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const initial = positions.find((p) => p.slug === initialSlug);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ApplicationInput, unknown, z.output<typeof applicationSchema>>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      positionSlug: initial?.slug ?? "",
      position: initial?.title.en ?? "",
      name: "",
      email: "",
      phone: "",
      location: "",
      link: "",
      letter: "",
      consent: false as unknown as true,
      website: "",
    },
  });

  const err = (k: keyof typeof F.errors) => (errors[k as keyof typeof errors] ? tr(F.errors[k]) : undefined);
  const opt = <span className="font-normal text-mist">({tr(F.optional)})</span>;
  const req = (
    <span className="text-crimson-600" aria-hidden="true">
      *
    </span>
  );

  const checkResume = (file: File | null): ResumeError => {
    if (!file) return "resume";
    if (file.size > RESUME_MAX_BYTES) return "resumeSize";
    if (!RESUME_EXT.test(file.name)) return "resumeType";
    return null;
  };

  const onPick = (file: File | null) => {
    setResume(file);
    setResumeError(file ? checkResume(file) : null);
  };

  const positionField = register("positionSlug");
  const onPosition = (slug: string) => {
    const p = positions.find((x) => x.slug === slug);
    setValue("position", p ? p.title.en : "", { shouldValidate: true });
    onSlugChange(slug);
  };

  const onSubmit = handleSubmit(
    async (data) => {
      const rErr = checkResume(resume);
      setResumeError(rErr);
      if (rErr || !resume) return;
      setStatus("sending");
      setServerError(null);
      const body = new FormData();
      for (const [k, v] of Object.entries(data)) if (v !== undefined) body.append(k, String(v));
      body.append("resume", resume);
      try {
        const res = await fetch("/api/applications", { method: "POST", body });
        const json = (await res.json()) as { ok?: boolean; error?: string };
        if (json.ok) {
          setStatus("success");
          topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        if (json.error === "resume-size") setResumeError("resumeSize");
        else if (json.error === "resume-type") setResumeError("resumeType");
        else setServerError(tr(F.error));
        setStatus("error");
      } catch {
        setServerError(tr(F.error));
        setStatus("error");
      }
    },
    () => setResumeError(checkResume(resume)),
  );

  if (status === "success") {
    return (
      <div ref={topRef} className="scroll-mt-28">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} className="py-10 text-center" role="status">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-navy-950 shadow-[0_8px_32px_rgba(248,167,36,0.45)]">
            <Check className="h-8 w-8" aria-hidden="true" />
          </span>
          <h2 className="font-display mt-6 text-3xl font-semibold text-navy-900">{tr(F.successTitle)}</h2>
          <p className="mx-auto mt-3 max-w-md text-mist">{tr(F.successBody)}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/discover/careers#openings" className={buttonStyles.primary}>
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {tr(F.allOpenings)}
            </Link>
            <button
              type="button"
              onClick={() => {
                reset();
                onPick(null);
                if (fileRef.current) fileRef.current.value = "";
                setStatus("idle");
              }}
              className={buttonStyles.outline}
            >
              {tr(F.another)}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="scroll-mt-28">
      <form onSubmit={onSubmit} noValidate className="space-y-5" aria-label={tr(F.title)}>
        <Field id="app-position" label={<>{tr(F.position)} {req}</>} error={err("position")}>
          <select
            id="app-position"
            className={cn(inputCls, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23292963%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
            aria-invalid={!!errors.position}
            aria-describedby={errors.position ? "app-position-error" : undefined}
            {...positionField}
            onChange={(e) => {
              void positionField.onChange(e);
              onPosition(e.target.value);
            }}
          >
            <option value="">{tr(F.positionPlaceholder)}</option>
            {positions.map((p) => (
              <option key={p.slug} value={p.slug}>
                {tr(p.title)}
              </option>
            ))}
          </select>
        </Field>
        <input type="hidden" {...register("position")} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="app-name" label={<>{tr(F.name)} {req}</>} error={err("name")}>
            <input id="app-name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "app-name-error" : undefined} {...register("name")} />
          </Field>
          <Field id="app-email" label={<>{tr(F.email)} {req}</>} error={err("email")}>
            <input id="app-email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} aria-describedby={errors.email ? "app-email-error" : undefined} {...register("email")} />
          </Field>
          <Field id="app-phone" label={<>{tr(F.phone)} {opt}</>} error={err("phone")}>
            <input id="app-phone" type="tel" autoComplete="tel" className={inputCls} aria-invalid={!!errors.phone} {...register("phone")} />
          </Field>
          <Field id="app-location" label={<>{tr(F.location)} {opt}</>}>
            <input id="app-location" autoComplete="address-level2" placeholder={tr(F.locationPlaceholder)} className={inputCls} {...register("location")} />
          </Field>
          <Field id="app-experience" label={<>{tr(F.experience)} {req}</>} error={err("experience")}>
            <select
              id="app-experience"
              defaultValue=""
              className={cn(inputCls, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%23292963%22 stroke-width=%222%22 viewBox=%220 0 24 24%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10")}
              aria-invalid={!!errors.experience}
              aria-describedby={errors.experience ? "app-experience-error" : undefined}
              {...register("experience")}
            >
              <option value="" disabled>
                {tr(F.experiencePlaceholder)}
              </option>
              {EXPERIENCE_VALUES.map((v, i) => (
                <option key={v} value={v}>
                  {tr(F.experienceOptions[i] ?? { en: v, es: v })}
                </option>
              ))}
            </select>
          </Field>
          <Field id="app-link" label={<>{tr(F.link)} {opt}</>} error={err("link")}>
            <input id="app-link" type="url" inputMode="url" placeholder="https://" className={inputCls} aria-invalid={!!errors.link} {...register("link")} />
          </Field>
        </div>
        <Field id="app-resume" label={<>{tr(F.resume)} {req}</>} hint={tr(F.resumeHint)} error={resumeError ? tr(F.errors[resumeError]) : undefined}>
          <label
            htmlFor="app-resume"
            className={cn(
              "flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-dashed bg-white px-4 py-3 text-sm transition-colors hover:border-amber-500 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/30",
              resumeError ? "border-red-400" : "border-input",
            )}
          >
            <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-navy-800 px-4 py-2 text-xs font-semibold text-ivory">
              <Paperclip className="h-3.5 w-3.5" aria-hidden="true" />
              {tr(F.resumeButton)}
            </span>
            <span className={cn("min-w-0 truncate", resume ? "font-medium text-navy-900" : "text-mist")} data-testid="resume-name">
              {resume ? `${resume.name} · ${(resume.size / 1024 / 1024).toFixed(1)} MB` : tr(F.resumeNone)}
            </span>
            <input
              ref={fileRef}
              id="app-resume"
              name="resume"
              type="file"
              accept={RESUME_ACCEPT}
              className="sr-only"
              aria-invalid={!!resumeError}
              aria-describedby={resumeError ? "app-resume-error" : undefined}
              onChange={(e) => onPick(e.target.files?.[0] ?? null)}
            />
          </label>
        </Field>
        <Field id="app-letter" label={<>{tr(F.letter)} {req}</>} error={err("letter")}>
          <textarea id="app-letter" rows={7} placeholder={tr(F.letterPlaceholder)} className={cn(inputCls, "resize-y")} aria-invalid={!!errors.letter} aria-describedby={errors.letter ? "app-letter-error" : undefined} {...register("letter")} />
        </Field>
        <div>
          <label htmlFor="app-consent" className="flex cursor-pointer items-start gap-3 text-sm text-navy-900/85">
            <input id="app-consent" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-navy-800" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "app-consent-error" : undefined} {...register("consent")} />
            <span>
              {tr(F.consent)} {req}
            </span>
          </label>
          {errors.consent && (
            <p id="app-consent-error" role="alert" className="mt-1.5 text-xs text-red-600">
              {tr(F.errors.consent)}
            </p>
          )}
        </div>
        {/* Honeypot — hidden from people, tempting to bots. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="app-website">Website</label>
          <input id="app-website" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>
        {serverError && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </p>
        )}
        <button type="submit" disabled={status === "sending"} className={cn(buttonStyles.gold, "h-13 w-full text-base disabled:opacity-70 sm:w-auto sm:px-10")}>
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              {tr(F.sending)}
            </>
          ) : (
            tr(F.submit)
          )}
        </button>
      </form>
    </div>
  );
}

function RoleSummary({ slug }: { slug: string }) {
  const { tr } = useLang();
  const positions = usePositions();
  const p = positions.find((x) => x.slug === slug);
  if (!p) return null;
  const job = p.job;
  return (
    <div className="rounded-2xl border border-border bg-card p-6" data-testid="role-summary">
      <p className="text-sm font-semibold text-crimson-600">{tr(F.applyingFor)}</p>
      <p className="font-display mt-2 text-2xl font-semibold leading-snug text-navy-900">{tr(p.title)}</p>
      {job ? (
        <>
          <p className="mt-1 text-sm font-semibold text-navy-800/80">{tr(job.detail)}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
            <span className="rounded-full bg-navy-100 px-3 py-1 text-navy-800">{tr(job.division)}</span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 px-3 py-1 text-navy-900">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {tr(job.start)}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mist">{tr(job.summary)}</p>
          {job.posting && (
            <a href={job.posting} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-navy-800 hover:text-crimson-600">
              <FileText className="h-4 w-4" aria-hidden="true" />
              {tr(CAREERS.postingLabel)}
            </a>
          )}
        </>
      ) : (
        p.slug === YEAR_ROUND_SLUG && <p className="mt-3 text-sm leading-relaxed text-mist">{tr(CAREERS.yearRound)}</p>
      )}
    </div>
  );
}

export function ApplyPage() {
  const { tr, t } = useLang();
  const params = useSearchParams();
  const [slug, setSlug] = useState(params.get("role") ?? "");

  // Keep the address in step with the chosen role, so the page can be shared or reloaded.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (slug) url.searchParams.set("role", slug);
    else url.searchParams.delete("role");
    window.history.replaceState(null, "", url);
  }, [slug]);

  return (
    <>
      <PageHero
        photo={PAGE_PHOTOS.careers.hero}
        kicker={tr(F.kicker)}
        title={tr(F.title)}
        lede={tr(F.lede)}
        crumbs={[
          { href: "/discover", label: t.nav.discover },
          { href: "/discover/careers", label: tr(CAREERS.kicker) },
          { href: "/discover/careers/apply", label: tr(CAREERS.applyLabel) },
        ]}
        imgPosition="object-[50%_55%]"
      />
      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
            <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-[0_24px_60px_rgba(20,20,58,0.06)] sm:p-10">
              <ApplicationForm initialSlug={slug} onSlugChange={setSlug} />
            </Reveal>
            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <RoleSummary slug={slug} />
              <div className="rounded-2xl bg-navy-950 p-6 text-cream">
                <h2 className="font-display text-xl font-semibold text-white">{tr(F.nextTitle)}</h2>
                <ol className="mt-4 space-y-3">
                  {F.next.map((n, i) => (
                    <li key={n.en} className="flex gap-3 text-sm leading-relaxed text-cream/85">
                      <span className="font-display w-4 shrink-0 font-semibold text-amber-400">{i + 1}</span>
                      <span>{tr(n)}</span>
                    </li>
                  ))}
                </ol>
                <a href="mailto:jobs@sccs.edu.bo" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {tr(F.emailInstead)}
                </a>
              </div>
              <Link href="/discover/careers#openings" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-navy-800 hover:text-crimson-600">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {tr(F.allOpenings)}
              </Link>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
