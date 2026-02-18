"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
	const dot = useRef<HTMLDivElement>(null);
	const outline = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Cursor Movement Logic
		const moveCursor = (e: MouseEvent) => {
			const { clientX, clientY } = e;

			// Dot follows immediately
			gsap.set(dot.current, { x: clientX, y: clientY });

			// Outline follows with a slight smooth lag
			gsap.to(outline.current, {
				x: clientX,
				y: clientY,
				duration: 0.4,
				ease: "power3.out",
			});
		};

		// Hover scaling for interactive elements
		const handleHover = () =>
			gsap.to(outline.current, { scale: 1.5, duration: 0.4 });
		const handleUnhover = () =>
			gsap.to(outline.current, { scale: 1, duration: 0.4 });

		window.addEventListener("mousemove", moveCursor);

		// Attach listeners to all links/buttons
		const targets = document.querySelectorAll("a, button, .clickable");
		targets.forEach((el) => {
			el.addEventListener("mouseenter", handleHover);
			el.addEventListener("mouseleave", handleUnhover);
		});

		return () => {
			window.removeEventListener("mousemove", moveCursor);
			targets.forEach((el) => {
				el.removeEventListener("mouseenter", handleHover);
				el.removeEventListener("mouseleave", handleUnhover);
			});
		};
	}, []);

	return (
		<>
			<div
				ref={dot}
				className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
			/>
			<div
				ref={outline}
				className="fixed top-0 left-0 w-10 h-10 border border-white rounded-full pointer-events-none z-[9998] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
			/>
		</>
	);
}
