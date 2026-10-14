"use client";

import { applyContent, type OverrideDoc } from "@/lib/content/engine";

/**
 * Applies the admin's saved edits to the site's data before anything below it
 * renders (during server rendering and again in the browser). Idempotent: a doc
 * with the same version is applied once.
 */
export function ContentProvider({ doc, children }: { doc: OverrideDoc; children: React.ReactNode }) {
  applyContent(doc);
  return children;
}
