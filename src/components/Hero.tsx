import React from 'react'; 
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      <ParticleBackground />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl w-full">
        
        {/* Company Logo */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6"
        >
          <img 
            src="/img/logoglv.png" 
            alt="GLV Informática Logo" 
            className="h-10 md:h-20 lg:h-20 object-contain mx-auto"
          />
        </motion.h1>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-2xl md:text-4xl lg:text-5xl font-light text-white mb-4"
        >
          Soluções Tecnológicas do Futuro
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl leading-relaxed"
        >
          Software personalizado, infraestrutura e suporte técnico construídos para escalar seu negócio
        </motion.p>

        {/* CTA Button linking to WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          <motion.a
            href="https://wa.me/5511919167653"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-2xl shadow-blue-500/30 border border-blue-400/30 text-center"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
              borderColor: "rgba(59, 130, 246, 0.8)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            Solicitar Orçamento Personalizado
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
