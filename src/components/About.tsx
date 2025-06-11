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
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Sobre a </span>
            <span className="text-[#3B82F6]">GLV</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Construindo o futuro digital através de soluções tecnológicas
            inovadoras e suporte especializado
          </p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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
              <div className="h-full backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                  <value.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            Nossa Jornada
          </h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-500 to-transparent" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8"
                    }`}
                  >
                    <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300">
                      <div className="text-2xl font-bold text-blue-400 mb-2">
                        {milestone.year}
                      </div>
                      <div className="text-white/80">{milestone.event}</div>
                    </div>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-black shadow-lg shadow-blue-500/30" />
                  </div>
                  <div className="w-1/2" />
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
