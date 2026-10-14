import type { MetadataRoute } from "next";
import { PILLARS } from "@/data/nav";
import { EXPERIENCES } from "@/data/experiences";
import { TRADITIONS } from "@/data/traditions";
import { NEWS } from "@/data/sccs-content";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>(["/", "/news", "/contact", "/campus-life/student-leadership"]);
  for (const p of PILLARS) {
    paths.add(p.href);
    for (const c of p.children) paths.add(c.href.split("#")[0]);
  }
  for (const e of EXPERIENCES) paths.add(`/campus-life/jaguar-experience/${e.slug}`);
  for (const t of TRADITIONS) paths.add(`/campus-life/beyond-the-classroom/${t.slug}`);
  for (const n of NEWS) paths.add(`/news/${n.slug}`);
  return [...paths].map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: "weekly", priority: p === "/" ? 1 : 0.7 }));
}
