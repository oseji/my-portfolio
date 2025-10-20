import Image from "next/image";

import githubIcon from "../assets/github-svgrepo-com.svg";
import linkedInIcon from "../assets/linkedin-rounded-svgrepo-com.svg";

const Header = () => {
	return (
		<header className=" flex flex-col md:flex-row justify-between items-center px-5 md:px-12 lg:px-16 xl:px-28 py-5">
			<p className=" text-xl font-bold">Ose Oziegbe</p>

			<nav className=" flex flex-col md:flex-row items-center gap-10">
				<ul className=" flex flex-col md:flex-row items-center gap-4">
					<li>
						<a href="#">Home</a>
					</li>
					<li>
						<a href="#">Projects</a>
					</li>
					<li>
						<a href="#">About Me</a>
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
						<Image src={githubIcon} alt="github icon" className=" h-5 w-5" />
					</div>

					<div className=" bg-[#FED7AA] rounded-full p-3">
						<Image
							src={linkedInIcon}
							alt="linkedin icon"
							className=" h-5 w-5"
						/>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
