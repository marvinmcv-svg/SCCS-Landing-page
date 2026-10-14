/**
 * Carlita's knowledge base. Built only from verified school facts: the copy brief,
 * sccs.edu.bo, and the real Instagram posts. Sample content (team roster, event
 * dates, matriculation table) is deliberately excluded so Carlita never states
 * placeholder data as fact.
 *
 * The string is deterministic so the prompt cache stays warm across requests.
 */
import { ADMISSIONS_FAQ, CAMPUS, CURRICULUM, DUAL_DIPLOMA, HISTORY, LEADERSHIP, LEADERSHIP_HONORS, SAFETY, SUPPORT } from "@/data/pages";
import { EXPERIENCES } from "@/data/experiences";
import { TRADITIONS } from "@/data/traditions";
import { dictionaries } from "@/data/dictionary";

const en = dictionaries.en;
const bullet = (lines: string[]) => lines.map((l) => `- ${l}`).join("\n");

export const CARLITA_KNOWLEDGE = `
# Santa Cruz Cooperative School (SCCS): verified facts

## Identity
- Private, coeducational PK-12 American international school in Santa Cruz de la Sierra, Bolivia. Mascot: the Jaguar. Alumni motto: "Once a Jaguar, always a Jaguar."
- Founded April 10, 1959 with 26 students; became the Santa Cruz Cooperative School on May 14, 1973.
- Instruction in English from PK to Grade 12; Spanish taught to Bolivian Ministry of Education standards.
- Accreditation: Cognia, and the Bolivian Ministry of Education. Member of AAIE and AMISA.
- Student body: about 85% Bolivian and 15% international/U.S. citizens, with many dual-national learners.
- Divisions: Elementary (PK-5), Middle School (6-8), High School (9-12).
- The school reports 99% university matriculation.

## Contact
- Address: Calle Barcelona #1, Barrio Las Palmas, Santa Cruz de la Sierra, Bolivia.
- Phone: +591 3 3530808. Email: contactus@sccs.edu.bo. Careers: jobs@sccs.edu.bo.
- Reception hours: Monday to Friday, 7:30 AM to 4:00 PM.
- Admissions Director: Sofía Antelo.
- Instagram: @sccsjaguars. Facebook: facebook.com/sccsjaguars.
- Website pages: Admissions and inquiry form at /admissions#inquire, contact directory at /contact.

## Admissions
${en.admissions.steps.map((s) => `### ${s.phase}: ${s.title}\n${s.body}`).join("\n")}
- Campus tours run Monday to Friday during school hours; request one with the inquiry form at /admissions#inquire. The Admissions Director replies within one school day.
${ADMISSIONS_FAQ.map((f) => `Q: ${f.q.en}\nA: ${f.a.en}`).join("\n")}
- Tuition amounts are not published on the website. For tuition and fees, direct families to the Admissions Office (contactus@sccs.edu.bo, +591 3 3530808).

## Dual Diploma
${en.dualDiploma.body}
- U.S. High School Diploma: ${en.dualDiploma.usPoints.join("; ")}.
- Bolivian Bachillerato en Humanidades: ${en.dualDiploma.boPoints.join("; ")}.
- ${DUAL_DIPLOMA.multiTrackBody.en}
- ${DUAL_DIPLOMA.transferBody.en}

## Curriculum and assessment
${CURRICULUM.lede.en}
${bullet(CURRICULUM.standards.map((s) => `${s.title.en}: ${s.text.en}`))}
- ${CURRICULUM.edgeBody.en}
${bullet(CURRICULUM.assessment.map((a) => `${a.label.en}: ${a.body.en}`))}
- Honor Roll (Grades 6-12, each semester): ${CURRICULUM.honors.map((h) => `${h.title.en} (${h.text.en})`).join("; ")}. ${CURRICULUM.honorsNote.en}

## Divisions
${en.journey.tabs.map((t) => `### ${t.label} (${t.grades})\n${t.body}\nSignature programs: ${t.highlights.join(", ")}.`).join("\n")}

## Student support and counseling
${SUPPORT.sstBody.en}
${bullet(SUPPORT.sst.map((s) => `${s.title.en}: ${s.text.en}`))}
${SUPPORT.counseling.map((c) => `### ${c.label.en} counseling\n${c.body.en}\n${bullet(c.points.map((p) => p.en))}`).join("\n")}

## Safety and wellness
${SAFETY.lede.en}
${SAFETY.tabs.map((t) => t.body.map((b) => b.en).join(" ")).join("\n")}
${bullet(SAFETY.promise.map((p) => `${p.title.en}: ${p.text.en}`))}
- ${SAFETY.medicalBody.en}

## Campus and facilities
${CAMPUS.lede.en}
${bullet(CAMPUS.facilities.map((f) => `${f.title.en}: ${f.text.en}`))}
${EXPERIENCES.map((e) => `### ${e.title.en}\n${e.lede.en}`).join("\n")}

## Student life and traditions
${bullet(TRADITIONS.map((t) => `${t.title.en}: ${t.body[0].en}`))}
- Student leadership: ${LEADERSHIP_HONORS.stuco.ms.en} ${LEADERSHIP_HONORS.stuco.hs.en}
${bullet(LEADERSHIP_HONORS.societies.map((s) => `${s.title.en}: ${s.body.en} ${s.points.map((p) => p.en).join("; ")}.`))}

## Community and dining
- ${en.community.mothersBody}
- La Palette Catering Français: ${en.community.paletteBody} Daily prices: Kinder Bs. 22, Primary Bs. 25, Secondary Bs. 32. 10% benefit for payment in the first two weeks of each term. Catering phone: +591 75311615.
- Family portals: Skyward (grades and reporting), Google Classroom, Seesaw, Turnitin, BrainPOP, EBSCO.

## History
${HISTORY.chapters.map((c) => `- ${c.year}: ${c.body.en}`).join("\n")}

## Governance
${LEADERSHIP.lede.en}
- Board of Directors: ${LEADERSHIP.board.map((b) => `${b.name} (${b.role.en})`).join(", ")}.
`.trim();
