import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
  Instagram,
  Facebook,
  Youtube,
  Github,
  MessageCircle,
} from "lucide-react";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Olá! Sou o assistente virtual Commit. Como posso ajudá-lo hoje? 😊",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const quickReplies = [
    "Quero um orçamento",
    "Sobre os planos",
    "Suporte técnico",
    "Ver produtos",
    "Fale comigo",
    "Redes sociais",
  ];

  const handleQuickReply = (text) => {
    setInputMessage(text);
    handleSendMessage(text);
  };

  const handleSendMessage = (msg = null) => {
    const finalMsg = msg || inputMessage.trim();
    if (!finalMsg) return;

    const newMessage = {
      id: messages.length + 1,
      text: finalMsg,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    simulateBotResponse(finalMsg);
  };

  const simulateBotResponse = (userInput) => {
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      let botResponse = "Posso te ajudar com planos, orçamento ou suporte. Qual desses você gostaria de saber mais?";

      if (lowerInput.includes("orçamento")) {
        botResponse = "🔍 Para orçamento personalizado, clique aqui e fale com nosso time no WhatsApp.";
        window.open("https://wa.me/5511919167653", "_blank");
      } else if (lowerInput.includes("plano") || lowerInput.includes("planos")) {
        botResponse = `💡 Temos 3 planos disponíveis:
\n1️⃣ Site Profissional (R$300) - Apresente sua empresa online.\n2️⃣ Sistema Sob Medida (Sob Consulta) - Soluções exclusivas para seu negócio.\n3️⃣ Suporte Total (R$149/mês) - Manutenção e atendimento prioritário.\n\n👉 Clique abaixo para contratar um plano.`;
      } else if (lowerInput.includes("suporte")) {
        botResponse = "📞 Nosso suporte técnico está disponível. Clique aqui para contato.";
        window.open("/contato", "_self");
      } else if (lowerInput.includes("produto")) {
        botResponse = "🛒 Acesse nosso Mercado Livre: https://www.mercadolivre.com.br/perfil/GLVINFORMATICA";
        window.open("https://www.mercadolivre.com.br/perfil/GLVINFORMATICA", "_blank");
      } else if (lowerInput.includes("mercado livre")) {
        botResponse = "🛍️ Veja nossos produtos no Mercado Livre.";
        window.open("https://www.mercadolivre.com.br/perfil/GLVINFORMATICA", "_blank");
      } else if (lowerInput.includes("fale comigo")) {
        botResponse = "📲 Redirecionando para o WhatsApp...";
        window.open("https://wa.me/5511919167653", "_blank");
      } else if (lowerInput.includes("redes sociais")) {
        botResponse = "🌐 Siga-nos nas redes sociais abaixo:";
      } else {
        botResponse = "🤔 Não entendi. Deseja ajuda com planos, orçamento ou suporte?";
      }

      const response = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handlePlanClick = (text) => {
    setMessages((prev) => [
      ...prev,
      {
        id: messages.length + 1,
        text: text,
        isBot: false,
        timestamp: new Date(),
      },
    ]);
    window.open("https://wa.me/5511919167653?text=" + encodeURIComponent(text), "_blank");
  };

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

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-40 bg-blue-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Abrir assistente virtual"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 w-auto sm:max-w-sm h-[85vh] sm:h-[440px] bg-gradient-to-tr from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md border border-gray-700 rounded-3xl shadow-2xl z-50 flex flex-col"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.3 }}
          >
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
                  <h3 className="text-white font-semibold text-base">Assistente Commit</h3>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-green-500 text-xs">Online agora</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                      message.isBot
                        ? "bg-gray-800 text-gray-200"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {message.text}
                    {message.text.includes("planos disponíveis") && (
                      <div className="mt-2 space-y-2">
                        <button
                          onClick={() => handlePlanClick("Quero contratar o plano Site Profissional")}
                          className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs rounded"
                        >
                          Contratar Site Profissional
                        </button>
                        <button
                          onClick={() => handlePlanClick("Quero contratar um Sistema Sob Medida")}
                          className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs rounded"
                        >
                          Solicitar Sistema Personalizado
                        </button>
                        <button
                          onClick={() => handlePlanClick("Quero contratar o Suporte Total")}
                          className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs rounded"
                        >
                          Assinar Suporte Total
                        </button>
                      </div>
                    )}
                    {message.text.includes("Siga-nos nas redes sociais") && socialButtons}
                  </div>
                </motion.div>
              ))}
              {isTyping && <div className="text-gray-400 text-xs italic">Digitando...</div>}
              <div ref={bottomRef} />
              {messages.length === 1 && (
                <div className="space-y-2">
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

            <div className="p-3 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm"
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
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
