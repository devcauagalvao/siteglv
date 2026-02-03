import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, Smartphone, Globe, ChevronLeft, ChevronRight } from "lucide-react";
import ProjectModal from "../components/modals/ProjectModal";

type PortfolioProject = {
  id: number;
  title: string;
  category: string;
  image: string | string[];
  imageModal: string | string[];
  description: string;
  tech: string[];
  features: string[];
  icon: React.ComponentType<any>;
  githubUrl?: string;
  hoverBg?: string;
  color?: string;
  projectUrl?: string;
};

const Portfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  const projects: PortfolioProject[] = [
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
      id: 5,
      title: "Easy Haircut",
      category: "Sites",
      image: "/img/portfolio/easyhaircut.png",
      imageModal:"/img/portfolio/easyhaircutlogo.png",
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
    {
      id: 6,
      title: "Taurus Black Burgers",
      category: "Sistemas",
      image: ["/img/portfolio/taurusburger.png", "/img/portfolio/taurusburger2.png"],
      imageModal: "/img/portfolio/logo-taurus.png",
      description:
        "Plataforma de delivery com catálogo de restaurantes, carrinho, rastreamento de pedidos em tempo real e painel administrativo. Interface responsiva otimizada para web e mobile.",
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Sonner", "Leaflet", "OpenStreetMap"],
      features: [
        "Catálogo de pratos",
        "Carrinho e fluxo de checkout",
        "Notificações em tempo real no recebimento de novos pedidos, assegurando alerta imediato à equipe de atendimento",
        "Rastreamento de pedidos em tempo real",
        "Painel administrativo para gerenciamento de pedidos",
      ],
      icon: Globe,
      projectUrl: "https://delivery-lake.vercel.app/",
      hoverBg: "hover:bg-[#cc9b3b]",
      color: "from-[#cc9b3b] to-[#cc9b3b]",
    },
  ];

  const categories = ["Todos", "Sites", "App Mobile", "Sistemas", "Infraestrutura"];
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProjects =
    activeCategory === "Todos"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Normaliza o projeto para atender ao tipo esperado pelo ProjectModal (evita incompatibilidade
  // quando `image`/`imageModal` são arrays no card).
  const selectedProjectForModal = useMemo(() => {
    if (!selectedProject) return null;

    const normalizedImage = Array.isArray(selectedProject.image)
      ? selectedProject.image[0]
      : selectedProject.image;

    const normalizedImageModal = Array.isArray(selectedProject.imageModal)
      ? selectedProject.imageModal[0]
      : selectedProject.imageModal;

    return {
      ...selectedProject,
      image: normalizedImage,
      imageModal: normalizedImageModal,
    };
  }, [selectedProject]);

  // Componente interno para cada card
  const ProjectCard: React.FC<{ project: PortfolioProject; index: number; onOpen: () => void }> = ({ project, index, onOpen }) => {
    const images = Array.isArray(project.image) ? project.image : [project.image];
    const [imgIndex, setImgIndex] = useState(0);

    const prev = (e: React.MouseEvent) => {
      e.stopPropagation();
      setImgIndex((i) => (i - 1 + images.length) % images.length);
    };
    const next = (e: React.MouseEvent) => {
      e.stopPropagation();
      setImgIndex((i) => (i + 1) % images.length);
    };

    const gradient = project.color || "from-blue-600 to-blue-500";

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
        onClick={onOpen}
      >
        <div
          className={`rounded-2xl overflow-hidden border border-white/10 
            bg-gradient-to-br from-white/10 via-white/5 to-white/10 
            backdrop-blur-xl shadow-xl transition-all duration-300 
            ${project.hoverBg}`}
        >
          <div className="relative h-48">
            <img
              src={images[imgIndex]}
              alt={`${project.title} - imagem ${imgIndex + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div
              className={`absolute top-4 right-4 p-2 rounded-full shadow-md bg-gradient-to-r ${gradient}`}
            >
              <project.icon className="w-4 h-4 text-white" />
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
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
  };

  return (
    <section
      id="portfolio"
      className="py-20 relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black via-gray-900 to-black pointer-events-none" />
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
              aria-pressed={activeCategory === category}
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
          {filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <ProjectModal
              project={selectedProjectForModal!}
              onClose={() => setSelectedProject(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
