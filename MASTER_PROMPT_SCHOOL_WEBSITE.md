# Master Prompt: Premium Bilingual School Website

A reusable build prompt based on the Santa Cruz Cooperative School (SCCS) website. It produces the same standard of site for any school: multi-page, bilingual, editable by staff, with an AI receptionist.

**How to use it**

1. Fill in **Part A: Client Brief** with the new school's details. Every `{{PLACEHOLDER}}` must be replaced or deleted.
2. Gather the assets listed in **Part B**.
3. Paste **Part A + Part C** (the master prompt) into Claude Code in an empty repository. Put the school's real photos in `public/images/{{school-slug}}/` and its logo files in `public/brand/` first.
4. Work through the build in the phases listed in **Part D**, checking the result after each one.

Anything marked *(optional)* can be removed from the prompt if the client doesn't need it.

---

## Part A: Client Brief (fill this in)

```yaml
school:
  name: "{{Full school name}}"
  short_name: "{{Acronym, e.g. SCCS}}"
  slug: "{{lowercase-slug}}"
  mascot: "{{e.g. Jaguars}}"                # drives the hero line "Home of the {{Mascot}}" and the community voice
  founded: "{{YYYY-MM-DD}}"
  grades: "{{e.g. PK–12}}"
  type: "{{e.g. American international school / bilingual private school / IB school}}"
  city: "{{City}}"
  country: "{{Country}}"
  country_code: "{{ISO-2, e.g. BO}}"
  address: "{{Street, neighborhood, city, country}}"
  phone: "{{+XX X XXXXXXX}}"
  email_admissions: "{{admissions@...}}"
  email_jobs: "{{jobs@...}}"                 # optional
  domain: "{{https://school.edu}}"
  instagram: "{{url}}"
  facebook: "{{url}}"
  other_social: ["{{url}}"]

languages:
  primary: "{{en}}"
  secondary: "{{es}}"                        # or "none" for a single-language site

positioning:
  tagline: "{{e.g. Two diplomas. One unrivaled future.}}"
  hero_title: "{{e.g. Home of the Jaguars}}"
  seo_title: "{{e.g. School Name — The Gold Standard of Global Education}}"
  differentiators:                          # 3–6, each one backed by a real fact
    - "{{e.g. Dual U.S. + national diploma}}"
    - "{{e.g. 99% university matriculation}}"
    - "{{e.g. Cognia accredited}}"
  headline_stats:                           # exactly 4, real numbers only
    - { value: "{{99}}", suffix: "{{%}}", label: "{{University Matriculation}}", note: "{{Class after class}}" }
    - { value: "{{65}}", suffix: "{{+}}", label: "{{Years of Excellence}}", note: "{{Founded 1959}}" }
    - { value: "{{2}}",  suffix: "",      label: "{{Diplomas, One Journey}}", note: "{{U.S. + national}}" }
    - { value: "{{8}}",  suffix: "",      label: "{{Acre Campus}}", note: "{{Neighborhood}}" }

identity:
  mission: "{{verbatim}}"
  vision: "{{verbatim}}"
  motto: "{{optional}}"
  core_values: ["{{Respect}}", "{{Integrity}}", "..."]
  learner_profile: [{ title: "{{...}}", line: "{{...}}" }]
  history_milestones: [{ year: "{{YYYY}}", title: "{{...}}", text: "{{...}}" }]

brand:
  colors:                                   # take them from the logo/crest and existing site; never invent
    primary_dark: "{{#hex}}"                # e.g. navy  #292963
    accent_warm: "{{#hex}}"                 # e.g. amber #F8A724 (buttons, highlights, focus ring)
    accent_strong: "{{#hex}}"               # e.g. crimson #B72034 (kickers, small labels)
    paper: "{{#hex}}"                       # e.g. ivory #fbfaf7
  display_font: "{{e.g. Fraunces}}"         # serif for headlines
  body_font: "{{e.g. Inter}}"
  brand_font: "{{e.g. Montserrat}}"         # for the wordmark/logo lockup
  logo_files: ["public/brand/{{crest}}.png", "public/brand/{{crest}}-180.png"]

academics:
  divisions: ["{{Elementary}}", "{{Middle School}}", "{{High School}}"]
  programs: ["{{AP}}", "{{IB}}", "{{Dual diploma}}", "..."]
  accreditations: [{ name: "{{Cognia}}", logo: "{{path}}" }]
  outcomes: "{{matriculation %, AP/SAT averages, notable acceptances}}"
  university_destinations: [{ university: "{{...}}", city: "{{...}}", country: "{{...}}", lat: 0, lng: 0 }]   # optional, for the globe

admissions:
  process_steps: ["{{Inquire}}", "{{Assess}}", "{{Enroll}}"]
  faq: [{ q: "{{...}}", a: "{{...}}" }]
  tuition_public: "{{yes/no}}"              # if no, the site and the AI receptionist never quote prices

campus_life:
  signature_experiences: [{ slug: "{{innovation-hub}}", name: "{{...}}", summary: "{{...}}" }]   # 4–8 deep pages
  traditions: [{ slug: "{{math-bowl}}", name: "{{...}}", group: "{{academic|civic|family|clubs}}", when: "{{e.g. November}}" }]
  clubs_and_teams: ["{{...}}"]
  student_leadership: ["{{Student council}}", "{{NHS}}", "..."]

community:
  leadership: [{ name: "{{...}}", role: "{{Director}}", photo: "{{path}}" }]
  board: ["{{...}}"]
  parent_resources: [{ label: "{{Parent portal}}", url: "{{...}}" }]
  dining: "{{optional: provider, menu, pricing}}"

ai_receptionist:                            # optional
  enabled: true
  name: "{{e.g. Carlita}}"
  persona: "{{warm, professional; one sentence about who they are}}"
  avatar: "public/brand/{{name}}/{{name}}.jpg"

admin:
  enabled: true                             # optional staff editing portal
  hosting: "Vercel"                         # Blob storage for edits + uploads

content_status:
  real: ["{{list what has been verified with the school}}"]
  sample: ["{{list what is placeholder and must be replaced before launch}}"]
  known_conflicts: ["{{e.g. brochure says 1960, all other sources 1959 → use 1959}}"]
```

