/**
 * Funções de validação e sanitização reutilizáveis
 */
import DOMPurify from "dompurify";
import { FORM_VALIDATION } from "./constants";

export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] })
    .trim()
    .substring(0, maxLength);
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= FORM_VALIDATION.EMAIL_MAX;
};

export const validateInput = (
  input: string,
  minLength: number = 2,
  maxLength: number = 100
): boolean => {
  return input.length >= minLength && input.length <= maxLength;
};

export const validateName = (name: string): boolean =>
  validateInput(name, FORM_VALIDATION.NAME_MIN, FORM_VALIDATION.NAME_MAX);

export const validateCompany = (company: string): boolean =>
  validateInput(company, FORM_VALIDATION.COMPANY_MIN, FORM_VALIDATION.COMPANY_MAX);

export const validateMessage = (message: string): boolean =>
  validateInput(message, FORM_VALIDATION.MESSAGE_MIN, FORM_VALIDATION.MESSAGE_MAX);

export type ValidationErrors = Record<string, string>;

/**
 * Valida formulário de contato completo
 */
export const validateContactForm = (formData: {
  name: string;
  email: string;
  company: string;
  message: string;
}): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!validateName(formData.name)) {
    errors.name = `Nome deve ter entre ${FORM_VALIDATION.NAME_MIN} e ${FORM_VALIDATION.NAME_MAX} caracteres`;
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Email inválido";
  }

  if (!validateCompany(formData.company)) {
    errors.company = `Empresa deve ter entre ${FORM_VALIDATION.COMPANY_MIN} e ${FORM_VALIDATION.COMPANY_MAX} caracteres`;
  }

  if (!validateMessage(formData.message)) {
    errors.message = `Mensagem deve ter entre ${FORM_VALIDATION.MESSAGE_MIN} e ${FORM_VALIDATION.MESSAGE_MAX} caracteres`;
  }

  return errors;
};
