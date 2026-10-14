import type { Metadata } from "next";
import { CampusLifeHub } from "@/components/pages/other-pages";

export const metadata: Metadata = {
  title: "Campus Life",
  description: "The Jaguar Experience, traditions, events, and news from Santa Cruz Cooperative School.",
};

export default function Page() {
  return <CampusLifeHub />;
}
