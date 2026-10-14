import "server-only";
import { COLLECTIONS } from "./content/registry";
import type { CollectionMeta } from "@/components/admin/editor";

/** Collection descriptions without their live data, safe to send to the browser. */
export const collectionMetas = (): CollectionMeta[] =>
  COLLECTIONS.map(({ id, label, group, description, href, bilingualPair, enums, itemTitle }) => ({ id, label, group, description, href, bilingualPair, enums, itemTitle }));
