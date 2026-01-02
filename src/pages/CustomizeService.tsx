import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { services } from "../data/services";

const CustomizeService = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.slug === slug);

  const title = service?.title || "Personalizar Serviço";
  const description = service?.description || "Em breve você poderá personalizar esse serviço aqui.";

  return (
    <main className="relative overflow-hidden min-h-screen">
      <Helmet>
        <title>{`Personalizar: ${title}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <section className="relative z-10 pt-28 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{title}</h1>
            <p className="mt-4 text-white/80 text-base sm:text-lg">{description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
              >
                Voltar
              </button>
              <a
                href="#contact"
                className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                Falar com Especialista
              </a>
            </div>

            <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-white/80">
              <p>Área de personalização específica será desenvolvida aqui em breve.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default CustomizeService;
