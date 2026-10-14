import type { Metadata } from "next";
import { SchoolProfilePage } from "@/components/pages/profile-page";

export const metadata: Metadata = {
  title: "School Profile 2025–26",
  description:
    "SCCS High School Profile 2025–26: CEEB 905500, Cognia accreditation, AP and SAT results, dual-diploma graduation requirements, grade scale, and university acceptances.",
};

export default function Page() {
  return <SchoolProfilePage />;
}
