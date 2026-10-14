/**
 * Inner-page copy. Adapted from the school's "Suggested Copy for Website" brief , 
 * tightened, de-jargoned, and translated with full EN/ES parity.
 */
import { media } from "./media";
import type { L } from "@/lib/i18n-types";

type Block = { title: L; body: L };
type Item = { title: L; text: L };

export const HISTORY = {
  kicker: { en: "Our History", es: "Nuestra Historia" },
  title: { en: "From a house in Santa Cruz to six decades of Jaguars.", es: "De una casa en Santa Cruz a seis décadas de Jaguars." },
  lede: {
    en: "SCCS began with a father's vision, a correspondence course, and a single room. It became the school that has defined American education in Bolivia for more than sixty years.",
    es: "SCCS comenzó con la visión de un padre, un curso por correspondencia y una sola habitación. Se convirtió en el colegio que ha definido la educación americana en Bolivia por más de sesenta años.",
  },
  chapters: [
    {
      year: "1950s",
      title: { en: "A father's vision", es: "La visión de un padre" },
      body: {
        en: "After studying in the United States, Dr. Elvio Fulvio Foianini Banzer wanted his children to have a premier American education in a fast-growing Santa Cruz. Using the Calvert School's Home Instruction system, the lessons began at home, until pioneers Anny Loren and Aida McKenney opened the circle to the public, and it outgrew a single room.",
        es: "Tras estudiar en Estados Unidos, el Dr. Elvio Fulvio Foianini Banzer quería que sus hijos recibieran una educación americana de primer nivel en una Santa Cruz en pleno crecimiento. Con el sistema de Instrucción en Casa de la Calvert School, las clases comenzaron en el hogar, hasta que las pioneras Anny Loren y Aida McKenney abrieron el círculo al público y quedó pequeño para una sola habitación.",
      },
      image: media.historyPond,
    },
    {
      year: "1959",
      title: { en: "Twenty-six students", es: "Veintiséis estudiantes" },
      body: {
        en: "As Santa Cruz grew from a quiet town into a flourishing city, international energy companies such as Gulf Oil and Parker Drilling arrived, and with them, families who needed an English-language school that guaranteed academic continuity abroad. On April 10, 1959, the house-turned-school officially opened with 26 students.",
        es: "Mientras Santa Cruz pasaba de pueblo tranquilo a ciudad pujante, llegaron empresas energéticas internacionales como Gulf Oil y Parker Drilling, y con ellas, familias que necesitaban un colegio en inglés que garantizara la continuidad académica en el extranjero. El 10 de abril de 1959, la casa convertida en colegio abrió oficialmente con 26 estudiantes.",
      },
      image: media.historySoccer,
    },
    {
      year: "1973",
      title: { en: "The Cooperative is born", es: "Nace la Cooperativa" },
      body: {
        en: "On May 14, 1973, reflecting a commitment to community-led excellence, families formally became the Santa Cruz Cooperative School, a school owned by the people it serves. The cooperative spirit is still in our name, and in our values.",
        es: "El 14 de mayo de 1973, reflejando un compromiso con la excelencia liderada por la comunidad, las familias constituyeron formalmente el Santa Cruz Cooperative School, un colegio de las personas a quienes sirve. El espíritu cooperativo sigue en nuestro nombre y en nuestros valores.",
      },
      image: media.historyPlayground,
    },
    {
      year: "1980",
      title: { en: "The Friendship Games", es: "Los Friendship Games" },
      body: {
        en: "SCCS, ACS, CCS, and AISB launch the Friendship Games, today the region's oldest interschool tradition. In 2017, Knowledge Bowl and chess join the rotation.",
        es: "SCCS, ACS, CCS y AISB inician los Friendship Games, hoy la tradición interescolar más antigua de la región. En 2017, el Knowledge Bowl y el ajedrez se suman a la rotación.",
      },
      image: media.fgPepRally,
    },
    {
      year: "2025",
      title: { en: "The Innovation Hub", es: "El Innovation Hub" },
      body: {
        en: "Our boldest investment yet opens its doors: a home for robotics, makerspaces, and design thinking, the same Jaguar Spirit of innovation, built for the next sixty years.",
        es: "Abre sus puertas nuestra inversión más audaz: un hogar para la robótica, los makerspaces y el pensamiento de diseño, el mismo Espíritu Jaguar de innovación, construido para los próximos sesenta años.",
      },
      image: media.computerLabHs,
    },
  ],
  thenNow: { en: "Then & now", es: "Antes y ahora" },
  thenNowIntro: { en: "The same campus, across the decades.", es: "El mismo campus, a través de las décadas." },
  gallery: [media.historyHalloween, media.historySoccer, media.historyPond, media.historyPlayground],
};

