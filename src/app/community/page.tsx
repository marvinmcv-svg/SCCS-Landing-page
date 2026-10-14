import type { Metadata } from "next";
import { CommunityPage } from "@/components/pages/other-pages";

export const metadata: Metadata = {
  title: "Community",
  description: "Our team, the Parent Hub, the Mother's Club, La Palette dining, and the Jaguar alumni bond.",
};

export default function Page() {
  return <CommunityPage />;
}
