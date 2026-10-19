import { media } from "./media";

/**
 * Every photo the page layouts use directly, grouped by the page they appear on.
 * Photos that belong to a list item (a hero slide, a news story, an experience)
 * live with that item instead. All of them are editable from the admin's Photos hub.
 */
export const PAGE_PHOTOS = {
  home: {
    whySccsTile1: media.graduationPac,
    whySccsTile2: media.collegeFair,
    whySccsTile3: media.dPalapaClass,
    whySccsTile4: media.dVexWorldsBoliviaFlag,
    whySccsTile5: media.dFgFolkDance,
    whySccsTile6: media.dCampusTower,
    safetyLarge: media.dEsFriendsHall,
    safetySmallLeft: media.dEsBoysLaughing,
    safetySmallRight: media.dPalapaClass2,
  },
  journey: {
    elementarySchool: media.dEsBoysLaughing,
    middleSchool: media.dStemCupChallenge,
    highSchool: media.collegeFair,
  },
  siteWide: {
    closingBannerBackground: media.pacFlags,
    notFoundBackground: media.historyPond,
  },

  advantage: {
    hero: media.dCampusFieldGroup,
    learnerProfile: media.esFriends2,
    jaguarSpiritBackground: media.fgCheer,
    safetyCard: media.esLunchTrio,
  },
  discoverLinks: {
    theSccsAdvantage: media.campusLawn,
    ourHistory: media.historyHalloween,
    safetyAndWellness: media.esLunchTrio,
    campusAndFacilities: media.campusGardens,
    leadershipAndGovernance: media.board,
    workAtSccs: media.teacherEs,
  },
  history: { hero: media.historySoccer },
  safety: { hero: media.esFriends },
  campus: {
    hero: media.campusGardens,
    aroundCampus: [media.campusGardens, media.campusLawn, media.campusPlayground, media.campusPatio, media.gym, media.libraryLounge, media.pacFlags],
  },
  schoolProfile: {
    hero: media.graduationPac,
    campusBand: media.campusLawn,
    apResultsLarge: media.igMicroscope6,
    apResultsSmall: media.collegeFair,
    campusMosaic: [media.dCampusTower, media.library, media.dSoccerAction, media.dFgFolkDance],
  },
  leadership: { hero: media.board, boardPhoto: media.board },
  careers: { hero: media.teacherEs },

  admissions: { hero: media.campusLawn, besideIntro: media.esLunchTrio },
  contact: { hero: media.campusGardens, visitUs: media.campusLawn },

  learning: { hero: media.igMicroscope4, collegeCounseling: media.collegeFair },
  learningLinks: {
    curriculum: media.dVexWorldsTeam,
    academicJourney: media.igMath1,
    dualDiploma: media.graduationPac,
    studentSupport: media.esFriends2,
    universityMatriculation: media.collegeFairPennant,
  },
  academicJourney: {
    hero: media.igMatter2,
    elementaryGallery: [media.igMath2, media.esClassroom, media.igReadingNight5],
    middleSchoolGallery: [media.igMicroscope2, media.msClassroom, media.dStemTowerBuild],
    highSchoolGallery: [media.dVexWorldsField, media.collegeFairReading, media.graduationPac],
  },
  dualDiploma: { hero: media.pacFlags, twoDiplomas: media.graduationPac },
  studentSupport: { hero: media.esFriends2 },
  matriculation: {
    hero: media.collegeFairPennant,
    collegeFairWide: media.collegeFair,
    collegeFairLeft: media.collegeFairFamilies,
    collegeFairRight: media.collegeFairReading,
  },

  campusLife: {
    hero: media.fgCheer,
    sectionCards: [media.fgPepRally, media.igReadingNight1, media.stuco3, media.pacStage],
  },
  beyondTheClassroom: { hero: media.igReadingNight1 },
  studentLeadership: {
    hero: media.stuco3,
    middleSchoolStuco: media.stuco,
    highSchoolStuco: media.stuco2,
    service: media.serviceTecho,
    serviceGallery: [media.serviceTechoBuild, media.serviceTechoTeam, media.serviceTecho],
  },
  news: { hero: media.fgBasketballAcs },
  community: { hero: media.mothersClubGroup, mothersClub: media.mothersClubTeam },
};

/** Where each group of page photos appears: the website area, the page name and its address. */
export const PAGE_PHOTO_INFO: Record<keyof typeof PAGE_PHOTOS, { area: string; page: string; href: string }> = {
  home: { area: "Home & site-wide", page: "Home page", href: "/" },
  journey: { area: "Home & site-wide", page: "Academic journey tabs (Home and Academic Journey)", href: "/#journey" },
  siteWide: { area: "Home & site-wide", page: "Every page", href: "/discover" },
  advantage: { area: "Discover SCCS", page: "The SCCS Advantage", href: "/discover" },
  discoverLinks: { area: "Discover SCCS", page: "“Keep exploring” cards (Discover pages)", href: "/discover/history" },
  history: { area: "Discover SCCS", page: "Our History", href: "/discover/history" },
  safety: { area: "Discover SCCS", page: "Safety & Wellness", href: "/discover/safety-wellness" },
  campus: { area: "Discover SCCS", page: "Campus & Facilities", href: "/discover/campus" },
  schoolProfile: { area: "Discover SCCS", page: "School Profile", href: "/discover/school-profile" },
  leadership: { area: "Discover SCCS", page: "Leadership & Governance", href: "/discover/leadership" },
  careers: { area: "Discover SCCS", page: "Work at SCCS", href: "/discover/careers" },
  admissions: { area: "Admissions & contact", page: "Admissions", href: "/admissions" },
  contact: { area: "Admissions & contact", page: "Contact", href: "/contact" },
  learning: { area: "Learning & Outcomes", page: "Curriculum", href: "/learning" },
  learningLinks: { area: "Learning & Outcomes", page: "“Keep exploring” cards (Learning pages)", href: "/learning/dual-diploma" },
  academicJourney: { area: "Learning & Outcomes", page: "Academic Journey", href: "/learning/academic-journey" },
  dualDiploma: { area: "Learning & Outcomes", page: "Dual Diploma", href: "/learning/dual-diploma" },
  studentSupport: { area: "Learning & Outcomes", page: "Student Support", href: "/learning/student-support" },
  matriculation: { area: "Learning & Outcomes", page: "University Matriculation", href: "/learning/university-matriculation" },
  campusLife: { area: "Campus Life", page: "Campus Life", href: "/campus-life" },
  beyondTheClassroom: { area: "Campus Life", page: "Beyond the Classroom", href: "/campus-life/beyond-the-classroom" },
  studentLeadership: { area: "Campus Life", page: "Student Leadership & Honors", href: "/campus-life/student-leadership" },
  news: { area: "News & events", page: "Jaguar News", href: "/news" },
  community: { area: "People", page: "Community", href: "/community" },
};
