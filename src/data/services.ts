import { Code, Brain, Wrench, Server } from "lucide-react";
import type { ComponentType } from "react";

export type ServiceItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  slug: string;
  description: string;
  features: string[];
  category: string;
  highlighted?: boolean;
  longDescription?: string;
  offerings?: string[];
  audience?: string[];
  benefits?: string[];
  outcomes?: string[];
  faqs?: Array<{ q: string; a: string }>;
  examples?: Array<{ name: string; description: string }>;
};

export const services: ServiceItem[] = [
  {
    icon: Code,
    title: "Sistemas Personalizados",
    slug: "sistemas-personalizados",
    description:
      "Soluções sob medida em web/mobile com design moderno e performance garantida.",
    features: [
      "React, Laravel, Node.js",
      "Painéis com login e APIs",
      "Banco de dados SQL/NoSQL",
      "Visual refinado com Tailwind",
    ],
    category: "Desenvolvimento",
    highlighted: true,
    longDescription:
      "Projetamos e construímos sistemas completos sob medida para o seu fluxo de trabalho, com foco em confiabilidade, segurança e uma experiência moderna para usuários e administradores.",
    offerings: [
      "Arquitetura e modelagem de dados",
      "Autenticação, autorização e auditoria",
      "Painéis administrativos e relatórios",
      "Integração com APIs internas e externas",
      "CI/CD e observabilidade (logs/monitoramento)",
    ],
    audience: [
      "Empresas que precisam digitalizar processos sob medida",
      "Times que buscam um painel administrativo sob controle",
      "Negócios com regras específicas não atendidas por soluções prontas",
    ],
    benefits: [
      "Redução de retrabalho e erros",
      "Visibilidade sobre operações e indicadores",
      "Flexibilidade para evoluir o sistema ao longo do tempo",
    ],
    outcomes: [
      "Operações mais ágeis e consistentes",
      "Decisões embasadas em dados",
      "Experiência melhor para usuários internos e clientes",
    ],
    faqs: [
      { q: "Em quanto tempo um sistema fica pronto?", a: "Dependendo do escopo, iniciamos com um MVP em semanas e evoluímos continuamente." },
      { q: "Posso integrar com sistemas que já uso?", a: "Sim, mapeamos integrações necessárias e conectamos via APIs ou conectores." },
    ],
    examples: [
      { name: "ERP leve", description: "Cadastros, estoque e faturamento para PME." },
      { name: "Portal do cliente", description: "Acesso a pedidos, documentos e tickets." },
    ],
  },
  {
    icon: Code,
    title: "Landing Pages & Sites",
    slug: "landing-pages-sites",
    description:
      "Criação de sites institucionais e páginas de vendas otimizadas para resultados.",
    features: [
      "Design responsivo",
      "Alto índice de conversão",
      "SEO e performance",
      "Hospedagem otimizada",
    ],
    category: "Desenvolvimento",
    longDescription:
      "Sites e landing pages com foco em conversão e desempenho, seguindo boas práticas de SEO e acessibilidade.",
    offerings: [
      "Design e identidade visual",
      "Copy otimizada e componentes reutilizáveis",
      "Integração com analytics e pixels",
      "Formulários, chatbot e CMS quando necessário",
    ],
    audience: ["Empresas que precisam presença digital", "Times de marketing com foco em conversão"],
    benefits: ["Maior credibilidade online", "Melhor performance e SEO", "Conversões acompanhadas"],
    outcomes: ["Aumento de leads", "Tempo de carregamento otimizado"],
    faqs: [
      { q: "O site é responsivo?", a: "Sim, desenhamos para funcionar bem em qualquer dispositivo." },
      { q: "Vocês hospedam?", a: "Podemos orientar ou provisionar uma hospedagem otimizada." },
    ],
    examples: [
      { name: "Landing de produto", description: "PPC e funil com rastreamento completo." },
      { name: "Site institucional", description: "Páginas estáticas rápidas e bem indexadas." },
    ],
  },
  {
    icon: Code,
    title: "Automação & IA",
    slug: "automacao-ia",
    description:
      "Bots, integrações e IA para automação de tarefas e decisões inteligentes.",
    features: [
      "Integração com APIs",
      "OpenAI, RPA e chatbots",
      "Análise de dados",
      "Ferramentas autônomas",
    ],
    category: "Desenvolvimento",
    longDescription:
      "Automatizamos fluxos repetitivos e conectamos sistemas para eliminar retrabalho, com apoio de IA quando faz sentido ao negócio.",
    offerings: [
      "Bots de atendimento e triagem",
      "Integrações entre ERPs e CRMs",
      "Coleta e preparação de dados",
      "Geração de relatórios automáticos",
    ],
    audience: ["Operações com tarefas repetitivas", "Atendimento com alto volume"],
    benefits: ["Economia de tempo", "Padronização de respostas", "Menos erros"],
    outcomes: ["Fluxos mais rápidos", "Relatórios automáticos"],
    faqs: [
      { q: "A automação substitui pessoas?", a: "Ela libera o time para tarefas de maior valor, reduzindo trabalhos manuais." },
      { q: "É possível começar pequeno?", a: "Sim, iniciamos por um fluxo e evoluímos conforme resultados." },
    ],
    examples: [
      { name: "Bot de WhatsApp", description: "Agendamento e FAQ com integração ao CRM." },
      { name: "ETL simples", description: "Consolidação diária de dados e envio de relatório." },
    ],
  },
  {
    icon: Brain,
    title: "Consultoria em TI",
    slug: "consultoria-ti",
    description:
      "Aconselhamento técnico e estratégico para escalar sua empresa com tecnologia.",
    features: [
      "Planejamento de sistemas",
      "Validação de produtos",
      "Otimização de processos",
      "Visão técnica + estratégica",
    ],
    category: "Consultoria",
    longDescription:
      "Apoiamos decisões estratégicas com visão técnica e de negócio, reduzindo riscos e aumentando o retorno sobre investimentos em tecnologia.",
    offerings: ["Diagnóstico de sistemas", "Roadmap de evolução", "Estimativas e priorização", "Treinamentos"],
    audience: ["Gestores e founders", "Equipes de produto e TI"],
    benefits: ["Melhores decisões de investimento", "Redução de riscos"],
    outcomes: ["Plano acionável", "Metas e indicadores claros"],
    faqs: [{ q: "Como funciona a consultoria?", a: "Conduzimos reuniões, levantamentos e entregamos um plano com próximos passos." }],
    examples: [{ name: "Plano de modernização", description: "Migração gradual com metas e indicadores." }],
  },
  {
    icon: Brain,
    title: "Arquitetura e Modernização",
    slug: "arquitetura-modernizacao",
    description:
      "Transformamos sistemas legados em soluções modernas, escaláveis e seguras.",
    features: [
      "Reengenharia de software",
      "Escalabilidade e performance",
      "Segurança avançada",
      "Code review e refatoração",
    ],
    category: "Consultoria",
    longDescription:
      "Planejamos e executamos a modernização de sistemas com foco em escalabilidade, manutenção e segurança, preservando o que gera valor hoje.",
    offerings: ["Mapeamento de legado", "Refatoração dirigida a testes", "Migração para cloud", "Observabilidade"],
    audience: ["Empresas com sistemas antigos", "Times com dificuldade de evoluir software"],
    benefits: ["Redução de falhas", "Deploy previsível", "Base preparada para crescer"],
    outcomes: ["Menos downtime", "Velocidade de entrega maior"],
    faqs: [{ q: "Parar tudo para modernizar?", a: "Não. Priorizamos o que traz mais retorno, mantendo o sistema operando." }],
    examples: [{ name: "Monólito modularizado", description: "Quedas reduzidas e deploy previsível." }],
  },
  {
    icon: Wrench,
    title: "Manutenção de Computadores",
    slug: "manutencao-computadores",
    description:
      "Montagem, upgrades e suporte técnico especializado para seu setup.",
    features: [
      "Montagem de PCs profissionais",
      "Upgrades sob medida",
      "Instalação de software original",
      "Diagnóstico técnico completo",
    ],
    category: "Manutenção",
    longDescription:
      "Cuidamos do seu ambiente de trabalho com montagem, upgrades e manutenção preventiva para máxima performance e segurança.",
    offerings: ["Montagem completa", "Limpeza e troca de pasta térmica", "Upgrade de RAM/SSD", "Licenças e backup"],
    audience: ["Profissionais criativos", "Escritórios e home offices"],
    benefits: ["Desempenho melhor", "Menos travamentos", "Ambiente confiável"],
    outcomes: ["Equipamentos prontos para demanda", "Setup otimizado"],
    faqs: [{ q: "Perco a garantia?", a: "Seguimos boas práticas e mantemos garantias conforme o fabricante." }],
    examples: [{ name: "PC criativo", description: "Upgrade para renderização e edição sem travar." }],
  },
  {
    icon: Server,
    title: "Redes & Servidores",
    slug: "redes-servidores",
    description:
      "Projetos completos de infraestrutura com alta disponibilidade e segurança.",
    features: [
      "Cabeamento estruturado",
      "Firewall, switches e Wi-Fi",
      "Montagem de racks e servidores",
      "Backup e rede local",
    ],
    category: "Infraestrutura",
    longDescription:
      "Desenhamos e implementamos redes e servidores confiáveis, com alta disponibilidade, segurança e monitoramento de ponta a ponta.",
    offerings: ["Survey e projeto", "Cabeamento e racks", "Firewall e VLANs", "Backup e monitoramento"],
    audience: ["Escritórios", "Lojas e operações com múltiplos pontos"],
    benefits: ["Wi‑Fi estável", "Segurança da rede", "Backups confiáveis"],
    outcomes: ["Infra pronta para crescer", "Menos quedas"],
    faqs: [{ q: "É possível instalar em etapas?", a: "Sim, estruturamos um plano por fases para minimizar impacto." }],
    examples: [{ name: "Rede de escritório", description: "VLANs por setor e Wi‑Fi seguro." }],
  },
];

export const categories = ["Todos", ...Array.from(new Set(services.map((s) => s.category)))];
