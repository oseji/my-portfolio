// lib/portfolio.ts
// All portfolio content + types. Edit here, the whole site updates.

export type Persona = "frontend" | "qa";

export type Skill = {
    name: string;
    group: string;
};

export type Project = {
    id: string;
    title: string;
    tag: string;
    blurb: string;
    stack: string[];
    accent: string;
    year: string;
    githubLink: string;
    liveLink: string;
};

export type Portfolio = {
    name: string;
    short: string;
    taglines: Record<Persona, { hero: string; sub: string; bio: string }>;
    skills: Record<Persona, Skill[]>;
    projects: Record<Persona, Project[]>;
    social: { github: string; linkedin: string; email: string; resume: string };
    footer: string;
};

export const portfolio: Portfolio = {
    name: "Ose Oziegbe",
    short: "Ose",
    taglines: {
        frontend: {
            hero: "Crafting Interfaces That Feel Alive",
            sub: "Frontend Developer · Next.js · TypeScript · Motion",
            bio: "I'm Ose, a frontend developer. I mostly work in Next.js and TypeScript and have been building UIs for a few years now. I use GSAP for animation work: scroll triggers, hero sections, transitions. I pay a lot of attention to how things feel to actually use, which sounds vague, but it usually makes a difference in the end.",
        },
        qa: {
            hero: "Breaking Things So Users Never Have To",
            sub: "QA Engineer · Web & Mobile Automation · Fintech · TypeScript",
            bio: "I'm Ose, a QA engineer. Most of my experience has been in fintech, writing automation for mobile apps with Appium and WebdriverIO and web apps with Selenium or Playwright, all in TypeScript. For API testing I use Postman, Swagger or Hoppscotch. My frontend background helps a lot here. I can read through the codebase when I need to and usually figure out what's going wrong a lot faster.",
        },
    },
    skills: {
        frontend: [
            { name: "Next.js / React", group: "core" },
            { name: "TypeScript", group: "core" },
            { name: "JavaScript", group: "core" },
            { name: "Redux Toolkit", group: "state" },
            { name: "Zustand", group: "state" },
            { name: "Firebase", group: "state" },
            { name: "API Integration", group: "state" },
            { name: "TailwindCSS", group: "ui" },
            { name: "Framer Motion", group: "ui" },
            { name: "GSAP", group: "ui" },
            { name: "SCSS", group: "ui" },
        ],
        qa: [
            { name: "Appium / WebdriverIO", group: "automation" },
            { name: "Selenium WebDriver", group: "automation" },
            { name: "Playwright", group: "automation" },
            { name: "Mocha", group: "automation" },
            { name: "Postman", group: "api" },
            { name: "Swagger", group: "api" },
            { name: "Hoppscotch", group: "api" },
            { name: "MongoDB", group: "api" },
            { name: "Mobile QA", group: "methods" },
            { name: "Web QA", group: "methods" },
            { name: "E2E Testing", group: "methods" },
            { name: "Regression Testing", group: "methods" },
            { name: "Automated Testing", group: "methods" },
            { name: "Jira / ClickUp", group: "methods" },
        ],
    },
    projects: {
        frontend: [
            {
                id: "pennywise",
                title: "Pennywise",
                tag: "Fintech · Dashboard",
                blurb: "A money-tracking app built with Next.js and Firebase. Covers expense logging, category breakdowns, and a summary dashboard.",
                stack: ["Next.js", "TypeScript", "Firebase"],
                accent: "#22c55e",
                year: "2024",
                githubLink: "https://github.com/oseji/pennywise.git",
                liveLink: "https://pennywise-oseji.vercel.app/",
            },
            {
                id: "binge",
                title: "Binge",
                tag: "Media · Discovery",
                blurb: "A movie and series discovery app with GSAP animations and search across multiple languages and regions.",
                stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind"],
                accent: "#a855f7",
                year: "2024",
                githubLink: "https://github.com/oseji/Binge.git",
                liveLink: "https://binge-beta.vercel.app/",
            },
            {
                id: "hrsphere",
                title: "HR Sphere",
                tag: "SaaS · Dashboard · WIP",
                blurb: "An HR dashboard with Firebase auth, real-time employee data, and department analytics.",
                stack: ["React", "TypeScript", "Tailwind", "Firebase"],
                accent: "#06b6d4",
                year: "2025",
                githubLink: "https://github.com/oseji/HR-Sphere.git",
                liveLink: "https://hr-sphere.vercel.app/",
            },
            {
                id: "iptracker",
                title: "IP Address Tracker",
                tag: "Geo · Utility",
                blurb: "Tracks IP location using React Leaflet and public APIs. Real-time mapping with ISP and timezone metadata.",
                stack: ["React", "Tailwind", "React-leaflet", "API"],
                accent: "#3b82f6",
                year: "2023",
                githubLink: "https://github.com/oseji/IP-Address-Tracker.git",
                liveLink: "https://ip-tracker-oseji.netlify.app/",
            },
        ],
        qa: [
            {
                id: "swag",
                title: "Swag Labs Automation Suite",
                tag: "E2E · UI Automation",
                blurb: "End-to-end UI automation with TypeScript, Selenium WebDriver, and Page Object Model. Covers authentication, product flows, cart, and checkout.",
                stack: ["Selenium WebDriver", "TypeScript", "dotenv"],
                accent: "#f97316",
                year: "2026",
                githubLink:
                    "https://github.com/oseji/Swag-Labs-Automation-Project?tab=readme-ov-file#swaglabs-automation",
                liveLink:
                    "https://github.com/oseji/Swag-Labs-Automation-Project",
            },
        ],
    },
    social: {
        github: "https://github.com/oseji",
        linkedin: "https://www.linkedin.com/in/ose-oziegbe/",
        email: "oseoziegbe0@gmail.com",
        resume: "https://drive.google.com/file/d/19VgKqFfT8_QsR7N3wSbW1n9vnH097fYx/view",
    },
    footer: "Testing smarter because I've built it before",
};
