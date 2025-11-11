import Image from "next/image";
import SkillTags from "./SkillTags";
import githubIcon from "../assets/github-svgrepo-com.svg";
import linkedInIcon from "../assets/linkedin-rounded-svgrepo-com.svg";

const Footer = () => {
	return (
		<footer className=" section-padding ">
			<h1 className=" capitalize font-semibold text-2xl text-center">
				ose oziegbe
			</h1>

			<p className=" text-center mt-4">
				Interest among Nigerian and African students in studying abroad has
				significantly increased. Over the past year, Zeem has focused on turning
				this aspiration into a reality by ensuring the process is seamless and
				accessible
			</p>

			<div className=" flex flex-row items-center justify-center gap-2 mb-10 mt-4">
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

			<SkillTags />
		</footer>
	);
};

export default Footer;
