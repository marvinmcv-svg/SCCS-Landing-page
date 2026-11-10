"use client";

import { SITE } from "@/lib/site";
import type { L } from "@/lib/i18n-types";
import { useLang } from "@/components/sccs/i18n";
import { Breadcrumbs } from "@/components/sccs/page-kit";
import { Container, Kicker, Section } from "@/components/sccs/sccs-shared";

/** Plain-language notices describing what this website actually does with information. */
const SECTIONS: { id: string; title: L; paragraphs: L[] }[] = [
  {
    id: "privacy",
    title: { en: "Privacy", es: "Privacidad" },
    paragraphs: [
      {
        en: "When you send the inquiry form on the Admissions page, we receive the details you enter: your name, email, phone (optional), the grade you are interested in, a preferred tour date (optional) and your message. The Admissions Office uses them only to reply to you and to arrange your visit. We do not sell or share them.",
        es: "Cuando envía el formulario de consulta en la página de Admisiones, recibimos los datos que usted ingresa: nombre, correo, teléfono (opcional), el grado de interés, una fecha preferida para la visita (opcional) y su mensaje. La Oficina de Admisiones los usa solo para responderle y coordinar su visita. No los vendemos ni los compartimos.",
      },
      {
        en: "Mr. Marvin, the virtual receptionist, is an AI assistant. The questions you type are sent to our AI provider to write an answer and are not used to identify you. Please do not share sensitive personal information in the chat; for anything about a specific child, contact the school directly.",
        es: "Mr. Marvin, el recepcionista virtual, es un asistente de inteligencia artificial. Las preguntas que escribe se envían a nuestro proveedor de IA para redactar una respuesta y no se usan para identificarle. Le pedimos no compartir información personal sensible en el chat; para cualquier tema sobre un niño en particular, comuníquese directamente con el colegio.",
      },
      {
        en: "This website does not use advertising or tracking cookies. Your browser remembers your language choice (English or Español) on your own device, and the site remembers for the current visit that you have seen Mr. Marvin's greeting.",
        es: "Este sitio no usa cookies publicitarias ni de seguimiento. Su navegador recuerda en su propio dispositivo el idioma que eligió (English o Español), y el sitio recuerda durante la visita que ya vio el saludo de Mr. Marvin.",
      },
      {
        en: `To see, correct or delete the information you sent us, write to ${SITE.email}.`,
        es: `Para ver, corregir o eliminar la información que nos envió, escriba a ${SITE.email}.`,
      },
    ],
  },
  {
    id: "terms",
    title: { en: "Terms of use", es: "Términos de uso" },
    paragraphs: [
      {
        en: "This website gives general information about Santa Cruz Cooperative School. Official decisions on admission, enrollment, fees and policies come from the school's offices, not from this website or from Mr. Marvin's answers.",
        es: "Este sitio ofrece información general sobre Santa Cruz Cooperative School. Las decisiones oficiales sobre admisión, inscripción, costos y políticas provienen de las oficinas del colegio, no de este sitio ni de las respuestas de Mr. Marvin.",
      },
      {
        en: "Photographs of students and staff belong to the SCCS community and are shared here to tell the school's story. Please do not copy or reuse them without the school's permission.",
        es: "Las fotografías de estudiantes y personal pertenecen a la comunidad SCCS y se comparten aquí para contar la historia del colegio. Por favor, no las copie ni reutilice sin autorización del colegio.",
      },
      {
        en: "Links to other websites, such as Skyward, Google Classroom or Instagram, are provided for convenience. Those services have their own terms and privacy policies.",
        es: "Los enlaces a otros sitios, como Skyward, Google Classroom o Instagram, se ofrecen por conveniencia. Esos servicios tienen sus propios términos y políticas de privacidad.",
      },
    ],
  },
  {
    id: "accessibility",
    title: { en: "Accessibility", es: "Accesibilidad" },
    paragraphs: [
      {
        en: "We want every family to be able to use this website. We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at level AA: the site works with a keyboard and screen readers, every photo has a description in English and Spanish, and animations calm down when your device asks for reduced motion.",
        es: "Queremos que todas las familias puedan usar este sitio. Buscamos cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.2 nivel AA: el sitio funciona con teclado y lectores de pantalla, cada foto tiene una descripción en inglés y español, y las animaciones se reducen cuando su dispositivo lo solicita.",
      },
      {
        en: `If something is hard to read or use, please tell us at ${SITE.email} or ${SITE.phone}, and we will help you get the information another way.`,
        es: `Si algo le resulta difícil de leer o usar, avísenos a ${SITE.email} o al ${SITE.phone}, y le ayudaremos a obtener la información de otra manera.`,
      },
    ],
  },
];

export function LegalPage() {
  const { tr, lang } = useLang();
  const title = lang === "es" ? "Privacidad, términos y accesibilidad" : "Privacy, terms & accessibility";
  return (
    <>
      <section className="bg-navy-950 text-cream">
        <Container className="pb-14 pt-40 sm:pb-20">
          <Breadcrumbs items={[{ href: "/legal", label: title }]} />
          <Kicker dark className="mt-6">
            Santa Cruz Cooperative School
          </Kicker>
          <h1 className="font-display mt-3 max-w-4xl text-balance text-[2.6rem] font-semibold leading-[1] tracking-[-0.03em] text-white sm:text-6xl">{title}</h1>
          <nav aria-label={title} className="mt-8 flex flex-wrap gap-2">
            {SECTIONS.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="pressable inline-flex min-h-10 items-center rounded-full border border-white/25 px-4 text-sm text-white/90 hover:border-amber-400 hover:text-amber-400">
                {tr(s.title)}
              </a>
            ))}
          </nav>
        </Container>
      </section>
      <Section>
        <Container className="max-w-3xl">
          {SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className={i > 0 ? "mt-16 scroll-mt-28" : "scroll-mt-28"}>
              <h2 className="font-display text-3xl font-semibold text-navy-900 sm:text-4xl">{tr(s.title)}</h2>
              {s.paragraphs.map((p, j) => (
                <p key={j} className="mt-5 text-lg leading-relaxed text-navy-900/80">
                  {tr(p)}
                </p>
              ))}
            </section>
          ))}
        </Container>
      </Section>
    </>
  );
}
