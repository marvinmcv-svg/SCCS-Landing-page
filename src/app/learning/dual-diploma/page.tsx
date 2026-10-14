import type { Metadata } from "next";
import { DualDiplomaPage } from "@/components/pages/learning-pages";

export const metadata: Metadata = {
  title: "The Dual-Diploma Advantage",
  description: "The U.S. High School Diploma and the Bolivian Bachillerato en Humanidades, one program, two credentials.",
};

export default function Page() {
  return <DualDiplomaPage />;
}
