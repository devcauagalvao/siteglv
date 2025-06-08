import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle,  BrainCircuit , Sparkles, X, Send, Bot } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou o assistente virtual da GLV. Como posso ajudá-lo hoje? 😊',
      isBot: true,
      timestamp: new Date()
    }
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
    'Acessar Mercado Livre'
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
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
      let botResponse = 'Não entendi exatamente, mas posso te ajudar com orçamento, planos, suporte ou produtos!';

      if (lowerInput.includes('orçamento')) {
        botResponse = 'Claro! Redirecionando você para a página de contato...';
        navigateTo('/contato');
      } else if (lowerInput.includes('planos')) {
        botResponse = 'Temos 3 planos: Essencial (R$99), Profissional (R$199) e Empresarial (R$399). Veja mais em nossa seção de planos!';
        navigateTo('/src/components/');
      } else if (lowerInput.includes('suporte')) {
        botResponse = 'Nosso suporte está sempre disponível! Te levo agora para a seção de ajuda.';
        navigateTo('/src//components/Contact.tsx');
      } else if (lowerInput.includes('produtos')) {
        botResponse = 'Confira nossos produtos incríveis em nossa loja do Mercado Livre!';
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
        timestamp: new Date()
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    const newMessage = {
      id: messages.length + 1,
      text: reply,
      isBot: false,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, newMessage]);
    simulateBotResponse(reply);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
      className="fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center shadow-glow-lg z-40" style={{ backgroundColor: '#60A5FA' }}

        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: [
            "0 0 20px rgba(65, 105, 225, 0.4)",
            "0 0 40px rgba(65, 105, 225, 0.6)",
            "0 0 20px rgba(65, 105, 225, 0.4)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Sparkles className="w-8 h-8 text-white" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-glass-white backdrop-blur-glass border border-white/10 rounded-3xl shadow-glow z-50 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-cyber rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Assistente GLV</h3>
                  <p className="text-white/60 text-sm">Online agora</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.isBot ? 'bg-white/10 text-white' : 'bg-gradient-cyber text-white'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-white/60 text-xs">Digitando...</div>
              )}
              <div ref={bottomRef} />
              {messages.length === 1 && (
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <p className="text-white/60 text-xs text-center">Respostas rápidas:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickReplies.map((reply) => (
                      <motion.button
                        key={reply}
                        onClick={() => handleQuickReply(reply)}
                        className="bg-white/5 border border-white/20 text-white text-xs p-2 rounded-lg hover:bg-white/10 transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {reply}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-white/5 border border-white/20 rounded-full px-4 py-2 text-white text-sm placeholder-white/50 focus:outline-none focus:border-royal-blue"
                />
                <motion.button
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-gradient-cyber rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 text-white" />
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
