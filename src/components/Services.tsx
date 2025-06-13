import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  Server,
  Wrench,
  Brain,
  Smartphone,
  Cloud,
  Shield,
  Headphones,
} from "lucide-react";

const Services = () => {
  // Serviços com categorias e um serviço destacado (highlighted: true)
  const services = [
    {
      icon: Code,
      title: "Desenvolvimento de Software",
      description:
        "Sistemas web personalizados e aplicações sob medida para seu negócio",
      features: ["Aplicações Web", "Sistemas ERP", "E-commerce", "APIs REST"],
      category: "Desenvolvimento",
      highlighted: true,
    },
    {
      icon: Smartphone,
      title: "Aplicativos Mobile",
      description:
        "Apps nativos e híbridos para iOS e Android com performance otimizada",
      features: [
        "React Native",
        "Flutter",
        "Progressive Web Apps",
        "App Store Deploy",
      ],
      category: "Desenvolvimento",
    },
    {
      icon: Server,
      title: "Infraestrutura & Cloud",
      description:
        "Setup de servidores, migração cloud e gerenciamento de redes",
      features: [
        "AWS/Azure Setup",
        "Migração Cloud",
        "Backup & Recovery",
        "Monitoramento",
      ],
      category: "Infraestrutura",
    },
    {
      icon: Brain,
      title: "Automação & IA",
      description:
        "Soluções inteligentes para otimizar processos e aumentar produtividade",
      features: ["Chatbots", "RPA", "Machine Learning", "Análise de Dados"],
      category: "IA",
    },
    {
      icon: Wrench,
      title: "Montagem & Manutenção",
      description:
        "Montagem de PCs, upgrades e manutenção técnica especializada",
      features: ["PCs Gamers", "Workstations", "Upgrades", "Diagnóstico"],
      category: "Infraestrutura",
    },
    {
      icon: Shield,
      title: "Segurança Digital",
      description: "Proteção completa contra ameaças digitais e compliance",
      features: [
        "Firewall Setup",
        "Antivírus Corporativo",
        "LGPD Compliance",
        "Auditorias",
      ],
      category: "Infraestrutura",
    },
    {
      icon: Cloud,
      title: "Backup & Storage",
      description:
        "Soluções de backup automatizado e armazenamento seguro na nuvem",
      features: [
        "Backup Automático",
        "Storage em Nuvem",
        "Sincronização",
        "Versionamento",
      ],
      category: "Infraestrutura",
    },
    {
      icon: Headphones,
      title: "Suporte Técnico",
      description:
        "Atendimento remoto e presencial com técnicos especializados",
      features: [
        "Suporte Remoto",
        "Visitas Técnicas",
        "SLA Garantido",
        "24/7 Disponível",
      ],
      category: "Infraestrutura",
    },
  ];

  // Categorias dinâmicas extraídas dos serviços + "Todos"
  const categories = ["Todos", ...new Set(services.map((s) => s.category))];

  // Estado da categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // Filtra serviços conforme categoria selecionada
  const filteredServices =
    selectedCategory === "Todos"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Nossos </span>
            <span className="text-[#3B82F6]">Serviços</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Soluções completas em tecnologia para impulsionar seu negócio ao
            próximo nível
          </p>
        </motion.div>

        {/* Filtro por categoria */}
        <div className="flex justify-center mb-12 flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors
                ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white/20 text-white hover:bg-blue-500/80"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid com animação suave no filtro */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group h-full relative border rounded-2xl p-6
                  ${
                    service.highlighted
                      ? "border-blue-500 shadow-2xl shadow-blue-500/40"
                      : "border-white/10"
                  }
                  backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5
                  hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500
                `}
              >
                {service.highlighted && (
                  <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow">
                    Destaque
                  </span>
                )}

                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/70 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      <span className="text-sm text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="backdrop-blur-lg bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Precisa de uma solução personalizada?
            </h3>
            <p className="text-white/80 mb-8 text-lg">
              Nossa equipe está pronta para desenvolver a solução perfeita para
              seu negócio
            </p>
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-4 rounded-full text-lg font-semibold shadow-2xl shadow-blue-500/30 border border-blue-400/30"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Falar com Especialista
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
