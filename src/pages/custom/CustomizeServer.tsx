import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import WorldMap from "@/components/WorldMap";
import FloatingArrow from "../../components/FloatingArrow";
import { services } from "../../data/services";

const CustomizeServer = () => {
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  const effectiveSlug = slug ?? "redes-servidores";
  const service = services.find((s) => s.slug === effectiveSlug);

  const title = service?.title || "Redes & Servidores";
  const description = service?.description || "";

  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (slug && slug !== "redes-servidores") {
      navigate("/", { replace: true });
    }
  }, [slug, navigate]);


  return (
    <main className="relative min-h-screen overflow-hidden">
      <Helmet>
        <title>{`Personalizar: ${title}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />

      <section className="relative z-10 pt-28 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4">
          <FloatingArrow
            useHistoryBack
            className="fixed top-20 sm:top-24 left-4 z-50"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Texto */}
            <div className="lg:col-span-5">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                {title}
              </h1>

              {description && (
                <p className="mt-4 text-white/80 text-base sm:text-lg">
                  {description}
                </p>
              )}

              <div className="mt-8" id="contact">
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Nome da empresa</label>
                    <input
                      type="text"
                      placeholder="Ex.: GLV Tecnologia"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Nome do responsável *</label>
                    <input
                      type="text"
                      placeholder="Nome completo"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-white/80 text-sm mb-1 block">Contato (WhatsApp ou Email) *</label>
                    <input
                      type="text"
                      placeholder="Ex.: (11) 99999-9999 ou email@empresa.com"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                </div>
              </div>
            </div>

            {/* MAPA — wrapper fixo */}
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <WorldMap className="w-full h-[320px] sm:h-[420px] lg:h-[560px] rounded-xl overflow-hidden bg-transparent" />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default CustomizeServer;