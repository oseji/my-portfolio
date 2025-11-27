import SkillTags from "./SkillTags";
import Image from "next/image";
import arrowOrange from "../assets/arrow orange.svg";

const HeroSection = () => {
	return (
		<section
			className=" section-padding flex flex-col items-center justify-center gap-20 md:gap-60 lg:gap-80 xl:gap-20 min-h-screen bg-[#FFF7ED]"
			id="heroSection"
		>
			<div className="mt-10 relative translate-y-1/4 md:translate-y-1/2">
				<div className=" capitalize text-center px-5 py-2 bg-[var(--primary-color)] w-fit mx-auto rounded-full border-black border-2 text-white">
					hey there 👋
				</div>

				<h1 className=" text-2xl md:text-4xl lg:text-7xl xl:text-4xl font-semibold text-center mb-11">
					I’m Ose, blending frontend development and QA to build user-friendly,
					high-quality products.
				</h1>

				<a
					href="mailto:oseoziegbe0@gmail.com"
					className=" w-fit flex flex-row items-center gap-3 mx-auto capitalize text-[#EA580C] border border-[#EA580C] rounded-3xl px-6 py-3 transition ease-in-out duration-300 hover:scale-110 cursor-pointer"
				>
					<span> let&apos;s talk</span>

					<Image src={arrowOrange} alt="orange arrow" />
				</a>
			</div>

			<SkillTags />
		</section>
	);
};

export default HeroSection;
