import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { services } from "../../data/services";
import FloatingArrow from "../../components/FloatingArrow";
import SuccessModal from "../../components/SuccessModal";
import emailjs from "emailjs-com";
import { Select, Checkbox } from "../../components";

const CustomizePage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const service = services.find((s) => s.slug === slug);
    const title = service?.title || "Sites e Landing Pages";
    const description = "Preencha o questionário para planejarmos seu site ou landing page.";

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // 1. Informações gerais
    const [company, setCompany] = useState("");
    const [responsibleName, setResponsibleName] = useState("");
    const [responsibleContact, setResponsibleContact] = useState("");
    const [segment, setSegment] = useState("");
    const [hasSite, setHasSite] = useState<string>(""); // "Sim" | "Não"
    const [siteLink, setSiteLink] = useState("");

    // 2. Objetivo do projeto
    const [objectiveOptions, setObjectiveOptions] = useState<{ [key: string]: boolean }>({
        "Geração de leads": false,
        Vendas: false,
        "Autoridade / institucional": false,
        Outro: false,
    });
    const [objectiveOther, setObjectiveOther] = useState("");

    // 3. Tipo de entrega
    const [deliveryOptions, setDeliveryOptions] = useState<{ [key: string]: boolean }>({
        "Landing page de produto": false,
        "Site institucional": false,
        Ambos: false,
    });

    // 4. Público-alvo
    const [audience, setAudience] = useState("");
    const [toneRefs, setToneRefs] = useState("");

    // 5. Design e identidade visual
    const [hasIdentity, setHasIdentity] = useState<string>(""); // "Sim" | "Não"
    const [visualRefs, setVisualRefs] = useState("");

    // 6. Funcionalidades
    const [needForms, setNeedForms] = useState<string>(""); // "Sim" | "Não"
    const [needChatOrWhatsApp, setNeedChatOrWhatsApp] = useState<boolean>(false);

    // 7. Hospedagem e domínio
    const [hasDomain, setHasDomain] = useState<string>(""); // "Sim" | "Não"
    const [hostingChoice, setHostingChoice] = useState<string>(""); // "Já tenho" | "Preciso de orientação" | "Quero que vocês provisionem"

    // 8. Observações finais
    const [notes, setNotes] = useState("");

    useEffect(() => {
        try {
            emailjs.init("H_rsp6SrkABlqY5RN");
        } catch (e) {
            console.error("Failed to init EmailJS", e);
        }
    }, []);

    useEffect(() => {
        if (slug && slug !== "landing-pages-e-sites") {
            navigate("/", { replace: true });
        }
    }, [slug, navigate]);

    const buildDescriptiveMessage = () => {
        const objectives = Object.keys(objectiveOptions).filter((k) => objectiveOptions[k]);
        const deliveries = Object.keys(deliveryOptions).filter((k) => deliveryOptions[k]);
        const lines = [
            "[Personalização de Site/Landing]",
            `Serviço: ${title}${service?.slug ? ` (${service.slug})` : ""}`,
            "",
            "1. Informações gerais",
            `- Nome da empresa: ${company || "—"}`,
            `- Responsável: ${responsibleName || "—"}`,
            `- Contato: ${responsibleContact || "—"}`,
            `- Segmento de atuação: ${segment || "—"}`,
            `- Possui site atual?: ${hasSite || "—"}${hasSite === "Sim" ? ` (link: ${siteLink || "—"})` : ""}`,
            "",
            "2. Objetivo do projeto",
            `- Objetivos: ${objectives.length ? objectives.join(", ") : "—"}${objectiveOptions.Outro ? ` | Outro: ${objectiveOther || "—"}` : ""
            }`,
            "",
            "3. Tipo de entrega",
            `- Entrega: ${deliveries.length ? deliveries.join(", ") : "—"}`,
            "",
            "4. Público-alvo",
            `- Público-alvo principal: ${audience || "—"}`,
            `- Referências de tom/concorrentes: ${toneRefs || "—"}`,
            "",
            "5. Design e identidade visual",
            `- Possui identidade visual?: ${hasIdentity || "—"}`,
            `- Referências visuais: ${visualRefs || "—"}`,
            "",
            "6. Funcionalidades",
            `- Precisa de formulários?: ${needForms || "—"}`,
            `- Precisa de chatbot ou WhatsApp?: ${needChatOrWhatsApp ? "Sim" : "Não"}`,
            "",
            "7. Hospedagem e domínio",
            `- Já possui domínio?: ${hasDomain || "—"}`,
            `- Hospedagem: ${hostingChoice || "—"}`,
            "",
            "8. Observações finais",
            `- Algo importante que não foi perguntado?: ${notes || "—"}`,
        ].filter(Boolean) as string[];
        return lines.join("\n");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!company || !responsibleName || !responsibleContact) return;
        setIsSubmitting(true);
        setErrorMsg(null);
        const templateParams = {
            from_name: responsibleName,
            from_email: responsibleContact,
            company: company,
            service: "Site/Landing",
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
                            <a href="/#contact" className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700">
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
                                {/* 1. Informações gerais */}
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
                                                value={responsibleName}
                                                onChange={(e) => setResponsibleName(e.target.value)}
                                                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="text-white/80 text-sm mb-1">Contato do responsável (WhatsApp ou Email) *</label>
                                            <input
                                                type="text"
                                                placeholder="Ex.: (11) 99999-9999 ou email@empresa.com"
                                                value={responsibleContact}
                                                onChange={(e) => setResponsibleContact(e.target.value)}
                                                className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <label className="text-white/80 text-sm mb-1">Segmento de atuação</label>
                                    <input
                                        type="text"
                                        placeholder="Ex.: varejo, saúde, logística, educação"
                                        value={segment}
                                        onChange={(e) => setSegment(e.target.value)}
                                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <Select
                                        label="Possui site atual?"
                                        placeholder="Selecione"
                                        value={hasSite}
                                        onChange={setHasSite}
                                        options={[
                                            { label: "Não", value: "Não" },
                                            { label: "Sim", value: "Sim" },
                                        ]}
                                    />
                                    {hasSite === "Sim" && (
                                        <input
                                            type="text"
                                            placeholder="Link do site"
                                            value={siteLink}
                                            onChange={(e) => setSiteLink(e.target.value)}
                                            className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                </div>

                                {/* 2. Objetivo do projeto */}
                                <div className="grid grid-cols-1 gap-4">
                                    <h2 className="text-white text-xl font-semibold">2. Objetivo do projeto</h2>
                                    <label className="text-white/80 text-sm mb-1">Qual é o principal objetivo do site/landing?</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {Object.keys(objectiveOptions).map((key) => (
                                            <Checkbox
                                                key={key}
                                                label={key}
                                                checked={objectiveOptions[key]}
                                                onChange={(e) =>
                                                    setObjectiveOptions((prev) => ({ ...prev, [key]: e.target.checked }))
                                                }
                                            />
                                        ))}
                                        {objectiveOptions["Outro"] && (
                                            <input
                                                type="text"
                                                placeholder="Descreva o outro objetivo"
                                                value={objectiveOther}
                                                onChange={(e) => setObjectiveOther(e.target.value)}
                                                className="w-full sm:col-span-2 rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* 3. Tipo de entrega */}
                                <div className="grid grid-cols-1 gap-4">
                                    <h2 className="text-white text-xl font-semibold">3. Tipo de entrega</h2>
                                    <label className="text-white/80 text-sm mb-1">O que você precisa?</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {Object.keys(deliveryOptions).map((key) => (
                                            <Checkbox
                                                key={key}
                                                label={key}
                                                checked={deliveryOptions[key]}
                                                onChange={(e) =>
                                                    setDeliveryOptions((prev) => ({ ...prev, [key]: e.target.checked }))
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* 4. Público-alvo */}
                                <div className="grid grid-cols-1 gap-4">
                                    <h2 className="text-white text-xl font-semibold">4. Público-alvo</h2>
                                    <label className="text-white/80 text-sm mb-1">Quem é o público-alvo principal?</label>
                                    <textarea
                                        placeholder="Descreva seu público-alvo"
                                        value={audience}
                                        onChange={(e) => setAudience(e.target.value)}
                                        rows={3}
                                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <label className="text-white/80 text-sm mb-1">Existe alguma referência de tom de voz ou concorrentes?</label>
                                    <textarea
                                        placeholder="Links, nomes, descrições de tom de voz"
                                        value={toneRefs}
                                        onChange={(e) => setToneRefs(e.target.value)}
                                        rows={3}
                                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* 5. Design e identidade visual */}
                                <div className="grid grid-cols-1 gap-4">
                                    <h2 className="text-white text-xl font-semibold">5. Design e identidade visual</h2>
                                    <Select
                                        label="Possui identidade visual definida?"
                                        placeholder="Selecione"
                                        value={hasIdentity}
                                        onChange={setHasIdentity}
                                        options={[
                                            { label: "Sim (logo, cores, fontes)", value: "Sim" },
                                            { label: "Não", value: "Não" },
                                        ]}
                                    />
                                    <label className="text-white/80 text-sm mb-1">Existe alguma referência visual que você goste?</label>
                                    <textarea
                                        placeholder="Links e descrições de referências visuais"
                                        value={visualRefs}
                                        onChange={(e) => setVisualRefs(e.target.value)}
                                        rows={3}
                                        className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* 6. Funcionalidades */}
                                <div className="grid grid-cols-1 gap-4">
                                    <h2 className="text-white text-xl font-semibold">6. Funcionalidades</h2>
                                    <Select
                                        label="Precisa de formulários?"
                                        placeholder="Selecione"
                                        value={needForms}
                                        onChange={setNeedForms}
                                        options={[
                                            { label: "Sim", value: "Sim" },
                                            { label: "Não", value: "Não" },
                                        ]}
                                    />

                                    <Checkbox
                                        label="Precisa de chatbot ou WhatsApp?"
                                        checked={needChatOrWhatsApp}
                                        onChange={(e) => setNeedChatOrWhatsApp(e.target.checked)}
                                    />
                                </div>

                                {/* 7. Hospedagem e domínio */}
                                <div className="grid grid-cols-1 gap-4">
                                    <h2 className="text-white text-xl font-semibold">7. Hospedagem e domínio</h2>
                                    <Select
                                        label="Já possui domínio?"
                                        placeholder="Selecione"
                                        value={hasDomain}
                                        onChange={setHasDomain}
                                        options={[
                                            { label: "Sim", value: "Sim" },
                                            { label: "Não", value: "Não" },
                                        ]}
                                    />

                                    <Select
                                        label="Onde pretende hospedar?"
                                        placeholder="Selecione"
                                        value={hostingChoice}
                                        onChange={setHostingChoice}
                                        options={[
                                            { label: "Já tenho", value: "Já tenho" },
                                            { label: "Preciso de orientação", value: "Preciso de orientação" },
                                            { label: "Quero que vocês provisionem", value: "Quero que vocês provisionem" },
                                        ]}
                                    />
                                </div>

                                {/* 8. Observações finais */}
                                <div className="grid grid-cols-1 gap-4">
                                    <h2 className="text-white text-xl font-semibold">8. Observações finais</h2>
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
                                        disabled={!company || !responsibleName || !responsibleContact || isSubmitting}
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
            <SuccessModal
                open={successOpen}
                onClose={() => setSuccessOpen(false)}
                title="Enviado com sucesso"
                message="Recebemos sua solicitação e retornaremos em até 12 horas."
            />
        </main>
    );
};

export default CustomizePage;
