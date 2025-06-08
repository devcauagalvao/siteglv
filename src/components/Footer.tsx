import React from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Github,
  MessageCircle,
  Code,
  Server,
  Smartphone,
  Shield
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Serviços',
      links: [
        { name: 'Desenvolvimento Web', href: '#services', icon: Code },
        { name: 'Apps Mobile', href: '#services', icon: Smartphone },
        { name: 'Infraestrutura', href: '#services', icon: Server },
        { name: 'Segurança Digital', href: '#services', icon: Shield }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre Nós', href: '#about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Depoimentos', href: '#testimonials' },
        { name: 'Loja', href: '#store' }
      ]
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Contato', href: '#contact' },
        { name: 'WhatsApp', href: 'https://wa.me/5511919167653', external: true },
        { name: 'Política de Privacidade', href: '#privacy' },
        { name: 'Termos de Uso', href: '#terms' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/glv_informatica/', color: 'hover:text-pink-400' },
    { icon: Facebook, href: 'https://www.facebook.com/GLVinformatica/', color: 'hover:text-blue-400' },
    { icon: Github, href: 'https://github.com/GLV-informatica', color: 'hover:text-gray-300' },
    { icon: MessageCircle, href: 'https://wa.me/5511919167653', color: 'hover:text-green-400' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'glvinformatica2024@gmail.com'},
    { icon: Phone, text: '+55 (11) 91916-7653' },
    { icon: MapPin, text: 'Itu  , SP - Brasil' }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Background with Matrix Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Floating Dots Pattern */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl w-12 h-12 animate-pulse opacity-50" />
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-3 shadow-2xl shadow-blue-500/30">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent">
                  GLV Informática
                </h3>
                <p className="text-white/60 text-sm">Soluções do Futuro</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/70 mb-6 leading-relaxed">
              Transformando ideias em soluções tecnológicas inovadoras. 
              Software personalizado, infraestrutura cloud e suporte técnico especializado.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-3 text-white/70"
                  whileHover={{ x: 5, color: '#60A5FA' }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: (sectionIndex + 1) * 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <motion.a
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : ''}
                      className="flex items-center space-x-2 text-white/70 hover:text-blue-400 transition-colors duration-200 group"
                      whileHover={{ x: 5 }}
                    >
                      {link.icon && (
                        <link.icon className="h-4 w-4 text-blue-400/60 group-hover:text-blue-400 transition-colors duration-200" />
                      )}
                      <span>{link.name}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-8"
        />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white/60 text-sm"
          >
            <p>© {currentYear} GLV Informática e Desenvolvimento. Todos os direitos reservados.</p>
            <p className="mt-1">CNPJ: 00.000.000/0001-00 - Empresa registrada no Brasil</p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <span className="text-white/60 text-sm mr-4">Siga-nos:</span>
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 text-white/70 transition-all duration-300 ${social.color} hover:border-current hover:scale-110 hover:shadow-lg hover:shadow-current/30`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="h-5 w-5" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Back to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-40 p-3 rounded-full backdrop-blur-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 hover:text-white transition-all duration-300 shadow-lg shadow-blue-500/20"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↑
          </motion.div>
        </motion.button>
      </div>

      {/* Glow Effects */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
    </footer>
  );
};

export default Footer;