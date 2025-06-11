import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  X,
  Monitor,
  Smartphone,
  Server,
} from "lucide-react";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  const projects = [
    {
      id: 1,
      title: "Sistema ERP Completo",
      category: "Web Development",
      image:
        "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Sistema completo de gestão empresarial com módulos de vendas, estoque, financeiro e relatórios avançados.",
      tech: ["React", "Node.js", "PostgreSQL", "Docker"],
      features: [
        "Dashboard em tempo real",
        "Relatórios personalizados",
        "API REST",
        "Controle de acesso",
      ],
      icon: Monitor,
    },
    {
      id: 2,
      title: "App de Delivery",
      category: "Mobile App",
      image:
        "https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Aplicativo móbil para delivery com geolocalização, pagamentos integrados e sistema de avaliações.",
      tech: ["React Native", "Firebase", "Stripe", "Google Maps"],
      features: [
        "Tracking em tempo real",
        "Pagamentos seguros",
        "Push notifications",
        "Avaliações",
      ],
      icon: Smartphone,
    },
    {
      id: 3,
      title: "Infraestrutura Cloud AWS",
      category: "Infrastructure",
      image:
        "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Migração completa para AWS com alta disponibilidade, backup automatizado e monitoramento 24/7.",
      tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
      features: [
        "Auto scaling",
        "Load balancing",
        "Backup automático",
        "Monitoramento",
      ],
      icon: Server,
    },
    {
      id: 4,
      title: "E-commerce B2B",
      category: "Web Development",
      image:
        "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Plataforma de e-commerce B2B com catálogo avançado, pedidos em lote e integração com ERPs.",
      tech: ["Next.js", "Shopify Plus", "GraphQL", "Stripe"],
      features: [
        "Catálogo dinâmico",
        "Pedidos em lote",
        "Integração ERP",
        "Analytics",
      ],
      icon: Monitor,
    },
    {
      id: 5,
      title: "App Financeiro",
      category: "Mobile App",
      image:
        "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Aplicativo de controle financeiro pessoal com IA para categorização automática de gastos.",
      tech: ["Flutter", "Python", "TensorFlow", "Firebase"],
      features: [
        "IA para categorização",
        "Gráficos interativos",
        "Metas financeiras",
        "Sincronização",
      ],
      icon: Smartphone,
    },
    {
      id: 6,
      title: "Servidor de Jogos",
      category: "Infrastructure",
      image:
        "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Infraestrutura de servidores para jogos online com baixa latência e alta disponibilidade.",
      tech: ["Linux", "Docker", "Redis", "Nginx"],
      features: [
        "Baixa latência",
        "Auto scaling",
        "DDoS protection",
        "Backup em tempo real",
      ],
      icon: Server,
    },
  ];

  const categories = [
    "Todos",
    "Web Development",
    "Mobile App",
    "Infrastructure",
  ];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nosso{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Portfólio
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Projetos que transformaram negócios e superaram expectativas
          </p>
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
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
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

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500">
                        <project.icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <div className="text-sm text-blue-400 mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-white/70 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs bg-white/10 text-white/60 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 text-xs text-blue-400">
                          +{project.tech.length - 3} mais
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-lg bg-gray-900/90 border border-white/20 rounded-3xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="fixed md:absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-full">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  </div>

                  <div className="p-8">
                    <div className="text-sm text-blue-400 mb-2">
                      {selectedProject.category}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {selectedProject.title}
                    </h3>
                    <p className="text-white/80 mb-6 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Principais Recursos
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedProject.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-blue-400 rounded-full" />
                            <span className="text-white/70 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-3">
                        Tecnologias
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tech.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 text-blue-300 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <motion.button
                        className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Ver Projeto</span>
                      </motion.button>
                      <motion.button
                        className="flex items-center space-x-2 backdrop-blur-sm bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full hover:border-blue-500/50 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="h-4 w-4" />
                        <span>Código</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
