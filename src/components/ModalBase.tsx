import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ModalBaseProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";
  isPortal?: boolean;
}

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "4xl": "max-w-4xl",
};

// Keep these very high to always overlay the navbar, but leave headroom for
// nested portaled popovers/menus inside the modal.
const Z_INDEX_BACKDROP = 2147483000;
const Z_INDEX_MODAL = 2147483001;

/**
 * Componente base para modais com estilo Liquid Glass (Glassmorphism)
 * Padroniza backdrop, animações, estilos e comportamentos
 */
const ModalBase: React.FC<ModalBaseProps> = ({
  open,
  onClose,
  children,
  className = "",
  showCloseButton = true,
  size = "md",
  isPortal = true,
}) => {
  const previousBodyOverflow = useRef<string | null>(null);
  const previousBodyPaddingRight = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    previousBodyOverflow.current = body.style.overflow;
    previousBodyPaddingRight.current = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousBodyOverflow.current ?? "";
      body.style.paddingRight = previousBodyPaddingRight.current ?? "";
    };
  }, [open]);

  const modalContent = (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Backdrop com blur - Liquid Glass */}
          <motion.div
            className="fixed inset-0 bg-black/40"
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              zIndex: Z_INDEX_BACKDROP,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Container do modal centralizado */}
          <motion.div
            className="fixed inset-0 flex items-center justify-center p-4"
            style={{ zIndex: Z_INDEX_MODAL }}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Conteúdo do modal com Liquid Glass */}
            <div
              className={`
                relative w-full ${sizeClasses[size]} overflow-hidden
                rounded-3xl shadow-2xl
                bg-white/10 backdrop-blur-xl
                border border-white/25
                before:absolute before:inset-0 before:bg-gradient-to-br
                before:from-white/10 before:to-transparent before:pointer-events-none
                ${className}
              `}
            >
              {/* Botão fechar */}
              {showCloseButton && (
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all cursor-pointer z-50 backdrop-blur-md border border-white/10 hover:border-white/20 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Fechar modal"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </motion.button>
              )}

              {/* Conteúdo do modal */}
              <div className="relative z-10">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  // Usar portal ou renderizar diretamente
  if (isPortal) {
    return ReactDOM.createPortal(modalContent, document.body);
  }

  return modalContent;
};

export default ModalBase;
