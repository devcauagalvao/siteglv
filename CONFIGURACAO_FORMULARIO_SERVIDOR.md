# 🚀 Formulário de Configuração de Servidor - Documentação Completa

## 📋 Resumo

Um formulário web profissional, responsivo e totalmente funcional para configuração de servidores em nuvem AWS. O usuário pode:

✅ Selecionar Data Center (Brasil, USA, México, Colômbia)  
✅ Escolher tipo de instância AWS (T3, M5, C5, R5)  
✅ Configurar armazenamento (GP3, GP2, IO1, ST1)  
✅ Selecionar opções de backup  
✅ Adicionar complementos opcionais  
✅ Receber email com a proposta  
✅ Visualizar custo estimado em tempo real  

---

## 🎯 Funcionalidades Principais

### 1. **Multi-Etapas**
- Passo 1: Seleção de recursos (Data Center, Instância, Storage)
- Passo 2: Backup e Addons (complementos opcionais)
- Passo 3: Revisão e Envio (dados de contato)

### 2. **Opções Profissionais de AWS**

#### Tipos de Instância
- **T3**: Uso geral com burst (desenvolvimento, testes)
- **M5**: Balanceado (workloads gerais)
- **C5**: Otimizado para CPU (processamento intensivo)
- **R5**: Otimizado para memória (bancos de dados)

#### Storage
- **GP3**: SSD de uso geral - $0.1/GB
- **GP2**: SSD anterior - $0.12/GB
- **IO1**: IOPS provisionado - $0.2/GB
- **ST1**: HDD otimizado - $0.045/GB

#### Backups
- Sem backup automático - Grátis
- Diário (retenção 7 dias) - $2.50/mês
- Semanal (retenção 30 dias) - $5.00/mês
- Mensal (retenção 90 dias) - $12.00/mês

#### Addons
- CloudWatch Detalhado - $3.50/mês
- Auto Scaling - Grátis
- RDS Database - $15.00/mês
- CloudFront CDN - $0.085/GB
- WAF & DDoS Protection - $5.00/mês
- AWS Backup Vault - $0.50/mês

### 3. **Cálculo de Custos em Tempo Real**
Estimativa automática baseada em:
- Tipo e tamanho da instância
- Capacidade de armazenamento
- Opção de backup selecionada
- Addons escolhidos

### 4. **Design Responsivo**
- **Desktop**: 2 colunas (formulário + resumo fixo)
- **Mobile**: 1 coluna (resumo flutuante no topo)
- Totalmente touchscreen-friendly
- Animações suaves

---

