"use client";

import Image, { StaticImageData } from "next/image";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useModeStore } from "../store/selectedModeState";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { GithubIcon } from "lucide-react";
import pennyWiseImg from "../assets/projects/pennywise.png";
import bingeImg from "../assets/projects/binge.png";
import hrSphereImg from "../assets/projects/hrSphere.png";
import afrostockImg from "../assets/projects/afrostock.png";
import finGeniusImg from "../assets/projects/finGenius.png";
import ipAddressImg from "../assets/projects/ip address.png";
import toDoImg from "../assets/projects/toDo.png";
import trendyTroveImg from "../assets/projects/trendy trove.png";
import githubSearchImg from "../assets/projects/github search.png";
import translatorImg from "../assets/projects/translator.png";
import dictionaryImg from "../assets/projects/dictionary.png";

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
			img: afrostockImg,
			title: "Afrostock",
			href: "https://afrostock.vercel.app/",
			githubRepo: "https://github.com/oseji/Afrostock.git",
			about: "Minimalist landing page with smooth GSAP animations.",
			stack: ["Next.js", "Tailwind", "GSAP"],
		},
		{
			id: 5,
			img: finGeniusImg,
			title: "IntelliVest landing page",
			href: "https://intellivest.vercel.app/",
			githubRepo: "https://github.com/oseji/IntelliVest.git",
			about: "Sleek animated landing page built with GSAP.",
			stack: ["React", "TypeScript", "Tailwind", "GSAP"],
		},
		{
			id: 6,
			img: ipAddressImg,
			title: "IP address tracker",
			href: "https://ip-tracker-oseji.netlify.app/",
			githubRepo: "https://github.com/oseji/IP-Address-Tracker.git",
			about: "Tracks IP location using React Leaflet and public APIs.",
			stack: ["React", "Tailwind", "React-leaflet", "API"],
		},
		{
			id: 7,
			img: toDoImg,
			title: "ToDo app",
			href: "https://oseji-todo.vercel.app/",
			githubRepo: "https://github.com/oseji/ToDo.git",
			about: "Secure task manager with Firebase authentication.",
			stack: ["React", "TypeScript", "Tailwind", "Firebase"],
		},
		{
			id: 8,
			img: trendyTroveImg,
			title: "Trendy Trove",
			href: "https://trendy-trove.netlify.app/",
			githubRepo: "https://github.com/oseji/TrendyTrove.git",
			about: "Minimal animated landing page with Framer Motion.",
			stack: ["React", "TypeScript", "Tailwind", "Framer Motion"],
		},
		{
			id: 9,
			img: githubSearchImg,
			title: "Github profile searcher",
			href: "https://github-profile-finder-oseji.netlify.app/",
			githubRepo: "https://github.com/oseji/github-profile-search.git",
			about: "Search and view GitHub user profiles with clean UI.",
			stack: ["React", "Tailwind", "Framer Motion", "API"],
		},
		{
			id: 10,
			img: translatorImg,
			title: "Language translator",
			href: "https://translator-oseji.netlify.app/",
			githubRepo: "https://github.com/oseji/translator.git",
			about: "Multilingual translator with text-to-speech support.",
			stack: ["React", "Tailwind", "API"],
		},
		{
			id: 11,
			img: dictionaryImg,
			title: "Dictionary",
			href: "https://osejis-dictionary.netlify.app/",
			githubRepo: "https://github.com/oseji/osejis-dictionary.git",
			about: "Modern dictionary with audio pronunciation and dark mode.",
			stack: ["React", "Tailwind", "Framer Motion", "API"],
		},
	];

	const qaProjectData: Project[] = [
		{
			id: 1,
			img: swaglabsImg,
			title: "Swag Labs Automation Suite",
			href: "https://github.com/oseji/Swag-Labs-Automation-Project",
			githubRepo: "https://github.com/oseji/pennywise.git",
			about:
				"E2E UI automation with TypeScript, Selenium WebDriver, and Page Object Model. Covers authentication, product flows, cart, and checkout.",
			stack: ["Selenium Webdriver", "TypeScript", "dotenv"],
		},
	];

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: "start",
			containScroll: "trimSnaps",
		},
		[Autoplay({ delay: 5000, stopOnInteraction: true })],
	);

	const [selectedPage, setSelectedPage] = useState(0);
	const [slidesPerView, setSlidesPerView] = useState(1); // default = 1

	//calculate slides per view based on window width
	useEffect(() => {
		const calculateSlidesPerView = () => {
			if (window.innerWidth >= 1024) return 3;
			if (window.innerWidth >= 768) return 2;
			return 1;
		};

		const handleResize = () => {
			setSlidesPerView(calculateSlidesPerView());
		};

		handleResize(); // set initial value
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const projects = mode === "frontend" ? frontendProjectData : qaProjectData;
	const totalPages = Math.ceil(projects.length / slidesPerView);

	// update selected page on slide change
	useEffect(() => {
		if (!emblaApi) return;

		const updatePage = () => {
			const currentSlide = emblaApi.selectedScrollSnap();
			const page = Math.floor(currentSlide / slidesPerView);
			setSelectedPage(page);
		};

		updatePage();
		emblaApi.on("select", updatePage);
		emblaApi.on("reInit", updatePage);

		const handleResize = () => emblaApi.reInit();
		window.addEventListener("resize", handleResize);

		return () => {
			emblaApi.off("select", updatePage);
			emblaApi.off("reInit", updatePage);
			window.removeEventListener("resize", handleResize);
		};
	}, [emblaApi, slidesPerView]);

	const scrollToPage = (page: number) => {
		emblaApi?.scrollTo(page * slidesPerView);
	};
	const scrollPrev = () => {
		if (!emblaApi) return;
		const currentPage = Math.floor(
			emblaApi.selectedScrollSnap() / slidesPerView,
		);
		emblaApi.scrollTo((currentPage - 1) * slidesPerView);
	};

	const scrollNext = () => {
		if (!emblaApi) return;
		const currentPage = Math.floor(
			emblaApi.selectedScrollSnap() / slidesPerView,
		);
		emblaApi.scrollTo((currentPage + 1) * slidesPerView);
	};

	return (
		<section
			className=" dark:bg-[#262626] dark:text-white section-padding"
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

			{/* Carousel */}
			<section className=" relative max-w-7xl mx-auto px-6 py-6">
				<div className=" overflow-x-hidden" ref={emblaRef} tabIndex={-1}>
					<div className="flex gap-8">
						{projects.map((project) => (
							<div
								key={project.id}
								className="flex-none w-full sm:w-[85%] md:w-[30%]  rounded-xl p-4 h-[450px] bg-[#FFF7ED] dark:bg-[#3b3b3b]"
							>
								<div className=" h-full relative">
									<div className="rounded-xl overflow-hidden aspect-video">
										<Image
											src={project.img}
											alt={project.title}
											// width={800}
											// height={450}
											className="w-full h-full object-cover hover:scale-110 transition-transform ease-in-out duration-500 rounded-xl"
										/>
									</div>

									<div className="flex flex-col gap-3 justify-between mt-4">
										<div className=" flex flex-col gap-3">
											<h2 className="font-bold capitalize text-lg">
												{project.title}
											</h2>
											<p className="text-black dark:text-white text-sm leading-relaxed">
												{project.about}
											</p>
										</div>

										<div className=" flex flex-col w-full gap-3 absolute bottom-0">
											<div className="flex flex-row gap-3 flex-wrap">
												{project.stack.map((tech, i) => (
													<span
														key={i}
														className="capitalize border dark:border-0  bg-[#EA580C] text-white  rounded-lg px-3 py-1.5 text-xs font-medium"
													>
														{tech}
													</span>
												))}
											</div>

											<div className="flex flex-row justify-between items-center w-full">
												<a
													href={project.githubRepo}
													target="_blank"
													rel="noopener noreferrer"
												>
													<GithubIcon className=" h-4 hover:scale-110 transition ease-in duration-200 text-black dark:text-white" />
												</a>

												<a
													href={project.href}
													target="_blank"
													rel="noopener noreferrer"
													className=" hover:text-[#EA580C] text-sm flex flex-row items-center gap-0 hover:scale-110 transition ease-in duration-200"
												>
													<span>Visit</span>
													<ArrowUpRight className=" h-4 " />
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Arrows */}
				{projects.length > slidesPerView && (
					<>
						<button
							onClick={scrollPrev}
							className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 prevNextBtn"
							aria-label="Previous"
						>
							<ChevronLeft className="prevNextBtnIcon" />
						</button>
						<button
							onClick={scrollNext}
							className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 prevNextBtn"
							aria-label="Next"
						>
							<ChevronRight className="prevNextBtnIcon" />
						</button>
					</>
				)}

				{/* Pagination Dots – One per page */}
				{projects.length > slidesPerView && (
					<div className="flex justify-center gap-3 mt-10">
						{Array.from({ length: totalPages }, (_, i) => (
							<button
								key={i}
								onClick={() => scrollToPage(i)}
								className={`transition-all duration-300 rounded-full cursor-pointer ${
									i === selectedPage
										? "bg-[#EA580C] w-10 h-2"
										: "bg-gray-300 hover:bg-[#EA580C] hover:scale-125 duration-200 transition ease-in-out w-2 h-2"
								}`}
								aria-label={`Go to page ${i + 1}`}
							/>
						))}
					</div>
				)}
			</section>
		</section>
	);
};

export default Projects;
