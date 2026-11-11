import { z } from "zod";

/** Canonical experience bands. The form shows localized labels but always submits one of these. */
export const EXPERIENCE_VALUES = ["0-2 years", "3-5 years", "6-10 years", "More than 10 years"] as const;

/** Résumé limits. Vercel functions accept request bodies up to 4.5 MB, so the file stays under 4 MB. */
export const RESUME_MAX_BYTES = 4 * 1024 * 1024;
export const RESUME_ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const optionalTrimmed = (schema: z.ZodString) =>
  z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .pipe(schema.optional());

/** The text fields of a job application. The résumé file is checked separately (client and server). */
export const applicationSchema = z.object({
  position: z.string().trim().min(2).max(160),
  positionSlug: optionalTrimmed(z.string().max(80)).optional(),
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  phone: optionalTrimmed(z.string().min(7).max(25)).optional(),
  location: optionalTrimmed(z.string().max(120)).optional(),
  experience: z.enum(EXPERIENCE_VALUES),
  link: optionalTrimmed(z.string().url().max(300)).optional(),
  letter: z.string().trim().min(30).max(5000),
  consent: z.literal(true),
  website: z.string().optional(),
});

export type ApplicationInput = z.input<typeof applicationSchema>;

/** The first bytes of the file decide its type, not its name: PDF, legacy Word (OLE) or DOCX (zip). */
export function resumeKind(bytes: Uint8Array): "pdf" | "doc" | "docx" | null {
  const starts = (sig: number[]) => sig.every((b, i) => bytes[i] === b);
  if (starts([0x25, 0x50, 0x44, 0x46])) return "pdf";
  if (starts([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1])) return "doc";
  if (starts([0x50, 0x4b, 0x03, 0x04])) return "docx";
  return null;
}
