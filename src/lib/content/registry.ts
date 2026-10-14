/**
 * Every collection the admin portal can edit. `target` is the live exported object
 * from `src/data`, which the content engine updates in place.
 */
import { dictionaries } from "@/data/dictionary";
import { HERO_SLIDES } from "@/data/home";
import { media } from "@/data/media";
import { PILLARS } from "@/data/nav";
import { EXPERIENCES } from "@/data/experiences";
import { MORE_TRADITIONS, TRADITIONS, TRADITION_GROUPS } from "@/data/traditions";
import { CLASS_YEARS, EVENTS, INSTAGRAM_POSTS, MATRICULATION, NEWS, SPOTLIGHTS, TEAM } from "@/data/sccs-content";
import {
  ADMISSIONS_FAQ,
  CAMPUS,
  CAREERS,
  CONTACT,
  CURRICULUM,
  DUAL_DIPLOMA,
  HISTORY,
  LEADERSHIP,
  LEADERSHIP_HONORS,
  PORTALS,
  SAFETY,
  SUPPORT,
} from "@/data/pages";

export type CollectionDef = {
  id: string;
  label: string;
  group: string;
  description: string;
  /** Page where the result can be seen. */
  href: string;
  target: object;
  /** The value is `{ en, es }` dictionaries with the same shape; the editor pairs them field by field. */
  bilingualPair?: boolean;
  /** Fields whose value must be one of a fixed set (by field name). */
  enums?: Record<string, string[]>;
  /** The field that names each item in a list (shown as the item's title). */
  itemTitle?: string;
};

const DIVISIONS = ["ES", "MS", "HS", "COMMUNITY"];

export const COLLECTIONS: CollectionDef[] = [
  { id: "copy", group: "Home & site-wide", label: "Site copy", description: "Headlines, buttons, navigation labels, the home page, the footer and every shared sentence, in English and Spanish.", href: "/", target: dictionaries, bilingualPair: true },
  { id: "heroSlides", group: "Home & site-wide", label: "Hero slideshow", description: "The photographs that rotate at the top of the home page, with their captions.", href: "/", target: HERO_SLIDES },
  { id: "nav", group: "Home & site-wide", label: "Navigation menu", description: "The five menu sections and the pages listed under each.", href: "/", target: PILLARS },

  { id: "history", group: "Discover SCCS", label: "Our History", description: "The founding story and the milestones timeline.", href: "/discover/history", target: HISTORY },
  { id: "safety", group: "Discover SCCS", label: "Safety & Wellness", description: "Child protection, SEL, restorative practices and the medical center.", href: "/discover/safety-wellness", target: SAFETY },
  { id: "campus", group: "Discover SCCS", label: "Campus & Facilities", description: "The campus page.", href: "/discover/campus", target: CAMPUS },
  { id: "leadership", group: "Discover SCCS", label: "Leadership & Governance", description: "The Director's welcome and the Board of Directors.", href: "/discover/leadership", target: LEADERSHIP },
  { id: "careers", group: "Discover SCCS", label: "Work at SCCS", description: "The careers page.", href: "/discover/careers", target: CAREERS },

  { id: "faq", group: "Admissions & contact", label: "Admissions FAQ", description: "Questions families ask.", href: "/admissions#faq", target: ADMISSIONS_FAQ },
  { id: "contact", group: "Admissions & contact", label: "Contact page", description: "Offices, phone numbers, emails and hours.", href: "/contact", target: CONTACT },
  { id: "portals", group: "Admissions & contact", label: "Family portals", description: "Skyward, Google Classroom and the other portal links.", href: "/community#parent-hub", target: PORTALS },

  { id: "curriculum", group: "Learning & Outcomes", label: "Curriculum", description: "Standards, methodology, assessment and honor roll.", href: "/learning", target: CURRICULUM },
  { id: "dualDiploma", group: "Learning & Outcomes", label: "Dual Diploma page", description: "How the two diplomas work.", href: "/learning/dual-diploma", target: DUAL_DIPLOMA },
  { id: "support", group: "Learning & Outcomes", label: "Student Support", description: "SST, counseling and college counseling.", href: "/learning/student-support", target: SUPPORT },
  {
    id: "matriculation",
    group: "Learning & Outcomes",
    label: "University matriculation",
    description: "Each university on the map: country, coordinates, number of graduates and class years.",
    href: "/learning/university-matriculation",
    target: MATRICULATION,
    itemTitle: "university",
    enums: { country: ["US", "CA", "GB", "ES", "NL", "IT", "BO", "CO", "CL", "MX", "AU"] },
  },
  { id: "classYears", group: "Learning & Outcomes", label: "Class years filter", description: "The years offered in the matriculation filter.", href: "/learning/university-matriculation", target: CLASS_YEARS },

  { id: "experiences", group: "Campus Life", label: "Jaguar Experience pages", description: "Innovation Hub, PAC, Athletics, Friendship Games, Science Labs and Library.", href: "/campus-life/jaguar-experience", target: EXPERIENCES },
  { id: "traditions", group: "Campus Life", label: "Beyond the Classroom pages", description: "Math Bowl, Spelling Bee, Book Fair and every tradition page.", href: "/campus-life/beyond-the-classroom", target: TRADITIONS, enums: { group: ["academic", "civic", "family"] } },
  { id: "traditionGroups", group: "Campus Life", label: "Tradition groups", description: "The headings that group the traditions.", href: "/campus-life/beyond-the-classroom", target: TRADITION_GROUPS },
  { id: "moreTraditions", group: "Campus Life", label: "More traditions list", description: "The extra traditions listed at the end of the page.", href: "/campus-life/beyond-the-classroom", target: MORE_TRADITIONS },
  { id: "leadershipHonors", group: "Campus Life", label: "Leadership & Honors", description: "STUCO, NHS/NJHS, Honor Roll and service.", href: "/campus-life/student-leadership", target: LEADERSHIP_HONORS },

  { id: "news", group: "News & events", label: "Jaguar News", description: "Stories: add, edit, reorder or remove. Feature a story to place it first.", href: "/news", target: NEWS, enums: { category: ["ACADEMICS", "ARTS", "ATHLETICS", "COMMUNITY"] } },
  { id: "events", group: "News & events", label: "Events calendar", description: "Upcoming events. Dates use the format YYYY-MM-DD.", href: "/#events", target: EVENTS, enums: { division: DIVISIONS } },
  { id: "instagram", group: "News & events", label: "Instagram strip", description: "The photos and links in the Instagram row.", href: "/#events", target: INSTAGRAM_POSTS },

  {
    id: "team",
    group: "People",
    label: "Team directory",
    description: "Staff names, roles, divisions and bios.",
    href: "/community",
    target: TEAM,
    itemTitle: "name",
    enums: { category: ["LEADERSHIP", "FACULTY", "SPECIALIST", "SST", "ADMIN"], division: ["ALL", "ES", "MS", "HS"] },
  },
  { id: "spotlights", group: "People", label: "Faculty spotlights", description: "The 'Meet the People Behind the Jaguars' series.", href: "/community", target: SPOTLIGHTS },

  { id: "media", group: "Photos", label: "Photo library", description: "Every photograph on the site. Replace one here and it changes everywhere it appears.", href: "/", target: media, enums: { source: ["instagram", "sccs.edu.bo", "upload"] } },
];
