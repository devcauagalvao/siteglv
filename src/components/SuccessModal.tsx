import React from "react";
import { CheckCircle } from "lucide-react";
import ModalBase from "./ModalBase";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: React.ReactNode;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onClose, title = "Enviado com sucesso", message = "Retorno dentro de 12 horas." }) => {
  return (
    <ModalBase open={open} onClose={onClose} size="md" className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <CheckCircle className="h-6 w-6 text-green-400" />
        <h2 className="text-2xl font-bold text-green-400">{title}</h2>
      </div>
      <p className="text-white/80 text-sm leading-relaxed">{message}</p>
    </ModalBase>
  );
};

export default SuccessModal;
