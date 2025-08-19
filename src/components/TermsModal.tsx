import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Shield, Mail, Code, ScrollText } from "lucide-react";

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

    return ReactDOM.createPortal(
        <AnimatePresence>
            {modalContent && (
                <>
                    {/* Fundo com blur */}
                    <motion.div
                        className="fixed inset-0 bg-black/40"
                        style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", zIndex: 9999 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center p-4"
                        style={{ zIndex: 10000 }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative rounded-3xl max-w-4xl w-full flex flex-col overflow-hidden shadow-lg bg-white/10 border border-white/25 p-6">
                            {/* Botão fechar */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/60 rounded-full p-1.5 transition cursor-pointer z-50"
                            >
                                <X size={24} />
                            </button>

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
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
};

export default TermsModal;
