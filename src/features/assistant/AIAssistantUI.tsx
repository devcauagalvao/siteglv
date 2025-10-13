import React, { RefObject } from "react";
import { motion, AnimatePresence, AnimationControls } from "framer-motion";
import {
  Sparkles, X, Send, Instagram, Facebook, Youtube, Github,
} from "lucide-react";
import { FloatingDots } from "../../components/FloatingDots";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  actionButton?: { label: string; url: string };
}

interface Props {
  isOpen: boolean;
  messages: Message[];
  inputMessage: string;
  isTyping: boolean;
  bottomRef: RefObject<HTMLDivElement>;
  quickReplies: string[];
  setIsOpen: (val: boolean) => void;
  setInputMessage: (val: string) => void;
  handleSendMessage: (msg?: string) => void;
  handleQuickReply: (text: string) => void;
  handlePlanClick: (text: string) => void;
  whatsappControls: AnimationControls;
}

export const AIAssistantUI: React.FC<Props> = ({
  isOpen, messages, inputMessage, isTyping, bottomRef,
  quickReplies, setIsOpen, setInputMessage,
  handleSendMessage, handleQuickReply,
  handlePlanClick, whatsappControls,
}) => {
  const socialButtons = (
    <div className="flex flex-wrap gap-2 mt-2">
      <a href="https://www.instagram.com/glv_informatica/" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 border border-pink-500 text-pink-500 px-3 py-1 rounded-full text-xs hover:bg-pink-500 hover:text-white transition">
        <Instagram size={16} /> Instagram
      </a>
      <a href="https://www.facebook.com/GLVinformatica/" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 border border-blue-600 text-blue-600 px-3 py-1 rounded-full text-xs hover:bg-blue-600 hover:text-white transition">
        <Facebook size={16} /> Facebook
      </a>
      <a href="https://www.youtube.com/@GLVInformatica" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 border border-red-600 text-red-600 px-3 py-1 rounded-full text-xs hover:bg-red-600 hover:text-white transition">
        <Youtube size={16} /> YouTube
      </a>
      <a href="https://github.com/GLV-informatica" target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-2 border border-gray-500 text-gray-500 px-3 py-1 rounded-full text-xs hover:bg-gray-500 hover:text-white transition">
        <Github size={16} /> GitHub
      </a>
    </div>
  );

  const handleActionClick = (url: string) => {
    if (/^https?:\/\//i.test(url)) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  return (
    <>

      <FloatingDots setIsOpen={setIsOpen} whatsappControls={whatsappControls} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 left-4 sm:left-auto sm:right-6 w-auto sm:max-w-sm h-[85vh] sm:h-[440px]
              bg-gradient-to-br from-white/10 via-white/5 to-white/10
              backdrop-blur-xl border border-white/10
              rounded-3xl ring-1 ring-white/10 z-50 flex flex-col transition-all duration-300"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg bg-black">
                  <img src="/img/assistant/bot.png" alt="Assistente GLV" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base">Assistente Commit</h3>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-green-500 text-xs">Online agora</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white" aria-label="Fechar">
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
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-line break-words ${message.isBot ? "bg-gray-800 text-gray-200" : "bg-blue-600 text-white"}`}>
                    {message.text}
                    {message.isBot && message.actionButton && (
                      <div className="mt-2">
                        <button
                          onClick={() => handleActionClick(message.actionButton!.url)}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 text-xs rounded-full"
                        >
                          {message.actionButton!.label}
                        </button>
                      </div>
                    )}
                    {message.text.includes("planos disponíveis") && (
                      <div className="mt-2 space-y-2">
                        <button onClick={() => handlePlanClick("Quero contratar o plano Site Profissional")} className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs rounded w-full">Contratar Site Profissional</button>
                        <button onClick={() => handlePlanClick("Quero contratar um Sistema Sob Medida")} className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs rounded w-full">Solicitar Sistema Personalizado</button>
                        <button onClick={() => handlePlanClick("Quero contratar o Suporte Total")} className="bg-white/10 hover:bg-white/20 px-3 py-1 text-xs rounded w-full">Assinar Suporte Total</button>
                      </div>
                    )}
                    {message.text.includes("Siga-nos nas redes sociais") && socialButtons}
                  </div>
                </motion.div>
              ))}
              {isTyping && <div className="text-gray-400 text-xs italic">Digitando...</div>}
              <div ref={bottomRef} />
              {messages.length === 1 && (
                <div className="space-y-2" aria-label="Respostas rápidas">
                  <p className="text-gray-400 text-xs text-center">Respostas rápidas:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply) => (
                      <button key={reply} onClick={() => handleQuickReply(reply)} className="bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-xs p-2 rounded-lg">
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
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <motion.button onClick={() => handleSendMessage()} className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center" whileHover={{ scale: 1.1 }}>
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
