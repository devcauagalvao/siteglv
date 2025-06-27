import React from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Github,
  MessageCircle,
  Code,
  Server,
  Smartphone,
  Shield,
  Youtube,
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
        { name: 'Segurança Digital', href: '#services', icon: Shield },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre Nós', href: '#about' },
        { name: 'Portfolio', href: '#portfolio' },
        { name: 'Depoimentos', href: '#testimonials' },
        { name: 'Loja', href: '#store' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Contato', href: '#contact' },
        { name: 'WhatsApp', href: 'https://wa.me/5511919167653', external: true },
        { name: 'Política de Privacidade', href: '#privacy' },
        { name: 'Termos de Uso', href: '#terms' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/glv_informatica/', color: 'hover:text-pink-400 hover:border-pink-400' },
    { icon: Facebook, href: 'https://www.facebook.com/GLVinformatica/', color: 'hover:text-blue-400 hover:border-blue-400' },
    { icon: Github, href: 'https://github.com/GLV-informatica', color: 'hover:text-gray-300 hover:border-gray-300' },
    { icon: MessageCircle, href: 'https://wa.me/5511919167653', color: 'hover:text-green-400 hover:border-green-400' },
    { icon: Youtube, href: 'https://www.youtube.com/@GLVinformatica', color: 'hover:text-red-500 hover:border-red-500' },
  ];

  const contactInfo = [
    { icon: Mail, text: 'glvinformatica2024@gmail.com' },
    { icon: Phone, text: '+55 (11) 91916-7653' },
    { icon: MapPin, text: 'Itu, SP - Brasil' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative overflow-hidden text-white z-0">
      {/* Fundo gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900 z-0" />

      {/* Bolhas animadas */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-600 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-0 max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12"
        >
          {/* Logo e contato */}
          <div>
            <img
              src="/img/branding/logoglv.png"
              alt="GLV Informática"
              className="w-40 mb-4"
            />
            <p className="text-white/70 text-sm mb-6 leading-relaxed">
              Soluções tecnológicas sob medida para transformar o seu negócio. Inovação, performance e suporte de verdade.
            </p>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center gap-3 text-white/70 text-sm">
                  <item.icon className="h-4 w-4 text-blue-400" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {footerSections.map((section, i) => (
            <div key={i}>
              <h4 className="text-xl font-semibold mb-4 text-white/90">{section.title}</h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : '_self'}
                      rel={link.external ? 'noopener noreferrer' : ''}
                      onClick={!link.external ? (e) => handleSmoothScroll(e, link.href) : undefined}
                      className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition duration-200"
                    >
                      {link.icon && (
                        <link.icon className="h-4 w-4 text-blue-400/60" />
                      )}
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mb-8" />
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60 gap-6">
            <div className="text-center md:text-left space-y-1">
              <p>© {currentYear} GLV Informática e Desenvolvimento.</p>
              <p>CNPJ: 00.000.000/0001-00 - Empresa registrada no Brasil</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="mr-2">Siga-nos:</span>
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-white/10 border border-transparent transition-all duration-300 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
