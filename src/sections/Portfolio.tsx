import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Smartphone, Globe } from "lucide-react";
import ProjectModal from "../components/ProjectModal";
import { imat3 } from "three/examples/jsm/nodes/Nodes.js";

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
      imageModal: "/img/portfolio/fitfusion.png",
      description:
        "App mobile para gerenciar treinos e atividades físicas, focado em personal trainers e academias. Permite acompanhar a evolução dos usuários, criar treinos e dietas personalizadas, além de enviar notificações para manter a motivação.",
      tech: ["React Native", "TypeScript", "Firebase"],
      features: [
        "Cadastro de Usuários",
        "Treinos Personalizados",
        "Histórico de Atividades",
        "Dietas Personalizadas",
        "Notificações e Lembretes",
        "Suporte offline básico",
        "Relatórios simples de progresso",
      ],
      icon: Smartphone,
      githubUrl: "https://github.com/devcauagalvao/AppFitfusion.git",
      hoverBg: "hover:bg-[#008a5e]",
      color: "from-[#008a5e] to-[#006943]",
    },
    {
      id: 2,
      title: "DevFlow",
      category: "App Mobile",
      image: "/img/portfolio/devflow.png",
      imageModal: "/img/portfolio/devflow.png",
      description:
        "Rede social para desenvolvedores com feed de posts, mensagens privadas, editor de código embutido e integração com GitHub, facilitando a colaboração e troca de conhecimento entre devs.",
      tech: ["React Native", "Firebase", "Supabase", "TypeScript"],
      features: [
        "Feed de posts",
        "Discussões técnicas",
        "Mensagens privadas",
        "Vídeo-aulas exclusivas",
        "Login com GitHub",
        "Editor de código integrado",
        "Grupos de discussão",
      ],
      icon: Smartphone,
      hoverBg: "hover:bg-[#008fce]",
      color: "from-[#008fce] to-[#008fce]",
      githubUrl: "https://github.com/devcauagalvao/Dev-FLow.git",
    },
    {
      id: 3,
      title: "CR-Transportes",
      category: "Sites",
      image: "/img/portfolio/crtransportes.png",
      imageModal: "/img/portfolio/crtransporteslogo.jpeg",
      description:
        "Sistema para gestão de transportes e logística, com controle de frotas, rotas e painéis administrativos. Foi desenvolvida também uma página de conversão para captação de leads.",
      tech: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Prisma"],
      features: [
        "Design responsivo e moderno",
        "Informações institucionais",
        "Formulário de contato",
        "Integração com Google Analytics",
        "Otimização para SEO",
      ],
      icon: Globe,
      projectUrl: "https://crsantostransportes.com.br",
      hoverBg: "hover:bg-blue-600",
      color: "from-blue-600 to-blue-600",
    },
    {
      id: 4,
      title: "TechLearn",
      category: "Sites",
      image: "/img/portfolio/techlearn.png",
      imageModal: "/img/portfolio/logotechlearn.png",
      description:
        "Site de apresentação do TechLearn, um aplicativo inovador para ensino de programação, com informações sobre cursos, designs e tecnologias utilizadas.",
      tech: ["HTML5", "CSS3", "JavaScript", "AOS (Animate On Scroll)"],
      features: [
        "Informações detalhadas sobre recursos do aplicativo",
        "Apresentação dos cursos disponíveis",
        "Design responsivo",
        "Animações suaves com AOS",
        "Vitrine das funcionalidades do TechLearn",
      ],
      githubUrl: "https://github.com/devcauagalvao/Site-TCC-TechLearn.git",
      projectUrl: "https://site-tcc-tech-learn.vercel.app",
      icon: Globe,
      hoverBg: "hover:bg-cyan-600",
      color: "from-cyan-600 to-cyan-600",
    },
    {
      id: 5,
      title: "WowGold",
      category: "Sites",
      image: "/img/portfolio/wowgold.png",
      imageModal: "/img/portfolio/wowgold.png",
      description:
        "Plataforma de comércio especializada na venda de ouro virtual para World of Warcraft. O site apresenta uma interface responsiva com design moderno e oferece uma experiência fluida ao usuário.",
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "jQuery",
        "Swiper (carrosséis)",
        "Webpack",
        "Babel",
      ],
      features: [
        "Layout responsivo com design moderno",
        "Animações suaves ao rolar a página",
        "Carrosséis de imagens com Swiper",
        "Integração com Google Analytics e Facebook Pixel",
        "Gerenciamento eficiente de tags com Google Tag Manager",
      ],
      projectUrl: "https://wowgold.com.br",
      icon: Globe,
      hoverBg: "hover:bg-yellow-600",
      color: "from-yellow-600 to-yellow-600",
    },
    {
      id: 6,
      title: "Easy Haircut",
      category: "Sites",
      image: "/img/portfolio/easyhaircut.png",
      imageModal: "/img/portfolio/easyhaircutlogo.png",
      description:
        "Easy Haircut é um software simples e moderno para barbearias, que facilita o agendamento online e o gerenciamento de clientes, ajudando a otimizar o atendimento e aumentar a produtividade.",
      tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
      features: [
        "Agendamento online fácil e rápido",
        "Gerenciamento de clientes",
        "Interface intuitiva e responsiva",
        "Notificações de lembrete de agendamentos",
        "Relatórios de desempenho",
      ],
      icon: Globe,
      projectUrl: "https://easyhaircut.vercel.app/",
      hoverBg: "hover:bg-red-800",
      color: "from-red-800 to-red-800",
    },
  ];

  const categories = ["Todos", "Sites", "App Mobile", "Infraestrutura"];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="relative z-0 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 max-w-xl mx-auto px-2"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Nosso{" "}
            <span className="bg-blue-600 bg-clip-text text-transparent">
              Portfólio
            </span>
          </h2>
          <p className="text-white/80 text-base sm:text-lg mb-3">
            Projetos que transformaram negócios e superaram expectativas.
          </p>
          <p className="text-white/60 text-sm">
            Todos os projetos são desenvolvidos seguindo os critérios e
            necessidades de cada cliente.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${activeCategory === category
                ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg"
                : "bg-white/10 backdrop-blur-md text-white/80 border border-white/20 hover:border-blue-400 hover:text-white"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

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
                  className={`rounded-2xl overflow-hidden border border-white/10 
                    bg-gradient-to-br from-white/10 via-white/5 to-white/10 
                    backdrop-blur-xl shadow-xl transition-all duration-300 
                    ${project.hoverBg}`}
                >
                  <div className="relative h-48">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute top-4 right-4 p-2 rounded-full shadow-md bg-gradient-to-r ${gradient}`}
                    >
                      <project.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-white/70 text-sm line-clamp-2">
                      {project.description}
                    </p>
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

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
