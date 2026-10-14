"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Clock, Loader2, Mail, Phone, User } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GRADE_VALUES, inquirySchema, type InquiryInput } from "@/lib/inquiry-schema";
import { cn, EASE } from "@/lib/utils";
import { SITE } from "@/lib/site";
import { useLang } from "./i18n";
import { Container, Reveal, Section, SectionHeading, TextLink, buttonStyles } from "./sccs-shared";

export function Stepper() {
  const { t } = useLang();
  const a = t.admissions;
  const [open, setOpen] = useState(0);
  return (
    <ol aria-label={a.stepperLabel} className="relative">
      <span className="absolute bottom-8 left-[1.6rem] top-8 w-px bg-gradient-to-b from-amber-500 via-amber-500/50 to-amber-500/10" aria-hidden="true" />
      {a.steps.map((s, i) => {
        const isOpen = open === i;
        return (
          <Reveal as="li" key={s.title} delay={i * 0.08} className="relative pb-6 pl-[4.5rem] last:pb-0">
            <span className="font-display absolute left-0 top-0 flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-full border-2 border-amber-500 bg-ivory text-lg font-semibold text-crimson-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex min-h-[3.2rem] w-full items-center justify-between gap-4 text-left"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-crimson-600">{s.phase}</span>
                <span className="font-display block text-xl font-semibold text-navy-900 sm:text-2xl">{s.title}</span>
              </span>
              <ChevronDown className={cn("h-5 w-5 shrink-0 text-navy-700 transition-transform duration-300", isOpen && "rotate-180")} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="pt-3 leading-relaxed text-mist">{s.body}</p>
                  <ul className="mt-4 space-y-2">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-sm text-navy-800">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100">
                          <Check className="h-3 w-3 text-crimson-600" aria-hidden="true" />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </Reveal>
        );
      })}
    </ol>
  );
}

const inputCls =
  "min-h-11 w-full rounded-xl border border-input bg-white px-4 py-2.5 text-sm text-charcoal outline-none transition-shadow placeholder:text-mist/70 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 aria-[invalid=true]:border-red-400";

function Field({ id, label, hint, error, children }: { id: string; label: React.ReactNode; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy-900">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-mist">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function InquiryForm() {
  const { t } = useLang();
  const a = t.admissions;
  const f = a.fields;
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<InquiryInput, unknown, z.output<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", email: "", phone: "", tourDate: "", message: "", website: "" },
  });

  const err = (k: keyof typeof a.errors) => (errors[k] ? a.errors[k] : undefined);
  const opt = <span className="font-normal text-mist">({f.optional})</span>;
  const req = (
    <span className="text-crimson-600" aria-hidden="true">
      *
    </span>
  );

  const onSubmit = handleSubmit(async (data) => {
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const json = (await res.json()) as { ok?: boolean };
      setStatus(json.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} className="py-10 text-center" role="status">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500 text-navy-950 shadow-[0_8px_32px_rgba(248,167,36,0.45)]">
          <Check className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="font-display mt-6 text-3xl font-semibold text-navy-900">{a.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-sm text-mist">{a.successBody}</p>
        <button
          type="button"
          onClick={() => {
            reset();
            setStatus("idle");
          }}
          className="mt-6 min-h-11 text-sm font-semibold text-navy-600 underline decoration-amber-500 underline-offset-4 hover:text-navy-800"
        >
          {a.another}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="inq-name" label={<>{f.name} {req}</>} error={err("name")}>
          <input id="inq-name" autoComplete="name" className={inputCls} aria-invalid={!!errors.name} aria-describedby={errors.name ? "inq-name-error" : undefined} {...register("name")} />
        </Field>
        <Field id="inq-email" label={<>{f.email} {req}</>} error={err("email")}>
          <input id="inq-email" type="email" autoComplete="email" className={inputCls} aria-invalid={!!errors.email} aria-describedby={errors.email ? "inq-email-error" : undefined} {...register("email")} />
        </Field>
        <Field id="inq-phone" label={<>{f.phone} {opt}</>} error={err("phone")}>
          <input id="inq-phone" type="tel" autoComplete="tel" className={inputCls} aria-invalid={!!errors.phone} {...register("phone")} />
        </Field>
        <Field id="inq-grade" label={<>{f.grade} {req}</>} error={err("grade")}>
          <Controller
            control={control}
            name="grade"
            render={({ field }) => (
              <Select value={field.value ?? ""} onValueChange={field.onChange}>
                <SelectTrigger id="inq-grade" aria-invalid={!!errors.grade} onBlur={field.onBlur}>
                  <SelectValue placeholder={f.gradePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {GRADE_VALUES.map((g, i) => (
                    <SelectItem key={g} value={g}>
                      {a.gradeOptions[i]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </div>
      <Field id="inq-date" label={<>{f.tourDate} {opt}</>} hint={a.tourNote}>
        <input id="inq-date" type="date" className={inputCls} {...register("tourDate")} />
      </Field>
      <Field id="inq-message" label={<>{f.message} {opt}</>} error={err("message")}>
        <textarea id="inq-message" rows={4} placeholder={f.messagePlaceholder} className={cn(inputCls, "resize-y")} aria-invalid={!!errors.message} {...register("message")} />
      </Field>
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="inq-website">Website</label>
        <input id="inq-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {a.error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"} className={cn(buttonStyles.gold, "h-13 w-full text-base disabled:opacity-70 sm:w-auto sm:px-10")}>
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {f.sending}
          </>
        ) : (
          f.submit
        )}
      </button>
    </form>
  );
}

export function ContactRail() {
  const { t } = useLang();
  const a = t.admissions;
  const icons = [User, Mail, Phone, Clock];
  const hrefs = [undefined, `mailto:${SITE.email}`, SITE.phoneHref, undefined];
  return (
    <div className="rounded-2xl bg-navy-950 p-7 text-cream">
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">{a.contactTitle}</h3>
      <ul className="mt-5 space-y-4">
        {a.contactLines.map((line, i) => {
          const Icon = icons[i];
          const href = hrefs[i];
          return (
            <li key={line} className="flex items-center gap-3 text-sm">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-amber-400">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              {href ? (
                <a href={href} className="hover:text-amber-400">
                  {line}
                </a>
              ) : (
                line
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function InquireBlock() {
  const { t } = useLang();
  const a = t.admissions;
  return (
    <div id="inquire" className="grid scroll-mt-28 gap-6 lg:grid-cols-[1.6fr_1fr]">
      <Reveal className="rounded-3xl border border-border bg-card p-6 shadow-[0_24px_60px_rgba(20,20,58,0.06)] sm:p-10">
        <h3 className="font-display text-3xl font-semibold text-navy-900">{a.formTitle}</h3>
        <p className="mt-2 max-w-lg text-mist">{a.formIntro}</p>
        <div className="mt-8">
          <InquiryForm />
        </div>
      </Reveal>
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal delay={0.1}>
          <ContactRail />
        </Reveal>
      </div>
    </div>
  );
}

export function Admissions() {
  const { t } = useLang();
  const a = t.admissions;
  return (
    <Section id="admissions" className="bg-cream/40">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading kicker={a.kicker} title={a.title} intro={a.intro} />
            <div className="mt-6">
              <TextLink href="/admissions">{a.more}</TextLink>
            </div>
          </div>
          <Stepper />
        </div>
        <div className="mt-16">
          <InquireBlock />
        </div>
      </Container>
    </Section>
  );
}
