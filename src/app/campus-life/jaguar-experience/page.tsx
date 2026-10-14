import type { Metadata } from "next";
import { JaguarExperienceHub } from "@/components/pages/experience-page";

export const metadata: Metadata = {
  title: "The Jaguar Experience",
  description: "Innovation Hub, Performing Arts Center, Jaguar Athletics, Friendship Games, science labs, and the Library Media Center.",
};

export default function Page() {
  return <JaguarExperienceHub />;
}
