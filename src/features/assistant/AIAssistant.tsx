import React, { useState, useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import { AIAssistantUI } from "./AIAssistantUI";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  actionButton?: { label: string; url: string };
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Olá! Sou o assistente virtual Commit. Como posso ajudá-lo hoje? 😊",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const whatsappControls = useAnimation();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  const quickReplies = [
    "Quero um orçamento",
    "Sobre os planos",
    "Suporte técnico",
    "Ver produtos",
    "Fale comigo",
    "Redes sociais",
  ];

  const handleQuickReply = (text: string) => {
    setInputMessage(text);
    handleSendMessage(text);
  };

  const handleSendMessage = (msg: string | null = null) => {
    const finalMsg = msg ?? inputMessage.trim();
    if (!finalMsg) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: finalMsg,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    simulateBotResponse(finalMsg);
  };

  const simulateBotResponse = (userInput: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const input = userInput.toLowerCase();

      // Respostas inteligentes
      let botResponse = "🤔 Não entendi. Quer ajuda com planos, orçamento ou suporte?";
      let actionButton;

      if (/(orçamento|preço|cotação)/i.test(input)) {
        botResponse =
          "🔍 Para orçamento personalizado, clique no botão abaixo e fale com nosso time no WhatsApp.";
        actionButton = { label: "Falar no WhatsApp", url: "https://wa.me/5511919167653" };
      } else if (/(plano|planos)/i.test(input)) {
        botResponse = `💡 Temos 3 planos disponíveis:
1️⃣ Site Profissional (R$300) - Apresente sua empresa online.
2️⃣ Sistema Sob Medida (Sob Consulta) - Soluções exclusivas para seu negócio.
3️⃣ Suporte Total (R$149/mês) - Manutenção e atendimento prioritário.`;
      } else if (/(suporte|ajuda técnica)/i.test(input)) {
        botResponse = "📞 Nosso suporte técnico está disponível. Clique abaixo para contato.";
        actionButton = { label: "Ir para Contato", url: "/contato" };
      } else if (/(produto|mercado livre)/i.test(input)) {
        botResponse = "🛒 Confira nossos produtos no Mercado Livre:";
        actionButton = { label: "Ver Produtos", url: "https://www.mercadolivre.com.br/perfil/GLVINFORMATICA" };
      } else if (/(fale comigo|contato)/i.test(input)) {
        botResponse = "📲 Redirecionando para o WhatsApp...";
        actionButton = { label: "WhatsApp", url: "https://wa.me/5511919167653" };
      } else if (/(rede(s)? sociais)/i.test(input)) {
        botResponse = "🌐 Siga-nos nas redes sociais abaixo:";
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
        actionButton,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1000 + Math.random() * 800); // tempo de resposta mais humano
  };

  const handlePlanClick = (text: string) => {
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

  return (
    <AIAssistantUI
      isOpen={isOpen}
      messages={messages}
      inputMessage={inputMessage}
      isTyping={isTyping}
      bottomRef={bottomRef}
      quickReplies={quickReplies}
      setIsOpen={setIsOpen}
      setInputMessage={setInputMessage}
      handleSendMessage={handleSendMessage}
      handleQuickReply={handleQuickReply}
      handlePlanClick={handlePlanClick}
      whatsappControls={whatsappControls}
    />
  );
};

export default AIAssistant;
