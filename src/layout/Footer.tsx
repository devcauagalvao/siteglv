import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  X,
  FileText,
  ScrollText,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [modalContent, setModalContent] = useState<"privacy" | "terms" | null>(null);

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
        { name: 'Portfólio', href: '#portfolio' },
        { name: 'Clientes', href: '#testimonials' },
        { name: 'Softwares', href: '#store' },
      ],
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Contato', href: '#contact' },
        { name: 'WhatsApp', href: 'https://wa.me/5511919167653', external: true },
        { name: 'Política de Privacidade', modal: "privacy", icon: FileText },
        { name: 'Termos de Uso', modal: "terms", icon: ScrollText },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/glv_informatica/', color: 'hover:shadow-[0_0_15px_#e1306c]' },
    { icon: Facebook, href: 'https://www.facebook.com/GLVinformatica/', color: 'hover:shadow-[0_0_15px_#1877f2]' },
    { icon: Github, href: 'https://github.com/GLV-informatica', color: 'hover:shadow-[0_0_15px_#999]' },
    { icon: MessageCircle, href: 'https://wa.me/5511919167653', color: 'hover:shadow-[0_0_15px_#25d366]' },
    { icon: Youtube, href: 'https://www.youtube.com/@GLVinformatica', color: 'hover:shadow-[0_0_15px_#ff0000]' },
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
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-900 z-0" />

      {/* Bolhas animadas */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/50 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/50 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* GRID */}
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
              src="/img/branding/logohorizontal.png"
              alt="GLV Informática"
              className="w-44 mb-4"
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
              <h4 className="text-xl font-semibold mb-4 text-white/90 flex items-center gap-2">
                {i === 0 && <Code className="h-4 w-4 text-blue-400" />}
                {i === 1 && <Server className="h-4 w-4 text-blue-400" />}
                {i === 2 && <Shield className="h-4 w-4 text-blue-400" />}
                {section.title}
              </h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link, j) => (
                  <li key={j}>
                    {link.modal ? (
                      <button
                        onClick={() => setModalContent(link.modal as "privacy" | "terms")}
                        className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition duration-200"
                      >
                        {link.icon && <link.icon className="h-4 w-4 text-blue-400/60" />}
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        target={link.external ? '_blank' : '_self'}
                        rel={link.external ? 'noopener noreferrer' : ''}
                        onClick={!link.external ? (e) => handleSmoothScroll(e, link.href) : undefined}
                        className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition duration-200"
                      >
                        {link.icon && <link.icon className="h-4 w-4 text-blue-400/60" />}
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Linha separadora */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent mb-8 animate-pulse" />
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-white/60 gap-6">
            <div className="text-center md:text-left space-y-1">
              <p>©{currentYear} GLV Informática e Desenvolvimento.</p>
              <p>CNPJ: 61.606.358/0001-57 - Empresa registrada no Brasil</p>
            </div>
            <div className="flex items-center space-x-3">
              <span className="mr-2">Siga-nos:</span>
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full bg-white/10 border border-transparent transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* MODAL POLÍTICA / TERMOS */}
    
<AnimatePresence>
  {modalContent && (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[999]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="relative w-full max-w-3xl p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden"
      >
  
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-blue-400/30 blur-3xl animate-[spin_60s_linear_infinite]" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-blue-400/20 blur-3xl animate-[spin_90s_linear_reverse_infinite]" />

        <button
          onClick={() => setModalContent(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition"
        >
          <X className="h-6 w-6 text-red-400" />
        </button>

        {/* Título com barra lateral futurista */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-blue-400 rounded-full" />
          {modalContent === "privacy" ? (
            <h2 className="text-3xl font-bold text-blue-400 tracking-wide">
              Política de Privacidade
            </h2>
          ) : (
            <h2 className="text-3xl font-bold text-blue-400 tracking-wide">
              Termos de Uso
            </h2>
          )}
        </div>

        {/* Conteúdo com cards e ícones */}
        <div className="grid grid-cols-1 gap-6 max-h-[65vh] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-blue-400/40">
          {modalContent === "privacy" ? (
            <>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/5 flex items-start gap-3">
                <FileText className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Dados Coletados</h3>
                  <p className="text-white/70 text-sm mt-1 leading-relaxed">
                    Coletamos informações como nome, e-mail, telefone e dados de navegação, apenas para oferecer melhor experiência ao usuário.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/5 flex items-start gap-3">
                <Shield className="h-6 w-6 text-cyan-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Segurança</h3>
                  <p className="text-white/70 text-sm mt-1 leading-relaxed">
                    Protegemos seus dados com criptografia e políticas internas rígidas. Nenhum dado será vendido ou compartilhado sem autorização.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/5 flex items-start gap-3">
                <Mail className="h-6 w-6 text-pink-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Contato</h3>
                  <p className="text-white/70 text-sm mt-1 leading-relaxed">
                    Você pode solicitar exclusão ou alterações dos dados entrando em contato pelo e-mail <span className="text-blue-400">glvinformatica2024@gmail.com</span>.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/5 flex items-start gap-3">
                <Code className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Aceitação</h3>
                  <p className="text-white/70 text-sm mt-1 leading-relaxed">
                    Ao utilizar nossos serviços, você concorda integralmente com os termos descritos neste documento.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/5 flex items-start gap-3">
                <Shield className="h-6 w-6 text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Proibições</h3>
                  <p className="text-white/70 text-sm mt-1 leading-relaxed">
                    É proibido utilizar nossas soluções para fins ilícitos ou explorar falhas do sistema.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/5 flex items-start gap-3">
                <ScrollText className="h-6 w-6 text-pink-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg text-white">Alterações</h3>
                  <p className="text-white/70 text-sm mt-1 leading-relaxed">
                    Podemos atualizar estes termos periodicamente. Comunicaremos mudanças relevantes em nossos canais oficiais.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </footer>
  );
};

export default Footer;
