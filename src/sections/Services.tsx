import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Brain, Wrench, Server } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Sistemas Personalizados",
    description:
      "Soluções sob medida em web/mobile com design moderno e performance garantida.",
    features: [
      "React, Laravel, Node.js",
      "Painéis com login e APIs",
      "Banco de dados SQL/NoSQL",
      "Visual refinado com Tailwind",
    ],
    category: "Desenvolvimento",
    highlighted: true,
  },
  {
    icon: Code,
    title: "Landing Pages & Sites",
    description:
      "Criação de sites institucionais e páginas de vendas otimizadas para resultados.",
    features: [
      "Design responsivo",
      "Alto índice de conversão",
      "SEO e performance",
      "Hospedagem otimizada",
    ],
    category: "Desenvolvimento",
  },
  {
    icon: Code,
    title: "Automação & IA",
    description:
      "Bots, integrações e IA para automação de tarefas e decisões inteligentes.",
    features: [
      "Integração com APIs",
      "OpenAI, RPA e chatbots",
      "Análise de dados",
      "Ferramentas autônomas",
    ],
    category: "Desenvolvimento",
  },
  {
    icon: Brain,
    title: "Consultoria em TI",
    description:
      "Aconselhamento técnico e estratégico para escalar sua empresa com tecnologia.",
    features: [
      "Planejamento de sistemas",
      "Validação de produtos",
      "Otimização de processos",
      "Visão técnica + estratégica",
    ],
    category: "Consultoria",
  },
  {
    icon: Brain,
    title: "Arquitetura e Modernização",
    description:
      "Transformamos sistemas legados em soluções modernas, escaláveis e seguras.",
    features: [
      "Reengenharia de software",
      "Escalabilidade e performance",
      "Segurança avançada",
      "Code review e refatoração",
    ],
    category: "Consultoria",
  },
  {
    icon: Wrench,
    title: "Manutenção de Computadores",
    description:
      "Montagem, upgrades e suporte técnico especializado para seu setup.",
    features: [
      "Montagem de PCs profissionais",
      "Upgrades sob medida",
      "Instalação de software original",
      "Diagnóstico técnico completo",
    ],
    category: "Manutenção",
  },
  {
    icon: Server,
    title: "Redes & Servidores",
    description:
      "Projetos completos de infraestrutura com alta disponibilidade e segurança.",
    features: [
      "Cabeamento estruturado",
      "Firewall, switches e Wi-Fi",
      "Montagem de racks e servidores",
      "Backup e rede local",
    ],
    category: "Infraestrutura",
  },
];

const categories = ["Todos", ...new Set(services.map((s) => s.category))];

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const filteredServices =
    selectedCategory === "Todos"
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="services"
      className="py-24 bg-black text-white relative z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Nossos <span className="text-blue-500">Serviços</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-lg">
            Soluções digitais completas para transformar e escalar seu negócio
            com tecnologia de alto nível.
          </p>
        </motion.div>

        {/* Filtro de categorias */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-300
                ${selectedCategory === cat
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white/10 text-white border-white/10 hover:bg-blue-600/30"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards de serviços */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                whileHover={{ scale: 1.02 }}
                className={`p-6 rounded-2xl border bg-white/10 backdrop-blur-xl border-white/20 shadow-md
                  ${service.highlighted
                    ? "border-blue-400 bg-white/20 hover:shadow-blue-500/30"
                    : "hover:bg-white/15 hover:border-white/30"
                  }`}
              >
                <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400/70 shadow-lg">
                  <service.icon className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-sm text-white/80 mb-4">{service.description}</p>
                <ul className="text-sm text-white/70 space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-blue-600/20 border border-blue-500/30 rounded-2xl p-8 md:p-12 shadow-xl shadow-blue-500/10">
            <h3 className="text-3xl font-bold text-white mb-3">
              Tem um projeto em mente?
            </h3>
            <p className="text-gray-300 text-lg mb-6 max-w-xl mx-auto">
              Fale agora com nossos especialistas e transforme sua ideia em uma
              solução digital poderosa.
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
