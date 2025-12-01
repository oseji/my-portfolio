"use client";

import { useState, FormEvent } from "react";
import toast from "react-hot-toast";

import { ArrowUpRight } from "lucide-react";

const ContactMe = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [message, setMessage] = useState<string>("");

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const data = {
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			message: formData.get("message") as string,
		};

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});

			const result = await response.json();

			if (response.ok) {
				toast.success("Message sent successfully!");
				setName("");
				setEmail("");
				setMessage("");
				e.currentTarget.reset();
			} else {
				toast.dismiss();
				toast.error(result.error || "Failed to send message");
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : String(err));
			console.log(error);
		} finally {
			console.log("function fired");
			setIsLoading(false);
		}
	}

	return (
		<section
			className=" dark:bg-[#262626] dark:text-white section-padding flex flex-col md:flex-row gap md:justify-between items-center gap-10 md:gap-44 bg-[#EA580C]"
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

				<p>Open for exciting freelance & full-time opportunities</p>

				<a href="mailto:oseoziegbe0@gmail.com">
					<button className=" flex flex-row items-center gap-4 bg-white dark:bg-orange-500 dark:text-white w-full rounded-full py-3 justify-center text-black mt-10 cursor-pointer transition ease-in-out duration-300 hover:scale-110">
						<span>Contact me</span>
						<ArrowUpRight className=" h-4 dark:text-white" />
					</button>
				</a>
			</div>

			<div className=" bg-white dark:bg-black rounded-lg p-5 w-full md:w-1/2 xl:w-1/2">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(e);
					}}
					className=" flex flex-col gap-5"
				>
					<div className=" inputLabelGroup">
						<label htmlFor="name">full name</label>
						<input
							type="text"
							id="name"
							name="name"
							placeholder="full name"
							required
							value={name}
							onChange={(e) => {
								setName(e.currentTarget.value);
							}}
						/>
					</div>

					<div className=" inputLabelGroup">
						<label htmlFor="email">email</label>
						<input
							type="email"
							id="email"
							name="email"
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
							name === "" || email === "" || message === "" || isLoading
								? "cursor-not-allowed"
								: "cursor-pointer"
						}`}
						// onClick={(e) => {
						// 	e.preventDefault();
						// 	handleSubmit(e);
						// }}
						disabled={
							name === "" || email === "" || message === "" || isLoading
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
