import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Send,
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
    "Acessar Mercado Livre",
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

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const simulateBotResponse = (userInput) => {
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      let botResponse = "Posso te ajudar com planos, orçamento ou suporte. Qual desses você gostaria de saber mais?";

      if (lowerInput.includes("orçamento")) {
        botResponse = "🔍 Perfeito! Para um orçamento sob medida, preciso de algumas informações rápidas. Você quer um serviço **personalizado** ou um dos nossos planos prontos?";
      } else if (lowerInput.includes("plano") || lowerInput.includes("planos")) {
        botResponse = "💡 Temos 3 planos incríveis que cabem no seu bolso:\n\n• **Essencial (R$99)** – ideal para começar com o pé direito.\n• **Profissional (R$199)** – nosso mais vendido.\n• **Empresarial (R$399)** – completo para escalar sua operação.\n\n👉 Veja todos os detalhes clicando aqui!";
        setTimeout(() => navigateTo("/planos"), 3000);
      } else if (lowerInput.includes("suporte")) {
        botResponse = "📞 Nosso time de especialistas está a postos para resolver qualquer dúvida. Clique aqui e fale direto com o suporte técnico.";
        setTimeout(() => navigateTo("/contato"), 3000);
      } else if (lowerInput.includes("produto")) {
        botResponse = "🛒 Estamos com **ofertas exclusivas** no Mercado Livre! Acesse agora antes que acabem!";
        window.open("https://www.mercadolivre.com.br/perfil/GLVINFORMATICA", "_blank");
      } else if (lowerInput.includes("mercado livre")) {
        botResponse = "🔗 Aqui está o link direto para nossa loja no Mercado Livre. Temos entrega rápida e ótimos preços!";
        window.open("https://www.mercadolivre.com.br/perfil/GLVINFORMATICA", "_blank");
      } else if (lowerInput.includes("fale comigo")) {
        botResponse = "📲 Ótimo! Estou te levando direto para o WhatsApp agora mesmo. Vamos conversar?";
        window.open("https://wa.me/5511919167653", "_blank");
      } else if (lowerInput.includes("personalizado")) {
        botResponse = "🎯 Perfeito! Um atendimento personalizado garante que você invista certo. Vou te redirecionar para nosso time comercial.";
        window.open("https://wa.me/5511919167653", "_blank");
      } else {
        botResponse = "🤔 Não entendi exatamente... Mas posso te mostrar nossos planos, produtos, ou colocar você em contato com um especialista. O que prefere?";
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

  return (
    <>
      {/* Botão flutuante */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-40"
        style={{ backgroundColor: "#3B82F6" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 10px rgba(59, 130, 246, 0.7)",
            "0 0 20px rgba(59, 130, 246, 0.9)",
            "0 0 10px rgba(59, 130, 246, 0.7)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Abrir assistente virtual"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.button>

      {/* Modal */}
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
            {/* Cabeçalho */}
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
                  <h3 id="chat-title" className="text-white font-semibold text-base">
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
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar assistente virtual"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mensagens */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl ${
                      message.isBot
                        ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-200 shadow-md"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg"
                    }`}
                  >
                    <p className="text-sm break-words whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="text-gray-400 text-xs italic">Digitando...</div>
              )}

              <div ref={bottomRef} />

              {messages.length === 1 && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <p className="text-gray-400 text-xs text-center font-medium">
                    Respostas rápidas:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply) => (
                      <motion.button
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xs font-medium p-2 rounded-lg transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        aria-label={`Resposta rápida: ${reply}`}
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-700">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  aria-label="Campo de mensagem"
                  autoComplete="off"
                  autoFocus
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  className="w-10 h-10 bg-[#3B82F6] rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
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