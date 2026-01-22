interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: string;
  email: string;
}

export const SuccessModal = ({ isOpen, onClose, company, email }: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-50">
        {/* Ícone de sucesso */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Conteúdo */}
        <h2 className="text-2xl font-bold text-white text-center mb-3">
          Proposta Enviada!
        </h2>

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

        {/* Botões */}
        <div className="space-y-3">
          <button
            onClick={onClose}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Voltar para Início
          </button>
          <p className="text-xs text-gray-500 text-center">
            Obrigado por escolher a GLV Tecnologia!
          </p>
        </div>
      </div>
    </div>
  );
};
