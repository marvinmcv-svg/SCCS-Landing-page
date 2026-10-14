import type { L } from "@/lib/i18n-types";
import { media, type Photo } from "./media";

/** Home-page hero slideshow. Editable from the admin portal. */
export const HERO_SLIDES: { photo: Photo; caption: L }[] = [
  { photo: media.campusGardens, caption: { en: "Our campus", es: "Nuestro campus" } },
  { photo: media.graduationPac, caption: { en: "Commencement in the PAC", es: "Graduación en el PAC" } },
  { photo: media.fgPepRally, caption: { en: "Friendship Games", es: "Friendship Games" } },
];