## 🔧 Como Configurar

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta gratuita em [EmailJS](https://emailjs.com)

### Passo 1: Clonar e Instalar

```bash
cd c:\projetosglv\siteglv
npm install
```

### Passo 2: Configurar EmailJS

1. **Criar conta em EmailJS**
   - Acesse https://emailjs.com
   - Registre-se gratuitamente
   - Vá para "Account" > copie seu **Public Key**

2. **Criar Service (Serviço de Email)**
   - Clique em "Email Services"
   - "Create New Service"
   - Selecione seu provedor (Gmail, Outlook, etc)
   - Configure as credenciais
   - Copie o **Service ID**

3. **Criar Template de Email**
   - Clique em "Email Templates"
   - "Create New Template"
   - Cole o HTML fornecido em `SETUP_FORMULARIO.md`
   - Salve e copie o **Template ID**

4. **Configurar Arquivo .env**
   
   Crie arquivo `.env.local` na raiz do projeto:

   ```env
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   VITE_EMAILJS_SERVICE_ID=service_glv
   VITE_EMAILJS_TEMPLATE_ID=template_server_config
   ```

   **Substitua os valores pelos dados do seu EmailJS**

### Passo 3: Testar

```bash
npm run dev
```

Acesse: http://localhost:5173/personalizar/redes-servidores

---

## 📁 Estrutura de Arquivos

```
src/
├── pages/custom/
│   └── CustomizeServer.tsx          # Componente principal (788 linhas)
├── components/
│   └── ServerSuccessModal.tsx       # Modal de sucesso
├── services/
│   └── serverService.ts            # Lógica de email e cálculos
└── data/
    └── awsConfigs.ts               # Configurações AWS
```

---

## 🎨 Personalizações

### Alterar Cores
Arquivo: `src/pages/custom/CustomizeServer.tsx`
- Buscar por `bg-blue-600` e substituir
- Ou customizar em `tailwind.config.js`

### Adicionar Novos Data Centers
Arquivo: `src/data/awsConfigs.ts`

```typescript
export const DATA_CENTERS = [
  // ... existentes
  {
    id: "new",
    name: "Nova Localização",
    region: "us-west-2",
    city: "Oregon",
    flag: "🌍",
    latency: "200ms",
  },
];
```

### Alterar Preços de Instâncias
Arquivo: `src/services/serverService.ts` - função `calculateEstimatedCost()`

```typescript
const instanceCosts: Record<string, number> = {
  "t3.micro": 9.50,
  // ... ajustar valores
};
```

### Modificar Template de Email
No painel EmailJS:
1. Email Templates > Selecione seu template
2. Edite o HTML/CSS
3. Use variáveis como {{company_name}}, {{data_center}}, etc

---

## 💾 Dados Armazenados

### Local (localStorage)
Chave: `serverConfigs`
```javascript
const configs = JSON.parse(localStorage.getItem('serverConfigs') || '[]');
// Retorna array com todas as propostas salvas
```

### Email Enviado
Template padrão inclui:
- Empresa e responsável
- Data Center selecionado
- Tipo de instância com especificações
- Storage e tipo
- Backup selecionado
- Addons escolhidos
- Timestamp do pedido

---

## 🧪 Testando a Integração

### Teste 1: Envio de Email
1. Preencha todo o formulário
2. Clique em "Solicitar Proposta"
3. Você deve receber um email em segundos
4. Verifique a pasta de spam se não aparecer

### Teste 2: Armazenamento Local
Abra o console do navegador (F12):
```javascript
console.log(JSON.parse(localStorage.getItem('serverConfigs')));
```

### Teste 3: Cálculo de Custos
Altere os sliders e veja o custo atualizar em tempo real no painel direito

---

## ⚠️ Troubleshooting

### Email não está sendo enviado
❌ Erro: "Failed to authenticate"
✅ Solução:
- Verificar Public Key em Account Settings
- Se usar Gmail: gerar "App Password" em vez de senha regular
- Testar credenciais do serviço de email

❌ Erro: "No template found"
✅ Solução:
- Verificar se Template ID está correto
- Verificar se template foi publicado

❌ Erro: "Service not found"
✅ Solução:
- Verificar se Service ID está correto
- Verificar se serviço foi ativado

### Dados não salvam localmente
❌ Erro: localStorage undefined
✅ Solução:
- localStorage desabilitado no navegador
- Modo anônimo/privado - ativar persistent storage
- Limpar cache: Ctrl+Shift+Delete

### Layout quebrado em mobile
❌ Componentes sobrepostos
✅ Solução:
- Testar em device real ou DevTools (F12 > Toggle device toolbar)
- Limpar cache: Ctrl+Shift+R
- Testar em diferentes navegadores

---

## 📱 Funcionalidades Responsivas

✅ **Mobile First Design**
- Grid automático (1 coluna em mobile, 2 em desktop)
- Botões expandem para tocar facilmente
- Sliders funcionam com touch

✅ **Painel de Resumo**
- Desktop: Fixo na lateral direita
- Mobile: Flutuante no topo com sticky positioning

✅ **Modal de Sucesso**
- Adapta tamanho da tela
- Botão voltarcentrado em mobile

---

## 🔐 Segurança

⚠️ **Importante**: Seu Public Key do EmailJS é visível no código fonte (isso é seguro pois é apenas para identificação)

❌ **NUNCA** comita arquivo `.env.local` com credenciais no Git

Adicione ao `.gitignore`:
```
.env.local
.env.*.local
```

---

## 📊 Exemplo de Resposta JSON

Estrutura dos dados salvos:

```javascript
{
  "company": "Acme Corp",
  "name": "João Silva",
  "contact": "(11) 99999-9999",
  "dataCenter": "br",
  "instanceType": "m5",
  "instanceSize": "m5.xlarge",
  "storageType": "gp3",
  "storageSize": 250,
  "backupOption": "daily",
  "selectedAddons": ["monitoring", "waf"],
  "savedAt": "2026-01-21T14:30:00.000Z"
}
```

---

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm run build
# Fazer push no GitHub
# Conectar ao Vercel
```

**Importante**: Adicione variáveis de ambiente no Vercel:
- Settings > Environment Variables
- Adicione suas chaves do EmailJS

### Manual
```bash
npm run build
# Fazer upload da pasta `dist/` para seu servidor
```

---

## 📞 Suporte

Para problemas:
1. Verificar console do navegador (F12)
2. Verificar logs do EmailJS em dashboard.emailjs.com
3. Testar em navegador diferente
4. Limpar cache do navegador

---

**Versão**: 1.0.0  
**Atualizado**: Janeiro 2026  
**Status**: ✅ Produção
