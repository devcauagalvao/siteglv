import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Menu, MenuButton, MenuItem, MenuItems, Portal } from "@headlessui/react";
import {
  X,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Building2,
  LayoutGrid,
  Rocket,
  BarChart3,
  Users,
  CheckSquare,
  Cpu,
  Link2,
  TrendingUp,
  BadgeDollarSign,
  Calendar,
  UsersRound,
  Phone,
  Loader2,
  Monitor,
} from "lucide-react";
import DOMPurify from "dompurify";
import ModalBase from "./ModalBase";

type DropdownOption = { label: string; value: string };

type GlassDropdownProps = {
  value: string;
  onChange: (value: string) => void;
  options: DropdownOption[];
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
};

const GlassDropdown: React.FC<GlassDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = "Selecione...",
  disabled,
  hasError,
}) => {
  const selectedLabel = options.find((o) => o.value === value)?.label;

  return (
    <Menu>
      <MenuButton
        disabled={disabled}
        className={[
          "inline-flex w-full items-center justify-between gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-inner shadow-white/10",
          "bg-white/5 text-white border border-white/10",
          "focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/20",
          "data-[hover]:bg-white/10 data-[open]:bg-white/10",
          disabled ? "cursor-not-allowed opacity-60" : "",
          hasError ? "border-red-500/40" : "",
        ].join(" ")}
      >
        <span className={value ? "text-white" : "text-white/50"}>
          {selectedLabel ?? placeholder}
        </span>
        <ChevronDown className="w-4 h-4 text-white/60" />
      </MenuButton>

      <Portal>
        <MenuItems
          transition
          anchor="bottom start"
          className="z-[2147483647] w-[var(--button-width)] origin-top-left rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl p-1 text-sm text-white shadow-2xl transition duration-100 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
          style={{ zIndex: 2147483647 }}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value}>
              <button
                type="button"
                onClick={() => onChange(opt.value)}
                className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 data-[focus]:bg-white/10"
              >
                <span className={value === opt.value ? "text-white" : "text-white/80"}>
                  {opt.label}
                </span>
                {value === opt.value && (
                  <CheckCircle className="ml-auto w-4 h-4 text-white/70" />
                )}
              </button>
            </MenuItem>
          ))}
        </MenuItems>
      </Portal>
    </Menu>
  );
};

const glassFieldBaseClass =
  "w-full rounded-xl px-4 py-3 text-sm font-semibold shadow-inner shadow-white/10 bg-white/5 text-white border border-white/10 placeholder-white/50 caret-white/80 focus:outline-none focus-visible:outline-none focus:ring-0 focus:border-white/15 hover:bg-white/10";

const glassFieldErrorClass = "border-red-500/40 focus:border-red-500/50";

const glassChoiceBaseClass =
  "w-full rounded-xl px-4 py-3 text-left text-sm font-semibold shadow-inner shadow-white/10 bg-white/5 text-white border border-white/10 hover:bg-white/10 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/20 transition-all flex items-center gap-3";

