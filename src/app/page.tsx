import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import TechStack from "@/components/TechStack";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-bg">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Metrics />
        <TechStack />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
