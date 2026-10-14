# SCCS home page: scroll-craft brief

**Self-authored under explicit creative delegation.** The owner asked to "take design and animation to the next level" using scroll-craft, after supplying the brand (sccs.edu.bo), the copy brief, and the Instagram account. Evidence vs. assumption is marked below.

## The eight topics

1. **Vibe (authored):** proud, warm, bilingual, rigorous, sunlit. References: a commencement program, a well-loved yearbook, the Santa Cruz afternoon light on red-tile roofs.
2. **Journey (evidence: copy brief + navigation audit):** who we are → proof → the differentiator (two diplomas) → the path (ES/MS/HS) → where graduates go → life as a Jaguar → how to join → community → apply.
3. **Energy curve (authored):** calm open, quiet founding story, the loudest moment at the Dual Diploma, a lift at the world map, playful lateral travel through campus life, calm administrative middle, a held resolved close.
4. **Feeling + the one moment:** see curve and peak below.
5. **The thing no other school site does (authored, seeded by the brand itself):** the crest *is* the argument. SCCS's real crest holds a U.S. flag and a Bolivian flag side by side. On this site the crest opens into those two diplomas and closes back into one shield.
6. **Range:** editorial-premium with a heritage serif display (the school is 65+ years old, its proof is a document: a transcript, a diploma). Not premium-minimal dark.
7. **One world or scenes:** distinct scenes. A school is many places (gardens, PAC, gym, labs), not one camera flight.
8. **Assets (evidence):** 87 real photos from sccs.edu.bo and @sccsjaguars; the official crest. No generated assets and no spend.

## Grammar

**Filmic one-shot** for the narrative top of the home page, with the administrative sections compressed into flow (feel.md §5). Why the other seven lost:

- *Chaptered editorial* bans the photographic hero, and belonging is carried by real photos of real students.
- *Live surface* needs a product to operate; a school is not one.
- *Continuous world* needs real geography travelled in one camera move; no footage exists.
- *Typographic poster* would discard the school's best asset, its photography.
- *Gallery/catalog* fits Campus Life only (borrowed there as a pan rail), not the whole argument.
- *Split stage* is the right shape for exactly one beat, the Dual Diploma, and it lives inside the peak act rather than governing the whole page, which also carries admissions, events and a team directory.
- *Rhythmic cutlist* is energy-brand pacing; parents choosing a school need held moments.

## Feeling curve

| Act | Feeling | What causes it |
|---|---|---|
| 1 Hero | Belonging | Layered campus scene: gardens far, graduation and Friendship Games plates nearer, the crest in front; planes part as you scroll |
| 2 Proof | Confidence | Four real numbers land in a quiet band |
| 3 Founding | Intimacy | Pinned: "Twenty-six students. One house." Lines arrive over a then-and-now photo |
| 4 **Peak** | Pride / wonder | The crest splits: U.S. half travels left, Bolivian half right, each carrying its diploma; then they close into one shield and "One Unrivaled Future" |
| 4b Values | Reassurance | Mission, Learner Profile and Safety & Wellness in calm flow: the exhale after the peak |
| 5 Path | Clarity | Three chapters, each photo wiped in |
| 6 World | Ambition | Dark map, gold pins spring in across five continents |
| 7 Campus life | Delight | Vertical scroll becomes sideways travel through the Jaguar Experience |
| 8 Admissions → Community | Trust | Compressed flow: steps, form, people |
| 9 Close | Resolve | The crest returns whole, one line, one action, held |

## The peak

> "The school's crest literally split in two, one side the American diploma, the other the Bolivian one, and then it snapped back together into one shield."

Lives in act 4. It gets the largest span on the page (≈3.2 viewport-heights), the quiet founding act before it, and the brand's own crest as its asset.

## Tell-someone sentence

**It's the site where the school's crest opens up into its two diplomas and closes back into one.**

## Signature move

Crest split: the real SCCS shield, rebuilt in vector, separates along its centre line as you scroll. Each half carries one flag and becomes a full credential panel with its requirements; at the end of the act the halves travel back and re-seal into the shield. It recurs once, quietly, in the close (the whole crest held).

## Authored silence

The tail of act 3 (founding) holds on the then-and-now photograph with a single line, so the crest arrives into stillness.

## Score

| Beat | Device | Why |
|---|---|---|
| Hero | `parallax` (layered planes + pointer) | Depth from real photography; the first screen must already be complete |
| Proof | `count` (flow) | Real figures the school publishes |
| Founding | `pin` + `kinetic` lines | An argument told in lines, held still |
| **Peak** | bespoke `crest-split` (pin) | The signature move |
| Path | `reveal` (clip-path wipe) | Each division is a change of state |
| World | `flow` + spring pins | Breathing room after the peak |
| Campus life | `pan` | Lateral reads as range |
| Admissions → community | `flow` + `in` | Administrative content, compressed |
| Close | `pin`-free resolved hold | The page arrives and stops |

Five device families. No family twice in a row. No scrub (no footage).

## Rules applied across the build

No visible em dashes; no scroll cue; no `01/02` counters; at most one eyebrow per three sections on the home page; hero text limited to headline, one line of subtext, and the CTA pair; two font families (Fraunces display, Montserrat text, the brand's face); transforms and opacity only; everything degrades to a complete static page under reduced motion.

## Feel check (after build)

Walked at 1440×900, 390×844 and with reduced motion.

- **Curve vs. build:** one change. Mission, values and Safety & Wellness moved from before the peak to directly after it (act 4b). The founding act already gives the peak its quiet run-up, and a calm administrative beat after the loudest moment reads as an exhale instead of a stall. The curve table above includes it.
- **Peak:** it holds. The crest opens, both credentials are readable while it is open, and the seal ring flashes as the halves meet.
- **Phones:** the open crest used to collide with the credential panels. Now it shrinks to half size and rises into the space the heading gives up.
- **Founding:** the first line is already on stage when the act pins, so there is no empty frame. The last line stays as the act releases, so the hand-off to the crest is never blank.
- **Pan rail:** travel is measured from the rail itself (2300px at 1440, 2208px at 390), so the section height matches the travel and no scroll is wasted.
- **Reduced motion:** every act becomes a static section with the same copy and links.
