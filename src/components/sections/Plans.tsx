import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Star, Zap } from "lucide-react";
import { plans } from "../../data/plans";

const Plans = () => {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  const handlePlanSelect = (planId: string) => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="plans"
      className="relative py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-black" />

      <div ref={ref} className="max-w-7xl mx-auto text-center relative z-10">
        <motion.h2
          className="text-white text-5xl md:text-6xl font-extrabold mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.8 }}
        >
          Planos de{" "}
          <span className="text-blue-500">
            Suporte
          </span>
        </motion.h2>

        <motion.p
          className="max-w-3xl mx-auto text-gray-300 text-lg mb-16"
          initial={{ y: 40, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Escolha o plano ideal para sua empresa e tenha o suporte técnico que
          seu negócio merece
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan, i) => {
            const isHighlighted = plan.highlighted;

            return (
              <motion.div
                key={plan.id}
                className={`relative rounded-3xl p-8 bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between shadow-lg transition-transform duration-300 ${isHighlighted
                  ? "scale-105 border-blue-500 shadow-blue-600/50 z-20"
                  : "hover:scale-105 hover:border-white/40"
                  }`}
                initial={{ y: 50, opacity: 0 }}
                animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
                transition={{ delay: i * 0.2, duration: 0.7 }}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-blue-500 text-white font-semibold text-sm flex items-center space-x-1 shadow-lg shadow-blue-600/50 z-30">
                    <Star className="w-4 h-4" />
                    <span>Mais Popular</span>
                  </div>
                )}

                <div>
                  <h3 className="text-white text-3xl font-bold mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-300 text-sm mb-6">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline justify-center gap-1 mb-8">
                    <span className="text-white text-5xl font-extrabold">
                      R${plan.price}
                    </span>
                    <span className="text-gray-400 text-lg">
                      /{plan.period}
                    </span>
                  </div>

                  <ul className="space-y-4 text-left">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-center space-x-3 text-gray-300"
                        initial={{ x: -20, opacity: 0 }}
                        animate={hasAnimated ? { x: 0, opacity: 1 } : undefined}
                        transition={{
                          delay: i * 0.15 + idx * 0.1,
                          duration: 0.4,
                        }}
                      >
                        <Check className="w-5 h-5 text-blue-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <motion.button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`mt-10 w-full py-4 rounded-full font-semibold text-lg transition-all duration-300 ${isHighlighted
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-600/50 hover:shadow-blue-700/70"
                    : "bg-white/20 text-white hover:bg-white/30"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Selecionar plano ${plan.name}`}
                >
                  {plan.buttonText}
                </motion.button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-20 max-w-3xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8"
          initial={{ y: 40, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Zap className="w-10 h-10 text-blue-500 flex-shrink-0" />
            <div className="text-center md:text-left">
              <h3 className="text-white text-2xl font-bold mb-2">
                Precisa de Algo Personalizado?
              </h3>
              <p className="text-gray-300 max-w-md mx-auto md:mx-0">
                Oferecemos soluções customizadas para empresas com necessidades
                específicas. Entre em contato para discutir um plano sob medida.
              </p>
            </div>
          </div>

          <motion.button
            onClick={() =>
              document
                .querySelector("#contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="mt-8 w-full md:w-auto px-10 py-3 rounded-full bg-blue-500 text-white font-semibold shadow-lg shadow-blue-600/50 hover:shadow-blue-700/70 transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Solicitar orçamento personalizado"
          >
            Solicitar Orçamento Personalizado
          </motion.button>
        </motion.div>

        <motion.p
          className="text-gray-400 text-sm mt-12 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={hasAnimated ? { opacity: 1 } : undefined}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          * Todos os planos incluem setup gratuito e podem ser cancelados a
          qualquer momento.
          <br />
          Entre em contato para conhecer nossos descontos anuais.
        </motion.p>
      </div>
    </section>
  );
};

export default Plans;