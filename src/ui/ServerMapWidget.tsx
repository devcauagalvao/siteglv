import React, { useEffect, useRef, useMemo } from "react";

interface ServerNode {
  name: string;
  lat: number;
  lon: number;
  x?: number;
  y?: number;
}

const ServerMapWidget: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Datacenters com coordenadas geográficas reais
  const servers = useMemo<ServerNode[]>(() => [
    { name: "São Paulo", lat: -23.55, lon: -46.6 },
    { name: "Miami", lat: 25.76, lon: -80.2 },
    { name: "Londres", lat: 51.5, lon: -0.12 },
    { name: "Frankfurt", lat: 50.11, lon: 8.68 },
    { name: "Singapura", lat: 1.35, lon: 103.85 },
    { name: "Tóquio", lat: 35.68, lon: 139.69 },
    { name: "Sydney", lat: -33.87, lon: 151.2 },
    { name: "Toronto", lat: 43.65, lon: -79.38 },
    { name: "Dubai", lat: 25.2, lon: 55.27 },
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Projeção equirectangular simples
    const projectPoint = (lat: number, lon: number, centerX: number, centerY: number, scale: number) => {
      const x = centerX + (lon * scale) / 180;
      const y = centerY - (lat * scale) / 90;
      return { x, y };
    };

    // Desenhar continentes simplificados
    const drawContinents = (centerX: number, centerY: number, scale: number) => {
      ctx.fillStyle = "rgba(50, 120, 180, 0.15)";
      ctx.strokeStyle = "rgba(100, 160, 220, 0.3)";
      ctx.lineWidth = 0.8;

      // América do Norte
      ctx.beginPath();
      ctx.arc(centerX - scale * 0.4, centerY - scale * 0.3, scale * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // América do Sul
      ctx.beginPath();
      ctx.arc(centerX - scale * 0.35, centerY + scale * 0.2, scale * 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Europa
      ctx.beginPath();
      ctx.arc(centerX + scale * 0.05, centerY - scale * 0.25, scale * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // África
      ctx.beginPath();
      ctx.arc(centerX + scale * 0.15, centerY + scale * 0.1, scale * 0.13, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ásia
      ctx.beginPath();
      ctx.arc(centerX + scale * 0.35, centerY - scale * 0.15, scale * 0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Oceânia
      ctx.beginPath();
      ctx.arc(centerX + scale * 0.45, centerY + scale * 0.3, scale * 0.08, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    };

    // Desenhar graticule (grid do mapa)
    const drawGraticule = (centerX: number, centerY: number, scale: number) => {
      ctx.strokeStyle = "rgba(100, 160, 220, 0.08)";
      ctx.lineWidth = 0.5;

      // Linhas de latitude
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 5) {
          const { x, y } = projectPoint(lat, lon, centerX, centerY, scale);
          if (lon === -180) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Linhas de longitude
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -80; lat <= 80; lat += 5) {
          const { x, y } = projectPoint(lat, lon, centerX, centerY, scale);
          if (lat === -80) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    };

    // Desenhar borda do mapa (círculo)
    const drawMapBorder = (centerX: number, centerY: number, scale: number) => {
      ctx.strokeStyle = "rgba(100, 180, 220, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, scale, 0, Math.PI * 2);
      ctx.stroke();
    };

    // Desenhar conexões entre servidores
    const drawConnections = (centerX: number, centerY: number, scale: number) => {
      for (let i = 0; i < servers.length; i++) {
        for (let j = i + 1; j < servers.length; j++) {
          const p1 = projectPoint(servers[i].lat, servers[i].lon, centerX, centerY, scale);
          const p2 = projectPoint(servers[j].lat, servers[j].lon, centerX, centerY, scale);

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Conectar servidores próximos
          if (distance < scale * 0.7) {
            const opacity = (1 - distance / (scale * 0.7)) * 0.25;

            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `rgba(100, 200, 240, ${opacity * 0.6})`);
            gradient.addColorStop(0.5, `rgba(100, 220, 255, ${opacity})`);
            gradient.addColorStop(1, `rgba(100, 180, 220, ${opacity * 0.6})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            // Desenhar curva suave
            const cpx = (p1.x + p2.x) / 2 + (Math.random() - 0.5) * 20;
            const cpy = (p1.y + p2.y) / 2 + (Math.random() - 0.5) * 20;
            ctx.quadraticCurveTo(cpx, cpy, p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Desenhar nós (servidores)
    const drawNodes = (centerX: number, centerY: number, scale: number, time: number) => {
      servers.forEach((server, index) => {
        const pos = projectPoint(server.lat, server.lon, centerX, centerY, scale);
        server.x = pos.x;
        server.y = pos.y;

        const glowIntensity = 0.5 + Math.sin(time * 0.003 + index) * 0.5;
        const nodeSize = 2.5;

        // Glow externo
        const glowGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, nodeSize * 6);
        glowGradient.addColorStop(0, `rgba(100, 200, 240, ${0.35 * glowIntensity})`);
        glowGradient.addColorStop(0.6, `rgba(100, 180, 220, ${0.15 * glowIntensity})`);
        glowGradient.addColorStop(1, `rgba(100, 160, 200, 0)`);

        ctx.fillStyle = glowGradient;
        ctx.fillRect(pos.x - nodeSize * 6, pos.y - nodeSize * 6, nodeSize * 12, nodeSize * 12);

        // Núcleo
        const coreGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, nodeSize);
        coreGradient.addColorStop(0, `rgba(150, 230, 255, 0.95)`);
        coreGradient.addColorStop(0.7, `rgba(100, 210, 245, ${0.85 * glowIntensity})`);
        coreGradient.addColorStop(1, `rgba(100, 180, 220, 0.35)`);

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Anel
        ctx.strokeStyle = `rgba(100, 220, 255, ${0.45 * glowIntensity})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeSize * 1.8 + Math.sin(time * 0.005 + index) * 1.5, 0, Math.PI * 2);
        ctx.stroke();
      });
    };

    // Configurar tamanho do canvas
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const centerX = (canvas.width / window.devicePixelRatio) / 2;
    const centerY = (canvas.height / window.devicePixelRatio) / 2;
    const scale = Math.min(centerX, centerY) * 0.85;

    // Loop de animação
    const animate = (time: number) => {
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      ctx.clearRect(0, 0, w, h);

      // Desenhar em camadas
      drawGraticule(centerX, centerY, scale);
      drawContinents(centerX, centerY, scale);
      drawMapBorder(centerX, centerY, scale);
      drawConnections(centerX, centerY, scale);
      drawNodes(centerX, centerY, scale, time);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate(0);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [servers]);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
};

export default ServerMapWidget;
