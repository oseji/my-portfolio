"use client";

import { useSyncExternalStore } from "react";
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

// Theme + persona live in localStorage / the <html> class (the theme class is
// set before paint by the inline script in layout.tsx). React reads them via
// useSyncExternalStore and re-reads whenever this event fires.
const PREFS_EVENT = "prefs-change";

function subscribe(onChange: () => void) {
    window.addEventListener(PREFS_EVENT, onChange);
    return () => window.removeEventListener(PREFS_EVENT, onChange);
}

function getPersona(): Persona {
    return localStorage.getItem("persona") === "frontend" ? "frontend" : "qa";
}

function getIsDark(): boolean {
    return document.documentElement.classList.contains("dark");
}

export default function Home() {
    const persona = useSyncExternalStore(subscribe, getPersona, () => "qa" as Persona);
    const isDark = useSyncExternalStore(subscribe, getIsDark, () => false);

    const toggleDark = () => {
        const next = !getIsDark();
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
        window.dispatchEvent(new Event(PREFS_EVENT));
    };

    const handleSetPersona = (p: Persona) => {
        localStorage.setItem("persona", p);
        window.dispatchEvent(new Event(PREFS_EVENT));
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
