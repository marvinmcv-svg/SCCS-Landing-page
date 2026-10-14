import type { L } from "@/lib/i18n-types";

/**
 * School Profile and accreditations. Every figure comes from the SCCS High School
 * Profile 2025/2026 (published March 2026 on sccs.edu.bo) or the school's School
 * Profile page. Edit from the admin portal (School Profile, Accreditations).
 */

export const PROFILE_PDF = "https://sccs.edu.bo/wp-content/uploads/2026/03/FINAL-of-SCCS-School-Profile-25-26.pdf";

export const SCHOOL_PROFILE = {
  kicker: { en: "High School Profile 2025–26", es: "Perfil de High School 2025–26" },
  title: { en: "School Profile", es: "Perfil Escolar" },
  lede: {
    en: "The facts universities, families and partners ask for, in one place.",
    es: "Los datos que piden universidades, familias y socios, en un solo lugar.",
  },
  ceeb: "905500",
  download: { en: "Download the 2025–26 profile (PDF)", es: "Descarga el perfil 2025–26 (PDF)" },

  glance: [
    { value: "1959", label: { en: "Founded in Santa Cruz", es: "Fundado en Santa Cruz" } },
    { value: "685", label: { en: "Students, PK to Grade 12", es: "Estudiantes, de PK a 12.º grado" } },
    { value: "13%", label: { en: "Hold dual citizenship", es: "Con doble nacionalidad" } },
    { value: "180", label: { en: "Days of instruction a year", es: "Días de clase al año" } },
  ],

  aboutTitle: { en: "Our school", es: "Nuestro colegio" },
  about: {
    en: "Santa Cruz Cooperative School is a private, coeducational day school offering a rigorous college-preparatory program that leads to both American and Bolivian high school diplomas. The curriculum is aligned to the Common Core and NGSS standards, and English is the language of instruction from PK to Grade 12, except in world-language courses.",
    es: "Santa Cruz Cooperative School es un colegio privado y mixto de jornada diurna con un exigente programa preuniversitario que conduce a los diplomas de secundaria estadounidense y boliviano. El currículo está alineado con los estándares Common Core y NGSS, y el inglés es el idioma de enseñanza de PK a 12.º grado, salvo en los cursos de idiomas.",
  },
  calendar: {
    en: "The academic year runs 180 days, from August to June. Classes meet from 7:45 am to 3:10 pm, with enrichment and electives for every high school student and activities in the afternoons and on weekends.",
    es: "El año académico tiene 180 días, de agosto a junio. Las clases son de 7:45 a 15:10, con programas de enriquecimiento y electivas para todo estudiante de secundaria y actividades por las tardes y los fines de semana.",
  },

  contactsTitle: { en: "Who to contact", es: "A quién contactar" },
  contacts: [
    { name: "Dr. Casey Asato", role: { en: "General Director", es: "Director General" }, email: "casato@sccs.edu.bo" },
    { name: "Mr. Paul Petit", role: { en: "High School Principal", es: "Director de High School" }, email: "ppetit@sccs.edu.bo" },
    { name: "Mr. Hudson Thurston", role: { en: "Middle School Principal", es: "Director de Middle School" }, email: "hthurston@sccs.edu.bo" },
    { name: "Mrs. Clara Fernandez", role: { en: "College Counselor", es: "Consejera Universitaria" }, email: "cfernandez@sccs.edu.bo" },
  ],

  apTitle: { en: "Advanced Placement", es: "Advanced Placement" },
  apLede: {
    en: "In 2025, 104 SCCS students sat 174 AP exams. Half of all students in grades 10 to 12 took at least one AP course.",
    es: "En 2025, 104 estudiantes de SCCS rindieron 174 exámenes AP. La mitad de los estudiantes de 10.º a 12.º grado cursó al menos una materia AP.",
  },
  apHighlights: [
    { value: "73%", label: { en: "of 2025 scores were 3 or higher", es: "de los puntajes 2025 fueron 3 o más" } },
    { value: "25%", label: { en: "of 2025 scores were a 5", es: "de los puntajes 2025 fueron 5" } },
    { value: "3.15", label: { en: "mean score in 2025, up from 2.67 in 2021", es: "puntaje promedio 2025, frente a 2.67 en 2021" } },
  ],
  apAwards: [
    { value: "13", label: { en: "AP Scholars", es: "AP Scholars" } },
    { value: "3", label: { en: "AP Scholars with Honor", es: "AP Scholars with Honor" } },
    { value: "5", label: { en: "AP Scholars with Distinction", es: "AP Scholars with Distinction" } },
    { value: "4", label: { en: "AP International Diplomas", es: "AP International Diplomas" } },
  ],
  apTrendTitle: { en: "Five years of AP at SCCS", es: "Cinco años de AP en SCCS" },
  apTrend: [
    { year: "2021", students: 56, exams: 132, threePlus: 19, mean: 2.67 },
    { year: "2022", students: 73, exams: 156, threePlus: 26, mean: 2.65 },
    { year: "2023", students: 87, exams: 152, threePlus: 34, mean: 2.95 },
    { year: "2024", students: 83, exams: 189, threePlus: 31, mean: 2.89 },
    { year: "2025", students: 104, exams: 174, threePlus: 76, mean: 3.15 },
  ],
  apCoursesTitle: { en: "AP courses offered", es: "Cursos AP" },
  apCourses: [
    "AP English Language & Composition",
    "AP English Literature & Composition",
    "AP Spanish Language & Culture",
    "AP Spanish Literature & Culture",
    "AP Statistics",
    "AP World History: Modern",
    "AP Biology",
    "AP Physics",
    "AP Macroeconomics",
    "AP Online Courses",
  ],

  satTitle: { en: "SAT, Class of 2025", es: "SAT, Promoción 2025" },
  sat: [
    { value: "40", label: { en: "seniors tested on campus", es: "estudiantes de último año evaluados en el campus" } },
    { value: "563", label: { en: "average Evidence-Based Reading & Writing", es: "promedio en Lectura y Escritura" } },
    { value: "539", label: { en: "average Math", es: "promedio en Matemáticas" } },
    { value: "51%", label: { en: "met both College Board benchmarks", es: "alcanzó ambos puntos de referencia del College Board" } },
  ],

  diplomasTitle: { en: "Graduation requirements", es: "Requisitos de graduación" },
  diplomasLede: {
    en: "Students complete both programs at once, earning two diplomas without an extra year.",
    es: "Los estudiantes cursan ambos programas a la vez y obtienen dos diplomas sin un año adicional.",
  },
  usDiploma: {
    title: { en: "American High School Diploma (Grades 9–12)", es: "Diploma de High School estadounidense (9.º a 12.º)" },
    total: "24.75",
    rows: [
      { subject: { en: "English", es: "Inglés" }, credits: "4" },
      { subject: { en: "Mathematics", es: "Matemáticas" }, credits: "3" },
      { subject: { en: "Social Studies", es: "Estudios Sociales" }, credits: "3" },
      { subject: { en: "Science", es: "Ciencias" }, credits: "3" },
      { subject: { en: "Foreign Language", es: "Idioma Extranjero" }, credits: "2" },
      { subject: { en: "Physical Education", es: "Educación Física" }, credits: "2" },
      { subject: { en: "STEAM", es: "STEAM" }, credits: "1" },
      { subject: { en: "Senior Project", es: "Proyecto de Último Año" }, credits: "0.25" },
      { subject: { en: "Career Planning", es: "Orientación Profesional" }, credits: "0.5" },
      { subject: { en: "Electives", es: "Electivas" }, credits: "6" },
    ],
  },
  boDiploma: {
    title: { en: "Bolivian High School Diploma", es: "Bachillerato boliviano" },
    total: "41",
    rows: [
      { subject: { en: "Spanish / Native Language", es: "Lengua Castellana / Originaria" }, credits: "4" },
      { subject: { en: "Mathematics", es: "Matemáticas" }, credits: "5" },
      { subject: { en: "Social Studies", es: "Ciencias Sociales" }, credits: "6.5" },
      { subject: { en: "Biology / Geography", es: "Biología / Geografía" }, credits: "4" },
      { subject: { en: "Physics / Chemistry", es: "Física / Química" }, credits: "3.5" },
      { subject: { en: "World Language", es: "Lengua Extranjera" }, credits: "2" },
      { subject: { en: "Psychology / Philosophy", es: "Psicología / Filosofía" }, credits: "2" },
      { subject: { en: "Physical Education", es: "Educación Física" }, credits: "2" },
      { subject: { en: "Ethics / Morality", es: "Ética / Moral" }, credits: "2" },
      { subject: { en: "Art / Music", es: "Artes / Música" }, credits: "4" },
      { subject: { en: "Science, Technology & Production", es: "Ciencia, Tecnología y Producción" }, credits: "6" },
    ],
  },
  creditsLabel: { en: "Credits", es: "Créditos" },
  totalLabel: { en: "Total", es: "Total" },

  gradesTitle: { en: "Grade scale", es: "Escala de calificaciones" },
  grades: [
    { letter: "A+", range: "97–100" },
    { letter: "A", range: "93–96" },
    { letter: "A−", range: "90–92" },
    { letter: "B+", range: "87–89" },
    { letter: "B", range: "83–86" },
    { letter: "B−", range: "80–82" },
    { letter: "C+", range: "77–79" },
    { letter: "C", range: "73–76" },
    { letter: "C−", range: "70–72" },
    { letter: "D+", range: "67–69" },
    { letter: "D", range: "63–66" },
    { letter: "D−", range: "60–62" },
    { letter: "F", range: "0–59" },
  ],

  campusTitle: { en: "An 8-acre campus", es: "Un campus de 8 acres" },
  facilities: [
    { en: "43 classrooms", es: "43 aulas" },
    { en: "Library media center", es: "Centro de medios y biblioteca" },
    { en: "Four science laboratories", es: "Cuatro laboratorios de ciencias" },
    { en: "Four computer laboratories", es: "Cuatro laboratorios de computación" },
    { en: "The Innovation Hub (2025)", es: "El Innovation Hub (2025)" },
    { en: "Sports complex and three outdoor fields", es: "Complejo deportivo y tres canchas al aire libre" },
    { en: "Art and theater complex", es: "Complejo de artes y teatro" },
    { en: "Two elementary playgrounds (2024 and 2025)", es: "Dos parques infantiles de primaria (2024 y 2025)" },
    { en: "Full-service cafeteria", es: "Cafetería de servicio completo" },
    { en: "Two conference rooms", es: "Dos salas de conferencias" },
  ],

  valuesTitle: { en: "Our core values", es: "Nuestros valores" },
  values: [
    { en: "Respect", es: "Respeto" },
    { en: "Kindness", es: "Amabilidad" },
    { en: "Integrity", es: "Integridad" },
    { en: "Responsibility", es: "Responsabilidad" },
    { en: "Resilience", es: "Resiliencia" },
    { en: "Collaboration", es: "Colaboración" },
  ],

  acceptancesTitle: { en: "Where our graduates are admitted", es: "Dónde son admitidos nuestros graduados" },
  acceptancesLede: {
    en: "University acceptances for the Classes of 2023, 2024 and 2025.",
    es: "Admisiones universitarias de las promociones 2023, 2024 y 2025.",
  },
  regions: {
    all: { en: "All", es: "Todas" },
    northAmerica: { en: "North America", es: "Norteamérica" },
    europe: { en: "Europe", es: "Europa" },
    southAmerica: { en: "South America", es: "Sudamérica" },
  },
  searchLabel: { en: "Search universities", es: "Buscar universidades" },
};

