import React, { RefObject } from "react";
import { motion, AnimatePresence, AnimationControls } from "framer-motion";
import {
  Sparkles, X, Send, Instagram, Facebook, Youtube, Github,
} from "lucide-react";
import { FloatingDots } from "../../components/effects/FloatingDots";

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
            className="fixed bottom-20 right-3 left-3 sm:left-auto sm:bottom-24 sm:right-5 sm:max-w-sm h-[85vh] sm:h-[480px]
              bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950
              backdrop-blur-md border border-cyan-500/20
              rounded-2xl sm:rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {/* Cabeçalho com gradiente */}
            <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border-b border-cyan-500/20">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <motion.div 
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full overflow-hidden shadow-lg bg-gradient-to-br from-cyan-500 to-blue-500"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <img src="/img/assistant/bot.png" alt="Assistente GLV" className="w-full h-full object-cover" />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold text-sm sm:text-base">GLV Assistant</h3>
                  <div className="flex items-center space-x-1.5">
                    <motion.span 
                      className="w-2 h-2 bg-emerald-500 rounded-full" 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-emerald-400 text-xs">Online</p>
                  </div>
                </div>
              </div>
              <motion.button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Área de mensagens */}
            <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-cyan-500/50 scrollbar-track-transparent">
              {messages.map((message, idx) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  initial={{ opacity: 0, x: message.isBot ? -10 : 10, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <div className={`max-w-[80%] p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-xs sm:text-sm whitespace-pre-wrap break-words ${
                    message.isBot 
                      ? "bg-slate-700/50 text-gray-100 border border-cyan-500/30" 
                      : "bg-blue-600 text-white rounded-bl-none"
                  }`}>
                    {message.text}
                    {message.isBot && message.actionButton && (
                      <motion.div 
                        className="mt-2"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <button
                          onClick={() => handleActionClick(message.actionButton!.url)}
                          className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white px-2.5 sm:px-3 py-1 text-xs rounded-full font-medium transition-all hover:shadow-lg hover:shadow-emerald-500/50"
                        >
                          {message.actionButton!.label}
                        </button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                  className="text-gray-400 text-xs italic flex items-center space-x-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span>Digitando</span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity }}>•</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}>•</motion.span>
                  <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}>•</motion.span>
                </motion.div>
              )}
              <div ref={bottomRef} />
              {messages.length === 1 && (
                <motion.div 
                  className="space-y-2 mt-4" 
                  aria-label="Respostas rápidas"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-gray-500 text-xs text-center">Clique ou digite:</p>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {quickReplies.map((reply) => (
                      <motion.button 
                        key={reply} 
                        onClick={() => handleQuickReply(reply)} 
                        className="bg-slate-700/50 hover:bg-cyan-600/40 border border-cyan-500/30 hover:border-cyan-500/60 text-white text-xs p-2 sm:p-2.5 rounded-lg font-medium transition-all"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Área de input */}
            <div className="p-2 sm:p-3 border-t border-cyan-500/20 bg-slate-900/50">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Sua mensagem..."
                  className="flex-1 bg-slate-700/50 border border-cyan-500/20 rounded-full px-3 sm:px-4 py-2 text-white text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                />
                <motion.button 
                  onClick={() => handleSendMessage()} 
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-blue-500/50 transition-shadow"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
