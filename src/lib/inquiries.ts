import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import { blobConfigured } from "@/lib/content/store";

export type StoredInquiry = { id: string; receivedAt: string; name: string; email: string; phone?: string; grade: string; tourDate?: string; message?: string };

/**
 * Where admissions inquiries live. On Vercel: one JSON file per inquiry in the
 * same Blob store as the admin edits, under a random, unlisted URL. In local
 * development without a Blob store: `.data/inquiries.json` in the project.
 */
const PREFIX = "sccs-inquiries/";
const LOCAL_FILE = path.join(process.cwd(), ".data", "inquiries.json");
const canUseLocalFiles = () => !blobConfigured() && process.env.VERCEL !== "1";

async function readLocal(): Promise<StoredInquiry[]> {
  try {
    return JSON.parse(await fs.readFile(LOCAL_FILE, "utf8")) as StoredInquiry[];
  } catch {
    return [];
  }
}

/** Saves one inquiry. Throws when storage is configured but the write fails, so the family sees an error instead of a false "thank you". */
export async function saveInquiry(inquiry: StoredInquiry) {
  if (blobConfigured()) {
    await put(`${PREFIX}${inquiry.receivedAt.replace(/[:.]/g, "-")}-${inquiry.id}.json`, JSON.stringify(inquiry), {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: true,
    });
    return;
  }
  if (canUseLocalFiles()) {
    const all = await readLocal();
    all.push(inquiry);
    await fs.mkdir(path.dirname(LOCAL_FILE), { recursive: true });
    await fs.writeFile(LOCAL_FILE, JSON.stringify(all, null, 2));
    return;
  }
  // No storage connected yet: keep the inquiry in the deployment's runtime logs so it is not lost.
  console.warn("[inquiry] storage not configured; inquiry follows", JSON.stringify(inquiry));
}

/** The most recent inquiries, newest first (for the admin). */
export async function listInquiries(limit = 200): Promise<StoredInquiry[]> {
  if (blobConfigured()) {
    const blobs = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix: PREFIX, cursor, limit: 1000 });
      blobs.push(...page.blobs);
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    blobs.sort((a, b) => b.pathname.localeCompare(a.pathname));
    const rows = await Promise.all(
      blobs.slice(0, limit).map(async (b) => {
        try {
          const res = await fetch(b.url, { cache: "no-store" });
          return res.ok ? ((await res.json()) as StoredInquiry) : null;
        } catch {
          return null;
        }
      }),
    );
    return rows.filter((r): r is StoredInquiry => r !== null);
  }
  if (canUseLocalFiles()) return (await readLocal()).sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)).slice(0, limit);
  return [];
}
