import Hero from "../sections/Hero";
import About from "../sections/About";
import Services from "../sections/Services";
import Portfolio from "../sections/Portfolio";
import Store from "../sections/Store";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";
import ScrollReveal from "../components/ScrollReveal";

const Home = () => {
  return (
    <>
      <ScrollReveal y={16} duration={0.55}>
        <Hero />
      </ScrollReveal>
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      <ScrollReveal>
        <About />
      </ScrollReveal>
      <ScrollReveal>
        <Portfolio />
      </ScrollReveal>
      <ScrollReveal>
        <Store />
      </ScrollReveal>
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <Contact />
      </ScrollReveal>
    </>
  );
};

export default Home;
