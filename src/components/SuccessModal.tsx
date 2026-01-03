import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: React.ReactNode;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose, title = "Enviado com sucesso", message = "Retorno dentro de 12 horas." }) => {
  if (!open) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", zIndex: 9999 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 10000 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-3xl max-w-md w-full flex flex-col overflow-hidden shadow-lg bg-white/10 border border-white/25 p-6">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/60 rounded-full p-1.5 transition cursor-pointer z-50"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <h2 className="text-2xl font-bold text-green-400">{title}</h2>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">{message}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SuccessModal;
