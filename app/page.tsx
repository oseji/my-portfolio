"use client";

// app/page.tsx
// Single-page composition. Persona lives here so the toggle in <Nav>
// drives content in every section.

import { useState } from "react";
import type { Persona } from "@/lib/portfolio";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// Want to expose accent / bg from a CMS later? Lift these into a context.
const ACCENT = "#ee5b1a";

export default function Home() {
  const [persona, setPersona] = useState<Persona>("frontend");

  return (
    <>
      <CustomCursor accent={ACCENT} />
      <Nav persona={persona} setPersona={setPersona} accent={ACCENT} />
      <Hero persona={persona} accent={ACCENT} />
      <Projects persona={persona} accent={ACCENT} />
      <About persona={persona} accent={ACCENT} />
      <Contact accent={ACCENT} />
      <Footer accent={ACCENT} />
    </>
  );
}
