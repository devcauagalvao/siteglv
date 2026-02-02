import React from "react";
import { motion } from "framer-motion";
import Galaxy from "../components/Galaxy";
import { Helmet } from "react-helmet";
import RotatingText from "../components/RotatingText";
import Magnet from "../components/Magnet";

const Hero = () => {

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("services");
    if (target) {
      const navOffset = 64; // navbar height (~h-16)
      const y = target.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        {/* 🔹 Título otimizado com foco em IA, Cloud e Infraestrutura */}
        <title>
          Software com IA, Servidores Cloud e Infraestrutura | GLV Tecnologia
        </title>

        {/* 🔹 Descrição focada em IA e Cloud */}
        <meta
          name="description"
          content="GLV Tecnologia especialista em desenvolvimento de software com IA aplicada, servidores cloud, infraestrutura escalável e automação inteligente de processos."
        />

        {/* 🔹 Palavras-chave focadas em IA e Cloud */}
        <meta
          name="keywords"
          content="IA aplicada, software inteligente, servidores cloud, infraestrutura cloud, GLV Tecnologia, automação com IA, computação em nuvem"
        />

        <meta name="author" content="GLV Tecnologia" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* 🔹 Dados estruturados para SEO local */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "GLV Tecnologia",
            url: "https://www.glvinformatica.com.br",
            logo: "https://www.glvinformatica.com.br/img/branding/logohorizontal.png",
            sameAs: [
              "https://www.instagram.com/glvinformatica",
              "https://wa.me/5511919167653",
            ],
            address: {
              "@type": "PostalAddress",
              addressLocality: "Itu",
              addressRegion: "SP",
              addressCountry: "BR",
            },
          })}
        </script>
      </Helmet>

      <header
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
        role="banner"
        aria-label="Seção principal - GLV Tecnologia"
      >
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Galaxy
            starSpeed={0.1}
            density={0.4}
            hueShift={35}
            speed={1}
            glowIntensity={0.25}
            saturation={0}
            mouseRepulsion={false}
            repulsionStrength={2}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            transparent
          />
        </div>

        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 max-w-5xl w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-6"
          >
            <img
              src="/img/branding/logo-horizontal.svg"
              alt="GLV Tecnologia - Desenvolvimento de Software e Suporte Técnico em Itu"
              className="h-12 md:h-20 object-contain mx-auto"
              loading="lazy"
            />
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-2xl md:text-4xl lg:text-5xl font-light text-white mb-4"
          >
            Soluções inteligentes em{" "}
            <span aria-live="polite" aria-atomic="true" role="text">
              <RotatingText
                texts={['IA.', 'servidores.', 'sites.', 'aplicativos.', 'automação.', 'infraestrutura.']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-blue-600 text-white overflow-hidden font-bold py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"first"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl leading-relaxed"
          >
            Desenvolvimento de software com inteligência artificial, infraestrutura cloud escalável e servidores em nuvem para impulsionar a transformação digital do seu negócio!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="flex items-center gap-4 justify-center"
          >
            <Magnet padding={100} disabled={false} magnetStrength={10}>
              <motion.a
                href="#services"
                onClick={handleSmoothScroll}
                className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-2xl shadow-blue-500/30 border border-blue-400/30 text-center"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Descobrir soluções de IA e Cloud"
              >
                Encontrar sua solução
              </motion.a>
            </Magnet>
          </motion.div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 w-full flex justify-center z-10"
      >
        <div className="animate-bounce">
          <svg
            className="w-10 h-10 text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </motion.div>
    </>
  );
};

export default Hero;
