import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Building } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Carlos Oliveira',
      position: 'CEO',
      company: 'TechSolutions',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      industry: 'Tecnologia',
      project: 'Sistema de Gestão Empresarial',
      result: 'Aumento de 40% na produtividade',
      rating: 5,
      content: 'A GLV transformou nossa operação com uma solução ágil e robusta. Atendimento excelente e entrega pontual!',
    },
    {
      id: 2,
      name: 'Ana Souza',
      position: 'Fundadora',
      company: 'Loja BellaModa',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      industry: 'E-commerce',
      project: 'Plataforma de vendas online',
      result: 'Dobrou as vendas em 3 meses',
      rating: 5,
      content: 'Equipe incrível! Desenvolveram nossa loja virtual com todos os recursos que precisávamos. Recomendo de olhos fechados!',
    },
    {
      id: 3,
      name: 'João Lima',
      position: 'Diretor de TI',
      company: 'Hospital Vida',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
      industry: 'Saúde',
      project: 'Sistema de prontuário eletrônico',
      result: 'Melhoria de 70% na gestão de pacientes',
      rating: 4,
      content: 'Um trabalho técnico impecável e com foco real em resultados. A GLV entregou valor do início ao fim.',
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto carrossel com pausa ao interagir
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextTestimonial, 6000);
    return () => clearTimeout(timeoutRef.current!);
  }, [activeIndex]);

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Cabeçalho */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="text-white">O Que Nossos </span>
            <span className="text-blue-500">Clientes Dizem</span>
          </h2>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            Casos de sucesso que mostram como nossas soluções transformam negócios.
          </p>
        </motion.div>

        {/* Testemunho */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => clearTimeout(timeoutRef.current!)}
          onMouseLeave={() => timeoutRef.current = setTimeout(nextTestimonial, 6000)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 100, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -100, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="rounded-3xl backdrop-blur-md bg-white/5 border border-white/20 p-8 md:p-12 shadow-2xl"
            >
              <div className="flex justify-center mb-8">
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-blue-500/40 shadow-md">
                  <Quote className="h-8 w-8 text-white" />
                </div>
              </div>

              <div className="flex justify-center mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current mx-0.5" />
                ))}
              </div>

              <blockquote className="text-xl md:text-2xl text-center font-light italic leading-relaxed mb-10">
                "{currentTestimonial.content}"
              </blockquote>

              <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-blue-500/30 shadow-md"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{currentTestimonial.name}</h4>
                    <p className="text-blue-400 text-sm">{currentTestimonial.position}</p>
                    <p className="text-white/60 text-sm">{currentTestimonial.company}</p>
                  </div>
                </div>
                <div className="hidden md:block w-px h-12 bg-white/20" />
                <div>
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-white/80 text-sm mb-1">
                    <Building className="h-4 w-4" />
                    <span>{currentTestimonial.industry}</span>
                  </div>
                  <div className="text-sm text-white/60 mb-1">{currentTestimonial.project}</div>
                  <div className="text-green-400 font-semibold">{currentTestimonial.result}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controles */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </motion.button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeIndex
                    ? 'bg-blue-500 scale-125 shadow shadow-blue-500/50'
                    : 'bg-white/30 hover:bg-white/50'
                    }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-blue-500/50 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
