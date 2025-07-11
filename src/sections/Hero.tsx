import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ParticleBackground from "../ui/ParticleBackground";
import { Helmet } from "react-helmet";

const Hero = () => {
  const words = [
    "sites.",
    "softwares.",
    "aplicativos.",
    "suporte técnico.",
    "manutenção.",
    "automação.",
  ];

  const [wordIndex, setWordIndex] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let isDeleting = false;
    let typingIndex = 0;
    let currentWordIndex = 0;
    let typingTimeout: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentWord = words[currentWordIndex];
      const visibleText = currentWord.substring(0, typingIndex);

      if (wordRef.current) {
        wordRef.current.innerText = visibleText;
      }

      if (!isDeleting) {
        if (typingIndex < currentWord.length) {
          typingIndex++;
          typingTimeout = setTimeout(type, 100);
        } else {
          isDeleting = true;
          const delay = currentWord === "" ? 500 : 2000;
          typingTimeout = setTimeout(type, delay);
        }
      } else {
        if (typingIndex > 0) {
          typingIndex--;
          typingTimeout = setTimeout(type, 50);
        } else {
          isDeleting = false;
          currentWordIndex = (currentWordIndex + 1) % words.length;
          setWordIndex(currentWordIndex);
          typingTimeout = setTimeout(type, 500);
        }
      }
    };

    type();

    return () => clearTimeout(typingTimeout);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          GLV Informática | Software Personalizado e Suporte Técnico em Itu
        </title>
        <meta
          name="description"
          content="GLV Informática oferece desenvolvimento de sites, softwares personalizados, aplicativos, suporte técnico e automação para escalar seu negócio em Itu e região."
        />
        <meta
          name="keywords"
          content="software personalizado, desenvolvimento de sites, suporte técnico, automação, manutenção de computadores, aplicativos, TI em Itu"
        />
        <meta name="author" content="GLV Informática" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      <header
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
        role="banner"
        aria-label="Seção principal - GLV Informática"
      >
        <ParticleBackground />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />

        <div className="relative z-0 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6"
          >
            <img
              src="/img/branding/logohorizontal.png"
              alt="Logo da GLV Informática - Soluções em Tecnologia"
              className="h-10 md:h-20 lg:h-20 object-contain mx-auto"
              loading="lazy"
            />
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-2xl md:text-4xl lg:text-5xl font-light text-white mb-4"
          >
            Desenvolvemos soluções em{" "}
            <span
              className="inline-flex items-center font-semibold text-blue-500 ml-1"
              aria-live="polite"
              aria-atomic="true"
              aria-relevant="text"
              role="text"
              ref={wordRef}
            />
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl leading-relaxed"
          >
            Software personalizado, infraestrutura e suporte técnico para
            escalar seu negócio!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex items-center gap-4 justify-center"
          >
            <motion.a
              href="https://wa.me/5511919167653"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-2xl shadow-blue-500/30 border border-blue-400/30 text-center"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
                borderColor: "rgba(59, 130, 246, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Solicitar orçamento personalizado via WhatsApp"
            >
              Solicitar Orçamento Personalizado
            </motion.a>
          </motion.div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 w-full flex justify-center z-0"
      >
        <div className="animate-bounce">
          <svg
            className="w-10 h-10 text-blue-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </motion.div>
    </>
  );
};

export default Hero;
