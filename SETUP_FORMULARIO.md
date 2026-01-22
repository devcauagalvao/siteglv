# Configuração do Formulário de Servidor Personalizado

## 🎯 Funcionalidades Implementadas

### ✅ Formulário Multi-Etapa (3 Passos)
1. **Recursos**: Seleção de Data Center, Tipo de Instância AWS e Armazenamento
2. **Backups & Addons**: Configuração de backups automáticos e serviços complementares
3. **Revisão**: Dados de contato e resumo final da configuração

### ✅ Opções Profissionais de AWS
- **Instâncias EC2**: T3, M5, C5, R5 (diferentes famílias para diferentes necessidades)
- **Storage**: GP3, GP2, IO1, ST1 (com informações de custo por GB)
- **Backups**: Nenhum, Diário, Semanal, Mensal
- **Addons**: CloudWatch, Auto Scaling, RDS, CloudFront, WAF, AWS Backup Vault

### ✅ Cálculo de Custos em Tempo Real
- Estimativa automática baseada em:
  - Tipo e tamanho da instância
  - Armazenamento selecionado
  - Opção de backup
  - Addons escolhidos

### ✅ Envio de Email
- Integração com EmailJS
- Template profissional com toda a configuração
- Dados salvos localmente (localStorage) como backup

### ✅ Design Responsivo
- Mobile-first
- 2 colunas em desktop, 1 coluna em mobile
- Painel de resumo "sticky" em desktop
- Animações suaves

### ✅ Modal de Sucesso
- Confirmação visual após envio
- Detalhes do que foi enviado
- Navegação de volta

---

## 🚀 Como Configurar

### 1. Configurar EmailJS

#### Passo 1: Criar conta em EmailJS
1. Acesse [emailjs.com](https://emailjs.com)
2. Registre-se gratuitamente
3. Vá para "Account" e copie seu **Public Key**

#### Passo 2: Criar um Serviço
1. Em EmailJS, clique em "Email Services"
2. Clique "Create New Service"
3. Selecione seu provedor de email (Gmail, Outlook, etc)
4. Configure as credenciais
5. Copie o **Service ID** (ex: service_glv)

#### Passo 3: Criar um Template
1. Em EmailJS, clique em "Email Templates"
2. Clique "Create New Template"
3. Cole o template abaixo:

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
        footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Proposta de Configuração - GLV Tecnologia</h1>
        </div>
        
        <div class="content">
            <h2>Olá {{responsible_name}},</h2>
            <p>Recebemos sua solicitação de configuração de servidor em nuvem. Aqui está o resumo:</p>
            
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
                <div class="value">
                    vCPU: {{vcpu}}<br>
                    RAM: {{ram}}<br>
                    Armazenamento: {{storage}}
                </div>
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
                <div class="label">ADDONS SELECIONADOS</div>
                <div class="value">{{addons}}</div>
            </div>
            
            <div class="divider"></div>
            
            <p><strong>Data da Solicitação:</strong> {{timestamp}}</p>
            
            <p>Nossa equipe entrará em contato em breve para detalhar a proposta e confirmar todos os detalhes.</p>
            
            <p>Atenciosamente,<br><strong>Equipe GLV Tecnologia</strong></p>
        </div>
        
        <footer>
            <p>Este é um email automático. Por favor, não responda diretamente.</p>
        </footer>
    </div>
</body>
</html>
```

4. Copie o **Template ID** (ex: template_server_config)

#### Passo 4: Configurar Variáveis de Ambiente

1. Crie arquivo `.env.local` na raiz do projeto (ou copie `.env.example`):

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=service_glv
VITE_EMAILJS_TEMPLATE_ID=template_server_config
```

2. Substitua os valores pelos dados do seu EmailJS

3. **IMPORTANTE**: Adicione `.env.local` ao `.gitignore` para não enviar credenciais

---

## 📊 Estrutura de Dados

### ServerConfiguration
```typescript
{
  // Contato
  company: string;
  name: string;
  contact: string;
  
  // Seleção
  dataCenter: string;
  instanceType: string;
  instanceSize: string;
  storageType: string;
  storageSize: number;
  backupOption: string;
  selectedAddons: string[];
}
```

---

## 💾 Armazenamento Local

Os dados também são salvos em `localStorage` com a chave `serverConfigs`:

```javascript
// Acessar histórico de propostas
const configs = JSON.parse(localStorage.getItem('serverConfigs') || '[]');
console.log(configs);
```

---

## 🎨 Customizações

### Alterar cores da interface
Arquivo: `src/pages/custom/CustomizeServer.tsx`
- Buscar por `bg-blue-600` e substituir pela cor desejada
- Ou customizar em `tailwind.config.js`

### Alterar opções de AWS
Arquivo: `src/data/awsConfigs.ts`
- Adicionar/remover tipos de instância
- Ajustar preços
- Adicionar mais data centers

### Alterar template de email
Parar no EmailJS:
1. Vá para Email Templates
2. Edite o template criado
3. Modifique o HTML/CSS conforme necessário

---

## 🧪 Testando

1. Preencha o formulário completamente
2. Clique em "Solicitar Proposta"
3. Você deve receber um email com os dados
4. Verifique o `localStorage` para histórico

---

## 📧 Integração com Email Profesional

Para usar com seu email corporativo:

1. **Gmail**: Usar "App Password" em vez de senha
2. **Outlook**: Usar credenciais da conta Microsoft
3. **Servidor SMTP Próprio**: Configurar em EmailJS como "Other"

---

## ⚠️ Troubleshooting

### Email não está sendo enviado
- ✅ Verificar se Public Key está correta
- ✅ Verificar se Service ID está correto
- ✅ Verificar se Template ID está correto
- ✅ Verificar console do navegador para erros

### Dados não estão sendo salvos localmente
- ✅ Verificar se localStorage está habilitado
- ✅ Limpar cache do navegador

### Layout quebrado em mobile
- ✅ Testar em diferentes dispositivos
- ✅ Abrir DevTools (F12) e simular mobile

---

## 📱 Recursos Responsivos

✅ Grid automático 1-2 colunas
✅ Botões expandem em mobile
✅ Sliders funcionam em touch
✅ Modal se adapta a telas menores
✅ Painel de resumo fica flutuante em mobile

---

Pronto para usar! 🚀
