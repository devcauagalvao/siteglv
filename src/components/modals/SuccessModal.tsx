import React from "react";
import { CheckCircle } from "lucide-react";
import ModalBase from "./ModalBase";

type SuccessModalProps =
  | {
      open: boolean;
      onClose: () => void;
      variant?: "simple";
      title?: string;
      message?: React.ReactNode;
    }
  | {
      open: boolean;
      onClose: () => void;
      variant: "server";
      company?: string;
      email: string;
    };

const SuccessModal: React.FC<SuccessModalProps> = (props) => {
  const { open, onClose } = props;
  const variant = ("variant" in props && props.variant) || "simple";

  if (variant === "server") {
    const { company, email } = props as Extract<SuccessModalProps, { variant: "server" }>;

    return (
      <ModalBase open={open} onClose={onClose} size="md" className="p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-3">Proposta Enviada!</h2>

        <p className="text-gray-300 text-center mb-6">
          Sua configuração foi enviada com sucesso para:
        </p>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-400">Email</p>
          <p className="text-white font-semibold break-all">{email}</p>
          {company && (
            <>
              <p className="text-sm text-gray-400 mt-3">Empresa</p>
              <p className="text-white font-semibold">{company}</p>
            </>
          )}
        </div>

        <div className="space-y-2 mb-6 text-sm text-gray-300">
          <p className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Proposta será revisada em breve</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Você receberá um email com a cotação</span>
          </p>
          <p className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span>Nossa equipe entrará em contato em 24h</span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Voltar para Início
          </button>
          <p className="text-xs text-gray-500 text-center">Obrigado por escolher a GLV Tecnologia!</p>
        </div>
      </ModalBase>
    );
  }

  const title = ("title" in props && props.title) || "Enviado com sucesso";
  const message = ("message" in props && props.message) || "Retorno dentro de 12 horas.";

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
