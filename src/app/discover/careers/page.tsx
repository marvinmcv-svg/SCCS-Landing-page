import type { Metadata } from "next";
import { CareersPage } from "@/components/pages/discover-pages";

export const metadata: Metadata = {
  title: "Work at SCCS",
  description: "Teach where it matters, careers at Santa Cruz Cooperative School.",
};

export default function Page() {
  return <CareersPage />;
}
