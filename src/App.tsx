import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/layout/CookieConsent";
import AIAssistant from "./components/features/AIAssistant";
import Home from "./pages/Home";

function App() {
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
