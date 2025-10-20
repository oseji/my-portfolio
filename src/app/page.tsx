import Header from "./components/Header";
import HeroSection from "./components/Herosection";
import Projects from "./components/Projects";
import AboutMe from "./components/AboutMe";

export default function Home() {
	return (
		<div>
			<Header />
			<HeroSection />
			<Projects />
			<AboutMe />
		</div>
	);
}
