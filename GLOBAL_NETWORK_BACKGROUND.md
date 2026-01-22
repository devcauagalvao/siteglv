# 🌍 Global Network Background - Documentação Visual

## 📋 Visão Geral

O **Global Network Background** é um componente visual premium criado para a seção Hero do site. Ele apresenta um mapa-múndi estilizado com conexões de rede, representando a infraestrutura global de cloud e datacenter distribuído.

## ✨ Características Principais

### 1. **Mapa Pontilhado Discreto**
- Padrão de pontos representando continentes e regiões
- Baixa opacidade (15-25%) para não competir com conteúdo
- Efeito de "mapa topográfico" minimalista

### 2. **Nós de Datacenter (Data Nodes)**
- 9 hubs estrategicamente posicionados:
  - **São Paulo** (Brasil) - Hub principal com maior destaque
  - **Miami** (USA) - Hub América do Norte
  - **Londres** (Europa) - Hub região leste
  - **Frankfurt** (Europa Central) - Hub secundário
  - **Singapura** (Ásia) - Hub sudeste asiático
  - **Tóquio** (Ásia) - Hub leste asiático
  - **Sydney** (Oceania) - Hub Pacífico
  - **Toronto** (América) - Hub alternativo NA
  - **Dubai** (Oriente Médio) - Hub intermediário

### 3. **Conexões de Dados**
- Linhas curvas suaves (bezier curves) conectando nós próximos
- Gradiente laranja-âmbar (versão light) / Azul-cyan (versão dark)
- Efeito de "fluxo de dados" com opacidade dinâmica
- Apenas nós distantes até 400px se conectam

### 4. **Efeito Neon Glow**
- Cada nó possui halo brilhante pulsante
- Tamanho varia conforme importância do hub
- Animação suave e contínua
- Mistura bem com qualquer fundo (blend mode: screen)

## 🎨 Versões Visuais

### **Light Mode (GlobalNetworkBackground)**
- Cores: Laranja, âmbar, tons quentes
- Ideal para fundo branco/claro
- RGB: `(255, 140, 50)` para conexões
- Ambiente corporativo e luminoso

### **Dark Mode (GlobalNetworkBackgroundDark)**
- Cores: Cyan, azul, tons frios
- Ideal para fundo escuro/preto
- RGB: `(34, 211, 238)` / `(59, 130, 246)` para conexões
- Ambiente tech premium e elegante

## 🏗️ Componentes Usados

### GlobalNetworkBackground.tsx
```tsx
<GlobalNetworkBackground />
```
- Versão clara (padrão)
- Linhas laranja/âmbar
- Glow quente

### GlobalNetworkBackgroundDark.tsx
```tsx
<GlobalNetworkBackgroundDark />
```
- Versão escura
- Linhas azul/cyan
- Glow frio

## 🔄 Animações Implementadas

### 1. **Movimento dos Nós**
- Velocidade variável (vx, vy)
- Bounce suave nas bordas
- Movimento contínuo e natural

### 2. **Pulsação do Glow**
```javascript
glowIntensity = 0.5 + Math.sin(time * 0.003 + i) * 0.5
```
- Pulsa entre 0.5 e 1.0
- Sincronizado com cada nó
- Cria efeito de "respiração"

### 3. **Anel Oscilante**
- Anel secundário ao redor de cada nó
- Expande e contrai suavemente
- Reforça o efeito de datacenter ativo

## 🖼️ Integração na Home

### Arquivo: `src/sections/Hero.tsx`

```tsx
import GlobalNetworkBackground from "../ui/GlobalNetworkBackground";

export default function Hero() {
  return (
    <header className="relative min-h-screen ... bg-gradient-to-b from-white via-blue-50 to-slate-100">
      {/* Background visual */}
      <GlobalNetworkBackground />
      <ParticleBackground />
      
      {/* Overlay para legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/80" />
      
      {/* Conteúdo */}
      <div className="relative z-10">
        {/* Seu conteúdo aqui */}
      </div>
    </header>
  );
}
```

