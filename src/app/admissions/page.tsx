import type { Metadata } from "next";
import { AdmissionsPage } from "@/components/pages/other-pages";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Three phases to the Jaguar family: application, evaluation, and induction. Inquire and book a campus tour.",
};

export default function Page() {
  return <AdmissionsPage />;
}
