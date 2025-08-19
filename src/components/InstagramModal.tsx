import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface InstagramModalProps {
    isOpen: boolean;
    onClose: () => void;
    username?: string;
}

const InstagramModal: React.FC<InstagramModalProps> = ({ isOpen, onClose, username = "glv_informatica" }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
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
                <div className="relative rounded-3xl max-w-3xl w-full overflow-hidden shadow-lg bg-white/10 border border-white/25">
                    {/* Botão fechar */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/60 rounded-full p-1.5 transition cursor-pointer z-50"
                        aria-label="Fechar modal"
                    >
                        <X size={24} />
                    </button>

                    {/* Conteúdo do Instagram */}
                    <div className="w-full h-[60vh] md:h-[500px]">
                        <iframe
                            src={`https://www.instagram.com/${username}/embed`}
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                            title="Instagram"
                        />
                    </div>
                </div>
            </motion.div>
        </>,
        document.body
    );
};

export default InstagramModal;
