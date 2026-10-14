"use client";

import { HomeHero } from "../home/hero";
import {
  AcceptancesHome,
  AdmissionsHome,
  Advantage,
  DualDiplomaHome,
  ExperienceHome,
  FinalCtaHome,
  JourneyHome,
  LifeHome,
  MatriculationHome,
  Safety,
  Stats,
  TraditionsMarquee,
} from "../home/sections";

export function SccsHome() {
  return (
    <>
      <HomeHero />
      <Stats />
      <Advantage />
      <Safety />
      <DualDiplomaHome />
      <JourneyHome />
      <ExperienceHome />
      <TraditionsMarquee />
      <MatriculationHome />
      <AcceptancesHome />
      <LifeHome />
      <AdmissionsHome />
      <FinalCtaHome />
    </>
  );
}
