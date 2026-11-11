import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import { blobConfigured } from "@/lib/content/store";

export type StoredApplication = {
  id: string;
  receivedAt: string;
  position: string;
  positionSlug?: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  experience: string;
  link?: string;
  letter: string;
  resume: { name: string; size: number; kind: string; url?: string; localPath?: string };
};

/**
 * Where job applications live. On Vercel: one JSON file per application plus the
 * résumé, in the same Blob store as the admissions inquiries, under random, unlisted
 * URLs. In local development without a Blob store: `.data/applications/`.
 */
const PREFIX = "sccs-applications/";
const LOCAL_DIR = path.join(process.cwd(), ".data", "applications");
const LOCAL_FILE = path.join(LOCAL_DIR, "applications.json");
const canUseLocalFiles = () => !blobConfigured() && process.env.VERCEL !== "1";

export const applicationStorageReady = () => blobConfigured() || canUseLocalFiles();

const CONTENT_TYPES: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

async function readLocal(): Promise<StoredApplication[]> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf8")) as StoredApplication[];
  } catch {
    return [];
  }
}

/** Saves the résumé, then the application. Throws when a write fails, so the applicant sees an error instead of a false "thank you". */
export async function saveApplication(app: Omit<StoredApplication, "resume">, resume: { name: string; kind: string; bytes: Uint8Array }) {
  const stamp = app.receivedAt.replace(/[:.]/g, "-");
  const safeName = resume.name.replace(/[^\w.-]+/g, "_").slice(-80) || `resume.${resume.kind}`;
  const meta = { name: resume.name, size: resume.bytes.byteLength, kind: resume.kind };

  if (blobConfigured()) {
    const file = await put(`${PREFIX}resumes/${stamp}-${safeName}`, Buffer.from(resume.bytes), {
      access: "public",
      contentType: CONTENT_TYPES[resume.kind],
      addRandomSuffix: true,
    });
    const record: StoredApplication = { ...app, resume: { ...meta, url: file.url } };
    await put(`${PREFIX}${stamp}-${app.id}.json`, JSON.stringify(record), { access: "public", contentType: "application/json", addRandomSuffix: true });
    return;
  }
  if (!canUseLocalFiles()) throw new Error("STORAGE_NOT_CONFIGURED");
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  const localPath = path.join(LOCAL_DIR, `${stamp}-${app.id}-${safeName}`);
  await fs.writeFile(localPath, resume.bytes);
  const all = await readLocal();
  all.push({ ...app, resume: { ...meta, localPath: path.relative(process.cwd(), localPath) } });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(all, null, 2));
}

/** The most recent applications, newest first (for the admin). */
export async function listApplications(limit = 300): Promise<StoredApplication[]> {
  if (blobConfigured()) {
    const blobs = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      blobs.push(...page.blobs.filter((b) => b.pathname.endsWith(".json") && !b.pathname.startsWith(`${PREFIX}resumes/`)));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    blobs.sort((a, b) => b.pathname.localeCompare(a.pathname));
    const rows = await Promise.all(
      blobs.slice(0, limit).map(async (b) => {
        try {
          const res = await fetch(b.url, { cache: "no-store" });
          return res.ok ? ((await res.json()) as StoredApplication) : null;
        } catch {
          return null;
        }
      }),
    );
    return rows.filter((r): r is StoredApplication => r !== null);
  }
  if (canUseLocalFiles()) return (await readLocal()).sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)).slice(0, limit);
  return [];
}