export const SAFETY = {
  kicker: { en: "Safety & Wellness", es: "Seguridad y Bienestar" },
  title: { en: "Safe, seen, and known.", es: "Seguros, vistos y conocidos." },
  lede: {
    en: "Academic excellence is impossible without emotional safety. Everything at SCCS, from hiring to discipline to the nurse's office, is built so every Jaguar can take intellectual risks from a foundation of total security.",
    es: "La excelencia académica es imposible sin seguridad emocional. Todo en SCCS, desde la contratación hasta la disciplina y la enfermería, está pensado para que cada Jaguar pueda asumir riesgos intelectuales desde una base de seguridad total.",
  },
  pillars: [
    {
      title: { en: "A culture of mutual respect", es: "Una cultura de respeto mutuo" },
      body: {
        en: "Our community runs on the Jaguar Bond, positive relationships between students, faculty, and families. Respect isn't a poster on the wall (though we have a great one); it's how every adult speaks to every child, every day.",
        es: "Nuestra comunidad funciona con el Vínculo Jaguar, relaciones positivas entre estudiantes, docentes y familias. El respeto no es un afiche en la pared (aunque tenemos uno muy bueno); es cómo cada adulto le habla a cada niño, todos los días.",
      },
      image: media.respectMural,
    },
    {
      title: { en: "Restorative Practices", es: "Prácticas Restaurativas" },
      body: {
        en: "We don't just manage behavior; we build character. Restorative Practices is a \"doing with, not to\" philosophy: instead of traditional punishment, students learn the impact of their actions and resolve conflict together, developing the empathy and resilience the world will demand of them.",
        es: "No solo manejamos la conducta; formamos el carácter. Las Prácticas Restaurativas son una filosofía de \"hacer con, no hacer a\": en lugar del castigo tradicional, los estudiantes comprenden el impacto de sus acciones y resuelven los conflictos juntos, desarrollando la empatía y la resiliencia que el mundo les exigirá.",
      },
      image: media.esFriends2,
    },
    {
      title: { en: "The CASEL framework", es: "El marco CASEL" },
      body: {
        en: "SCCS integrates CASEL's research-based Social-Emotional Learning framework across divisions. Our graduates leave self-aware and socially intelligent, principled leaders equipped to navigate a globalized world.",
        es: "SCCS integra el marco de Aprendizaje Socioemocional de CASEL, basado en evidencia, en todas las divisiones. Nuestros graduados egresan conscientes de sí mismos y con inteligencia social, líderes con principios preparados para un mundo globalizado.",
      },
      image: media.esLunchTrio,
    },
  ] satisfies (Block & { image: typeof media.respectMural })[],
  tabs: [
    {
      id: "policy",
      label: { en: "Child Protection Policy", es: "Política de Protección Infantil" },
      title: { en: "A culture of vigilance", es: "Una cultura de vigilancia" },
      body: [
        {
          en: "The safety and well-being of our students are the absolute prerequisites for all learning. SCCS maintains a zero-tolerance policy regarding any form of harm, and a child protection framework that is not a set of rules, but a proactive culture shared by every staff member, parent, and student.",
          es: "La seguridad y el bienestar de nuestros estudiantes son el requisito absoluto de todo aprendizaje. SCCS mantiene una política de tolerancia cero frente a cualquier forma de daño, y un marco de protección infantil que no es un conjunto de reglas, sino una cultura proactiva compartida por cada miembro del personal, cada familia y cada estudiante.",
        },
        {
          en: "Aligned with international safeguarding benchmarks and the Bolivian Child and Adolescent Code, our policy gives students a voice, gives staff rigorous and continuous training, and protects every Jaguar with professional reporting structures and transparent accountability. It is revised every year.",
          es: "Alineada con los estándares internacionales de salvaguarda y el Código Niña, Niño y Adolescente de Bolivia, nuestra política da voz a los estudiantes, ofrece al personal capacitación rigurosa y continua, y protege a cada Jaguar con estructuras profesionales de reporte y rendición de cuentas transparente. Se revisa cada año.",
        },
      ],
    },
    {
      id: "partnership",
      label: { en: "Parent Partnership", es: "Alianza con las Familias" },
      title: { en: "The SCCS Covenant", es: "El Pacto SCCS" },
      body: [
        {
          en: "By enrolling at SCCS, families enter a partnership dedicated to safety, respect, and dignity. Protecting children is a shared responsibility, school, parents, and students working together so that boundaries are respected, every child knows their voice is heard, and their sanctuary is absolute.",
          es: "Al inscribirse en SCCS, las familias se suman a una alianza dedicada a la seguridad, el respeto y la dignidad. Proteger a los niños es una responsabilidad compartida, colegio, familias y estudiantes trabajando juntos para que se respeten los límites, cada niño sepa que su voz es escuchada y su refugio sea absoluto.",
        },
      ],
    },
  ],
  promiseTitle: { en: "The SCCS Safety Promise", es: "La Promesa de Seguridad SCCS" },
  promise: [
    { title: { en: "Vetted Excellence", es: "Excelencia Verificada" }, text: { en: "Rigorous background checks for every hire.", es: "Verificación rigurosa de antecedentes en cada contratación." } },
    { title: { en: "Expert Training", es: "Capacitación Experta" }, text: { en: "Annual safeguarding certification for 100% of faculty and staff.", es: "Certificación anual en salvaguarda para el 100% del personal." } },
    { title: { en: "Student Agency", es: "Agencia Estudiantil" }, text: { en: "Age-appropriate workshops so children know their rights.", es: "Talleres adecuados a cada edad para que los niños conozcan sus derechos." } },
    { title: { en: "Parental Alliance", es: "Alianza Parental" }, text: { en: "Guidance to help families navigate risks in a digital age.", es: "Orientación para ayudar a las familias frente a los riesgos digitales." } },
  ] satisfies Item[],
  medicalTitle: { en: "Medical Center", es: "Centro Médico" },
  medicalBody: {
    en: "A dedicated Medical Care Center with a full-time physician and school nurse is on campus every school day, alongside dual Counseling Centers, a holistic support framework for every student.",
    es: "Un Centro de Atención Médica con médica de tiempo completo y enfermera está en el campus cada día escolar, junto a dos Centros de Orientación, un marco de apoyo integral para cada estudiante.",
  },
  cta: { en: "Schedule a private briefing with our Child Protection Lead", es: "Agenda una reunión privada con nuestro Responsable de Protección Infantil" },
};

