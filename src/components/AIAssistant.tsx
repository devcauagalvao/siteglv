import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, BrainCircuit, Sparkles, X, Send, Bot } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou o assistente virtual da GLV. Como posso ajudá-lo hoje? 😊',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickReplies = [
    'Quero um orçamento',
    'Sobre os planos',
    'Suporte técnico',
    'Ver produtos',
    'Fale comigo',
    'Acessar Mercado Livre',
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
    simulateBotResponse(inputMessage);
  };

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const simulateBotResponse = (userInput) => {
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = userInput.toLowerCase();
      let botResponse =
        'Não entendi exatamente, mas posso te ajudar com orçamento, planos, suporte ou produtos!';

      if (lowerInput.includes('orçamento')) {
        botResponse = 'Claro! Redirecionando você para a página de contato...';
        navigateTo('/contato');
      } else if (lowerInput.includes('planos')) {
        botResponse =
          'Temos 3 planos: Essencial (R$99), Profissional (R$199) e Empresarial (R$399). Veja mais em nossa seção de planos!';
        navigateTo('/src/components/');
      } else if (lowerInput.includes('suporte')) {
        botResponse =
          'Nosso suporte está sempre disponível! Te levo agora para a seção de ajuda.';
        navigateTo('/src/components/Contact.tsx');
      } else if (lowerInput.includes('produtos')) {
        botResponse =
          'Confira nossos produtos incríveis em nossa loja do Mercado Livre!';
        window.open('https://www.mercadolivre.com.br/perfil/GLVINFORMATICA', '_blank');
      } else if (lowerInput.includes('mercado livre')) {
        botResponse = 'Claro! Aqui está o link direto para nossa loja no Mercado Livre.';
        window.open('https://www.mercadolivre.com.br/perfil/GLVINFORMATICA', '_blank');
      } else if (lowerInput.includes('fale comigo')) {
        botResponse = 'Nosso time está disponível para conversar! Vou abrir o WhatsApp para você.';
        window.open('https://wa.me/5511919167653', '_blank');
      }

      const response = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, response]);
    }, 1200);
  };

  const handleQuickReply = (reply) => {
    const newMessage = {
      id: messages.length + 1,
      text: reply,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    simulateBotResponse(reply);
  };

  return (
    <>
      {/* Botão flutuante para abrir o chat */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-40"
        style={{ backgroundColor: '#3B82F6' }} // azul mais vibrante
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            '0 0 10px rgba(59, 130, 246, 0.7)',
            '0 0 20px rgba(59, 130, 246, 0.9)',
            '0 0 10px rgba(59, 130, 246, 0.7)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Abrir assistente virtual"
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.button>

      {/* Janela do chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[520px] bg-gradient-to-tr from-gray-900/90 via-black/80 to-gray-900/90 backdrop-blur-md border border-gray-700 rounded-3xl shadow-xl z-50 flex flex-col"
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 id="chat-title" className="text-white font-semibold text-lg">
                    Assistente GLV
                  </h3>
                  <p className="text-gray-400 text-sm">Online agora</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Fechar assistente virtual"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Corpo do chat */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-gray-900">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <div
                    className={`max-w-[75%] p-4 rounded-2xl ${
                      message.isBot
                        ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-200 shadow-md'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    }`}
                  >
                    <p className="text-sm break-words">{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="text-gray-400 text-xs italic">Digitando...</div>
              )}
              <div ref={bottomRef} />
              {messages.length === 1 && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <p className="text-gray-400 text-xs text-center font-medium">
                    Respostas rápidas:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
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
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  aria-label="Campo de mensagem"
                  autoComplete="off"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
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
