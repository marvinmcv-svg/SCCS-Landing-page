/**
 * SCCS content data — one typed module, no database.
 *
 * Stories tagged `source: "instagram"` are real posts from @sccsjaguars.
 * Everything else here (sample news, events, team roster, matriculation table)
 * is realistic placeholder content from the master build prompt; replace it in
 * this file without touching any component.
 */
import { media, type Photo } from "./media";
import type { L } from "@/lib/i18n-types";

export type NewsCategory = "ACADEMICS" | "ARTS" | "ATHLETICS" | "COMMUNITY";
export type NewsPost = {
  slug: string;
  category: NewsCategory;
  title: L;
  excerpt: L;
  body: L[];
  image: Photo;
  gallery?: Photo[];
  date: string;
  featured: boolean;
  source?: "instagram";
  instagramUrl?: string;
};

export type Division = "ES" | "MS" | "HS" | "COMMUNITY";
export type CampusEvent = { date: string; division: Division; title: L; desc: L; cta: L; href: string };

export type TeamCategory = "LEADERSHIP" | "FACULTY" | "SPECIALIST" | "SST" | "ADMIN";
export type TeamMember = { name: string; role: L; division: "ALL" | "ES" | "MS" | "HS"; category: TeamCategory; bio: L };

export type CountryCode = "US" | "CA" | "GB" | "ES" | "NL" | "IT" | "BO" | "CO" | "CL" | "MX" | "AU";
export type MatriculationEntry = { university: string; country: CountryCode; lat: number; lng: number; count: number; years: string };