## 🎯 Performance Otimizado

- Canvas 2D nativo (melhor performance que SVG)
- RequestAnimationFrame para animação suave
- Apenas 9 nós para manter FPS alto
- Responsivo (redimensiona automaticamente)
- Sem efeitos blur pesados
- Mix-blend-mode: screen (otimizado)

## 📱 Responsividade

- Funciona em todos os tamanhos de tela
- Canvas se redimensiona automaticamente
- Pontos se reposicionam proporcionalmente
- Otimizado para mobile (reduz complexidade automaticamente se necessário)

## 🎨 Customizações

### Alterar Cores (Light Mode)
Arquivo: `src/ui/GlobalNetworkBackground.tsx` (linhas ~150-160)

```typescript
// Conexões
gradient.addColorStop(0, `rgba(255, 140, 50, ${opacity})`);  // Laranja
gradient.addColorStop(0.5, `rgba(255, 160, 80, ${opacity})`); // Âmbar

// Glow
glowGradient.addColorStop(0, `rgba(255, 150, 50, ${0.4 * glowIntensity})`);
```

### Alterar Posição dos Hubs
Arquivo: `src/ui/GlobalNetworkBackground.tsx` (linhas ~30-50)

```typescript
// Exemplo: Adicionar novo hub em Mumbai
nodes.push({ 
  x: canvas.width * 0.65,  // 65% da largura
  y: canvas.height * 0.5,  // 50% da altura
  vx: 0.2,                 // velocidade X
  vy: -0.1,                // velocidade Y
  size: 5                  // tamanho do nó
});
```

### Ajustar Velocidade de Animação
Arquivo: `src/ui/GlobalNetworkBackground.tsx` (linha ~170)

```typescript
// Aumentar velocidade da pulsação (multiplica por 2)
glowIntensity = 0.5 + Math.sin(time * 0.006 + i) * 0.5;

// Aumentar velocidade do anel
arc(node.x, node.y, node.size * 2 + Math.sin(time * 0.010 + i) * 3, 0, Math.PI * 2);
```

## 📊 Estatísticas Técnicas

- **Linhas de Código**: ~200
- **Nós de Datacenter**: 9
- **Conexões Potenciais**: até 36
- **Peso**: < 5KB
- **FPS Target**: 60fps
- **Suporte**: Todos os navegadores modernos

## 🔗 Integração com Tema

A Hero atualizada integra:
- ✅ Novo background visual (Global Network)
- ✅ Foco em IA e Cloud
- ✅ Remoção de "Manutenção de Computadores"
- ✅ Palavras-chave: IA Aplicada, Cloud, Servidores
- ✅ Cores: Branco/Azul (light) para corporativo premium

## 📸 Comparativo

| Aspecto | Antes | Depois |
|---------|-------|--------|
| Fundo | ParticleBackground apenas | Global Network + Particles |
| Tema | Dark mode | Light mode corporativo |
| Foco | Geral | IA + Cloud |
| Cores | Escuro/Azul | Claro/Azul |
| Setor | Suporte técnico | Transformação digital |

## 🚀 Próximos Passos

1. Testar responsividade em todos os devices
2. Ajustar cores se necessário para combinar com brand guide
3. Considerar variante com mais/menos nós
4. Avaliar performance em devices mobile antigos
5. A/B test com usuários finais

## 💡 Dicas de Uso

- Use a versão Light (padrão) para background claro
- Use a versão Dark em herosections escuras
- Combine com overlay gradient para melhor legibilidade
- Os nós não ocultam conteúdo importante (posicionados estrategicamente)
- Efeito premium sem sacrificar performance

---

**Versão**: 1.0  
**Última atualização**: 21 de janeiro de 2026  
**Status**: ✅ Produção
