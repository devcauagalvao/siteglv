import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Github,
} from "lucide-react";

const AIAssistant = () => {
  // Estado do chat aberto/fechado
  const [isOpen, setIsOpen] = useState(false);

  // Estado das mensagens: array de objetos {id, text, isBot, timestamp, ...}
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Sou o assistente virtual Commit. Como posso ajudá-lo hoje? 😊",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  // Estado do input de texto
  const [inputMessage, setInputMessage] = useState("");

  // Estado para mostrar o indicador "digitando"
  const [isTyping, setIsTyping] = useState(false);

  // Referência para o scroll automático no final do chat
  const bottomRef = useRef(null);

  // Controle de animação do botão WhatsApp (pulso)
  const whatsappControls = useAnimation();

  // Scroll automático ao adicionar mensagem
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Animação pulsante do botão WhatsApp
  useEffect(() => {
    whatsappControls.start({
      scale: [1, 1.15, 1],
      boxShadow: [
        "0 0 0px rgba(37, 211, 102, 0.7)",
        "0 0 12px rgba(37, 211, 102, 1)",
        "0 0 0px rgba(37, 211, 102, 0.7)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    });
  }, [whatsappControls]);

  // Respostas rápidas para o usuário clicar e enviar
  const quickReplies = [
    "Quero um orçamento",
    "Sobre os planos",
    "Suporte técnico",
    "Ver produtos",
    "Fale comigo",
    "Redes sociais",
  ];

  // Handler para envio rápido
  const handleQuickReply = (text) => {
    setInputMessage(text);
    handleSendMessage(text);
  };

  // Envio de mensagem pelo usuário
  const handleSendMessage = (msg = null) => {
    const finalMsg = msg ?? inputMessage.trim();
    if (!finalMsg) return;

    const userMessage = {
      id: messages.length + 1,
      text: finalMsg,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    simulateBotResponse(finalMsg);
  };

  // Simulação da resposta do bot (futuro: conectar API)
  const simulateBotResponse = (userInput) => {
    setIsTyping(true);

    setTimeout(() => {
      const input = userInput.toLowerCase();

      // Lógica simples de resposta (expansível)
      let botResponse = 
        "Posso ajudar com planos, orçamento ou suporte. Sobre qual você quer saber mais?";

      if (input.includes("orçamento")) {
        botResponse = 
          "🔍 Para orçamento personalizado, clique aqui e fale com nosso time no WhatsApp.";
        window.open("https://wa.me/5511919167653", "_blank");
      } else if (input.includes("plano") || input.includes("planos")) {
        botResponse = `💡 Temos 3 planos disponíveis:
        
1️⃣ Site Profissional (R$300) - Apresente sua empresa online.
2️⃣ Sistema Sob Medida (Sob Consulta) - Soluções exclusivas para seu negócio.
3️⃣ Suporte Total (R$149/mês) - Manutenção e atendimento prioritário.

👉 Clique abaixo para contratar um plano.`;
      } else if (input.includes("suporte")) {
        botResponse = "📞 Nosso suporte técnico está disponível. Clique aqui para contato.";
        window.open("/contato", "_self");
      } else if (input.includes("produto") || input.includes("mercado livre")) {
        botResponse = "🛒 Confira nossos produtos no Mercado Livre:";
        window.open("https://www.mercadolivre.com.br/perfil/GLVINFORMATICA", "_blank");
      } else if (input.includes("fale comigo")) {
        botResponse = "📲 Redirecionando para o WhatsApp...";
        window.open("https://wa.me/5511919167653", "_blank");
      } else if (input.includes("redes sociais")) {
        botResponse = "🌐 Siga-nos nas redes sociais abaixo:";
      } else {
        botResponse = "🤔 Não entendi. Quer ajuda com planos, orçamento ou suporte?";
      }

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1200);
  };

  // Ação dos botões dos planos
  const handlePlanClick = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: messages.length + 1,
        text,
        isBot: false,
        timestamp: new Date(),
      },
    ]);
    window.open(
      "https://wa.me/5511919167653?text=" + encodeURIComponent(text),
      "_blank"
    );
  };

  // Botões sociais para resposta do bot
  const socialButtons = (
    <div className="flex flex-wrap gap-2 mt-2">
      <a
        href="https://www.instagram.com/glv_informatica/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 border border-pink-500 text-pink-500 px-3 py-1 rounded-full text-xs hover:bg-pink-500 hover:text-white transition"
      >
        <Instagram size={16} /> Instagram
      </a>
      <a
        href="https://www.facebook.com/GLVinformatica/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 border border-blue-600 text-blue-600 px-3 py-1 rounded-full text-xs hover:bg-blue-600 hover:text-white transition"
      >
        <Facebook size={16} /> Facebook
      </a>
      <a
        href="https://www.youtube.com/@GLVInformatica"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 border border-red-600 text-red-600 px-3 py-1 rounded-full text-xs hover:bg-red-600 hover:text-white transition"
      >
        <Youtube size={16} /> YouTube
      </a>
      <a
        href="https://github.com/GLV-informatica"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 border border-gray-500 text-gray-500 px-3 py-1 rounded-full text-xs hover:bg-gray-500 hover:text-white transition"
      >
        <Github size={16} /> GitHub
      </a>
    </div>
  );

  // Mensagem padrão do WhatsApp para o botão fixo
  const whatsappMessage = "Olá, quero saber mais sobre os planos!";

  return (
    <>
      {/* Botões fixos à direita inferior */}
      <div className="fixed right-6 bottom-6 flex flex-col items-center space-y-4 z-40">
        {/* Botão WhatsApp com animação */}
        <motion.a
          href={`https://wa.me/5511919167653?text=${encodeURIComponent(
            whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="w-16 h-16 rounded-full flex items-center justify-center bg-[#25D366]"
          animate={whatsappControls}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          style={{ boxShadow: "0 0 0 rgba(37, 211, 102, 0.7)" }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
            alt="WhatsApp"
            className="w-8 h-8"
          />
        </motion.a>

        {/* Botão Assistente IA */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-blue-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Abrir assistente virtual"
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.button>
      </div>

      {/* Chat da IA */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 w-auto sm:max-w-sm h-[85vh] sm:h-[440px] bg-gradient-to-tr from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl z-50 flex flex-col"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg bg-white">
                  <img
                    src="/img/assistant/bot.png"
                    alt="Assistente GLV"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3
                    id="chat-title"
                    className="text-white font-semibold text-base"
                  >
                    Assistente Commit
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-green-500 text-xs">Online agora</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Fechar assistente virtual"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-900" aria-live="polite">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-line break-words ${
                      message.isBot
                        ? "bg-gray-800 text-gray-200"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {message.text}

                    {/* Botões planos */}
                    {message.text.includes("planos disponíveis") && (
                      <div className="mt-2 space-y-2">
                        <button
                          onClick={() =>
                            handlePlanClick("Quero contratar o plano Site Profissional")
                          }
                          className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs rounded w-full"
                        >
                          Contratar Site Profissional
                        </button>
                        <button
                          onClick={() =>
                            handlePlanClick("Quero contratar um Sistema Sob Medida")
                          }
                          className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs rounded w-full"
                        >
                          Solicitar Sistema Personalizado
                        </button>
                        <button
                          onClick={() =>
                            handlePlanClick("Quero contratar o Suporte Total")
                          }
                          className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs rounded w-full"
                        >
                          Assinar Suporte Total
                        </button>
                      </div>
                    )}

                    {/* Botões redes sociais */}
                    {message.text.includes("Siga-nos nas redes sociais") && socialButtons}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-gray-400 text-xs italic">Digitando...</div>
              )}
              <div ref={bottomRef} />
              {/* Respostas rápidas só no começo, para ajudar */}
              {messages.length === 1 && (
                <div className="space-y-2" aria-label="Respostas rápidas">
                  <p className="text-gray-400 text-xs text-center">Respostas rápidas:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xs p-2 rounded-lg"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input para digitar */}
            <div className="p-3 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Digite sua mensagem"
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Enviar mensagem"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
