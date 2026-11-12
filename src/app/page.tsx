import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Journey from "@/components/Journey";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Showcase />
      <Marquee />
      <Work />
      <Stats />
      <About />
      <Journey />
      <Contact />
    </>
  );
}