export const CAMPUS = {
  kicker: { en: "Campus & Facilities", es: "Campus e Instalaciones" },
  title: { en: "Eight acres, built as a third teacher.", es: "Ocho acres, pensados como tercer maestro." },
  lede: {
    en: "We believe physical space is a \"third teacher.\" Our master-planned campus in Barrio Las Palmas is divided into primary and secondary sectors so every age has room to grow, under palm trees, palapas, and some of the best facilities in Bolivia.",
    es: "Creemos que el espacio físico es un \"tercer maestro\". Nuestro campus planificado en Barrio Las Palmas se divide en sectores de primaria y secundaria para que cada edad tenga espacio para crecer, bajo palmeras, palapas y algunas de las mejores instalaciones de Bolivia.",
  },
  facilities: [
    { title: { en: "Digital Classrooms", es: "Aulas Digitales" }, text: { en: "Climate-controlled spaces with multimedia technology and campus-wide high-speed connectivity.", es: "Espacios climatizados con tecnología multimedia y conectividad de alta velocidad en todo el campus." }, image: media.esClassroom },
    { title: { en: "Specialized Laboratories", es: "Laboratorios Especializados" }, text: { en: "Four science labs plus language (ESL/SSL) and computer labs built for technical mastery.", es: "Cuatro laboratorios de ciencias más laboratorios de idiomas (ESL/SSL) y computación." }, image: media.scienceLab, href: "/campus-life/jaguar-experience/science-labs" },
    { title: { en: "Innovation Hub", es: "Innovation Hub" }, text: { en: "Robotics, sustainable design, and digital media, opened 2025.", es: "Robótica, diseño sostenible y medios digitales, inaugurado en 2025." }, image: media.computerLabHs, href: "/campus-life/jaguar-experience/innovation-hub" },
    { title: { en: "Performing Arts Center", es: "Performing Arts Center" }, text: { en: "The nexus of creative expression, and the stage for commencement.", es: "El centro de la expresión creativa, y el escenario de la graduación." }, image: media.pacFlags, href: "/campus-life/jaguar-experience/performing-arts-center" },
    { title: { en: "Athletic Complex", es: "Complejo Deportivo" }, text: { en: "A covered gymnasium, lit fields, and modern playgrounds.", es: "Un coliseo techado, canchas iluminadas y parques infantiles modernos." }, image: media.gym, href: "/campus-life/jaguar-experience/athletics" },
    { title: { en: "Library Media Center", es: "Library Media Center" }, text: { en: "Bilingual collections and research spaces for every age.", es: "Colecciones bilingües y espacios de investigación para cada edad." }, image: media.libraryLounge, href: "/campus-life/jaguar-experience/library" },
    { title: { en: "Gardens & Palapas", es: "Jardines y Palapas" }, text: { en: "Shaded outdoor spaces for lunch, reading, and friendship.", es: "Espacios al aire libre con sombra para almorzar, leer y compartir." }, image: media.campusGardens },
    { title: { en: "Medical & Counseling Centers", es: "Centros Médico y de Orientación" }, text: { en: "A full-time physician and two counseling centers.", es: "Una médica de tiempo completo y dos centros de orientación." }, image: media.esFriends, href: "/discover/safety-wellness" },
  ],
};

export const LEADERSHIP = {
  kicker: { en: "Leadership & Governance", es: "Liderazgo y Gobierno" },
  title: { en: "Stewards of the mission.", es: "Guardianes de la misión." },
  lede: {
    en: "A cooperative school is governed by its community. The Board of Directors sets the long-range plan; the Director, with the Board's support, leads the day-to-day life of the school, advancing short-term objectives, establishing operating procedures, and overseeing every member of staff.",
    es: "Un colegio cooperativo es gobernado por su comunidad. La Junta Directiva define el plan de largo plazo; la Dirección, con el apoyo de la Junta, conduce la vida diaria del colegio, impulsando los objetivos de corto plazo, estableciendo procedimientos y supervisando a todo el personal.",
  },
  blocks: [
    { title: { en: "Divisional Oversight", es: "Supervisión por División" }, text: { en: "Principals ensure consistency and rigor across Elementary, Middle, and High School.", es: "Los directores garantizan coherencia y exigencia en Elementary, Middle y High School." } },
    { title: { en: "Faculty Mentorship", es: "Mentoría Docente" }, text: { en: "Professional development and instructional coaching for an elite teaching staff.", es: "Desarrollo profesional y acompañamiento pedagógico para un cuerpo docente de excelencia." } },
    { title: { en: "Strategic Planning", es: "Planificación Estratégica" }, text: { en: "Long-range objectives for a sustainable legacy of excellence.", es: "Objetivos de largo plazo para un legado sostenible de excelencia." } },
    { title: { en: "Community Engagement", es: "Vínculo con la Comunidad" }, text: { en: "A bridge between administration, faculty, and the global Jaguar family.", es: "Un puente entre la administración, los docentes y la familia Jaguar global." } },
  ] satisfies Item[],
  boardTitle: { en: "The Board of Directors", es: "La Junta Directiva" },
  boardBody: {
    en: "The Board provides governance and stewardship for the school's long-range plan, keeping SCCS true to the cooperative model it adopted in 1973.",
    es: "La Junta ejerce el gobierno y la administración responsable del plan de largo plazo del colegio, manteniendo a SCCS fiel al modelo cooperativo adoptado en 1973.",
  },
  board: [
    { name: "Ernesto Monasterio", role: { en: "President", es: "Presidente" } },
    { name: "Regina Sauto", role: { en: "Vice President", es: "Vicepresidenta" } },
    { name: "Gustavo Vidal", role: { en: "Board Member", es: "Miembro" } },
    { name: "Jasmina Stanojevich", role: { en: "Board Member", es: "Miembro" } },
    { name: "Marco Antonio Anglarill", role: { en: "Board Member", es: "Miembro" } },
    { name: "Maria Laura Roda", role: { en: "Board Member", es: "Miembro" } },
    { name: "Jose Ariel Schwartz", role: { en: "Board Member", es: "Miembro" } },
    { name: "Alejandra Antelo", role: { en: "Board Member", es: "Miembro" } },
    { name: "Alan Camhi", role: { en: "Board Member", es: "Miembro" } },
    { name: "Daniel Rojas", role: { en: "Board Member", es: "Miembro" } },
  ],
  messageTitle: { en: "Welcome from the Director", es: "Bienvenida de la Dirección" },
  message: {
    en: "Nestled in the heart of Santa Cruz, SCCS has been committed to educating principled leaders and compassionate global citizens since its founding in 1959. On campus you'll discover a family community that embraces the whole child, engaged students and inspiring faculty collaborating in pursuit of our collective vision. If you find yourself in town, we'd be delighted to welcome you to our beautiful campus.",
    es: "En el corazón de Santa Cruz, SCCS se ha comprometido a formar líderes con principios y ciudadanos globales compasivos desde su fundación en 1959. En nuestro campus descubrirás una comunidad familiar que abraza al estudiante completo, estudiantes comprometidos y docentes inspiradores que colaboran en pos de una visión compartida. Si estás en la ciudad, será un placer recibirte en nuestro hermoso campus.",
  },
};

