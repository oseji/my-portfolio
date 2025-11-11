"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";

const SkillTags = () => {
	const tags = [
		{ label: "TypeScript", color: "bg-blue-800 text-white" },
		{ label: "React", color: "bg-sky-900 text-white" },
		{ label: "Next.js", color: "bg-indigo-900 text-white" },
		{ label: "Redux Toolkit", color: "bg-purple-800 text-white" },
		{ label: "Zustand", color: "bg-fuchsia-800 text-white" },
		{ label: "SCSS", color: "bg-pink-800 text-white" },
		{ label: "TailwindCSS", color: "bg-lime-800 text-white" },
		{ label: "API Integration", color: "bg-orange-900 text-white" },
		{ label: "Git", color: "bg-gray-800 text-white" },
		{ label: "GSAP", color: "bg-yellow-900 text-white" },
		{ label: "Framer Motion", color: "bg-amber-900 text-white" },
		{ label: "Firebase", color: "bg-red-900 text-white" },
		{ label: "Selenium", color: "bg-cyan-900 text-white" },
		{ label: "Postman", color: "bg-orange-800 text-white" },
		{ label: "Swagger", color: "bg-teal-900 text-white" },
		{ label: "JMeter", color: "bg-indigo-800 text-white" },
		{ label: "Jira", color: "bg-blue-800 text-white" },
	];

	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const elements = containerRef.current.querySelectorAll(".tag");

		elements.forEach((el) => {
			gsap.to(el, {
				y: () => gsap.utils.random(-15, 15),
				x: () => gsap.utils.random(-10, 10),
				rotation: () => gsap.utils.random(-30, 30),
				duration: () => gsap.utils.random(2, 4),
				ease: "sine.inOut",
				yoyo: true,
				repeat: -1,
				delay: gsap.utils.random(0, 2),
			});
		});
	}, []);

	return (
		<div
			ref={containerRef}
			className="flex flex-wrap justify-center gap-4 py-10"
		>
			{tags.map((tag, i) => (
				<div
					key={i}
					className={`tag px-5 py-2 rounded-full font-medium text-sm shadow-sm flex flex-row justify-center items-center gap-1 border border-black min-w-28 text-xl ${tag.color}`}
				>
					{/* <span className="w-4 h-4 flex items-center justify-center bg-black text-white rounded-full text-[10px]">
							↻
						</span> */}
					{tag.label}
				</div>
			))}
		</div>
	);
};

export default SkillTags;
