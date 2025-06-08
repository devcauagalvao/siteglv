import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Building, User } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Carlos Silva',
      position: 'CEO',
      company: 'TechStart Soluções',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      content: 'A GLV transformou completamente nossa infraestrutura de TI. O sistema ERP desenvolvido por eles aumentou nossa produtividade em 40% e a migração para a cloud foi perfeita.',
      project: 'Sistema ERP + Migração Cloud',
      industry: 'Tecnologia',
      result: '+40% produtividade'
    },
    {
      id: 2,
      name: 'Marina Santos',
      position: 'Gerente de TI',
      company: 'Distribuidora ABC',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      content: 'Suporte técnico excepcional! A equipe da GLV sempre resolve nossos problemas rapidamente. O app mobile que desenvolveram revolucionou nosso processo de vendas.',
      project: 'App Mobile + Suporte 24/7',
      industry: 'Distribuição',
      result: '99.9% uptime'
    },
    {
      id: 3,
      name: 'Roberto Oliveira',
      position: 'Diretor',
      company: 'Consultoria Empresarial RO',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      content: 'Profissionais altamente qualificados. A automação que implementaram nos nossos processos administrativos economiza 20 horas por semana da nossa equipe.',
      project: 'Automação de Processos',
      industry: 'Consultoria',
      result: '-20h semanais'
    },
    {
      id: 4,
      name: 'Ana Paula Costa',
      position: 'Proprietária',
      company: 'Loja Virtual Fashion',
      avatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      content: 'O e-commerce que a GLV desenvolveu superou todas as expectativas. Design moderno, funcionalidades avançadas e suporte contínuo. Nossas vendas triplicaram!',
      project: 'E-commerce + Marketing Digital',
      industry: 'Varejo',
      result: '+300% vendas'
    },
    {
      id: 5,
      name: 'Fernando Lima',
      position: 'CTO',
      company: 'StartupTech Inovação',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200',
      rating: 5,
      content: 'Parceria fantástica! A GLV não apenas desenvolveu nossa plataforma, mas também nos orientou sobre as melhores práticas de segurança e escalabilidade.',
      project: 'Plataforma SaaS',
      industry: 'SaaS',
      result: '10x escalabilidade'
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-900" />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent mb-6">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Casos de sucesso que demonstram o impacto das nossas soluções
          </p>
        </motion.div>

        {/* Main Testimonial */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-8">
                <div className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30">
                  <Quote className="h-8 w-8 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(currentTestimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-xl md:text-2xl text-white text-center leading-relaxed mb-8 font-light">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full border-4 border-blue-500/30 shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-transparent" />
                </div>

                {/* Details */}
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-semibold text-white">{currentTestimonial.name}</h4>
                  <p className="text-blue-400">{currentTestimonial.position}</p>
                  <p className="text-white/60">{currentTestimonial.company}</p>
                </div>

                {/* Separator */}
                <div className="hidden md:block w-px h-12 bg-white/20" />

                {/* Project Info */}
                <div className="text-center md:text-left">
                  <div className="flex items-center space-x-2 text-white/80 mb-1">
                    <Building className="h-4 w-4" />
                    <span className="text-sm">{currentTestimonial.industry}</span>
                  </div>
                  <div className="text-sm text-white/60 mb-2">{currentTestimonial.project}</div>
                  <div className="text-green-400 font-semibold">{currentTestimonial.result}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center space-x-4 mt-8">
            <motion.button
              onClick={prevTestimonial}
              className="p-3 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:border-blue-500/50 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="h-6 w-6" />
            </motion.button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-blue-500 shadow-lg shadow-blue-500/50'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={nextTestimonial}
              className="p-3 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 text-white hover:border-blue-500/50 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: '200+', label: 'Projetos Entregues' },
            { number: '98%', label: 'Satisfação dos Clientes' },
            { number: '24/7', label: 'Suporte Disponível' },
            { number: '15+', label: 'Anos de Experiência' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;