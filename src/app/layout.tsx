import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/components/sccs/i18n";
import { SiteChrome } from "@/components/sccs/site-chrome";
import { SITE } from "@/lib/site";

const fraunces = Fraunces({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin", "latin-ext"], display: "swap", variable: "--font-inter" });

const description =
  "Two Diplomas. One Unrivaled Future. Santa Cruz Cooperative School is the premier PK–12 American international school in Bolivia — dual U.S. and Bolivian diplomas, Cognia-accredited, 99% university matriculation.";

const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0F3D2E"/><path d="M32 40 L14 44 V30 L32 34 L50 30 V44 Z" fill="#FBF8F1"/><path d="M32 14 L6 24 L32 34 L58 24 Z" fill="#C9A227"/><path d="M50 26 V36" stroke="#C9A227" stroke-width="2.5" stroke-linecap="round"/></svg>`,
  );

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Santa Cruz Cooperative School — The Gold Standard of Global Education", template: "%s · SCCS" },
  description,
  keywords: ["Santa Cruz Cooperative School", "SCCS", "American school Bolivia", "international school Santa Cruz", "dual diploma", "Cognia accredited", "AP program Bolivia", "Jaguars"],
  icons: { icon: favicon },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <LangProvider>
          <SiteChrome>{children}</SiteChrome>
        </LangProvider>
      </body>
    </html>
  );
}