export const CAREERS = {
  kicker: { en: "Work at SCCS", es: "Trabaja en SCCS" },
  title: { en: "Teach where it matters.", es: "Enseña donde importa." },
  lede: {
    en: "SCCS employs a diverse cohort of licensed educators who bring international experience and advanced credentials to the classroom. If you believe in rigorous, joyful, bilingual learning, and you want colleagues who stay for decades, we'd like to meet you.",
    es: "SCCS reúne a un grupo diverso de educadores titulados que aportan experiencia internacional y credenciales avanzadas al aula. Si crees en un aprendizaje exigente, alegre y bilingüe, y quieres colegas que se quedan por décadas, queremos conocerte.",
  },
  why: [
    { title: { en: "A culture of growth", es: "Una cultura de crecimiento" }, text: { en: "Continuous professional development and instructional coaching.", es: "Desarrollo profesional continuo y acompañamiento pedagógico." } },
    { title: { en: "Students who care", es: "Estudiantes comprometidos" }, text: { en: "Small classes of curious, bilingual learners.", es: "Clases pequeñas de estudiantes curiosos y bilingües." } },
    { title: { en: "A real community", es: "Una comunidad real" }, text: { en: "Mother's Club welcomes, Friendship Games, and colleagues who become family.", es: "Bienvenidas del Mother's Club, Friendship Games y colegas que se vuelven familia." } },
    { title: { en: "Santa Cruz living", es: "Vivir en Santa Cruz" }, text: { en: "Bolivia's dynamic economic hub, tropical, warm, and welcoming.", es: "El dinámico centro económico de Bolivia, tropical, cálido y acogedor." } },
  ] satisfies Item[],
  applyTitle: { en: "How to apply", es: "Cómo postular" },
  applyBody: {
    en: "Send your résumé, a cover letter, and a list of references to jobs@sccs.edu.bo. Current openings are announced on our Instagram, @sccsjaguars.",
    es: "Envía tu currículum, una carta de presentación y una lista de referencias a jobs@sccs.edu.bo. Las vacantes vigentes se anuncian en nuestro Instagram, @sccsjaguars.",
  },
};

