import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Monitor, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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
    { name: 'Contato', href: '#contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-lg bg-black/20 border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
           
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
              GLV Informática
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-white/80 hover:text-blue-400 transition-colors duration-200 relative group"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
            >
              Solicitar Orçamento
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden backdrop-blur-lg bg-black/90 border-b border-white/10"
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
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 rounded-full">
              Solicitar Orçamento
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;