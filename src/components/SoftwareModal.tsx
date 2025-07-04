import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  ShoppingCart,
  Globe,
  Server,
  Database,
  Cloud,
  ShieldCheck,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  priceFirstMonth: string;
  priceRecurring: string;
  priceValue: string;
  originalPrice?: string | null;
  discountPercent?: number | null;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  icon: React.ComponentType<any>;
  badge?: string | null;
}

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const SoftwareModal: React.FC<ProductModalProps> = ({ product, onClose }) => {

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      {/* Fundo escuro com blur */}
      <motion.div
        className="fixed inset-0 bg-black/40"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          zIndex: 9999,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal container */}
      <motion.div
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{ zIndex: 10000 }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-3xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden shadow-lg bg-white/10 border border-white/25">
          {/* Botão fechar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white bg-black/30 hover:bg-black/60 rounded-full p-1.5 transition cursor-pointer z-50"
            aria-label="Fechar modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Imagem e badge */}
          <div className="md:w-1/2 w-full relative">
            {product.badge && (
              <span
                className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gray-700 bg-opacity-70 select-none z-10"
                title={product.badge}
              >
                {product.badge}
              </span>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-64 md:h-full"
            />
            <div className="absolute top-4 right-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500">
                <product.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 flex flex-col justify-between md:w-1/2 text-white">
            <div>
              <h3 className="text-3xl font-bold mb-2">{product.name}</h3>
              <p className="text-white/70 text-sm mb-4 font-semibold">Categoria: {product.category}</p>

              {/* Avaliação */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                    />
                  ))}
                </div>
                <span className="text-white/60 text-sm">
                  {product.rating} ({product.reviews} avaliações)
                </span>
              </div>

              {/* Features */}
              <ul className="mb-6 space-y-1">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-2 text-white/80 text-sm">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Preços */}
              <div className="mb-6">
                <div className="text-3xl font-bold">
                  {product.priceFirstMonth}{" "}
                  <span className="text-sm font-normal text-white/60">no 1º mês</span>
                </div>
                <div className="text-white/80 text-sm mb-1">{product.priceRecurring} após</div>

                {product.originalPrice && (
                  <div className="text-white/60 line-through">{product.originalPrice}</div>
                )}

                {product.discountPercent && (
                  <div className="text-green-400 font-semibold mt-1">
                    {product.discountPercent}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Botões */}
            <div className="flex space-x-3">
              <motion.button
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 px-5 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Assinar</span>
              </motion.button>

              <motion.button
                className="px-5 py-3 backdrop-blur-sm bg-white/10 border border-white/20 text-white rounded-lg hover:border-blue-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ExternalLink className="h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </>,
    document.body
  );
};

export default SoftwareModal;