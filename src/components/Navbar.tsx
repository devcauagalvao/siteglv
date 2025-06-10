import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Loja', href: '#store' },
    { name: 'Clientes', href: '#testimonials' },
    { name: 'Contato', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'backdrop-blur-md bg-black/30 border-b border-white/10 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo com imagem */}
          <motion.a
            href="#home"
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src="/public/img/glvfundotransparente.png" // certifique-se de ter logo.png em /public
              alt="Logo da GLV"
              className="h-24 w-auto object-contain"
            />
          </motion.a>

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
          <button
            aria-label="Abrir menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
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
