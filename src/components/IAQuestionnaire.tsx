import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle, AlertCircle } from "lucide-react";
import DOMPurify from "dompurify";

interface IAQuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  step: 1 | 2 | 3 | 4 | 5;
  company: string;
  companySize: string;
  mainChallenge: string;
  processDescription: string;
  frequency: string;
  currentTooling: string;
  budget: string;
  timeline: string;
  expectations: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

interface Errors {
  [key: string]: string;
}

// Funções de validação e sanitização
const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] }).trim();
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  // Aceita formato: 11 99999-9999 ou variações
  const phoneRegex = /^(\d{2})\s?9?\d{4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

const validateCompanyName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100;
};

const validateText = (text: string, minLength: number = 5, maxLength: number = 500): boolean => {
  return text.length >= minLength && text.length <= maxLength;
};

const IAQuestionnaire: React.FC<IAQuestionnaireProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    company: "",
    companySize: "",
    mainChallenge: "",
    processDescription: "",
    frequency: "",
    currentTooling: "",
    budget: "",
    timeline: "",
    expectations: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((field: keyof FormData, value: string | number) => {
    // Sanitizar entrada
    const sanitizedValue = typeof value === "string" ? sanitizeInput(value) : value;
    setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
    // Limpar erro ao editar
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const toggleExpectation = useCallback((exp: string) => {
    setFormData((prev) => ({
      ...prev,
      expectations: prev.expectations.includes(exp)
        ? prev.expectations.filter((e) => e !== exp)
        : [...prev.expectations, exp],
    }));
  }, []);

  const validateStep = (): boolean => {
    const newErrors: Errors = {};

    if (formData.step === 1) {
      if (!validateCompanyName(formData.company)) {
        newErrors.company = "Empresa deve ter entre 2 e 100 caracteres";
      }
      if (!formData.companySize) {
        newErrors.companySize = "Selecione o tamanho da empresa";
      }
    }

    if (formData.step === 2) {
      if (!formData.mainChallenge) {
        newErrors.mainChallenge = "Selecione um desafio principal";
      }
      if (!validateText(formData.processDescription, 5, 500)) {
        newErrors.processDescription = "Descrição deve ter entre 5 e 500 caracteres";
      }
    }

    if (formData.step === 3) {
      if (!formData.frequency) {
        newErrors.frequency = "Selecione uma frequência";
      }
    }

    if (formData.step === 4) {
      if (!formData.budget) {
        newErrors.budget = "Selecione um orçamento";
      }
      if (!formData.timeline) {
        newErrors.timeline = "Selecione uma timeline";
      }
    }

    if (formData.step === 5) {
      if (!validateCompanyName(formData.contactName)) {
        newErrors.contactName = "Nome deve ter entre 2 e 100 caracteres";
      }
      if (!validateEmail(formData.contactEmail)) {
        newErrors.contactEmail = "Email inválido";
      }
      if (!validatePhone(formData.contactPhone)) {
        newErrors.contactPhone = "Telefone deve estar no formato: 11 99999-9999";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = useCallback(() => {
    if (formData.step < 5) {
      // Validar apenas se avançar
      const newErrors: Errors = {};

      if (formData.step === 1) {
        if (!validateCompanyName(formData.company)) {
          newErrors.company = "Empresa deve ter entre 2 e 100 caracteres";
        }
        if (!formData.companySize) {
          newErrors.companySize = "Selecione o tamanho da empresa";
        }
      }

      if (formData.step === 2) {
        if (!formData.mainChallenge) {
          newErrors.mainChallenge = "Selecione um desafio principal";
        }
        if (!validateText(formData.processDescription, 5, 500)) {
          newErrors.processDescription = "Descrição deve ter entre 5 e 500 caracteres";
        }
      }

      if (formData.step === 3) {
        if (!formData.frequency) {
          newErrors.frequency = "Selecione uma frequência";
        }
      }

      if (formData.step === 4) {
        if (!formData.budget) {
          newErrors.budget = "Selecione um orçamento";
        }
        if (!formData.timeline) {
          newErrors.timeline = "Selecione uma timeline";
        }
      }

      if (Object.keys(newErrors).length === 0) {
        setFormData((prev) => ({ ...prev, step: (prev.step + 1) as 1 | 2 | 3 | 4 | 5 }));
        setErrors({});
      } else {
        setErrors(newErrors);
      }
    }
  }, [formData.step, formData.company, formData.companySize, formData.mainChallenge, formData.processDescription, formData.frequency, formData.budget, formData.timeline]);

  const prevStep = useCallback(() => {
    if (formData.step > 1) {
      setFormData((prev) => ({ ...prev, step: (prev.step - 1) as 1 | 2 | 3 | 4 | 5 }));
      setErrors({});
    }
  }, [formData.step]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep()) {
      return;
    }

    setIsLoading(true);

    try {
      // Delay para simular processamento
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Construir mensagem com dados sanitizados
      const message = `
*Questionário - IA Aplicada*

📋 *Empresa*: ${sanitizeInput(formData.company)}
👥 *Tamanho*: ${formData.companySize}
🎯 *Desafio Principal*: ${formData.mainChallenge}
📝 *Descrição do Processo*: ${sanitizeInput(formData.processDescription)}
⏱️ *Frequência*: ${formData.frequency}
🛠️ *Ferramentas Atuais*: ${sanitizeInput(formData.currentTooling) || "Nenhuma"}
💰 *Orçamento*: ${formData.budget}
📅 *Timeline*: ${formData.timeline}
✅ *Expectativas*: ${formData.expectations.join(", ")}

*Contato*
👤 Nome: ${sanitizeInput(formData.contactName)}
📧 Email: ${sanitizeInput(formData.contactEmail)}
📱 Telefone: ${sanitizeInput(formData.contactPhone)}

_Enviado via GLV Consulta em ${new Date().toLocaleString("pt-BR")}_
      `;

      // Validação final antes de enviar
      if (message.length > 4096) {
        setErrors({ submit: "Mensagem muito longa. Reduza alguns textos." });
        setIsLoading(false);
        return;
      }

      const whatsappUrl = `https://wa.me/5511919167653?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      setSubmitted(true);
      setIsLoading(false);

      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setErrors({});
        setFormData({
          step: 1,
          company: "",
          companySize: "",
          mainChallenge: "",
          processDescription: "",
          frequency: "",
          currentTooling: "",
          budget: "",
          timeline: "",
          expectations: [],
          contactName: "",
          contactEmail: "",
          contactPhone: "",
        });
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar:", error);
      setErrors({ submit: "Erro ao processar. Tente novamente." });
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-blue-500/30 shadow-2xl shadow-blue-500/20"
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header com Gradiente GLV */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-xl border-b border-blue-400/20 p-5 sm:p-7 flex items-center justify-between z-10 shadow-lg shadow-blue-500/10">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  <span className="text-3xl">🤖</span> IA Aplicada
                </h2>
                <p className="text-sm text-blue-100 mt-1">Personalize sua solução em 5 passos</p>
              </motion.div>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Indicador de Progresso */}
            <div className="p-5 sm:p-7 border-b border-blue-500/20 bg-black/20">
              <div className="flex justify-between items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex-1 flex items-center gap-2">
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-lg ${
                        step === formData.step
                          ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white ring-4 ring-blue-400/50 shadow-blue-500/50"
                          : step < formData.step
                          ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-emerald-500/50"
                          : "bg-gray-700/60 text-gray-400 border border-gray-600/50"
                      }`}
                      animate={{
                        scale: step === formData.step ? 1.15 : 1,
                        boxShadow:
                          step === formData.step
                            ? "0 0 20px rgba(59, 130, 246, 0.5)"
                            : "none",
                      }}
                    >
                      {step < formData.step ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        step
                      )}
                    </motion.div>
                    {step < 5 && (
                      <motion.div
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          step < formData.step
                            ? "bg-gradient-to-r from-emerald-500 to-cyan-500"
                            : "bg-gray-700/60"
                        }`}
                        animate={{ scaleX: step < formData.step ? 1 : 0.5 }}
                      />
                    )}
                  </div>
                ))}
              </div>
              <motion.p className="text-center text-sm text-blue-200 font-medium">
                Etapa {formData.step} de 5
              </motion.p>
            </div>

            {/* Conteúdo */}
            <motion.form
              onSubmit={handleSubmit}
              className="p-5 sm:p-7 space-y-6"
              key={formData.step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Etapa 1: Informações da Empresa */}
              {formData.step === 1 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      1.
                    </span>
                    Informações da Empresa
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      📌 Nome da Empresa
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="ex: Tech Solutions Ltda."
                      maxLength={100}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all font-medium ${
                        errors.company
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    />
                    {errors.company && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.company}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      👥 Tamanho da Empresa
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => handleInputChange("companySize", e.target.value)}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer ${
                        errors.companySize
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="1-10">1-10 pessoas</option>
                      <option value="11-50">11-50 pessoas</option>
                      <option value="51-100">51-100 pessoas</option>
                      <option value="101-500">101-500 pessoas</option>
                      <option value="500+">500+ pessoas</option>
                    </select>
                    {errors.companySize && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.companySize}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Etapa 2: Desafios Principais */}
              {formData.step === 2 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      2.
                    </span>
                    Desafios Principais
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      🎯 Qual é seu maior desafio atual?
                    </label>
                    <select
                      value={formData.mainChallenge}
                      onChange={(e) => handleInputChange("mainChallenge", e.target.value)}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer ${
                        errors.mainChallenge
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="tarefas-repetitivas">Tarefas Repetitivas</option>
                      <option value="atendimento-volume">Atendimento com Alto Volume</option>
                      <option value="integracao-sistemas">Integração de Sistemas</option>
                      <option value="analise-dados">Análise e Relatórios de Dados</option>
                      <option value="automacao-processos">Automação de Processos</option>
                      <option value="outro">Outro</option>
                    </select>
                    {errors.mainChallenge && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.mainChallenge}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      📝 Descreva brevemente o processo que deseja automatizar
                    </label>
                    <textarea
                      value={formData.processDescription}
                      onChange={(e) => handleInputChange("processDescription", e.target.value)}
                      placeholder="ex: Nossos vendedores recebem e-mails de clientes e precisam inserir dados em 3 sistemas diferentes..."
                      maxLength={500}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all font-medium resize-none h-32 ${
                        errors.processDescription
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    />
                    <div className="flex items-center justify-between mt-2">
                      {errors.processDescription && (
                        <motion.p className="text-red-400 text-sm flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle className="w-4 h-4" /> {errors.processDescription}
                        </motion.p>
                      )}
                      <span className="text-xs text-gray-400 ml-auto">{formData.processDescription.length}/500</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Etapa 3: Volume e Ferramentas */}
              {formData.step === 3 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      3.
                    </span>
                    Volume & Ferramentas
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      ⏱️ Com que frequência este processo ocorre?
                    </label>
                    <select
                      value={formData.frequency}
                      onChange={(e) => handleInputChange("frequency", e.target.value)}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer ${
                        errors.frequency
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="diaria">Diária</option>
                      <option value="varias-vezes-dia">Várias vezes ao dia</option>
                      <option value="semanal">Semanal</option>
                      <option value="mensal">Mensal</option>
                      <option value="conforme-demanda">Conforme a demanda</option>
                    </select>
                    {errors.frequency && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.frequency}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      🛠️ Quais ferramentas/sistemas estão envolvidos?
                    </label>
                    <input
                      type="text"
                      value={formData.currentTooling}
                      onChange={(e) => handleInputChange("currentTooling", e.target.value)}
                      placeholder="ex: Gmail, Shopify, Trello, SAP, etc."
                      maxLength={200}
                      className="w-full bg-gray-800/40 border-2 border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                    />
                    <span className="text-xs text-gray-400 mt-2 block">{formData.currentTooling.length}/200</span>
                  </div>
                </motion.div>
              )}

              {/* Etapa 4: Orçamento & Timeline */}
              {formData.step === 4 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      4.
                    </span>
                    Orçamento & Timeline
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      💰 Qual é o orçamento estimado?
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer ${
                        errors.budget
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="ate-5k">Até R$ 5.000</option>
                      <option value="5k-15k">R$ 5.000 - R$ 15.000</option>
                      <option value="15k-50k">R$ 15.000 - R$ 50.000</option>
                      <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                      <option value="100k+">Acima de R$ 100.000</option>
                      <option value="flexivel">Flexível</option>
                    </select>
                    {errors.budget && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.budget}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      📅 Quando você gostaria de começar?
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => handleInputChange("timeline", e.target.value)}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer ${
                        errors.timeline
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="imediatamente">Imediatamente</option>
                      <option value="proximo-mes">Próximo mês</option>
                      <option value="proximo-trimestre">Próximo trimestre</option>
                      <option value="proximo-semestre">Próximo semestre</option>
                      <option value="indefinido">Indefinido</option>
                    </select>
                    {errors.timeline && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.timeline}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Etapa 5: Expectativas & Contato */}
              {formData.step === 5 && (
                <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      5.
                    </span>
                    Expectativas & Contato
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3.5">
                      ✅ O que você espera alcançar? (selecione todas que se aplicam)
                    </label>
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2">
                      {[
                        "Redução de tempo",
                        "Redução de custos",
                        "Menos erros",
                        "Melhor atendimento",
                        "Dados em tempo real",
                        "Escalabilidade",
                      ].map((exp) => (
                        <motion.button
                          key={exp}
                          type="button"
                          onClick={() => toggleExpectation(exp)}
                          className={`w-full p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                            formData.expectations.includes(exp)
                              ? "border-blue-500/80 bg-blue-500/20 text-blue-50 shadow-lg shadow-blue-500/20"
                              : "border-blue-500/20 bg-gray-800/30 text-gray-300 hover:border-blue-500/40 hover:bg-gray-800/50"
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <CheckCircle
                            className={`w-5 h-5 flex-shrink-0 transition-all ${
                              formData.expectations.includes(exp)
                                ? "text-blue-400"
                                : "text-gray-500"
                            }`}
                            fill={formData.expectations.includes(exp) ? "currentColor" : "none"}
                          />
                          <span className="font-medium">{exp}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-6 border-t border-blue-500/20">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      📞 Seus dados de contato
                    </h4>

                    <div>
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Nome completo"
                        maxLength={100}
                        className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all font-medium text-sm ${
                          errors.contactName
                            ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                            : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        }`}
                        required
                      />
                      {errors.contactName && (
                        <motion.p className="text-red-400 text-xs mt-1.5 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle className="w-3 h-3" /> {errors.contactName}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <input
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        placeholder="seu@email.com"
                        maxLength={100}
                        className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all font-medium text-sm ${
                          errors.contactEmail
                            ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                            : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        }`}
                        required
                      />
                      {errors.contactEmail && (
                        <motion.p className="text-red-400 text-xs mt-1.5 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle className="w-3 h-3" /> {errors.contactEmail}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <input
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        placeholder="(11) 99999-9999"
                        maxLength={20}
                        className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all font-medium text-sm ${
                          errors.contactPhone
                            ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                            : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                        }`}
                        required
                      />
                      {errors.contactPhone && (
                        <motion.p className="text-red-400 text-xs mt-1.5 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle className="w-3 h-3" /> {errors.contactPhone}
                        </motion.p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Mensagem de Erro */}
              {errors.submit && (
                <motion.div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{errors.submit}</p>
                </motion.div>
              )}

              {/* Sucesso */}
              {submitted && (
                <motion.div
                  className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/50 rounded-xl p-5 flex items-start gap-3"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                >
                  <motion.div initial={{ rotate: -180, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 200 }}>
                    <CheckCircle className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                  </motion.div>
                  <div>
                    <p className="text-emerald-100 font-bold">Sucesso! ✨</p>
                    <p className="text-emerald-200 text-sm mt-0.5">Abrindo WhatsApp com seu orçamento personalizado...</p>
                  </div>
                </motion.div>
              )}
            </motion.form>

            {/* Footer com Botões */}
            <div className="sticky bottom-0 bg-gradient-to-t from-black via-black to-transparent border-t border-blue-500/20 p-5 sm:p-7 flex gap-3">
              {formData.step > 1 && (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 px-4 py-3 sm:py-3.5 rounded-xl border-2 border-blue-500/40 text-blue-300 hover:bg-blue-500/10 hover:border-blue-500/60 font-bold transition-all text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  ← Voltar
                </motion.button>
              )}

              {formData.step < 5 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 px-4 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold hover:from-blue-500 hover:to-cyan-500 transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-blue-500/30 active:shadow-blue-500/10"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Próximo <ChevronRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={submitted || isLoading}
                  className="flex-1 px-4 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold hover:from-emerald-500 hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-emerald-500/30 active:shadow-emerald-500/10"
                  whileHover={!submitted && !isLoading ? { scale: 1.03, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" } : {}}
                  whileTap={!submitted && !isLoading ? { scale: 0.97 } : {}}
                >
                  {isLoading ? (
                    <>
                      <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>
                        ⟳
                      </motion.span>
                      Processando...
                    </>
                  ) : submitted ? (
                    <>✓ Redirecionando</>
                  ) : (
                    <>
                      ✓ Enviar Orçamento
                    </>
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IAQuestionnaire;
