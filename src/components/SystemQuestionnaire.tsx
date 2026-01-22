import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, CheckCircle, AlertCircle } from "lucide-react";
import DOMPurify from "dompurify";

interface SystemQuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  step: 1 | 2 | 3 | 4 | 5;
  company: string;
  projectType: string;
  mainObjective: string;
  currentSituation: string;
  targetAudience: string;
  requiredFeatures: string[];
  techStack: string;
  integrations: string;
  scalability: string;
  budget: string;
  timeline: string;
  teamSize: string;
  supportNeeded: string[];
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
  const phoneRegex = /^(\d{2})\s?9?\d{4}-?\d{4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ""));
};

const validateCompanyName = (name: string): boolean => {
  return name.length >= 2 && name.length <= 100;
};

const validateText = (text: string, minLength: number = 5, maxLength: number = 500): boolean => {
  return text.length >= minLength && text.length <= maxLength;
};

const SystemQuestionnaire: React.FC<SystemQuestionnaireProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    step: 1,
    company: "",
    projectType: "",
    mainObjective: "",
    currentSituation: "",
    targetAudience: "",
    requiredFeatures: [],
    techStack: "",
    integrations: "",
    scalability: "",
    budget: "",
    timeline: "",
    teamSize: "",
    supportNeeded: [],
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback(
    (field: keyof FormData, value: string | number) => {
      const sanitizedValue = typeof value === "string" ? sanitizeInput(value) : value;
      setFormData((prev) => ({ ...prev, [field]: sanitizedValue }));
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const toggleFeature = useCallback((feature: string) => {
    setFormData((prev) => ({
      ...prev,
      requiredFeatures: prev.requiredFeatures.includes(feature)
        ? prev.requiredFeatures.filter((f) => f !== feature)
        : [...prev.requiredFeatures, feature],
    }));
  }, []);

  const toggleSupport = useCallback((support: string) => {
    setFormData((prev) => ({
      ...prev,
      supportNeeded: prev.supportNeeded.includes(support)
        ? prev.supportNeeded.filter((s) => s !== support)
        : [...prev.supportNeeded, support],
    }));
  }, []);

  const validateStep = (): boolean => {
    const newErrors: Errors = {};

    if (formData.step === 1) {
      if (!validateCompanyName(formData.company)) {
        newErrors.company = "Empresa deve ter entre 2 e 100 caracteres";
      }
      if (!formData.projectType) {
        newErrors.projectType = "Selecione o tipo de projeto";
      }
    }

    if (formData.step === 2) {
      if (!validateText(formData.mainObjective, 5, 500)) {
        newErrors.mainObjective = "Objetivo deve ter entre 5 e 500 caracteres";
      }
      if (!validateText(formData.currentSituation, 5, 500)) {
        newErrors.currentSituation = "Situação atual deve ter entre 5 e 500 caracteres";
      }
      if (!validateText(formData.targetAudience, 5, 300)) {
        newErrors.targetAudience = "Público-alvo deve ter entre 5 e 300 caracteres";
      }
    }

    if (formData.step === 3) {
      if (formData.requiredFeatures.length === 0) {
        newErrors.requiredFeatures = "Selecione pelo menos uma funcionalidade";
      }
      if (!formData.techStack) {
        newErrors.techStack = "Selecione uma abordagem de tecnologia";
      }
    }

    if (formData.step === 4) {
      if (!formData.scalability) {
        newErrors.scalability = "Selecione o nível de escalabilidade";
      }
      if (!formData.budget) {
        newErrors.budget = "Selecione um orçamento";
      }
      if (!formData.timeline) {
        newErrors.timeline = "Selecione uma timeline";
      }
      if (!formData.teamSize) {
        newErrors.teamSize = "Selecione o tamanho da sua equipe";
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
      const newErrors: Errors = {};
      let isValid = true;

      if (formData.step === 1) {
        if (!validateCompanyName(formData.company)) {
          newErrors.company = "Empresa deve ter entre 2 e 100 caracteres";
          isValid = false;
        }
        if (!formData.projectType) {
          newErrors.projectType = "Selecione o tipo de projeto";
          isValid = false;
        }
      }

      if (formData.step === 2) {
        if (!validateText(formData.mainObjective, 5, 500)) {
          newErrors.mainObjective = "Objetivo deve ter entre 5 e 500 caracteres";
          isValid = false;
        }
        if (!validateText(formData.currentSituation, 5, 500)) {
          newErrors.currentSituation = "Situação atual deve ter entre 5 e 500 caracteres";
          isValid = false;
        }
        if (!validateText(formData.targetAudience, 5, 300)) {
          newErrors.targetAudience = "Público-alvo deve ter entre 5 e 300 caracteres";
          isValid = false;
        }
      }

      if (formData.step === 3) {
        if (formData.requiredFeatures.length === 0) {
          newErrors.requiredFeatures = "Selecione pelo menos uma funcionalidade";
          isValid = false;
        }
        if (!formData.techStack) {
          newErrors.techStack = "Selecione uma abordagem de tecnologia";
          isValid = false;
        }
      }

      if (formData.step === 4) {
        if (!formData.scalability) {
          newErrors.scalability = "Selecione o nível de escalabilidade";
          isValid = false;
        }
        if (!formData.budget) {
          newErrors.budget = "Selecione um orçamento";
          isValid = false;
        }
        if (!formData.timeline) {
          newErrors.timeline = "Selecione uma timeline";
          isValid = false;
        }
        if (!formData.teamSize) {
          newErrors.teamSize = "Selecione o tamanho da sua equipe";
          isValid = false;
        }
      }

      setErrors(newErrors);
      if (isValid) {
        setFormData((prev) => ({ ...prev, step: (prev.step + 1) as 1 | 2 | 3 | 4 | 5 }));
      }
    }
  }, [formData.company, formData.projectType, formData.mainObjective, formData.currentSituation, formData.targetAudience, formData.requiredFeatures, formData.techStack, formData.scalability, formData.budget, formData.timeline, formData.teamSize, formData.step]);

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
      await new Promise((resolve) => setTimeout(resolve, 500));

      const message = `
*Questionário - Sistemas Personalizados*

📋 *Empresa*: ${sanitizeInput(formData.company)}
🎯 *Tipo de Projeto*: ${formData.projectType}
🚀 *Objetivo Principal*: ${sanitizeInput(formData.mainObjective)}
📊 *Situação Atual*: ${sanitizeInput(formData.currentSituation)}
👥 *Público-Alvo*: ${sanitizeInput(formData.targetAudience)}

*Funcionalidades Necessárias*:
${formData.requiredFeatures.map((f) => `• ${f}`).join("\n")}

💻 *Abordagem de Tecnologia*: ${formData.techStack}
🔗 *Integrações*: ${sanitizeInput(formData.integrations) || "Nenhuma específica"}
📈 *Escalabilidade*: ${formData.scalability}
💰 *Orçamento*: ${formData.budget}
📅 *Timeline*: ${formData.timeline}
👨‍💼 *Tamanho da Equipe*: ${formData.teamSize}

*Suporte Necessário*:
${formData.supportNeeded.map((s) => `• ${s}`).join("\n") || "• Não especificado"}

*Contato*
👤 Nome: ${sanitizeInput(formData.contactName)}
📧 Email: ${sanitizeInput(formData.contactEmail)}
📱 Telefone: ${sanitizeInput(formData.contactPhone)}

_Enviado via GLV Consulta em ${new Date().toLocaleString("pt-BR")}_
      `;

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
          projectType: "",
          mainObjective: "",
          currentSituation: "",
          targetAudience: "",
          requiredFeatures: [],
          techStack: "",
          integrations: "",
          scalability: "",
          budget: "",
          timeline: "",
          teamSize: "",
          supportNeeded: [],
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
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600/90 to-cyan-600/90 backdrop-blur-xl border-b border-blue-400/20 p-5 sm:p-7 flex items-center justify-between z-10 shadow-lg shadow-blue-500/10">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
                  <span className="text-3xl">💻</span> Sistemas Personalizados
                </h2>
                <p className="text-sm text-blue-100 mt-1">Seu projeto em 5 passos</p>
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

            {/* Progress */}
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

            {/* Form Content */}
            <motion.form
              onSubmit={handleSubmit}
              className="p-5 sm:p-7 space-y-6"
              key={formData.step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 1: Project Info */}
              {formData.step === 1 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      1.
                    </span>
                    Informações do Projeto
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      📌 Nome da Sua Empresa
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
                      🎯 Tipo de Projeto
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => handleInputChange("projectType", e.target.value)}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer ${
                        errors.projectType
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="website-corporativo">Website Corporativo</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="saas">SaaS (Software as a Service)</option>
                      <option value="erp">ERP (Enterprise Resource Planning)</option>
                      <option value="app-mobile">App Mobile (iOS/Android)</option>
                      <option value="sistema-gerencial">Sistema Gerencial/Administrativo</option>
                      <option value="crm">CRM (Customer Relationship)</option>
                      <option value="portal-cliente">Portal/Plataforma Cliente</option>
                      <option value="outro">Outro</option>
                    </select>
                    {errors.projectType && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.projectType}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Goals & Context */}
              {formData.step === 2 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      2.
                    </span>
                    Objetivos & Contexto
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      🚀 Qual é o objetivo principal do projeto?
                    </label>
                    <textarea
                      value={formData.mainObjective}
                      onChange={(e) => handleInputChange("mainObjective", e.target.value)}
                      placeholder="ex: Aumentar vendas online, melhorar eficiência operacional, automatizar processos..."
                      maxLength={500}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all font-medium resize-none h-28 ${
                        errors.mainObjective
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    />
                    <div className="flex items-center justify-between mt-2">
                      {errors.mainObjective && (
                        <motion.p className="text-red-400 text-sm flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle className="w-4 h-4" /> {errors.mainObjective}
                        </motion.p>
                      )}
                      <span className="text-xs text-gray-400 ml-auto">{formData.mainObjective.length}/500</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      📊 Como é a situação atual?
                    </label>
                    <textarea
                      value={formData.currentSituation}
                      onChange={(e) => handleInputChange("currentSituation", e.target.value)}
                      placeholder="ex: Processamos tudo manualmente, usamos planilhas, não temos presença online..."
                      maxLength={500}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all font-medium resize-none h-28 ${
                        errors.currentSituation
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    />
                    <div className="flex items-center justify-between mt-2">
                      {errors.currentSituation && (
                        <motion.p className="text-red-400 text-sm flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle className="w-4 h-4" /> {errors.currentSituation}
                        </motion.p>
                      )}
                      <span className="text-xs text-gray-400 ml-auto">{formData.currentSituation.length}/500</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      👥 Qual é seu público-alvo?
                    </label>
                    <input
                      type="text"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                      placeholder="ex: Pequenas empresas, freelancers, e-commerce, B2B..."
                      maxLength={300}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all font-medium ${
                        errors.targetAudience
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    />
                    {errors.targetAudience && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.targetAudience}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Features & Tech */}
              {formData.step === 3 && (
                <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      3.
                    </span>
                    Funcionalidades & Tecnologia
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3.5">
                      ✅ Funcionalidades Necessárias (selecione todas que se aplicam)
                    </label>
                    <div className="space-y-2.5 max-h-48 overflow-y-auto pr-2">
                      {[
                        "Autenticação de usuários (login/cadastro)",
                        "Painel administrativo",
                        "Relatórios e dashboards",
                        "Integração com APIs",
                        "Processamento de pagamentos",
                        "Sistema de notificações",
                        "Chat/Suporte ao cliente",
                        "Busca avançada",
                        "Exportação de dados",
                        "Controle de permissões",
                      ].map((feature) => (
                        <motion.button
                          key={feature}
                          type="button"
                          onClick={() => toggleFeature(feature)}
                          className={`w-full p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                            formData.requiredFeatures.includes(feature)
                              ? "border-blue-500/80 bg-blue-500/20 text-blue-50 shadow-lg shadow-blue-500/20"
                              : "border-blue-500/20 bg-gray-800/30 text-gray-300 hover:border-blue-500/40 hover:bg-gray-800/50"
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <CheckCircle
                            className={`w-5 h-5 flex-shrink-0 transition-all ${
                              formData.requiredFeatures.includes(feature)
                                ? "text-blue-400"
                                : "text-gray-500"
                            }`}
                            fill={formData.requiredFeatures.includes(feature) ? "currentColor" : "none"}
                          />
                          <span className="font-medium">{feature}</span>
                        </motion.button>
                      ))}
                    </div>
                    {errors.requiredFeatures && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.requiredFeatures}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      💻 Qual é sua preferência de tecnologia?
                    </label>
                    <select
                      value={formData.techStack}
                      onChange={(e) => handleInputChange("techStack", e.target.value)}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer ${
                        errors.techStack
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="sem-preferencia">Sem preferência (indicar melhor solução)</option>
                      <option value="react-node">React/Vue + Node.js (Web moderno)</option>
                      <option value="laravel">Laravel (PHP, rápido e testado)</option>
                      <option value="net">ASP.NET/C# (Enterprise)</option>
                      <option value="python">Python (Django/FastAPI)</option>
                      <option value="mobile-native">Mobile nativo (Swift/Kotlin)</option>
                      <option value="cross-platform">Cross-platform (React Native/Flutter)</option>
                      <option value="serverless">Serverless/Cloud-first</option>
                    </select>
                    {errors.techStack && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.techStack}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      🔗 Integrações necessárias (se houver)
                    </label>
                    <input
                      type="text"
                      value={formData.integrations}
                      onChange={(e) => handleInputChange("integrations", e.target.value)}
                      placeholder="ex: Stripe, Shopify, SAP, Google Analytics, Whatsapp API..."
                      maxLength={200}
                      className="w-full bg-gray-800/40 border-2 border-blue-500/30 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium"
                    />
                    <span className="text-xs text-gray-400 mt-2 block">{formData.integrations.length}/200</span>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Scale & Timeline */}
              {formData.step === 4 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      4.
                    </span>
                    Escala, Orçamento & Timeline
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      📈 Como o sistema deve crescer?
                    </label>
                    <select
                      value={formData.scalability}
                      onChange={(e) => handleInputChange("scalability", e.target.value)}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer ${
                        errors.scalability
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="pequeno">Pequeno (até 100 usuários)</option>
                      <option value="medio">Médio (100 a 1.000 usuários)</option>
                      <option value="grande">Grande (1.000 a 100.000 usuários)</option>
                      <option value="ultra-escala">Ultra escala (100.000+ usuários)</option>
                    </select>
                    {errors.scalability && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.scalability}
                      </motion.p>
                    )}
                  </div>

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
                      <option value="ate-15k">Até R$ 15.000</option>
                      <option value="15k-50k">R$ 15.000 - R$ 50.000</option>
                      <option value="50k-100k">R$ 50.000 - R$ 100.000</option>
                      <option value="100k-300k">R$ 100.000 - R$ 300.000</option>
                      <option value="300k+">Acima de R$ 300.000</option>
                      <option value="flexivel">Flexível / A discutir</option>
                    </select>
                    {errors.budget && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.budget}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      📅 Qual é a timeline desejada?
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
                      <option value="mvp-1-2-meses">MVP em 1-2 meses</option>
                      <option value="3-6-meses">3-6 meses</option>
                      <option value="6-12-meses">6-12 meses</option>
                      <option value="12-meses-plus">Mais de 12 meses</option>
                      <option value="indefinido">Indefinido</option>
                    </select>
                    {errors.timeline && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.timeline}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      👨‍💼 Tamanho da sua equipe
                    </label>
                    <select
                      value={formData.teamSize}
                      onChange={(e) => handleInputChange("teamSize", e.target.value)}
                      className={`w-full bg-gray-800/40 border-2 rounded-xl px-4 py-3 text-white focus:outline-none transition-all font-medium appearance-none cursor-pointer ${
                        errors.teamSize
                          ? "border-red-500/50 focus:ring-2 focus:ring-red-500/50"
                          : "border-blue-500/30 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                      }`}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option value="solo">Solo/Freelancer</option>
                      <option value="1-5">1-5 pessoas</option>
                      <option value="5-20">5-20 pessoas</option>
                      <option value="20-100">20-100 pessoas</option>
                      <option value="100+">100+ pessoas</option>
                    </select>
                    {errors.teamSize && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.teamSize}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 5: Support & Contact */}
              {formData.step === 5 && (
                <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      5.
                    </span>
                    Suporte & Contato
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3.5">
                      📞 Que tipo de suporte você precisa? (selecione todas que se aplicam)
                    </label>
                    <div className="space-y-2.5">
                      {[
                        "Desenvolvimento apenas",
                        "Desenvolvimento + Deploy/Hospedagem",
                        "Desenvolvimento + Suporte técnico contínuo",
                        "Desenvolvimento + Manutenção completa",
                        "Consultoria de arquitetura",
                        "Treinamento para sua equipe",
                      ].map((support) => (
                        <motion.button
                          key={support}
                          type="button"
                          onClick={() => toggleSupport(support)}
                          className={`w-full p-3.5 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${
                            formData.supportNeeded.includes(support)
                              ? "border-blue-500/80 bg-blue-500/20 text-blue-50 shadow-lg shadow-blue-500/20"
                              : "border-blue-500/20 bg-gray-800/30 text-gray-300 hover:border-blue-500/40 hover:bg-gray-800/50"
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <CheckCircle
                            className={`w-5 h-5 flex-shrink-0 transition-all ${
                              formData.supportNeeded.includes(support)
                                ? "text-blue-400"
                                : "text-gray-500"
                            }`}
                            fill={formData.supportNeeded.includes(support) ? "currentColor" : "none"}
                          />
                          <span className="font-medium text-sm">{support}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-6 border-t border-blue-500/20">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      📋 Seus dados de contato
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

              {/* Error Message */}
              {errors.submit && (
                <motion.div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 flex items-start gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm">{errors.submit}</p>
                </motion.div>
              )}

              {/* Success Message */}
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
                    <p className="text-emerald-200 text-sm mt-0.5">Abrindo WhatsApp com seu briefing...</p>
                  </div>
                </motion.div>
              )}
            </motion.form>

            {/* Footer Buttons */}
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
                      ✓ Enviar Briefing
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

export default SystemQuestionnaire;