const glassChoiceSelectedClass = "bg-white/10 border-white/20 shadow-2xl shadow-white/10";

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
    <ModalBase open={isOpen} onClose={onClose} size="2xl" showCloseButton={false} className="shadow-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-h-[90vh] min-h-0">
        {/* Header */}
        <div className="shrink-0 bg-white/10 backdrop-blur-xl border-b border-white/10 p-5 sm:p-7 flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-2xl sm:text-3xl font-bold text-white flex items-center gap-2">
              <Monitor className="w-7 h-7 text-white/90" /> Sistemas Personalizados
            </h2>
            <p className="text-sm text-white/70 mt-1">Seu projeto em 5 passos</p>
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
                      step === formData.step ? "0 0 22px rgba(59, 130, 246, 0.45)" : "none",
                  }}
                >
                  {step < formData.step ? <CheckCircle className="w-5 h-5" /> : step}
                </motion.div>
                {step < 5 && (
                  <motion.div
                    className={`h-1.5 flex-1 rounded-full transition-all ${
                      step < formData.step ? "bg-blue-500/40" : "bg-white/10"
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
              {/* Step 1: Project Info */}
              {formData.step === 1 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl text-blue-500">1.</span>
                    Informações do Projeto
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-white/70" />
                        Nome da Sua Empresa
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange("company", e.target.value)}
                      placeholder="ex: Tech Solutions Ltda."
                      maxLength={100}
                      className={[glassFieldBaseClass, errors.company ? glassFieldErrorClass : ""].join(" ")}
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
                        <LayoutGrid className="w-4 h-4 text-white/70" />
                        Tipo de Projeto
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.projectType}
                      onChange={(v) => handleInputChange("projectType", v)}
                      hasError={!!errors.projectType}
                      options={[
                        { label: "Website Corporativo", value: "website-corporativo" },
                        { label: "E-commerce", value: "ecommerce" },
                        { label: "SaaS (Software as a Service)", value: "saas" },
                        { label: "ERP (Enterprise Resource Planning)", value: "erp" },
                        { label: "App Mobile (iOS/Android)", value: "app-mobile" },
                        { label: "Sistema Gerencial/Administrativo", value: "sistema-gerencial" },
                        { label: "CRM (Customer Relationship)", value: "crm" },
                        { label: "Portal/Plataforma Cliente", value: "portal-cliente" },
                        { label: "Outro", value: "outro" },
                      ]}
                    />
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
                    <span className="text-2xl text-blue-500">2.</span>
                    Objetivos & Contexto
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <Rocket className="w-4 h-4 text-white/70" />
                        Qual é o objetivo principal do projeto?
                      </span>
                    </label>
                    <textarea
                      value={formData.mainObjective}
                      onChange={(e) => handleInputChange("mainObjective", e.target.value)}
                      placeholder="ex: Aumentar vendas online, melhorar eficiência operacional, automatizar processos..."
                      maxLength={500}
                      className={[
                        glassFieldBaseClass,
                        "resize-none h-28",
                        errors.mainObjective ? glassFieldErrorClass : "",
                      ].join(" ")}
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
                      <span className="inline-flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-white/70" />
                        Como é a situação atual?
                      </span>
                    </label>
                    <textarea
                      value={formData.currentSituation}
                      onChange={(e) => handleInputChange("currentSituation", e.target.value)}
                      placeholder="ex: Processamos tudo manualmente, usamos planilhas, não temos presença online..."
                      maxLength={500}
                      className={[
                        glassFieldBaseClass,
                        "resize-none h-28",
                        errors.currentSituation ? glassFieldErrorClass : "",
                      ].join(" ")}
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
                      <span className="inline-flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/70" />
                        Qual é seu público-alvo?
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.targetAudience}
                      onChange={(e) => handleInputChange("targetAudience", e.target.value)}
                      placeholder="ex: Pequenas empresas, freelancers, e-commerce, B2B..."
                      maxLength={300}
                      className={[glassFieldBaseClass, errors.targetAudience ? glassFieldErrorClass : ""].join(" ")}
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
                    <span className="text-2xl text-blue-500">3.</span>
                    Funcionalidades & Tecnologia
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3.5">
                      <span className="inline-flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-white/70" />
                        Funcionalidades Necessárias (selecione todas que se aplicam)
                      </span>
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
                          className={[
                            glassChoiceBaseClass,
                            formData.requiredFeatures.includes(feature) ? glassChoiceSelectedClass : "text-white/80",
                          ].join(" ")}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <CheckCircle
                            className={`w-5 h-5 flex-shrink-0 transition-all ${
                              formData.requiredFeatures.includes(feature)
                                ? "text-white/80"
                                : "text-white/35"
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
                      <span className="inline-flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-white/70" />
                        Qual é sua preferência de tecnologia?
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.techStack}
                      onChange={(v) => handleInputChange("techStack", v)}
                      hasError={!!errors.techStack}
                      options={[
                        { label: "Sem preferência (indicar melhor solução)", value: "sem-preferencia" },
                        { label: "React/Vue + Node.js (Web moderno)", value: "react-node" },
                        { label: "Laravel (PHP, rápido e testado)", value: "laravel" },
                        { label: "ASP.NET/C# (Enterprise)", value: "net" },
                        { label: "Python (Django/FastAPI)", value: "python" },
                        { label: "Mobile nativo (Swift/Kotlin)", value: "mobile-native" },
                        { label: "Cross-platform (React Native/Flutter)", value: "cross-platform" },
                        { label: "Serverless/Cloud-first", value: "serverless" },
                      ]}
                    />
                    {errors.techStack && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.techStack}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <Link2 className="w-4 h-4 text-white/70" />
                        Integrações necessárias (se houver)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={formData.integrations}
                      onChange={(e) => handleInputChange("integrations", e.target.value)}
                      placeholder="ex: Stripe, Shopify, SAP, Google Analytics, Whatsapp API..."
                      maxLength={200}
                      className={glassFieldBaseClass}
                    />
                    <span className="text-xs text-gray-400 mt-2 block">{formData.integrations.length}/200</span>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Scale & Timeline */}
              {formData.step === 4 && (
                <motion.div className="space-y-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl text-blue-500">4.</span>
                    Escala, Orçamento & Timeline
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-white/70" />
                        Como o sistema deve crescer?
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.scalability}
                      onChange={(v) => handleInputChange("scalability", v)}
                      hasError={!!errors.scalability}
                      options={[
                        { label: "Pequeno (até 100 usuários)", value: "pequeno" },
                        { label: "Médio (100 a 1.000 usuários)", value: "medio" },
                        { label: "Grande (1.000 a 100.000 usuários)", value: "grande" },
                        { label: "Ultra escala (100.000+ usuários)", value: "ultra-escala" },
                      ]}
                    />
                    {errors.scalability && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.scalability}
                      </motion.p>
                    )}
                  </div>

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
                        { label: "Até R$ 15.000", value: "ate-15k" },
                        { label: "R$ 15.000 - R$ 50.000", value: "15k-50k" },
                        { label: "R$ 50.000 - R$ 100.000", value: "50k-100k" },
                        { label: "R$ 100.000 - R$ 300.000", value: "100k-300k" },
                        { label: "Acima de R$ 300.000", value: "300k+" },
                        { label: "Flexível / A discutir", value: "flexivel" },
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
                        Qual é a timeline desejada?
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.timeline}
                      onChange={(v) => handleInputChange("timeline", v)}
                      hasError={!!errors.timeline}
                      options={[
                        { label: "MVP em 1-2 meses", value: "mvp-1-2-meses" },
                        { label: "3-6 meses", value: "3-6-meses" },
                        { label: "6-12 meses", value: "6-12-meses" },
                        { label: "Mais de 12 meses", value: "12-meses-plus" },
                        { label: "Indefinido", value: "indefinido" },
                      ]}
                    />
                    {errors.timeline && (
                      <motion.p className="text-red-400 text-sm mt-2 flex items-center gap-1" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="w-4 h-4" /> {errors.timeline}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-2.5">
                      <span className="inline-flex items-center gap-2">
                        <UsersRound className="w-4 h-4 text-white/70" />
                        Tamanho da sua equipe
                      </span>
                    </label>
                    <GlassDropdown
                      value={formData.teamSize}
                      onChange={(v) => handleInputChange("teamSize", v)}
                      hasError={!!errors.teamSize}
                      options={[
                        { label: "Solo/Freelancer", value: "solo" },
                        { label: "1-5 pessoas", value: "1-5" },
                        { label: "5-20 pessoas", value: "5-20" },
                        { label: "20-100 pessoas", value: "20-100" },
                        { label: "100+ pessoas", value: "100+" },
                      ]}
                    />
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
                    <span className="text-2xl text-blue-500">5.</span>
                    Suporte & Contato
                  </h3>

                  <div>
                    <label className="block text-sm font-semibold text-gray-200 mb-3.5">
                      <span className="inline-flex items-center gap-2">
                        <Phone className="w-4 h-4 text-white/70" />
                        Que tipo de suporte você precisa? (selecione todas que se aplicam)
                      </span>
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
                          className={[
                            glassChoiceBaseClass,
                            formData.supportNeeded.includes(support) ? glassChoiceSelectedClass : "text-white/80",
                          ].join(" ")}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <CheckCircle
                            className={`w-5 h-5 flex-shrink-0 transition-all ${
                              formData.supportNeeded.includes(support)
                                ? "text-white/80"
                                : "text-white/35"
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
                      <Phone className="w-4 h-4 text-white/70" /> Seus dados de contato
                    </h4>

                    <div>
                      <input
                        type="text"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange("contactName", e.target.value)}
                        placeholder="Nome completo"
                        maxLength={100}
                        className={[glassFieldBaseClass, errors.contactName ? glassFieldErrorClass : ""].join(" ")}
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
                        className={[glassFieldBaseClass, errors.contactEmail ? glassFieldErrorClass : ""].join(" ")}
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
                        className={[glassFieldBaseClass, errors.contactPhone ? glassFieldErrorClass : ""].join(" ")}
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
                    <p className="text-emerald-100 font-bold">Sucesso!</p>
                    <p className="text-emerald-200 text-sm mt-0.5">Abrindo WhatsApp com seu briefing...</p>
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
                  Enviar Briefing
                </>
              )}
            </motion.button>
          )}
        </div>
      </form>
    </ModalBase>
  );
};

export default SystemQuestionnaire;
