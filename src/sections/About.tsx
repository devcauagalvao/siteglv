import React from "react";
import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Missão",
      description:
        "Transformar ideias em soluções tecnológicas inovadoras que impulsionam o crescimento dos nossos clientes.",
    },
    {
      icon: Users,
      title: "Valores",
      description:
        "Transparência, excelência técnica e atendimento personalizado são os pilares da nossa empresa.",
    },
    {
      icon: Lightbulb,
      title: "Visão",
      description:
        "Ser referência em soluções tecnológicas personalizadas para empresas de todos os portes.",
    },
    {
      icon: Award,
      title: "Experiência",
      description:
        "Mais de uma década desenvolvendo soluções que fazem a diferença no mercado brasileiro.",
    },
  ];

  const milestones = [
    { year: "2022", event: "Fundação da GLV Informática" },
    { year: "2023", event: "Migração para soluções cloud " },
    { year: "2024", event: "Expansão para desenvolvimento mobile" },
    { year: "2025", event: "Implementação de IA e automação" },
    { year: "2025", event: "Certificação em tecnologias emergentes" },
  ];

  return (
    <section id="about" className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-white">Sobre a </span>
            <span className="text-[#3B82F6]">GLV</span>
          </h2>
          <p className="text-base sm:text-lg text-white/80 max-w-xl sm:max-w-3xl mx-auto px-2 sm:px-0">
            Construindo o futuro digital através de soluções tecnológicas
            inovadoras e suporte especializado.
          </p>
        </motion.div>

        {/* Cards com Liquid Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="h-full backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-blue-500/40 transition-all duration-300 shadow-lg">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                  <value.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">
                  {value.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline com Liquid Glass */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-white mb-8 sm:mb-12">
            Nossa <span className="text-[#3B82F6]">Jornada</span>
          </h2>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-transparent" />

            <div className="space-y-8 md:space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex flex-col md:flex-row items-center md:items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >
                  {/* Conteúdo do texto */}
                  <div
                    className={`w-full md:w-1/2 mb-4 md:mb-0
        ${index % 2 === 0
                        ? "md:pr-8 md:text-right text-center"
                        : "md:pl-8 md:text-left text-center"
                      }`}
                  >
                    <div>
                      <div className="text-xl sm:text-4xl font-bold text-blue-400 mb-1 sm:mb-2">
                        {milestone.year}
                      </div>
                      <div className="text-white/80 text-base sm:text-lg">
                        {milestone.event}
                      </div>
                    </div>
                  </div>

                  {/* Bolinha azul aparece só no desktop */}
                  <div className="relative z-10 hidden md:flex justify-center md:justify-center w-full md:w-auto mb-0 md:mb-0">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-black shadow-lg shadow-blue-500/30" />
                  </div>

                  <div className="hidden md:block w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
