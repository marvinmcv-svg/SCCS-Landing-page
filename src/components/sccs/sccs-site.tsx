"use client";

import { Hero } from "./hero";
import { StatBand } from "./stats";
import { Discover } from "./discover";
import { DualDiploma } from "./dual-diploma";
import { Journey } from "./journey";
import { Matriculation } from "./matriculation";
import { Admissions } from "./admissions";
import { CampusLife } from "./campus-life";
import { InstagramGrid } from "./instagram-grid";
import { Community } from "./community";
import { FinalCta } from "./final-cta";

export function SccsHome() {
  return (
    <>
      <Hero />
      <StatBand />
      <Discover />
      <DualDiploma />
      <Journey />
      <Matriculation />
      <Admissions />
      <CampusLife />
      <InstagramGrid />
      <Community />
      <FinalCta />
    </>
  );
}
