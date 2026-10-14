"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { useLang } from "./i18n";
import { LogoLockup } from "./sccs-shared";
import { AccreditationLogos } from "./credentials";
import { PORTALS } from "@/data/pages";
import { SITE } from "@/lib/site";

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z" />
    </svg>
  );
}
export { InstagramGlyph };

export function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  const explore = [
    { href: "/admissions", label: lang === "en" ? "Admissions" : "Admisiones" },
    { href: "/learning/dual-diploma", label: lang === "en" ? "Academic Excellence" : "Excelencia Académica" },
    { href: "/learning/university-matriculation", label: lang === "en" ? "University Outcomes" : "Resultados Universitarios" },
    { href: "/campus-life/jaguar-experience", label: lang === "en" ? "The Jaguar Experience" : "La Experiencia Jaguar" },
    { href: "/discover/careers", label: lang === "en" ? "Work at SCCS" : "Trabaja en SCCS" },
    { href: "/discover/school-profile", label: lang === "en" ? "School Profile" : "Perfil Escolar" },
  ];
  const families = [
    { href: "/news", label: "Jaguar News" },
    { href: "/campus-life#events", label: lang === "en" ? "School Calendar" : "Calendario Escolar" },
    { href: "/community#parent-hub", label: lang === "en" ? "Student & Parent Handbooks" : "Manuales de Estudiantes y Padres" },
    { href: "/learning/student-support", label: lang === "en" ? "The Hub · Student Support" : "The Hub · Apoyo Estudiantil" },
    { href: "/community#dining", label: lang === "en" ? "Catering · La Palette" : "Comedor · La Palette" },
  ];

  return (
    <footer id="footer" className="tabbar-safe mt-auto bg-navy-950 text-cream/80">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Link href="/" className="inline-flex items-center rounded-2xl bg-white px-4 py-3" aria-label="SCCS home">
              <LogoLockup />
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed">{t.footer.tagline}</p>
            <div className="mt-6 flex gap-2">
              <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram @sccsjaguars" className="pressable flex h-11 w-11 items-center justify-center rounded-full border border-white/15 hover:border-amber-400 hover:text-amber-400">
                <InstagramGlyph className="h-5 w-5" />
              </a>
              <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="pressable flex h-11 w-11 items-center justify-center rounded-full border border-white/15 hover:border-amber-400 hover:text-amber-400">
                <FacebookGlyph className="h-5 w-5" />
              </a>
            </div>
          </div>

          <nav aria-label={t.footer.explore}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">{t.footer.explore}</h2>
            <ul className="mt-5 space-y-1">
              {explore.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center text-sm hover:text-amber-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={t.footer.familiesCol}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">{t.footer.familiesCol}</h2>
            <ul className="mt-5 space-y-1">
              {families.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center text-sm hover:text-amber-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">{t.footer.contactCol}</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                  {t.footer.address}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <a href={SITE.phoneHref} className="hover:text-amber-400">
                  {t.footer.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="hover:text-amber-400">
                  {t.footer.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                {t.footer.hours}
              </li>
            </ul>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-cream/50">{t.footer.portalsTitle}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {PORTALS.slice(0, 4).map((p) => (
                <li key={p.name}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center rounded-full border border-white/15 px-3 text-xs hover:border-amber-400 hover:text-amber-400">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-xs text-sm text-cream/70">{t.footer.accreditation}</p>
          <AccreditationLogos size="sm" />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-cream/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t.footer.rights}
          </p>
          <ul className="flex gap-5" aria-label={t.footer.quickLinksLabel}>
            {t.footer.legal.map((l) => (
              <li key={l}>
                <Link href="/contact" className="hover:text-amber-400">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
