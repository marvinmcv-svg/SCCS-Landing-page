import { notFound } from "next/navigation";
import { AdminLogin } from "@/components/admin/login";
import { AdminShell } from "@/components/admin/shell";
import { CollectionEditor } from "@/components/admin/editor";
import type { Library } from "@/components/admin/photos";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { collectionMetas } from "@/lib/admin-data";
import { currentOf } from "@/lib/content/engine";
import { readContentFresh, storageStatus } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function AdminCollection({ params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdmin())) return <AdminLogin configured={adminConfigured()} />;
  const { id } = await params;
  const metas = collectionMetas();
  const meta = metas.find((m) => m.id === id);
  if (!meta) notFound();
  const doc = await readContentFresh();
  return (
    <AdminShell collections={metas} storage={storageStatus()}>
      <CollectionEditor key={id} meta={meta} initial={currentOf(id, doc)} library={currentOf("media", doc) as unknown as Library} />
    </AdminShell>
  );
}
