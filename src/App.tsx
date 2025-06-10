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
    /* Scrollbar combinada: futurista neon azul com toque vermelho */

    ::-webkit-scrollbar {
      width: 10px; /* largura conforme seu código */
      height: 10px;
      background: transparent;
    }

    ::-webkit-scrollbar-track {
      background: #1C1C1C; /* fundo escuro como no seu código */
      margin: 6px 0;
      border-radius: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: #ff0000; /* vermelho do seu código */
      border-radius: 10px; /* pílula */
      border: 3px solid transparent;
      background-clip: content-box;
      box-shadow:
        0 0 10px #ff0000,
        0 0 20px #ff0000,
        0 0 30px #ff4444,
        0 0 40px #ff6666;
      transition: box-shadow 0.3s ease, background-color 0.3s ease;
      opacity: 0.8;
      cursor: pointer;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555; /* hover escuro conforme seu código */
      box-shadow:
        0 0 15px #555,
        0 0 30px #777,
        0 0 40px #999,
        0 0 50px #bbb;
      opacity: 1;
    }

    /* Firefox */
    html {
      scrollbar-width: thin;
      scrollbar-color:rgb(0, 162, 255) #1C1C1C; /* vermelho e fundo escuro */
    }

    /* Scrollbar thumb aparece só ao hover (webkit) */
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
