import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import type { LucideIcon } from 'lucide-react';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Building,
  AlertCircle
} from 'lucide-react';
import SuccessModal from "../components/modals/SuccessModal";
import { GlassDropdown, GlassInput, GlassTextarea } from "../components/forms/glass/GlassControls";
import { useForm } from '../hooks/useForm';
import { sanitizeInput, validateContactForm } from '../utils/validation';
import { GOOGLE_ANALYTICS_ID, EMAILJS_KEY } from '../utils/constants';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

interface ContactFormData extends Record<string, unknown> {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const Contact = () => {
  const [successOpen, setSuccessOpen] = React.useState(false);

  const {
    values: formData,
    errors: formErrors,
    isSubmitting,
    setFieldValue,
    handleChange,
    handleSubmit: handleSubmitForm,
    resetForm,
    setErrors,
  } = useForm<ContactFormData>({
    initialValues: {
      name: '',
      email: '',
      company: '',
      service: '',
      message: ''
    },
    validate: (values) => validateContactForm(values),
    onSubmit: async (values) => {
      const templateParams = {
        from_name: sanitizeInput(values.name),
        from_email: sanitizeInput(values.email),
        company: sanitizeInput(values.company),
        service: values.service,
        message: sanitizeInput(values.message, 5000)
      };

      try {
        await emailjs.send(
          'service_1wuyals',
          'template_9xroo21',
          templateParams,
          EMAILJS_KEY
        );

        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17644830612/xRF7CJao5asbEJT_2t1B'
          });
        }
        setSuccessOpen(true);
        resetForm();
      } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        setErrors({ submit: 'Ocorreu um erro ao enviar sua solicitação. Tente novamente mais tarde.' });
      }
    }
  });

  useEffect(() => {
    const initializeGoogleAnalytics = () => {
      const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
      
      if (document.querySelector(`script[src="${scriptSrc}"]`)) {
        return;
      }

      const script = document.createElement('script');
      script.async = true;
      script.src = scriptSrc;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => window.dataLayer!.push(args);
      window.gtag('js', new Date());
      window.gtag('config', GOOGLE_ANALYTICS_ID);
    };

    const initializeEmailJS = () => {
      try {
        emailjs.init(EMAILJS_KEY);
      } catch (error) {
        console.error('Erro ao inicializar EmailJS:', error);
      }
    };

    initializeGoogleAnalytics();
    initializeEmailJS();
  }, []);

  const services = [
    'Desenvolvimento Web',
    'Aplicativos Mobile',
    'Infraestrutura & Cloud',
    'Automação & IA',
    'Montagem de PCs',
    'Suporte Técnico',
    'Consultoria em TI',
    'Outro'
  ] as const;

  const serviceOptions = services.map((service) => ({ label: service, value: service }));

  const contactInfo = [
    { icon: Phone, title: 'Telefone', info: '+55 (11) 91916-7653', description: 'Segunda a Sexta, 8h às 18h' },
    { icon: Mail, title: 'E-mail', info: 'contato.glvtecnologia@gmail.com', description: 'Resposta em até 2 horas' },
    { icon: MapPin, title: 'Endereço', info: 'Itu, SP', description: 'Atendimento presencial agendado' },
    { icon: Clock, title: 'Horário', info: 'Seg-Sex: 7h-18h', description: 'Suporte 24/7 disponível' }
  ] as const;

  type FieldName = 'name' | 'email' | 'company';
  const fields: Array<[FieldName, string, LucideIcon, string]> = [
    ['name', 'Nome Completo', User, 'Seu nome completo'],
    ['email', 'E-mail', Mail, 'seu@email.com'],
    ['company', 'Empresa (Opcional)', Building, 'Nome da sua empresa'],
  ] as const;

  return (
    <section id="contact" className="relative py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Título */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Vamos Trabalhar <span className="text-blue-500">Juntos?</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Entre em contato conosco para discutir seu projeto e descobrir como podemos ajudar sua empresa a crescer com tecnologia.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informações de contato */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {contactInfo.map(({ icon: IconComp, title, info, description }, idx) => (
              <motion.div
                key={title}
                className="p-5 rounded-2xl overflow-hidden transform-gpu [backface-visibility:hidden] bg-white/10 border border-white/20 shadow-inner shadow-white/10"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <IconComp className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">{title}</h3>
                    <p className="text-blue-500 font-semibold text-sm md:text-base">{info}</p>
                    <p className="text-gray-400 text-xs md:text-sm mt-1">{description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Formulário */}
          <motion.div
            className="lg:col-span-2 p-8 rounded-3xl overflow-hidden transform-gpu [backface-visibility:hidden] bg-white/10 border border-white/20 shadow-inner shadow-white/10"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {formErrors.submit && (
              <motion.div
                className="mb-6 p-4 rounded-xl border border-red-500/30 bg-red-500/10 flex items-start gap-3"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-300 text-sm">{formErrors.submit}</p>
              </motion.div>
            )}

            <form onSubmit={handleSubmitForm} className="space-y-6">
              {fields.map(([name, label, IconComp, placeholder]) => (
                <div key={name}>
                  <label className="block text-sm font-bold text-gray-200 mb-2.5">{label}</label>
                  <div className="relative">
                    <GlassInput
                      type={name === 'email' ? 'email' : 'text'}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      maxLength={100}
                      className="pl-12 hover:bg-white/5 focus:bg-white/5 active:bg-white/5 focus:border-white/10"
                      hasError={!!formErrors[name]}
                      placeholder={placeholder}
                      required={name !== 'company'}
                    />
                    <IconComp className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                  </div>
                  {formErrors[name] && (
                    <motion.p
                      className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-3 h-3" /> {formErrors[name]}
                    </motion.p>
                  )}
                </div>
              ))}

              {/* Serviço */}
              <div>
                <label className="block text-sm font-bold text-gray-200 mb-2.5">Serviço de Interesse</label>
                <GlassDropdown
                  value={formData.service}
                  onChange={(value) => setFieldValue("service", value)}
                  options={serviceOptions}
                  placeholder="Selecione um serviço"
                  hasError={!!formErrors.service}
                />
                {formErrors.service && (
                  <motion.p
                    className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-3 h-3" /> {formErrors.service}
                  </motion.p>
                )}
              </div>

              {/* Mensagem */}
              <div>
                <label className="block text-sm font-bold text-gray-200 mb-2.5">Mensagem</label>
                <div className="relative">
                  <GlassTextarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    maxLength={5000}
                    className="pl-12 resize-none hover:bg-white/5 focus:bg-white/5 active:bg-white/5 focus:border-white/10"
                    hasError={!!formErrors.message}
                    placeholder="Descreva seu projeto ou necessidade..."
                  />
                  <span className="text-xs text-gray-400 absolute right-3 bottom-2">{formData.message.length}/5000</span>
                </div>
                {formErrors.message && (
                  <motion.p
                    className="text-red-400 text-xs mt-1.5 flex items-center gap-1"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="w-3 h-3" /> {formErrors.message}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-500 hover:to-cyan-500 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30 active:shadow-blue-500/10"
                whileHover={!isSubmitting ? { scale: 1.03, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.97 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} title="Enviado com sucesso" message="Recebemos sua solicitação e retornaremos em até 12 horas." />
    </section>
  );
};

export default Contact;
