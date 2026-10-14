"use client";

import { Hero } from "./hero";
import { StatBand } from "./stats";
import { Founding } from "./founding";
import { CrestSplit } from "./crest-split";
import { HomeValues } from "./discover";
import { Journey } from "./journey";
import { Matriculation } from "./matriculation";
import { ExperienceRail, CampusLifeMore } from "./campus-life";
import { Admissions } from "./admissions";
import { InstagramGrid } from "./instagram-grid";
import { Community } from "./community";
import { FinalCta } from "./final-cta";

/**
 * Home, scored with scroll-craft (see scrollcraft/builds/sccs-home/BRIEF.md):
 * belonging → confidence → intimacy → PEAK (crest split) → reassurance →
 * clarity → ambition → delight → trust → resolve.
 */
export function SccsHome() {
  return (
    <>
      <Hero />
      <StatBand />
      <Founding />
      <CrestSplit />
      <HomeValues />
      <Journey />
      <Matriculation />
      <ExperienceRail />
      <CampusLifeMore />
      <Admissions />
      <InstagramGrid />
      <Community />
      <FinalCta />
    </>
  );
}