export const NEWS: NewsPost[] = [
  {
    slug: "friendship-games-2026",
    category: "ATHLETICS",
    date: "2026-10-04",
    featured: true,
    image: media.fgPepRally,
    gallery: [media.fgBasketballAcs, media.fgCheer, media.fgWaterGames, media.fgHsTeam],
    title: { en: "Friendship Games: Jaguars Take the Trophy", es: "Friendship Games: los Jaguars se llevan el trofeo" },
    excerpt: {
      en: "Our Jaguars hosted ACS, CCS, and AISB for another edition of the region's oldest school games — a tradition since 1980.",
      es: "Nuestros Jaguars recibieron a ACS, CCS y AISB en una nueva edición de los juegos escolares más antiguos de la región — una tradición desde 1980.",
    },
    body: [
      { en: "For three days the campus belonged to four schools. Basketball under the gym lights, volleyball and soccer on the fields, track on the loop — and, since 2017, the quieter intensity of Knowledge Bowl and chess.", es: "Durante tres días el campus perteneció a cuatro colegios. Básquet bajo las luces del coliseo, vóleibol y fútbol en las canchas, atletismo en el circuito — y, desde 2017, la intensidad silenciosa del Knowledge Bowl y el ajedrez." },
      { en: "The pep rally set the tone: a packed gym, a cheer squad stacking pyramids three high, and a student section that never sat down. By the closing ceremony the trophy was staying home.", es: "El pep rally marcó el tono: un coliseo lleno, un equipo de porristas armando pirámides de tres niveles y una barra estudiantil que nunca se sentó. Para la ceremonia de clausura, el trofeo se quedaba en casa." },
      { en: "Next year the Games rotate away, and the Jaguars travel. The bond, as always, travels with them.", es: "El próximo año los Juegos rotan de sede y los Jaguars viajan. El vínculo, como siempre, viaja con ellos." },
    ],
  },
  {
    slug: "knowledge-bowl-champions",
    category: "ACADEMICS",
    date: "2026-10-02",
    featured: false,
    image: media.fgStudents,
    title: { en: "Knowledge Bowl Champions — Again", es: "Campeones de Knowledge Bowl — otra vez" },
    excerpt: {
      en: "Our team defended its title in the academic competition that has been part of the Friendship Games since 2017.",
      es: "Nuestro equipo defendió su título en la competencia académica que forma parte de los Friendship Games desde 2017.",
    },
    body: [
      { en: "Buzzers, rapid-fire history, and a final round decided on a single chemistry question. Our Knowledge Bowl team defended the title it has now held through consecutive Games.", es: "Pulsadores, historia a toda velocidad y una ronda final decidida en una sola pregunta de química. Nuestro equipo de Knowledge Bowl defendió el título que ya sostiene por Juegos consecutivos." },
      { en: "The team trains weekly after school, mixing AP content with general knowledge drills — the same habits of mind that power our university matriculation.", es: "El equipo entrena cada semana después de clases, combinando contenido AP con ejercicios de cultura general — los mismos hábitos mentales que impulsan nuestra matriculación universitaria." },
    ],
  },
  {
    slug: "ms-robotics-national-finals",
    category: "ACADEMICS",
    date: "2026-09-28",
    featured: false,
    image: media.innovationLab,
    gallery: [media.maker3dPrinter, media.computerLabHs],
    title: { en: "Middle School Robotics Advances to National Finals", es: "Robótica de Middle School avanza a la final nacional" },
    excerpt: {
      en: "Grade 7 engineers designed, built, and programmed their way to the national stage in our STEAM ecosystem.",
      es: "Estudiantes de séptimo grado diseñaron, construyeron y programaron su camino al escenario nacional en nuestro ecosistema STEAM.",
    },
    body: [
      { en: "Six weeks of prototyping, two rebuilt drivetrains, and one sleepless night of code later, our Grade 7 robotics team qualified for the national finals.", es: "Seis semanas de prototipos, dos sistemas de tracción reconstruidos y una noche sin dormir programando después, nuestro equipo de robótica de séptimo grado clasificó a la final nacional." },
      { en: "It's what our STEAM ecosystem was built for: students who don't consume technology, but design it.", es: "Para eso se construyó nuestro ecosistema STEAM: estudiantes que no consumen tecnología, sino que la diseñan." },
    ],
  },
  {
    slug: "arts-festival-lights-up-the-pac",
    category: "ARTS",
    date: "2026-09-20",
    featured: false,
    image: media.pacStage,
    gallery: [media.esAwardsStage, media.pacFlags],
    title: { en: "Arts Festival Lights Up the Stage", es: "El Festival de Arte ilumina el escenario" },
    excerpt: {
      en: "Band, choir, and theater filled the Performing Arts Center for a night that showcased the whole child in motion.",
      es: "Banda, coro y teatro llenaron el Performing Arts Center en una noche que puso en movimiento al estudiante completo.",
    },
    body: [
      { en: "From first-grade choir to a senior jazz combo, the Arts Festival turned the PAC into a single, sold-out stage for every division.", es: "Desde el coro de primer grado hasta un combo de jazz de último año, el Festival de Arte convirtió al PAC en un solo escenario lleno para todas las divisiones." },
      { en: "Visual art lined the lobby; the theater program closed the night with a full-cast musical number under the lights.", es: "El arte visual llenó el vestíbulo; el programa de teatro cerró la noche con un número musical de todo el elenco bajo las luces." },
    ],
  },
  {
    slug: "second-grade-changes-of-matter",
    category: "ACADEMICS",
    date: "2026-09-07",
    featured: false,
    source: "instagram",
    instagramUrl: "https://www.instagram.com/p/Dc_ZcwfFM-n/",
    image: media.igMatter1,
    gallery: [media.igMatter2, media.igMatter3, media.igMatter4, media.igMatter5],
    title: { en: "Second Graders Melt the Science of Matter", es: "Segundo grado derrite la ciencia de la materia" },
    excerpt: {
      en: "A popsicle, the Santa Cruz sun, and a clipboard: our second graders watched a solid become a liquid — then enjoyed the results.",
      es: "Una paleta, el sol de Santa Cruz y una tablilla: nuestros estudiantes de segundo grado vieron un sólido volverse líquido — y luego disfrutaron el resultado.",
    },
    body: [
      { en: "Our second graders explored changes of matter through a delicious experiment. They carried frozen ice-cream popsicles — solids — out into the Santa Cruz sun and watched closely as the heat changed their state.", es: "Nuestros estudiantes de segundo grado exploraron los cambios de la materia con un experimento delicioso. Llevaron paletas heladas — sólidos — al sol de Santa Cruz y observaron de cerca cómo el calor cambiaba su estado." },
      { en: "Clipboards out, they observed, predicted, and recorded their findings like real scientists. After that, there was only one thing left to do: enjoy the popsicles.", es: "Con tablillas en mano, observaron, predijeron y registraron sus hallazgos como verdaderos científicos. Después, solo quedaba una cosa por hacer: disfrutar las paletas." },
      { en: "It's NGSS science the way young children learn best — by experiencing it firsthand.", es: "Es ciencia NGSS como mejor aprenden los niños pequeños: viviéndola en primera persona." },
    ],
  },
  {
    slug: "family-reading-night-kicks-off-the-year",
    category: "COMMUNITY",
    date: "2026-09-04",
    featured: false,
    source: "instagram",
    instagramUrl: "https://www.instagram.com/p/Dc3bXSOFgZc/",
    image: media.igReadingNight1,
    gallery: [media.igReadingNight2, media.igReadingNight3, media.igReadingNight4, media.igReadingNight5],
    title: { en: "Family Reading Night Fills the Library", es: "La Noche Familiar de Lectura llena la biblioteca" },
    excerpt: {
      en: "Families, smiles, and stories — plus a surprise SCCS connection on the shelves — to kick off the school year.",
      es: "Familias, sonrisas e historias — y una conexión SCCS sorpresa en los estantes — para comenzar el año escolar.",
    },
    body: [
      { en: "Our library was filled with families, smiles, stories, and the joy of reading together — a wonderful way to kick off the school year.", es: "Nuestra biblioteca se llenó de familias, sonrisas, historias y la alegría de leer juntos — una manera maravillosa de comenzar el año escolar." },
      { en: "And a fun SCCS connection: a high school friend of Mr. Thurston wrote a book, and it now sits right here on our library shelves.", es: "Y una conexión SCCS muy especial: un amigo de la secundaria del Sr. Thurston escribió un libro, y ahora está aquí mismo en los estantes de nuestra biblioteca." },
      { en: "These are the moments that make our community special — bringing people, stories, and generations together through the love of reading.", es: "Estos son los momentos que hacen especial a nuestra comunidad — reunir personas, historias y generaciones a través del amor por la lectura." },
    ],
  },
  {
    slug: "math-made-meaningful",
    category: "ACADEMICS",
    date: "2026-08-27",
    featured: false,
    source: "instagram",
    instagramUrl: "https://www.instagram.com/p/Dci1JltlmcK/",
    image: media.igMath1,
    gallery: [media.igMath2, media.igMath3, media.igMath4],
    title: { en: "Math Is Better When It's Meaningful", es: "Las matemáticas son mejores cuando tienen sentido" },
    excerpt: {
      en: "Counters, blocks, and a lot of collaboration: inside a Reveal Math lesson in second grade.",
      es: "Fichas, bloques y mucha colaboración: dentro de una clase de Reveal Math en segundo grado.",
    },
    body: [
      { en: "Math is better when we make it meaningful. Our second graders built numbers with their hands, explained their thinking to partners, and grew in confidence — one problem at a time.", es: "Las matemáticas son mejores cuando les damos sentido. Nuestros estudiantes de segundo grado construyeron números con sus manos, explicaron su razonamiento a sus compañeros y ganaron confianza — un problema a la vez." },
      { en: "Concrete models first, abstract symbols second: it's how Reveal Math builds the number sense every later chapter depends on.", es: "Primero los modelos concretos, después los símbolos abstractos: así construye Reveal Math el sentido numérico del que depende cada capítulo posterior." },
    ],
  },
  {
    slug: "diving-into-cells",
    category: "ACADEMICS",
    date: "2026-08-20",
    featured: false,
    source: "instagram",
    instagramUrl: "https://www.instagram.com/p/DcQ8EmBlvpm/",
    image: media.igMicroscope4,
    gallery: [media.igMicroscope1, media.igMicroscope2, media.igMicroscope3, media.igMicroscope5],
    title: { en: "Diving Into Cells", es: "Un viaje al interior de las células" },
    excerpt: {
      en: "Science beyond the textbook — and under the microscope — in one of our four science labs.",
      es: "Ciencia más allá del libro — y bajo el microscopio — en uno de nuestros cuatro laboratorios.",
    },
    body: [
      { en: "Our students took science beyond the textbook and under the microscope. Slides prepared, lenses focused, notebooks open: the cell stopped being a diagram and became something they could see for themselves.", es: "Nuestros estudiantes llevaron la ciencia más allá del libro y bajo el microscopio. Muestras preparadas, lentes enfocados, cuadernos abiertos: la célula dejó de ser un diagrama y se volvió algo que podían ver por sí mismos." },
      { en: "Because sometimes the best way to learn science is to see it with your own eyes.", es: "Porque a veces la mejor manera de aprender ciencia es verla con tus propios ojos." },
    ],
  },
  {
    slug: "innovation-hub-opens",
    category: "ACADEMICS",
    date: "2026-08-15",
    featured: true,
    image: media.computerLabHs,
    gallery: [media.maker3dPrinter, media.innovationLab, media.msLaptops],
    title: { en: "Innovation Hub Opens Its Doors", es: "El Innovation Hub abre sus puertas" },
    excerpt: {
      en: "Our new 2025 Innovation Hub puts robotics, maker education, and design thinking at the heart of the SCCS experience.",
      es: "El nuevo Innovation Hub 2025 coloca a la robótica, la cultura maker y el pensamiento de diseño en el corazón de la experiencia SCCS.",
    },
    body: [
      { en: "The Innovation Hub is the largest investment in SCCS's history: a space where students move beyond the textbook to master robotics, sustainable design, and digital media.", es: "El Innovation Hub es la mayor inversión en la historia de SCCS: un espacio donde los estudiantes van más allá del libro para dominar la robótica, el diseño sostenible y los medios digitales." },
      { en: "Middle schoolers prototype there every week. High schoolers take Innovation electives and advanced coding. Elementary classes visit for design challenges that start with a question, not an answer.", es: "Los estudiantes de Middle School prototipan allí cada semana. Los de High School toman electivas de Innovación y programación avanzada. Las clases de Elementary lo visitan para desafíos de diseño que comienzan con una pregunta, no con una respuesta." },
    ],
  },
  {
    slug: "class-of-2026-matriculation",
    category: "COMMUNITY",
    date: "2026-06-06",
    featured: true,
    image: media.graduationPac,
    gallery: [media.pacFlags, media.collegeFairPennant, media.collegeFair],
    title: { en: "Class of 2026: 99% Matriculation, Five Continents", es: "Generación 2026: 99% de matriculación, cinco continentes" },
    excerpt: {
      en: "Our graduates head to leading universities across the Americas and Europe — carrying two diplomas and one unrivaled future.",
      es: "Nuestros graduados ingresan a las principales universidades de América y Europa — con dos diplomas y un futuro inigualable.",
    },
    body: [
      { en: "Under the flags of the United States, Bolivia, and Santa Cruz, the Class of 2026 crossed the stage of the Performing Arts Center before a full house — each graduate holding two diplomas.", es: "Bajo las banderas de Estados Unidos, Bolivia y Santa Cruz, la Generación 2026 cruzó el escenario del Performing Arts Center ante un auditorio lleno — cada graduado con dos diplomas en mano." },
      { en: "Their next stop: universities across the Americas, Europe, and beyond. See every destination on our live matriculation map.", es: "Su próxima parada: universidades de América, Europa y más allá. Mira cada destino en nuestro mapa interactivo de matriculación." },
    ],
  },
];

