import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  X,
  Smartphone,
  Globe,
} from "lucide-react";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [rotation, setRotation] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e) => {
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
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
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
    {
      id: 3,
      title: "CR-Transportes",
      category: "Web Development",
      image: "/img/portfolio/crtransportes.png",
      description:
        "Sistema para gestão de transportes e logística, com controle de frotas, rotas e painéis administrativos. Foi desenvolvida também uma página de conversão para captação de leads.",
      tech: ["Next.js", "Tailwind CSS", "Prisma", "TypeScript"],
      features: [
        "Painel administrativo",
        "Gestão de frotas",
        "Controle de entregas",
        "Mapa em tempo real",
        "Dashboard de indicadores",
      ],
      icon: Globe,
      githubUrl: "https://github.com/devcauagalvao/cr-transportes",
      projectUrl: "https://crsantostransportes.com.br",
      hoverBg: "hover:bg-[#ff7f50]",
      color: "from-[#ff7f50] to-[#ff7f50]",
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
    <section id="portfolio" className="py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-xl mx-auto px-2"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Nosso{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">Portfólio</span>
          </h2>
          <p className="text-white/80 text-base sm:text-lg">
            Projetos que transformaram negócios e superaram expectativas.
          </p>
        </motion.div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${
                activeCategory === category
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white/10 text-white/70 border border-white/20 hover:border-blue-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grade de Projetos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const gradient = project.color || "from-blue-600 to-blue-500";
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div
                  className={`rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 ${project.hoverBg}`}
                >
                  <div className="relative h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r p-2 rounded-full text-white shadow-md ${gradient}">
                      <project.icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
                    <div className="flex flex-wrap mt-4 gap-2">
                      {project.tech.slice(0, 3).map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs text-white/80 bg-white/10 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="text-xs text-blue-400">
                          +{project.tech.length - 3} mais
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Modal de Detalhes */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-gray-900/90 rounded-3xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-white/20"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Imagem */}
                <div className="md:w-1/2 w-full">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="object-cover w-full h-64 md:h-full"
                  />
                </div>

                {/* Conteúdo */}
                <div className="p-6 flex flex-col justify-between md:w-1/2">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h3>
                    <p className="text-white/70 text-sm mb-4">{selectedProject.description}</p>
                    <ul className="text-white/80 text-sm space-y-1 mb-4">
                      {selectedProject.features.map((f, i) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedProject.tech.map((tech, i) => (
                        <span key={i} className="text-xs bg-white/10 text-white px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex gap-4 mt-4 flex-wrap">
                    {selectedProject.projectUrl && (
                      <a
                        href={selectedProject.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver Projeto
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:border-blue-400 transition"
                      >
                        <Github className="w-4 h-4" />
                        Código
                      </a>
                    )}
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
