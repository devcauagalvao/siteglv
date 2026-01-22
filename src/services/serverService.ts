import emailjs from "@emailjs/browser";

// Inicializar EmailJS
const initEmailJS = () => {
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (publicKey) {
    emailjs.init(publicKey);
  }
};

initEmailJS();

export interface ServerConfiguration {
  // Dados de contato
  company: string;
  name: string;
  contact: string;

  // Data Center
  dataCenter: string;

  // Recursos
  instanceType: string;
  instanceSize: string;
  customVcpu?: number;
  customRam?: number;

  // Armazenamento
  storageType: string;
  storageSize: number;

  // Backups
  backupOption: string;

  // Addons
  selectedAddons: string[];
}

export const sendConfigurationEmail = async (config: ServerConfiguration): Promise<boolean> => {
  try {
    const templateParams = {
      to_email: config.contact,
      company_name: config.company || "Não informado",
      responsible_name: config.name,
      data_center: config.dataCenter,
      instance_type: `${config.instanceType} (${config.instanceSize})`,
      vcpu: config.customVcpu || "Padrão",
      ram: `${config.customRam || 0} GB`,
      storage: `${config.storageSize} GB`,
      storage_type: config.storageType,
      backup_option: config.backupOption,
      addons: config.selectedAddons.length > 0 ? config.selectedAddons.join(", ") : "Nenhum",
      timestamp: new Date().toLocaleString("pt-BR"),
    };

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_glv",
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_server_config",
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return false;
  }
};

// Salvar no localStorage como backup
export const saveConfigurationLocally = (config: ServerConfiguration): void => {
  const savedConfigs = JSON.parse(localStorage.getItem("serverConfigs") || "[]");
  savedConfigs.push({
    ...config,
    savedAt: new Date().toISOString(),
  });
  localStorage.setItem("serverConfigs", JSON.stringify(savedConfigs));
};

// Calcular custo mensal estimado
export const calculateEstimatedCost = (config: ServerConfiguration): number => {
  let cost = 0;

  // Custo da instância (aproximado por hora, x 730 horas/mês)
  const instanceCosts: Record<string, number> = {
    "t3.micro": 9.50,
    "t3.small": 19,
    "t3.medium": 38,
    "t3.large": 76,
    "t3.xlarge": 152,
    "t3.2xlarge": 304,
    "m5.large": 70,
    "m5.xlarge": 140,
    "m5.2xlarge": 280,
    "m5.4xlarge": 560,
    "c5.large": 62,
    "c5.xlarge": 124,
    "c5.2xlarge": 248,
    "c5.4xlarge": 496,
    "r5.large": 124,
    "r5.xlarge": 248,
    "r5.2xlarge": 496,
    "r5.4xlarge": 992,
  };

  cost += instanceCosts[config.instanceSize] || 70;

  // Custo de armazenamento
  const storageCosts: Record<string, number> = {
    gp3: config.storageSize * 0.1,
    gp2: config.storageSize * 0.12,
    io1: config.storageSize * 0.2,
    st1: config.storageSize * 0.045,
  };

  cost += storageCosts[config.storageType] || config.storageSize * 0.1;

  // Custo de backup
  const backupCosts: Record<string, number> = {
    none: 0,
    daily: 2.5,
    weekly: 5,
    monthly: 12,
  };

  cost += backupCosts[config.backupOption] || 0;

  // Custo de addons
  const addonCosts: Record<string, number> = {
    monitoring: 3.5,
    autoscaling: 0,
    rds: 15,
    cdn: Math.ceil(config.storageSize / 100) * 0.085,
    waf: 5,
    backup_vault: 0.5,
  };

  config.selectedAddons.forEach((addon) => {
    cost += addonCosts[addon] || 0;
  });

  return Math.round(cost * 100) / 100;
};
