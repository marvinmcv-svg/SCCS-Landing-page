import type { Metadata } from "next";
import { SupportPage } from "@/components/pages/learning-pages";

export const metadata: Metadata = {
  title: "Student Support & Counseling",
  description: "The Student Success Team, MTSS, and counseling from Elementary through college counseling.",
};

export default function Page() {
  return <SupportPage />;
}
