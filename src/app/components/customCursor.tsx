"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
	const dot = useRef<HTMLDivElement>(null);
	const outline = useRef<HTMLDivElement>(null);
	const [isDesktop, setIsDesktop] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(min-width: 1024px)");

		const handleResize = () => setIsDesktop(mediaQuery.matches);
		handleResize(); // Initial check

		if (!mediaQuery.matches) return;

		const moveCursor = (e: MouseEvent) => {
			const { clientX, clientY } = e;
			gsap.set(dot.current, { x: clientX, y: clientY });
			gsap.to(outline.current, {
				x: clientX,
				y: clientY,
				duration: 0.4,
				ease: "power3.out",
			});
		};

		const handleHover = () =>
			gsap.to(outline.current, { scale: 1.5, duration: 0.3 });
		const handleUnhover = () =>
			gsap.to(outline.current, { scale: 1, duration: 0.3 });

		window.addEventListener("mousemove", moveCursor);

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
	}, [isDesktop]);

	// Only render the divs if we are on a desktop-sized screen
	if (!isDesktop) return null;

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
