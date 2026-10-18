import type { L } from "@/lib/i18n-types";
import { media, type Photo } from "./media";

/** Home-page hero slideshow. Editable from the admin portal. */
export const HERO_SLIDES: { photo: Photo; caption: L }[] = [
  { photo: media.campusGardens, caption: { en: "Our campus", es: "Nuestro campus" } },
  { photo: media.dCampusTower, caption: { en: "Home of the Jaguars", es: "El hogar de los Jaguars" } },
  { photo: media.dSoccerAction, caption: { en: "Jaguar athletics", es: "Deportes Jaguar" } },
  { photo: media.dVexWorldsTeam, caption: { en: "VEX Robotics World Championship", es: "Campeonato Mundial de Robótica VEX" } },
  { photo: media.dScienceCircuits, caption: { en: "Hands-on science", es: "Ciencia práctica" } },
  { photo: media.dCheerSquad, caption: { en: "Friendship Games spirit", es: "Espíritu de los Friendship Games" } },
  { photo: media.dFgFolkDance, caption: { en: "Friendship Games opening night", es: "Noche de apertura de los Friendship Games" } },
];
