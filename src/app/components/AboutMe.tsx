"use client";
import { useState } from "react";
import Image from "next/image";

import aboutMeImage from "../assets/about me image.png";

type modeType = "frontend" | "qa";

const AboutMe = () => {
	const [selectedMode, setSelectedMode] = useState<modeType>("frontend");
	const frontendSkills = [
		"HTML5",
		"CSS3",
		"SCSS",
		"JavaScript",
		"TypeScript",
		"React.js",
		"Next.js",
		"Redux Toolkit",
		"Zustand",
		"Tailwind CSS",
		"Firebase",
		"API Integration",
		"Framer Motion",
		"GSAP (GreenSock)",
		"Git & GitHub",
	];

	const qaSkills = [
		"Selenium WebDriver",
		"Postman",
		"Swagger",
		"Jira",
		"Test Case Design & Execution",
		"Bug Reporting & Tracking",
		"Database Validation ",
		"Manual Testing",
		"Automated Testing",
		"Functional Testing",
		"Regression Testing",
		"End-to-End Testing",
		"Smoke Testing",
		"User Acceptance Testing",
		"Exploratory Testing",
		"Cross-Browser Testing",
	];

	return (
		<section className=" section-padding" id="aboutMe">
			<h1 className=" sectionHeading">about me</h1>

			<p className=" sectionHeadingSubText">
				Selected Works who is anto thoughtful, user-friendly designs. Designing
				with heart, purpose, and just the right touch of pixel magic
			</p>

			<div className=" projectToggle">
				<button
					className={`projectToggleButtons ${
						selectedMode === "frontend"
							? "text-white bg-[#EA580C]"
							: "border-gray-300 cursor-pointer"
					}`}
					onClick={() => setSelectedMode("frontend")}
				>
					front-end development
				</button>

				<button
					className={`projectToggleButtons ${
						selectedMode === "qa"
							? "text-white bg-[#EA580C]"
							: "border-gray-300 cursor-pointer"
					}`}
					onClick={() => setSelectedMode("qa")}
				>
					quality assurance
				</button>
			</div>

			<div className=" flex flex-col md:flex-row items-center gap-4 md:gap-10">
				<Image src={aboutMeImage} alt="Ose Oziegbe" />

				<div className=" md:w-2/3">
					{selectedMode === "frontend" ? (
						<p>
							I’m Ose, a frontend developer who builds dynamic, user-focused web
							experiences. With Next.js and TailwindCSS as my core tools, I
							craft responsive, scalable, and visually stunning interfaces that
							work seamlessly across devices. I’m passionate about adding life
							to projects with GSAP, creating smooth, engaging animations like
							scroll-triggered effects and interactive hero sections. I thrive
							on writing clean, efficient code, solving complex UI challenges,
							and turning bold ideas into digital experiences that feel
							intuitive and delightful. When I’m not coding, I’m experimenting
							with fresh design trends or finding new ways to make websites pop
							with personality. Explore my projects above and let’s build
							something extraordinary together.
						</p>
					) : (
						<p>
							I’m Ose, a meticulous QA engineer passionate about delivering
							seamless, high-quality software. I specialize in building and
							maintaining Selenium WebDriver automation frameworks to ensure
							robust testing for web applications. With Postman and Swagger, I
							validate APIs, ensuring data integrity and reliability across
							critical backend systems, particularly in fintech. I use MongoDB
							to debug and verify transaction records, guaranteeing consistency
							across test and production environments. My focus is on
							streamlining QA processes and collaborating closely with
							developers, designers, and product managers in Agile sprints to
							prioritize testing, resolve issues swiftly, and deliver stable
							releases.
						</p>
					)}

					<h2 className=" font-medium text-xl mb-4 mt-10">Key skills</h2>

					<div className=" flex flex-row flex-wrap items-center gap-4">
						{(selectedMode === "frontend" ? frontendSkills : qaSkills).map(
							(skill, index) => (
								<span
									key={index}
									className=" capitalize border border-gray-300 bg-gray-200 rounded-lg px-4 py-2 text-sm"
								>
									{skill}
								</span>
							)
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutMe;