---

## Part B: Asset Checklist (gather before building)

- [ ] Logo or crest: transparent PNG (at least 512px), a 180px Apple touch icon and, if possible, an SVG.
- [ ] **20 or more real photos** of the school: campus, classrooms, labs, arts, sports, events, graduation, faculty. No stock photos. Record the source of each one (Instagram post, school archive, photographer).
- [ ] The existing website URL and any copy documents, brochures or a "suggested copy" brief.
- [ ] The accreditation logos.
- [ ] The school profile PDF (results, graduation requirements, acceptances).
- [ ] The leadership and board roster, with permission to publish names and photos.
- [ ] Contact details for each office.
- [ ] Hosting access (a Vercel project), the domain, and an `ANTHROPIC_API_KEY` if the AI receptionist is on.

---

## Part C: The Master Prompt (paste this together with Part A)

> You are a senior product designer and full-stack engineer. Build a premium, award-level, multi-page website for the school described in the **Client Brief** above. It must read as a designed flagship site, not a template: confident editorial typography, the school's real photography at full strength, restrained and physical motion, and copy that sounds like the school. The site serves prospective families first (convert them to an inquiry or tour), then current families, then alumni and job applicants.

### 1. Non-negotiables

1. **Use only real facts.** Use only facts from the brief, the school's materials, or its existing site. Never invent statistics, names, dates, prices or quotes. Where content is missing, use clearly labelled sample content and list it in the README under "Real vs. sample content".
2. **Use only real photos.** Use only the school's own photos. No stock or AI-generated images. Every photo has bilingual alt text that describes what is *actually* in the frame. Where a page has no fitting photo, use the closest real one, write alt text that describes it honestly, and list the gap in the README under "Photography gaps".
3. **Make it bilingual end to end** (if a secondary language is set). Every visible string is a `{ en, es }` pair (or the brief's language codes). A language toggle sits in the header and the choice persists in `localStorage`. `<html lang>` updates when the language changes. Dates use the matching `date-fns` locale. The two languages always appear together in data files.
4. **Keep content out of components.** All copy and data live in typed modules under `src/data/`. Components import data and never hard-code visible text.
5. **Meet accessibility standards:** WCAG 2.2 AA, semantic landmarks, one `h1` per page, a visible focus ring in the accent color, touch targets of at least 44px, keyboard access to every control, `aria-live` for changing content, and full support for `prefers-reduced-motion` (everything static, nothing hidden).
6. **Keep it fast:** static generation for every page, `next/image` with AVIF/WebP and correct `sizes`, priority only on the first hero image, fonts through `next/font` with `display: swap`, and no layout shift.
7. **Copy rules:** warm, confident and specific. Use short sentences. No em dashes. No filler ("world-class", "cutting-edge") unless a fact backs it up. Lead with outcomes and belonging.

### 2. Stack (pin exact versions)

- **Next.js 15** (App Router), **React 19**, **TypeScript strict**
- **Tailwind CSS v4** with a `@theme` token block in `src/app/globals.css`
- shadcn-style primitives on **Radix** (Dialog, Select) and **cmdk** (command palette)
- **GSAP + ScrollTrigger + @gsap/react** for scroll choreography, and **framer-motion** for UI state transitions (menus, drawers)
- **react-hook-form + zod** for forms, with one zod schema shared by client and server
- **date-fns** (with locales), **lucide-react** icons, `clsx` + `tailwind-merge` (a `cn()` helper)
- **@vercel/blob** for admin edits, uploads and inquiries, falling back to `.data/*.json` in local development
- **@anthropic-ai/sdk** for the AI receptionist, using the latest, most capable Claude model
- *(optional)* **react-globe.gl** for the university destinations globe
- Scripts: `dev`, `build`, `start`, `lint`, `typecheck`. The build must pass `tsc --noEmit` and ESLint with zero warnings.

### 3. Design system

**Tokens** (`@theme` in `globals.css`): build a 950–100 scale from `primary_dark`, a 600/700/100 scale from `accent_strong`, and a 600/500/400/100 scale from `accent_warm`, plus `paper` (ivory), `cream`, `charcoal`, `mist` (muted text) and semantic tokens (`background`, `foreground`, `primary`, `muted`, `border`, `ring` = accent_warm, `card`). Also define `--radius: 0.75rem` and a signature easing `--ease-signature: cubic-bezier(0.22, 1, 0.36, 1)`.

**Typography:**
- Display serif (`font-display`, letter-spacing -0.02em) for every h1/h2. The hero h1 is about 3rem on mobile and about 6rem on desktop, with leading 0.98 and tracking -0.03em. Section h2s are large and use `text-balance`.
- Body sans with `font-feature-settings: "ss01", "cv11"` and antialiasing.
- The brand font is used only in the logo lockup.
- Large tabular numerals for statistics (`tabular-nums`, about 7.5rem on desktop).

**Surfaces and rhythm:** sections alternate between ivory and cream, with **dark "aurora" sections** (slow-moving gradient fields in the primary color, with a "dusk" variant) for proof moments such as statistics, matriculation and the final call to action. Generous vertical spacing (`py-28 sm:py-36`), content max width of about 90rem, horizontal padding `px-5 sm:px-8 lg:px-12`. Large radii on cards (about 1.75rem).

**Buttons:** `gold` (accent fill, dark text, warm glow shadow, the main call to action), `glass` (white/15 with backdrop blur, for use over photos), `primary`, `outline`, `outlineDark` and `outlineGold`. Every button is `pressable` (scales to 0.97 on press, 120ms).

**Utilities:** `pressable`; an animated accent link underline that grows from the left on hover, focus and active; `sccs-kenburns`; `pin-pulse`; `scroll-cue`; `marquee` (48s linear loop); `tabbar-safe` (safe-area padding); a thin custom scrollbar.

**Brand marks:** redraw the crest or logo as an inline SVG component (with a monochrome variant), plus a `LogoLockup` (crest + wordmark, in light and dark variants) and an optional mascot motif SVG used as a subtle decoration.

**Photography treatment:** photos run at their own brightness. Add shade *only* where text sits: a short top band under the navigation and a radial pool of shade behind the hero copy (bottom-left). On cards, a bottom-up gradient covering 75% of the height. On hover, images scale slowly to 1.06 over 1.4s.

### 4. Motion system (`src/components/home/motion.tsx`)

Make the choreography **declarative with data attributes**, so React keeps ownership of the DOM. One `useScrollChoreography(scope)` hook reads:

| Attribute | Behavior |
|---|---|
| `data-words` (via a `<Words text>` component) | Each word rises out of its own mask (yPercent 115 → 0, 1.1s, 45ms stagger, `expo.out`). The text stays real text. |
| `data-rise` | Rises 28px and fades in. Siblings that enter together stagger by 80ms (`ScrollTrigger.batch`). |
| `data-clip` | The image opens from an inset rounded clip-path while settling from 1.18× scale. |
| `data-parallax="10"` | Drifts against the scroll by ±N%. |
| `data-count="99"` (`data-decimals`) | Counts up from 0 when it enters view. |
| `data-bars` / `data-bar-grow` | Bar charts grow from the baseline in turn. |

Rules: everything runs inside `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`. Nothing is hidden before hydration, every animation runs `once` on entry, and it is all cleaned up on unmount.

**Hero:** a full-bleed slideshow at `100svh` (at least 38rem tall). The headline words rise in, then the subline and buttons, then the controls. Slides crossfade over 1.4s and the incoming photo slowly pulls back from 1.1× to 1×. Each slide gets a timer bar that fills over 7s and then advances. A caption for the current slide sits in an `aria-live` region. As the page scrolls, the photo sinks (yPercent 14) and the copy lifts away.

### 5. Global chrome

- **Header:** transparent over the home hero, then a glass effect (blur, ivory) once the page scrolls past 32px. The five pillars have mega-menu dropdowns, each child showing a label and a one-line blurb. On the home page, the active pillar follows the section on screen. Also included: the language toggle (EN / ES pill), a search button (opens the palette), a "Book a Tour" button and a gold "Apply Now" button. On mobile, a full-screen drawer with accordion pillars, built with framer-motion.
- **Command palette:** ⌘K / Ctrl+K (cmdk). It searches every page, story, event, team member and tradition in the active language, and includes an "Ask {{AI name}}" action.
- **Footer:** the logo lockup, the tagline ("Since {{year}}"), all pillar links, contact details (tap-to-call, mailto, a maps link), social links, accreditation logos, a legal link and the copyright line.
- **Custom 404** in the brand voice, with links back to the main pillars.

### 6. Information architecture (5 pillars; Admissions is second)

| Pillar | Pages |
|---|---|
| **Discover {{Short}}** | `/discover` (the advantage: mission, vision, values, learner profile, mascot spirit, timeline) · `/discover/history` · `/discover/safety-wellness` · `/discover/campus` · `/discover/school-profile` (accreditation, results, graduation requirements, acceptances) · `/discover/leadership` · `/discover/careers` |
| **Admissions** | `/admissions`: a 3-phase stepper, an inquiry or tour form (`#inquire`) and an FAQ (`#faq`) |
| **Learning & Outcomes** | `/learning` (curriculum, standards, assessment, honor roll) · `/learning/academic-journey` (one section per division) · `/learning/{{signature-program}}` (e.g. dual diploma) · `/learning/student-support` · `/learning/university-matriculation` (map or globe plus a table) |
| **Campus Life** | `/campus-life` · `/campus-life/{{mascot}}-experience` plus one deep page per signature experience (`[slug]`) · `/campus-life/beyond-the-classroom` plus one page per tradition (`[slug]`) · `/campus-life/student-leadership` · `/news` plus one page per story (`[slug]`) |
| **Community** | `/community` (team directory, faculty spotlights, Parent Hub `#parent-hub`, parent association, dining `#dining`, alumni) · `/contact` (every office on one page) |

Also: `/legal` (privacy, terms of use, accessibility), `sitemap.ts`, `robots.ts`, and JSON-LD `EducationalOrganization` in the root layout (name, alternate name, founding date, address, phone, email, sameAs). Every page has its own `metadata` (title template `%s · {{Short}}`, an Open Graph image from a real photo, and a `summary_large_image` Twitter card).

**Inner-page kit** (`page-kit.tsx`), reused across every inner page: `Breadcrumbs`, `PageHero` (photo, kicker, title, intro), `Split` (photo and text, reversible), `IconCards` (2, 3 or 4 columns), `Tabs`, `Gallery` (with a lightbox), `Prose` and `RelatedLinks` (cards with photos, so no page is a dead end).

### 7. Home page: 13 sections in this order (every section links deeper)

1. **Hero:** the slideshow; `{{hero_title}}`, `{{tagline}}`, and the gold Apply and glass Book a Tour buttons.
2. **Statistics on an aurora background:** 4 huge count-up numbers with the suffix in the accent color, a label and a note, then "Accredited by…" with the accreditation logos.
3. **The Advantage:** a split heading and a 6-tile bento grid (one 7-column tile spanning 2 rows, then 5- and 4-column tiles). Each tile has a photo, a large figure, an accent label and one line. Below it, the learner profile in 4 columns.
4. **Safety & Wellness:** one photo and one promise, with the key safeguards.
5. **Signature program** (e.g. dual diploma): two credential cards side by side, each with a flag or icon and bullet points.
6. **Academic journey:** the divisions as a sequence (elementary → middle → high school).
7. **{{Mascot}} Experience:** feature cards for the signature facilities and programs.
8. **Traditions rail:** filter tabs (All, Clubs, Academic, Civic, Family), a horizontal scroll rail with arrow buttons and a progress bar.
9. **Matriculation (aurora "dusk" background):** an interactive globe or map of where graduates go *(optional)*.
10. **Acceptances:** a marquee of prestigious universities and acceptance "posters" (logo or seal, name, country).
11. **Life at {{Short}}:** the latest news, upcoming events (with dates in the right locale) and an Instagram grid that links to the original posts.
12. **Admissions:** the 3 steps and the inquiry call to action.
13. **Final call to action (aurora background):** one strong line and the Apply and Tour buttons.

Every section heading uses `<Words>`; body text and cards use `data-rise`. A "More" link (accent underline) sits at the top right of each section.

### 8. Content architecture

```
src/data/
  dictionary.ts     shared UI + home copy, { en, es } dictionaries with identical shape
  nav.ts            PILLARS: { id, href, homeAnchor, label: L, children: { href, label: L, blurb: L }[] }
  home.ts           HERO_SLIDES: { photo, caption: L }[]
  pages.ts          inner-page copy (history, safety, campus, leadership, careers, curriculum, support, contact, FAQ)
  experiences.ts    signature experience deep pages
  traditions.ts     traditions + groups
  content.ts        NEWS, EVENTS, TEAM, SPOTLIGHTS, INSTAGRAM_POSTS
  profile.ts        school profile, accreditations
  acceptances.ts    acceptance list + prestige marquee
  destinations.ts   globe points (optional)
  media.ts          photo library: key → { src, width, height, alt: L, source }
  page-photos.ts    named photo spots per page (e.g. home.whySchoolTile1) → media key
src/lib/
  site.ts           SITE constants (name, url, phone, email, socials, address, mapsUrl, founded)
  i18n-types.ts     type Lang; type L = { en: string; es: string }
```

`LangProvider` exposes `{ lang, t, tr(L), toggleLang, setLang, dateLocale }`. Photos are referenced by library key, so replacing one updates it everywhere.

### 9. Inquiry API

`POST /api/inquiries`: validates with the shared zod schema; limits each IP to 5 requests per 10 minutes; includes a hidden **honeypot** field (if it is filled in, return success without storing anything); returns `201` for a valid inquiry and `400` for invalid input. Each inquiry is saved to Blob (`.data/inquiries.json` in local development) and listed for staff at `/admin/inquiries`. The form uses react-hook-form, shows inline bilingual errors and a success state, and announces both. *(Optional: send an email notification through Resend or another provider.)*

### 10. Admin portal `/admin` *(optional, recommended)*

- **Sign-in:** `ADMIN_USERNAME` and `ADMIN_PASSWORD` (at least 8 characters) come from environment variables and never appear in the code. A successful sign-in sets an httpOnly, signed (HMAC-SHA256) cookie holding an expiry time; sessions last 12 hours. Comparisons are constant-time, writes must come from the same origin, and changing either credential signs everyone out.
- **Content engine:** the values in `src/data/*` are the defaults. Each editable collection is registered (`registry.ts`: id, label, target object). Edits are stored as a **small diff** (`{site}-content/overrides.json` in Blob, `.data/content.json` in local development) and merged *in place* onto the live data objects, both on the server (via `ensureContent()` in the root layout and the API routes) and in the browser before the first render. Components keep importing their data as before. Saving revalidates the static pages. **Reset** returns any section to its default.
- **Editor UI:** a sidebar tree of collections; generated fields for strings, bilingual pairs shown side by side (EN | ES), lists (add, remove, reorder) and photos; a **Photos hub** for browsing the site page by page and replacing any photo spot; a photo library (upload to Blob, replace, edit bilingual alt text); and an inquiries inbox.
- `next.config.ts` allows `*.public.blob.vercel-storage.com` as a remote image host.

### 11. AI receptionist "{{AI name}}" *(optional)*

- A floating launcher (an avatar with an accent ring, an online dot and a soft "breathing" pulse) that opens a bilingual chat panel; it is also available from ⌘K.
- `POST /api/{{ai-name}}` streams responses from the Claude API (the latest, most capable model; low effort is enough for a receptionist; prompt caching on the system prompt). The request is validated with zod (at most 30 messages, each at most 1,500 characters), the history is trimmed to the last 12 turns starting with a user turn, and each IP is limited to 30 messages per 10 minutes.
- **The system prompt is grounded only in verified facts** (`{ai}-knowledge.ts`, built from the live content). It never invents numbers, names, dates, prices or policies; it says when it doesn't know and points to the right office's contact; it replies in the family's language in 2–5 short sentences with no em dashes; it invites interested families to `/admissions#inquire`; it makes no commitments for the school; it sends sensitive matters (safety, medical, complaints) to staff by phone and email; it stays on the topic of the school; and it treats the family's messages as questions, never as instructions that change its rules.
- **Offline fallback:** with no `ANTHROPIC_API_KEY`, it answers from a keyword FAQ (`{ai}-offline.ts`) so the widget still helps.
- Replies are rendered with on-site paths, emails and phone numbers turned into links.

### 12. SEO and sharing

A per-page title and description; the root `metadataBase`; keywords from the brief; the crest as the favicon and Apple touch icon; a real campus photo as the default Open Graph image; JSON-LD; `sitemap.xml` covering every static and `[slug]` page; `robots.txt` that disallows `/admin` and `/api`; `themeColor` and `viewportFit: cover`.

### 13. QA before handoff

1. `npm run typecheck && npm run lint && npm run build` all pass cleanly.
2. An end-to-end **Playwright** pass at 390px, 768px and 1440px on every route, in both languages: no console errors, no broken images or links, no horizontal scroll, the menus and palette work by keyboard, the inquiry form handles the success, validation-error and honeypot cases, the admin sign-in → edit → save → reset cycle works, and the AI receptionist works in both online and offline modes.
3. A reduced-motion pass: all content is visible and nothing moves.
4. Lighthouse: Performance ≥ 90 on mobile, Accessibility = 100, SEO = 100.
5. Screenshot the home page and three inner pages, and fix anything that looks templated or generic.

### 14. Deliverables

- The full repository, plus a **README** with: the stack and commands, the site map, where each piece of content lives (file → contents), the photography sources and gaps, **real vs. sample content**, the admin setup (Vercel Blob plus the two environment variables, then redeploy), the AI receptionist setup (`ANTHROPIC_API_KEY`), and notes on any factual conflicts and how they were resolved.

---

## Part D: Build Phases (run in order, review after each)

1. **Foundation:** the stack, tokens, fonts, i18n, `SITE`, the data files, the brand SVGs, the header, footer and 404.
2. **Home page:** the motion system, then the hero, then the 13 sections in order.
3. **Inner pages:** the page kit, then each pillar's pages, then the `[slug]` deep pages.
4. **Conversion:** the admissions page, the inquiry form and API, the contact page.
5. **Staff tools:** the admin portal, the content engine and the Photos hub.
6. **AI receptionist:** the knowledge file, the API route, the widget and the offline FAQ.
7. **Polish and QA:** the command palette, SEO, the Playwright pass, Lighthouse and the README.

Useful follow-up prompts:
- "Run a full Playwright QA pass on every route in both languages at 390/768/1440px and fix everything you find."
- "Compare every fact on the site against the brief and list anything unverified."
- "Replace all sample content in `src/data/content.ts` with the attached real data."
- "Audit the home page for anything that looks templated; make it feel designed for {{school}}."

---

## Appendix: SCCS reference values (the original build)

| Brief field | SCCS value |
|---|---|
| Name / short / mascot | Santa Cruz Cooperative School / SCCS / Jaguars |
| Founded / grades | 1959-04-10 / PK–12 |
| Hero / tagline | "Home of the Jaguars" / "Two diplomas. One unrivaled future." |
| Stats | 99% matriculation · 65+ years · 2 diplomas · 8-acre campus |
| Colors | navy #292963 · amber #F8A724 · crimson #B72034 · ivory #fbfaf7 |
| Fonts | Fraunces (display) · Inter (body) · Montserrat (brand) |
| Languages | English / Spanish |
| AI receptionist | "Carlita" |
| Signature program | Dual diploma: U.S. High School Diploma + Bolivian Bachillerato |
| Experiences | Innovation Hub, Performing Arts Center, Jaguar Athletics, Friendship Games, Science Labs, Library |
| Traditions | Math Bowl, Knowledge Bowl, Spelling Bee, Book Fair, Family Reading Night, Santa Cruz Day, Fun Run, Grandparents' Day, Senior Welcome Dinner |
