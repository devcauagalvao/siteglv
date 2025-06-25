import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Star,
  ShoppingCart,
  Monitor,
  Cpu,
  HardDrive,
  Gamepad2,
  Laptop,
  Smartphone,
} from "lucide-react";

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = [
    "Todos",
    "PCs Gamer",
    "Notebooks",
    "Componentes",
    "Periféricos",
  ];

  const products = [
    {
      id: 1,
      name: "PC Gamer RGB Elite",
      category: "PCs Gamer",
      price: "R$ 4.999,00",
      originalPrice: "R$ 5.499,00",
      image:
        "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      reviews: 124,
      features: ["RTX 4060 Ti", "Ryzen 7 5700X", "16GB DDR4", "SSD 1TB"],
      icon: Gamepad2,
      badge: "Mais Vendido",
    },
    {
      id: 2,
      name: "Notebook Business Pro",
      category: "Notebooks",
      price: "R$ 3.299,00",
      originalPrice: "R$ 3.799,00",
      image:
        "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.6,
      reviews: 89,
      features: ["Intel i7 11ª Gen", "16GB RAM", "SSD 512GB", 'Tela 15.6"'],
      icon: Laptop,
      badge: "Oferta",
    },
    {
      id: 3,
      name: "Monitor 4K UltraWide",
      category: "Periféricos",
      price: "R$ 1.899,00",
      originalPrice: "R$ 2.199,00",
      image:
        "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      reviews: 67,
      features: ['34" UltraWide', "4K Resolution", "144Hz", "HDR10"],
      icon: Monitor,
      badge: "Premium",
    },
    {
      id: 4,
      name: "SSD NVMe 2TB",
      category: "Componentes",
      price: "R$ 849,00",
      originalPrice: "R$ 999,00",
      image:
        "https://images.pexels.com/photos/163140/circuit-circuit-board-resistor-computer-163140.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.7,
      reviews: 156,
      features: ["PCIe 4.0", "7000MB/s", "2TB Capacity", "5 Anos Garantia"],
      icon: HardDrive,
      badge: "Velocidade",
    },
    {
      id: 5,
      name: "Processador Ryzen 9",
      category: "Componentes",
      price: "R$ 2.199,00",
      originalPrice: "R$ 2.499,00",
      image:
        "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      reviews: 203,
      features: ["12 Cores", "24 Threads", "5.7GHz Boost", "AM5 Socket"],
      icon: Cpu,
      badge: "Performance",
    },
    {
      id: 6,
      name: "Smartphone Pro Max",
      category: "Periféricos",
      price: "R$ 2.899,00",
      originalPrice: "R$ 3.299,00",
      image:
        "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      reviews: 312,
      features: ["256GB Storage", "Triple Camera", "5G Ready", "Fast Charge"],
      icon: Smartphone,
      badge: "Novo",
    },
  ];

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <section id="store" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Nossa </span>
            <span className="text-[#3B82F6]">Loja</span>
          </h2>

          <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
            Produtos selecionados com qualidade garantida e os melhores preços
            do mercado
          </p>

          {/* Mercado Livre Link */}
          <motion.a
            href="#"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="h-5 w-5" />
            <span>Ver Loja Completa no Mercado Livre</span>
          </motion.a>
        </motion.div>

        {/* Category Filter */}
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
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
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

        {/* Products Grid */}
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
              className="group"
            >
              <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                {/* Product Badge Simplified */}
                {product.badge && (
                  <span
                    className="absolute top-4 left-4 inline-block px-3 py-1 rounded-full text-xs font-semibold text-white bg-gray-700 bg-opacity-70 select-none z-10"
                    title={product.badge}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4">
                    <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500">
                      <product.icon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Rating */}
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

                  {/* Features */}
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

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {product.price}
                      </div>
                      <div className="text-sm text-white/60 line-through">
                        {product.originalPrice}
                      </div>
                    </div>
                    <div className="text-green-400 font-semibold">
                      {Math.round(
                        ((parseFloat(
                          product.originalPrice
                            .replace("R$ ", "")
                            .replace(".", "")
                            .replace(",", ".")
                        ) -
                          parseFloat(
                            product.price
                              .replace("R$ ", "")
                              .replace(".", "")
                              .replace(",", ".")
                          )) /
                          parseFloat(
                            product.originalPrice
                              .replace("R$ ", "")
                              .replace(".", "")
                              .replace(",", ".")
                          )) *
                          100
                      )}
                      % OFF
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <motion.button
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Comprar</span>
                    </motion.button>
                    <motion.button
                      className="px-4 py-2 backdrop-blur-sm bg-white/10 border border-white/20 text-white rounded-lg hover:border-blue-500/50 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Store CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="backdrop-blur-lg bg-gradient-to-r from-yellow-500/20 to-yellow-400/20 border border-yellow-500/30 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Encontre o produto perfeito para você
            </h3>
            <p className="text-white/80 mb-6">
              Visite nossa loja completa no Mercado Livre e encontre centenas de
              produtos com entrega rápida
            </p>
            <motion.button
              className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/30 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visitar Loja no Mercado Livre
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Store;
