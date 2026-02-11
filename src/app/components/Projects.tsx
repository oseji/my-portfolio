"use client";

import Image, { StaticImageData } from "next/image";

import { useModeStore } from "../store/selectedModeState";

import pennyWiseImg from "../assets/projects/pennywise.png";
import bingeImg from "../assets/projects/binge.png";
import hrSphereImg from "../assets/projects/hrSphere.png";
import ipAddressImg from "../assets/projects/ip address.png";

import swaglabsImg from "../assets/projects/qa/swaglabs.png";

type Project = {
	id: number;
	img: StaticImageData;
	title: string;
	about: string;
	href: string;
	githubRepo: string;
	stack: string[];
};

const Projects = () => {
	const { mode } = useModeStore();

	const frontendProjectData: Project[] = [
		{
			id: 1,
			img: pennyWiseImg,
			title: "Pennywise",
			href: "https://pennywise-oseji.vercel.app/",
			githubRepo: "https://github.com/oseji/pennywise.git",
			about:
				"A smart money-tracking app that helps users manage their finances with ease. Built with Firebase and Next.js.",
			stack: ["Next.js", "TypeScript", "Firebase"],
		},
		{
			id: 2,
			img: bingeImg,
			title: "Binge",
			href: "https://binge-beta.vercel.app/",
			githubRepo: "https://github.com/oseji/Binge.git",
			about:
				"Media discovery platform with GSAP animations and movie/series search.",
			stack: ["React", "TypeScript", "Redux Toolkit", "Tailwind"],
		},
		{
			id: 3,
			img: hrSphereImg,
			title: "HR Sphere dashboard (WIP)",
			href: "https://hr-sphere.vercel.app/",
			githubRepo: "https://github.com/oseji/HR-Sphere.git",
			about: "HR management platform with Firebase auth and real-time data.",
			stack: ["React", "TypeScript", "Tailwind", "Firebase"],
		},
		{
			id: 4,
			img: ipAddressImg,
			title: "IP address tracker",
			href: "https://ip-tracker-oseji.netlify.app/",
			githubRepo: "https://github.com/oseji/IP-Address-Tracker.git",
			about: "Tracks IP location using React Leaflet and public APIs.",
			stack: ["React", "Tailwind", "React-leaflet", "API"],
		},
		//
	];

	const qaProjectData: Project[] = [
		{
			id: 1,
			img: swaglabsImg,
			title: "Swag Labs Automation Suite",
			href: "https://github.com/oseji/Swag-Labs-Automation-Project",
			githubRepo:
				"https://github.com/oseji/Swag-Labs-Automation-Project?tab=readme-ov-file#swaglabs-automation",
			about:
				"E2E UI automation with TypeScript, Selenium WebDriver, and Page Object Model. Covers authentication, product flows, cart, and checkout.",
			stack: ["Selenium Webdriver", "TypeScript", "dotenv"],
		},
	];

	const projects = mode === "frontend" ? frontendProjectData : qaProjectData;

	return (
		<section
			className=" dark:bg-black dark:text-white section-padding"
			id="projects"
		>
			<h1 className="sectionHeading">
				{mode === "frontend"
					? "Front-End Projects"
					: "Quality Assurance Projects"}
			</h1>

			<p className="sectionHeadingSubText">
				{mode === "frontend"
					? "Dynamic web applications built with React, Next.js, TypeScript, and TailwindCSS."
					: "Automated regression suites powered by modern testing frameworks."}
			</p>

			<section className=" grid grid-cols-2 justify-center gap-8">
				{projects.map((project) => (
					<div
						key={project.id}
						className=" rounded-lg border border-[#DFDFDF] dark:border-0 dark:bg-[#262626] w-3/4 min-h-[400px] mx-auto flex flex-col overflow-hidden"
					>
						<Image
							src={project.img}
							alt={project.title}
							className="rounded-t-lg"
						/>

						<div className=" flex flex-col justify-between flex-1 gap-5 p-7 ">
							<div>
								<h2 className="text-xl font-semibold">{project.title}</h2>

								<p className="mt-2 text-gray-600 dark:text-gray-300">
									{project.about}
								</p>
							</div>

							<div className=" flex flex-row items-center gap-2">
								{project.stack.map((stack, index) => (
									<span
										key={index}
										className=" text-xs font-semibold px-4 py-2 bg-gray-100 dark:bg-black rounded-lg"
									>
										{stack}
									</span>
								))}
							</div>
						</div>
					</div>
				))}
			</section>
		</section>
	);
};

export default Projects;