/** Accreditations and memberships, shown on the home page, the footer and the profile. */
export const ACCREDITATIONS: { id: string; name: string; logo: string; kind: L; text: L; href: string }[] = [
  {
    id: "cognia",
    name: "Cognia",
    logo: "/brand/accreditation/cognia-accredited.png",
    kind: { en: "Accreditation", es: "Acreditación" },
    text: {
      en: "Accredited by the Southern Association of Colleges and Schools since 1987 and re-accredited by Cognia in April 2023.",
      es: "Acreditado por la Southern Association of Colleges and Schools desde 1987 y reacreditado por Cognia en abril de 2023.",
    },
    href: "https://www.cognia.org",
  },
  {
    id: "amisa",
    name: "AMISA",
    logo: "/brand/accreditation/amisa.png",
    kind: { en: "Membership", es: "Membresía" },
    text: {
      en: "A member of American International Schools in the Americas, the association of American-curriculum schools across the region.",
      es: "Miembro de American International Schools in the Americas, la asociación de colegios de currículo americano de la región.",
    },
    href: "https://www.amisa.us",
  },
  {
    id: "aaie",
    name: "AAIE",
    logo: "/brand/accreditation/aaie.png",
    kind: { en: "Membership", es: "Membresía" },
    text: {
      en: "A member of the Association for the Advancement of International Education, a worldwide network of international school leaders.",
      es: "Miembro de la Association for the Advancement of International Education, una red mundial de líderes de colegios internacionales.",
    },
    href: "https://www.aaie.org",
  },
  {
    id: "yondr",
    name: "Yondr Phone-Free School",
    logo: "/brand/accreditation/yondr-phone-free-school.png",
    kind: { en: "Partnership", es: "Alianza" },
    text: {
      en: "A Yondr Phone-Free School partner, keeping the school day focused on learning and on each other.",
      es: "Colegio aliado de Yondr Phone-Free School, para que la jornada escolar se centre en aprender y en los demás.",
    },
    href: "https://www.overyondr.com",
  },
];

export const MINISTRY = {
  title: { en: "Bolivian Ministry of Education", es: "Ministerio de Educación de Bolivia" },
  text: {
    en: "Recognized by the Bolivian Ministry of Education since 1960 (Resolution 253).",
    es: "Reconocido por el Ministerio de Educación de Bolivia desde 1960 (Resolución 253).",
  },
};
