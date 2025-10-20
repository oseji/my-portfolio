import type { Metadata } from "next";
import { satoshiVariable } from "./fonts/satoshi";
import "./globals.css";

export const metadata: Metadata = {
	title: "My Portfolio",
	description: "This is my personal portfolio website",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${satoshiVariable.className} antialiased`}>
				{children}
			</body>
		</html>
	);
}
