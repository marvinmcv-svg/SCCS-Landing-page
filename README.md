# Santa Cruz Cooperative School — Website

A bilingual (EN/ES) website for **Santa Cruz Cooperative School (SCCS)**, built from the *SCCS Landing Page master build prompt* and the school's *Suggested Copy for Website* brief, and extended into a full multi-page site.

**Stack:** Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 · shadcn-style UI (Radix + cmdk) · framer-motion · react-hook-form + zod · date-fns

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (51 static pages + 1 API route)
npm run typecheck && npm run lint
```

## Site map

| Pillar | Pages |
|---|---|
| Home `/` | All 13 sections from the master prompt. Every section links deeper. |
| Discover SCCS | `/discover` (The SCCS Advantage) · `/discover/history` · `/discover/safety-wellness` · `/discover/campus` · `/discover/leadership` · `/discover/careers` |
| Admissions | `/admissions` (3-phase stepper, inquiry form, FAQ) |
| Learning & Outcomes | `/learning` (curriculum, standards, assessment, honor roll) · `/learning/academic-journey` · `/learning/dual-diploma` · `/learning/student-support` · `/learning/university-matriculation` |
| Campus Life | `/campus-life` · **`/campus-life/jaguar-experience`** + 6 deep pages (Innovation Hub, Performing Arts Center, Jaguar Athletics, Friendship Games, Science Labs, Library) · **`/campus-life/beyond-the-classroom`** + 9 tradition pages (Math Bowl, Knowledge Bowl, Spelling Bee, Book Fair, Family Reading Night, Santa Cruz Day, Fun Run, Grandparents' Day, Senior Welcome Dinner) · `/campus-life/student-leadership` · `/news` + 10 stories |
| Community | `/community` (team directory, faculty spotlights, Parent Hub, Mother's Club, La Palette, alumni) · `/contact` |

Also: ⌘K / Ctrl+K command palette (searches every page, story, event, and team member in the active language), `sitemap.xml`, `robots.txt`, JSON-LD, custom 404.

**API:** `POST /api/inquiries` checks the input with zod, limits each IP to 5 requests per 10 minutes, and treats a filled honeypot field as success without storing anything. It returns `201` for a valid inquiry and `400` for invalid input. Inquiries live only in memory; sending email and saving them durably have to be set up when the site is deployed.

## Where content lives

All copy and data are typed modules. You can edit them without touching any component.

| File | Contents |
|---|---|
| `src/data/dictionary.ts` | Shared UI and home-page copy (EN + ES) |
| `src/data/pages.ts` | Inner-page copy: history, safety, campus, leadership, careers, curriculum, support, contact, FAQ |
| `src/data/experiences.ts` | The six Jaguar Experience deep pages |
| `src/data/traditions.ts` | The nine Beyond the Classroom pages |
| `src/data/sccs-content.ts` | News, events, team, matriculation table, Instagram grid |
| `src/data/media.ts` | Photo registry with real dimensions and bilingual alt text |
| `src/data/nav.ts` | The 5-pillar navigation (Admissions second, per the site audit) |

## Photography

All 87 photos in `public/images/sccs/` are **real SCCS media**. None are stock or AI-generated.

- **@sccsjaguars Instagram:** taken from public post embeds. These are the Family Reading Night, microscope/cells, changes-of-matter, and second-grade math carousels, plus the "Meet the People Behind the Jaguars" faculty spotlights. Each one links back to its original post.
- **sccs.edu.bo photo archive:** includes the 2023 Friendship Games album, the campus tour set, PAC commencement, the college fair, TECHO service days, the Mother's Club, and the "then & now" history composites.

The old site's stock photos (generic classroom images) were deliberately left out.

**Photography gaps worth filling:**
- The Innovation Hub itself (its pages use the school's technology-lab photos for now).
- Night soccer on the lit fields.
- A close-up of graduates in caps and gowns.
- An aerial campus shot.
- Spelling Bee, Math Bowl, Santa Cruz Day, Fun Run, and Grandparents' Day. The old site's event galleries for these are empty, so those pages use the closest real photos, and their alt text describes what each photo actually shows.

## Real vs. sample content

**Real:**
- School facts: founding date, history, accreditation, contact details, admissions process, honor-roll rules, NHS/NJHS criteria, and La Palette pricing.
- The Board of Directors roster and the Director's welcome (taken from sccs.edu.bo).
- The four Instagram-sourced news stories and the faculty spotlights.

**Sample (from the master prompt, replace in `src/data/sccs-content.ts`):**
- The 14-person team directory.
- Six of the news stories.
- Event dates.
- The 25-row university matriculation table.
- Approximate tradition timings (e.g. "November") in `traditions.ts`.

## Notes for review

- **Brand colors:** the site follows the master prompt's "emerald prestige" palette (jungle green + gold + ivory). The school's current crest is navy and red with U.S. and Bolivian flags. If the brand should stay navy/red, every color is a token in `src/app/globals.css` (`@theme`), so it can be changed in one place.
- **"Since 1960":** the copy brief's footer tagline says 1960 but every other source says 1959. The site uses **1959** throughout.
- **Campus size:** one paragraph of the brief says "seven-acre"; the site uses **8 acres**, as stated everywhere else.
