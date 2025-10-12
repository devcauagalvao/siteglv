import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import CookieConsent from "./layout/CookieConsent";
import AIAssistant from "./features/assistant/AIAssistant";
import Home from "./pages/Home";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento da página
    const timer = setTimeout(() => setLoading(false), 3000); // 1,5s
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    const scrollToHash = () => {
      const { hash } = window.location;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) {
        // Delay to ensure sections are in the DOM after route render
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
      }
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, [loading]);

  if (loading) return <Loader />;

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
        <CookieConsent />
        <AIAssistant />
      </Router>
    </div>
  );
}

export default App;