export const EVENTS: CampusEvent[] = [
  { date: "2026-10-16", division: "COMMUNITY", href: "/campus-life/beyond-the-classroom/family-reading-night", title: { en: "Family Reading Night", es: "Noche Familiar de Lectura" }, desc: { en: "Families gather in the Library Media Center for an evening of bilingual storytelling.", es: "Las familias se reúnen en el Library Media Center para una velada de narración bilingüe." }, cta: { en: "RSVP", es: "Confirmar" } },
  { date: "2026-10-24", division: "ES", href: "/campus-life/beyond-the-classroom/book-fair", title: { en: "Book Fair Week", es: "Semana de la Feria del Libro" }, desc: { en: "A full week of author visits, story hours, and bilingual titles for young readers.", es: "Una semana completa con visitas de autores, horas de cuento y títulos bilingües para jóvenes lectores." }, cta: { en: "View schedule", es: "Ver cronograma" } },
  { date: "2026-11-06", division: "MS", href: "/campus-life/beyond-the-classroom/math-bowl", title: { en: "Math Bowl", es: "Math Bowl" }, desc: { en: "Middle school problem-solvers compete in the house round of this SCCS classic.", es: "Los resolutores de Middle School compiten en la ronda interna de este clásico SCCS." }, cta: { en: "See teams", es: "Ver equipos" } },
  { date: "2026-11-13", division: "HS", href: "/campus-life/beyond-the-classroom/knowledge-bowl", title: { en: "Knowledge Bowl — Regional Round", es: "Knowledge Bowl — Ronda regional" }, desc: { en: "Our defending champions face visiting schools in the PAC.", es: "Nuestros campeones defensores reciben a colegios visitantes en el PAC." }, cta: { en: "Get tickets", es: "Obtener entradas" } },
  { date: "2026-11-20", division: "COMMUNITY", href: "/campus-life/beyond-the-classroom/fun-run", title: { en: "Fun Run & Family Day", es: "Fun Run y Día de la Familia" }, desc: { en: "The whole pride runs the campus loop — 8 acres, one lap, all ages welcome.", es: "Todo el orgullo jaguar corre el circuito del campus — 8 acres, una vuelta, todas las edades bienvenidas." }, cta: { en: "Register", es: "Inscribirse" } },
  { date: "2026-12-04", division: "ES", href: "/campus-life/jaguar-experience/performing-arts-center", title: { en: "Winter Arts Festival", es: "Festival de Arte de Invierno" }, desc: { en: "Elementary performers fill the Performing Arts Center with music and wonder.", es: "Los estudiantes de Elementary llenan el Performing Arts Center de música y asombro." }, cta: { en: "Save the date", es: "Reservar fecha" } },
  { date: "2027-02-12", division: "COMMUNITY", href: "/campus-life/jaguar-experience/friendship-games", title: { en: "Friendship Games — Away Edition", es: "Friendship Games — Edición de visita" }, desc: { en: "The Jaguars travel for the rotating games that have united four schools since 1980.", es: "Los Jaguars viajan a los juegos rotativos que unen a cuatro colegios desde 1980." }, cta: { en: "Follow the Jaguars", es: "Sigue a los Jaguars" } },
  { date: "2027-03-12", division: "COMMUNITY", href: "/campus-life/beyond-the-classroom/grandparents-day", title: { en: "Grandparents' Day", es: "Día de los Abuelos" }, desc: { en: "Two generations walk the campus together — coffee, classrooms, and pride.", es: "Dos generaciones recorren juntas el campus — café, aulas y orgullo." }, cta: { en: "RSVP", es: "Confirmar" } },
];

