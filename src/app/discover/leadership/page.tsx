import type { Metadata } from "next";
import { LeadershipPage } from "@/components/pages/discover-pages";

export const metadata: Metadata = {
  title: "Leadership & Governance",
  description: "The Director, principals, and Board of Directors who steward the SCCS mission.",
};

export default function Page() {
  return <LeadershipPage />;
}
