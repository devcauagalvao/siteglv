/**
 * Funções de formatação reutilizáveis
 */

/**
 * Formata número de telefone no padrão +55 (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX
 */
export const formatPhone = (phoneNumber?: string): string => {
  if (!phoneNumber) return "";

  const digits = phoneNumber.replace(/\D/g, "");

  // Esperado: CC(2) + DDD(2) + número (8 ou 9)
  if (digits.length < 10) return phoneNumber; // fallback se não bater

  if (digits.length >= 12) {
    // Formato internacional: +CC (DDD) XXXXX-XXXX
    const cc = digits.slice(0, 2);
    const ddd = digits.slice(2, 4);
    const local = digits.slice(4);

    let formatted = local;
    if (local.length === 9) {
      // Celular: 5-4
      formatted = `${local.slice(0, 5)}-${local.slice(5)}`;
    } else if (local.length === 8) {
      // Fixo: 4-4
      formatted = `${local.slice(0, 4)}-${local.slice(4)}`;
    }

    return `+${cc} (${ddd}) ${formatted}`;
  }

  if (digits.length === 11) {
    // Apenas DDD + número (celular)
    const ddd = digits.slice(0, 2);
    const number = digits.slice(2);
    return `(${ddd}) ${number.slice(0, 5)}-${number.slice(5)}`;
  }

  if (digits.length === 10) {
    // Apenas DDD + número (fixo)
    const ddd = digits.slice(0, 2);
    const number = digits.slice(2);
    return `(${ddd}) ${number.slice(0, 4)}-${number.slice(4)}`;
  }

  return phoneNumber;
};

/**
 * Formata valor em moeda brasileira
 */
export const formatCurrency = (value: number | string): string => {
  const num = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(num);
};

/**
 * Formata data para padrão br DD/MM/YYYY
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("pt-BR").format(dateObj);
};

/**
 * Trunca texto com reticências
 */
export const truncateText = (text: string, length: number): string => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};