export const CURRICULUM = {
  kicker: { en: "Our Curriculum", es: "Nuestro Currículo" },
  title: { en: "The architecture of global success.", es: "La arquitectura del éxito global." },
  lede: {
    en: "The SCCS curriculum is a precision-built roadmap from Pre-K to Grade 12, research-based resources, small classes, and differentiated instruction designed to move every learner beyond surface knowledge to deep, interdisciplinary understanding.",
    es: "El currículo de SCCS es una hoja de ruta precisa de Pre-Kínder a 12.º grado, recursos basados en evidencia, clases pequeñas e instrucción diferenciada para llevar a cada estudiante más allá del conocimiento superficial, hacia una comprensión profunda e interdisciplinaria.",
  },
  standardsTitle: { en: "Global benchmarks, local mastery", es: "Estándares globales, maestría local" },
  standards: [
    { title: { en: "Literacy & Mathematics", es: "Lectoescritura y Matemáticas" }, text: { en: "U.S. Common Core State Standards (CCSS), with Pre-AP and McGraw Hill resources and ALEKS for math mastery.", es: "Common Core State Standards (CCSS) de EE. UU., con recursos Pre-AP y McGraw Hill, y ALEKS para el dominio matemático." } },
    { title: { en: "Scientific Inquiry", es: "Indagación Científica" }, text: { en: "Next Generation Science Standards (NGSS), taught three-dimensionally through HMH.", es: "Next Generation Science Standards (NGSS), enseñados de forma tridimensional con HMH." } },
    { title: { en: "Humanities, Innovation & Arts", es: "Humanidades, Innovación y Artes" }, text: { en: "C3 Framework, National Core Arts Standards, and ISTE digital-literacy benchmarks.", es: "Marco C3, National Core Arts Standards y estándares ISTE de alfabetización digital." } },
    { title: { en: "Spanish & Bolivian Studies", es: "Español y Estudios Bolivianos" }, text: { en: "Bolivian Ministry of Education requirements, building national standards and cultural fluency.", es: "Requisitos del Ministerio de Educación de Bolivia, para cumplir estándares nacionales con fluidez cultural." } },
    { title: { en: "Physical Education", es: "Educación Física" }, text: { en: "SHAPE America standards for health, fitness, and teamwork.", es: "Estándares SHAPE America de salud, condición física y trabajo en equipo." } },
  ] satisfies Item[],
  edgeTitle: { en: "The Jaguar Edge: AP rigor & innovation", es: "La Ventaja Jaguar: rigor AP e innovación" },
  edgeBody: {
    en: "SCCS is an official testing center for the College Board SAT and Advanced Placement exams. Students can earn the AP International Diploma, and university credit, while still in high school. Paired with the 2025 Innovation Hub and a robust Student Success Team, it's how we sustain 99% university matriculation.",
    es: "SCCS es centro oficial de exámenes SAT y Advanced Placement del College Board. Los estudiantes pueden obtener el AP International Diploma, y créditos universitarios, estando aún en el colegio. Junto al Innovation Hub 2025 y un sólido Student Success Team, así sostenemos un 99% de matriculación universitaria.",
  },
  assessmentTitle: { en: "Assessment & reporting", es: "Evaluación y reportes" },
  assessmentIntro: { en: "Assessment is a roadmap, not a destination.", es: "La evaluación es una hoja de ruta, no un destino." },
  assessment: [
    {
      id: "growth",
      label: { en: "Mastery-First", es: "Primero la Maestría" },
      title: { en: "Beyond the gradebook", es: "Más allá de la libreta de notas" },
      body: {
        en: "Our Mastery-First philosophy shifts the focus from one-off tests to a continuous cycle of feedback and reflection. We track each learner's trajectory so every student meets the right level of challenge, documenting how their thinking grows, not just what they scored.",
        es: "Nuestra filosofía de Primero la Maestría cambia el foco de las pruebas aisladas a un ciclo continuo de retroalimentación y reflexión. Seguimos la trayectoria de cada estudiante para que enfrente el nivel de desafío adecuado, documentando cómo crece su pensamiento, no solo qué nota obtuvo.",
      },
    },
    {
      id: "sbg",
      label: { en: "Standards-Based Grading", es: "Calificación por Estándares" },
      title: { en: "Clarity in achievement", es: "Claridad en el logro" },
      body: {
        en: "In Elementary, Standards-Based Grading measures proficiency against specific Common Core and NGSS benchmarks instead of averaging performance over time. Every mark represents a verified skill, so you know exactly what your child has mastered and what comes next.",
        es: "En Elementary, la Calificación por Estándares mide el dominio frente a indicadores específicos de Common Core y NGSS, en lugar de promediar el rendimiento en el tiempo. Cada nota representa una habilidad verificada, así sabes exactamente qué ha dominado tu hijo y qué sigue.",
      },
    },
    {
      id: "gpa",
      label: { en: "GPA & Retakes", es: "GPA y Recuperación" },
      title: { en: "A transcript that travels", es: "Un récord académico que viaja" },
      body: {
        en: "Our High School GPA scale rewards persistence and deep inquiry. A Redo & Retake policy lets students close gaps without permanent penalty, building the growth mindset AP courses demand. Our transcripts are passports to the world's most competitive universities.",
        es: "Nuestra escala de GPA en High School premia la perseverancia y la indagación profunda. La política de Redo & Retake permite cerrar brechas sin penalización permanente, formando la mentalidad de crecimiento que exigen los cursos AP. Nuestros récords académicos son pasaportes a las universidades más competitivas del mundo.",
      },
    },
    {
      id: "skyward",
      label: { en: "Real-Time Reporting", es: "Reportes en Tiempo Real" },
      title: { en: "No surprises, only progress", es: "Sin sorpresas, solo progreso" },
      body: {
        en: "Through Skyward, our Student Information System, families and students have 24/7 access to grades, feedback, and upcoming milestones. Closing the information gap means intervention, or acceleration, happens the moment it's needed.",
        es: "A través de Skyward, nuestro Sistema de Información Estudiantil, familias y estudiantes acceden 24/7 a notas, retroalimentación y próximos hitos. Cerrar la brecha de información permite intervenir, o acelerar, en el momento justo.",
      },
    },
  ],
  honorsTitle: { en: "The Standard of Distinction", es: "El Estándar de Distinción" },
  honorsIntro: {
    en: "Published each semester for Grades 6–12, based on the average in core subjects.",
    es: "Publicado cada semestre para 6.º a 12.º grado, según el promedio en materias troncales.",
  },
  honors: [
    { title: { en: "Highest Honor Roll", es: "Cuadro de Honor Máximo" }, text: { en: "93%+ average, no grade below 85%", es: "Promedio de 93% o más, ninguna nota menor a 85%" } },
    { title: { en: "High Honor Roll", es: "Cuadro de Honor Alto" }, text: { en: "90%+ average, no grade below 80%", es: "Promedio de 90% o más, ninguna nota menor a 80%" } },
    { title: { en: "Honor Roll", es: "Cuadro de Honor" }, text: { en: "87%+ average, no grade below 75%, max. one C", es: "Promedio de 87% o más, ninguna nota menor a 75%, máximo una C" } },
  ] satisfies Item[],
  honorsNote: {
    en: "Eligibility for all academic and leadership honors, including NHS, NJHS, and STUCO, requires a clean disciplinary record and is forfeited after 10 unexcused absences or 20 tardies in a semester.",
    es: "La elegibilidad para todos los honores académicos y de liderazgo, incluidos NHS, NJHS y STUCO, requiere un historial disciplinario limpio y se pierde con 10 faltas injustificadas o 20 atrasos en un semestre.",
  },
};

