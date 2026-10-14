import type { Metadata } from "next";
import { AcademicJourneyPage } from "@/components/pages/learning-pages";

export const metadata: Metadata = {
  title: "Academic Journey",
  description: "Elementary, Middle, and High School at SCCS — one coherent American curriculum, PK–12.",
};

export default function Page() {
  return <AcademicJourneyPage />;
}
