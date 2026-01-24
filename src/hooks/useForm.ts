/**
 * Hook customizado para gerenciar estado de formulários
 */
import { useState, useCallback } from "react";
import { ValidationErrors } from "../utils/validation";

interface UseFormOptions<T extends Record<string, unknown>> {
  initialValues: T;
  onSubmit: (values: T) => Promise<void> | void;
  validate?: (values: T) => ValidationErrors;
}

interface UseFormReturn<T extends Record<string, unknown>> {
  values: T;
  errors: ValidationErrors;
  isSubmitting: boolean;
  setFieldValue: (field: keyof T, value: unknown) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setValues: (values: T) => void;
  setErrors: (errors: ValidationErrors) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useForm<T extends Record<string, unknown>>(
  options: UseFormOptions<T>
): UseFormReturn<T> {
  const [values, setValues] = useState<T>(options.initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const setFieldValue = useCallback((field: keyof T, value: unknown) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Limpar erro do campo quando usuário começa a digitar
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[String(field)];
      return newErrors;
    });
  }, []);

  const setFieldError = useCallback((field: keyof T, error: string) => {
    setErrors((prev) => ({ ...prev, [String(field)]: error }));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFieldValue(name as keyof T, value);
    },
    [setFieldValue]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Validar se existe função de validação
      if (options.validate) {
        const newErrors = options.validate(values);
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      }

      try {
        setIsSubmitting(true);
        await options.onSubmit(values);
      } catch (error) {
        console.error("Erro ao submeter formulário:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [values, options]
  );

  const resetForm = useCallback(() => {
    setValues(options.initialValues);
    setErrors({});
  }, [options.initialValues]);

  return {
    values,
    errors,
    isSubmitting,
    setFieldValue,
    setFieldError,
    setValues,
    setErrors,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
