import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/sccs/i18n";
import { SiteChrome } from "@/components/sccs/site-chrome";
import { ContentProvider } from "@/components/sccs/content-provider";
import { ensureContent } from "@/lib/content/store";
import { SITE } from "@/lib/site";

const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-brand", weight: ["500", "700"] });

const description =
  "Two Diplomas. One Unrivaled Future. Santa Cruz Cooperative School is the premier PK–12 American international school in Bolivia — dual U.S. and Bolivian diplomas, Cognia-accredited, 99% university matriculation.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Santa Cruz Cooperative School — The Gold Standard of Global Education", template: "%s · SCCS" },
  description,
  keywords: ["Santa Cruz Cooperative School", "SCCS", "American school Bolivia", "international school Santa Cruz", "dual diploma", "Cognia accredited", "AP program Bolivia", "Jaguars"],
  icons: { icon: "/brand/sccs-crest.png", apple: "/brand/sccs-crest-180.png" },
  openGraph: {
    type: "website",
    siteName: "Santa Cruz Cooperative School",
    title: "Santa Cruz Cooperative School — The Gold Standard of Global Education",
    description,
    images: [{ url: "/images/sccs/campus-gardens.jpg", width: 1250, height: 938, alt: "SCCS campus gardens and palapas" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fbf8f1",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Santa Cruz Cooperative School",
  alternateName: "SCCS",
  description,
  foundingDate: SITE.founded,
  url: SITE.url,
  telephone: "+591-3-3530808",
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Calle Barcelona #1, Barrio Las Palmas",
    addressLocality: "Santa Cruz de la Sierra",
    addressCountry: "BO",
  },
  sameAs: [SITE.instagram, SITE.facebook],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const content = await ensureContent();
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${montserrat.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <ContentProvider doc={content}>
          <LangProvider>
            <SiteChrome>{children}</SiteChrome>
          </LangProvider>
        </ContentProvider>
      </body>
    </html>
  );
}
