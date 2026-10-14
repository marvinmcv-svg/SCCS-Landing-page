import type { Metadata } from "next";
import { MatriculationPage } from "@/components/pages/learning-pages";

export const metadata: Metadata = {
  title: "University Matriculation",
  description: "An interactive map of where SCCS graduates study, across the Americas, Europe, and beyond.",
};

export default function Page() {
  return <MatriculationPage />;
}
