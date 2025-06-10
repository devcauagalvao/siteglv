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
import Plans from './components/Plans';

const GlobalScrollbarStyle = () => (
  <style>{`
    /* Scrollbar futurista pílula neon azul com fundo transparente */

    /* Webkit browsers */
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
      background: transparent;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
      margin: 6px 0;
    }

    ::-webkit-scrollbar-thumb {
      background: #00bfff;
      border-radius: 9999px;
      border: 3px solid transparent;
      background-clip: content-box;
      box-shadow:
        0 0 10px #00bfff,
        0 0 20px #00bfff,
        0 0 30px #00e0ff,
        0 0 40px #00e0ff;
      transition: box-shadow 0.3s ease, background-color 0.3s ease;
      opacity: 0.8;
      cursor: pointer;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #33ccff;
      box-shadow:
        0 0 15px #33ccff,
        0 0 30px #33ccff,
        0 0 40px #66ddff,
        0 0 50px #66ddff;
      opacity: 1;
    }

    /* Firefox */
    html {
      scrollbar-width: thin;
      scrollbar-color: #00bfff transparent;
    }

    /* Aparecer scrollbar só ao hover/scroll no Webkit */
    ::-webkit-scrollbar-thumb {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    body:hover ::-webkit-scrollbar-thumb,
    body:active ::-webkit-scrollbar-thumb,
    ::-webkit-scrollbar-thumb:active {
      opacity: 0.8;
    }
  `}</style>
);

function App() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <GlobalScrollbarStyle />
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
