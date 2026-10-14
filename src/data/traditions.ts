import { media, type Photo } from "./media";
import type { L } from "@/lib/i18n-types";

export type TraditionGroup = "academic" | "civic" | "family";

export type Tradition = {
  slug: string;
  group: TraditionGroup;
  title: L;
  tagline: L;
  image: Photo;
  when: L;
  who: L;
  where: L;
  body: L[];
  expect: L[];
  gallery?: Photo[];
};

export const TRADITION_GROUPS: Record<TraditionGroup, { title: L; intro: L }> = {
  academic: {
    title: { en: "Academic & Intellectual Showcases", es: "Vitrinas Académicas e Intelectuales" },
    intro: {
      en: "We turn learning into celebration. Bowls and bees are arenas for quick thinking, and stages for showing what two languages and one rigorous curriculum can do.",
      es: "Convertimos el aprendizaje en celebración. Los bowls y concursos son arenas de pensamiento ágil, y escenarios para mostrar lo que pueden lograr dos idiomas y un currículo exigente.",
    },
  },
  civic: {
    title: { en: "Traditions & Civic Spirit", es: "Tradiciones y Espíritu Cívico" },
    intro: {
      en: "From the cultural pride of Santa Cruz Day to the all-ages energy of the Fun Run, these are the days the whole pride shows up.",
      es: "Del orgullo cultural del Día de Santa Cruz a la energía del Fun Run para todas las edades, estos son los días en que todo el orgullo jaguar se hace presente.",
    },
  },
  family: {
    title: { en: "Family & Legacy Milestones", es: "Hitos de Familia y Legado" },
    intro: {
      en: "An SCCS education includes the whole family. These are the moments we honor the generations, and the people, behind every Jaguar.",
      es: "Una educación SCCS incluye a toda la familia. Estos son los momentos en que honramos a las generaciones, y a las personas, detrás de cada Jaguar.",
    },
  },
};

