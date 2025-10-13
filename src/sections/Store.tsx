import React, { useState } from "react";
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
import SoftwareModal from "../components/SoftwareModal";

type Product = {
  id: number;
  name: string;
  category: string;
  priceFirstMonth: string;
  priceRecurring: string;
  priceValue: string;
  originalPrice: string | null;
  discountPercent: number | null;
  image: string;
  rating: number;
  reviews: number;
  features: string[];
  icon: React.ElementType;
  badge?: string;
};

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const GLV_WHATSAPP = "5511919167653";

  const categories = [
    "Todos",
    "Restaurantes e Lanchonetes",
    "Gestão Empresarial",
    "Aplicativos e Integrações",
    "Sites e Landing Pages",
    "Projetos Sob Medida",
  ];

  const products: Product[] = [
    {
      id: 1,
      name: "Plataformas Sob Medida — projeto customizado",
      category: "Projetos Sob Medida",
      priceFirstMonth: "R$ 199,00",
      priceRecurring: "R$ 599,00/mês",
      priceValue: "R$ 599,00",
      originalPrice: null,
      discountPercent: null,
      image: "/img/softwares/plataforma.png",
      rating: 4.8,
      reviews: 8,
      features: ["Plataformas", "SaaS", "Sistemas completos"],
      icon: Database,
      badge: "Sob Medida",
    },
    {
      id: 2,
      name: "PWA & Integrações — adaptação para seu negócio",
      category: "Aplicativos e Integrações",
      priceFirstMonth: "R$ 19,90",
      priceRecurring: "R$ 119,90/mês",
      priceValue: "R$ 119,90",
      originalPrice: null,
      discountPercent: null,
      image: "/img/softwares/pwa.jpg",
      rating: 4.5,
      reviews: 10,
      features: ["PWA", "WhatsApp Bot", "Pagamentos"],
      icon: Cloud,
    },
    {
      id: 3,
      name: "Sites e Landing Pages — conversão focada",
      category: "Sites e Landing Pages",
      priceFirstMonth: "R$ 99,00",
      priceRecurring: "R$ 299,00/mês",
      priceValue: "R$ 299,00",
      originalPrice: null,
      discountPercent: null,
      image: "/img/softwares/landingpage.jpg",
      rating: 4.9,
      reviews: 25,
      features: ["Institucionais", "Vendas", "Alta Conversão"],
      icon: Globe,
      badge: "Agência",
    },
    {
      id: 4,
      name: "ERP Gestão Pro — personalizável",
      category: "Gestão Empresarial",
      priceFirstMonth: "R$ 29,90",
      priceRecurring: "R$ 199,90/mês",
      priceValue: "R$ 199,90",
      originalPrice: null,
      discountPercent: null,
      image: "/img/softwares/erp.jpeg",
      rating: 4.6,
      reviews: 18,
      features: ["ERP Personalizado", "Agendamentos", "Dashboards"],
      icon: Server,
      badge: "Completo",
    },
    {
      id: 5,
      name: "Cardápio Digital — personalizável",
      category: "Restaurantes e Lanchonetes",
      priceFirstMonth: "R$ 0,00",
      priceRecurring: "R$ 49,90/mês",
      priceValue: "R$ 49,90",
      originalPrice: null,
      discountPercent: null,
      image: "/img/softwares/cardapio.jpg",
      rating: 4.7,
      reviews: 30,
      features: ["Cardápio Digital", "Personalização sob medida", "Pedidos Online", "QR Code"],
      icon: Globe,
      badge: "Popular",
    },
  ];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section id="store" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <div className="relative z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Soluções em </span>
            <span className="text-[#3B82F6]">Software</span>
          </h2>

          <p className="text-base sm:text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Personalize sua solução com a GLV — fale conosco pelo WhatsApp para
            criar a plataforma ideal para o seu negócio.
          </p>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30"
                  : "backdrop-blur-sm bg-white/10 text-white/80 border border-white/20 hover:border-blue-500/50"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Produtos */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => setSelectedProduct(product)}
              role="button"
              tabIndex={0}
              aria-label={`Abrir detalhes de ${product.name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProduct(product);
                }
              }}
            >
              <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                {product.badge && (
                  <span
                    className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gray-700 bg-opacity-70 select-none z-10"
                    title={product.badge}
                  >
                    {product.badge}
                  </span>
                )}

                <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={`Imagem do produto ${product.name}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.onerror = null;
                      img.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500">
                      <product.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-white/60">
                      {product.rating} ({product.reviews} avaliações)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {product.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-1"
                      >
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                        <span className="text-xs text-white/60">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Removido bloco de preços; substituído por benefícios/atrativos focados em personalização */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
                    <div className="w-full sm:w-auto mb-3 sm:mb-0">
                      <div className="text-sm text-white/80 mb-2">
                        <span className="font-semibold">Personalize o seu</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-black bg-yellow-400 rounded-full">
                          Personalização sob medida
                        </span>
                        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-blue-600/80 rounded-full">
                          Integração disponível
                        </span>
                        <span className="inline-block px-3 py-1 text-xs font-medium text-white bg-green-600/80 rounded-full">
                          Suporte dedicado
                        </span>
                      </div>
                    </div>

                    <div className="text-right w-full sm:w-auto">
                      <div className="text-sm text-white/60">Personalização e onboarding incluídos</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <motion.button
                      type="button"
                      className="w-full sm:flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 inline-flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        const message = `Olá! Quero personalizar "${product.name}" (Categoria: ${product.category}). Podemos conversar sobre requisitos e orçamento?`;
                        const url = `https://wa.me/${GLV_WHATSAPP}?text=${encodeURIComponent(message)}`;
                        window.open(url, "_blank", "noopener,noreferrer");
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Fale com a GLV</span>
                    </motion.button>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedProduct && (
        <SoftwareModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default Store;
