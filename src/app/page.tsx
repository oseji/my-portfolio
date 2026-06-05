import Header from "./components/Header";
import HeroSection from "./components/Herosection";
import Projects from "./components/Projects";
import AboutMe from "./components/AboutMe";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";

export default function Home() {
	return (
		<div>
			<Header />
			<HeroSection />
			<Projects />
			<AboutMe />
			<ContactMe />
			<Footer />
		</div>
	);
}
