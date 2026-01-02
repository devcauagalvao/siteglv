import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { ServiceItem } from "../data/services";

interface ServiceDetailsModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {service && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", zIndex: 9999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 10000 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-3xl max-w-3xl w-full flex flex-col overflow-hidden shadow-lg bg-white/10 border border-white/25 p-6">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/60 rounded-full p-1.5 transition cursor-pointer z-50"
              >
                <X size={24} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400/70 flex items-center justify-center shadow-lg">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{service.title}</h2>
              </div>

              {/* Description */}
              <p className="text-white/80 mb-4">{service.longDescription || service.description}</p>

              <div className="grid grid-cols-1 gap-6 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400/40">
                {/* O que entregamos */}
                {service.offerings && service.offerings.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">O que está incluso</h3>
                    <div className="grid gap-2">
                      {service.offerings.map((item, idx) => (
                        <div key={idx} className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/5 flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                          <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Para quem é */}
                {service.audience && service.audience.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">Para quem é</h3>
                    <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                      {service.audience.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Benefícios */}
                {service.benefits && service.benefits.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">Benefícios</h3>
                    <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                      {service.benefits.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Resultados esperados */}
                {service.outcomes && service.outcomes.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">Resultados esperados</h3>
                    <ul className="list-disc list-inside text-white/80 text-sm space-y-1">
                      {service.outcomes.map((o, idx) => (
                        <li key={idx}>{o}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {/* Casos de uso */}
                {service.examples && service.examples.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">Casos de uso</h3>
                    <div className="grid gap-2">
                      {service.examples.map((ex, idx) => (
                        <div key={idx} className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/5">
                          <p className="text-white font-medium text-sm">{ex.name}</p>
                          <p className="text-white/70 text-xs">{ex.description}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Perguntas frequentes */}
                {service.faqs && service.faqs.length > 0 && (
                  <section>
                    <h3 className="text-lg font-semibold text-white mb-2">Perguntas frequentes</h3>
                    <div className="grid gap-2">
                      {service.faqs.map((f, idx) => (
                        <div key={idx} className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/5">
                          <p className="text-white font-medium text-sm">{f.q}</p>
                          <p className="text-white/70 text-xs">{f.a}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ServiceDetailsModal;
