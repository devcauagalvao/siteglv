import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { services } from "../../data/services";
import FloatingArrow from "../../components/effects/FloatingArrow";
import emailjs from "emailjs-com";
import SuccessModal from "../../components/modals/SuccessModal";
import { Select, Checkbox } from "../../components";

const CustomizeService = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  const title = service?.title;
  const description = service?.description;
  const isCustomSystems = service?.slug === "sistemas-personalizados";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [segment, setSegment] = useState("");
  const [companySize, setCompanySize] = useState<string>("");

  const [problem, setProblem] = useState("");
  const [processes, setProcesses] = useState("");
  const [usageType, setUsageType] = useState<string>("");
  const [userTypes, setUserTypes] = useState("");
  const [differentPermissions, setDifferentPermissions] = useState<boolean>(false);

  const [needIntegrations, setNeedIntegrations] = useState<boolean>(false);
  const [integrationOptions, setIntegrationOptions] = useState<{ [key: string]: boolean }>({
    Financeiro: false,
    ERP: false,
    "Gateway de pagamento": false,
    Outro: false,
  });
  const [integrationOther, setIntegrationOther] = useState("");
  const [hasAPI, setHasAPI] = useState<string>("");

  const [reference, setReference] = useState("");
  const [notes, setNotes] = useState("");

  

  useEffect(() => {
    try {
      emailjs.init("H_rsp6SrkABlqY5RN");
    } catch {}
  }, []);

  useEffect(() => {
    if (slug && slug !== "sistemas-personalizados") {
      navigate("/", { replace: true });
    }
  }, [slug, navigate]);

  const buildDescriptiveMessage = () => {
    const lines = [
      "[Personalização de Sistemas]",
      `Serviço: ${title}${service?.slug ? ` (${service.slug})` : ""}`,
      "",
      "1. Informações gerais",
      `- Nome da empresa: ${company || "—"}`,
      `- Responsável: ${name || "—"}`,
      `- Contato: ${contact || "—"}`,
      `- Segmento do negócio: ${segment || "—"}`,
      `- Tamanho da empresa: ${companySize || "—"}`,
      "",
      "2. Objetivo do sistema",
      `- Problema principal: ${problem || "—"}`,
      `- Processos a digitalizar/melhorar: ${processes || "—"}`,
      "",
      "3. Usuários e permissões",
      `- Uso do sistema: ${usageType || "—"}`,
      `- Tipos de usuários: ${userTypes || "—"}`,
      `- Permissões diferentes por tipo?: ${differentPermissions ? "Sim" : "Não"}`,
      "",
      "4. Integrações",
      `- Precisa integrar?: ${needIntegrations ? "Sim" : "Não"}`,
      needIntegrations
        ? `- Tipos de integração: ${(() => {
            const selected = Object.keys(integrationOptions).filter((k) => integrationOptions[k]);
            if (!selected.length) return "—";
            const list = selected.join(", ");
            const other = integrationOptions["Outro"] ? ` | Outro: ${integrationOther || "—"}` : "";
            return list + other;
          })()}`
        : undefined,
      `- Sistemas possuem API?: ${hasAPI || "—"}`,
      "",
      "5. Observações finais",
      `- Referência de sistema parecido: ${reference || "—"}`,
      `- Algo importante que não foi perguntado?: ${notes || "—"}`,
    ].filter(Boolean) as string[];
    return lines.join("\n");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !contact) return;
    setIsSubmitting(true);
    setErrorMsg(null);
    const templateParams = {
      from_name: name,
      from_email: contact,
      company: company,
      service: title,
      message: buildDescriptiveMessage(),
    };
    try {
      await emailjs.send(
        "service_1wuyals",
        "template_9xroo21",
        templateParams,
        "H_rsp6SrkABlqY5RN"
      );
      setSuccessOpen(true);
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      setErrorMsg("Ocorreu um erro ao enviar sua solicitação. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative overflow-hidden min-h-screen">
      <Helmet>
        <title>{`Personalizar: ${title}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <section className="relative z-10 pt-28 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FloatingArrow useHistoryBack className="fixed top-20 sm:top-24 left-4 z-50" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{title}</h1>
            <p className="mt-4 text-white/80 text-base sm:text-lg">{description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/#contact"
                className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Falar com Especialista
              </a>
            </div>

            <div id="contact" className="mt-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                  {errorMsg}
                </div>
              )}
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                <div className="grid grid-cols-1 gap-4">
                  <h2 className="text-white text-xl font-semibold">1. Informações gerais</h2>
                  <label className="text-white/80 text-sm mb-1">Nome da empresa *</label>
                  <input
                    type="text"
                    placeholder="Ex.: GLV Tecnologia"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-white/80 text-sm mb-1">Nome do responsável *</label>
                      <input
                        type="text"
                        placeholder="Nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-white/80 text-sm mb-1">Contato do responsável (WhatsApp ou Email) *</label>
                      <input
                        type="text"
                        placeholder="Ex.: (11) 99999-9999 ou email@empresa.com"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <label className="text-white/80 text-sm mb-1">Segmento do negócio</label>
                  <input
                    type="text"
                    placeholder="Ex.: varejo, saúde, logística, educação"
                    value={segment}
                    onChange={(e) => setSegment(e.target.value)}
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <Select
                    label="Tamanho da empresa"
                    placeholder="Selecione"
                    value={companySize}
                    onChange={setCompanySize}
                    options={[
                      { label: "ME", value: "ME" },
                      { label: "PME", value: "PME" },
                      { label: "Médio", value: "Médio" },
                      { label: "Grande", value: "Grande" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <h2 className="text-white text-xl font-semibold">2. Objetivo do sistema</h2>
                  <label className="text-white/80 text-sm mb-1">Qual problema principal o sistema deve resolver hoje? *</label>
                  <textarea
                    placeholder="Descreva o problema atual que mais impacta"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <label className="text-white/80 text-sm mb-1">Quais processos você deseja digitalizar ou melhorar?</label>
                  <textarea
                    placeholder="Ex.: atendimento, faturamento, controle de estoque"
                    value={processes}
                    onChange={(e) => setProcesses(e.target.value)}
                    rows={3}
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <h2 className="text-white text-xl font-semibold">3. Usuários e permissões</h2>
                  <Select
                    label="O sistema será usado por usuários internos, clientes ou ambos?"
                    placeholder="Selecione"
                    value={usageType}
                    onChange={setUsageType}
                    options={[
                      { label: "Internos", value: "Internos" },
                      { label: "Clientes", value: "Clientes" },
                      { label: "Ambos", value: "Ambos" },
                    ]}
                  />

                  <label className="text-white/80 text-sm mb-1">Quais tipos de usuários existirão? (ex: admin, operador, cliente)</label>
                  <input
                    type="text"
                    placeholder="Liste os tipos de usuários"
                    value={userTypes}
                    onChange={(e) => setUserTypes(e.target.value)}
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <Checkbox
                    label="Cada tipo de usuário terá permissões diferentes?"
                    checked={differentPermissions}
                    onChange={(e) => setDifferentPermissions(e.target.checked)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <h2 className="text-white text-xl font-semibold">4. Integrações</h2>
                  <Checkbox
                    label="O sistema precisa integrar com outros softwares?"
                    checked={needIntegrations}
                    onChange={(e) => setNeedIntegrations(e.target.checked)}
                  />

                  {needIntegrations && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.keys(integrationOptions).map((key) => (
                        <Checkbox
                          key={key}
                          label={key}
                          checked={integrationOptions[key]}
                          onChange={(e) =>
                            setIntegrationOptions((prev) => ({ ...prev, [key]: e.target.checked }))
                          }
                        />
                      ))}
                      {integrationOptions["Outro"] && (
                        <input
                          type="text"
                          placeholder="Descreva o outro sistema"
                          value={integrationOther}
                          onChange={(e) => setIntegrationOther(e.target.value)}
                          className="w-full sm:col-span-2 rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>
                  )}

                  <Select
                    label="Esses sistemas já possuem API?"
                    placeholder="Selecione"
                    value={hasAPI}
                    onChange={setHasAPI}
                    options={[
                      { label: "Sim", value: "Sim" },
                      { label: "Não", value: "Não" },
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <h2 className="text-white text-xl font-semibold">5. Observações finais</h2>
                  <label className="text-white/80 text-sm mb-1">Existe alguma referência de sistema parecido?</label>
                  <input
                    type="text"
                    placeholder="Links ou nomes de sistemas de referência"
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <label className="text-white/80 text-sm mb-1">Algo importante que não foi perguntado?</label>
                  <textarea
                    placeholder="Deixe qualquer observação relevante"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={!company || !name || !contact || !problem || isSubmitting}
                    className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} title="Enviado com sucesso" message="Recebemos sua solicitação e retornaremos em até 12 horas." />
    </main>
  );
};

export default CustomizeService;
