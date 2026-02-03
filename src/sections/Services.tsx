import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Check, Zap } from "lucide-react";
import { services } from "../data/services";
import { useNavigate } from "react-router-dom";
import ServiceDetailsModal from "../components/ServiceDetailsModal";
import AutoFitText from "../components/AutoFitText";
import IAQuestionnaire from "../components/IAQuestionnaire";
import SystemQuestionnaire from "../components/SystemQuestionnaire";
import useAutoPerformanceMode from "../hooks/useAutoPerformanceMode";

const Plans = () => {
  const [ref, inView] = useInView({ threshold: 0.15 });
  const [hasAnimated, setHasAnimated] = useState(() => {
    if (typeof window === "undefined") return true;

    // Fail open on mobile / reduced motion / missing IO: don't keep content at opacity 0.
    try {
      if (window.matchMedia?.("(max-width: 768px)")?.matches) return true;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return true;
    } catch {
      // ignore
    }

    if (!("IntersectionObserver" in window)) return true;
    return false;
  });
  const [showIAQuestionnaire, setShowIAQuestionnaire] = useState(false);
  const [showSystemQuestionnaire, setShowSystemQuestionnaire] = useState(false);

  useEffect(() => {
    if (inView && !hasAnimated) setHasAnimated(true);
  }, [inView, hasAnimated]);

  const navigate = useNavigate();
  type PricedService = { price?: string | number; period?: string };
  const hasPricing = (s: any): s is PricedService =>
    s && typeof s === "object" && "price" in s;

  const [selectedService, setSelectedService] = useState<null | (typeof services)[number]>(null);
  const { enabled: performanceMode } = useAutoPerformanceMode();

  const glvMarkSizePx = 90;
  const glvMarkStyle: CSSProperties = {
    width: glvMarkSizePx,
    height: glvMarkSizePx,
    WebkitMaskImage: "url(/img/branding/GLV.svg)",
    maskImage: "url(/img/branding/GLV.svg)",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  };

  return (
    <section
      id="services"
      className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 sm:px-6 lg:px-8 overflow-x-hidden"
    >
      <div ref={ref} className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
          transition={{ duration: 0.8 }}
        >
          Serviços {" "}
          <span className="inline-flex align-middle">
            <span className="sr-only">GLV</span>
            <span aria-hidden="true" className="block bg-blue-500" style={glvMarkStyle} />
          </span>
        </motion.h2>

        <motion.p
          className="text-gray-400 text-base md:text-lg mb-12 max-w-2xl mx-auto"
          initial={{ y: 40, opacity: 0 }}
          animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Soluções inteligentes, acessíveis e completas para transformar seu negócio com tecnologia.
        </motion.p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            (() => {
              const card = (
                <motion.div
                  className={`relative w-full max-w-full min-w-0 rounded-2xl p-6 sm:p-8 bg-white/5 ${
                    performanceMode ? "" : "backdrop-blur-md"
                  } border border-white/20 shadow-md flex flex-col justify-between transition-transform duration-300 md:hover:scale-[1.03] hover:border-blue-500/40 ${
                    service.highlighted ? `border-blue-500/60 ${performanceMode ? "ring-2 ring-blue-500" : ""}` : ""
                  }`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={hasAnimated ? { y: 0, opacity: 1 } : undefined}
                  transition={{ delay: i * 0.2, duration: 0.7 }}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400/70 flex items-center justify-center shadow-lg">
                        <service.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <AutoFitText
                          text={service.title}
                          className="font-bold text-white leading-tight"
                          max={28}
                          min={14}
                          as="h3"
                        />
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-6">{service.description}</p>

                    {hasPricing(service) && service.price && (
                      <div className="flex items-baseline justify-center gap-1 mb-6">
                        <span className="text-3xl font-extrabold">
                          {service.price !== "Sob Consulta" ? `R$${service.price}` : service.price}
                        </span>
                        {service.period && <span className="text-gray-400 text-sm">/{service.period}</span>}
                      </div>
                    )}

                    <ul className="space-y-3 text-left">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <Check className="w-4 h-4 text-blue-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <motion.button
                      onClick={() => {
                        if (service.slug === "ia-aplicada") {
                          setShowIAQuestionnaire(true);
                        } else if (service.slug === "sistemas-personalizados") {
                          setShowSystemQuestionnaire(true);
                        } else if (service.slug === "landing-pages-sites") {
                          navigate("/personalizar/site-landing");
                        } else {
                          navigate(`/personalizar/${service.slug}`);
                        }
                      }}
                      className={`w-full py-3 rounded-full font-semibold text-base transition-all ${
                        service.highlighted
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-white/10 text-white hover:bg-white/20"
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Personalizar
                    </motion.button>
                    <motion.button
                      onClick={() => setSelectedService(service)}
                      className="w-full py-3 rounded-full font-semibold text-base transition-all bg-white/10 text-white hover:bg-white/20"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Ver Detalhes
                    </motion.button>
                  </div>
                </motion.div>
              );
              return <div key={service.slug}>{card}</div>;
            })()
          ))}
        </div>

        <motion.div
          className={`mt-16 max-w-3xl mx-auto bg-white/5 ${performanceMode ? "" : "backdrop-blur-md"} border border-white/20 rounded-2xl p-6`}
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
          <motion.a
            href="#contact"
            className="mt-6 inline-block w-full md:w-auto px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicitar Orçamento
          </motion.a>
        </motion.div>
      </div>

      {/* Modal de detalhes do serviço */}
      <ServiceDetailsModal service={selectedService} onClose={() => setSelectedService(null)} />

      {/* Modal de questionário de IA */}
      <IAQuestionnaire 
        isOpen={showIAQuestionnaire} 
        onClose={() => setShowIAQuestionnaire(false)} 
      />

      {/* Modal de questionário de Sistemas Personalizados */}
      <SystemQuestionnaire 
        isOpen={showSystemQuestionnaire} 
        onClose={() => setShowSystemQuestionnaire(false)} 
      />
    </section>
  );
};

export default Plans;
