# ⚡ Quick Start - Setup em 5 Minutos

## 1️⃣ Criar Conta EmailJS
- Acesse https://emailjs.com
- Sign Up (grátis)
- Vá para "Account" > copie **Public Key**

## 2️⃣ Criar Serviço de Email
- "Email Services" > "Create New Service"
- Escolha Gmail (ou outro)
- Configure credenciais
- Copie **Service ID**

## 3️⃣ Criar Template
- "Email Templates" > "Create New Template"
- Cole este HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px; }
        .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 20px; border-radius: 8px; }
        .content { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .field { margin: 15px 0; }
        .label { color: #666; font-weight: bold; font-size: 12px; }
        .value { color: #333; font-size: 14px; margin-top: 5px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Proposta de Servidor - GLV Tecnologia</h1>
        </div>
        <div class="content">
            <h2>Olá {{responsible_name}},</h2>
            <p>Sua solicitação foi recebida!</p>
            
            <div class="field">
                <div class="label">EMPRESA</div>
                <div class="value">{{company_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">DATA CENTER</div>
                <div class="value">{{data_center}}</div>
            </div>
            
            <div class="field">
                <div class="label">INSTÂNCIA AWS</div>
                <div class="value">{{instance_type}}</div>
            </div>
            
            <div class="field">
                <div class="label">RECURSOS</div>
                <div class="value">vCPU: {{vcpu}}<br>RAM: {{ram}}<br>Storage: {{storage}}</div>
            </div>
            
            <div class="field">
                <div class="label">STORAGE TYPE</div>
                <div class="value">{{storage_type}}</div>
            </div>
            
            <div class="field">
                <div class="label">BACKUP</div>
                <div class="value">{{backup_option}}</div>
            </div>
            
            <div class="field">
                <div class="label">ADDONS</div>
                <div class="value">{{addons}}</div>
            </div>
            
            <p>Nossa equipe entrará em contato em breve!</p>
            <p>Atenciosamente,<br><strong>GLV Tecnologia</strong></p>
        </div>
    </div>
</body>
</html>
```

- Salve e copie **Template ID**

## 4️⃣ Criar `.env.local`

Na raiz do projeto (`c:\projetosglv\siteglv`), crie arquivo `.env.local`:

```
VITE_EMAILJS_PUBLIC_KEY=seu_public_key_aqui
VITE_EMAILJS_SERVICE_ID=service_glv
VITE_EMAILJS_TEMPLATE_ID=template_server_config
```

**Substitua pelos seus dados do EmailJS**

## 5️⃣ Testar

```bash
npm run dev
```

Acesse: http://localhost:5173/personalizar/redes-servidores

✅ Pronto! Formulário está funcionando!

---

## 🎯 O que Funciona

✅ **Multi-etapas**: 3 passos até envio  
✅ **AWS Profissional**: Tipos reais de instâncias  
✅ **Cálculo de Custos**: Em tempo real  
✅ **Email Automático**: Proposta enviada para cliente  
✅ **Armazenamento Local**: Backup em localStorage  
✅ **Responsivo**: Funciona em mobile/tablet/desktop  
✅ **Modal de Sucesso**: Confirmação visual  

---

## 🔗 Links Importantes

- EmailJS Dashboard: https://dashboard.emailjs.com
- Documentação: `/CONFIGURACAO_FORMULARIO_SERVIDOR.md`
- Setup Detalhado: `/SETUP_FORMULARIO.md`

---

**Pronto para produção!** 🚀
