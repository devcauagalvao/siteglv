import React, { useEffect, useRef, useMemo } from "react";
import useAutoPerformanceMode from "../../hooks/useAutoPerformanceMode";

interface ContinentPath {
  name: string;
  points: Array<{ lat: number; lon: number }>;
}

interface DataPoint {
  lat: number;
  lon: number;
  name: string;
}

const GlobalMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { enabled: performanceMode } = useAutoPerformanceMode();

  // Dados dos continentes (coordenadas aproximadas para wireframe)
  const continents = useMemo<ContinentPath[]>(() => [
    {
      name: "North America",
      points: [
        { lat: 70, lon: -130 },
        { lat: 65, lon: -95 },
        { lat: 60, lon: -75 },
        { lat: 50, lon: -100 },
        { lat: 45, lon: -75 },
        { lat: 40, lon: -80 },
        { lat: 35, lon: -100 },
        { lat: 30, lon: -90 },
        { lat: 25, lon: -97 },
        { lat: 48, lon: -125 },
      ],
    },
    {
      name: "South America",
      points: [
        { lat: 13, lon: -60 },
        { lat: 10, lon: -65 },
        { lat: 5, lon: -70 },
        { lat: 0, lon: -75 },
        { lat: -5, lon: -70 },
        { lat: -10, lon: -55 },
        { lat: -15, lon: -60 },
        { lat: -20, lon: -65 },
        { lat: -25, lon: -55 },
        { lat: -30, lon: -55 },
        { lat: -35, lon: -60 },
        { lat: -40, lon: -65 },
        { lat: -45, lon: -70 },
        { lat: -50, lon: -68 },
      ],
    },
    {
      name: "Europe",
      points: [
        { lat: 71, lon: 30 },
        { lat: 70, lon: 10 },
        { lat: 65, lon: -10 },
        { lat: 60, lon: -5 },
        { lat: 55, lon: 0 },
        { lat: 50, lon: -5 },
        { lat: 45, lon: 10 },
        { lat: 40, lon: 5 },
        { lat: 35, lon: 20 },
        { lat: 38, lon: 30 },
        { lat: 45, lon: 40 },
        { lat: 50, lon: 35 },
        { lat: 60, lon: 25 },
      ],
    },
    {
      name: "Africa",
      points: [
        { lat: 37, lon: -6 },
        { lat: 35, lon: 10 },
        { lat: 30, lon: 30 },
        { lat: 25, lon: 40 },
        { lat: 20, lon: 40 },
        { lat: 15, lon: 50 },
        { lat: 10, lon: 45 },
        { lat: 5, lon: 40 },
        { lat: 0, lon: 35 },
        { lat: -5, lon: 35 },
        { lat: -10, lon: 40 },
        { lat: -15, lon: 30 },
        { lat: -20, lon: 25 },
        { lat: -25, lon: 30 },
        { lat: -30, lon: 25 },
        { lat: -35, lon: 20 },
      ],
    },
    {
      name: "Asia",
      points: [
        { lat: 75, lon: 100 },
        { lat: 70, lon: 60 },
        { lat: 65, lon: 40 },
        { lat: 60, lon: 50 },
        { lat: 55, lon: 60 },
        { lat: 50, lon: 75 },
        { lat: 45, lon: 85 },
        { lat: 40, lon: 100 },
        { lat: 35, lon: 110 },
        { lat: 30, lon: 120 },
        { lat: 25, lon: 125 },
        { lat: 20, lon: 100 },
        { lat: 15, lon: 100 },
        { lat: 10, lon: 110 },
        { lat: 5, lon: 120 },
        { lat: 0, lon: 110 },
      ],
    },
    {
      name: "Australia",
      points: [
        { lat: -10, lon: 120 },
        { lat: -12, lon: 125 },
        { lat: -15, lon: 130 },
        { lat: -20, lon: 135 },
        { lat: -25, lon: 135 },
        { lat: -30, lon: 130 },
        { lat: -35, lon: 120 },
      ],
    },
  ], []);

  // Pontos de dados distribuídos globalmente
  const dataPoints = useMemo<DataPoint[]>(() => [
    { lat: 51.5, lon: 0, name: "Europe Hub" },
    { lat: 35.7, lon: 139.7, name: "Asia Pacific" },
    { lat: -33.87, lon: 151.2, name: "Australia" },
    { lat: 37.77, lon: -122.4, name: "West Coast" },
    { lat: 40.7, lon: -74.0, name: "East Coast" },
    { lat: 50.11, lon: 8.68, name: "Central Europe" },
    { lat: 1.35, lon: 103.85, name: "Southeast Asia" },
    { lat: -23.55, lon: -46.6, name: "South America" },
    { lat: 25.2, lon: 55.27, name: "Middle East" },
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let running = true;
    let isInView = true;

    const maxDpr = performanceMode ? 1.25 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    const maxFps = performanceMode ? 30 : 0;
    const frameInterval = maxFps > 0 ? 1000 / maxFps : 0;
    let lastRender = 0;

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      // reset transform to avoid accumulating scale
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { width: rect.width, height: rect.height };
    };

    let { width, height } = updateCanvasSize();
    let centerX = width / 2;
    let centerY = height / 2;

    // Responsividade: escala dinâmica baseada no tamanho da tela
    let isMobile = width < 768;
    let isTablet = width < 1024;
    let scale = Math.min(width, height) * 0.35;

    const recomputeLayout = () => {
      centerX = width / 2;
      centerY = height / 2;

      isMobile = width < 768;
      isTablet = width < 1024;

      scale = Math.min(width, height) * 0.35;
      if (isMobile) {
        scale = Math.min(width, height) * 0.25;
      } else if (isTablet) {
        scale = Math.min(width, height) * 0.3;
      }
    };

    recomputeLayout();

    // Projeção equirectangular
    const projectPoint = (lat: number, lon: number) => {
      const x = centerX + (lon * scale) / 180;
      const y = centerY - (lat * scale) / 90;
      return { x, y };
    };

    // Função para desenhar continentes com estilo wireframe/pontilhado
    const drawContinents = () => {
      const lineWidth = isMobile ? 1 : isTablet ? 1.2 : 1.5;
      const dotRadius = isMobile ? 1.2 : isTablet ? 1.5 : 2;
      
      ctx.strokeStyle = "rgba(100, 180, 220, 0.4)";
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      continents.forEach((continent) => {
        if (continent.points.length < 2) return;

        // Desenhar wireframe dos continentes
        ctx.beginPath();
        const firstPoint = projectPoint(continent.points[0].lat, continent.points[0].lon);
        ctx.moveTo(firstPoint.x, firstPoint.y);

        for (let i = 1; i < continent.points.length; i++) {
          const point = projectPoint(continent.points[i].lat, continent.points[i].lon);
          ctx.lineTo(point.x, point.y);
        }

        // Fechar o caminho
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.stroke();

        // Desenhar pontos pontilhados ao longo do continente
        ctx.fillStyle = "rgba(100, 180, 220, 0.25)";
        for (let i = 0; i < continent.points.length; i++) {
          const point = projectPoint(continent.points[i].lat, continent.points[i].lon);
          ctx.beginPath();
          ctx.arc(point.x, point.y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    // Desenhar grid de latitude/longitude
    const drawGrid = () => {
      ctx.strokeStyle = "rgba(100, 160, 200, 0.08)";
      ctx.lineWidth = 0.5;

      // Linhas de latitude
      for (let lat = -80; lat <= 80; lat += 20) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 10) {
          const point = projectPoint(lat, lon);
          if (lon === -180) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
      }

      // Linhas de longitude
      for (let lon = -180; lon <= 180; lon += 30) {
        ctx.beginPath();
        for (let lat = -80; lat <= 80; lat += 5) {
          const point = projectPoint(lat, lon);
          if (lat === -80) ctx.moveTo(point.x, point.y);
          else ctx.lineTo(point.x, point.y);
        }
        ctx.stroke();
      }
    };

    // Desenhar borda do mapa
    const drawMapBorder = () => {
      ctx.strokeStyle = "rgba(100, 180, 220, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, scale, 0, Math.PI * 2);
      ctx.stroke();
    };

    // Desenhar conexões entre pontos de dados
    const drawConnections = (time: number) => {
      for (let i = 0; i < dataPoints.length; i++) {
        for (let j = i + 1; j < dataPoints.length; j++) {
          const p1 = projectPoint(dataPoints[i].lat, dataPoints[i].lon);
          const p2 = projectPoint(dataPoints[j].lat, dataPoints[j].lon);

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Conectar apenas pontos próximos
          if (distance < scale * 1.2) {
            const opacity = Math.max(0.05, 0.3 * (1 - distance / (scale * 1.2)));
            const hue = (time * 0.05 + i + j) % 360;

            const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
            gradient.addColorStop(0, `hsla(${hue}, 100%, 60%, ${opacity * 0.6})`);
            gradient.addColorStop(0.5, `hsla(${hue}, 100%, 65%, ${opacity})`);
            gradient.addColorStop(1, `hsla(${hue}, 100%, 60%, ${opacity * 0.6})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.2;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            // Curva bezier suave
            const cpx = (p1.x + p2.x) / 2 + Math.sin(time * 0.002 + i) * 30;
            const cpy = (p1.y + p2.y) / 2 + Math.cos(time * 0.002 + j) * 30;
            ctx.quadraticCurveTo(cpx, cpy, p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Desenhar pontos de dados com glow animado
    const drawDataPoints = (time: number) => {
      const nodeSize = isMobile ? 1.8 : isTablet ? 2.2 : 3;
      const glowRadius = isMobile ? nodeSize * 5 : isTablet ? nodeSize * 6.5 : nodeSize * 8;
      
      dataPoints.forEach((point, index) => {
        const pos = projectPoint(point.lat, point.lon);
        
        const glowIntensity = 0.6 + Math.sin(time * 0.003 + index) * 0.4;

        // Glow externo pulsante
        const glowGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowRadius);
        glowGradient.addColorStop(0, `rgba(100, 200, 255, ${0.15 * glowIntensity})`);
        glowGradient.addColorStop(0.6, `rgba(100, 180, 220, ${0.05 * glowIntensity})`);
        glowGradient.addColorStop(1, `rgba(100, 160, 200, 0)`);

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Núcleo brilhante
        const coreGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, nodeSize);
        coreGradient.addColorStop(0, `rgba(150, 230, 255, 0.6)`);
        coreGradient.addColorStop(0.7, `rgba(100, 210, 245, ${0.5 * glowIntensity})`);
        coreGradient.addColorStop(1, `rgba(100, 180, 220, 0.15)`);

        ctx.fillStyle = coreGradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, nodeSize, 0, Math.PI * 2);
        ctx.fill();

        // Anel oscilante
        ctx.strokeStyle = `rgba(100, 220, 255, ${0.25 * glowIntensity})`;
        ctx.lineWidth = isMobile ? 0.6 : 1;
        ctx.beginPath();
        ctx.arc(
          pos.x,
          pos.y,
          nodeSize * 2.5 + Math.sin(time * 0.005 + index) * 1.5,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      });
    };

    const schedule = () => {
      if (!running) return;
      if (!isInView) return;
      if (document.visibilityState === "hidden") return;
      if (animationRef.current) return;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Loop de animação
    const animate = (time: number) => {
      animationRef.current = undefined;
      if (!running) return;
      if (!isInView) return;
      if (document.visibilityState === "hidden") return;

      if (frameInterval > 0 && time - lastRender < frameInterval) {
        schedule();
        return;
      }
      lastRender = time;

      const w = width;
      const h = height;

      // Fundo escuro
      ctx.fillStyle = "rgba(8, 20, 35, 1)";
      ctx.fillRect(0, 0, w, h);

      // Desenhar camadas
      drawGrid();
      drawContinents();
      drawConnections(time);
      drawMapBorder();
      drawDataPoints(time);

      schedule();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;
        if (!isInView && animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = undefined;
        }
        if (isInView) schedule();
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    const onVis = () => {
      if (document.visibilityState === "hidden") {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = undefined;
        }
      } else {
        schedule();
      }
    };
    document.addEventListener("visibilitychange", onVis);

    schedule();

    // Redimensionamento responsivo
    const handleResize = () => {
      if (canvasRef.current) {
        const s = updateCanvasSize();
        width = s.width;
        height = s.height;
        recomputeLayout();
        schedule();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [continents, dataPoints, performanceMode]);

  return (
    <div className="w-full h-full bg-slate-950">
      <canvas
        ref={canvasRef}
        className="w-full h-full display-block"
        style={{ display: "block", background: "linear-gradient(to bottom, rgba(8,20,35,1), rgba(10,25,40,1))" }}
      />
    </div>
  );
};

export default GlobalMap;
