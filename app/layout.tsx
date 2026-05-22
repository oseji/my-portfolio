// app/layout.tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Ose Oziegbe — QA Engineer & Frontend Developer",
  description:
    "QA engineer and frontend developer specialising in fintech — building reliable software and dynamic interfaces.",
  icons: {
    icon: "/favicons/favicon-a-mark.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-bg text-ink font-sans antialiased">{children}</body>
    </html>
  );
}
