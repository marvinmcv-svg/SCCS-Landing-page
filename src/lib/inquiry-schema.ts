import { z } from "zod";

/** Canonical grade values (EN). The form shows localized labels but always submits one of these. */
export const GRADE_VALUES = [
  "Pre-Kindergarten (PK)",
  "Kindergarten",
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
  "International transfer",
] as const;

const optionalTrimmed = (schema: z.ZodString) =>
  z
    .string()
    .trim()
    .transform((v) => (v === "" ? undefined : v))
    .pipe(schema.optional());

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email(),
  phone: optionalTrimmed(z.string().min(7).max(20)).optional(),
  grade: z.enum(GRADE_VALUES),
  tourDate: optionalTrimmed(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).optional(),
  message: optionalTrimmed(z.string().max(1000)).optional(),
  website: z.string().optional(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
