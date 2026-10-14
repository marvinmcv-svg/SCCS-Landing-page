/**
 * Photo library, every image is real SCCS media, sourced from the
 * @sccsjaguars Instagram feed and the school's own photo archive
 * (sccs.edu.bo). Alt text describes what is actually in each frame.
 */
import type { L } from "@/lib/i18n-types";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: L;
  /** Where the photo came from, shown nowhere, kept for the content team. */
  source: "instagram" | "sccs.edu.bo";
};

const p = (
  name: string,
  width: number,
  height: number,
  en: string,
  es: string,
  source: Photo["source"] = "sccs.edu.bo",
): Photo => ({ src: `/images/sccs/${name}.jpg`, width, height, alt: { en, es }, source });

export const media = {
  // Campus
  campusGardens: p("campus-gardens", 1250, 938, "Thatched palapas and tropical gardens at the heart of the SCCS campus", "Palapas y jardines tropicales en el corazón del campus SCCS"),
  campusLawn: p("campus-lawn", 1280, 958, "Students on the main lawn, palm trees and red-tiled classrooms behind them", "Estudiantes en el prado principal, con palmeras y aulas de techo rojo detrás"),
  campusPlayground: p("campus-playground", 1250, 887, "Elementary playground and open green fields", "Parque infantil de Elementary y amplios campos verdes"),
  campusPatio: p("campus-patio", 1250, 938, "Covered elementary patio with painted floor games", "Patio techado de Elementary con juegos pintados en el piso"),
  gym: p("gym", 1250, 938, "The SCCS covered gymnasium and court", "El coliseo techado y la cancha de SCCS"),

  // Performing Arts Center
  graduationPac: p("graduation-pac", 1250, 938, "Graduating seniors on the Performing Arts Center stage before a full house", "Graduados en el escenario del Performing Arts Center ante un auditorio lleno"),
  pacFlags: p("pac-flags", 1250, 938, "The Performing Arts Center set for commencement, with U.S., Bolivian, and Santa Cruz flags", "El Performing Arts Center listo para la graduación, con banderas de EE. UU., Bolivia y Santa Cruz"),
  pacStage: p("pac-stage", 1250, 938, "Students perform a musical number under stage lights in the PAC", "Estudiantes interpretan un número musical bajo las luces del PAC"),
  esAwardsStage: p("es-awards-stage", 1600, 1068, "Second graders on stage at the Core Value Awards", "Estudiantes de segundo grado en el escenario de los Core Value Awards"),

  // Friendship Games (2023, hosted in Santa Cruz)
  fgPepRally: p("fg-pep-rally", 2000, 1337, "Jaguar cheerleaders build a pyramid at the Friendship Games pep rally", "Las porristas Jaguar forman una pirámide en el pep rally de los Friendship Games"),
  fgCheer: p("fg-cheer", 2000, 1337, "The Jaguar cheer squad performs in front of packed bleachers", "El equipo de porristas Jaguar actúa frente a las graderías llenas"),
  fgCheer2: p("fg-cheer-2", 2000, 1337, "Cheerleaders mid-stunt during the Friendship Games", "Porristas en plena acrobacia durante los Friendship Games"),
  fgBasketballAcs: p("fg-basketball-acs", 2000, 1334, "High school Jaguars play ACS at the Friendship Games", "Los Jaguars de High School juegan contra ACS en los Friendship Games"),
  fgBasketball2: p("fg-basketball-2", 2000, 1334, "A Jaguar rises for a shot as teammates crash the boards", "Un Jaguar se eleva para lanzar mientras sus compañeros van al rebote"),
  fgHsTeam: p("fg-hs-team", 2000, 1334, "The SCCS high school boys' basketball team", "El equipo de básquet varones de High School de SCCS"),
  fgMsBasketball: p("fg-ms-basketball", 2000, 1334, "Middle school Jaguar drives to the basket", "Un Jaguar de Middle School avanza hacia el aro"),
  fgDunk: p("fg-dunk", 2000, 1337, "A student flies toward the rim during a Friendship Games showcase", "Un estudiante vuela hacia el aro durante una exhibición de los Friendship Games"),
  fgHandshake: p("fg-handshake", 2000, 1337, "School leaders shake hands courtside at the Friendship Games", "Directivos se saludan junto a la cancha en los Friendship Games"),
  fgStudents: p("fg-students", 2000, 1337, "Jaguar students and cheerleaders celebrate in the gym", "Estudiantes y porristas Jaguar celebran en el coliseo"),
  fgWaterGames: p("fg-water-games", 2000, 1334, "Students race across a water mat at the Friendship Games water day", "Estudiantes corren sobre una lona de agua en el día acuático de los Friendship Games"),
  fgWaterSlide: p("fg-water-slide", 2000, 1334, "An inflatable water slide on the SCCS lawn", "Un tobogán inflable de agua en el prado de SCCS"),
  fgBull: p("fg-bull", 2000, 1334, "A student rides the mechanical bull on the lawn", "Una estudiante monta el toro mecánico en el prado"),

  // Innovation & technology
  computerLabHs: p("computer-lab-hs", 1250, 938, "High school students coding in a computer lab", "Estudiantes de High School programando en un laboratorio de computación"),
  innovationLab: p("innovation-lab", 1250, 938, "A technology lab set up for a 'What is your dream job?' design session", "Un laboratorio de tecnología preparado para una sesión de diseño"),
  msLaptops: p("ms-laptops", 1250, 938, "Middle schoolers working on laptops in a bright classroom", "Estudiantes de Middle School trabajando en laptops en un aula luminosa"),
  msClassroom: p("ms-classroom", 1250, 938, "A middle school class mid-lesson", "Una clase de Middle School en plena lección"),
  esClassroom: p("es-classroom", 1250, 938, "Elementary students at their desks in a bright, decorated classroom", "Estudiantes de Elementary en sus pupitres, en un aula luminosa y decorada"),
  maker3dPrinter: p("maker-3d-printer", 591, 591, "Students calibrating a 3D printer", "Estudiantes calibrando una impresora 3D"),

  // Science & library
  scienceLab: p("science-lab", 1250, 1080, "One of the four SCCS science laboratories", "Uno de los cuatro laboratorios de ciencias de SCCS"),
  library: p("library", 1250, 938, "The Library Media Center's new-books display and stacks", "La exhibición de libros nuevos y las estanterías del Library Media Center"),
  libraryLounge: p("library-lounge", 1250, 938, "Reading lounge with red ottomans in the Library Media Center", "Sala de lectura con pufs rojos en el Library Media Center"),
  igMicroscope1: p("ig-microscope-1", 640, 640, "A student studies cells under a microscope", "Un estudiante observa células en el microscopio", "instagram"),
  igMicroscope2: p("ig-microscope-2", 640, 640, "Middle schoolers gather around a microscope", "Estudiantes de Middle School alrededor de un microscopio", "instagram"),
  igMicroscope3: p("ig-microscope-3", 640, 640, "Students take turns at the microscope, notebooks open", "Estudiantes se turnan en el microscopio, con sus cuadernos abiertos", "instagram"),
  igMicroscope4: p("ig-microscope-4", 640, 640, "A row of students focusing microscopes at the lab bench", "Una fila de estudiantes enfocando microscopios en el mesón del laboratorio", "instagram"),
  igMicroscope5: p("ig-microscope-5", 640, 640, "A student adjusts the microscope focus", "Una estudiante ajusta el enfoque del microscopio", "instagram"),
  igMicroscope6: p("ig-microscope-6", 640, 640, "Looking closely at a slide during the cells unit", "Observando de cerca una muestra durante la unidad de células", "instagram"),

  // Elementary learning (Instagram)
  igMatter1: p("ig-matter-1", 1200, 1200, "Second graders record how a popsicle melts in the sun", "Estudiantes de segundo grado registran cómo se derrite una paleta al sol", "instagram"),
  igMatter2: p("ig-matter-2", 671, 671, "Second graders celebrate the end of their states-of-matter experiment", "Estudiantes de segundo grado celebran el final de su experimento sobre estados de la materia", "instagram"),
  igMatter3: p("ig-matter-3", 640, 640, "Students sketch observations at their desks", "Estudiantes dibujan sus observaciones en sus pupitres", "instagram"),
  igMatter4: p("ig-matter-4", 640, 640, "Young scientists taking notes outdoors", "Jóvenes científicos tomando notas al aire libre", "instagram"),
  igMatter5: p("ig-matter-5", 640, 640, "A second grader tastes the results of the experiment", "Un estudiante de segundo grado prueba el resultado del experimento", "instagram"),
  igMath1: p("ig-math-1", 640, 480, "Second graders building numbers with math manipulatives", "Estudiantes de segundo grado construyendo números con material concreto", "instagram"),
  igMath2: p("ig-math-2", 640, 480, "Hands-on place-value work with colorful counters", "Trabajo práctico de valor posicional con fichas de colores", "instagram"),
  igMath3: p("ig-math-3", 640, 480, "Students collaborate on a math task", "Estudiantes colaboran en una tarea de matemáticas", "instagram"),
  igMath4: p("ig-math-4", 640, 480, "A student shows off a math model", "Un estudiante muestra su modelo matemático", "instagram"),

  // Reading Night (Instagram)
  igReadingNight1: p("ig-reading-night-1", 960, 960, "Families fill the library for Family Reading Night", "Familias llenan la biblioteca en la Noche Familiar de Lectura", "instagram"),
  igReadingNight2: p("ig-reading-night-2", 640, 640, "Parents and children reading together at library tables", "Padres e hijos leyendo juntos en las mesas de la biblioteca", "instagram"),
  igReadingNight3: p("ig-reading-night-3", 640, 640, "Student volunteers welcome families to Reading Night", "Estudiantes voluntarias reciben a las familias en la Noche de Lectura", "instagram"),
  igReadingNight4: p("ig-reading-night-4", 960, 960, "Children curl up with books in the reading nook", "Niños acurrucados con libros en el rincón de lectura", "instagram"),
  igReadingNight5: p("ig-reading-night-5", 640, 640, "Story circle on the library rug", "Círculo de cuentos sobre la alfombra de la biblioteca", "instagram"),
  igReadingStory: p("ig-reading-story", 640, 640, "A guest author joins the story circle by video", "Un autor invitado se une al círculo de lectura por video", "instagram"),

  // College counseling
  collegeFair: p("college-fair", 2000, 1333, "Seniors holding university brochures at the SCCS college fair", "Estudiantes de último año con folletos universitarios en la feria universitaria de SCCS"),
  collegeFairPennant: p("college-fair-pennant", 2000, 1333, "Students hold up a university pennant at the college fair", "Estudiantes sostienen un banderín universitario en la feria"),
  collegeFairFamilies: p("college-fair-families", 2000, 1333, "Parents and students meet university representatives", "Padres y estudiantes conversan con representantes universitarios"),
  collegeFairReading: p("college-fair-reading", 2000, 1333, "Students review university materials", "Estudiantes revisan material universitario"),

  // Service & character
  serviceTecho: p("service-techo", 2000, 1500, "A student swings a hammer on a TECHO home build", "Una estudiante trabaja con martillo en una construcción de TECHO"),
  serviceTechoBuild: p("service-techo-build", 2000, 1500, "Students and volunteers build a home with TECHO", "Estudiantes y voluntarios construyen una vivienda con TECHO"),
  serviceTechoTeam: p("service-techo-team", 1500, 2000, "A student digs foundations during a service day", "Una estudiante cava cimientos durante una jornada de servicio"),
  respectMural: p("respect-mural", 1181, 648, "'Let's grow some Respect today!' student mural", "Mural estudiantil: 'Let's grow some Respect today!'"),
  respectMuralHall: p("respect-mural-hall", 1250, 938, "The Respect mural in an SCCS hallway", "El mural del Respeto en un pasillo de SCCS"),

  // History (then & now composites)
  historySoccer: p("history-soccer", 1280, 780, "Then and now: playing soccer on campus, 1960s and today", "Antes y ahora: fútbol en el campus, en los años 60 y hoy"),
  historyPond: p("history-pond", 1280, 780, "Then and now: the campus pond, 1971 and today", "Antes y ahora: la laguna del campus, 1971 y hoy"),
  historyPlayground: p("history-playground", 1280, 780, "Then and now: the playground across the decades", "Antes y ahora: el parque infantil a través de las décadas"),
  historyHalloween: p("history-halloween", 1280, 780, "Then and now: Halloween, 1967 and today", "Antes y ahora: Halloween, 1967 y hoy"),

  // Community
  mothersClub: p("mothers-club", 1800, 1200, "Mother's Club members gathered around a table, laughing", "Integrantes del Mother's Club reunidas alrededor de una mesa, riendo"),
  mothersClubCelebration: p("mothers-club-celebration", 1800, 1203, "Mother's Club volunteers at a celebration with a cake and balloons", "Voluntarias del Mother's Club en una celebración con torta y globos"),
  mothersClubTeam: p("mothers-club-team", 1800, 1203, "Mother's Club volunteers setting up a school event", "Voluntarias del Mother's Club preparando un evento escolar"),
  santaCruzDay: p("santa-cruz-day", 1800, 1203, "Volunteers in white with green rosettes beneath the Santa Cruz flag", "Voluntarias de blanco con escarapelas verdes bajo la bandera de Santa Cruz"),
  mothersClubGroup: p("mothers-club-group", 1800, 789, "The Mother's Club, gathered in the Performing Arts Center", "El Mother's Club reunido en el Performing Arts Center"),
  esFriends: p("es-friends", 1800, 1203, "Elementary friends smiling at lunch on the covered patio", "Amigas de Elementary sonriendo a la hora del almuerzo en el patio techado"),
  esFriends2: p("es-friends-2", 1800, 1203, "Jaguar students hug for the camera", "Estudiantes Jaguar se abrazan para la foto"),
  esLunch: p("es-lunch", 1800, 1203, "Young students share snacks at a picnic table", "Estudiantes pequeños comparten la merienda en una mesa de picnic"),
  esLunchTrio: p("es-lunch-trio", 2000, 1337, "Three elementary students grin at the camera during lunch", "Tres estudiantes de Elementary sonríen a la cámara durante el almuerzo"),
  board: p("board", 1800, 1125, "The SCCS Board of Directors in the Performing Arts Center", "La Junta Directiva de SCCS en el Performing Arts Center"),
  stuco: p("stuco", 1181, 641, "Student Council members meet with peers", "Integrantes del Consejo Estudiantil se reúnen con sus compañeros"),
  stuco2: p("stuco-2", 1181, 561, "Student leaders planning around a table", "Líderes estudiantiles planificando alrededor de una mesa"),
  stuco3: p("stuco-3", 1181, 777, "Students gather in the gardens for a council activity", "Estudiantes reunidos en los jardines para una actividad del consejo"),
  bookFair: p("book-fair", 763, 1114, "A young reader shows off a new book from the Book Fair", "Un pequeño lector muestra su nuevo libro de la Feria del Libro"),
  teacherEs: p("teacher-es", 1200, 1600, "A teacher works with elementary students on the classroom rug", "Un maestro trabaja con estudiantes de Elementary sobre la alfombra del aula"),

  // Faculty spotlights (Instagram "Meet the People Behind the Jaguars" series)
  spotlightMoro: p("ig-spotlight-moro", 640, 640, "Faculty spotlight: Nataly Moro, Secondary English & AP Psychology", "Docente destacada: Nataly Moro, Inglés de Secundaria y AP Psicología", "instagram"),
  spotlightMoore: p("ig-spotlight-moore", 640, 627, "Faculty spotlight: Cynthia Moore, Grade 2", "Docente destacada: Cynthia Moore, 2.º grado", "instagram"),
  spotlightLopez: p("ig-spotlight-lopez", 640, 640, "Faculty spotlight: Nicolas Lopez, Science & Business Math", "Docente destacado: Nicolas Lopez, Ciencias y Matemática Comercial", "instagram"),
  spotlightLeighHowarth: p("ig-spotlight-leigh-howarth", 640, 640, "Faculty spotlight: Jake Leigh-Howarth, English", "Docente destacado: Jake Leigh-Howarth, Inglés", "instagram"),
  spotlightFigueroa: p("ig-spotlight-figueroa", 640, 640, "Faculty spotlight: Elena Figueroa, 5th Grade Literacy", "Docente destacada: Elena Figueroa, Lectoescritura de 5.º grado", "instagram"),
  spotlightParada: p("ig-spotlight-parada", 640, 640, "Faculty spotlight: Alisha Parada, Assistant Teacher", "Docente destacada: Alisha Parada, Maestra Asistente", "instagram"),
  spotlightMoscon: p("ig-spotlight-moscon", 640, 640, "Faculty spotlight: Sofía Moscon, Assistant Teacher", "Docente destacada: Sofía Moscon, Maestra Asistente", "instagram"),
} satisfies Record<string, Photo>;

export type MediaKey = keyof typeof media;
