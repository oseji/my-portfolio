// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { portfolio } from "@/lib/portfolio";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const serif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif-raw",
  display: "swap",
});

const sans = Space_Grotesk({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans-raw",
  display: "swap",
});

const mono = JetBrains_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono-raw",
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

// Applies the saved theme before first paint to avoid a light-mode flash.
const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

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
      className={`${serif.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-bg text-ink font-sans antialiased">
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
