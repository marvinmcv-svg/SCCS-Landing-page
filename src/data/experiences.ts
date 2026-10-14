import { media, type Photo } from "./media";
import type { L } from "@/lib/i18n-types";

export type Experience = {
  slug: string;
  kicker: L;
  title: L;
  tagline: L;
  hero: Photo;
  lede: L;
  facts: { value: string; label: L }[];
  sections: { title: L; body: L; image?: Photo }[];
  pillars: { title: L; text: L }[];
  pillarsTitle: L;
  quote: L;
  gallery: Photo[];
  cta: { label: L; href: string };
  /** Short caption used on the hub mosaic. */
  note: L;
};

export const EXPERIENCES: Experience[] = [
  {
    slug: "innovation-hub",
    kicker: { en: "Opened 2025", es: "Inaugurado en 2025" },
    title: { en: "The Innovation Hub", es: "El Innovation Hub" },
    tagline: { en: "Where Jaguars build what doesn't exist yet.", es: "Donde los Jaguars construyen lo que aún no existe." },
    note: { en: "Opened 2025 · robotics & design thinking", es: "Inaugurado en 2025 · robótica y pensamiento de diseño" },
    hero: media.computerLabHs,
    lede: {
      en: "The Innovation Hub is the boldest investment in SCCS history, a state-of-the-art ecosystem where students stop reading about technology and start making it. Robotics, sustainable design, digital media, and advanced coding, all under one roof, open to every division.",
      es: "El Innovation Hub es la inversión más audaz en la historia de SCCS, un ecosistema de última generación donde los estudiantes dejan de leer sobre tecnología y comienzan a crearla. Robótica, diseño sostenible, medios digitales y programación avanzada, bajo un mismo techo y abierto a todas las divisiones.",
    },
    facts: [
      { value: "2025", label: { en: "Year opened", es: "Año de apertura" } },
      { value: "PK–12", label: { en: "Every division, every week", es: "Todas las divisiones, cada semana" } },
      { value: "ISTE", label: { en: "Digital-literacy standards", es: "Estándares de alfabetización digital" } },
    ],
    sections: [
      {
        title: { en: "From consumers to creators", es: "De consumidores a creadores" },
        body: {
          en: "We retired the traditional computer class. In its place: an immersive STEAM curriculum of robotics, coding, and engineering design challenges that forces students to apply science, math, and art to real problems, and to fail, iterate, and try again.",
          es: "Retiramos la clase tradicional de computación. En su lugar: un currículo STEAM inmersivo de robótica, programación y desafíos de diseño de ingeniería que obliga a los estudiantes a aplicar ciencia, matemáticas y arte a problemas reales, y a fallar, iterar y volver a intentarlo.",
        },
        image: media.maker3dPrinter,
      },
      {
        title: { en: "Built for every age", es: "Pensado para cada edad" },
        body: {
          en: "Elementary classes visit for design challenges that start with a question, not an answer. Middle schoolers prototype and program competition robots. High schoolers take specialized Innovation electives and advanced coding that feed straight into their university portfolios.",
          es: "Las clases de Elementary lo visitan para desafíos de diseño que comienzan con una pregunta, no con una respuesta. Los estudiantes de Middle School prototipan y programan robots de competencia. Los de High School toman electivas especializadas de Innovación y programación avanzada que alimentan directamente su portafolio universitario.",
        },
        image: media.innovationLab,
      },
      {
        title: { en: "Ambassadors of change", es: "Embajadores del cambio" },
        body: {
          en: "Our Innovation courses train students to spot opportunities for scientific, economic, and social growth, and to design the strategies to seize them, alone and in teams. It's the Technological Agency in our Learner Profile, made physical.",
          es: "Nuestros cursos de Innovación entrenan a los estudiantes para detectar oportunidades de crecimiento científico, económico y social, y para diseñar las estrategias que las aprovechen, solos y en equipo. Es la Agencia Tecnológica de nuestro Perfil del Estudiante, hecha realidad.",
        },
        image: media.msLaptops,
      },
    ],
    pillarsTitle: { en: "Inside the Hub", es: "Dentro del Hub" },
    pillars: [
      { title: { en: "Robotics & Coding", es: "Robótica y Programación" }, text: { en: "Competition robotics from Grade 6; advanced coding electives in High School.", es: "Robótica de competencia desde 6.º grado; electivas de programación avanzada en High School." } },
      { title: { en: "Makerspace", es: "Makerspace" }, text: { en: "3D printing and hands-on fabrication to turn sketches into prototypes.", es: "Impresión 3D y fabricación práctica para convertir bocetos en prototipos." } },
      { title: { en: "Design Thinking", es: "Pensamiento de Diseño" }, text: { en: "Empathize, define, ideate, prototype, test, the method behind every project.", es: "Empatizar, definir, idear, prototipar, probar, el método detrás de cada proyecto." } },
      { title: { en: "Sustainable Design & Media", es: "Diseño Sostenible y Medios" }, text: { en: "Projects that tackle real local challenges and tell their story digitally.", es: "Proyectos que enfrentan desafíos locales reales y cuentan su historia en digital." } },
    ],
    quote: { en: "Creators of technology, not consumers of it.", es: "Creadores de tecnología, no consumidores." },
    gallery: [media.computerLabHs, media.maker3dPrinter, media.innovationLab, media.msLaptops],
    cta: { label: { en: "See the Hub on a campus tour", es: "Conoce el Hub en una visita al campus" }, href: "/admissions#inquire" },
  },
  {
    slug: "performing-arts-center",
    kicker: { en: "The PAC", es: "El PAC" },
    title: { en: "Performing Arts Center", es: "Performing Arts Center" },
    tagline: { en: "The stage where every Jaguar finds their voice.", es: "El escenario donde cada Jaguar encuentra su voz." },
    note: { en: "Band, choir, theater", es: "Banda, coro y teatro" },
    hero: media.graduationPac,
    lede: {
      en: "The SCCS Performing Arts Center is the nexus of creative life on campus, home to the annual musical, band and choir concerts, art exhibitions, award ceremonies, and the commencement where every senior crosses the stage with two diplomas.",
      es: "El Performing Arts Center de SCCS es el centro de la vida creativa del campus, hogar del musical anual, los conciertos de banda y coro, las exposiciones de arte, las ceremonias de premiación y la graduación donde cada estudiante de último año cruza el escenario con dos diplomas.",
    },
    facts: [
      { value: "PK–12", label: { en: "Performers on one stage", es: "Artistas en un mismo escenario" } },
      { value: "NCAS", label: { en: "National Core Arts Standards", es: "Estándares Nacionales de Artes" } },
      { value: "1", label: { en: "Musical, every single year", es: "Musical, cada año" } },
    ],
    sections: [
      {
        title: { en: "Aesthetics as an intellectual discipline", es: "La estética como disciplina intelectual" },
        body: {
          en: "At SCCS the arts aren't electives on the side, they're part of how a leader thinks. Students learn to synthesize complex ideas through performance and visual media, and to make intentional choices that communicate a point of view.",
          es: "En SCCS las artes no son electivas al margen, son parte de cómo piensa un líder. Los estudiantes aprenden a sintetizar ideas complejas a través de la interpretación y los medios visuales, y a tomar decisiones intencionales que comunican un punto de vista.",
        },
        image: media.pacStage,
      },
      {
        title: { en: "A stage from the very first year", es: "Un escenario desde el primer año" },
        body: {
          en: "Second graders accept their Core Value Awards under the same lights where seniors graduate. Public presence is a skill, and our youngest Jaguars start building it early.",
          es: "Los estudiantes de segundo grado reciben sus Core Value Awards bajo las mismas luces donde se gradúan los de último año. La presencia escénica es una habilidad, y nuestros Jaguars más pequeños comienzan a construirla temprano.",
        },
        image: media.esAwardsStage,
      },
      {
        title: { en: "Where the community gathers", es: "Donde se reúne la comunidad" },
        body: {
          en: "Under the flags of the United States, Bolivia, and Santa Cruz, the PAC hosts the moments that define the year, commencement, the Knowledge Bowl regional round, the Arts Festival, and the gatherings of the Mother's Club and the Board.",
          es: "Bajo las banderas de Estados Unidos, Bolivia y Santa Cruz, el PAC alberga los momentos que definen el año, la graduación, la ronda regional del Knowledge Bowl, el Festival de Arte y las reuniones del Mother's Club y de la Junta Directiva.",
        },
        image: media.pacFlags,
      },
    ],
    pillarsTitle: { en: "The Fine Arts program", es: "El programa de Bellas Artes" },
    pillars: [
      { title: { en: "Technical Fluency", es: "Fluidez Técnica" }, text: { en: "A professional command of instruments, voice, media, and digital process.", es: "Dominio profesional de instrumentos, voz, medios y procesos digitales." } },
      { title: { en: "Critical Judgment", es: "Juicio Crítico" }, text: { en: "Engaging with the world's art to build knowledge of history and cultures.", es: "Dialogar con el arte del mundo para conocer su historia y sus culturas." } },
      { title: { en: "Aesthetic Reasoning", es: "Razonamiento Estético" }, text: { en: "Intentional choices that sharpen how ideas are communicated.", es: "Decisiones intencionales que afinan cómo se comunican las ideas." } },
      { title: { en: "Performance Excellence", es: "Excelencia Escénica" }, text: { en: "A real stage to refine presence and the discipline of mastery.", es: "Un escenario real para pulir la presencia y la disciplina de la maestría." } },
    ],
    quote: { en: "Innovation and visual literacy are the languages of influence. We teach both.", es: "La innovación y la alfabetización visual son los idiomas de la influencia. Enseñamos ambos." },
    gallery: [media.graduationPac, media.pacStage, media.esAwardsStage, media.pacFlags],
    cta: { label: { en: "See what's on stage next", es: "Mira lo próximo en escena" }, href: "/campus-life#events" },
  },
  {
    slug: "athletics",
    kicker: { en: "Jaguar Athletics", es: "Atletismo Jaguar" },
    title: { en: "Jaguar Athletics", es: "Atletismo Jaguar" },
    tagline: { en: "Grit, teamwork, and Jaguar pride.", es: "Garra, trabajo en equipo y orgullo Jaguar." },
    note: { en: "Soccer · basketball · volleyball · track", es: "Fútbol · básquet · vóleibol · atletismo" },
    hero: media.fgBasketballAcs,
    lede: {
      en: "Lit fields, a covered gymnasium, and coaches who know every name. Jaguar Athletics develops the physical resilience, strategic teamwork, and competitive grit of a true student-athlete, from first PE class to the Friendship Games final.",
      es: "Canchas iluminadas, un coliseo techado y entrenadores que conocen cada nombre. El Atletismo Jaguar desarrolla la resiliencia física, el trabajo en equipo estratégico y la garra competitiva de un verdadero estudiante-atleta, desde la primera clase de educación física hasta la final de los Friendship Games.",
    },
    facts: [
      { value: "4", label: { en: "Core sports: soccer, basketball, volleyball, track", es: "Deportes base: fútbol, básquet, vóleibol, atletismo" } },
      { value: "MS + HS", label: { en: "Competitive teams", es: "Equipos competitivos" } },
      { value: "SHAPE", label: { en: "America-aligned PE", es: "Educación física alineada a SHAPE America" } },
    ],
    sections: [
      {
        title: { en: "Every Jaguar plays", es: "Cada Jaguar juega" },
        body: {
          en: "Our Physical Education curriculum is aligned with SHAPE America standards, health, fitness, and teamwork for every student, every year. From there, Middle and High School Jaguars can try out for competitive teams in soccer, basketball, volleyball, and track.",
          es: "Nuestro currículo de Educación Física está alineado con los estándares SHAPE America, salud, condición física y trabajo en equipo para cada estudiante, cada año. A partir de ahí, los Jaguars de Middle y High School pueden integrar equipos competitivos de fútbol, básquet, vóleibol y atletismo.",
        },
        image: media.fgHsTeam,
      },
      {
        title: { en: "Facilities built for the game", es: "Instalaciones pensadas para el juego" },
        body: {
          en: "A covered gymnasium with packed bleachers on game days, lit athletic fields for evening play, and open green space across all 8 acres. The court in the gym has seen decades of Friendship Games finals.",
          es: "Un coliseo techado con graderías llenas en días de partido, canchas iluminadas para jugar de noche y amplias áreas verdes en los 8 acres. La cancha del coliseo ha visto décadas de finales de los Friendship Games.",
        },
        image: media.gym,
      },
      {
        title: { en: "Spirit on the sidelines", es: "Espíritu desde la tribuna" },
        body: {
          en: "Our cheer squad builds three-high pyramids, the student section never sits down, and every game ends with a handshake. Sportsmanship isn't a rule here, it's the Jaguar way.",
          es: "Nuestro equipo de porristas arma pirámides de tres niveles, la barra estudiantil nunca se sienta y cada partido termina con un apretón de manos. La deportividad no es una regla aquí, es el estilo Jaguar.",
        },
        image: media.fgCheer,
      },
    ],
    pillarsTitle: { en: "What athletes build", es: "Lo que construyen nuestros atletas" },
    pillars: [
      { title: { en: "Physical Resilience", es: "Resiliencia Física" }, text: { en: "Fitness habits that last well beyond graduation.", es: "Hábitos de condición física que duran mucho más allá de la graduación." } },
      { title: { en: "Strategic Teamwork", es: "Trabajo en Equipo" }, text: { en: "Reading the game, trusting teammates, owning a role.", es: "Leer el juego, confiar en los compañeros, asumir un rol." } },
      { title: { en: "Competitive Grit", es: "Garra Competitiva" }, text: { en: "Learning to win with grace and lose with resolve.", es: "Aprender a ganar con elegancia y a perder con determinación." } },
      { title: { en: "Character", es: "Carácter" }, text: { en: "Respect for opponents, officials, and the game itself.", es: "Respeto por los rivales, los árbitros y el propio juego." } },
    ],
    quote: { en: "True victory lives where high performance meets mutual respect.", es: "La verdadera victoria vive donde el alto rendimiento se encuentra con el respeto mutuo." },
    gallery: [media.fgBasketballAcs, media.fgMsBasketball, media.fgBasketball2, media.fgHsTeam, media.fgCheer2, media.gym],
    cta: { label: { en: "The Friendship Games", es: "Los Friendship Games" }, href: "/campus-life/jaguar-experience/friendship-games" },
  },
  {
    slug: "friendship-games",
    kicker: { en: "A tradition since 1980", es: "Una tradición desde 1980" },
    title: { en: "The Friendship Games", es: "Los Friendship Games" },
    tagline: { en: "Four schools. One rivalry. Forty-plus years of friendship.", es: "Cuatro colegios. Una rivalidad. Más de cuarenta años de amistad." },
    note: { en: "A tradition since 1980", es: "Una tradición desde 1980" },
    hero: media.fgPepRally,
    lede: {
      en: "Since 1980, SCCS, ACS, CCS, and AISB have met every year for the region's oldest interschool tradition. Modeled on international sports festivals, the Friendship Games are part tournament, part reunion, and entirely Jaguar, a training ground for character disguised as the best week of the year.",
      es: "Desde 1980, SCCS, ACS, CCS y AISB se reúnen cada año en la tradición interescolar más antigua de la región. Inspirados en los festivales deportivos internacionales, los Friendship Games son en parte torneo, en parte reencuentro y completamente Jaguar, una escuela de carácter disfrazada de la mejor semana del año.",
    },
    facts: [
      { value: "1980", label: { en: "First Games", es: "Primeros Juegos" } },
      { value: "4", label: { en: "Schools in the rotation", es: "Colegios en la rotación" } },
      { value: "2017", label: { en: "Knowledge Bowl & chess join", es: "Se suman Knowledge Bowl y ajedrez" } },
    ],
    sections: [
      {
        title: { en: "Sportsmanship as an international language", es: "La deportividad como idioma internacional" },
        body: {
          en: "Soccer, basketball, volleyball, and track and field, played hard, refereed fairly, and closed with handshakes. The Games challenge our Jaguars to show resilience, integrity, and the collaborative spirit it takes to lead on a diverse world stage.",
          es: "Fútbol, básquet, vóleibol y atletismo, jugados con intensidad, arbitrados con justicia y cerrados con un apretón de manos. Los Juegos desafían a nuestros Jaguars a demostrar resiliencia, integridad y el espíritu colaborativo que se necesita para liderar en un escenario mundial diverso.",
        },
        image: media.fgBasketballAcs,
      },
      {
        title: { en: "Not just athletes", es: "No solo atletas" },
        body: {
          en: "In 2017 the Games added Knowledge Bowl and chess, so the scholar and the strategist compete alongside the striker. Our Knowledge Bowl team has been defending its title ever since.",
          es: "En 2017 los Juegos incorporaron el Knowledge Bowl y el ajedrez, para que el académico y el estratega compitan junto al goleador. Nuestro equipo de Knowledge Bowl ha defendido su título desde entonces.",
        },
        image: media.fgStudents,
      },
      {
        title: { en: "Rotational hosting", es: "Sede rotativa" },
        body: {
          en: "Hosting rotates between the four schools, so every Jaguar both welcomes guests and travels as one, a cultural exchange inside Bolivia. When the Games come to Santa Cruz, the whole campus becomes the venue: pep rally in the gym, water games on the lawn, finals under the lights.",
          es: "La sede rota entre los cuatro colegios, así que cada Jaguar recibe visitantes y también viaja como visitante, un intercambio cultural dentro de Bolivia. Cuando los Juegos llegan a Santa Cruz, todo el campus se convierte en sede: pep rally en el coliseo, juegos acuáticos en el prado y finales bajo las luces.",
        },
        image: media.fgWaterGames,
      },
    ],
    pillarsTitle: { en: "The arena", es: "La arena" },
    pillars: [
      { title: { en: "Athletic Mastery", es: "Maestría Atlética" }, text: { en: "Soccer, basketball, volleyball, and track & field.", es: "Fútbol, básquet, vóleibol y atletismo." } },
      { title: { en: "Cognitive Agility", es: "Agilidad Cognitiva" }, text: { en: "Knowledge Bowl and chess, part of the Games since 2017.", es: "Knowledge Bowl y ajedrez, parte de los Juegos desde 2017." } },
      { title: { en: "Rotational Leadership", es: "Liderazgo Rotativo" }, text: { en: "Hosting rotates between SCCS, ACS, CCS, and AISB.", es: "La sede rota entre SCCS, ACS, CCS y AISB." } },
      { title: { en: "School Spirit", es: "Espíritu Escolar" }, text: { en: "Pep rallies, cheer, and a student section that never sits.", es: "Pep rallies, porras y una barra que nunca se sienta." } },
    ],
    quote: { en: "Once a Jaguar, always a Jaguar, and the Games are where that begins.", es: "Una vez Jaguar, siempre Jaguar, y los Juegos son donde eso comienza." },
    gallery: [media.fgPepRally, media.fgBasketballAcs, media.fgCheer, media.fgWaterGames, media.fgDunk, media.fgBull, media.fgWaterSlide, media.fgHandshake, media.fgMsBasketball],
    cta: { label: { en: "Follow the Jaguars on Instagram", es: "Sigue a los Jaguars en Instagram" }, href: "https://www.instagram.com/sccsjaguars/" },
  },
  {
    slug: "science-labs",
    kicker: { en: "Four laboratories", es: "Cuatro laboratorios" },
    title: { en: "Science Laboratories", es: "Laboratorios de Ciencias" },
    tagline: { en: "Science you can see for yourself.", es: "Ciencia que puedes ver con tus propios ojos." },
    note: { en: "Four labs · NGSS inquiry", es: "Cuatro laboratorios · indagación NGSS" },
    hero: media.igMicroscope4,
    lede: {
      en: "Four specialized laboratories put the three-dimensional NGSS framework into students' hands, microscopes, lab benches, and real data from Grade 1 to AP. Our scientists don't memorize the cell; they find it.",
      es: "Cuatro laboratorios especializados ponen el marco tridimensional NGSS en manos de los estudiantes, microscopios, mesones de laboratorio y datos reales desde 1.º grado hasta AP. Nuestros científicos no memorizan la célula; la encuentran.",
    },
    facts: [
      { value: "4", label: { en: "Specialized science labs", es: "Laboratorios especializados" } },
      { value: "NGSS", label: { en: "Three-dimensional framework", es: "Marco tridimensional" } },
      { value: "AP", label: { en: "Chemistry & Biology", es: "Química y Biología" } },
    ],
    sections: [
      {
        title: { en: "Inquiry first", es: "Primero la indagación" },
        body: {
          en: "Science instruction follows the NGSS framework through HMH resources: students ask questions, design investigations, and argue from evidence. The textbook comes after the experiment, not instead of it.",
          es: "La enseñanza de ciencias sigue el marco NGSS con recursos HMH: los estudiantes formulan preguntas, diseñan investigaciones y argumentan con evidencia. El libro viene después del experimento, no en su lugar.",
        },
        image: media.igMicroscope1,
      },
      {
        title: { en: "It starts young", es: "Empieza temprano" },
        body: {
          en: "Our second graders study changes of matter by watching popsicles melt in the Santa Cruz sun, observing, predicting, and recording like real scientists before enjoying the results.",
          es: "Nuestros estudiantes de segundo grado estudian los cambios de la materia viendo derretirse paletas bajo el sol de Santa Cruz, observando, prediciendo y registrando como verdaderos científicos antes de disfrutar el resultado.",
        },
        image: media.igMatter1,
      },
      {
        title: { en: "Lab-grade preparation", es: "Preparación de laboratorio" },
        body: {
          en: "By High School, Jaguars run full lab protocols in Chemistry and Biology, with AP sciences that earn university credit, preparation that shows the day they walk into a university lab.",
          es: "En High School, los Jaguars realizan protocolos completos de laboratorio en Química y Biología, con ciencias AP que otorgan créditos universitarios, una preparación que se nota el día que entran a un laboratorio universitario.",
        },
        image: media.scienceLab,
      },
    ],
    pillarsTitle: { en: "How we teach science", es: "Cómo enseñamos ciencias" },
    pillars: [
      { title: { en: "Ask", es: "Preguntar" }, text: { en: "Every unit opens with a phenomenon worth explaining.", es: "Cada unidad comienza con un fenómeno que vale la pena explicar." } },
      { title: { en: "Investigate", es: "Investigar" }, text: { en: "Hands-on labs with real instruments and real data.", es: "Laboratorios prácticos con instrumentos y datos reales." } },
      { title: { en: "Argue from Evidence", es: "Argumentar con Evidencia" }, text: { en: "Claims, evidence, reasoning, written and defended.", es: "Afirmación, evidencia, razonamiento, escritos y defendidos." } },
      { title: { en: "Connect", es: "Conectar" }, text: { en: "Linking science to math, engineering, and the world.", es: "Vincular la ciencia con las matemáticas, la ingeniería y el mundo." } },
    ],
    quote: { en: "Sometimes the best way to learn science is to see it for yourself.", es: "A veces la mejor manera de aprender ciencia es verla por ti mismo." },
    gallery: [media.igMicroscope4, media.igMicroscope2, media.igMicroscope3, media.igMicroscope5, media.igMatter2, media.scienceLab],
    cta: { label: { en: "Explore the curriculum", es: "Explora el currículo" }, href: "/learning" },
  },
  {
    slug: "library",
    kicker: { en: "Library Media Center", es: "Library Media Center" },
    title: { en: "The Library Media Center", es: "El Library Media Center" },
    tagline: { en: "Where readers become researchers.", es: "Donde los lectores se convierten en investigadores." },
    note: { en: "Bilingual collections · research", es: "Colecciones bilingües · investigación" },
    hero: media.libraryLounge,
    lede: {
      en: "Bilingual shelves, reading lounges, and research databases designed for collegiate-level work. The Library Media Center is where a kindergartner's first chapter book and a senior's capstone research share the same roof, and where families gather for Reading Night.",
      es: "Estantes bilingües, salas de lectura y bases de datos diseñadas para investigación de nivel universitario. En el Library Media Center conviven el primer libro por capítulos de un niño de kínder y la investigación final de un estudiante de último año, y allí se reúnen las familias en la Noche de Lectura.",
    },
    facts: [
      { value: "EN · ES", label: { en: "Bilingual collections", es: "Colecciones bilingües" } },
      { value: "EBSCO", label: { en: "Research databases", es: "Bases de datos de investigación" } },
      { value: "PK–12", label: { en: "One library, every reader", es: "Una biblioteca, cada lector" } },
    ],
    sections: [
      {
        title: { en: "A reading culture", es: "Una cultura lectora" },
        body: {
          en: "Story circles on the rug, author visits by video, the Book Fair, Book Club, and Family Reading Night, the library is the beating heart of literacy at SCCS.",
          es: "Círculos de cuentos sobre la alfombra, visitas de autores por video, la Feria del Libro, el Club de Lectura y la Noche Familiar de Lectura, la biblioteca es el corazón de la lectoescritura en SCCS.",
        },
        image: media.igReadingNight5,
      },
      {
        title: { en: "Research that holds up", es: "Investigación que resiste" },
        body: {
          en: "Middle and High School students learn to evaluate sources, synthesize evidence, and cite properly using EBSCO, Destiny, and Turnitin, the habits university professors expect on day one.",
          es: "Los estudiantes de Middle y High School aprenden a evaluar fuentes, sintetizar evidencia y citar correctamente con EBSCO, Destiny y Turnitin, los hábitos que los profesores universitarios esperan desde el primer día.",
        },
        image: media.library,
      },
      {
        title: { en: "Generations, together", es: "Generaciones, juntas" },
        body: {
          en: "When a high school friend of one of our teachers published a book, it went straight onto our shelves. That's the library: people, stories, and generations brought together through the love of reading.",
          es: "Cuando un amigo de la secundaria de uno de nuestros maestros publicó un libro, fue directo a nuestros estantes. Eso es la biblioteca: personas, historias y generaciones reunidas por el amor a la lectura.",
        },
        image: media.igReadingNight1,
      },
    ],
    pillarsTitle: { en: "Library resources", es: "Recursos de la biblioteca" },
    pillars: [
      { title: { en: "Destiny Catalog", es: "Catálogo Destiny" }, text: { en: "Search and reserve from the full collection.", es: "Busca y reserva en toda la colección." } },
      { title: { en: "EBSCO", es: "EBSCO" }, text: { en: "Academic databases for secondary research.", es: "Bases de datos académicas para investigación." } },
      { title: { en: "TumbleBooks", es: "TumbleBooks" }, text: { en: "Animated, talking e-books for young readers.", es: "Libros electrónicos animados para pequeños lectores." } },
      { title: { en: "Reading Programs", es: "Programas de Lectura" }, text: { en: "Book Fair, Book Club, and Family Reading Night.", es: "Feria del Libro, Club de Lectura y Noche Familiar de Lectura." } },
    ],
    quote: { en: "Readers are leaders.", es: "Los lectores son líderes." },
    gallery: [media.libraryLounge, media.igReadingNight1, media.igReadingNight2, media.igReadingNight4, media.igReadingStory, media.library],
    cta: { label: { en: "Family Reading Night", es: "Noche Familiar de Lectura" }, href: "/campus-life/beyond-the-classroom/family-reading-night" },
  },
];

export function getExperience(slug: string) {
  return EXPERIENCES.find((e) => e.slug === slug);
}
