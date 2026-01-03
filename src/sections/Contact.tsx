import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import type { LucideIcon } from 'lucide-react';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  User,
  Building
} from 'lucide-react';
import SuccessModal from "../components/SuccessModal";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

const Contact = () => {
  const [formData, setFormData] = useState<{ name: string; email: string; company: string; service: string; message: string }>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const GA_ID = 'AW-17644830612';
    const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;

    if (!document.querySelector(`script[src="${scriptSrc}"]`)) {
      const script = document.createElement('script');
      script.async = true;
      script.src = scriptSrc;
      document.head.appendChild(script);
    }

    window.dataLayer = window.dataLayer || [];
    const gtag = (...args: any[]) => window.dataLayer!.push(args);
    window.gtag = gtag;
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);

    try {
      // @ts-ignore
      emailjs.init('H_rsp6SrkABlqY5RN');
    } catch (err) {}
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company,
      service: formData.service,
      message: formData.message
    };

    try {
      await emailjs.send(
        'service_1wuyals',
        'template_9xroo21',
        templateParams,
        'H_rsp6SrkABlqY5RN'
      );

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17644830612/xRF7CJao5asbEJT_2t1B',
          value: 1.0,
          currency: 'BRL'
        });
      }
      setSuccessOpen(true);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
      setErrorMsg('Ocorreu um erro ao enviar sua solicitação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const services = [
    'Desenvolvimento Web',
    'Aplicativos Mobile',
    'Infraestrutura & Cloud',
    'Automação & IA',
    'Montagem de PCs',
    'Suporte Técnico',
    'Consultoria em TI',
    'Outro'
  ];

  const contactInfo = [
    { icon: Phone, title: 'Telefone', info: '+55 (11) 91916-7653', description: 'Segunda a Sexta, 8h às 18h' },
    { icon: Mail, title: 'E-mail', info: 'glvinformatica2024@gmail.com', description: 'Resposta em até 2 horas' },
    { icon: MapPin, title: 'Endereço', info: 'Itu, SP', description: 'Atendimento presencial agendado' },
    { icon: Clock, title: 'Horário', info: 'Seg-Sex: 7h-18h', description: 'Suporte 24/7 disponível' }
  ];

  const liquidGlassStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    borderImageSlice: 1,
  };

  type FieldName = 'name' | 'email' | 'company';
  const fields: Array<[FieldName, string, LucideIcon, string]> = [
    ['name', 'Nome Completo', User, 'Seu nome completo'],
    ['email', 'E-mail', Mail, 'seu@email.com'],
    ['company', 'Empresa (Opcional)', Building, 'Nome da sua empresa'],
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden z-0">
      {/* Fundo Gradiente e Blobs */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-blue-600 rounded-full blur-3xl" />
      </div>

      <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Formulário */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="text-white">Fale Conosco </span>
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                {errorMsg}
              </div>
            )}
            <span className="text-[#3B82F6]">Hoje</span>
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Transforme sua ideia em realidade. Entre em contato e receba um orçamento personalizado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulário */}
          <motion.div
            style={liquidGlassStyle}
            className="w-full p-6 md:p-8 rounded-3xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Solicitar Orçamento</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {fields.map(([name, label, IconComp, placeholder]) => (
                <div key={name}>
                  <label className="block text-white/80 mb-2 font-medium">{label}</label>
                  <div className="relative">
                    <input
                      type={name === 'email' ? 'email' : 'text'}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      placeholder={placeholder}
                      required={name !== 'company'}
                    />
                    <IconComp className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  </div>
                </div>
              ))}

              {/* Serviço */}
              <div>
                <label className="block text-white/80 mb-2 font-medium">Serviço de Interesse</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="" className="bg-gray-900">Selecione um serviço</option>
                  {services.map((service) => (
                    <option key={service} value={service} className="bg-gray-900">
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-white/80 mb-2 font-medium">Mensagem</label>
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-white/50 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
                    placeholder="Descreva seu projeto ou necessidade..."
                  />
                  <MessageCircle className="absolute left-4 top-4 h-5 w-5 text-white/50" />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Enviar Solicitação</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Informações de Contato */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div style={liquidGlassStyle} className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-6">Informações de Contato</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/5"
                  >
                    <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30">
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base md:text-lg font-semibold text-white mb-1">{item.title}</h4>
                      <p className="text-blue-400 font-medium text-sm md:text-base">{item.info}</p>
                      <p className="text-white/60 text-xs md:text-sm">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Atendimento Imediato */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="backdrop-blur-lg bg-gradient-to-r from-green-600/20 to-green-500/20 border border-green-500/30 rounded-3xl p-6"
            >
              <h4 className="text-lg md:text-xl font-bold text-white mb-3">Atendimento Imediato</h4>
              <p className="text-white/80 mb-4 text-sm md:text-base">
                Precisa de ajuda urgente? Fale direto conosco no WhatsApp
              </p>
              <motion.a
                href="https://wa.me/5511919167653"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="h-5 w-5" />
                <span>Conversar no WhatsApp</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} title="Enviado com sucesso" message="Recebemos sua solicitação e retornaremos em até 12 horas." />
    </section>
  );
};

export default Contact;
