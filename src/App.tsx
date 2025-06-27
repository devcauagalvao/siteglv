import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import CookieConsent from "./layout/CookieConsent";
import AIAssistant from "./features/assistant/AIAssistant";
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
