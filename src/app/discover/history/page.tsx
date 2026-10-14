import type { Metadata } from "next";
import { HistoryPage } from "@/components/pages/discover-pages";

export const metadata: Metadata = {
  title: "Our History",
  description: "From 26 students in a Santa Cruz house in 1959 to six decades of Jaguars.",
};

export default function Page() {
  return <HistoryPage />;
}
