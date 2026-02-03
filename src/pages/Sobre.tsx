import { motion } from "framer-motion";
import { Target, Users, Lightbulb, Award } from "lucide-react";
import { Helmet } from "react-helmet";
import FloatingArrow from "../components/effects/FloatingArrow";
import ParticleBackground from "@/components/ui/ParticleBackground";

const Sobre = () => {
    const values = [
        {
            icon: Target,
            title: "Missão",
            description:
                "Transformar ideias em soluções tecnológicas inovadoras que impulsionam o crescimento das empresas.",
        },
        {
            icon: Users,
            title: "Valores",
            description:
                "Transparência, excelência técnica e atendimento personalizado, pilares da GLV Tecnologia.",
        },
        {
            icon: Lightbulb,
            title: "Visão",
            description:
                "Ser referência nacional em soluções tecnológicas personalizadas para empresas de todos os portes.",
        },
        {
            icon: Award,
            title: "Experiência",
            description:
                "Mais de 4 anos entregando softwares, sites e automações que transformam negócios no Brasil.",
        },
    ];

    return (
        <main className="relative overflow-hidden min-h-screen">
            <Helmet>
                <title>Sobre Nós | GLV Tecnologia</title>
                <meta
                    name="description"
                    content="Conheça a GLV Tecnologia: missão, valores, visão, experiência e jornada de inovação em softwares, sites e automações."
                />
                <meta name="author" content="GLV Tecnologia" />
                <meta name="robots" content="index, follow" />
            </Helmet>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
            <div className="opacity-35 mix-blend-screen">
                <ParticleBackground />
            </div>

            <FloatingArrow ariaLabel="Voltar para a Home" direction="left" />

            <section className="relative z-10 pt-28 pb-16 sm:pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                            <span className="text-white">Sobre </span>
                            <span className="text-[#3B82F6]">Nós</span>
                        </h1>
                        <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl sm:max-w-3xl mx-auto">
                            Transformamos ideias em soluções digitais elegantes e funcionais, do planejamento ao suporte contínuo.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 sm:mb-20">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                role="listitem"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="group"
                            >
                                <div className="h-full backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 hover:border-blue-500/40 transition-all duration-300 shadow-lg">
                                    <div
                                        className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 mb-3 sm:mb-4 group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300"
                                        aria-hidden="true"
                                    >
                                        <value.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                                    </div>
                                    <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{value.title}</h2>
                                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">{value.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Sobre;
