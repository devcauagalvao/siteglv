import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "CR Transportes",
      position: "Cliente",
      company: "CR Transportes",
      city: "Campinas, SP",
      industry: "Transporte",
      project: "Desenvolvimento de site completo com domínio",
      challenge:
        "Precisávamos de uma presença online profissional para captar mais clientes e formalizar nossa marca.",
      solution:
        "GLV desenvolveu um site responsivo, com domínio próprio e integração para contato direto, aumentando a credibilidade.",
      result: "Aumento de 30% nas solicitações de orçamento ",
      rating: 5,
      content:
        "O site ficou ótimo, fácil de navegar e trouxe muitos clientes novos. Excelente parceria com a GLV.",
      siteUrl: "https://www.crsantostransportes.com.br",
    },
    {
      id: 2,
      name: "Oscar",
      position: "Empreendedor",
      company: "Loja Digital",
      city: "Belo Horizonte, PR",
      industry: "E-commerce / Games",
      project: "Site de vendas de moedas digitais do World of Warcraft",
      challenge:
        "Precisávamos de uma plataforma segura e simples para venda de moedas digitais, com sistema de pagamentos integrado.",
      solution:
        "GLV criou uma loja online customizada, com sistema de pagamento, suporte a promoções e visual atrativo para gamers.",
      result: "Dobrou as vendas e fidelizou a base de clientes.",
      rating: 5,
      content:
        "O site superou as expectativas, fácil de administrar e seguro. A equipe foi muito atenciosa durante todo o processo.",
      siteUrl: "https://wowgold.com.br",
    },
    {
      id: 3,
      name: "João Lima",
      position: "Diretor de TI",
      company: "Hospital Vida",
      city: "Belo Horizonte, MG",
      industry: "Saúde",
      project: "Sistema de prontuário eletrônico integrado",
      challenge:
        "Nossa gestão de pacientes era manual e sujeita a erros, o que impactava no atendimento.",
      solution:
        "GLV desenvolveu um sistema eletrônico integrado com dispositivos móveis, garantindo dados precisos em tempo real.",
      result: "Redução de 70% no tempo de atendimento e melhora significativa na segurança dos dados.",
      rating: 4,
      content:
        "O trabalho técnico foi impecável. Eles entenderam o impacto que o sistema teria e focaram em resultados práticos. Algumas entregas demoraram um pouco mais, mas compensou pela qualidade final.",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextTestimonial, 6000);
    return () => clearTimeout(timeoutRef.current!);
  }, [activeIndex]);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl font-extrabold tracking-tight mb-3">
            <span className="text-white">O Que Nossos </span>
            <span className="text-blue-500">Clientes Dizem</span>
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Casos de sucesso que mostram como nossas soluções transformam negócios.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div
          onMouseEnter={() => clearTimeout(timeoutRef.current!)}
          onMouseLeave={() =>
            (timeoutRef.current = setTimeout(nextTestimonial, 6000))
          }
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 60, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.97 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-lg flex flex-col gap-8"
            >
              {/* Rating */}
              <div className="flex justify-center gap-1">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-center italic text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-white/90">
                “{currentTestimonial.content}”
              </blockquote>

              {/* Info Section */}
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-white/80">
                <div className="bg-white/10 rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold mb-2 text-blue-400">Desafio</h5>
                  <p className="text-sm leading-relaxed">{currentTestimonial.challenge}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold mb-2 text-blue-400">Solução</h5>
                  <p className="text-sm leading-relaxed">{currentTestimonial.solution}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold mb-2 text-blue-400">Resultado</h5>
                  <p className="text-sm leading-relaxed text-green-400 font-semibold">
                    {currentTestimonial.result}
                  </p>
                </div>
              </div>

              {/* Footer: Name, position, company, city + button */}
              <div className="flex flex-col md:flex-row items-center justify-between max-w-3xl mx-auto gap-4">
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-semibold text-white">{currentTestimonial.name}</h4>
                  <p className="text-blue-400 font-medium">
                    {currentTestimonial.position} - {currentTestimonial.city}
                  </p>
                  <p className="text-white/70">{currentTestimonial.company}</p>
                </div>

                {currentTestimonial.siteUrl && (
                  <a
                    href={currentTestimonial.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition-shadow shadow-md hover:shadow-lg"
                  >
                    Visitar Site
                  </a>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-5 mt-10">
            <motion.button
              aria-label="Testemunho anterior"
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-500/50 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-7 w-7 text-white" />
            </motion.button>

            <div className="flex gap-3">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-4 h-4 rounded-full transition duration-300 ${
                    index === activeIndex
                      ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/60"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  aria-label={`Ir para testemunho ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              aria-label="Próximo testemunho"
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-500/50 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-7 w-7 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