export const TRADITIONS: Tradition[] = [
  {
    slug: "math-bowl",
    group: "academic",
    title: { en: "Math Bowl", es: "Math Bowl" },
    tagline: { en: "Speed, strategy, and the sweet sound of a correct answer.", es: "Velocidad, estrategia y el dulce sonido de una respuesta correcta." },
    image: media.igMath3,
    gallery: [media.igMath1, media.igMath2, media.igMath4],
    when: { en: "November", es: "Noviembre" },
    who: { en: "Middle School teams", es: "Equipos de Middle School" },
    where: { en: "Performing Arts Center", es: "Performing Arts Center" },
    body: [
      { en: "The Math Bowl is an SCCS classic: middle school teams race the clock through rounds of mental math, logic puzzles, and multi-step problems, with classmates cheering from the seats.", es: "El Math Bowl es un clásico de SCCS: equipos de Middle School compiten contra el reloj en rondas de cálculo mental, acertijos lógicos y problemas de varios pasos, mientras sus compañeros alientan desde las butacas." },
      { en: "It's the public face of the number sense we build from Pre-K with Reveal Math, and proof that being good at math can be the coolest thing in the room.", es: "Es la cara pública del sentido numérico que construimos desde Pre-Kínder con Reveal Math, y la prueba de que ser bueno en matemáticas puede ser lo más genial del salón." },
    ],
    expect: [
      { en: "House rounds by grade, then a championship final", es: "Rondas internas por grado y luego una gran final" },
      { en: "Individual sprint and team relay formats", es: "Formatos de velocidad individual y relevo por equipos" },
      { en: "Families welcome in the audience", es: "Familias bienvenidas en el público" },
    ],
  },
  {
    slug: "knowledge-bowl",
    group: "academic",
    title: { en: "Knowledge Bowl", es: "Knowledge Bowl" },
    tagline: { en: "History, science, literature, and a buzzer.", es: "Historia, ciencia, literatura, y un pulsador." },
    image: media.fgStudents,
    when: { en: "Friendship Games + regional rounds", es: "Friendship Games + rondas regionales" },
    who: { en: "High School team", es: "Equipo de High School" },
    where: { en: "Performing Arts Center", es: "Performing Arts Center" },
    body: [
      { en: "Since 2017 the Knowledge Bowl has been part of the Friendship Games, putting the scholar on the same podium as the striker. Our team has been defending its title ever since.", es: "Desde 2017 el Knowledge Bowl forma parte de los Friendship Games, poniendo al académico en el mismo podio que al goleador. Nuestro equipo ha defendido su título desde entonces." },
      { en: "Practices mix AP-level content with rapid-fire general knowledge, the same breadth and recall that make our graduates formidable in university seminars.", es: "Los entrenamientos combinan contenido de nivel AP con cultura general a toda velocidad, la misma amplitud y memoria que hacen formidables a nuestros graduados en los seminarios universitarios." },
    ],
    expect: [
      { en: "Weekly after-school practice", es: "Práctica semanal después de clases" },
      { en: "Competition against ACS, CCS, and AISB", es: "Competencia contra ACS, CCS y AISB" },
      { en: "Regional rounds hosted in the PAC", es: "Rondas regionales en el PAC" },
    ],
  },
  {
    slug: "spelling-bee",
    group: "academic",
    title: { en: "Spelling Bee", es: "Spelling Bee" },
    tagline: { en: "One word at a time, in front of everyone.", es: "Una palabra a la vez, frente a todos." },
    image: media.esAwardsStage,
    when: { en: "Spring semester", es: "Semestre de primavera" },
    who: { en: "Elementary & Middle School", es: "Elementary y Middle School" },
    where: { en: "Performing Arts Center", es: "Performing Arts Center" },
    body: [
      { en: "Separate Elementary and Middle School bees take the stage each year. Spellers ask for the definition, the origin, the word in a sentence, and then step up to the microphone.", es: "Cada año suben al escenario un Spelling Bee de Elementary y otro de Middle School. Los participantes piden la definición, el origen, la palabra en una oración, y luego se acercan al micrófono." },
      { en: "It's English mastery on display, and it's courage: standing alone under the lights and trusting what you know.", es: "Es el dominio del inglés en exhibición, y es valentía: estar solo bajo las luces y confiar en lo que sabes." },
    ],
    expect: [
      { en: "Classroom rounds lead to a division final", es: "Rondas por aula que llevan a una final por división" },
      { en: "Word lists shared with families in advance", es: "Listas de palabras compartidas con las familias por adelantado" },
      { en: "Every speller recognized on stage", es: "Cada participante reconocido en el escenario" },
    ],
  },
  {
    slug: "book-fair",
    group: "academic",
    title: { en: "Book Fair", es: "Feria del Libro" },
    tagline: { en: "A whole week where the library comes to you.", es: "Una semana entera donde la biblioteca viene a ti." },
    image: media.bookFair,
    gallery: [media.library, media.libraryLounge],
    when: { en: "October", es: "Octubre" },
    who: { en: "All divisions & families", es: "Todas las divisiones y familias" },
    where: { en: "Library Media Center", es: "Library Media Center" },
    body: [
      { en: "For a full week the Library Media Center becomes a bookstore: bilingual titles, author visits, story hours, and the delicious agony of choosing just one more book.", es: "Durante una semana completa, el Library Media Center se convierte en librería: títulos bilingües, visitas de autores, horas de cuento y la deliciosa agonía de elegir solo un libro más." },
      { en: "It's a week built to send every Jaguar home with a book they chose themselves, the first step to reading for life.", es: "Es una semana pensada para que cada Jaguar vuelva a casa con un libro elegido por sí mismo, el primer paso para leer toda la vida." },
    ],
    expect: [
      { en: "English and Spanish titles for every age", es: "Títulos en inglés y español para todas las edades" },
      { en: "Author visits and story hours", es: "Visitas de autores y horas de cuento" },
      { en: "Families welcome to browse together", es: "Familias bienvenidas a recorrerla juntas" },
    ],
  },
  {
    slug: "family-reading-night",
    group: "academic",
    title: { en: "Family Reading Night", es: "Noche Familiar de Lectura" },
    tagline: { en: "Pajamas optional. Stories mandatory.", es: "Pijamas opcionales. Cuentos obligatorios." },
    image: media.igReadingNight1,
    gallery: [media.igReadingNight2, media.igReadingNight3, media.igReadingNight4, media.igReadingNight5, media.igReadingStory],
    when: { en: "Start of the school year", es: "Inicio del año escolar" },
    who: { en: "Families of every division", es: "Familias de todas las divisiones" },
    where: { en: "Library Media Center", es: "Library Media Center" },
    body: [
      { en: "Our library fills with families, smiles, and stories for an evening of reading together, parents and children side by side, story circles on the rug, and volunteers guiding the youngest readers.", es: "Nuestra biblioteca se llena de familias, sonrisas e historias para una noche de lectura compartida, padres e hijos lado a lado, círculos de cuentos sobre la alfombra y voluntarios que guían a los lectores más pequeños." },
      { en: "It's how we kick off the year: bringing people, stories, and generations together through the love of reading.", es: "Así comenzamos el año: reuniendo personas, historias y generaciones a través del amor por la lectura." },
    ],
    expect: [
      { en: "Bilingual storytelling for all ages", es: "Narración bilingüe para todas las edades" },
      { en: "Student volunteers and librarians on hand", es: "Estudiantes voluntarios y bibliotecarios presentes" },
      { en: "Cozy reading corners and story circles", es: "Rincones de lectura y círculos de cuentos" },
    ],
  },
  {
    slug: "santa-cruz-day",
    group: "civic",
    title: { en: "Santa Cruz Day", es: "Día de Santa Cruz" },
    tagline: { en: "Green, white, and proud of where we're from.", es: "Verde, blanco y orgullosos de dónde venimos." },
    image: media.santaCruzDay,
    when: { en: "Around September 24", es: "Alrededor del 24 de septiembre" },
    who: { en: "The whole school", es: "Todo el colegio" },
    where: { en: "Across campus", es: "Todo el campus" },
    body: [
      { en: "An American education, rooted in Santa Cruz. On Santa Cruz Day the campus turns green and white for music, traditional food, dance, and the cultural pride of the city that has been our home since 1959.", es: "Una educación americana, con raíces en Santa Cruz. En el Día de Santa Cruz el campus se viste de verde y blanco con música, comida típica, danza y el orgullo cultural de la ciudad que es nuestro hogar desde 1959." },
      { en: "It's the Bolivian half of our dual identity, celebrated out loud, and a reminder that our graduates leave to build the world and come back to build Bolivia.", es: "Es la mitad boliviana de nuestra doble identidad, celebrada en voz alta, y un recordatorio de que nuestros graduados salen a construir el mundo y regresan a construir Bolivia." },
    ],
    expect: [
      { en: "Traditional dress and dances", es: "Trajes típicos y danzas tradicionales" },
      { en: "Cruceño food prepared with families", es: "Comida cruceña preparada con las familias" },
      { en: "Student performances in every division", es: "Presentaciones estudiantiles en cada división" },
    ],
  },
  {
    slug: "fun-run",
    group: "civic",
    title: { en: "Fun Run", es: "Fun Run" },
    tagline: { en: "Eight acres. One lap. Every Jaguar.", es: "Ocho acres. Una vuelta. Cada Jaguar." },
    image: media.campusLawn,
    gallery: [media.campusPlayground, media.fgWaterGames],
    when: { en: "November", es: "Noviembre" },
    who: { en: "Students, families, faculty, alumni", es: "Estudiantes, familias, docentes y egresados" },
    where: { en: "The campus loop", es: "El circuito del campus" },
    body: [
      { en: "Organized with the Mother's Club, the Fun Run sends the whole pride around the campus loop, toddlers on shoulders, seniors racing teachers, grandparents cheering from the shade of the palapas.", es: "Organizado junto al Mother's Club, el Fun Run lleva a todo el orgullo jaguar alrededor del circuito del campus, pequeños en hombros, seniors compitiendo con sus maestros y abuelos alentando a la sombra de las palapas." },
      { en: "Nobody keeps score, everybody finishes, and the day ends with family games on the lawn.", es: "Nadie lleva la cuenta, todos llegan a la meta y el día termina con juegos familiares en el prado." },
    ],
    expect: [
      { en: "All ages welcome, run, jog, or walk", es: "Todas las edades, corre, trota o camina" },
      { en: "Family Day games and food afterward", es: "Juegos y comida del Día de la Familia al terminar" },
      { en: "Co-hosted with the Mother's Club", es: "Organizado junto al Mother's Club" },
    ],
  },
  {
    slug: "grandparents-day",
    group: "family",
    title: { en: "Grandparents' Day", es: "Día de los Abuelos" },
    tagline: { en: "Two generations, one campus.", es: "Dos generaciones, un campus." },
    image: media.mothersClub,
    when: { en: "March", es: "Marzo" },
    who: { en: "Grandparents & Elementary students", es: "Abuelos y estudiantes de Elementary" },
    where: { en: "Classrooms & Performing Arts Center", es: "Aulas y Performing Arts Center" },
    body: [
      { en: "Grandparents walk the campus with their grandchildren, coffee, open classrooms, student performances, and more than a few proud tears.", es: "Los abuelos recorren el campus con sus nietos, café, aulas abiertas, presentaciones estudiantiles y más de una lágrima de orgullo." },
      { en: "For some families it's a homecoming, grandparents who once wore the Jaguar colors themselves. It's our multigenerational legacy, in one morning.", es: "Para algunas familias es un regreso a casa, abuelos que alguna vez también vistieron los colores Jaguar. Es nuestro legado multigeneracional, en una sola mañana." },
    ],
    expect: [
      { en: "Open classrooms and student-led tours", es: "Aulas abiertas y recorridos guiados por estudiantes" },
      { en: "Performances in the PAC", es: "Presentaciones en el PAC" },
      { en: "Coffee and conversation", es: "Café y conversación" },
    ],
  },
  {
    slug: "senior-welcome-dinner",
    group: "family",
    title: { en: "Senior Welcome Dinner", es: "Cena de Bienvenida a Seniors" },
    tagline: { en: "The first night of the final chapter.", es: "La primera noche del último capítulo." },
    image: media.mothersClubCelebration,
    gallery: [media.mothersClubTeam, media.mothersClubGroup],
    when: { en: "Start of senior year", es: "Inicio del último año" },
    who: { en: "Seniors, families, faculty", es: "Seniors, familias y docentes" },
    where: { en: "On campus", es: "En el campus" },
    body: [
      { en: "Hosted by the Mother's Club, the Senior Welcome Dinner opens the final year with an evening in the seniors' honor, speeches, a few embarrassing childhood photos, and a toast to what comes next.", es: "Organizada por el Mother's Club, la Cena de Bienvenida a Seniors abre el último año con una velada en honor de los graduandos, discursos, algunas fotos de infancia vergonzosas y un brindis por lo que viene." },
      { en: "It's the start of the year that ends on the PAC stage with two diplomas, and the night many seniors remember as the moment it all became real.", es: "Es el comienzo del año que termina en el escenario del PAC con dos diplomas, y la noche que muchos seniors recuerdan como el momento en que todo se hizo realidad." },
    ],
    expect: [
      { en: "Dinner for seniors and their families", es: "Cena para los seniors y sus familias" },
      { en: "Words from faculty and class leaders", es: "Palabras de docentes y líderes de la promoción" },
      { en: "Organized by the Mother's Club", es: "Organizada por el Mother's Club" },
    ],
  },
];

/** Additional traditions referenced by the school's event calendar (no dedicated page yet). */
export const MORE_TRADITIONS: L[] = [
  { en: "Halloween Festival", es: "Festival de Halloween" },
  { en: "Annual Musical", es: "Musical Anual" },
  { en: "Band Concerts", es: "Conciertos de Banda" },
  { en: "Art Exhibitions", es: "Exposiciones de Arte" },
  { en: "Talent Show", es: "Show de Talentos" },
  { en: "Father's Day", es: "Día del Padre" },
  { en: "Teacher Appreciation", es: "Día del Maestro" },
  { en: "Guest Speakers", es: "Conferencistas Invitados" },
];

export function getTradition(slug: string) {
  return TRADITIONS.find((t) => t.slug === slug);
}
