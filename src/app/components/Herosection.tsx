import SkillTags from "./SkillTags";

import { ArrowUpRight } from "lucide-react";

const HeroSection = () => {
	return (
		<section
			className=" dark:bg-[#262626] dark:text-white section-padding flex flex-col items-center justify-center gap-20 md:gap-60 lg:gap-80 xl:gap-20 min-h-screen bg-[#FFF7ED]"
			id="heroSection"
		>
			<div className=" relative translate-y-1/4 md:translate-y-1/2 mt-10 md:mt-0">
				{/* <div className=" capitalize text-center px-5 py-2 bg-[var(--primary-color)] w-fit mx-auto rounded-full border-black border-2 text-white">
					ose oziegbe
				</div> */}

				<h1 className="text-3xl md:text-4xl lg:text-7xl  font-semibold text-center mb-2">
					Building Seamless Interfaces
				</h1>

				<h1 className="text-3xl md:text-4xl lg:text-7xl  font-semibold text-center">
					Ensuring Flawless Performance
				</h1>

				<p className=" text-center mb-10">
					QA Engineer with a Frontend Developer&apos;s DNA
				</p>

				<a
					href="mailto:oseoziegbe0@gmail.com"
					className=" w-fit flex flex-row items-center gap-3 mx-auto capitalize text-white bg-[#EA580C]  border border-[#EA580C] rounded-3xl px-6 py-3 transition ease-in-out duration-300 hover:scale-110 cursor-pointer"
				>
					<span> let&apos;s talk</span>

					<ArrowUpRight className=" h-4 text-white" />
				</a>
			</div>

			<SkillTags />
		</section>
	);
};

export default HeroSection;
