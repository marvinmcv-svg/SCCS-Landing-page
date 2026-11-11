/**
 * Photo library — every image is real SCCS media, sourced from the
 * @sccsjaguars Instagram feed and the school's own photo archive
 * (sccs.edu.bo). Alt text describes what is actually in each frame.
 */
import type { L } from "@/lib/i18n-types";

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: L;
  /** Where the photo came from — shown nowhere, kept for the content team. */
  source: "instagram" | "sccs.edu.bo" | "upload";
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
  facultyTeam: p("faculty-team", 1600, 900, "SCCS faculty and staff cheer together by the campus pond", "Docentes y personal de SCCS celebran juntos junto a la laguna del campus"),
  teacherEs: p("teacher-es", 1200, 1600, "A teacher works with elementary students on the classroom rug", "Un maestro trabaja con estudiantes de Elementary sobre la alfombra del aula"),

  // Faculty spotlights (Instagram "Meet the People Behind the Jaguars" series)
  spotlightMoro: p("ig-spotlight-moro", 640, 640, "Faculty spotlight: Nataly Moro, Secondary English & AP Psychology", "Docente destacada: Nataly Moro, Inglés de Secundaria y AP Psicología", "instagram"),
  spotlightMoore: p("ig-spotlight-moore", 640, 627, "Faculty spotlight: Cynthia Moore, Grade 2", "Docente destacada: Cynthia Moore, 2.º grado", "instagram"),
  spotlightLopez: p("ig-spotlight-lopez", 640, 640, "Faculty spotlight: Nicolas Lopez, Science & Business Math", "Docente destacado: Nicolas Lopez, Ciencias y Matemática Comercial", "instagram"),
  spotlightLeighHowarth: p("ig-spotlight-leigh-howarth", 640, 640, "Faculty spotlight: Jake Leigh-Howarth, English", "Docente destacado: Jake Leigh-Howarth, Inglés", "instagram"),
  spotlightFigueroa: p("ig-spotlight-figueroa", 640, 640, "Faculty spotlight: Elena Figueroa, 5th Grade Literacy", "Docente destacada: Elena Figueroa, Lectoescritura de 5.º grado", "instagram"),
  spotlightParada: p("ig-spotlight-parada", 640, 640, "Faculty spotlight: Alisha Parada, Assistant Teacher", "Docente destacada: Alisha Parada, Maestra Asistente", "instagram"),
  spotlightMoscon: p("ig-spotlight-moscon", 640, 640, "Faculty spotlight: Sofía Moscon, Assistant Teacher", "Docente destacada: Sofía Moscon, Maestra Asistente", "instagram"),
  // University acceptance announcements shared by the school
  acceptEcheverria: p("acceptances/analhya-echeverria-avila", 1080, 1350, "University acceptances: Analhya Echeverria Avila", "Admisiones universitarias: Analhya Echeverria Avila", "upload"),
  acceptCastedo: p("acceptances/juan-enrique-castedo-diaz", 1080, 1350, "University acceptances: Juan Enrique Castedo Diaz", "Admisiones universitarias: Juan Enrique Castedo Diaz", "upload"),
  acceptLandivar: p("acceptances/francisco-landivar-gil", 1080, 1350, "University acceptances: Francisco Landivar Gil", "Admisiones universitarias: Francisco Landivar Gil", "upload"),
  acceptMatkovic: p("acceptances/milan-matkovic-barron", 1080, 1350, "University acceptances: Milan Matkovic Barron", "Admisiones universitarias: Milan Matkovic Barron", "upload"),
  acceptMolina: p("acceptances/abigail-molina-vaca", 1080, 1350, "University acceptances: Abigail Molina Vaca", "Admisiones universitarias: Abigail Molina Vaca", "upload"),
  acceptHurtado: p("acceptances/dominic-hurtado-hill", 1080, 1350, "University acceptances: Dominic Hurtado Hill", "Admisiones universitarias: Dominic Hurtado Hill", "upload"),
  acceptRodriguez: p("acceptances/fabricio-rodriguez-marancenbaum", 1080, 1350, "University acceptances: Fabricio Rodriguez Marancenbaum", "Admisiones universitarias: Fabricio Rodriguez Marancenbaum", "upload"),
  acceptSchrupp: p("acceptances/oscar-schrupp-velasco", 1080, 1350, "University acceptances: Oscar Schrupp Velasco", "Admisiones universitarias: Oscar Schrupp Velasco", "upload"),
  // Photos chosen from the school's own collection (2026)
  dCampusTower: p("drive/campus-tower", 2252, 1455, "The SCCS tower, 'Home of the Jaguars', above the Innovation Hub", "La torre de SCCS, 'Home of the Jaguars', sobre el Innovation Hub"),
  dCampusFieldGroup: p("drive/campus-field-group", 1600, 1200, "Students gathered on the main field under a wide Santa Cruz sky", "Estudiantes reunidos en la cancha principal bajo el amplio cielo cruceño"),
  dSoccerAction: p("drive/soccer-action", 2400, 1602, "Jaguars celebrate a goal on the home field", "Los Jaguars celebran un gol en la cancha de casa"),
  dHighJump: p("drive/high-jump", 2400, 1602, "A Jaguar clears the high-jump bar at the track meet", "Un Jaguar supera la varilla de salto alto en el torneo de atletismo"),
  dVolleyballTeam: p("drive/volleyball-team", 2400, 1602, "The Jaguars volleyball team huddles before a match", "El equipo de vóley de los Jaguars se reúne antes de un partido"),
  dCheerSquad: p("drive/cheer-squad", 2400, 1602, "The SCCS cheer squad on the field at the Friendship Games", "El equipo de porristas de SCCS en la cancha durante los Friendship Games"),
  dVolleyballChampions: p("drive/volleyball-champions", 2400, 1602, "Girls' volleyball champions lift the trophy on stage", "Las campeonas de vóley levantan el trofeo en el escenario"),
  dFgFolkDance: p("drive/fg-folk-dance", 2400, 1602, "Students perform a Bolivian folk dance at the Friendship Games", "Estudiantes presentan una danza folclórica boliviana en los Friendship Games"),
  dFgCheerFriends: p("drive/fg-cheer-friends", 2400, 1602, "Two cheerleaders smile in the PAC seats", "Dos porristas sonríen en las butacas del PAC"),
  // Coded: STEAM Orlando League, November 2026 (Kennedy Space Center / NASA visit)
  codedRocketGardenTeam: p("drive/coded-rocket-garden-team", 1186, 1186, "The 15 SCCS students hold the Bolivian, Santa Cruz and Jaguars flags in front of the rockets at NASA's Kennedy Space Center", "Los 15 estudiantes de SCCS sostienen las banderas de Bolivia, Santa Cruz y los Jaguars frente a los cohetes del Kennedy Space Center de la NASA", "instagram"),
  codedFlagGuest: p("drive/coded-flag-guest", 1186, 1186, "Two Jaguars hold the Bolivian flag beside a guest in a blue flight suit at NASA", "Dos Jaguars sostienen la bandera de Bolivia junto a un invitado con traje de vuelo azul en la NASA", "instagram"),
  codedPitchJaguarFlag: p("drive/coded-pitch-jaguar-flag", 1186, 1186, "Team Bolivia presents its project on stage, the Jaguars flag held high", "El Team Bolivia presenta su proyecto en el escenario, con la bandera de los Jaguars en alto", "instagram"),
  codedPitchBoliviaFlag: p("drive/coded-pitch-bolivia-flag", 1186, 1186, "A Jaguar speaks into the microphone as teammates hold the Bolivian flag during the pitch", "Un Jaguar habla al micrófono mientras sus compañeros sostienen la bandera de Bolivia durante la presentación", "instagram"),
  codedKennedyThumbsUp: p("drive/coded-kennedy-thumbs-up", 720, 720, "Jaguars in Coded shirts give a thumbs up at Kennedy Space Center", "Jaguars con poleras de Coded levantan el pulgar en el Kennedy Space Center", "instagram"),
  codedTeamwork: p("drive/coded-teamwork", 900, 900, "Two students sketch ideas together beside a laptop", "Dos estudiantes bosquejan ideas juntos junto a una laptop", "instagram"),
  codedLaptopsRockets: p("drive/coded-laptops-rockets", 1186, 1186, "Students work on laptops outdoors with rockets in the background", "Estudiantes trabajan en laptops al aire libre con cohetes de fondo", "instagram"),
  codedRobots: p("drive/coded-robots", 1186, 1186, "Rows of small coding robots glowing green on their charging dock", "Filas de pequeños robots programables brillando en verde en su base de carga", "instagram"),
  // Solaria renewable energy talk, November 2026
  solariaGroup: p("drive/solaria-group", 1080, 526, "High school students gather with the Solaria team after the clean energy talk, 'Clean energy from the sun' on the screen behind them", "Estudiantes de secundaria junto al equipo de Solaria tras la charla de energía limpia, con 'Clean energy from the sun' en la pantalla", "instagram"),
  solariaStudent: p("drive/solaria-student", 1186, 1186, "A smiling student holds up a card during the Solaria visit as a classmate leans in", "Un estudiante sonriente muestra una tarjeta durante la visita de Solaria mientras un compañero se asoma", "instagram"),
  dSoccerLeagueChampions: p("drive/soccer-league-champions", 1080, 810, "The 2024 league champion soccer team with their trophy", "El equipo de fútbol campeón de liga 2024 con su trofeo"),
  dGirlsSoccerChampions: p("drive/girls-soccer-champions", 1170, 945, "8th-grade girls, first-ever champions, with their trophy", "Las chicas de 8.º grado, primeras campeonas de la historia, con su trofeo"),
  dAthletesDuo: p("drive/athletes-duo", 2400, 1602, "Two Jaguar athletes on sports day", "Dos atletas Jaguar en el día deportivo"),
  dStageSinger: p("drive/stage-singer", 2400, 1602, "A student sings in traditional dress on the PAC stage", "Una estudiante canta con traje tradicional en el escenario del PAC"),
  dVexWorldsTeam: p("drive/vex-worlds-team", 1600, 1200, "SCCS robotics teams with their robots at the VEX Robotics World Championship", "Los equipos de robótica de SCCS con sus robots en el Campeonato Mundial VEX"),
  dVexWorldsTeamCoaches: p("drive/vex-worlds-team-coaches", 1600, 1200, "SCCS VEX teams and coaches at the World Championship in Dallas", "Equipos VEX de SCCS y sus coaches en el Mundial de Dallas"),
  dVexWorldsBoliviaFlag: p("drive/vex-worlds-bolivia-flag", 1400, 1600, "SCCS robotics students carry the Bolivian flag at VEX Worlds", "Estudiantes de robótica de SCCS con la bandera de Bolivia en el Mundial VEX"),
  dVexWorldsField: p("drive/vex-worlds-field", 1600, 1200, "Students tune their robot at the competition field", "Estudiantes ajustan su robot en la cancha de competencia"),
  dVexWorldsMatch: p("drive/vex-worlds-match", 1600, 1200, "A VEX IQ match in progress at the World Championship", "Una partida de VEX IQ en el Campeonato Mundial"),
  dVexRobotProud: p("drive/vex-robot-proud", 1200, 1600, "A young Jaguar holds up his team's robot", "Un joven Jaguar muestra el robot de su equipo"),
  dVexTeamDallas: p("drive/vex-team-dallas", 1600, 1200, "The robotics team arrives in Dallas with their robot", "El equipo de robótica llega a Dallas con su robot"),
  dVexPractice: p("drive/vex-practice", 1200, 1600, "Students test their robot on a practice field", "Estudiantes prueban su robot en una cancha de práctica"),
  dScienceCircuits: p("drive/science-circuits", 1200, 1200, "Two students build an electric circuit", "Dos estudiantes arman un circuito eléctrico"),
  dScienceCircuitsTeam: p("drive/science-circuits-team", 1200, 1200, "Students work together on a circuits project", "Estudiantes trabajan juntas en un proyecto de circuitos"),
  dScienceTestTubes: p("drive/science-test-tubes", 915, 915, "A smiling student with test tubes in the lab", "Una estudiante sonriente con tubos de ensayo en el laboratorio"),
  dScienceVolcanoes: p("drive/science-volcanoes", 1200, 1200, "Elementary students with the volcano models they built", "Estudiantes de primaria con los volcanes que construyeron"),
  dStemTowerBuild: p("drive/stem-tower-build", 1200, 1200, "Students build a tower in an engineering challenge", "Estudiantes construyen una torre en un desafío de ingeniería"),
  dStemTower: p("drive/stem-tower", 1200, 1200, "A student with her finished engineering tower", "Una estudiante con su torre de ingeniería terminada"),
  dStemSpaghettiTower: p("drive/stem-spaghetti-tower", 1600, 1200, "Students celebrate their spaghetti-and-marshmallow tower", "Estudiantes celebran su torre de espagueti y malvaviscos"),
  dStemCupChallenge: p("drive/stem-cup-challenge", 1600, 1200, "Middle schoolers solve a cup-stacking design challenge with string", "Estudiantes de secundaria resuelven un desafío de diseño apilando vasos con hilo"),
  dStemCupStack: p("drive/stem-cup-stack", 1600, 1200, "Teamwork on the cup-stacking challenge", "Trabajo en equipo en el desafío de apilar vasos"),
  dMunDelegatesGarden: p("drive/mun-delegates-garden", 1170, 1170, "SCCS MUN delegates in formal attire on campus", "Delegados de MUN de SCCS con atuendo formal en el campus"),
  dMunDelegatesPac: p("drive/mun-delegates-pac", 1170, 1560, "MUN delegates in the Performing Arts Center", "Delegadas de MUN en el Performing Arts Center"),
  dMunDais: p("drive/mun-dais", 1170, 1552, "The MUN chairs preside from the stage", "La mesa directiva del MUN preside desde el escenario"),
  dMunWallOfFame: p("drive/mun-wall-of-fame", 1170, 1560, "MUN delegates at registration by the Jaguar Wall of Fame", "Delegados del MUN en el registro junto al Jaguar Wall of Fame"),
  dMunBoys: p("drive/mun-boys", 1170, 1170, "Delegates ready for the SCCS internal MUN", "Delegados listos para el MUN interno de SCCS"),
  dMunDais2: p("drive/mun-dais-2", 1170, 1560, "The MUN dais at the opening ceremony", "La mesa del MUN en la ceremonia de apertura"),
  dMunPodium: p("drive/mun-podium", 1170, 1560, "A delegate speaks at the MUN opening ceremony", "Una delegada habla en la ceremonia de apertura del MUN"),
  dEsFriendsHall: p("drive/es-friends-hall", 2400, 1602, "Elementary friends smile together in the hallway", "Amigas de primaria sonríen juntas en el pasillo"),
  dEsBoysLaughing: p("drive/es-boys-laughing", 2400, 1602, "Elementary boys laughing in class", "Niños de primaria riendo en clase"),
  dFriendsDuo: p("drive/friends-duo", 1602, 2400, "Two friends on campus", "Dos amigas en el campus"),
  dFamilyNight: p("drive/family-night", 2400, 1602, "Students at a community evening on campus", "Estudiantes en una noche comunitaria en el campus"),
  dMissionWallTeam: p("drive/mission-wall-team", 2400, 1602, "Students in front of the SCCS mission and vision wall", "Estudiantes frente al mural de la misión y visión de SCCS"),
  dMathCertificates: p("drive/math-certificates", 2400, 1602, "Elementary students with their math achievement certificates", "Estudiantes de primaria con sus certificados de logro en matemáticas"),
  dCheerPractice: p("drive/cheer-practice", 2400, 1602, "Cheer practice in the gym bleachers", "Práctica de porristas en las gradas del coliseo"),
  dBandFlutes: p("drive/band-flutes", 960, 960, "Band students with their flutes", "Estudiantes de la banda con sus flautas"),
  dBandPlaza: p("drive/band-plaza", 960, 960, "The SCCS band performs in the main plaza of Santa Cruz", "La banda de SCCS se presenta en la plaza principal de Santa Cruz"),
  dBandTvStage: p("drive/band-tv-stage", 2400, 1800, "SCCS students on a national television stage", "Estudiantes de SCCS en un escenario de televisión nacional"),
  dBandRehearsal: p("drive/band-rehearsal", 1600, 1200, "Band rehearsal in a circle", "Ensayo de la banda en círculo"),
  dVivaSantaCruz: p("drive/viva-santa-cruz", 1600, 1200, "Students celebrate Santa Cruz Day in class", "Estudiantes celebran el Día de Santa Cruz en clase"),
  dPalapaClass: p("drive/palapa-class", 1600, 1200, "An outdoor class under the palapa", "Una clase al aire libre bajo la palapa"),
  dPalapaClass2: p("drive/palapa-class-2", 1600, 1200, "Students learn together under the palapa", "Estudiantes aprenden juntos bajo la palapa"),
  dClassCircle: p("drive/class-circle", 1600, 1200, "A class discussion in a circle", "Una discusión de clase en círculo"),
  dClassFriends: p("drive/class-friends", 1600, 1200, "Classmates working together", "Compañeros trabajando juntos"),
  dWalkathon: p("drive/walkathon", 1602, 2400, "Friends at the walk-a-thon", "Amigas en la caminata solidaria"),
  dTrackMedal: p("drive/track-medal", 2400, 1602, "Medal winners at the track meet", "Ganadoras de medallas en el torneo de atletismo"),
  dFgCeremony: p("drive/fg-ceremony", 1602, 2400, "Athletes and coaches at the Friendship Games ceremony", "Atletas y entrenadores en la ceremonia de los Friendship Games"),
  dFgTeamJackets: p("drive/fg-team-jackets", 2400, 1602, "Jaguars in team jackets at the Friendship Games ceremony", "Jaguars con chaquetas del equipo en la ceremonia de los Friendship Games"),
  dMsCheerStage: p("drive/ms-cheer-stage", 1170, 878, "The Middle School cheer squad on the PAC stage", "El equipo de porristas de Middle School en el escenario del PAC"),
  dAcceptSantiagoNacifBruun: p("drive/accept-santiago-nacif-bruun", 1080, 1350, "University acceptances: Santiago Nacif Bruun", "Admisiones universitarias: Santiago Nacif Bruun"),
  dKnowledgeBowlChampions: p("drive/knowledge-bowl-champions", 1170, 612, "Middle School Knowledge Bowl champions", "Campeones del Knowledge Bowl de Middle School"),
  dBandDirectorAward: p("drive/band-director-award", 720, 720, "Band director Lic. Alejandro Ortiz Suárez receives an award", "El director de banda Lic. Alejandro Ortiz Suárez recibe un reconocimiento"),
  dJaguarsAirport: p("drive/jaguars-airport", 1080, 810, "Jaguars travel together to a tournament", "Los Jaguars viajan juntos a un torneo"),
  dAlumniSoccer: p("drive/alumni-soccer", 1008, 671, "The Jaguar alumni soccer team", "El equipo de fútbol de exalumnos Jaguar"),
  // Club photos from @sccsjaguars on Instagram
  clubOsVolunteers: p("clubs/os-07-sccs-volunteers-2024", 1080, 1080, "SCCS Operation Smile volunteers in their club shirts", "Voluntarios de Operation Smile de SCCS con sus poleras del club", "instagram"),
  clubOsChefs: p("clubs/os-02-student-chefs-four", 1080, 720, "Student chefs serving at the La Sonrisa la Pongo Yo charity cooking event", "Estudiantes chefs sirviendo en el evento benéfico La Sonrisa la Pongo Yo", "instagram"),
  clubOsTwoChefs: p("clubs/os-04-two-chefs", 1080, 1440, "Two student chefs in Operation Smile aprons", "Dos estudiantes chefs con delantales de Operation Smile", "instagram"),
  clubOsHearts: p("clubs/os-05-heart-hands", 1080, 720, "Student chefs making heart hands for Operation Smile", "Estudiantes chefs haciendo corazones con las manos por Operation Smile", "instagram"),
  clubOsGroup: p("clubs/os-01-volunteers-group", 1080, 720, "Operation Smile student volunteers together at the charity event", "Voluntarios estudiantiles de Operation Smile juntos en el evento benéfico", "instagram"),
  clubManitosGirl: p("clubs/manitos-01-valentine-cookie-girl", 1080, 1080, "An elementary student with her Manitos Valentine cookie", "Una estudiante de primaria con su galleta de San Valentín de Manitos", "instagram"),
  clubManitosHero: p("clubs/manitos-hero", 1080, 620, "An elementary student with her Manitos Valentine cookie", "Una estudiante de primaria con su galleta de San Valentín de Manitos", "instagram"),
  clubManitosClass: p("clubs/manitos-03-class-with-cookies", 640, 640, "An elementary class holding up their Manitos Valentine cookies", "Una clase de primaria mostrando sus galletas de San Valentín de Manitos", "instagram"),
  clubManitosBoy: p("clubs/manitos-02-boy-heart-cookie", 640, 640, "A smiling boy with a heart cookie from the Manitos campaign", "Un niño sonriente con una galleta de corazón de la campaña Manitos", "instagram"),
  clubManitosTeam: p("clubs/manitos-05-members-at-table", 640, 640, "Manitos members preparing the Valentine campaign", "Integrantes de Manitos preparando la campaña de San Valentín", "instagram"),
  clubStucoHogar: p("clubs/stuco-02-hogar-activity-group", 960, 960, "StuCo members leading an activity with children at Hogar San Lorenzo", "Integrantes del StuCo dirigiendo una actividad con niños en el Hogar San Lorenzo", "instagram"),
  clubStucoReading: p("clubs/stuco-01-hogar-reading", 640, 640, "A StuCo member reading with a child at Hogar San Lorenzo", "Una integrante del StuCo leyendo con un niño en el Hogar San Lorenzo", "instagram"),
  clubStucoBakeSale: p("clubs/stuco-04-bake-sale-team", 960, 1280, "The elementary StuCo bake-sale team with their advisor", "El equipo de venta de repostería del StuCo de primaria con su asesora", "instagram"),
  clubStucoTrio: p("clubs/stuco-06-es-stuco-trio", 768, 768, "Three elementary StuCo members at their fundraiser", "Tres integrantes del StuCo de primaria en su recaudación", "instagram"),
  clubMunDelegates: p("clubs/mun-01-delegates-outdoors", 1080, 1080, "SCCSMUN 2026 delegates on campus", "Delegados de SCCSMUN 2026 en el campus", "instagram"),
  clubMunCommittee: p("clubs/mun-04-committee-room", 640, 640, "A committee session in progress at SCCSMUN 2026", "Una sesión de comité en SCCSMUN 2026", "instagram"),
} satisfies Record<string, Photo>;

export type MediaKey = keyof typeof media;
