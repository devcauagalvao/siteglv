import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Star, Zap } from "lucide-react";

const plans = [
  {
    id: "custom-web-app",
    name: "Aplicativos Web Sob Medida",
    description:
      "Transforme suas ideias em soluções digitais totalmente personalizadas, que se adaptam ao seu negócio.",
    features: [
      "Funcionalidades exclusivas para seu fluxo de trabalho",
      "Painel administrativo intuitivo e seguro",
      "Integração com sistemas e APIs existentes",
      "Arquitetura escalável para crescer junto com sua empresa",
      "Design moderno, responsivo e otimizado para todos os dispositivos",
      "Suporte e acompanhamento durante todo o projeto"
    ],
    highlighted: true,
    popular: true,
    buttonText: "Solicitar Aplicativo",
    whatsappMsg: "Olá, quero criar um aplicativo web personalizado para minha empresa. Podemos conversar?"
  },
  {
    id: "automation-system",
    name: "Automação de Processos",
    description:
      "Otimize seu tempo e aumente a produtividade automatizando tarefas repetitivas e processos internos.",
    features: [
      "Automatização de fluxos de trabalho críticos",
      "Integração com ferramentas e sistemas existentes",
      "Relatórios e dashboards em tempo real",
      "Redução de erros humanos e aumento de eficiência",
      "Suporte contínuo e ajustes conforme sua necessidade",
      "Tecnologias modernas e seguras"
    ],
    highlighted: false,
    popular: false,
    buttonText: "Solicitar Automação",
    whatsappMsg: "Olá, quero automatizar processos na minha empresa. Como podemos começar?"
  },
  {
    id: "custom-software",
    name: "Sistemas Personalizados",
    description:
      "Desenvolvemos softwares sob medida para atender exatamente às necessidades do seu negócio, sem limitações.",
    features: [
      "Funcionalidades exclusivas e escaláveis",
      "Integração com APIs, bancos de dados e ferramentas internas",
      "Segurança avançada e performance otimizada",
      "Painel administrativo fácil de usar",
      "Acompanhamento e suporte durante todo o projeto",
      "Tecnologias modernas: React, Node, FastAPI, Firebase"
    ],
    highlighted: true,
    popular: false,
    buttonText: "Solicitar Sistema",
    whatsappMsg: "Olá, quero desenvolver um sistema personalizado para minha empresa. Podemos conversar?"
  },
  {
    id: "maintenance-support",
    name: "Suporte e Manutenção Contínua",
    description:
      "Garantimos que seus sistemas funcionem sempre com performance máxima e segurança total.",
    features: [
      "Monitoramento e manutenção preventiva",
      "Correção de bugs e atualizações contínuas",
      "Suporte remoto e presencial (região definida)",
      "Consultoria estratégica de TI",
      "Checkup de segurança e performance regularmente",
      "Atendimento prioritário para sua empresa"
    ],
    highlighted: false,
    popular: false,
    buttonText: "Solicitar Suporte",
    whatsappMsg: "Olá, quero contratar suporte contínuo para meus sistemas. Pode me dar mais detalhes?"
  }
];

const Plans = () => {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) setHasAnimated(true);
  }, [inView, hasAnimated]);

  const openWhatsApp = (message) => {
    const phone = "5511919167653";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="plans"
      className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 sm:px-6 lg:px-8"
    >
      <div ref={ref} className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.8 }}
        >
          Planos <span className="text-blue-500">GLV</span>
        </motion.h2>

        <motion.p
          className="text-gray-400 text-base md:text-lg mb-12 max-w-2xl mx-auto"
          initial={{ y: 40, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Soluções inteligentes, acessíveis e completas para transformar seu negócio com tecnologia.
        </motion.p>

        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              className={`relative rounded-2xl p-8 bg-white/5 backdrop-blur-md border border-white/20 shadow-md flex flex-col justify-between transition-transform duration-300 hover:scale-[1.03] hover:border-blue-500/40 ${
                plan.highlighted ? "ring-2 ring-blue-500" : ""
              }`}
              initial={{ y: 50, opacity: 0 }}
              animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
              transition={{ delay: i * 0.2, duration: 0.7 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-white font-semibold text-sm flex items-center space-x-1 z-30">
                  <Star className="w-4 h-4" />
                  <span>Mais Popular</span>
                </div>
              )}

              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {plan.price && (
                  <div className="flex items-baseline justify-center gap-1 mb-6">
                    <span className="text-3xl font-extrabold">
                      {plan.price !== "Sob Consulta" ? `R$${plan.price}` : plan.price}
                    </span>
                    {plan.period && <span className="text-gray-400 text-sm">/{plan.period}</span>}
                  </div>
                )}

                <ul className="space-y-3 text-left">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <Check className="w-4 h-4 text-blue-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <motion.button
                onClick={() => openWhatsApp(plan.whatsappMsg)}
                className={`mt-8 w-full py-3 rounded-full font-semibold text-base transition-all ${
                  plan.highlighted
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6"
          initial={{ y: 40, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Zap className="w-8 h-8 text-blue-500" />
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">Quer algo mais personalizado?</h3>
              <p className="text-gray-400 text-sm">
                Desenvolvemos soluções sob medida para sua necessidade específica. Fale conosco.
              </p>
            </div>
          </div>

          <motion.button
            onClick={() => openWhatsApp("Olá, gostaria de um orçamento personalizado da GLV.")}
            className="mt-6 w-full md:w-auto px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicitar Orçamento
          </motion.button>
        </motion.div>

        <motion.p
          className="text-gray-500 text-xs mt-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={hasAnimated ? { opacity: 1 } : undefined}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          * Todos os planos incluem setup gratuito, suporte especializado e garantia de qualidade GLV.
        </motion.p>
      </div>
    </section>
  );
};

export default Plans;