export const TEAM: TeamMember[] = [
  { name: "Dr. Alexandra Vaca Paz", role: { en: "Director", es: "Directora" }, division: "ALL", category: "LEADERSHIP", bio: { en: "Twenty years leading American international schools across South America.", es: "Veinte años liderando colegios internacionales americanos en Sudamérica." } },
  { name: "Mark Jensen", role: { en: "High School Principal", es: "Director de High School" }, division: "HS", category: "LEADERSHIP", bio: { en: "AP coordinator and champion of the dual-diploma roadmap.", es: "Coordinador de AP y defensor del itinerario del doble diploma." } },
  { name: "Carolina Rojas", role: { en: "Middle School Principal", es: "Directora de Middle School" }, division: "MS", category: "LEADERSHIP", bio: { en: "Architect of the middle school STEAM ecosystem and advisory program.", es: "Arquitecta del ecosistema STEAM y del programa de tutoría de Middle School." } },
  { name: "Elena Fortún", role: { en: "Elementary Principal", es: "Directora de Elementary" }, division: "ES", category: "LEADERSHIP", bio: { en: "Literacy leader — Columbia Units of Study and standards-based mastery.", es: "Líder de alfabetización — Columbia Units of Study y dominio basado en estándares." } },
  { name: "Ricardo Gutiérrez", role: { en: "Athletics Director", es: "Director de Atletismo" }, division: "ALL", category: "LEADERSHIP", bio: { en: "Keeper of the Friendship Games tradition and the Jaguar way.", es: "Guardián de la tradición de los Friendship Games y del estilo Jaguar." } },
  { name: "Sofía Antelo", role: { en: "Admissions Director", es: "Directora de Admisiones" }, division: "ALL", category: "ADMIN", bio: { en: "Your first guide on the Jaguar journey — from inquiry to induction.", es: "Tu primera guía en el camino Jaguar — de la consulta a la inducción." } },
  { name: "Marcos Serrano", role: { en: "Registrar", es: "Registrador" }, division: "ALL", category: "ADMIN", bio: { en: "Guardian of transcripts, credits, and international transfers.", es: "Guardián de récords académicos, créditos y transferencias internacionales." } },
  { name: "Laura Stearns", role: { en: "Grade 3 Lead Teacher", es: "Maestra Titular de 3.er Grado" }, division: "ES", category: "FACULTY", bio: { en: "Columbia Units of Study practitioner and reading-circle whisperer.", es: "Practicante de Columbia Units of Study y maga del círculo de lectura." } },
  { name: "Andrés Ibáñez", role: { en: "MS Science & Robotics Coach", es: "Coach de Ciencias y Robótica MS" }, division: "MS", category: "FACULTY", bio: { en: "Leads the robotics teams that keep advancing to national finals.", es: "Lidera los equipos de robótica que siguen avanzando a finales nacionales." } },
  { name: "Priya Nair", role: { en: "AP English & Senior Capstone", es: "AP Inglés y Capstone de Último Año" }, division: "HS", category: "FACULTY", bio: { en: "Her seniors walk into university writing like university students.", es: "Sus estudiantes de último año llegan a la universidad escribiendo como universitarios." } },
  { name: "James Whitfield", role: { en: "College Counselor", es: "Consejero Universitario" }, division: "HS", category: "SPECIALIST", bio: { en: "Guides the 99% — applications, SAT strategy, and financial aid.", es: "Guía el 99% — aplicaciones, estrategia SAT y ayuda financiera." } },
  { name: "Diego Parrado", role: { en: "Innovation Coordinator", es: "Coordinador de Innovación" }, division: "ALL", category: "SPECIALIST", bio: { en: "Runs the Innovation Hub — robotics, makerspaces, and design thinking.", es: "Dirige el Innovation Hub — robótica, makerspaces y pensamiento de diseño." } },
  { name: "Camila Beltré", role: { en: "ELL / SLL Specialist", es: "Especialista ELL / SLL" }, division: "ES", category: "SPECIALIST", bio: { en: "Bridges languages so every child learns without limits.", es: "Tendiendo puentes entre idiomas para que cada niño aprenda sin límites." } },
  { name: "Dr. Mei Chen", role: { en: "Student Support Team Coordinator", es: "Coordinadora del Equipo de Apoyo" }, division: "ALL", category: "SST", bio: { en: "Leads MTSS, UDL, and individualized learning plans across divisions.", es: "Lidera MTSS, UDL y planes de aprendizaje individualizados en todas las divisiones." } },
];

