import type { Metadata } from "next";
import { NewsIndex } from "@/components/pages/other-pages";

export const metadata: Metadata = {
  title: "Jaguar News",
  description: "Stories from the pride, academics, arts, athletics, and community at SCCS.",
};

export default function Page() {
  return <NewsIndex />;
}
