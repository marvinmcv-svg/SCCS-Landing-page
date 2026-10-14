import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/other-pages";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Admissions, academics, and administration contacts, plus directions to our campus in Barrio Las Palmas.",
};

export default function Page() {
  return <ContactPage />;
}
