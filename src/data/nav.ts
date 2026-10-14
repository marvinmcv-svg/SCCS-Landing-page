import type { L } from "@/lib/i18n-types";

export type NavChild = { href: string; label: L; blurb: L };
export type NavPillar = { id: string; href: string; homeAnchor: string; label: L; children: NavChild[] };

/** The 5-pillar navigation. Admissions sits second, per the site audit. */
export const PILLARS: NavPillar[] = [
  {
    id: "discover",
    href: "/discover",
    homeAnchor: "discover",
    label: { en: "Discover SCCS", es: "Descubre SCCS" },
    children: [
      { href: "/discover", label: { en: "The SCCS Advantage", es: "La Ventaja SCCS" }, blurb: { en: "Mission, values, and the Learner Profile", es: "Misión, valores y Perfil del Estudiante" } },
      { href: "/discover/history", label: { en: "Our History", es: "Nuestra Historia" }, blurb: { en: "From 26 students to six decades of Jaguars", es: "De 26 estudiantes a seis décadas de Jaguars" } },
      { href: "/discover/safety-wellness", label: { en: "Safety & Wellness", es: "Seguridad y Bienestar" }, blurb: { en: "Child protection, SEL, and our medical center", es: "Protección infantil, SEL y centro médico" } },
      { href: "/discover/campus", label: { en: "Campus & Facilities", es: "Campus e Instalaciones" }, blurb: { en: "An 8-acre campus built as a third teacher", es: "Un campus de 8 acres pensado como tercer maestro" } },
      { href: "/discover/leadership", label: { en: "Leadership & Governance", es: "Liderazgo y Gobierno" }, blurb: { en: "Director, principals, and the Board", es: "Dirección, principales y Junta Directiva" } },
      { href: "/discover/careers", label: { en: "Work at SCCS", es: "Trabaja en SCCS" }, blurb: { en: "Join the people behind the Jaguars", es: "Únete al equipo detrás de los Jaguars" } },
    ],
  },
  {
    id: "admissions",
    href: "/admissions",
    homeAnchor: "admissions",
    label: { en: "Admissions", es: "Admisiones" },
    children: [
      { href: "/admissions", label: { en: "Admissions Overview", es: "Proceso de Admisión" }, blurb: { en: "Three phases to the Jaguar family", es: "Tres fases hacia la familia Jaguar" } },
      { href: "/admissions#inquire", label: { en: "Inquire & Visit", es: "Consulta y Visita" }, blurb: { en: "Book a campus tour in two minutes", es: "Reserva una visita en dos minutos" } },
      { href: "/admissions#faq", label: { en: "Questions Families Ask", es: "Preguntas Frecuentes" }, blurb: { en: "Transfers, testing, timelines", es: "Transferencias, exámenes y plazos" } },
    ],
  },
  {
    id: "learning",
    href: "/learning",
    homeAnchor: "learning",
    label: { en: "Learning & Outcomes", es: "Aprendizaje y Resultados" },
    children: [
      { href: "/learning", label: { en: "Our Curriculum", es: "Nuestro Currículo" }, blurb: { en: "Standards, methodology, and assessment", es: "Estándares, metodología y evaluación" } },
      { href: "/learning/academic-journey", label: { en: "Academic Journey", es: "Camino Académico" }, blurb: { en: "Elementary, Middle, and High School", es: "Elementary, Middle y High School" } },
      { href: "/learning/dual-diploma", label: { en: "The Dual-Diploma Advantage", es: "La Ventaja del Doble Diploma" }, blurb: { en: "U.S. Diploma + Bolivian Bachillerato", es: "Diploma de EE. UU. + Bachillerato boliviano" } },
      { href: "/learning/student-support", label: { en: "Student Support & Counseling", es: "Apoyo y Orientación" }, blurb: { en: "SST, counseling, and college counseling", es: "SST, orientación y consejería universitaria" } },
      { href: "/learning/university-matriculation", label: { en: "University Matriculation", es: "Matriculación Universitaria" }, blurb: { en: "Where our graduates go, on a live map", es: "A dónde van nuestros graduados, en un mapa interactivo" } },
    ],
  },
  {
    id: "campus-life",
    href: "/campus-life",
    homeAnchor: "campus-life",
    label: { en: "Campus Life", es: "Vida Escolar" },
    children: [
      { href: "/campus-life/jaguar-experience", label: { en: "The Jaguar Experience", es: "La Experiencia Jaguar" }, blurb: { en: "Innovation Hub, PAC, Athletics, Friendship Games", es: "Innovation Hub, PAC, Atletismo, Friendship Games" } },
      { href: "/campus-life/beyond-the-classroom", label: { en: "Beyond the Classroom", es: "Más Allá del Aula" }, blurb: { en: "Math Bowl to Senior Welcome Dinner", es: "Del Math Bowl a la Cena de Bienvenida" } },
      { href: "/campus-life/student-leadership", label: { en: "Leadership & Honors", es: "Liderazgo y Honores" }, blurb: { en: "STUCO, NHS/NJHS, Honor Roll, service", es: "STUCO, NHS/NJHS, Cuadro de Honor, servicio" } },
      { href: "/news", label: { en: "Jaguar News", es: "Jaguar News" }, blurb: { en: "Stories from the pride", es: "Historias del orgullo jaguar" } },
    ],
  },
  {
    id: "community",
    href: "/community",
    homeAnchor: "community",
    label: { en: "Community", es: "Comunidad" },
    children: [
      { href: "/community", label: { en: "Our Team", es: "Nuestro Equipo" }, blurb: { en: "The educators behind the Jaguars", es: "Los educadores detrás de los Jaguars" } },
      { href: "/community#parent-hub", label: { en: "Parent Hub", es: "Parent Hub" }, blurb: { en: "Portals, handbooks, Mother's Club", es: "Portales, manuales y Mother's Club" } },
      { href: "/community#dining", label: { en: "Dining · La Palette", es: "Comedor · La Palette" }, blurb: { en: "Menus, pricing, dietary requests", es: "Menús, precios y dietas especiales" } },
      { href: "/contact", label: { en: "Contact Us", es: "Contáctanos" }, blurb: { en: "Every office, one page", es: "Todas las oficinas, una sola página" } },
    ],
  },
];
