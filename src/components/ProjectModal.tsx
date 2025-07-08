import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  imageModal: string;
  description: string;
  tech: string[];
  features: string[];
  githubUrl?: string;
  projectUrl?: string;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Render modal no portal para garantir z-index no topo da página
  return ReactDOM.createPortal(
    <>
      {/* Fundo com blur e sombra preta */}
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

      {/* Modal em si */}
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
            <X size={24} />
          </button>

          <div className="md:w-1/2 w-full">
            <img
              src={project.imageModal || project.image}
              alt={project.title}
              className="object-cover w-full h-64 md:h-full"
            />
          </div>
          <div className="p-6 flex flex-col justify-between md:w-1/2">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-white/70 text-sm mb-4">{project.description}</p>
              <ul className="text-white/80 text-sm space-y-1 mb-4">
                {project.features.map((f, i) => (
                  <li key={i}>• {f}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs bg-white/10 text-white px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex gap-4 mt-4 flex-wrap">
              {project.projectUrl && (
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-blue-700 transition"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver Projeto
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
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
        </div>
      </motion.div>
    </>,
    document.body
  );
};

export default ProjectModal;