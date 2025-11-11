"use client";
import Image from "next/image";
import { useState } from "react";
import frontendProjectData from "../frontendProjects.json";
import Pagination from "./Pagination";

type modeType = "frontend" | "qa";

const Projects = () => {
	const [selectedMode, setSelectedMode] = useState<modeType>("frontend");

	const [currentPage, setCurrentPage] = useState(1);
	const numberOfItemsPerPage = 3;
	const numberOfPages = Math.ceil(
		frontendProjectData.length / numberOfItemsPerPage
	);
	const startIndex = (currentPage - 1) * numberOfItemsPerPage;
	const endIndex = startIndex + numberOfItemsPerPage;

	return (
		<section className=" section-padding" id="projects">
			<h1 className=" sectionHeading">
				{selectedMode === "frontend"
					? "Front-End projects"
					: "quality assurance projects"}
			</h1>

			<p className=" sectionHeadingSubText">
				{selectedMode === "frontend"
					? "Selected Works  who is anto thoughtful, user-friendly designs. Designing with heart, purpose, and just the right touch of pixel magic"
					: " qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"}
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

			<div className=" flex flex-col gap-10">
				{frontendProjectData.slice(startIndex, endIndex).map((element) => (
					<div
						key={element.id}
						className=" flex flex-col md:flex-row gap-4 md:gap-10 md:items-center"
					>
						<div className=" rounded-xl">
							<Image
								src={element.img}
								alt={element.title}
								width={600}
								height={200}
								className=" rounded-xl aspect-video hover:scale-110 transition ease-in-out duration-500"
							/>
						</div>

						<div className=" flex flex-col gap-3">
							<h2 className=" font-bold capitalize">{element.title}</h2>

							<p className=" text-gray-500 ">{element.about}</p>

							<div className=" flex flex-row gap-3 flex-nowrap">
								{element.stack.map((stack, index) => (
									<span
										key={index}
										className=" capitalize border border-gray-300 bg-gray-200 rounded-lg px-4 py-2 text-sm"
									>
										{stack}
									</span>
								))}
							</div>
						</div>
					</div>
				))}
			</div>

			{/* pagination section */}
			<Pagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				numberOfPages={numberOfPages}
			/>
		</section>
	);
};

export default Projects;
