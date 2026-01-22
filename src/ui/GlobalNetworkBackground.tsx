import React, { useEffect, useRef } from "react";

interface DataNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const GlobalNetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<DataNode[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Definir tamanho do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Inicializar nós de dados (hubs de datacenter distribuídos globalmente)
    const initializeNodes = () => {
      const nodes: DataNode[] = [];
      // São Paulo - Hub principal Brasil
      nodes.push({ x: canvas.width * 0.35, y: canvas.height * 0.65, vx: 0.3, vy: -0.2, size: 6 });
      // Miami - Hub USA
      nodes.push({ x: canvas.width * 0.25, y: canvas.height * 0.35, vx: -0.2, vy: 0.3, size: 5 });
      // Londres - Hub Europa
      nodes.push({ x: canvas.width * 0.5, y: canvas.height * 0.25, vx: 0.2, vy: -0.1, size: 5.5 });
      // Frankfurt - Hub Europa Central
      nodes.push({ x: canvas.width * 0.52, y: canvas.height * 0.3, vx: -0.1, vy: 0.2, size: 5 });
      // Singapura - Hub Ásia
      nodes.push({ x: canvas.width * 0.75, y: canvas.height * 0.6, vx: -0.3, vy: 0.1, size: 5.5 });
      // Tóquio - Hub Ásia
      nodes.push({ x: canvas.width * 0.8, y: canvas.height * 0.35, vx: 0.1, vy: -0.2, size: 5 });
      // Sydney - Hub Oceania
      nodes.push({ x: canvas.width * 0.85, y: canvas.height * 0.75, vx: -0.2, vy: 0.1, size: 4.5 });
      // Toronto - Hub América do Norte
      nodes.push({ x: canvas.width * 0.2, y: canvas.height * 0.25, vx: 0.2, vy: 0.1, size: 4.5 });
      // Dubai - Hub Oriente Médio
      nodes.push({ x: canvas.width * 0.6, y: canvas.height * 0.5, vx: -0.1, vy: -0.1, size: 4 });

      nodesRef.current = nodes;
    };

    initializeNodes();

    // Desenhar mapa de pontos discretos (world dots)
    const drawWorldDots = () => {
      const dotSize = 1.5;
      const dotColor = "rgba(100, 150, 200, 0.15)";

      // Criar padrão de pontos simulando continentes
      for (let x = 0; x < canvas.width; x += 40) {
        for (let y = 0; y < canvas.height; y += 40) {
          // Padrão aleatório para parecer continentes
          if (Math.random() > 0.4) {
            ctx.fillStyle = dotColor;
            ctx.beginPath();
            ctx.arc(x + Math.random() * 20, y + Math.random() * 20, dotSize, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    // Desenhar linhas de conexão entre nós (fluxo de dados)
    const drawConnections = () => {
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Conectar apenas nós próximos
          if (distance < 400) {
            const opacity = (1 - distance / 400) * 0.3;

            // Gradiente para linha
            const gradient = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            gradient.addColorStop(0, `rgba(255, 140, 50, ${opacity * 0.8})`);
            gradient.addColorStop(0.5, `rgba(255, 160, 80, ${opacity})`);
            gradient.addColorStop(1, `rgba(255, 100, 30, ${opacity * 0.6})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // Desenhar curva suave (bezier)
            const cpx = (nodes[i].x + nodes[j].x) / 2 + (Math.random() - 0.5) * 50;
            const cpy = (nodes[i].y + nodes[j].y) / 2 + (Math.random() - 0.5) * 50;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.quadraticCurveTo(cpx, cpy, nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Desenhar nós com glow neon
    const drawNodes = (time: number) => {
      const nodes = nodesRef.current;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Atualizar posição com movimento suave
        node.x += node.vx;
        node.y += node.vy;

        // Bounce nas bordas
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Limitar movimento dentro de tela
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Glow effect (pulsante)
        const glowIntensity = 0.5 + Math.sin(time * 0.003 + i) * 0.5;

        // Glow externo
        const glowGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size * 8);
        glowGradient.addColorStop(0, `rgba(255, 150, 50, ${0.4 * glowIntensity})`);
        glowGradient.addColorStop(0.5, `rgba(255, 120, 30, ${0.2 * glowIntensity})`);
        glowGradient.addColorStop(1, `rgba(255, 100, 0, 0)`);

        ctx.fillStyle = glowGradient;
        ctx.fillRect(node.x - node.size * 8, node.y - node.size * 8, node.size * 16, node.size * 16);

        // Núcleo do nó
        const coreGradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.size);
        coreGradient.addColorStop(0, `rgba(255, 200, 100, 1)`);
        coreGradient.addColorStop(0.7, `rgba(255, 150, 50, ${0.8 * glowIntensity})`);
        coreGradient.addColorStop(1, `rgba(255, 100, 30, 0.3)`);

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Anel oscilante
        ctx.strokeStyle = `rgba(255, 160, 80, ${0.3 * glowIntensity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 2 + Math.sin(time * 0.005 + i) * 3, 0, Math.PI * 2);
        ctx.stroke();
      }
    };

    // Loop de animação
    const animate = (time: number) => {
      // Fundo transparente (deixar conteúdo trasparente para fundo branco/escuro)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Desenhar elementos
      drawWorldDots();
      drawConnections();
      drawNodes(time);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ mixBlendMode: "lighten" }}
      aria-hidden="true"
    />
  );
};

export default GlobalNetworkBackground;
