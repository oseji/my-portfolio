"use client";

import { useState } from "react";
import type { Persona } from "@/lib/portfolio";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { useEffect } from "react";

const ACCENT = "#ee5b1a";

export default function Home() {
    const [persona, setPersona] = useState<Persona>("frontend");
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        if (saved === "dark") {
            setIsDark(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDark = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    return (
        <>
            <CustomCursor accent={ACCENT} />
            <Nav
                persona={persona}
                setPersona={setPersona}
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
