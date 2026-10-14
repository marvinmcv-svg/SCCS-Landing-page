import type { Metadata } from "next";
import { CampusPage } from "@/components/pages/discover-pages";

export const metadata: Metadata = {
  title: "Campus & Facilities",
  description: "An 8-acre campus in Barrio Las Palmas: Innovation Hub, Performing Arts Center, four science labs, and athletic fields.",
};

export default function Page() {
  return <CampusPage />;
}
