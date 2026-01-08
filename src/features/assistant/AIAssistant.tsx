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

const STORAGE_KEY = "glv_ai_assistant_messages_v1";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw) as Message[];
    } catch (e) {
      // ignore
    }
    return [
      {
        id: Date.now(),
        text:
          "Olá! Sou o assistente virtual da GLV Tecnologia. Posso ajudar a personalizar Sites, ERPs, PWAs, Sites/Landing Pages e Plataformas sob medida. Como posso ajudar hoje? 😊",
        isBot: true,
        timestamp: new Date(),
      },
    ];
  });
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const whatsappControls = useAnimation();

  // salva mensagens sempre que mudam
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      // ignore
    }
  }, [messages]);

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
    "Quero personalizar",
    "Solicitar orçamento",
    "Ver produtos",
    "Suporte técnico",
    "Fale no WhatsApp",
    "Redes sociais",
  ];

  const handleQuickReply = (text: string) => {
    setInputMessage(text);
    handleSendMessage(text);
  };

  const createId = () => Date.now() + Math.floor(Math.random() * 1000);

  const handleSendMessage = (msg: string | null = null) => {
    const finalMsg = msg ?? inputMessage.trim();
    if (!finalMsg) return;

    const userMessage: Message = {
      id: createId(),
      text: finalMsg,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const next = [...prev, userMessage];
      return next;
    });
    setInputMessage("");
    simulateBotResponse(finalMsg);
  };

  const openUrl = (url: string) => {
    try {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      // fallback
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const simulateBotResponse = (userInput: string) => {
    setIsTyping(true);
    const delay = 700 + Math.random() * 800;
    setTimeout(() => {
      const input = userInput.toLowerCase();
      let botResponse =
        "🤖 Não consegui identificar exatamente. Posso abrir o WhatsApp da GLV para conversarmos sobre personalização, orçamento ou suporte.";
      let actionButton;
      const WHATSAPP_BASE = "https://wa.me/5511919167653";

      if (/(orçamento|cotação|preço|valor)/i.test(input)) {
        botResponse =
          "🔍 Podemos montar um orçamento personalizado. Clique para abrir o WhatsApp da GLV.";
        actionButton = {
          label: "Falar no WhatsApp",
          url: `${WHATSAPP_BASE}?text=${encodeURIComponent(
            "Olá! Gostaria de solicitar um orçamento personalizado."
          )}`,
        };
      } else if (/(personalizar|personalização|quero personalizar)/i.test(input)) {
        botResponse =
          "✏️ Perfeito — podemos personalizar totalmente a solução. Vamos detalhar pelo WhatsApp?";
        actionButton = {
          label: "Personalizar no WhatsApp",
          url: `${WHATSAPP_BASE}?text=${encodeURIComponent(
            "Olá! Quero personalizar uma solução com a GLV. Vamos conversar sobre requisitos e orçamento?"
          )}`,
        };
      } else if (/(plano|planos|serviço)/i.test(input)) {
        botResponse =
          "💡 Oferecemos: Cardápio digital, ERP customizável, PWAs, Sites/Landing Pages e projetos sob medida. Quer ver exemplos ou orçamento?";
        actionButton = { label: "Ver produtos", url: "/#store" };
      } else if (/(suporte|ajuda técnica|erro)/i.test(input)) {
        botResponse =
          "📞 Para suporte técnico, abra um atendimento pelo WhatsApp ou acesse a página de contato.";
        actionButton = { label: "Contato", url: "/contato" };
      } else if (/(produto|produtos|catálogo|ver produtos)/i.test(input)) {
        botResponse = "🛒 Veja nosso catálogo de soluções abaixo:";
        actionButton = { label: "Ir ao Catálogo", url: "/#store" };
      } else if (/(mercado livre|mercadolivre|ml)/i.test(input)) {
        botResponse = "🛍️ Também temos presença no Mercado Livre:";
        actionButton = {
          label: "Mercado Livre",
          url: "https://www.mercadolivre.com.br/perfil/GLVINFORMATICA",
        };
      } else if (/(whats|whatsapp|fale comigo|fale no whatsapp)/i.test(input)) {
        botResponse = "📲 Abrindo conversa no WhatsApp da GLV...";
        actionButton = {
          label: "Conversar no WhatsApp",
          url: `${WHATSAPP_BASE}?text=${encodeURIComponent(
            "Olá! Gostaria de conversar com a GLV sobre personalização de solução."
          )}`,
        };
      } else if (/(rede(s)? social(is)?|instagram|facebook|linkedin)/i.test(input)) {
        botResponse = "🌐 Siga a GLV nas redes sociais:";
        actionButton = { label: "Redes sociais", url: "/#footer" };
      }

      const botMessage: Message = {
        id: createId(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
        actionButton,
      };

      setIsTyping(false);
      setMessages((prev) => {
        const next = [...prev, botMessage];
        // se houver actionButton e for whatsapp, não abrir automaticamente; a UI deve expor botão.
        return next;
      });
    }, delay);
  };

  const handlePlanClick = (text: string) => {
    const msg: Message = {
      id: createId(),
      text,
      isBot: false,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    const url = `https://wa.me/5511919167653?text=${encodeURIComponent(text)}`;
    openUrl(url);
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