export const DUAL_DIPLOMA = {
  lede: {
    en: "A world-class education should never be geographically limited. Our dual-track program is engineered for a seamless transition to the most prestigious universities in the United States, Latin America, and Europe, while honoring the language, history, and culture of Bolivia.",
    es: "Una educación de primer nivel nunca debería tener límites geográficos. Nuestro programa de doble vía está diseñado para una transición fluida a las universidades más prestigiosas de Estados Unidos, Latinoamérica y Europa, honrando el idioma, la historia y la cultura de Bolivia.",
  },
  multiTrackTitle: { en: "The SCCS Multi-Track System", es: "El Sistema Multi-Vía SCCS" },
  multiTrackBody: {
    en: "Starting in Grade 7, every Jaguar embarks on a synchronized journey toward two high-value credentials. Both run in parallel, no extra year, no either/or.",
    es: "Desde séptimo grado, cada Jaguar emprende un camino sincronizado hacia dos credenciales de alto valor. Ambas avanzan en paralelo, sin año adicional, sin tener que elegir.",
  },
  roadmap: [
    { grade: { en: "Grade 7–8", es: "7.º–8.º" }, text: { en: "Dual-track begins: Common Core + NGSS core alongside Ministry-aligned Spanish and social studies.", es: "Comienza la doble vía: núcleo Common Core + NGSS junto a Lenguaje y Ciencias Sociales alineados al Ministerio." } },
    { grade: { en: "Grade 9–10", es: "9.º–10.º" }, text: { en: "Credits count toward the 24-credit U.S. diploma; Pre-AP pathways and Innovation electives open.", es: "Los créditos cuentan para el diploma de EE. UU. de 24 créditos; se abren trayectos Pre-AP y electivas de Innovación." } },
    { grade: { en: "Grade 11", es: "11.º" }, text: { en: "AP coursework, SAT on campus, and college counseling intensifies.", es: "Cursos AP, SAT en el campus y la orientación universitaria se intensifica." } },
    { grade: { en: "Grade 12", es: "12.º" }, text: { en: "Bachillerato requirements complete; seniors graduate with both diplomas on the PAC stage.", es: "Se completan los requisitos del Bachillerato; los seniors se gradúan con ambos diplomas en el escenario del PAC." } },
  ],
  transferTitle: { en: "Transferring from abroad", es: "Transferencias desde el exterior" },
  transferBody: {
    en: "The Dual-Diploma program is a non-negotiable standard for every student, including those joining us from abroad. Our registrar transitions foreign academic records, authenticated by the respective Bolivian embassies, into our credit system, so every graduate leaves with the institutional leverage to lead on any stage, in any language.",
    es: "El programa de Doble Diploma es un estándar para todos los estudiantes, incluidos quienes llegan del exterior. Nuestro registro académico incorpora los récords extranjeros, autenticados por las embajadas de Bolivia correspondientes, a nuestro sistema de créditos, para que cada graduado egrese con el respaldo institucional para liderar en cualquier escenario y en cualquier idioma.",
  },
  ctaRoadmap: { en: "Consult our Registrar about international transfers", es: "Consulta a nuestro Registro sobre transferencias internacionales" },
};

export const SUPPORT = {
  kicker: { en: "Student Support & Counseling", es: "Apoyo y Orientación" },
  title: { en: "Every learner, fully supported.", es: "Cada estudiante, plenamente acompañado." },
  lede: {
    en: "Diverse learning profiles are a strength of our community. Our Student Success Team and counseling departments make sure every Jaguar has the tools, academic, linguistic, and emotional, to thrive.",
    es: "La diversidad de perfiles de aprendizaje es una fortaleza de nuestra comunidad. Nuestro Student Success Team y los departamentos de orientación aseguran que cada Jaguar tenga las herramientas, académicas, lingüísticas y emocionales, para prosperar.",
  },
  sstTitle: { en: "The Student Success Team (SST)", es: "El Student Success Team (SST)" },
  sstBody: {
    en: "Grounded in a Multi-Tiered System of Support (MTSS) and Universal Design for Learning (UDL), the SST ensures Tier 1 and Tier 2 instruction meets global standards, and acts as the bridge between home and school at every step.",
    es: "Basado en un Sistema de Apoyo de Múltiples Niveles (MTSS) y el Diseño Universal para el Aprendizaje (DUA), el SST asegura que la instrucción de Nivel 1 y 2 cumpla estándares globales, y actúa como puente entre el hogar y el colegio en cada paso.",
  },
  sst: [
    { title: { en: "Linguistic Mastery", es: "Dominio Lingüístico" }, text: { en: "Tailored ELL/SLL support for full bilingual fluency.", es: "Apoyo ELL/SLL personalizado para una fluidez bilingüe plena." } },
    { title: { en: "Targeted Interventions", es: "Intervenciones Focalizadas" }, text: { en: "Precision math and literacy support to close foundational gaps.", es: "Apoyo preciso en matemáticas y lectoescritura para cerrar brechas." } },
    { title: { en: "Inclusive Integration", es: "Integración Inclusiva" }, text: { en: "A blend of specialist sessions and in-class support.", es: "Combinación de sesiones con especialistas y apoyo en el aula." } },
    { title: { en: "Formal Accommodations", es: "Adecuaciones Formales" }, text: { en: "ILPs and Accommodation Plans based on external evaluations.", es: "Planes ILP y de adecuaciones basados en evaluaciones externas." } },
  ] satisfies Item[],
  counseling: [
    {
      id: "es",
      label: { en: "Elementary", es: "Elementary" },
      title: { en: "The foundation of well-being", es: "La base del bienestar" },
      body: { en: "Emotional security is the bedrock of achievement. Our Elementary counselors create a sanctuary where children, parents, and teachers feel heard and connected.", es: "La seguridad emocional es la base del logro. Nuestros orientadores de Elementary crean un refugio donde niños, familias y docentes se sienten escuchados y conectados." },
      points: [
        { en: "Bullying prevention and safeguarding education", es: "Prevención del acoso y educación en salvaguarda" },
        { en: "Confidential individual counseling for students and parents", es: "Orientación individual confidencial para estudiantes y familias" },
        { en: "Small-group sessions for social-emotional growth", es: "Sesiones en grupos pequeños para el crecimiento socioemocional" },
        { en: "Care coordination with teachers and external specialists", es: "Coordinación con docentes y especialistas externos" },
      ],
    },
    {
      id: "ms",
      label: { en: "Middle School", es: "Middle School" },
      title: { en: "The bridge to resilience", es: "El puente hacia la resiliencia" },
      body: { en: "Adolescence brings new questions of identity and belonging. Middle School counseling focuses on autonomy, self-regulation, and the resilience to navigate social dynamics with integrity.", es: "La adolescencia trae nuevas preguntas de identidad y pertenencia. La orientación en Middle School se enfoca en la autonomía, la autorregulación y la resiliencia para manejar las dinámicas sociales con integridad." },
      points: [
        { en: "Peer dynamics and conflict resolution", es: "Dinámicas entre pares y resolución de conflictos" },
        { en: "Lessons on stress, digital citizenship, and healthy choices", es: "Lecciones sobre estrés, ciudadanía digital y decisiones saludables" },
        { en: "Counselor–teacher collaboration for timely support", es: "Colaboración entre orientadores y docentes para un apoyo oportuno" },
        { en: "Transition guidance into High School", es: "Acompañamiento en la transición a High School" },
      ],
    },
    {
      id: "hs",
      label: { en: "High School", es: "High School" },
      title: { en: "Balance under pressure", es: "Equilibrio bajo presión" },
      body: { en: "University preparation demands a robust emotional infrastructure. Our High School counselors help students balance high achievement with personal well-being, and build the self-awareness to lead.", es: "La preparación universitaria exige una sólida infraestructura emocional. Nuestros orientadores de High School ayudan a equilibrar el alto rendimiento con el bienestar personal, y a construir la autoconciencia para liderar." },
      points: [
        { en: "Confidential counseling focused on stress and growth", es: "Orientación confidencial enfocada en el estrés y el crecimiento" },
        { en: "Resilience coaching", es: "Acompañamiento en resiliencia" },
        { en: "Coordination with external specialists", es: "Coordinación con especialistas externos" },
        { en: "Aligning values with academic and career goals", es: "Alinear valores con metas académicas y profesionales" },
      ],
    },
    {
      id: "college",
      label: { en: "College Counseling", es: "Consejería Universitaria" },
      title: { en: "The launchpad", es: "La plataforma de lanzamiento" },
      body: { en: "Orientation begins in Grades 9–10 and intensifies in 11–12, with a bespoke roadmap for every student. We turn the application process into a journey of self-discovery.", es: "La orientación comienza en 9.º–10.º y se intensifica en 11.º–12.º, con una hoja de ruta personalizada para cada estudiante. Convertimos el proceso de postulación en un viaje de autodescubrimiento." },
      points: [
        { en: "Career semester classes and SAT/ACT/TOEFL testing plans", es: "Clases de semestre vocacional y planes de exámenes SAT/ACT/TOEFL" },
        { en: "University fairs, campus visits, and admissions interviews", es: "Ferias universitarias, visitas y entrevistas de admisión" },
        { en: "Guidance on merit- and need-based financial aid", es: "Orientación sobre becas por mérito y ayuda financiera" },
        { en: "Applications to the U.S., Canada, Europe, and Latin America", es: "Postulaciones a EE. UU., Canadá, Europa y Latinoamérica" },
      ],
    },
  ],
};

