import React, { useState, useEffect, useRef } from "react";
import { useAnimation } from "framer-motion";
import { AIAssistantUI } from "./AIAssistantUI";

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

  const simulateBotResponse = (userInput: string) => {
    setIsTyping(true);

    setTimeout(() => {
      const input = userInput.toLowerCase();
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