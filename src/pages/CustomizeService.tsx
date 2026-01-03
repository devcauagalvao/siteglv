import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { services } from "../data/services";
import FloatingArrow from "../components/FloatingArrow";
import emailjs from "emailjs-com";
import SuccessModal from "../components/SuccessModal";

const CustomizeService = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  const title = service?.title || "Personalizar Serviço";
  const description = service?.description || "Em breve você poderá personalizar esse serviço aqui.";
  const isCustomSystems = service?.slug === "sistemas-personalizados";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [company, setCompany] = useState("");
  const [goal, setGoal] = useState("");
  
  const [notes, setNotes] = useState("");

  // Campos específicos para "Sistemas Personalizados"
  const [problem, setProblem] = useState("");
  const [users, setUsers] = useState("");
  const [integrations, setIntegrations] = useState("");
  const [timeline, setTimeline] = useState("");
  const [features, setFeatures] = useState<{ [key: string]: boolean }>({
    "Cadastro e gestão": false,
    "Relatórios e dashboards": false,
    "Acesso com login": false,
    "Fluxos aprovativos": false,
    "Integrações com ERP/CRM": false,
    "Pagamentos/Faturamento": false,
  });
  const [platforms, setPlatforms] = useState<{ [key: string]: boolean }>({
    Web: true,
    Mobile: false,
    Desktop: false,
  });

  

  useEffect(() => {
    try {
      // @ts-ignore
      emailjs.init("H_rsp6SrkABlqY5RN");
    } catch {}
  }, []);

  // Restrict this page to only 'sistemas-personalizados'
  useEffect(() => {
    if (slug && slug !== "sistemas-personalizados") {
      navigate("/", { replace: true });
    }
  }, [slug, navigate]);

  const buildDescriptiveMessage = () => {
    const feats = Object.keys(features).filter((k) => features[k]);
    const plats = Object.keys(platforms).filter((k) => platforms[k]);
    const lines = [
      "[Personalização de Serviço]",
      `Serviço: ${title}${service?.slug ? ` (${service.slug})` : ""}`,
      "",
      "Contato",
      `- Nome: ${name}`,
      `- Canal (WhatsApp/Email): ${contact}`,
      `- Empresa: ${company || "—"}`,
      "",
      `Objetivo: ${goal || "—"}`,
      "",
      isCustomSystems ? "Briefing — Sistemas Personalizados" : undefined,
      isCustomSystems ? `- Problema/Objetivo: ${problem || "—"}` : undefined,
      isCustomSystems ? `- Funcionalidades essenciais: ${feats.length ? feats.join(", ") : "—"}` : undefined,
      isCustomSystems ? `- Usuários/Roles: ${users || "—"}` : undefined,
      isCustomSystems ? `- Integrações: ${integrations || "—"}` : undefined,
      isCustomSystems ? `- Plataformas: ${plats.length ? plats.join(", ") : "—"}` : undefined,
      isCustomSystems ? `- Prazo desejado: ${timeline || "—"}` : undefined,
      "",
      `Observações: ${notes || "—"}`,
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
      // Optional: clear minimal fields
      // setName(""); setContact(""); setCompany(""); setGoal(""); setNotes("");
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
                href="#contact"
                className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Falar com Especialista
              </a>
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-sm">
                  {errorMsg}
                </div>
              )}
              {isCustomSystems && (
                <div className="mb-10">

                  <div className="grid grid-cols-1 gap-4">
                    <label className="text-white/80 text-sm mb-1">Qual problema precisamos resolver ou objetivo principal?</label>
                    <textarea
                      placeholder="Descreva brevemente o problema ou objetivo"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      rows={3}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div>
                      <label className="text-white/80 text-sm mb-2">Quais funcionalidades são essenciais?</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Object.keys(features).map((key) => (
                          <label key={key} className="flex items-center gap-2 text-white/80 text-sm">
                            <input
                              type="checkbox"
                              checked={features[key]}
                              onChange={(e) => setFeatures((prev) => ({ ...prev, [key]: e.target.checked }))}
                              className="accent-blue-500"
                            />
                            {key}
                          </label>
                        ))}
                      </div>
                    </div>

                    <label className="text-white/80 text-sm mb-1">Quem vai usar o sistema?</label>
                    <input
                      type="text"
                      placeholder="Ex.: equipe, clientes, administradores"
                      value={users}
                      onChange={(e) => setUsers(e.target.value)}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <label className="text-white/80 text-sm mb-1">Quais integrações são necessárias?</label>
                    <input
                      type="text"
                      placeholder="Ex.: ERP, CRM, WhatsApp, pagamentos"
                      value={integrations}
                      onChange={(e) => setIntegrations(e.target.value)}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <div>
                      <label className="text-white/80 text-sm mb-2">Em quais plataformas deve rodar?</label>
                      <div className="flex flex-wrap gap-3">
                        {Object.keys(platforms).map((key) => (
                          <label key={key} className="flex items-center gap-2 text-white/80 text-sm">
                            <input
                              type="checkbox"
                              checked={platforms[key]}
                              onChange={(e) => setPlatforms((prev) => ({ ...prev, [key]: e.target.checked }))}
                              className="accent-blue-500"
                            />
                            {key}
                          </label>
                        ))}
                      </div>
                    </div>

                    <label className="text-white/80 text-sm mb-1">Qual é o prazo desejado?</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Selecione uma opção</option>
                      <option value="Explorar">Quero explorar possibilidades</option>
                      <option value="Até 1 mês">Até 1 mês</option>
                      <option value="1-3 meses">1 a 3 meses</option>
                      <option value="Mais de 3 meses">Mais de 3 meses</option>
                    </select>
                  </div>
                </div>
              )}
              <h2 className="text-white text-xl font-semibold mb-4">Informações de Contato</h2>
              <p className="text-white/70 text-sm mb-6">Entraremos em contato para finalizar a personalização.</p>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/80 text-sm mb-1">Seu nome *</label>
                    <input
                      type="text"
                      placeholder="Digite seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white/80 text-sm mb-1">WhatsApp ou Email *</label>
                    <input
                      type="text"
                      placeholder="Informe seu WhatsApp ou Email"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <label className="text-white/80 text-sm mb-1">Empresa (opcional)</label>
                <input
                  type="text"
                  placeholder="Nome da empresa, se aplicável"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <label className="text-white/80 text-sm mb-1 sm:col-span-3">Qual é seu objetivo?</label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full sm:col-span-3 rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Objetivo</option>
                    <option value="Vendas">Aumentar Vendas</option>
                    <option value="Eficiência">Ganhar Eficiência</option>
                    <option value="Presença Digital">Fortalecer Presença Digital</option>
                  </select>
                </div>

                <label className="text-white/80 text-sm mb-1">Observações (opcional)</label>
                <textarea
                  placeholder="Detalhes relevantes que queira acrescentar"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    type="submit"
                    disabled={!name || !contact || isSubmitting}
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
