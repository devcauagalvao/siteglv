import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      setIsScrolled(scrollTop > 50);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Sobre", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Serviços", href: "#services" },
    { name: "Planos", href: "#plans" },
    { name: "Loja", href: "#store" },
    { name: "Clientes", href: "#testimonials" },
    { name: "Contato", href: "#contact" },
  ];

  const scrollToTop = () => {
    const totalSteps = 30;
    let currentStep = 0;
    const startProgress = scrollProgress;

    const interval = setInterval(() => {
      currentStep++;
      const newProgress = startProgress * (1 - currentStep / totalSteps);
      setScrollProgress(newProgress);

      if (currentStep >= totalSteps) {
        clearInterval(interval);
      }
    }, 10);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo com transformação */}
        <motion.div
          className="relative cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={isScrolled ? scrollToTop : undefined}
        >
          {isScrolled ? (
            <div className="relative w-10 h-10">
              {/* Círculo de progresso */}
              <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 40 40"
              >
                <circle
                  cx="20"
                  cy="20"
                  r="18"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 18}
                  strokeDashoffset={(1 - scrollProgress) * 2 * Math.PI * 18}
                  style={{
                    transition: "stroke-dashoffset 0.2s ease, stroke 0.2s ease",
                  }}
                />
              </svg>

              {/* Ícone da seta */}
              <ArrowUp className="text-blue-500 absolute inset-0 m-auto w-5 h-5" />
            </div>
          ) : (
            <h1 className="text-xl font-extrabold tracking-wide flex items-center gap-1">
              <span className="text-blue-500">GLV</span>
            </h1>
          )}
        </motion.div>

        {/* Navegação desktop */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              className="text-white/80 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 px-1 relative group"
              whileHover={{ y: -2 }}
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full shadow hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicitar Orçamento
          </motion.a>
        </div>

        {/* Botão mobile */}
        <label className="md:hidden flex flex-col gap-2 w-8 cursor-pointer z-50 relative">
          <input
            type="checkbox"
            className="peer hidden"
            title="Menu"
            onChange={(e) => setIsMobileMenuOpen(e.target.checked)}
            checked={isMobileMenuOpen}
          />
          <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]"></div>
          <div className="rounded-2xl h-[3px] w-full bg-white duration-500 peer-checked:-rotate-45"></div>
          <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]"></div>
        </label>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden backdrop-blur-lg bg-black/90 border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-white/80 hover:text-blue-400 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-full"
              >
                Solicitar Orçamento
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
