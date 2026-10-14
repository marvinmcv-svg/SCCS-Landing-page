import type { Metadata } from "next";
import { CurriculumPage } from "@/components/pages/learning-pages";

export const metadata: Metadata = {
  title: "Our Curriculum",
  description: "Common Core, NGSS, and Advanced Placement — standards, methodology, and assessment at SCCS.",
};

export default function Page() {
  return <CurriculumPage />;
}
