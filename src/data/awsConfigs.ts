// Configurações de tipos de instância GLV Cloud
export const GLV_CLOUD_INSTANCE_TYPES = {
  t3: {
    name: "T3 - Uso Geral (Burstable)",
    description: "Ideal para workloads com tráfego variável e desenvolvimento",
    cost_base: 0.0104,
    instances: [
      { size: "t3.micro", vcpu: 1, ram: 1, ebs_optimized: false },
      { size: "t3.small", vcpu: 1, ram: 2, ebs_optimized: false },
      { size: "t3.medium", vcpu: 2, ram: 4, ebs_optimized: false },
      { size: "t3.large", vcpu: 2, ram: 8, ebs_optimized: true },
      { size: "t3.xlarge", vcpu: 4, ram: 16, ebs_optimized: true },
      { size: "t3.2xlarge", vcpu: 8, ram: 32, ebs_optimized: true },
    ],
  },
  m5: {
    name: "M5 - Uso Geral (Balanced)",
    description: "Equilibrado para computação, memória e rede",
    cost_base: 0.096,
    instances: [
      { size: "m5.large", vcpu: 2, ram: 8, ebs_optimized: false },
      { size: "m5.xlarge", vcpu: 4, ram: 16, ebs_optimized: true },
      { size: "m5.2xlarge", vcpu: 8, ram: 32, ebs_optimized: true },
      { size: "m5.4xlarge", vcpu: 16, ram: 64, ebs_optimized: true },
    ],
  },
  c5: {
    name: "C5 - Computação Otimizada",
    description: "Para aplicações CPU-intensivas e processamento de dados",
    cost_base: 0.085,
    instances: [
      { size: "c5.large", vcpu: 2, ram: 4, ebs_optimized: false },
      { size: "c5.xlarge", vcpu: 4, ram: 8, ebs_optimized: true },
      { size: "c5.2xlarge", vcpu: 8, ram: 16, ebs_optimized: true },
      { size: "c5.4xlarge", vcpu: 16, ram: 32, ebs_optimized: true },
    ],
  },
  r5: {
    name: "R5 - Memória Otimizada",
    description: "Para bancos de dados, caches e aplicações em memória",
    cost_base: 0.126,
    instances: [
      { size: "r5.large", vcpu: 2, ram: 16, ebs_optimized: false },
      { size: "r5.xlarge", vcpu: 4, ram: 32, ebs_optimized: true },
      { size: "r5.2xlarge", vcpu: 8, ram: 64, ebs_optimized: true },
      { size: "r5.4xlarge", vcpu: 16, ram: 128, ebs_optimized: true },
    ],
  },
};

export const STORAGE_TYPES = [
  { id: "gp3", name: "GP3 - SSD (General Purpose)", price_per_gb: 0.1, iops_base: 3000, throughput_base: 125 },
  { id: "gp2", name: "GP2 - SSD (Previous Gen)", price_per_gb: 0.12, iops_base: 3, throughput_base: 0 },
  { id: "io1", name: "IO1 - SSD (Provisioned IOPS)", price_per_gb: 0.2, iops_base: 1000, throughput_base: 0 },
  { id: "st1", name: "ST1 - HDD (Throughput Optimized)", price_per_gb: 0.045, iops_base: 0, throughput_base: 250 },
];

export const BACKUP_OPTIONS = [
  { id: "none", name: "Sem Backup Automático", price: 0, retention: 0 },
  { id: "daily", name: "Daily - Backup Diário", price: 2.5, retention: 7 },
  { id: "weekly", name: "Weekly - Backup Semanal", price: 5, retention: 30 },
  { id: "monthly", name: "Monthly - Backup Mensal", price: 12, retention: 90 },
];

export const ADDON_OPTIONS = [
  { id: "monitoring", name: "CloudWatch Detalhado", price: 3.5, description: "Monitoramento avançado de recursos" },
  { id: "autoscaling", name: "Auto Scaling", price: 0, description: "Escalabilidade automática de carga" },
  { id: "rds", name: "RDS Database", price: 15, description: "Banco de dados gerenciado" },
  { id: "cdn", name: "CloudFront CDN", price: 0.085, description: "Entrega de conteúdo global" },
  { id: "waf", name: "WAF & DDoS Protection", price: 5, description: "Proteção contra ataques" },
  { id: "backup_vault", name: "AWS Backup Vault", price: 0.5, description: "Cofre de backup centralizado" },
];

export const GLV_DATA_CENTERS = [
  {
    id: "br",
    name: "BR Nordeste",
    region: "sa-east-1",
    city: "São Paulo",
    flag: "🇧🇷",
    latency: "< 1ms",
  },
  {
    id: "us",
    name: "US Orlando",
    region: "us-east-1",
    city: "N. Virgínia",
    flag: "🇺🇸",
    latency: "80-120ms",
  },
  {
    id: "mx",
    name: "MX México",
    region: "us-west-1",
    city: "Califórnia",
    flag: "🇲🇽",
    latency: "120-160ms",
  },
  {
    id: "co",
    name: "CO Colômbia",
    region: "sa-east-1",
    city: "São Paulo",
    flag: "🇨🇴",
    latency: "20-50ms",
  },
];
