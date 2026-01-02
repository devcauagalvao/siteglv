import React from "react";
import Hero from "../sections/Hero";
import About from "../sections/About";
import Plans from "../sections/Plans";
import Portfolio from "../sections/Portfolio";
import Store from "../sections/Store";
import Testimonials from "../sections/Testimonials";
import Contact from "../sections/Contact";

const Home = () => {
  return (
    <>
      <Hero />
      <Plans />
      <About />
      <Portfolio />
      <Store />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
