import type { Metadata } from "next";
import { satoshiVariable } from "./fonts/satoshi";
import { Toaster } from "react-hot-toast";
import CustomCursor from "./components/customCursor";
import "./globals.css";

export const metadata: Metadata = {
	title: "Ose Oziegbe's Portfolio",
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
				<CustomCursor />

				{children}

				<Toaster
					position="top-center"
					reverseOrder={false}
					gutter={8}
					toastOptions={{
						duration: 4000,
						style: {
							background: "white",
							color: "#000000",
							fontSize: "16px",
							padding: "16px",
							borderRadius: "12px",
						},
						success: {
							icon: "✓",
							style: {
								border: "2px solid #10B981", // green border only
							},
						},
						error: {
							icon: "✕",
							style: {
								border: "2px solid #EF4444", // red border only
							},
						},
					}}
				/>
			</body>
		</html>
	);
}
