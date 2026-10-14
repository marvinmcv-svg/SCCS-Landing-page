import type { Metadata } from "next";
import { StudentLeadershipPage } from "@/components/pages/other-pages";

export const metadata: Metadata = {
  title: "Leadership & Honors",
  description: "Student Council, NHS and NJHS, the Honor Roll, and service beyond our walls.",
};

export default function Page() {
  return <StudentLeadershipPage />;
}
