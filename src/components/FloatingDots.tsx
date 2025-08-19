import React, { useState } from "react";
import { motion, AnimationControls } from "framer-motion";
import { Sparkles } from "lucide-react";
import InstagramModal from "./InstagramModal";

interface FloatingDotsProps {
    setIsOpen: (val: boolean) => void;
    whatsappControls: AnimationControls;
}

export const FloatingDots: React.FC<FloatingDotsProps> = ({ setIsOpen, whatsappControls }) => {
    const [isInstagramOpen, setIsInstagramOpen] = useState(false);
    const whatsappMessage = "Olá, quero saber mais sobre os planos!";

    return (
        <>
            <div className="fixed right-6 bottom-6 flex flex-col items-center space-y-4 z-40">
                {/* WhatsApp */}
                <motion.a
                    href={`https://wa.me/5511919167653?text=${encodeURIComponent(whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-[#25D366]"
                    animate={whatsappControls}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    style={{ boxShadow: "0 0 0 rgba(37, 211, 102, 0.7)" }}
                >
                    <img
                        src="https://img.icons8.com/?size=100&id=16466&format=png&color=FFFFFF"
                        alt="WhatsApp"
                        className="w-8 h-8"
                    />
                </motion.a>

                {/* Botão Assistente */}
                <motion.button
                    onClick={() => setIsOpen(true)}
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-blue-600"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Abrir assistente virtual"
                >
                    <Sparkles className="w-8 h-8 text-white" />
                </motion.button>

                {/* Botão Instagram */}
                <motion.button
                    onClick={() => setIsInstagramOpen(true)}
                    className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-pink-500"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Abrir Instagram"
                >
                    <img
                        src="https://img.icons8.com/?size=100&id=20504&format=png&color=FFFFFF"
                        alt="Instagram"
                        className="w-8 h-8"
                    />
                </motion.button>
            </div>

            {/* Modal Instagram */}
            <InstagramModal isOpen={isInstagramOpen} onClose={() => setIsInstagramOpen(false)} />
        </>
    );
};
