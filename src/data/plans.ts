export type Plan = {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted: boolean;
  popular: boolean;
  gradient: string;
};

export const plans: Plan[] = [
  {
    id: 'essencial',
    name: 'Essencial',
    price: 99,
    period: 'mês',
    description: 'Para quem precisa do básico com qualidade.',
    features: [
      'Suporte por e-mail',
      'Manutenção preventiva',
      'Acesso ao portal do cliente',
    ],
    buttonText: 'Escolher Essencial',
    highlighted: false,
    popular: false,
    gradient: 'from-blue-500 to-blue-800',
  },
  {
    id: 'profissional',
    name: 'Profissional',
    price: 199,
    period: 'mês',
    description: 'Ideal para pequenas empresas em crescimento.',
    features: [
      'Suporte via WhatsApp',
      'Consultoria mensal',
      'Backup em nuvem',
    ],
    buttonText: 'Escolher Profissional',
    highlighted: true,
    popular: true,
    gradient: 'from-cyan-500 to-cyan-800',
  },
  {
    id: 'empresarial',
    name: 'Empresarial',
    price: 399,
    period: 'mês',
    description: 'Soluções avançadas e equipe dedicada.',
    features: [
      'Suporte 24/7',
      'Infraestrutura personalizada',
      'Equipe técnica dedicada',
    ],
    buttonText: 'Escolher Empresarial',
    highlighted: false,
    popular: false,
    gradient: 'from-purple-500 to-indigo-800',
  },
];
