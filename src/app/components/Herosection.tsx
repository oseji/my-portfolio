import Image from "next/image";
import arrowOrange from "../assets/arrow orange.svg";

const HeroSection = () => {
	return (
		<section
			className=" section-padding flex flex-col items-center justify-center min-h-screen"
			id="heroSection"
		>
			<div className="mt-10">
				<div className=" capitalize text-center px-5 py-2 bg-[var(--primary-color)] w-fit mx-auto rounded-full border-black border-2 text-white">
					hey there 👋
				</div>

				<h1 className=" text-3xl font-semibold text-center mb-11">
					I’m Ose a Lagos based Front-end Engineer who is a curious creative and
					also loves turning ideas into thoughtful, user-friendly designs.{" "}
				</h1>

				<button className=" flex flex-row items-center gap-3 mx-auto capitalize text-[#EA580C] border border-[#EA580C] rounded-3xl px-6 py-3 transition ease-in-out duration-300 hover:scale-110 cursor-pointer">
					<span> let&apos;s talk</span>

					<Image src={arrowOrange} alt="orange arrow" />
				</button>
			</div>
		</section>
	);
};

export default HeroSection;
