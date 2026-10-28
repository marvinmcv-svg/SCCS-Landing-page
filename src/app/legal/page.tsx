import type { Metadata } from "next";
import { LegalPage } from "@/components/pages/legal-page";

export const metadata: Metadata = {
  title: "Privacy, Terms & Accessibility",
  description: "How the SCCS website handles the information families send, the terms for using it, and our accessibility commitment.",
};

export default function Page() {
  return <LegalPage />;
}
