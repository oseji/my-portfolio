"use client";
import Image from "next/image";
import arrowIcon from "../assets/arrow-up-right.svg";
import { useState } from "react";

const ContactMe = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [fullName, setFullName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	return (
		<section
			className=" section-padding flex flex-col md:flex-row gap md:justify-between items-center gap-10 md:gap-44 bg-[#EA580C]"
			style={{
				backgroundImage: `url(/backgroundImage.svg)`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className=" w-full md:w-1/3 text-white">
				<h1 className=" text-3xl mb-4 font-medium">
					Got a Project Idea? Let’s create Something amazing
				</h1>

				<p>Available for network and collaborations</p>

				<a href="mailto:oseoziegbe0@gmail.com">
					<button className=" flex flex-row items-center gap-4 bg-white w-full rounded-full py-3 justify-center text-black mt-10 cursor-pointer transition ease-in-out duration-300 hover:scale-110">
						<span>Contact me</span>
						<Image src={arrowIcon} alt="arrow icon" />
					</button>
				</a>
			</div>

			<div className=" bg-white rounded-lg p-5 w-full md:w-1/2 xl:w-1/2">
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
					className=" flex flex-col gap-5"
				>
					<div className=" inputLabelGroup">
						<label htmlFor="fullName">full name</label>
						<input
							type="text"
							id="fullName"
							placeholder="full name"
							required
							value={fullName}
							onChange={(e) => {
								setFullName(e.currentTarget.value);
							}}
						/>
					</div>

					<div className=" inputLabelGroup">
						<label htmlFor="email">email</label>
						<input
							type="email"
							id="email"
							placeholder="email"
							required
							value={email}
							onChange={(e) => {
								setEmail(e.currentTarget.value);
							}}
						/>
					</div>

					<div className=" inputLabelGroup">
						<label htmlFor="message">message</label>
						<textarea
							name="message"
							id="message"
							placeholder="enter your message"
							className=" h-28 max-h-28 min-h-28"
							required
							value={message}
							onChange={(e) => {
								setMessage(e.currentTarget.value);
							}}
						></textarea>
					</div>

					<button
						className={`capitalize text-white bg-[#EA580C] py-3 w-full rounded-lg  ${
							fullName === "" || email === "" || message === "" || isLoading
								? "cursor-not-allowed"
								: "cursor-pointer"
						}`}
						onClick={(e) => {
							e.preventDefault();
						}}
						disabled={
							fullName === "" || email === "" || message === "" || isLoading
						}
					>
						{!isLoading ? (
							"send message"
						) : (
							<div className="w-8 h-8  mx-auto border-3 border-white border-t-transparent rounded-full animate-spin"></div>
						)}
					</button>
				</form>
			</div>
		</section>
	);
};

export default ContactMe;
