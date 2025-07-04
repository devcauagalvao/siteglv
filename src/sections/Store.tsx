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

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const categories = [
    "Todos",
    "CRM",
    "Segurança",
    "Cloud & Dados",
  ];

  const products = [
    {
      id: 1,
      name: "GLV Easy Haircut",
      category: "CRM",
      priceFirstMonth: "R$ 9,99",
      priceRecurring: "R$ 29,99/mês",
      priceValue: "R$ 29,99",
      originalPrice: null,
      discountPercent: null,
      image: "/img/softwares/easyhaircut.png",
      rating: 4.8,
      reviews: 12,
      features: [
        "Agendamento Online",
        "Gestão Financeira",
        "Cadastro de Clientes",
        "Controle de Serviços",
        "Dashboard em Tempo Real"
      ],
      icon: Globe,
      badge: "Mais Recente",
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Soluções em </span>
            <span className="text-[#3B82F6]">Software</span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Plataformas SaaS para transformar sua operação com tecnologia,
            agilidade e segurança
          </p>

          <motion.a
            href="#"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="h-5 w-5" />
            <span>Ver Catálogo Completo</span>
          </motion.a>
        </motion.div>

        {/* Filtros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedCategory === category
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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

                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500">
                      <product.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.floor(product.rating)
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

                  <div className="grid grid-cols-2 gap-2 mb-4">
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

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {product.priceFirstMonth}
                        <span className="text-sm text-white/60 font-normal">
                          {" "}
                          no 1º mês
                        </span>
                      </div>

                      <div className="text-sm text-white/80">{product.priceRecurring}{" "}
                        após
                      </div>

                      {/* Preço original */}
                      {product.originalPrice && (
                        <div className="text-sm text-white/60 line-through">
                          {product.originalPrice}
                        </div>
                      )}
                    </div>

                    {/* Desconto */}
                    {product.discountPercent ? (
                      <div className="text-green-400 font-semibold">
                        {product.discountPercent}% OFF
                      </div>
                    ) : null}
                  </div>

                  <div className="flex space-x-2">
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Assinar</span>
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 backdrop-blur-sm bg-white/10 border border-white/20 text-white rounded-lg hover:border-blue-500/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal do produto */}
      {selectedProduct && (
        <SoftwareModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
};

export default Store