"use client";

import { useState, useEffect } from "react";
import type { Persona } from "@/lib/portfolio";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";

const ACCENT = "#ee5b1a";

export default function Home() {
    const [persona, setPersona] = useState<Persona>("frontend");
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }

        const savedPersona = localStorage.getItem("persona") as Persona | null;
        if (savedPersona === "frontend" || savedPersona === "qa") {
            setPersona(savedPersona);
        }
    }, []);

    const toggleDark = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    const handleSetPersona = (p: Persona) => {
        setPersona(p);
        localStorage.setItem("persona", p);
    };

    return (
        <>
            <ScrollReveal />
            <CustomCursor accent={ACCENT} />
            <Nav
                persona={persona}
                setPersona={handleSetPersona}
                accent={ACCENT}
                isDark={isDark}
                toggleDark={toggleDark}
            />
            <Hero persona={persona} accent={ACCENT} />
            <Projects persona={persona} accent={ACCENT} />
            <About persona={persona} accent={ACCENT} />
            <Contact accent={ACCENT} />
            <Footer accent={ACCENT} />
        </>
    );
}
