# 🚀 Formulário de Configuração GLV Cloud - Guia Completo

## ✨ O que foi implementado

### 1. **Formulário Responsivo Multi-Etapa (3 Passos)**
   - **Etapa 1 - Recursos**: Seleção de Data Center, Tipo de Instância e Armazenamento
   - **Etapa 2 - Backups & Addons**: Configuração de backups automáticos e serviços complementares
   - **Etapa 3 - Revisão**: Dados de contato e resumo final

### 2. **Opções Profissionais GLV Cloud**
   - **Famílias de Instância** (T3, M5, C5, R5)
   - **Tipos de Storage** (GP3, GP2, IO1, ST1)
   - **Planos de Backup** (Nenhum, Diário, Semanal, Mensal)
   - **Serviços Complementares** (CloudWatch, Auto Scaling, RDS, CloudFront, WAF, Backup Vault)

### 3. **Cálculo de Custos em Tempo Real**
   - Estimativa automática de custo mensal
   - Baseado em: tipo de instância + storage + backups + addons
   - Exibição atualizada conforme o usuário faz seleções

### 4. **Envio de Email Automático**
   - Integração com EmailJS
   - Template profissional com toda a configuração
   - Dados salvos localmente (localStorage) como backup
   - Modal de sucesso após envio

### 5. **Design Moderno & Responsivo**
   - Layout 2 colunas em desktop, 1 coluna em mobile
   - Painel de resumo "sticky" em desktop
   - Animações suaves e transições
   - Tema profissional corporativo (Slate + Blue)
   - Totalmente acessível

---

## ⚙️ Configuração Rápida

### Passo 1: Adicionar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_EMAILJS_PUBLIC_KEY=seu_public_key
VITE_EMAILJS_SERVICE_ID=service_glv
VITE_EMAILJS_TEMPLATE_ID=template_server_config
```

### Passo 2: Configurar EmailJS (5 minutos)

1. Vá para [emailjs.com](https://emailjs.com) e registre-se
2. Copie seu **Public Key** para `.env.local`
3. Crie um serviço de email (Gmail, Outlook, etc)
4. Copie o **Service ID**
5. Crie um template com o HTML abaixo
6. Copie o **Template ID**

### Passo 3: Template HTML (Cole no EmailJS)

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); color: white; padding: 20px; border-radius: 8px; }
        .content { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .section { margin: 20px 0; }
        .label { color: #666; font-weight: bold; font-size: 12px; }
        .value { color: #333; font-size: 16px; margin-top: 5px; }
        .divider { border-top: 1px solid #eee; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Proposta de Configuração - GLV Cloud</h1>
        </div>
        
        <div class="content">
            <h2>Olá {{responsible_name}},</h2>
            <p>Recebemos sua solicitação. Aqui está o resumo da sua configuração:</p>
            
            <div class="divider"></div>
            
            <div class="section">
                <div class="label">EMPRESA</div>
                <div class="value">{{company_name}}</div>
            </div>
            
            <div class="section">
                <div class="label">DATA CENTER</div>
                <div class="value">{{data_center}}</div>
            </div>
            
            <div class="section">
                <div class="label">TIPO DE INSTÂNCIA</div>
                <div class="value">{{instance_type}}</div>
            </div>
            
            <div class="section">
                <div class="label">RECURSOS</div>
                <div class="value">vCPU: {{vcpu}}<br>RAM: {{ram}}<br>Armazenamento: {{storage}}</div>
            </div>
            
            <div class="section">
                <div class="label">TIPO DE ARMAZENAMENTO</div>
                <div class="value">{{storage_type}}</div>
            </div>
            
            <div class="section">
                <div class="label">BACKUP</div>
                <div class="value">{{backup_option}}</div>
            </div>
            
            <div class="section">
                <div class="label">COMPLEMENTOS</div>
                <div class="value">{{addons}}</div>
            </div>
            
            <div class="divider"></div>
            
            <p><strong>Data da Solicitação:</strong> {{timestamp}}</p>
            
            <p>Nossa equipe entrará em contato em breve para detalhar a proposta.</p>
            
            <p>Atenciosamente,<br><strong>Equipe GLV Tecnologia</strong></p>
        </div>
    </div>
</body>
</html>
```

---

## 📁 Arquivos Criados/Modificados

### Novos Arquivos:
- ✅ `src/data/awsConfigs.ts` - Configurações GLV Cloud (instâncias, storage, backups, addons)
- ✅ `src/services/serverService.ts` - Lógica de email e cálculo de custos
- ✅ `src/components/ServerSuccessModal.tsx` - Modal de sucesso após envio
- ✅ `.env.example` - Template de variáveis de ambiente
- ✅ `SETUP_FORMULARIO.md` - Documentação de setup

