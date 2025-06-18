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
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    const rotateY = (deltaX / (rect.width / 2)) * 15;
    const rotateX = -(deltaY / (rect.height / 2)) * 15;
    setRotation({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ rotateX: 0, rotateY: 0 });
  };

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
      title: "Fit Fusion",
      category: "App Mobile",
      image: "/img/portfolio/fitfusion.png",
      description:
        "Aplicativo mobile para gerenciamento e acompanhamento de treinos e atividades físicas, com foco em personal trainers e academias.",
      tech: ["React Native", "TypeScript", "Firebase"],
      features: [
        "Cadastro de Usuários",
        "Treinos Personalizados",
        "Histórico de Atividades",
        "Dietas Personalizadas",
        "Notificações e Lembretes",
      ],
      icon: Smartphone,
      githubUrl: "https://github.com/devcauagalvao/AppFitfusion.git",
      hoverBg: "hover:bg-[#00bc81]",
    },
    {
      id: 2,
      title: "DevFlow",
      category: "App Mobile",
      image: "/img/portfolio/devflow.png",
      description:
        "Uma rede social focada em desenvolvedores, com posts, mensagens privadas, editor de código e integração com GitHub.",
      tech: ["React Native", "Firebase", "Supabase", "TypeScript"],
      features: [
        "Feed de posts",
        "Discussões técnicas",
        "Mensagens privadas",
        "Vídeo-aulas exclusivas",
        "Login com GitHub",
      ],
      icon: Smartphone,
      hoverBg: "hover:bg-[#008fce]",
      color: "from-[#008fce] to-[#008fce]",
    },
  ];

  const categories = [
    "Todos",
    "Web Development",
    "App Mobile",
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
            {filteredProjects.map((project, index) => {
              const gradient = project.color || "from-blue-600 to-blue-500";
              const hoverBg = project.hoverBg || "hover:bg-blue-600/80";
              // Sempre deixa as fontes brancas no hover
              const hoverText = "group-hover:text-white";
              return (
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
                  <div
                    className={`relative backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 ${hoverBg}`}
                  >
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div
                          className={`p-2 rounded-full bg-gradient-to-r ${gradient}`}
                        >
                          <project.icon className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    </div>
                    {/* Project Info */}
                    <div className="p-6">
                      <div
                        className={`text-sm mb-2 bg-clip-text text-transparent bg-gradient-to-r ${gradient}`}
                      >
                        {project.category}
                      </div>
                      <h3
                        className={`text-xl font-bold text-white mb-3 transition-colors duration-300 ${hoverText}`}
                      >
                        {project.title}
                      </h3>
                      <p
                        className={`text-white/70 mb-4 line-clamp-2 transition-colors duration-300 ${hoverText}`}
                      >
                        {project.description}
                      </p>
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className={`px-2 py-1 text-xs bg-white/10 text-white/60 rounded-full transition-colors duration-300 ${hoverText}`}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span
                            className={`px-2 py-1 text-xs text-blue-400 transition-colors duration-300 ${hoverText}`}
                          >
                            +{project.tech.length - 3} mais
                          </span>
                        )}
                      </div>
                    </div>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                key="modal"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-lg bg-gray-900/90 border border-white/20 rounded-3xl shadow-xl z-[110]"
                onClick={(e) => e.stopPropagation()}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: 1000,
                  transform: `rotateX(${rotation.rotateX}deg) rotateY(${rotation.rotateY}deg)`,
                  transition:
                    rotation.rotateX === 0 && rotation.rotateY === 0
                      ? "transform 0.5s cubic-bezier(0.22,1,0.36,1)"
                      : "none",
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="fixed md:absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors duration-200"
                  aria-label="Fechar modal"
                >
                  <X className="h-6 w-6" />
                </button>

                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-80 md:h-full">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover rounded-l-3xl md:rounded-r-none"
                    />
                  </div>
                  <div className="p-8">
                    <div
                      className={`text-sm mb-2 bg-clip-text text-transparent bg-gradient-to-r ${
                        selectedProject.color || "from-blue-600 to-blue-500"
                      }`}
                    >
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
                      {selectedProject.projectUrl && (
                        <motion.button
                          className={`flex items-center space-x-2 ${
                            selectedProject.buttonColor ||
                            "bg-blue-600 hover:bg-blue-700"
                          } text-white px-6 py-3 rounded-full hover:shadow-lg transition-all duration-300`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            window.open(selectedProject.projectUrl, "_blank")
                          }
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Ver Projeto</span>
                        </motion.button>
                      )}
                      {selectedProject.githubUrl && (
                        <motion.button
                          className="flex items-center space-x-2 backdrop-blur-sm bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full hover:border-blue-500/50 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            window.open(selectedProject.githubUrl, "_blank")
                          }
                        >
                          <Github className="h-4 w-4" />
                          <span>Código</span>
                        </motion.button>
                      )}
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
