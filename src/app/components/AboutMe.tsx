"use client";

import Image from "next/image";
import { useModeStore } from "../store/selectedModeState";
import myPicture from "../assets/my picture.jpeg";

const AboutMe = () => {
	const frontendSkills = {
		"Core Stack": ["Next.js", "React.js", "TypeScript", "JavaScript"],
		"State & Data": ["Redux Toolkit", "Zustand", "Firebase", "API Integration"],
		"UI & Motion": [
			"Tailwind CSS",
			"Framer Motion",
			"GSAP (GreenSock)",
			"SCSS",
		],
	};

	const qaSkills = {
		"Core Tools": ["Selenium WebDriver (POM)", "Postman", "Swagger", "Jira"],
		"Technical Testing": [
			"Database Validation (MongoDB)",
			"API Testing",
			"Cross-Browser Testing",
		],
		"Testing Lifecycle": [
			"Regression Testing",
			"End-to-End Testing",
			"Smoke Testing",
			"UAT",
		],
	};

	const frontendBio = `I'm Ose, a frontend developer who builds dynamic, user-focused web experiences. With Next.js and TailwindCSS as my foundation, I craft responsive, scalable interfaces that work seamlessly across devices. I bring projects to life with GSAP, creating smooth animations like scroll-triggered effects and interactive hero sections. I thrive on writing clean, efficient code, solving complex UI challenges, and transforming bold ideas into digital experiences that feel intuitive and delightful. When I'm not coding, I'm exploring fresh design trends and discovering new ways to infuse websites with personality. Check out my projects above and let's build something extraordinary together.`;

	const qaBio = `I'm Ose, a QA engineer focused on delivering reliable, high-quality software through smart automation and thorough testing. I build and maintain Selenium WebDriver frameworks using the Page Object Model to ensure comprehensive coverage for web applications. With Postman and Swagger, I validate APIs, verifying data integrity and reliability across critical backend systems, especially in fintech environments. I leverage MongoDB to debug and validate transaction records, ensuring data consistency across test and production environments. My approach centers on streamlining QA workflows and collaborating closely with developers, designers, and product managers in Agile sprints to prioritize testing, accelerate issue resolution, and ship stable, quality releases.`;

	const { mode } = useModeStore();

	return (
		<section
			className=" bg-gray-100 dark:bg-[#262626] dark:text-white section-padding"
			id="aboutMe"
		>
			<h1 className=" sectionHeading">about me</h1>

			<p className=" sectionHeadingSubText">
				{mode === "frontend"
					? "Frontend developer focused on creating seamless, visually stunning interfaces that users love."
					: "Testing software with precision and purpose. Automation enthusiast who understands both sides of the code."}
			</p>

			<div className=" flex flex-col lg:flex-row items-center gap-4 md:gap-10">
				<div className="md:w-1/2 lg:w-1/3 rounded-lg overflow-hidden">
					<Image
						src={myPicture}
						alt="Ose Oziegbe"
						className="rounded-lg hover:scale-110 transform transition ease-in-out duration-500 w-full h-auto object-cover block"
					/>
				</div>

				<div className=" lg:w-2/3">
					<p>{mode === "frontend" ? frontendBio : qaBio}</p>

					<h2 className=" font-medium text-xl mb-4 mt-10">Key skills</h2>

					<div className=" flex flex-col flex-wrap items-start gap-4">
						{Object.entries(
							mode === "frontend" ? frontendSkills : qaSkills,
						).map(([category, skills], catIndex) => (
							<div key={catIndex} className="space-y-3">
								<h4 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
									{category}
								</h4>

								<div className="flex flex-row flex-wrap items-center gap-3">
									{skills.map((skill, index) => (
										<span
											key={index}
											className="capitalize border border-gray-300 dark:border-0 dark:bg-orange-500 bg-gray-200 rounded-lg px-4 py-2 text-sm transition-all hover:scale-105"
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutMe;
