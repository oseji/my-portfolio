// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Archivo, Martian_Mono } from "next/font/google";
import { portfolio } from "@/lib/portfolio";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Archivo on its width axis carries the whole system: wide and heavy for
// display, condensed caps for title-block lettering, normal width for body.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Only for measured values, counts, and HTTP.
const martian = Martian_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});

const TITLE = "Ose Oziegbe, QA Engineer and Frontend Developer";
const DESCRIPTION =
  "QA engineer and frontend developer specialising in fintech. I build test automation and web interfaces.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: portfolio.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Runs before first paint: applies the saved (or system) theme, the saved
// persona's accent, and flags whether the motion layer will run so the hero
// can wait for it instead of flashing in unanimated.
const themeScript = `try{var d=document.documentElement,t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))d.classList.add("dark");d.dataset.persona=localStorage.getItem("persona")==="frontend"?"frontend":"qa";if(!matchMedia("(prefers-reduced-motion: reduce)").matches)d.classList.add("motion")}catch(e){}`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.name,
  url: SITE_URL,
  email: `mailto:${portfolio.social.email}`,
  jobTitle: "QA Engineer & Frontend Developer",
  sameAs: [portfolio.social.github, portfolio.social.linkedin],
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${martian.variable}`}
      data-persona="qa"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
