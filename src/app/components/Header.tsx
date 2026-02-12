"use client";

import { useModeStore } from "../store/selectedModeState";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import githubIcon from "../assets/github-svgrepo-com.svg";
import linkedInIcon from "../assets/linkedin-rounded-svgrepo-com.svg";

const Header = () => {
	const [isMenuToggled, setIsMenuToggled] = useState(false);
	const menuLineRefs = useRef<HTMLSpanElement[]>([]);
	const navRef = useRef<HTMLDivElement | null>(null);
	const { mode, toggle } = useModeStore();

	const toggleMenu = () => {
		setIsMenuToggled(!isMenuToggled);
	};

	// toggle menu
	useEffect(() => {
		if (isMenuToggled) {
			menuLineRefs.current[0].classList.add("-rotate-45");
			menuLineRefs.current[0].classList.remove("top-[10%]");

			menuLineRefs.current[1].classList.add("hidden");

			menuLineRefs.current[2].classList.add("rotate-45");
			menuLineRefs.current[2].classList.remove("top-[90%]");

			navRef.current?.classList.remove("hideNav");
		}

		if (!isMenuToggled) {
			menuLineRefs.current[0].classList.remove("-rotate-45");
			menuLineRefs.current[0].classList.add("top-[10%]");

			menuLineRefs.current[1].classList.remove("hidden");

			menuLineRefs.current[2].classList.remove("rotate-45");
			menuLineRefs.current[2].classList.add("top-[90%]");
			navRef.current?.classList.add("hideNav");
		}
	}, [isMenuToggled]);

	return (
		<header className=" dark:bg-[#262626] dark:text-white flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-0 px-5 md:px-12 lg:px-16 xl:px-28 py-5 fixed w-full bg-white z-50 shadow-xl">
			<div className=" w-full lg:w-auto flex flex-row justify-between items-center">
				<a href="#heroSection" className=" text-xl font-bold">
					Ose Oziegbe
				</a>

				<div className="menuContainer" onClick={toggleMenu}>
					<span
						className="top-[10%] w-[80%] bg-black p-[1px]   absolute  transition ease-in-out duration-300 rounded-lg"
						ref={(el) => {
							if (el) menuLineRefs.current[0] = el;
						}}
					></span>
					<span
						className="top-1/2 w-[60%] bg-black p-[1px]   absolute  transition ease-in-out duration-300 rounded-lg"
						ref={(el) => {
							if (el) menuLineRefs.current[1] = el;
						}}
					></span>
					<span
						className="top-[90%] w-[80%] bg-black p-[1px]   absolute  transition ease-in-out duration-300 rounded-lg"
						ref={(el) => {
							if (el) menuLineRefs.current[2] = el;
						}}
					></span>
				</div>
			</div>

			<div
				className="hideNav flex flex-col lg:flex-row gap-10 transition ease-in-out duration-300 bg-white dark:bg-[#262626] w-fit lg:w-auto"
				ref={navRef}
			>
				<nav className=" dark:text-white  flex flex-col lg:flex-row items-center gap-10 ">
					<ul className=" flex flex-col lg:flex-row items-center gap-4">
						<li>
							<a href="#projects" onClick={() => setIsMenuToggled(false)}>
								Projects
							</a>
						</li>
						<li>
							<a href="#aboutMe" onClick={() => setIsMenuToggled(false)}>
								About Me
							</a>
						</li>
						<li>
							<a
								href="https://drive.google.com/file/d/1SErAAvbaxZQY2XEa0CoU2E6rgyMEmdCf/view?usp=sharing"
								target="_blank"
								rel="noopener noreferrer"
							>
								Resume
							</a>
						</li>
					</ul>

					<div className=" flex flex-row items-center gap-2">
						<div className=" bg-[#FED7AA] rounded-full p-3">
							<a
								href="https://github.com/oseji"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src={githubIcon}
									alt="github icon"
									className=" h-5 w-5"
								/>
							</a>
						</div>

						<div className=" bg-[#FED7AA] rounded-full p-3">
							<a
								href="https://www.linkedin.com/in/ose-oziegbe-648154254/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Image
									src={linkedInIcon}
									alt="linkedin icon"
									className=" h-5 w-5"
								/>
							</a>
						</div>
					</div>
				</nav>

				<button
					onClick={toggle}
					className="relative flex h-12 w-52 items-center justify-center rounded-full bg-gray-100 dark:bg-[#3b3b3b] p-1 shadow-inner transition-all cursor-pointer"
				>
					{/* Sliding background */}
					<div
						className={`absolute top-1 bottom-1 left-1 w-1/2 rounded-full bg-orange-500 transition-transform duration-300 ease-in-out ${
							mode === "qa" ? "translate-x-full" : ""
						}`}
					/>

					{/* Labels */}
					<span
						className={`z-10 w-1/2 text-center font-medium transition-colors duration-300 ${
							mode === "frontend"
								? "text-white"
								: "text-gray-600 dark:text-gray-300"
						}`}
					>
						Frontend
					</span>

					<span
						className={`z-10 w-1/2 text-center font-medium transition-colors duration-300 ${
							mode === "qa" ? "text-white" : "text-gray-600 dark:text-gray-300"
						}`}
					>
						QA
					</span>
				</button>
			</div>
		</header>
	);
};

export default Header;
