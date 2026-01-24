import React from "react";
import { FileText, Shield, Mail, Code, ScrollText } from "lucide-react";
import ModalBase from "./ModalBase";

type ModalType = "privacy" | "terms" | null;

interface TermsModalProps {
    modalContent: ModalType;
    onClose: () => void;
}

const TermsModal: React.FC<TermsModalProps> = ({ modalContent, onClose }) => {
    if (!modalContent) return null;

    const privacyItems = [
        {
            icon: FileText,
            title: "Dados Coletados",
            description:
                "Coletamos informações como nome, e-mail, telefone e dados de navegação, apenas para oferecer melhor experiência ao usuário.",
            color: "text-blue-400",
        },
        {
            icon: Shield,
            title: "Segurança",
            description:
                "Protegemos seus dados com criptografia e políticas internas rígidas. Nenhum dado será vendido ou compartilhado sem autorização.",
            color: "text-cyan-400",
        },
        {
            icon: Mail,
            title: "Contato",
            description: (
                <>
                    Você pode solicitar exclusão ou alterações dos dados entrando em contato pelo e-mail{" "}
                    <span className="text-blue-400">glvinformatica2024@gmail.com</span>.
                </>
            ),
            color: "text-pink-400",
        },
    ];

    const termsItems = [
        {
            icon: Code,
            title: "Aceitação",
            description:
                "Ao utilizar nossos serviços, você concorda integralmente com os termos descritos neste documento.",
            color: "text-blue-400",
        },
        {
            icon: Shield,
            title: "Proibições",
            description:
                "É proibido utilizar nossas soluções para fins ilícitos ou explorar falhas do sistema.",
            color: "text-blue-400",
        },
        {
            icon: ScrollText,
            title: "Alterações",
            description:
                "Podemos atualizar estes termos periodicamente. Comunicaremos mudanças relevantes em nossos canais oficiais.",
            color: "text-pink-400",
        },
    ];

    const content = modalContent === "privacy" ? privacyItems : termsItems;

    return (
        <ModalBase open={!!modalContent} onClose={onClose} size="4xl" className="p-6">
            {/* Título */}
            <h2 className="text-2xl md:text-3xl font-bold text-blue-400 mb-4">
                {modalContent === "privacy" ? "Política de Privacidade" : "Termos de Uso"}
            </h2>

            {/* Conteúdo */}
            <div className="grid grid-cols-1 gap-4 max-h-[65vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-400/40">
                {content.map((item, idx) => (
                    <div
                        key={idx}
                        className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/5 flex items-start gap-3"
                    >
                        <item.icon className={`h-6 w-6 ${item.color} mt-1`} />
                        <div>
                            <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                            <p className="text-white/70 text-sm mt-1 leading-relaxed">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </ModalBase>
    );
};

export default TermsModal;
