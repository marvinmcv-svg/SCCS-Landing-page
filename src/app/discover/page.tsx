import type { Metadata } from "next";
import { AdvantagePage } from "@/components/pages/discover-pages";

export const metadata: Metadata = {
  title: "The SCCS Advantage",
  description: "Mission, vision, values, and the SCCS Learner Profile, six decades of the gold standard of American education in Bolivia.",
};

export default function Page() {
  return <AdvantagePage />;
}