export const LEADERSHIP_HONORS = {
  kicker: { en: "Leadership & Honors", es: "Liderazgo y Honores" },
  title: { en: "Where Jaguars learn to lead.", es: "Donde los Jaguars aprenden a liderar." },
  lede: {
    en: "Student government, honor societies, and service that reaches beyond our walls. Leadership at SCCS is practiced, not just praised.",
    es: "Gobierno estudiantil, sociedades de honor y un servicio que llega más allá de nuestros muros. En SCCS el liderazgo se practica, no solo se elogia.",
  },
  stuco: {
    title: { en: "Student Council (STUCO)", es: "Consejo Estudiantil (STUCO)" },
    ms: { en: "Middle School STUCO is a laboratory for civic agency: students research school-wide needs, propose solutions to administration, and lead campaigns for Earth Day and bullying prevention.", es: "El STUCO de Middle School es un laboratorio de agencia cívica: los estudiantes investigan necesidades del colegio, proponen soluciones a la dirección y lideran campañas por el Día de la Tierra y la prevención del acoso." },
    hs: { en: "High School STUCO is the pinnacle of student governance, officers produce monthly video dispatches, lead campaigns for International Women's Day and other global milestones, and represent the student voice in high-level discussions.", es: "El STUCO de High School es la cumbre del gobierno estudiantil, sus integrantes producen reportes mensuales en video, lideran campañas por el Día Internacional de la Mujer y otras fechas globales, y representan la voz estudiantil en las decisiones importantes." },
  },
  societies: [
    {
      title: { en: "National Junior Honor Society (NJHS)", es: "National Junior Honor Society (NJHS)" },
      body: { en: "For students in Grades 6–9 who embody Scholarship, Leadership, Service, Citizenship, and Character.", es: "Para estudiantes de 6.º a 9.º grado que encarnan Erudición, Liderazgo, Servicio, Ciudadanía y Carácter." },
      points: [
        { en: "Minimum 87% academic average", es: "Promedio académico mínimo de 87%" },
        { en: "Letters of recommendation and a panel interview", es: "Cartas de recomendación y entrevista con un panel" },
        { en: "6+ hours of community service per quarter", es: "6+ horas de servicio comunitario por trimestre" },
      ],
    },
    {
      title: { en: "National Honor Society (NHS)", es: "National Honor Society (NHS)" },
      body: { en: "A global hallmark of high-achieving high school students, and a clear signal to universities of sustained excellence.", es: "Un sello global de los estudiantes de secundaria de alto rendimiento, y una señal clara para las universidades de excelencia sostenida." },
      points: [
        { en: "Advanced scholarship in a college-prep environment", es: "Excelencia académica en un entorno preuniversitario" },
        { en: "High-impact community service projects", es: "Proyectos de servicio comunitario de alto impacto" },
        { en: "Principled leadership among peers", es: "Liderazgo con principios entre pares" },
      ],
    },
  ],
  serviceTitle: { en: "Service beyond our walls", es: "Servicio más allá de nuestros muros" },
  serviceBody: {
    en: "Jaguars build homes with TECHO, run holiday drives, and partner with community organizations across Santa Cruz, because principled leadership starts with showing up.",
    es: "Los Jaguars construyen viviendas con TECHO, organizan campañas solidarias y colaboran con organizaciones de toda Santa Cruz, porque el liderazgo con principios empieza por estar presente.",
  },
};

