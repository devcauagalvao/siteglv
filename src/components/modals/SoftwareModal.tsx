import React, { useEffect } from "react";
import { ShoppingCart, Star } from "lucide-react";
import ModalBase from "./ModalBase";

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
  const GLV_WHATSAPP = whatsapp || "5511919167653";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // lock body scroll while modal is open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const handleWhatsApp = () => {
    const message = `Olá! Quero personalizar "${product.name}" (Categoria: ${product.category || "—"}). Podemos conversar?`;
    const url = `https://wa.me/${GLV_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <ModalBase open={true} onClose={onClose} size="4xl">
      <div className="flex flex-col md:flex-row md:items-start overflow-hidden">
          {/* Imagem à esquerda */}
          <div className="md:w-1/2 w-full relative md:self-start md:max-h-[420px] overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="block object-cover w-full h-64 md:h-auto md:max-h-[420px]"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.onerror = null;
                  img.src =
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";
                }}
              />
            ) : (
              <div className="w-full h-64 md:h-auto md:max-h-[420px] bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <span className="text-white/70">Sem imagem</span>
              </div>
            )}

            {product.badge && (
              <span className="absolute top-4 left-4 inline-flex items-center px-3 py-1.5 text-xs font-semibold rounded-full bg-black/50 text-white/90 backdrop-blur-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Conteúdo à direita */}
          <div className="p-6 flex flex-col md:w-1/2 gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {product.name}
              </h3>
              {product.category && (
                <div className="text-white/70 text-sm mb-4">
                  {product.category}
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 0)
                            ? "text-yellow-400"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-white/60">
                    {product.rating} ({product.reviews || 0} avaliações)
                  </div>
                </div>
                <div className="text-sm text-white/60">Projeto personalizado</div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white/90 mb-2">
                  Principais recursos
                </h4>
                <ul className="text-white/80 text-sm space-y-1">
                  {(product.features || []).map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-white/70 text-sm">
                Fale com a GLV via WhatsApp para personalizarmos sua solução e
                orientar o onboarding.
              </p>
            </div>

            <div className="flex gap-3 mt-6 flex-wrap">
              <button
                onClick={handleWhatsApp}
                className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition w-full sm:w-auto justify-center"
              >
                <ShoppingCart className="w-4 h-4" />
                Quero Personalizar (WhatsApp)
              </button>
            </div>
          </div>
        </div>
      </ModalBase>
    );
};

export default SoftwareModal;