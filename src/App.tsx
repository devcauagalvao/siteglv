import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import CookieConsent from "./layout/CookieConsent";
import { Instagram, Facebook, Phone } from "lucide-react";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import CustomizeService from "./pages/custom/CustomizeSoftware";
import CustomizePage from "./pages/custom/CustomizePage";
import CustomizeServer from "./pages/custom/CustomizeServer";
import { USERS } from "./utils/constants";
import { formatPhone } from "./utils/formatting";

const AIAssistant = React.lazy(() => import("./features/assistant/AIAssistant"));

const UserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const user = id ? USERS[id as keyof typeof USERS] : undefined;

  if (!id || !user) {
    return (
      <section className="min-h-screen relative overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        <div className="relative z-0 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Usuário não encontrado</h2>
          <p className="text-white/70 mb-6">Verifique o link ou entre em contato para obter suporte.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full"
          >
            Voltar para a Home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="relative z-0 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.avatar || "/img/branding/logohorizontal.png"}
            alt={`Avatar de ${user.name}`}
            className="w-56 h-56 md:w-72 md:h-72 rounded-full object-cover bg-white/10 border border-white/20 shadow-lg"
          />
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-white">{user.name}</h1>
          {user.role && <p className="mt-2 text-white/70 text-lg">{user.role}</p>}

          {user.phone && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/10 border border-blue-500/40 text-white text-2xl md:text-3xl font-semibold">
                <Phone className="w-6 h-6 text-blue-400" />
                {formatPhone(user.phone)}
              </span>
              <a
                href={`https://wa.me/${user.phone}?text=${encodeURIComponent(`Olá ${user.name}, podemos conversar?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-5 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition"
              >
                Entrar em contato
              </a>
            </div>
          )}

          {/* Botões de redes sociais */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="https://www.facebook.com/share/1C5sz1Lqko/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </a>
            <a
              href="https://www.instagram.com/glv_informatica?igsh=ZmI0d2ppamFldmps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:shadow-pink-500/30 transition"
            >
              <Instagram className="w-5 h-5" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

function App() {
  useEffect(() => {
    const scrollToHash = () => {
      const { hash } = window.location;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
      }
    };
    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<><Home /><Footer /></>} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/personalizar/redes-servidores" element={<CustomizeServer />} />
          <Route path="/personalizar/:slug" element={<CustomizeService />} />
          <Route path="/personalizar/site-landing" element={<CustomizePage />} />
          <Route path="/:id" element={<UserPage />} />
        </Routes>
        <CookieConsent />
        <Suspense fallback={null}>
          <AIAssistant />
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
