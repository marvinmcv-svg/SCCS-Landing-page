import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyPage } from "@/components/pages/apply-page";

export const metadata: Metadata = {
  title: "Apply to SCCS",
  description: "Apply online for open teaching and leadership positions at Santa Cruz Cooperative School.",
};

export default function Page() {
  return (
    <Suspense>
      <ApplyPage />
    </Suspense>
  );
}
