import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  X,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Bot,
  Building2,
  Users,
  Target,
  FileText,
  Clock,
  Wrench,
  BadgeDollarSign,
  Calendar,
  CheckSquare,
  Phone,
  Loader2,
} from "lucide-react";
import DOMPurify from "dompurify";
import ModalBase from "./ModalBase";
import {
  GlassChoiceButton,
  GlassDropdown,
  GlassInput,
  GlassTextarea,
} from "../forms/glass/GlassControls";

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
    <ModalBase
      open={isOpen}
      onClose={onClose}
      size="2xl"
      showCloseButton={false}
      className="shadow-2xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-h-[90vh] min-h-0">
        {/* Header */}
        <div className="shrink-0 bg-white/10 backdrop-blur-xl border-b border-white/10 p-5 sm:p-7 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Bot className="w-7 h-7 text-white/90" /> IA Aplicada
            </h2>
            <p className="text-sm text-white/70 mt-1">Personalize sua solução em 5 passos</p>
          </motion.div>
          <motion.button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full transition-colors bg-white/5 hover:bg-white/10 border border-white/10"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Indicador de Progresso (fixo) */}
        <div className="shrink-0 p-5 sm:p-7 border-b border-white/10 bg-white/5">
          <div className="flex justify-between items-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex-1 flex items-center gap-2">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-lg ${
                    step === formData.step
                      ? "bg-blue-500/20 text-blue-50 ring-4 ring-blue-500/20 border border-blue-400/40"
                      : step < formData.step
                      ? "bg-blue-500/15 text-blue-50 border border-blue-400/30"
                      : "bg-white/5 text-white/50 border border-white/10"
                  }`}
                  animate={{
                    scale: step === formData.step ? 1.15 : 1,
                    boxShadow:
                      step === formData.step
                        ? "0 0 22px rgba(59, 130, 246, 0.45)"
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
                        ? "bg-blue-500/40"
                        : "bg-white/10"
                    }`}
                    animate={{ scaleX: step < formData.step ? 1 : 0.5 }}
                  />
                )}
              </div>
            ))}
          </div>
          <motion.p className="text-center text-sm text-white/70 font-medium">
            Etapa <span className="text-blue-500 font-bold">{formData.step}</span> de 5
          </motion.p>
        </div>

        {/* Área rolável (apenas perguntas) */}
        <div className="flex-1 min-h-0 overflow-y-auto">
          <motion.div
            className="p-5 sm:p-7 space-y-6"
            key={formData.step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
              {/* Etapa 1: Informações da Empresa */}
              {formData.step === 1 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl text-blue-500">
                      1.
                    </span>
                    Informações da Empresa
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-white/70" />
                        Nome da Empresa
                      </span>
                    </label>
                    <GlassInput
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="ex: Tech Solutions Ltda."
                      maxLength={100}
                      hasError={!!errors.company}
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
                      <span className="inline-flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/70" />
                        Tamanho da Empresa
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.companySize}
                      onChange={(v) => handleInputChange("companySize", v)}
                      hasError={!!errors.companySize}
                      options={[
                        { label: "1-10 pessoas", value: "1-10" },
                        { label: "11-50 pessoas", value: "11-50" },
                        { label: "51-100 pessoas", value: "51-100" },
                        { label: "101-500 pessoas", value: "101-500" },
                        { label: "500+ pessoas", value: "500+" },
                      ]}
                    />
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
                    <span className="text-2xl text-blue-500">
                      2.
                    </span>
                    Desafios Principais
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <Target className="w-4 h-4 text-white/70" />
                        Qual é seu maior desafio atual?
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.mainChallenge}
                      onChange={(v) => handleInputChange("mainChallenge", v)}
                      hasError={!!errors.mainChallenge}
                      options={[
                        { label: "Tarefas Repetitivas", value: "tarefas-repetitivas" },
                        { label: "Atendimento com Alto Volume", value: "atendimento-volume" },
                        { label: "Integração de Sistemas", value: "integracao-sistemas" },
                        { label: "Análise e Relatórios de Dados", value: "analise-dados" },
                        { label: "Automação de Processos", value: "automacao-processos" },
                        { label: "Outro", value: "outro" },
                      ]}
                    />
                    {errors.mainChallenge && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.mainChallenge}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <FileText className="w-4 h-4 text-white/70" />
                        Descreva brevemente o processo que deseja automatizar
                      </span>
                    </label>
                    <GlassTextarea
                      value={formData.processDescription}
                      onChange={(e) => handleInputChange("processDescription", e.target.value)}
                      placeholder="ex: Nossos vendedores recebem e-mails de clientes e precisam inserir dados em 3 sistemas diferentes..."
                      maxLength={500}
                      className="resize-none h-32"
                      hasError={!!errors.processDescription}
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
                    <span className="text-2xl text-blue-500">
                      3.
                    </span>
                    Volume & Ferramentas
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white/70" />
                        Com que frequência este processo ocorre?
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.frequency}
                      onChange={(v) => handleInputChange("frequency", v)}
                      hasError={!!errors.frequency}
                      options={[
                        { label: "Diária", value: "diaria" },
                        { label: "Várias vezes ao dia", value: "varias-vezes-dia" },
                        { label: "Semanal", value: "semanal" },
                        { label: "Mensal", value: "mensal" },
                        { label: "Conforme a demanda", value: "conforme-demanda" },
                      ]}
                    />
                    {errors.frequency && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.frequency}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-white/70" />
                        Quais ferramentas/sistemas estão envolvidos?
                      </span>
                    </label>
                    <GlassInput
                      type="text"
                      value={formData.currentTooling}
                      onChange={(e) => handleInputChange("currentTooling", e.target.value)}
                      placeholder="ex: Gmail, Shopify, Trello, SAP, etc."
                      maxLength={200}
                    />
                    <span className="text-xs text-gray-400 mt-2 block">{formData.currentTooling.length}/200</span>
                  </div>
                </motion.div>
              )}

              {/* Etapa 4: Orçamento & Timeline */}
              {formData.step === 4 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl text-blue-500">
                      4.
                    </span>
                    Orçamento & Timeline
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <BadgeDollarSign className="w-4 h-4 text-white/70" />
                        Qual é o orçamento estimado?
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.budget}
                      onChange={(v) => handleInputChange("budget", v)}
                      hasError={!!errors.budget}
                      options={[
                        { label: "Até R$ 5.000", value: "ate-5k" },
                        { label: "R$ 5.000 - R$ 15.000", value: "5k-15k" },
                        { label: "R$ 15.000 - R$ 50.000", value: "15k-50k" },
                        { label: "R$ 50.000 - R$ 100.000", value: "50k-100k" },
                        { label: "Acima de R$ 100.000", value: "100k+" },
                        { label: "Flexível", value: "flexivel" },
                      ]}
                    />
                    {errors.budget && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.budget}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-white/70" />
                        Quando você gostaria de começar?
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.timeline}
                      onChange={(v) => handleInputChange("timeline", v)}
                      hasError={!!errors.timeline}
                      options={[
                        { label: "Imediatamente", value: "imediatamente" },
                        { label: "Próximo mês", value: "proximo-mes" },
                        { label: "Próximo trimestre", value: "proximo-trimestre" },
                        { label: "Próximo semestre", value: "proximo-semestre" },
                        { label: "Indefinido", value: "indefinido" },
                      ]}
                    />
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
                    <span className="text-2xl text-blue-500">
                      5.
                    </span>
                    Expectativas & Contato
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3.5">
                      <span className="inline-flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-white/70" />
                        O que você espera alcançar? (selecione todas que se aplicam)
                      </span>
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
                        <GlassChoiceButton
                          key={exp}
                          selected={formData.expectations.includes(exp)}
                          onClick={() => toggleExpectation(exp)}
                        >
                          {exp}
                        </GlassChoiceButton>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-6 border-t border-blue-500/20">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Phone className="w-4 h-4 text-white/70" />
                      Seus dados de contato
                    </h4>

                    <div>
                      <GlassInput
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Nome completo"
                        maxLength={100}
                        hasError={!!errors.contactName}
                        required
                      />
                      {errors.contactName && (
                        <motion.p className="text-red-400 text-xs mt-1.5 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle className="w-3 h-3" /> {errors.contactName}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <GlassInput
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                        placeholder="seu@email.com"
                        maxLength={100}
                        hasError={!!errors.contactEmail}
                        required
                      />
                      {errors.contactEmail && (
                        <motion.p className="text-red-400 text-xs mt-1.5 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                          <AlertCircle className="w-3 h-3" /> {errors.contactEmail}
                        </motion.p>
                      )}
                    </div>

                    <div>
                      <GlassInput
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                        placeholder="(11) 99999-9999"
                        maxLength={20}
                        hasError={!!errors.contactPhone}
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
                    <p className="text-emerald-100 font-bold">Sucesso!</p>
                    <p className="text-emerald-200 text-sm mt-0.5">Abrindo WhatsApp com seu orçamento personalizado...</p>
                  </div>
                </motion.div>
              )}
          </motion.div>
        </div>

        {/* Footer fixo */}
        <div className="shrink-0 bg-white/5 backdrop-blur-xl border-t border-white/10 p-5 sm:p-7 flex gap-3">
          {formData.step > 1 && (
            <motion.button
              type="button"
              onClick={prevStep}
              className="flex-1 px-4 py-3 sm:py-3.5 rounded-xl border border-white/15 text-white/80 hover:bg-white/10 hover:border-white/25 font-bold transition-all text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Voltar
            </motion.button>
          )}

              {formData.step < 5 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="flex-1 px-4 py-3 sm:py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-blue-500/30 active:shadow-blue-500/10"
                  whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Próximo <ChevronRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={submitted || isLoading}
                  className="flex-1 px-4 py-3 sm:py-3.5 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg shadow-blue-500/30 active:shadow-blue-500/10"
                  whileHover={!submitted && !isLoading ? { scale: 1.03, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" } : {}}
                  whileTap={!submitted && !isLoading ? { scale: 0.97 } : {}}
                >
                  {isLoading ? (
                    <>
                      <motion.span
                        aria-hidden="true"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 className="w-4 h-4" />
                      </motion.span>
                      Processando...
                    </>
                  ) : submitted ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Redirecionando
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Enviar Orçamento
                    </>
                  )}
                </motion.button>
              )}
        </div>
      </form>
    </ModalBase>
  );
};

export default IAQuestionnaire;
