# Variáveis de Ambiente Necessárias

## Configuração do Servidor

Para que o sistema de recuperação de senha funcione corretamente, você precisa configurar as seguintes variáveis de ambiente no servidor:

### Banco de Dados
```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

### JWT Secret
```
JWT_SECRET="seu_secret_jwt_aqui"
```

### Configuração de E-mail (SMTP)

Para o envio de e-mails de recuperação de senha, configure as seguintes variáveis:

#### Exemplo para Gmail:
```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app_gmail
SMTP_FROM=seu_email@gmail.com
```

#### Exemplo para outros provedores:
```
SMTP_HOST=smtp.seu_provedor.com
SMTP_PORT=587
SMTP_USER=seu_email@seu_provedor.com
SMTP_PASS=sua_senha
SMTP_FROM=seu_email@seu_provedor.com
```

### URL do Frontend
```
FRONTEND_URL=http://localhost:3000
```

### Configuração de WhatsApp (Opcional)

Para integração com WhatsApp, configure as seguintes variáveis:

#### Para WhatsApp Web.js (Desenvolvimento/Teste - Padrão):
```env
# Não definir ou definir como false
USE_WHATSAPP_BUSINESS_API=false
```

#### Para WhatsApp Business API (Produção):
```env
USE_WHATSAPP_BUSINESS_API=true
WHATSAPP_ACCESS_TOKEN=seu_access_token_do_meta
WHATSAPP_PHONE_NUMBER_ID=seu_phone_number_id
WHATSAPP_WEBHOOK_VERIFY_TOKEN=seu_token_secreto_para_webhook
WHATSAPP_API_URL=https://graph.facebook.com/v18.0
```

**Nota:** Para mais detalhes sobre configuração do WhatsApp, consulte [WHATSAPP_CONFIG.md](./WHATSAPP_CONFIG.md)

## Configuração do Gmail

Se estiver usando Gmail, você precisará:

1. Ativar a verificação em duas etapas na sua conta Google
2. Gerar uma "Senha de app" em: https://myaccount.google.com/apppasswords
3. Usar essa senha de app no `SMTP_PASS`

## Exemplo de arquivo .env

Crie um arquivo `.env` na pasta `server/` com o seguinte conteúdo:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
JWT_SECRET="seu_secret_jwt_super_seguro_aqui"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app
SMTP_FROM=seu_email@gmail.com
FRONTEND_URL=http://localhost:3000

# WhatsApp (opcional - para desenvolvimento, não definir ou definir como false)
USE_WHATSAPP_BUSINESS_API=false
```

## Notas Importantes

- O token de recuperação de senha expira em 1 hora
- O link de recuperação será enviado para o e-mail cadastrado
- Por segurança, o sistema não informa se o e-mail existe ou não no banco de dados

