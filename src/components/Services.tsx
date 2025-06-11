import React from "react";
import { motion } from "framer-motion";
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
    },
    {
      icon: Brain,
      title: "Automação & IA",
      description:
        "Soluções inteligentes para otimizar processos e aumentar produtividade",
      features: ["Chatbots", "RPA", "Machine Learning", "Análise de Dados"],
    },
    {
      icon: Wrench,
      title: "Montagem & Manutenção",
      description:
        "Montagem de PCs, upgrades e manutenção técnica especializada",
      features: ["PCs Gamers", "Workstations", "Upgrades", "Diagnóstico"],
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
    },
  ];

  return (
    <section id="services" className="py-20 relative overflow-hidden">
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
            <span className="text-white">Nossos </span>
            <span className="text-[#3B82F6]">Serviços</span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Soluções completas em tecnologia para impulsionar seu negócio ao
            próximo nível
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group h-full"
            >
              <div className="h-full backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 mb-6 group-hover:shadow-lg group-hover:shadow-blue-500/40 transition-all duration-300">
                  <service.icon className="h-8 w-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
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

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
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
