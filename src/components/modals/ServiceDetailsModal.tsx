import React from "react";
import { CheckCircle } from "lucide-react";
import { ServiceItem } from "../../data/services";
import ModalBase from "./ModalBase";
import { GlassItemRow } from "../forms/glass/GlassControls";

interface ServiceDetailsModalProps {
  service: ServiceItem | null;
  onClose: () => void;
}

const ServiceDetailsModal: React.FC<ServiceDetailsModalProps> = ({ service, onClose }) => {
  if (!service) return null;

  return (
    <ModalBase open={!!service} onClose={onClose} size="2xl" className="p-6">
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
                <GlassItemRow key={idx} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                  <span className="text-white/80 text-sm leading-relaxed">{item}</span>
                </GlassItemRow>
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
                <GlassItemRow key={idx}>
                  <p className="text-white font-medium text-sm">{ex.name}</p>
                  <p className="text-white/70 text-xs">{ex.description}</p>
                </GlassItemRow>
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
                <GlassItemRow key={idx}>
                  <p className="text-white font-medium text-sm">{f.q}</p>
                  <p className="text-white/70 text-xs">{f.a}</p>
                </GlassItemRow>
              ))}
            </div>
          </section>
        )}
      </div>
    </ModalBase>
  );
};

export default ServiceDetailsModal;
