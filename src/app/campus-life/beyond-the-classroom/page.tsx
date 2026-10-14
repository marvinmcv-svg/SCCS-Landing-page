import type { Metadata } from "next";
import { BeyondHub } from "@/components/pages/tradition-pages";

export const metadata: Metadata = {
  title: "Beyond the Classroom",
  description: "Math Bowl, Knowledge Bowl, Spelling Bee, Book Fair, Family Reading Night, Santa Cruz Day, Fun Run, Grandparents' Day, and the Senior Welcome Dinner.",
};

export default function Page() {
  return <BeyondHub />;
}
