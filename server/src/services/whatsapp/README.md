# Integração WhatsApp - Implementação Inicial

## ✅ O que foi implementado

A integração com WhatsApp foi implementada seguindo uma arquitetura de abstração que permite trocar facilmente entre diferentes implementações.

### Estrutura Criada

```
server/src/services/whatsapp/
├── interfaces/
│   └── IWhatsAppService.ts          # Interface comum
├── implementations/
│   ├── WhatsAppWebService.ts        # Implementação com whatsapp-web.js (gratuito)
│   └── WhatsAppBusinessService.ts   # Implementação com Business API (produção)
├── types.ts                          # Tipos compartilhados
└── whatsappService.ts               # Factory e instância padrão
```

### Funcionalidades

✅ **Envio de mensagens** via WhatsApp  
✅ **Recebimento de mensagens** (via webhook ou event listener)  
✅ **Status da conexão**  
✅ **QR Code** para autenticação (WhatsApp Web.js)  
✅ **Webhook verification** (WhatsApp Business API)  
✅ **Troca fácil entre implementações** (via variável de ambiente)

### Endpoints Criados

- `GET /whatsapp/status` - Status da conexão
- `POST /whatsapp/send` - Enviar mensagem
- `POST /whatsapp/initialize` - Inicializar WhatsApp Web.js
- `GET /whatsapp/webhook` - Verificar webhook (Business API)
- `POST /whatsapp/webhook` - Receber mensagens (Business API)

## 🚀 Como Usar

### 1. Instalar Dependências

```bash
cd server
npm install
```

### 2. Configurar (Opcional)

Por padrão, o sistema usa **WhatsApp Web.js** (gratuito). Não é necessária configuração adicional.

Para usar **WhatsApp Business API**, adicione ao `.env`:

```env
USE_WHATSAPP_BUSINESS_API=true
WHATSAPP_ACCESS_TOKEN=seu_token
WHATSAPP_PHONE_NUMBER_ID=seu_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_token_secreto
```

### 3. Iniciar Servidor

```bash
npm run dev
```

### 4. Inicializar WhatsApp (apenas para WhatsApp Web.js)

Faça uma requisição POST autenticada:

```bash
curl -X POST http://localhost:3333/whatsapp/initialize \
  -H "Authorization: Bearer SEU_TOKEN"
```

Ou escaneie o QR Code que aparecerá nos logs.

### 5. Enviar Mensagem

```bash
curl -X POST http://localhost:3333/whatsapp/send \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "5511999999999",
    "message": "Olá! Esta é uma mensagem de teste."
  }'
```

## 📚 Documentação Completa

Para mais detalhes, consulte:
- [WHATSAPP_CONFIG.md](./WHATSAPP_CONFIG.md) - Guia completo de configuração
- [ENV_VARIABLES.md](./ENV_VARIABLES.md) - Variáveis de ambiente

## 🔄 Migração Futura

Para migrar de WhatsApp Web.js para Business API:

1. Configure as variáveis de ambiente do Business API
2. Reinicie o servidor
3. Pronto! O sistema automaticamente usará a Business API

**Sem necessidade de alterar código!** A abstração permite trocar implementações facilmente.

## ⚠️ Avisos

- **WhatsApp Web.js**: Use apenas para desenvolvimento/teste. Pode violar termos de uso.
- **WhatsApp Business API**: Recomendado para produção. Requer configuração no Meta Business Manager.

## 📝 Próximos Passos Sugeridos

1. Implementar agente de IA para conversação
2. Integrar com sistema de agendamentos
3. Adicionar notificações automáticas
4. Criar interface web para gerenciar WhatsApp

---

**Implementado em:** Janeiro 2025
