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
    "💻 Quero personalizar",
    "💰 Solicitar orçamento",
    "📦 Ver portfólio",
    "❓ Dúvidas",
    "📱 WhatsApp",
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
    const delay = 600 + Math.random() * 700;
    setTimeout(() => {
      const input = userInput.toLowerCase();
      let botResponse =
        "👋 Olá! Sou o assistente da GLV Tecnologia. Posso ajudar com informações sobre nossos serviços: softwares com IA, servidores cloud, sites profissionais e muito mais! O que você gostaria de saber?";
      let actionButton;
      const WHATSAPP_BASE = "https://wa.me/5511919167653";

      if (/(orçamento|cotação|preço|valor|custa|quanto)/i.test(input)) {
        botResponse =
          "💰 Ótimo! Podemos montar um orçamento totalmente personalizado de acordo com suas necessidades. Fale com nosso time no WhatsApp para detalhes!";
        actionButton = {
          label: "📲 Solicitar Orçamento",
          url: `${WHATSAPP_BASE}?text=${encodeURIComponent(
            "Olá! Gostaria de solicitar um orçamento para uma solução personalizada."
          )}`,
        };
      } else if (/(personalizar|personalização|customiz|customizado|feito sob medida)/i.test(input)) {
        botResponse =
          "✨ Perfeito! A GLV é especialista em soluções personalizadas. Desenvolvemos: Sites, ERPs, PWAs, e-commerce, plataformas sob medida e softwares com IA. Vamos conversar sobre seu projeto?";
        actionButton = {
          label: "💻 Detalhar Projeto",
          url: `${WHATSAPP_BASE}?text=${encodeURIComponent(
            "Olá! Quero conhecer mais sobre desenvolvimento personalizado com a GLV."
          )}`,
        };
      } else if (/(software|app|aplicativo|sistema|plataforma)/i.test(input)) {
        botResponse =
          "🚀 Desenvolvemos softwares inteligentes com IA integrada, ERPs customizáveis, PWAs, e plataformas escaláveis. Qual tipo de solução você precisa?";
        actionButton = {
          label: "🔍 Ver Portfólio",
          url: "/#portfolio",
        };
      } else if (/(nuvem|cloud|servidor|hospedagem|infra)/i.test(input)) {
        botResponse =
          "☁️ A GLV oferece soluções de infraestrutura cloud escalável, servidores confiáveis e escalabilidade sob demanda. Ideal para aplicações de alto tráfego!";
        actionButton = {
          label: "📞 Falar com Especialista",
          url: `${WHATSAPP_BASE}?text=${encodeURIComponent(
            "Olá! Quero saber mais sobre infraestrutura cloud e servidores da GLV."
          )}`,
        };
      } else if (/(ia|inteligência artificial|machine learning|IA aplicada)/i.test(input)) {
        botResponse =
          "🤖 Desenvolvemos soluções com IA aplicada para automação, análise de dados, chatbots inteligentes e muito mais. Transforme seu negócio com tecnologia!";
        actionButton = {
          label: "💡 Conhecer Soluções com IA",
          url: `${WHATSAPP_BASE}?text=${encodeURIComponent(
            "Olá! Tenho interesse em soluções com IA aplicada. Qual é a melhor opção para meu negócio?"
          )}`,
        };
      } else if (/(site|landing page|página|web|website)/i.test(input)) {
        botResponse =
          "🌐 Criamos sites profissionais, landing pages de conversão e plataformas web completas. Design moderno + performance = resultados!";
        actionButton = {
          label: "🎨 Ver Projetos Web",
          url: "/#portfolio",
        };
      } else if (/(suporte|ajuda|problema|erro|bug|não funciona)/i.test(input)) {
        botResponse =
          "🛠️ Para suporte técnico, nossa equipe está pronta para ajudar 24/7. Abra um chamado via WhatsApp ou envie para nosso email de suporte.";
        actionButton = {
          label: "📧 Contato de Suporte",
          url: "/contato",
        };
      } else if (/(portfólio|portfolio|cases|projetos|exemplos)/i.test(input)) {
        botResponse =
          "📋 Confira nossos cases e projetos realizados! Temos portfólio diverso em múltiplos setores e tecnologias.";
        actionButton = {
          label: "👀 Ver Portfólio",
          url: "/#portfolio",
        };
      } else if (/(plano|planos|pacote|serviço|serviços)/i.test(input)) {
        botResponse =
          "📦 Oferecemos diversos planos e pacotes personalizados: Desenvolvimento Web, Mobile, Cloud, IA, Suporte Técnico e Consultoria.";
        actionButton = {
          label: "💼 Ver Planos",
          url: "/#plans",
        };
      } else if (/(mercado livre|mercadolivre|ml|marketplace)/i.test(input)) {
        botResponse =
          "🛍️ Sim! Também estamos no Mercado Livre com várias soluções disponíveis. Confira lá!";
        actionButton = {
          label: "🏪 Mercado Livre",
          url: "https://www.mercadolivre.com.br/perfil/GLVINFORMATICA",
        };
      } else if (/(whats|whatsapp|contato direto|fale comigo)/i.test(input)) {
        botResponse =
          "📲 Vou abrir uma conversa com a GLV no WhatsApp! Nossa equipe responde rápido. Bem-vindo! 🎉";
        actionButton = {
          label: "💬 WhatsApp da GLV",
          url: `${WHATSAPP_BASE}?text=${encodeURIComponent(
            "Olá! Descobri a GLV e gostaria de conhecer os serviços."
          )}`,
        };
      } else if (/(rede(s)? social(is)?|instagram|facebook|linkedin|youtube|tiktok)/i.test(input)) {
        botResponse =
          "🌟 Siga a GLV nas redes sociais para ficar atualizado com dicas, cases e novidades do mundo tech!";
        actionButton = {
          label: "📱 Nossas Redes",
          url: "/#footer",
        };
      } else if (/(quem é a glv|sobre a glv|informações|empresa|quem somos)/i.test(input)) {
        botResponse =
          "🏢 A GLV Tecnologia é uma empresa especializada em desenvolvimento de software, infraestrutura cloud e soluções tecnológicas personalizadas para empresas de todos os tamanhos.";
        actionButton = {
          label: "📖 Sobre Nós",
          url: "/#about",
        };
      }

      const botMessage: Message = {
        id: createId(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
        actionButton,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMessage]);
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
