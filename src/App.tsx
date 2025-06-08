import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Store from './components/Store';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import AIAssistant from './components/AIAssistant';
import  Plans from './components/Plans';

function App() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Plans />
      <Portfolio />
      <Store />
      <Testimonials />
      <Contact />
      <Footer />
      <CookieConsent />
      <AIAssistant />
      
    </div>
  );
}

export default App;