export const ADMISSIONS_FAQ: { q: L; a: L }[] = [
  { q: { en: "When should we apply?", es: "¿Cuándo debemos postular?" }, a: { en: "Our main intake opens in March for August entry. We also review mid-year and international transfer applications as space allows, contact Admissions to check availability.", es: "Nuestra convocatoria principal abre en marzo para el ingreso de agosto. También revisamos postulaciones a mitad de año y transferencias internacionales según disponibilidad, consulta con Admisiones." } },
  { q: { en: "Is instruction in English?", es: "¿Las clases son en inglés?" }, a: { en: "Yes, instruction is in English from PK to Grade 12, with Spanish taught to Bolivian Ministry of Education standards. ELL/SLL support helps new students reach full fluency.", es: "Sí, la enseñanza es en inglés de PK a 12.º grado, con Lenguaje impartido según los estándares del Ministerio de Educación. El apoyo ELL/SLL ayuda a los nuevos estudiantes a alcanzar fluidez plena." } },
  { q: { en: "What does the admission test cover?", es: "¿Qué evalúa el examen de admisión?" }, a: { en: "The SCCS Admission Test is a diagnostic of English proficiency and mathematical reasoning appropriate to the grade of entry. It helps us place your child well, not to screen out curiosity.", es: "El SCCS Admission Test es un diagnóstico del dominio del inglés y del razonamiento matemático según el grado de ingreso. Nos ayuda a ubicar bien a tu hijo, no a descartar la curiosidad." } },
  { q: { en: "We're moving from abroad. How do transfers work?", es: "Venimos del exterior. ¿Cómo funcionan las transferencias?" }, a: { en: "Our Registrar converts foreign records, authenticated by the relevant Bolivian embassy, into our credit system, so your child joins the Dual-Diploma program without losing ground.", es: "Nuestro Registro convierte los récords extranjeros, autenticados por la embajada de Bolivia correspondiente, a nuestro sistema de créditos, para que tu hijo se integre al Doble Diploma sin perder avance." } },
  { q: { en: "Can we visit before applying?", es: "¿Podemos visitar antes de postular?" }, a: { en: "Absolutely. Tours run Monday to Friday during school hours. Use the inquiry form and we'll confirm a time within one school day.", es: "Por supuesto. Las visitas se realizan de lunes a viernes en horario escolar. Usa el formulario y confirmaremos un horario en un día escolar." } },
];

export const CONTACT = {
  kicker: { en: "Contact Us", es: "Contáctanos" },
  title: { en: "Connect with SCCS.", es: "Conecta con SCCS." },
  lede: {
    en: "Whether you're a prospective family starting your admissions journey or a current member of the Jaguar community, choose the pathway that fits, we're here to help.",
    es: "Ya seas una familia interesada que comienza su proceso de admisión o parte de la comunidad Jaguar, elige el camino que mejor se ajuste, estamos para ayudarte.",
  },
  groups: [
    {
      title: { en: "Admissions & Enrollment", es: "Admisiones e Inscripción" },
      note: { en: "Prospective families", es: "Familias interesadas" },
      lines: [
        { label: { en: "Admissions Office", es: "Oficina de Admisiones" }, value: "contactus@sccs.edu.bo", href: "mailto:contactus@sccs.edu.bo" },
        { label: { en: "Request a tour", es: "Solicitar una visita" }, value: { en: "Inquiry form →", es: "Formulario →" }, href: "/admissions#inquire" },
      ],
    },
    {
      title: { en: "Academic & Student Life", es: "Vida Académica y Estudiantil" },
      note: { en: "Current families", es: "Familias actuales" },
      lines: [
        { label: { en: "Elementary School", es: "Elementary School" }, value: "contactus@sccs.edu.bo", href: "mailto:contactus@sccs.edu.bo" },
        { label: { en: "Middle & High School", es: "Middle y High School" }, value: "contactus@sccs.edu.bo", href: "mailto:contactus@sccs.edu.bo" },
        { label: { en: "Counseling & Well-being", es: "Orientación y Bienestar" }, value: "contactus@sccs.edu.bo", href: "mailto:contactus@sccs.edu.bo" },
      ],
    },
    {
      title: { en: "Administration", es: "Administración" },
      note: { en: "Transcripts, careers, tuition", es: "Récords, empleo, pensiones" },
      lines: [
        { label: { en: "Registrar's Office", es: "Registro Académico" }, value: "contactus@sccs.edu.bo", href: "mailto:contactus@sccs.edu.bo" },
        { label: { en: "Human Resources", es: "Recursos Humanos" }, value: "jobs@sccs.edu.bo", href: "mailto:jobs@sccs.edu.bo" },
        { label: { en: "Business Office", es: "Administración y Finanzas" }, value: "contactus@sccs.edu.bo", href: "mailto:contactus@sccs.edu.bo" },
      ],
    },
  ],
  visitTitle: { en: "Visit our campus", es: "Visita nuestro campus" },
  directions: { en: "Get directions", es: "Cómo llegar" },
};

export const PORTALS = [
  { name: "Skyward", href: "https://www.skyward.com/" },
  { name: "Google Classroom", href: "https://classroom.google.com/" },
  { name: "Seesaw", href: "https://app.seesaw.me/" },
  { name: "Turnitin", href: "https://www.turnitin.com/" },
  { name: "BrainPOP", href: "https://www.brainpop.com/" },
  { name: "EBSCO", href: "https://search.ebscohost.com/" },
];
