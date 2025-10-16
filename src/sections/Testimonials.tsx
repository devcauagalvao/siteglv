import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

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
      name: "Ned e Tércio",
      position: "Administradores",
      company: "EJB inspeções veiculares Itu",
      city: "Itu, SP",
      industry: "Comércio e Serviços Técnicos",
      project: "Manutenção de infraestrutura de TI e segurança de dados",
      challenge:
        "Enfrentávamos lentidão nos computadores, falhas em softwares e riscos de perda de dados por falta de backups adequados.",
      solution:
        "A GLV realizou diagnóstico completo, corrigiu problemas de hardware, instalou os softwares necessários e implementou rotinas automatizadas de backup.",
      result:
        "Aumentamos a produtividade da equipe e garantimos a segurança das informações críticas do negócio.",
      rating: 5,
      content:
        "O atendimento foi ágil e técnico. A equipe da GLV resolveu todos os problemas com profissionalismo. Agora nossos sistemas funcionam com estabilidade e temos tranquilidade quanto aos dados.",
    },
  ];

  const nextTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  // Autoplay
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextTestimonial, 6000);
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [activeIndex, nextTestimonial]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextTestimonial();
      if (e.key === "ArrowLeft") prevTestimonial();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextTestimonial, prevTestimonial]);

  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden"
      aria-labelledby="testimonials-heading"
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
          <h2
            id="testimonials-heading"
            className="text-4xl font-extrabold tracking-tight mb-3"
          >
            <span className="text-white">O Que Nossos </span>
            <span className="text-blue-500">Clientes Dizem</span>
          </h2>
          <p className="text-lg text-white/70 max-w-xl mx-auto">
            Casos de sucesso que mostram como nossas soluções transformam negócios.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div
          onMouseEnter={() => timeoutRef.current && clearTimeout(timeoutRef.current)}
          onMouseLeave={() => (timeoutRef.current = setTimeout(nextTestimonial, 6000))}
          aria-live="polite"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 60, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -60, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-10 shadow-xl flex flex-col gap-8"
              role="region"
              aria-label={`Depoimento de ${current.name}`}
            >
              <div
                className="flex justify-center gap-1"
                aria-label={`Avaliação ${current.rating} estrelas`}
              >
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-6 w-6 text-yellow-400 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="text-center italic text-xl md:text-2xl font-light leading-relaxed max-w-3xl mx-auto text-white/90">
                “{current.content}”
              </blockquote>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-white/80">
                <div className="bg-white/10 rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold mb-2 text-blue-400">Desafio</h5>
                  <p className="text-sm leading-relaxed line-clamp-4">{current.challenge}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold mb-2 text-blue-400">Solução</h5>
                  <p className="text-sm leading-relaxed line-clamp-4">{current.solution}</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4 shadow-sm">
                  <h5 className="font-semibold mb-2 text-blue-400">Resultado</h5>
                  <p className="text-sm leading-relaxed text-green-400 font-semibold line-clamp-3">
                    {current.result}
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between max-w-3xl mx-auto gap-4">
                <div className="text-center md:text-left">
                  <h4 className="text-2xl font-semibold text-white">{current.name}</h4>
                  <p className="text-blue-400 font-medium">
                    {current.position} - {current.city}
                  </p>
                  <p className="text-white/70">{current.company}</p>
                </div>

                {current.siteUrl && (
                  <a
                    href={current.siteUrl}
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
          <div className="flex justify-center items-center flex-wrap gap-5 mt-10">
            <motion.button
              aria-label="Anterior"
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
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Testemunho ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              aria-label="Próximo"
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
