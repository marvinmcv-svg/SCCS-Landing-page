import type { Metadata } from "next";
import { SafetyPage } from "@/components/pages/discover-pages";

export const metadata: Metadata = {
  title: "Safety & Wellness",
  description: "Child protection, restorative practices, CASEL social-emotional learning, and an on-campus medical center.",
};

export default function Page() {
  return <SafetyPage />;
}