export const SPOTLIGHTS: { photo: Photo; url: string }[] = [
  { photo: media.spotlightMoro, url: "https://www.instagram.com/p/Db8yZyvn9C7/" },
  { photo: media.spotlightMoore, url: "https://www.instagram.com/p/Db_U1K2lkMd/" },
  { photo: media.spotlightLopez, url: "https://www.instagram.com/p/DcCDVE8H0oM/" },
  { photo: media.spotlightLeighHowarth, url: "https://www.instagram.com/p/DcJS4Xhlkug/" },
  { photo: media.spotlightFigueroa, url: "https://www.instagram.com/p/DcLxBAsFuYV/" },
  { photo: media.spotlightParada, url: "https://www.instagram.com/p/DcOOhDfFivD/" },
  { photo: media.spotlightMoscon, url: "https://www.instagram.com/p/DcRYIAoH2R6/" },
];

export const MATRICULATION: MatriculationEntry[] = [
  { university: "Harvard University", country: "US", lat: 42.38, lng: -71.12, count: 2, years: "2022,2025" },
  { university: "Massachusetts Institute of Technology", country: "US", lat: 42.36, lng: -71.09, count: 1, years: "2024" },
  { university: "Stanford University", country: "US", lat: 37.43, lng: -122.17, count: 1, years: "2023" },
  { university: "Columbia University", country: "US", lat: 40.81, lng: -73.96, count: 2, years: "2021,2026" },
  { university: "New York University", country: "US", lat: 40.73, lng: -73.99, count: 3, years: "2022,2023,2025" },
  { university: "University of Florida", country: "US", lat: 29.65, lng: -82.35, count: 4, years: "2021,2023,2024,2026" },
  { university: "Texas A&M University", country: "US", lat: 30.62, lng: -96.34, count: 5, years: "2021,2022,2023,2025,2026" },
  { university: "Pennsylvania State University", country: "US", lat: 40.8, lng: -77.86, count: 3, years: "2022,2024,2026" },
  { university: "University of Miami", country: "US", lat: 25.72, lng: -80.27, count: 6, years: "2021,2022,2023,2024,2025,2026" },
  { university: "Universidad de los Andes", country: "CO", lat: 4.6, lng: -74.07, count: 1, years: "2025" },
  { university: "Pontificia Universidad Católica de Chile", country: "CL", lat: -33.44, lng: -70.65, count: 1, years: "2024" },
  { university: "Tec de Monterrey", country: "MX", lat: 25.67, lng: -100.31, count: 2, years: "2023,2025" },
  { university: "Universidad del Valle", country: "BO", lat: -17.79, lng: -63.15, count: 12, years: "2021,2022,2023,2024,2025,2026" },
  { university: "Universidad Privada de Santa Cruz (UPB)", country: "BO", lat: -17.78, lng: -63.18, count: 38, years: "2021,2022,2023,2024,2025,2026" },
  { university: "Universidad Mayor de San Simón", country: "BO", lat: -17.98, lng: -65.28, count: 5, years: "2021,2022,2023,2024,2025" },
  { university: "University of Toronto", country: "CA", lat: 43.66, lng: -79.4, count: 2, years: "2023,2026" },
  { university: "McGill University", country: "CA", lat: 45.5, lng: -73.58, count: 1, years: "2024" },
  { university: "University of Edinburgh", country: "GB", lat: 55.95, lng: -3.19, count: 1, years: "2025" },
  { university: "King's College London", country: "GB", lat: 51.51, lng: -0.11, count: 1, years: "2022" },
  { university: "University of Manchester", country: "GB", lat: 53.47, lng: -2.23, count: 2, years: "2024,2026" },
  { university: "IE University", country: "ES", lat: 40.42, lng: -3.7, count: 1, years: "2025" },
  { university: "Universitat de Barcelona", country: "ES", lat: 41.39, lng: 2.17, count: 1, years: "2023" },
  { university: "TU Delft", country: "NL", lat: 51.99, lng: 4.37, count: 1, years: "2026" },
  { university: "Bocconi University", country: "IT", lat: 45.45, lng: 9.18, count: 1, years: "2024" },
  { university: "University of Melbourne", country: "AU", lat: -37.8, lng: 144.96, count: 1, years: "2025" },
];