### Modificados:
- ✅ `src/pages/custom/CustomizeServer.tsx` - Novo componente do formulário
- ✅ `src/pages/custom/CustomizePage.tsx` - Correção de erros de linting

---

## 🎯 Funcionalidades Principais

### Formulário Multi-Etapa
```
Etapa 1: Recursos
├─ Seleção de Data Center (BR, US, MX, CO)
├─ Escolha de Tipo de Instância (T3, M5, C5, R5)
└─ Configuração de Armazenamento (20-600 GB)

Etapa 2: Backups & Addons
├─ Plano de Backup automático
└─ Serviços opcionais complementares

Etapa 3: Revisão
├─ Dados de contato
└─ Resumo completo da configuração
```

### Painel Lateral (Sticky)
- Resumo em tempo real de tudo que foi selecionado
- Cálculo automático do custo mensal
- Seções colapsáveis para melhor visualização
- Botão CTA "Solicitar Proposta" (ativado apenas com dados válidos)

---

## 💾 Armazenamento de Dados

### Email
- Enviado via EmailJS para o contato fornecido
- Template profissional com branding GLV

### LocalStorage
- Backup automático em `serverConfigs`
- Histórico de todas as propostas enviadas
- Acessível via:
```javascript
const configs = JSON.parse(localStorage.getItem('serverConfigs') || '[]');
```

---

## 🎨 Customizações

### Alterar Cores
Arquivo: `src/pages/custom/CustomizeServer.tsx`
- Procure por `bg-blue-600` e substitua pela cor desejada
- Ou customize em `tailwind.config.js`

### Alterar Opções de Instância
Arquivo: `src/data/awsConfigs.ts`
- Modifique `GLV_CLOUD_INSTANCE_TYPES`
- Adicione/remova famílias, tamanhos, preços

### Alterar Data Centers
Arquivo: `src/data/awsConfigs.ts`
- Modifique `GLV_DATA_CENTERS`
- Cada data center tem: id, name, region, city, flag, latency

### Adicionar Mais Complementos
Arquivo: `src/data/awsConfigs.ts`
- Modifique `ADDON_OPTIONS`
- Adicione novo objeto com id, name, price, description

---

## ✅ Checklist de Setup

- [ ] Criar conta em EmailJS (emailjs.com)
- [ ] Obter Public Key do EmailJS
- [ ] Criar serviço de email no EmailJS
- [ ] Copiar Service ID
- [ ] Criar template de email no EmailJS
- [ ] Copiar Template ID
- [ ] Adicionar `.env.local` com as credenciais
- [ ] Testar o formulário (preencher e enviar)
- [ ] Verificar se email foi recebido
- [ ] Testar responsividade em mobile
- [ ] Verificar localStorage com histórico

---

## 🧪 Teste Rápido

1. Acesse a página: `/customize-server`
2. Preencha todos os 3 passos
3. Clique em "Solicitar Proposta"
4. Verifique seu email
5. Abra DevTools (F12) → Application → LocalStorage → serverConfigs

---

## 📊 Informações Técnicas

**Stack Utilizado:**
- React 18 + TypeScript
- Tailwind CSS
- EmailJS para envio de emails
- React Hot Toast para notificações
- React Router para navegação

**Browsers Suportados:**
- Chrome/Edge (últimas versões)
- Firefox (últimas versões)
- Safari (últimas versões)

**Responsividade:**
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

---

## 🆘 Troubleshooting

### Email não está sendo enviado
```
✅ Verificar se Public Key está correto
✅ Verificar se Service ID está correto
✅ Verificar se Template ID está correto
✅ Abrir Console (F12) para ver erros
✅ Verificar se serviço de email está ativo no EmailJS
```

### Dados não estão sendo salvos
```
✅ Verificar se localStorage está habilitado
✅ Limpar cache do navegador (Ctrl+Shift+Delete)
✅ Tentar em outra janela/abas
```

### Layout quebrado em mobile
```
✅ Limpar cache (Ctrl+F5)
✅ Testar em Device Mode do DevTools
✅ Verificar se viewport meta tag existe no HTML
```

---

## 📞 Suporte

Para mais informações ou dúvidas sobre a configuração:
- Documentação completa: `SETUP_FORMULARIO.md`
- Código do componente: `src/pages/custom/CustomizeServer.tsx`
- Configurações: `src/data/awsConfigs.ts`

---

**Desenvolvido com ❤️ para GLV Tecnologia**

*Última atualização: 21 de janeiro de 2026*
