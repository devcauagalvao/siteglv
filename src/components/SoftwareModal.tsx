import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ShoppingCart, Star } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category?: string;
  image?: string;
  rating?: number;
  reviews?: number;
  features?: string[];
  badge?: string;
};

type Props = {
  product: Product;
  onClose: () => void;
  whatsapp?: string;
};

const SoftwareModal: React.FC<Props> = ({ product, onClose, whatsapp }) => {
  // Substitua pelo número real da GLV (formato internacional sem + ou espaços, ex: 5511999999999)
  const GLV_WHATSAPP = whatsapp || "5511919167653";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleWhatsApp = () => {
    const message = `Olá! Quero personalizar "${product.name}" (Categoria: ${product.category || "—"}). Podemos conversar?`;
    const url = `https://wa.me/${GLV_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 8, scale: 0.98 }}
        transition={{ duration: 0.18 }}
        className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl max-h-[92vh] overflow-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 bg-gradient-to-br from-white/5 via-white/3 to-white/2 backdrop-blur-lg border border-white/10">
          {/* imagem */}
          <div className="relative h-48 sm:h-56 md:h-auto">
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src =
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <span className="text-white/70">Sem imagem</span>
              </div>
            )}

            {/* badge */}
            {product.badge && (
              <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full bg-black/50 text-white/90 backdrop-blur-sm">
                {product.badge}
              </span>
            )}

            {/* close button (sobre a imagem) */}
            <button
              onClick={onClose}
              aria-label="Fechar"
              className="absolute top-4 right-4 z-20 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/6 hover:bg-white/10 text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* conteúdo */}
          <div className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <h2 id="modal-title" className="text-lg sm:text-2xl font-bold text-white">
                {product.name}
              </h2>

              {product.category && (
                <div className="mt-2 text-sm text-white/60">{product.category}</div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating || 0) ? "text-yellow-400" : "text-white/20"}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-white/60">
                    {product.rating} ({product.reviews || 0} avaliações)
                  </div>
                </div>

                <div className="text-sm text-white/50">Projeto personalizado</div>
              </div>

              <hr className="my-4 border-white/6" />

              <div>
                <h3 className="text-sm font-semibold text-white/90 mb-3">Principais recursos</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-white/70">
                  {(product.features || []).map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-4 text-sm text-white/60">
                Queremos entender suas necessidades e montar uma solução sob medida. Fale com a GLV via WhatsApp para iniciar a personalização e receber orientação de onboarding.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 text-white font-semibold shadow-lg hover:brightness-105 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Quero Personalizar (WhatsApp)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2 rounded-lg border border-white/10 text-white/90 hover:bg-white/3 transition focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SoftwareModal;