import React, { useEffect, useRef } from "react";

interface DataNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

const WorldMapBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<DataNode[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Redimensionar canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Inicializar nós de datacenter globais
    const initializeNodes = () => {
      const nodes: DataNode[] = [];
      // Datacenters com posições relativas
      const datacenters = [
        { x: canvas.width * 0.35, y: canvas.height * 0.65 }, // São Paulo
        { x: canvas.width * 0.25, y: canvas.height * 0.35 }, // Miami
        { x: canvas.width * 0.5, y: canvas.height * 0.25 }, // Londres
        { x: canvas.width * 0.52, y: canvas.height * 0.3 }, // Frankfurt
        { x: canvas.width * 0.75, y: canvas.height * 0.6 }, // Singapura
        { x: canvas.width * 0.8, y: canvas.height * 0.35 }, // Tóquio
        { x: canvas.width * 0.85, y: canvas.height * 0.75 }, // Sydney
        { x: canvas.width * 0.2, y: canvas.height * 0.25 }, // Toronto
        { x: canvas.width * 0.6, y: canvas.height * 0.5 }, // Dubai
      ];

      datacenters.forEach((dc) => {
        nodes.push({
          x: dc.x,
          y: dc.y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 4 + Math.random() * 2,
        });
      });

      nodesRef.current = nodes;
    };

    initializeNodes();

    // Desenhar padrão de mapa-múndi (pontos discretos)
    const drawWorldDots = () => {
      const isMobile = canvas.width < 768;
      const dotSize = isMobile ? 1 : 1.5;
      const spacing = isMobile ? 60 : 45;
      const dotColor = "rgba(100, 160, 220, 0.12)";

      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          if (Math.random() > 0.4) {
            ctx.fillStyle = dotColor;
            ctx.beginPath();
            ctx.arc(
              x + Math.random() * 25,
              y + Math.random() * 25,
              dotSize,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }
    };

    // Desenhar linhas de conexão entre datacenters
    const drawConnections = () => {
      const nodes = nodesRef.current;
      const isMobile = canvas.width < 768;
      const connectionDistance = isMobile ? 350 : 450;
      const lineWidth = isMobile ? 0.9 : 1.3;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.3;

            const gradient = ctx.createLinearGradient(
              nodes[i].x,
              nodes[i].y,
              nodes[j].x,
              nodes[j].y
            );
            gradient.addColorStop(0, `rgba(100, 200, 240, ${opacity * 0.7})`);
            gradient.addColorStop(0.5, `rgba(100, 220, 255, ${opacity})`);
            gradient.addColorStop(1, `rgba(100, 180, 220, ${opacity * 0.7})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = lineWidth;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            const cpx = (nodes[i].x + nodes[j].x) / 2 + (Math.random() - 0.5) * 60;
            const cpy = (nodes[i].y + nodes[j].y) / 2 + (Math.random() - 0.5) * 60;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.quadraticCurveTo(cpx, cpy, nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Desenhar nós com efeito glow
    const drawNodes = (time: number) => {
      const nodes = nodesRef.current;
      const isMobile = canvas.width < 768;
      const glowMultiplier = isMobile ? 0.6 : 1;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        const glowIntensity = 0.5 + Math.sin(time * 0.003 + i) * 0.5;

        // Glow externo
        const glowGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.size * 8 * glowMultiplier
        );
        glowGradient.addColorStop(0, `rgba(100, 200, 240, ${0.25 * glowIntensity * glowMultiplier})`);
        glowGradient.addColorStop(0.5, `rgba(100, 180, 220, ${0.12 * glowIntensity * glowMultiplier})`);
        glowGradient.addColorStop(1, `rgba(100, 160, 200, 0)`);

        ctx.fillStyle = glowGradient;
        ctx.fillRect(
          node.x - node.size * 8 * glowMultiplier,
          node.y - node.size * 8 * glowMultiplier,
          node.size * 16 * glowMultiplier,
          node.size * 16 * glowMultiplier
        );

        // Núcleo do nó
        const coreGradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          node.size
        );
        coreGradient.addColorStop(0, `rgba(150, 230, 255, 0.75)`);
        coreGradient.addColorStop(0.7, `rgba(100, 210, 245, ${0.6 * glowIntensity})`);
        coreGradient.addColorStop(1, `rgba(100, 180, 220, 0.2)`);
        coreGradient.addColorStop(1, `rgba(100, 180, 220, 0.35)`);

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Anel oscilante
        ctx.strokeStyle = `rgba(100, 220, 255, ${0.45 * glowIntensity})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(
          node.x,
          node.y,
          node.size * 2.2 + Math.sin(time * 0.005 + i) * 3,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
    };

    // Loop de animação
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

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

export default WorldMapBackground;
