/**
 * Constantes globais da aplicação
 */

// Contatos e URLs
export const CONTACTS = {
  WHATSAPP: "5511919167653",
  EMAIL: "glvinformatica2024@gmail.com",
} as const;

// Usuários (para página dinâmica)
export const USERS = {
  "g3N1LD0X9Z": {
    id: "g3N1LD0X9Z",
    name: "Genildo Pereira da Silva",
    role: "Vendedor Comercial",
    avatar: "/img/employees/genildo.jpeg",
    phone: "5511996259972",
  },
} as const;

// Categorias de produtos
export const PRODUCT_CATEGORIES = [
  "Todos",
  "Restaurantes e Lanchonetes",
  "Gestão Empresarial",
  "Aplicativos e Integrações",
  "Sites e Landing Pages",
  "Projetos Sob Medida",
] as const;

// Google Analytics
export const GOOGLE_ANALYTICS_ID = "AW-17644830612" as const;

// EmailJS
export const EMAILJS_KEY = "H_rsp6SrkABlqY5RN" as const;

// reCAPTCHA
export const RECAPTCHA_KEY = "6LdQJ34qAAAAAJDZYo-e7Xg8ePgqaHg9N0MqOGy1" as const;

// Validação de formulário
export const FORM_VALIDATION = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 100,
  COMPANY_MIN: 2,
  COMPANY_MAX: 100,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 5000,
} as const;

// AI Assistant
export const AI_ASSISTANT = {
  STORAGE_KEY: "glv_ai_assistant_messages_v1",
  WELCOME_MESSAGE:
    "Olá! Sou o assistente virtual da GLV Tecnologia. Posso ajudar a personalizar Sites, ERPs, PWAs, Sites/Landing Pages e Plataformas sob medida. Como posso ajudar hoje? 😊",
} as const;
