import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Services from "../components/sections/Services";
import Plans from "../components/sections/Plans";
import Portfolio from "../components/sections/Portfolio";
import Store from "../components/sections/Store";
import Testimonials from "../components/sections/Testimonials";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Plans />
      <Portfolio />
      <Store />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
