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

  const categories = ["Todos", ...new Set(services.map((s) => s.category))];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredServices =
    selectedCategory === "Todos"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-24 bg-black text-white relative z-0 overflow-hidden">
      {/* Gradiente ocupa toda a seção atrás */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Nossos <span className="text-blue-500">Serviços</span>
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            Soluções completas para transformar e escalar seu negócio com
            tecnologia de ponta.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors duration-300
                ${selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white/10 text-white border-white/10 hover:bg-blue-600/30"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.03 }}
                className={`p-6 rounded-2xl border bg-white/10 backdrop-blur-md border-white/30 transition-all
  ${service.highlighted
                    ? "border-blue-400 bg-white/20 hover:shadow-blue-400/30 hover:shadow-lg"
                    : "hover:bg-white/20 hover:border-white/40 hover:shadow-white/30 hover:shadow-lg"
                  }`}
              >
                <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400/70 backdrop-blur-sm shadow-md">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-white/80 mb-4">{service.description}</p>
                <ul className="text-sm text-white/70 space-y-2">
                  {service.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-blue-600/20 border border-blue-500/30 rounded-2xl p-8 md:p-12 shadow-xl shadow-blue-500/10">
            <h3 className="text-3xl font-bold text-white mb-3">
              Tem um projeto especial em mente?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-xl mx-auto">
              Desenvolvemos soluções sob medida com foco em resultado. Fale com
              nosso especialista agora mesmo.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold text-base"
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