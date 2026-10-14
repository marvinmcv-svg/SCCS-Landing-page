/**
 * Keyword-matched answers Carlita uses when no ANTHROPIC_API_KEY is configured
 * (or the API is unreachable). Verified facts only.
 */
import type { Lang } from "@/lib/i18n-types";

type Intent = { keys: string[]; en: string; es: string };

const INTENTS: Intent[] = [
  {
    keys: ["apply", "admission", "enrol", "enroll", "inscrip", "admis", "postul", "aplicar", "requisit", "requirement"],
    en: "Admissions run in three phases: 1) Application: the March intake targets August entry, with a digital dossier and a $50 application fee. 2) Evaluation: the SCCS Admission Test, then review by the Academic Committee and Divisional Principal. 3) Induction: fiscal consultation, goal-setting, and the Child Protection agreement. Start with the inquiry form at /admissions#inquire.",
    es: "La admisión tiene tres fases: 1) Aplicación: la convocatoria de marzo apunta al ingreso de agosto, con expediente digital y una tarifa de $50. 2) Evaluación: el SCCS Admission Test y la revisión del Comité Académico y el Director de División. 3) Inducción: consulta fiscal, metas académicas y el acuerdo de Protección Infantil. Comienza con el formulario en /admissions#inquire.",
  },
  {
    keys: ["tour", "visit", "visita", "conocer", "recorr"],
    en: "We'd love to show you the campus. Tours run Monday to Friday during school hours. Request one with the form at /admissions#inquire and our Admissions Director will reply within one school day.",
    es: "Nos encantará mostrarte el campus. Las visitas son de lunes a viernes en horario escolar. Solicítala en /admissions#inquire y nuestra Directora de Admisiones responderá en un día escolar.",
  },
  {
    keys: ["tuition", "fee", "cost", "price", "pension", "pensión", "costo", "precio", "mensualidad"],
    en: "Tuition and fees aren't published online. The Admissions Office will walk you through them: contactus@sccs.edu.bo or +591 3 3530808. (The application fee is $50.)",
    es: "Las pensiones no se publican en línea. La Oficina de Admisiones te explicará todo: contactus@sccs.edu.bo o +591 3 3530808. (La tarifa de aplicación es de $50.)",
  },
  {
    keys: ["diploma", "bachillerato", "dual", "doble", "ministry", "ministerio"],
    en: "Every SCCS graduate earns two credentials: the U.S. High School Diploma (24 credits, AP, Cognia-accredited) and the Bolivian Bachillerato en Humanidades (Ministry of Education). The dual track starts in Grade 7 and runs in parallel, with no extra year.",
    es: "Cada graduado de SCCS obtiene dos credenciales: el High School Diploma de EE. UU. (24 créditos, AP, acreditado por Cognia) y el Bachillerato en Humanidades boliviano (Ministerio de Educación). La doble vía empieza en 7.º grado y avanza en paralelo, sin año adicional.",
  },
  {
    keys: ["english", "inglés", "ingles", "language", "idioma", "spanish", "español"],
    en: "Instruction is in English from PK to Grade 12, with Spanish taught to Bolivian Ministry of Education standards. ELL/SLL support helps new students reach full fluency.",
    es: "La enseñanza es en inglés de PK a 12.º grado, con Lenguaje según los estándares del Ministerio de Educación. El apoyo ELL/SLL ayuda a los nuevos estudiantes a alcanzar fluidez plena.",
  },
  {
    keys: ["lunch", "food", "cafeter", "menu", "almuerzo", "comida", "palette", "comedor"],
    en: "La Palette Catering Français serves daily meals: Kinder Bs. 22, Primary Bs. 25, Secondary Bs. 32, with a 10% benefit for early payment. Dietary accommodations with 24-hour notice. Catering: +591 75311615.",
    es: "La Palette Catering Français ofrece almuerzo diario: Kínder Bs. 22, Primaria Bs. 25, Secundaria Bs. 32, con 10% de beneficio por pago anticipado. Dietas especiales con 24 horas de aviso. Catering: +591 75311615.",
  },
  {
    keys: ["hour", "horario", "open", "abierto", "address", "dirección", "direccion", "where", "dónde", "donde", "location", "ubicación"],
    en: "We're at Calle Barcelona #1, Barrio Las Palmas, Santa Cruz de la Sierra. Reception is open Monday to Friday, 7:30 AM to 4:00 PM. Phone +591 3 3530808.",
    es: "Estamos en Calle Barcelona #1, Barrio Las Palmas, Santa Cruz de la Sierra. Recepción: lunes a viernes, 7:30 a 16:00. Teléfono +591 3 3530808.",
  },
  {
    keys: ["safe", "protect", "segur", "protecc", "bully", "acoso", "doctor", "nurse", "médic", "medic", "enfermer"],
    en: "Safety comes first: a zero-tolerance child protection policy revised yearly, annual safeguarding certification for all staff, restorative practices, CASEL social-emotional learning, and a full-time physician and nurse on campus. For any concern, call +591 3 3530808.",
    es: "La seguridad es primero: política de protección infantil de tolerancia cero revisada cada año, certificación anual para todo el personal, prácticas restaurativas, aprendizaje socioemocional CASEL y una médica y enfermera de tiempo completo en el campus. Ante cualquier inquietud, llama al +591 3 3530808.",
  },
  {
    keys: ["job", "career", "work", "trabaj", "empleo", "vacante", "teach"],
    en: "Send your résumé, a cover letter, and references to jobs@sccs.edu.bo. Current openings are posted on Instagram, @sccsjaguars.",
    es: "Envía tu currículum, carta de presentación y referencias a jobs@sccs.edu.bo. Las vacantes se publican en Instagram, @sccsjaguars.",
  },
  {
    keys: ["transfer", "abroad", "exterior", "extranjero", "moving", "transferencia"],
    en: "Families joining from abroad are welcome. Our Registrar converts foreign records, authenticated by the relevant Bolivian embassy, into our credit system so your child joins the Dual Diploma without losing ground.",
    es: "Las familias que llegan del exterior son bienvenidas. Nuestro Registro convierte los récords extranjeros, autenticados por la embajada de Bolivia correspondiente, a nuestro sistema de créditos para que tu hijo se integre al Doble Diploma sin perder avance.",
  },
];

export function offlineAnswer(question: string, lang: Lang) {
  const q = question.toLowerCase();
  const hit = INTENTS.find((i) => i.keys.some((k) => q.includes(k)));
  if (hit) return hit[lang];
  return lang === "es"
    ? "Puedo ayudarte con admisiones, visitas al campus, el Doble Diploma, horarios, comedor y más. Para otras consultas, escribe a contactus@sccs.edu.bo o llama al +591 3 3530808."
    : "I can help with admissions, campus tours, the Dual Diploma, hours, dining, and more. For anything else, write to contactus@sccs.edu.bo or call +591 3 3530808.";
}