export const COUNTRIES: Record<CountryCode, { flag: string; name: L }> = {
  US: { flag: "🇺🇸", name: { en: "United States", es: "Estados Unidos" } },
  CA: { flag: "🇨🇦", name: { en: "Canada", es: "Canadá" } },
  GB: { flag: "🇬🇧", name: { en: "United Kingdom", es: "Reino Unido" } },
  ES: { flag: "🇪🇸", name: { en: "Spain", es: "España" } },
  NL: { flag: "🇳🇱", name: { en: "Netherlands", es: "Países Bajos" } },
  IT: { flag: "🇮🇹", name: { en: "Italy", es: "Italia" } },
  BO: { flag: "🇧🇴", name: { en: "Bolivia", es: "Bolivia" } },
  CO: { flag: "🇨🇴", name: { en: "Colombia", es: "Colombia" } },
  CL: { flag: "🇨🇱", name: { en: "Chile", es: "Chile" } },
  MX: { flag: "🇲🇽", name: { en: "Mexico", es: "México" } },
  AU: { flag: "🇦🇺", name: { en: "Australia", es: "Australia" } },
};

export const CLASS_YEARS = ["2021", "2022", "2023", "2024", "2025", "2026"];

/** Instagram grid — real posts, linked to their originals. */
export const INSTAGRAM_POSTS: { photo: Photo; url: string; caption: L }[] = [
  { photo: media.igMicroscope4, url: "https://www.instagram.com/p/DcQ8EmBlvpm/", caption: { en: "Diving into cells", es: "Un viaje a las células" } },
  { photo: media.igReadingNight1, url: "https://www.instagram.com/p/Dc3bXSOFgZc/", caption: { en: "Family Reading Night", es: "Noche Familiar de Lectura" } },
  { photo: media.igMatter1, url: "https://www.instagram.com/p/Dc_ZcwfFM-n/", caption: { en: "Changes of matter", es: "Cambios de la materia" } },
  { photo: media.igMath1, url: "https://www.instagram.com/p/Dci1JltlmcK/", caption: { en: "Math made meaningful", es: "Matemáticas con sentido" } },
  { photo: media.igReadingNight3, url: "https://www.instagram.com/p/Dc3bXSOFgZc/", caption: { en: "Readers are leaders", es: "Los lectores lideran" } },
  { photo: media.igMicroscope1, url: "https://www.instagram.com/p/DcQ8EmBlvpm/", caption: { en: "Science you can see", es: "Ciencia que se ve" } },
  { photo: media.igMatter2, url: "https://www.instagram.com/p/Dc_ZcwfFM-n/", caption: { en: "Second-grade scientists", es: "Científicos de segundo grado" } },
  { photo: media.igReadingNight4, url: "https://www.instagram.com/p/Dc3bXSOFgZc/", caption: { en: "Stories together", es: "Historias juntos" } },
];

export function sortedNews() {
  return [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
}

/** Upcoming events (date ≥ today), ascending. Falls back to the full list if all have passed. */
export function upcomingEvents(today = new Date()) {
  const iso = today.toISOString().slice(0, 10);
  const sorted = [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));
  const upcoming = sorted.filter((e) => e.date >= iso);
  return upcoming.length ? upcoming : sorted;
}
