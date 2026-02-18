import Image from "next/image";
// import SkillTags from "./SkillTags";
import githubIcon from "../assets/github-svgrepo-com.svg";
import linkedInIcon from "../assets/linkedin-rounded-svgrepo-com.svg";

const Footer = () => {
	return (
		<footer className=" bg-slate-50 dark:bg-[#262626] dark:text-white section-padding ">
			<p className=" text-center mt-4">© 2025 Ose Oziegbe</p>
			<p className=" text-center mt-4">QA Engineer & Frontend developer </p>
			<p className=" text-center mt-4">
				Testing smarter because I&apos;ve built it before
			</p>

			<div className="  flex flex-row items-center justify-center gap-2 mb-10 mt-4">
				<div className=" bg-[#FED7AA] rounded-full p-3">
					<a
						href="https://github.com/oseji"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image src={githubIcon} alt="github icon" className=" h-5 w-5" />
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

			{/* <div className=" hidden md:block">
				<SkillTags />
			</div> */}
		</footer>
	);
};

export default Footer;
