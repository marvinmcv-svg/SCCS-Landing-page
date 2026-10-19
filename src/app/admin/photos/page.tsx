import { AdminLogin } from "@/components/admin/login";
import { AdminShell } from "@/components/admin/shell";
import { PhotoHub } from "@/components/admin/photo-hub";
import type { Library } from "@/components/admin/photos";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { collectionMetas } from "@/lib/admin-data";
import { currentOf } from "@/lib/content/engine";
import { siteSpots } from "@/lib/content/photo-spots";
import { readContentFresh, storageStatus } from "@/lib/content/store";

export const dynamic = "force-dynamic";

export default async function AdminPhotos() {
  if (!(await isAdmin())) return <AdminLogin configured={adminConfigured()} />;
  const doc = await readContentFresh();
  return (
    <AdminShell collections={collectionMetas()} storage={storageStatus()}>
      <PhotoHub spots={siteSpots(doc)} library={currentOf("media", doc) as unknown as Library} />
    </AdminShell>
  );
}
