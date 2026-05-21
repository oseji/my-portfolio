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
            bio: "I'm Ose, a frontend developer who builds dynamic, user-focused web experiences. With Next.js and TailwindCSS as my foundation, I craft responsive, scalable interfaces that work seamlessly across devices. I bring projects to life with GSAP, creating smooth animations like scroll-triggered effects and interactive hero sections. I thrive on writing clean, efficient code, solving complex UI challenges, and transforming bold ideas into digital experiences that feel intuitive and delightful.",
        },
        qa: {
            hero: "Breaking Things So Users Never Have To",
            sub: "QA Engineer · Web & Mobile Automation · Fintech · TypeScript",
            bio: "I'm Ose, a QA engineer specialising in fintech, with automation experience across both mobile and web platforms. I build end-to-end test suites using Appium and WebdriverIO for mobile apps and Selenium and Playwright for web — all in TypeScript with the Page Object Model. I validate APIs with Postman, Swagger, and Hoppscotch, and debug transaction records directly in MongoDB to ensure data integrity across environments. My frontend engineering background in React and TypeScript means I can trace bugs deep into the codebase, collaborate tightly with dev teams, and root-cause issues faster.",
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
                blurb: "A smart money-tracking app that helps users manage their finances with ease. Built with Firebase and Next.js.",
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
                blurb: "Media discovery platform with GSAP animations and movie/series search across multiple languages and regions.",
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
                blurb: "HR management platform with Firebase auth and real-time data. Comprehensive analytics and team performance tracking.",
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
