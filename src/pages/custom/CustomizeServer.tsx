import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import FloatingArrow from "../../components/effects/FloatingArrow";
import SuccessModal from "../../components/modals/SuccessModal";
import { services } from "../../data/services";
import { GLV_CLOUD_INSTANCE_TYPES, STORAGE_TYPES, BACKUP_OPTIONS, ADDON_OPTIONS, GLV_DATA_CENTERS } from "../../data/awsConfigs";
import { sendConfigurationEmail, saveConfigurationLocally, calculateEstimatedCost, type ServerConfiguration } from "../../services/serverService";

// Ícones simples inline
const DataCenterIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>;
const CheckIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const ChevronDownIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;
const ServerIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2m-6 0V3m0 0a2 2 0 012-2h2a2 2 0 012 2m0 0h2M3 9h18" /></svg>;
const HardDriveIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 012.646 2.646" /></svg>;
const SaveIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;

const CustomizeServer = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const effectiveSlug = slug ?? "redes-servidores";
  const service = services.find((s) => s.slug === effectiveSlug);

  const title = service?.title || "Redes & Servidores";

  // Estados do formulário
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [dataCenter, setDataCenter] = useState("br");
  
  // Seleção de instância
  const [instanceFamily, setInstanceFamily] = useState("t3");
  const [instanceSize, setInstanceSize] = useState("t3.large");
  
  // Armazenamento
  const [storageType, setStorageType] = useState("gp3");
  const [storageSize, setStorageSize] = useState(150);
  
  // Backups
  const [backupOption, setBackupOption] = useState("daily");
  
  // Addons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  
  // Resumo
  const [expandedSection, setExpandedSection] = useState<string | null>("datacenter");

  const steps = ["Recursos", "Backups & Addons", "Revisão"];
  const instanceFamilies = Object.keys(GLV_CLOUD_INSTANCE_TYPES) as Array<keyof typeof GLV_CLOUD_INSTANCE_TYPES>;
  const currentInstanceType = GLV_CLOUD_INSTANCE_TYPES[instanceFamily as keyof typeof GLV_CLOUD_INSTANCE_TYPES];
  const estimatedCost = calculateEstimatedCost({
    company,
    name,
    contact,
    dataCenter,
    instanceType: instanceFamily,
    instanceSize,
    storageType,
    storageSize,
    backupOption,
    selectedAddons,
  });

  useEffect(() => {
    if (slug && slug !== "redes-servidores") {
      navigate("/", { replace: true });
    }
  }, [slug, navigate]);

  const isFormValid = company.trim() && name.trim() && contact.trim();
  
  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setIsLoading(true);

    const config: ServerConfiguration = {
      company,
      name,
      contact,
      dataCenter,
      instanceType: instanceFamily,
      instanceSize,
      customVcpu: undefined,
      customRam: undefined,
      storageType,
      storageSize,
      backupOption,
      selectedAddons,
    };

    try {
      // Enviar email
      const emailSent = await sendConfigurationEmail(config);
      
      // Salvar localmente
      saveConfigurationLocally(config);

      if (emailSent) {
        setShowSuccess(true);
        toast.success("Proposta enviada com sucesso!");
      } else {
        toast.error("Erro ao enviar email. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      toast.error("Erro ao processar sua solicitação");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Helmet>
        <title>{`Configurar: ${title}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Success Modal */}
      <SuccessModal
        open={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate("/");
        }}
        variant="server"
        company={company}
        email={contact}
      />

      {/* Background decorativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl" />
      </div>

      {/* Seta de volta */}
      <FloatingArrow useHistoryBack className="fixed top-24 left-4 z-50" />

      <section className="relative z-10 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {title}
            </h1>
            <p className="text-gray-300 text-lg">
              Configure seu servidor em nuvem com os recursos ideais para seu negócio
            </p>
          </div>

          {/* Stepper */}
          <div className="mb-12 flex justify-between items-center max-w-2xl">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center flex-1">
                <div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full font-semibold text-sm transition-all ${
                    idx <= currentStep
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/50"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {idx < currentStep ? <CheckIcon /> : idx + 1}
                </div>
                <span
                  className={`ml-3 text-sm font-medium ${
                    idx <= currentStep ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                      idx < currentStep ? "bg-blue-600" : "bg-gray-700"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Layout Principal */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Coluna Esquerda - Formulário */}
            <div className="lg:col-span-2 space-y-8">
              {/* STEP 0: Data Center + Instância */}
              {currentStep === 0 && (
                <>
                  {/* Seção Data Center */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm hover:border-slate-600/50 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                      <DataCenterIcon />
                      <h2 className="text-xl font-bold text-white">Data Center</h2>
                    </div>
                    <p className="text-gray-400 text-sm mb-5">
                      Selecione a localização geográfica do seu servidor
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {GLV_DATA_CENTERS.map((dc) => (
                        <button
                          key={dc.id}
                          onClick={() => setDataCenter(dc.id)}
                          className={`py-3 px-3 rounded-xl font-medium text-sm transition-all duration-200 text-center ${
                            dataCenter === dc.id
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400"
                              : "bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:border-slate-500 hover:text-white"
                          }`}
                        >
                          <span className="block mb-1">{dc.flag}</span>
                          <span className="text-xs md:text-sm">{dc.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seção Tipo de Instância */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm hover:border-slate-600/50 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                      <ServerIcon />
                      <h2 className="text-xl font-bold text-white">Tipo de Instância GLV Cloud</h2>
                    </div>

                    {/* Grid de famílias de instância */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {instanceFamilies.map((family) => {
                        const familyData = GLV_CLOUD_INSTANCE_TYPES[family];
                        return (
                          <button
                            key={family}
                            onClick={() => {
                              setInstanceFamily(family);
                              setInstanceSize(familyData.instances[0].size);
                            }}
                            className={`p-4 rounded-xl border transition-all text-left ${
                              instanceFamily === family
                                ? "bg-blue-600/20 border-blue-500 shadow-lg shadow-blue-600/20"
                                : "bg-slate-700/30 border-slate-600/50 hover:border-slate-500"
                            }`}
                          >
                            <p className="font-semibold text-white mb-1">{familyData.name}</p>
                            <p className="text-xs text-gray-400">{familyData.description}</p>
                          </button>
                        );
                      })}
                    </div>

                    {/* Seleção de tamanho */}
                    <div>
                      <label className="text-white font-semibold mb-3 block">
                        Tamanho da Instância
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {currentInstanceType.instances.map((instance) => (
                          <button
                            key={instance.size}
                            onClick={() => setInstanceSize(instance.size)}
                            className={`py-3 px-3 rounded-lg text-sm font-medium transition-all ${
                              instanceSize === instance.size
                                ? "bg-blue-600 text-white shadow-lg"
                                : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                            }`}
                          >
                            {instance.size}
                          </button>
                        ))}
                      </div>

                      {/* Especificações */}
                      <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                        {currentInstanceType.instances
                          .filter((inst) => inst.size === instanceSize)
                          .map((inst) => (
                            <div key={inst.size} className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">vCPU:</span>
                                <span className="text-blue-400 font-semibold">{inst.vcpu}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Memória RAM:</span>
                                <span className="text-blue-400 font-semibold">{inst.ram} GB</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">EBS Otimizado:</span>
                                <span className="text-green-400 font-semibold">
                                  {inst.ebs_optimized ? "✓ Sim" : "Não"}
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Seção Armazenamento */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm hover:border-slate-600/50 transition-colors">
                    <div className="flex items-center gap-3 mb-6">
                      <HardDriveIcon />
                      <h2 className="text-xl font-bold text-white">Armazenamento</h2>
                    </div>

                    {/* Tipo de Storage */}
                    <div className="mb-6">
                      <label className="text-white font-semibold mb-3 block">Tipo de Storage</label>
                      <div className="space-y-2">
                        {STORAGE_TYPES.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setStorageType(type.id)}
                            className={`w-full p-3 rounded-lg text-left transition-all border ${
                              storageType === type.id
                                ? "bg-blue-600/20 border-blue-500 text-white"
                                : "bg-slate-700/30 border-slate-600 text-gray-300 hover:border-slate-500"
                            }`}
                          >
                            <p className="font-semibold">{type.name}</p>
                            <p className="text-xs text-gray-400">
                              ${type.price_per_gb}/GB • {type.iops_base > 0 ? `${type.iops_base} IOPS` : `${type.throughput_base} MB/s`}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Tamanho de Storage */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-white font-semibold">Tamanho de Armazenamento</label>
                        <span className="text-2xl font-bold text-blue-400">{storageSize} GB</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="600"
                        value={storageSize}
                        onChange={(e) => setStorageSize(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>20 GB</span>
                        <span>600 GB</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* STEP 1: Backups & Addons */}
              {currentStep === 1 && (
                <>
                  {/* Seção Backups */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-6">Cloud Backup</h2>
                    <p className="text-gray-400 text-sm mb-4">
                      Escolha a frequência de backup automático para seus dados
                    </p>
                    <div className="space-y-3">
                      {BACKUP_OPTIONS.map((backup) => (
                        <button
                          key={backup.id}
                          onClick={() => setBackupOption(backup.id)}
                          className={`w-full p-4 rounded-lg text-left transition-all border flex items-center justify-between ${
                            backupOption === backup.id
                              ? "bg-blue-600/20 border-blue-500"
                              : "bg-slate-700/30 border-slate-600 hover:border-slate-500"
                          }`}
                        >
                          <div>
                            <p className="font-semibold text-white">{backup.name}</p>
                            <p className="text-xs text-gray-400 mt-1">
                              Retenção: {backup.retention} dias • ${backup.price}/mês
                            </p>
                          </div>
                          {backupOption === backup.id && (
                            <CheckIcon />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Seção Addons */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-6">Complementos Opcionais</h2>
                    <p className="text-gray-400 text-sm mb-4">
                      Adicione serviços complementares para melhorar sua infraestrutura
                    </p>
                    <div className="space-y-3">
                      {ADDON_OPTIONS.map((addon) => (
                        <button
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`w-full p-4 rounded-lg text-left transition-all border flex items-center justify-between ${
                            selectedAddons.includes(addon.id)
                              ? "bg-blue-600/20 border-blue-500"
                              : "bg-slate-700/30 border-slate-600 hover:border-slate-500"
                          }`}
                        >
                          <div className="flex-1">
                            <p className="font-semibold text-white flex items-center gap-2">
                              {selectedAddons.includes(addon.id) && <CheckIcon />}
                              {addon.name}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {addon.description} • ${addon.price}/mês
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* STEP 2: Revisão & Contato */}
              {currentStep === 2 && (
                <>
                  {/* Seção Contato */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-6">Dados de Contato</h2>
                    <div className="space-y-5">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Nome da empresa
                        </label>
                        <input
                          type="text"
                          placeholder="Ex.: GLV Tecnologia"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Nome do responsável <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Nome completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">
                          Contato (WhatsApp ou Email) <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Ex.: (11) 99999-9999 ou email@empresa.com"
                          value={contact}
                          onChange={(e) => setContact(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resumo de Revisão */}
                  <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-sm">
                    <h2 className="text-xl font-bold text-white mb-6">Resumo da Configuração</h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between p-3 bg-slate-700/50 rounded-lg">
                        <span className="text-gray-400">Data Center:</span>
                        <span className="text-white font-semibold">
                          {GLV_DATA_CENTERS.find((dc) => dc.id === dataCenter)?.name}
                        </span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-700/50 rounded-lg">
                        <span className="text-gray-400">Instância:</span>
                        <span className="text-white font-semibold">{instanceSize}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-700/50 rounded-lg">
                        <span className="text-gray-400">Storage:</span>
                        <span className="text-white font-semibold">{storageSize} GB ({storageType.toUpperCase()})</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-700/50 rounded-lg">
                        <span className="text-gray-400">Backup:</span>
                        <span className="text-white font-semibold">
                          {BACKUP_OPTIONS.find((b) => b.id === backupOption)?.name}
                        </span>
                      </div>
                      {selectedAddons.length > 0 && (
                        <div className="flex justify-between p-3 bg-slate-700/50 rounded-lg">
                          <span className="text-gray-400">Addons:</span>
                          <span className="text-white font-semibold">{selectedAddons.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Botões de navegação */}
              <div className="flex gap-4">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 py-3 px-4 rounded-xl bg-slate-700 text-white font-semibold hover:bg-slate-600 transition-colors"
                  >
                    ← Anterior
                  </button>
                )}
                {currentStep < steps.length - 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                  >
                    Próximo →
                  </button>
                )}
              </div>
            </div>

            {/* Coluna Direita - Resumo */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm">
                    ✓
                  </span>
                  Sua Configuração
                </h3>
                <p className="text-xs text-gray-400 mb-6">Resumo da sua seleção</p>

                <div className="space-y-3 mb-6">
                  {/* Data Center */}
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === "datacenter" ? null : "datacenter"
                      )
                    }
                  >
                    <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                      <span className="text-gray-300 font-medium">Data Center</span>
                      <div className={`text-gray-400 transition-transform w-5 h-5 ${
                          expandedSection === "datacenter" ? "rotate-180" : ""
                        }`}>
                        <ChevronDownIcon />
                      </div>
                    </div>
                    {expandedSection === "datacenter" && (
                      <div className="mt-2 text-sm text-gray-300">
                        <p className="py-2 px-4 bg-slate-800/50 rounded-lg">
                          {GLV_DATA_CENTERS.find((dc) => dc.id === dataCenter)?.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Instância */}
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === "instance" ? null : "instance"
                      )
                    }
                  >
                    <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                      <span className="text-gray-300 font-medium">Instância</span>
                      <div className={`text-gray-400 transition-transform w-5 h-5 ${
                          expandedSection === "instance" ? "rotate-180" : ""
                        }`}>
                        <ChevronDownIcon />
                      </div>
                    </div>
                    {expandedSection === "instance" && (
                      <div className="mt-2 text-sm text-gray-300 space-y-2">
                        {currentInstanceType.instances
                          .filter((inst) => inst.size === instanceSize)
                          .map((inst) => (
                            <div key={inst.size} className="space-y-1">
                              <p className="py-2 px-4 bg-slate-800/50 rounded-lg">
                                Tipo: <span className="text-blue-400 font-bold">{instanceSize}</span>
                              </p>
                              <p className="py-2 px-4 bg-slate-800/50 rounded-lg">
                                vCPU: <span className="text-blue-400 font-bold">{inst.vcpu}</span>
                              </p>
                              <p className="py-2 px-4 bg-slate-800/50 rounded-lg">
                                RAM: <span className="text-blue-400 font-bold">{inst.ram} GB</span>
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Storage */}
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === "storage" ? null : "storage"
                      )
                    }
                  >
                    <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                      <span className="text-gray-300 font-medium">Storage</span>
                      <div className={`text-gray-400 transition-transform w-5 h-5 ${
                          expandedSection === "storage" ? "rotate-180" : ""
                        }`}>
                        <ChevronDownIcon />
                      </div>
                    </div>
                    {expandedSection === "storage" && (
                      <div className="mt-2 text-sm text-gray-300">
                        <p className="py-2 px-4 bg-slate-800/50 rounded-lg">
                          {storageSize} GB <span className="text-gray-500">({storageType.toUpperCase()})</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Backup */}
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedSection(
                        expandedSection === "backup" ? null : "backup"
                      )
                    }
                  >
                    <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                      <span className="text-gray-300 font-medium">Backup</span>
                      <div className={`text-gray-400 transition-transform w-5 h-5 ${
                          expandedSection === "backup" ? "rotate-180" : ""
                        }`}>
                        <ChevronDownIcon />
                      </div>
                    </div>
                    {expandedSection === "backup" && (
                      <div className="mt-2 text-sm text-gray-300">
                        <p className="py-2 px-4 bg-slate-800/50 rounded-lg">
                          {BACKUP_OPTIONS.find((b) => b.id === backupOption)?.name}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Addons */}
                  {selectedAddons.length > 0 && (
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        setExpandedSection(
                          expandedSection === "addons" ? null : "addons"
                        )
                      }
                    >
                      <div className="flex justify-between items-center py-3 px-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                        <span className="text-gray-300 font-medium">Addons</span>
                        <div className={`text-gray-400 transition-transform w-5 h-5 ${
                            expandedSection === "addons" ? "rotate-180" : ""
                          }`}>
                          <ChevronDownIcon />
                        </div>
                      </div>
                      {expandedSection === "addons" && (
                        <div className="mt-2 text-sm text-gray-300 space-y-1">
                          {selectedAddons.map((addonId) => {
                            const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
                            return (
                              <p key={addonId} className="py-2 px-4 bg-slate-800/50 rounded-lg">
                                {addon?.name}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Custo estimado */}
                <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <p className="text-xs text-gray-400 mb-1">Custo Estimado Mensal</p>
                  <p className="text-3xl font-bold text-blue-400">
                    ${estimatedCost.toFixed(2)}
                  </p>
                </div>

                {/* Botão CTA */}
                {currentStep === steps.length - 1 && (
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormValid || isLoading}
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
                      isFormValid && !isLoading
                        ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30 cursor-pointer"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed opacity-60"
                    }`}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <SaveIcon />
                        Solicitar Proposta
                      </>
                    )}
                  </button>
                )}

                <p className="text-xs text-gray-500 mt-3 text-center">
                  {currentStep === steps.length - 1
                    ? "Preencha todos os campos para enviar"
                    : "Etapa " + (currentStep + 1) + " de " + steps.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
          border: 2px solid #1e293b;
          transition: all 0.2s;
        }

        .slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.8);
          transform: scale(1.1);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
          border: 2px solid #1e293b;
          transition: all 0.2s;
        }

        .slider::-moz-range-thumb:hover {
          box-shadow: 0 0 20px rgba(37, 99, 235, 0.8);
          transform: scale(1.1);
        }

        @media (max-width: 1024px) {
          .sticky {
            position: relative;
            top: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

export default CustomizeServer;