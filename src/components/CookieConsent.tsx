import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Info } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('cookieConsent');
    if (!hasAccepted) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  const cookieTypes = [
    {
      name: 'Essenciais',
      description: 'Necessários para o funcionamento do site',
      required: true
    },
    {
      name: 'Analíticos',
      description: 'Ajudam a entender como o site é usado',
      required: false
    },
    {
      name: 'Marketing',
      description: 'Personalizam anúncios e conteúdo',
      required: false
    }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Conteúdo do banner, igual ao seu original */}
          <div className="backdrop-blur-lg bg-black/90 border-t border-white/20 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg shadow-blue-500/30">
                    <Cookie className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Utilizamos cookies para melhorar sua experiência
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Usamos cookies essenciais para o funcionamento do site e cookies opcionais para análises e personalização. 
                      Ao continuar navegando, você concorda com nossa política de privacidade conforme a LGPD.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
                  <motion.button
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center space-x-2 px-4 py-2 backdrop-blur-sm bg-white/10 border border-white/20 text-white/80 rounded-lg hover:border-blue-500/50 hover:bg-white/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Info className="h-4 w-4" />
                    <span className="text-sm">Personalizar</span>
                  </motion.button>
                  <motion.button
                    onClick={rejectCookies}
                    className="px-6 py-2 backdrop-blur-sm bg-white/10 border border-white/20 text-white/80 rounded-lg hover:border-red-500/50 hover:bg-red-500/20 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm font-medium">Rejeitar</span>
                  </motion.button>
                  <motion.button
                    onClick={acceptCookies}
                    className="px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Aceitar Todos
                  </motion.button>
                </div>
              </div>

              {/* Detalhes adicionais */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 pt-6 border-t border-white/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {cookieTypes.map((type, index) => (
                        <motion.div
                          key={type.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-white">{type.name}</h4>
                            <div className="relative">
                              <input
                                type="checkbox"
                                defaultChecked={type.required}
                                disabled={type.required}
                                className="sr-only"
                              />
                              <div className={`w-10 h-6 rounded-full ${
                                type.required ? 'bg-blue-500' : 'bg-gray-600'
                              } relative transition-colors duration-200`}>
                                <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform duration-200 ${
                                  type.required ? 'translate-x-5' : 'translate-x-1'
                                }`} />
                              </div>
                            </div>
                          </div>
                          <p className="text-white/70 text-xs">{type.description}</p>
                          {type.required && (
                            <div className="flex items-center space-x-1 mt-2">
                              <Shield className="h-3 w-3 text-green-400" />
                              <span className="text-green-400 text-xs">Obrigatório</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                    <div className="flex justify-center mt-6">
                      <motion.button
                        onClick={acceptCookies}
                        className="px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Salvar Preferências
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-black/70 border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                <p className="text-white/60 text-xs">
                  Para mais informações, consulte nossa{' '}
                  <a href="#privacy" className="text-blue-400 hover:text-blue-300 underline">
                    Política de Privacidade
                  </a> e{' '}
                  <a href="#terms" className="text-blue-400 hover:text-blue-300 underline">
                    Termos de Uso
                  </a>
                </p>
                <div className="text-white/60 text-xs">
                  Conforme LGPD - Lei 13.709/2018
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
