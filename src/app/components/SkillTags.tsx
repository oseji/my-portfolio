"use client";
// import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
// import skillPillIconDark from "../assets/skills pill dark.svg";
// import skillPillIconLight from "../assets/skills pill light.svg";

const SkillTags = () => {
	const tags = [
		// QA skills
		{
			label: "Selenium (POM)",
			color: "bg-emerald-950 text-emerald-400 border border-emerald-800",
		},
		{
			label: "Postman / Swagger",
			color: "bg-orange-950 text-orange-400 border border-orange-800",
		},
		{
			label: "MongoDB Validation",
			color: "bg-green-950 text-green-400 border border-green-800",
		},
		{
			label: "API Testing",
			color: "bg-teal-950 text-teal-400 border border-teal-800",
		},
		{
			label: "Regression Analysis",
			color: "bg-cyan-950 text-cyan-400 border border-cyan-800",
		},
		{
			label: "E2E Testing",
			color: "bg-sky-950 text-sky-400 border border-sky-800",
		},
		{
			label: "Jira",
			color: "bg-blue-950 text-blue-400 border border-blue-800",
		},

		// frontend skills
		{
			label: "Next.js / React",
			color: "bg-slate-900 text-slate-300 border border-slate-700",
		},
		{
			label: "TypeScript",
			color: "bg-slate-900 text-blue-300 border border-slate-700",
		},
		{
			label: "Redux / Zustand",
			color: "bg-slate-900 text-purple-300 border border-slate-700",
		},
		{
			label: "TailwindCSS",
			color: "bg-slate-900 text-teal-300 border border-slate-700",
		},
		{
			label: "GSAP / Framer",
			color: "bg-slate-900 text-orange-300 border border-slate-700",
		},
		{
			label: "Git / GitHub",
			color: "bg-slate-900 text-gray-400 border border-slate-700",
		},
	];

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const elements = containerRef.current.querySelectorAll(".tag");

		elements.forEach((el) => {
			gsap.set(el, {
				x: gsap.utils.random(-15, 15),
				y: gsap.utils.random(-10, 10),
				rotation: gsap.utils.random(-5, 5),
			});

			gsap.to(el, {
				x: "+=20",
				y: "+=15",
				rotation: "random(-10, 10)",
				duration: "random(3, 5)",
				repeat: -1,
				yoyo: true,
				ease: "sine.inOut",
				delay: "random(0, 2)",
			});
		});
	}, []);

	return (
		<div
			ref={containerRef}
			className="flex flex-wrap justify-center gap-4 py-10 md:mt-12"
		>
			{tags.map((tag, i) => (
				<div
					key={i}
					className={`tag px-3 py-1.5 md:px-5 md:py-2 rounded-full font-medium  shadow-sm flex flex-row justify-center items-center gap-1 border border-black min-w-28 text-sm md:text-xl  ${tag.color}`}
				>
					{/* <span className="w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[10px]">
						<Image src={skillPillIconDark} alt="skill pill icon" />
					</span> */}
					{tag.label}
				</div>
			))}
		</div>
	);
};

export default SkillTags;
