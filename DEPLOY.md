# Deploy — Coolify + GitHub

Guia para publicar o **GiftMed / LRM** em produção com [Coolify](https://coolify.io) conectado ao GitHub.

Domínio de produção: **https://app.giftmed.org**

---

## Arquitetura

```
Usuário → app.giftmed.org (views :3000)
              ↓ API_INTERNAL_URL (rede interna)
          API (server :3333)
              ↓ DATABASE_URL
          PostgreSQL (giftmed_sys)
```

São **dois serviços** no Coolify (monorepo).

---

## Checklist de preparação do repositório

- [x] Scripts `build:prod` / `start:prod` / `deploy:prod` (API)
- [x] Scripts `build:prod` / `start:prod` (frontend)
- [x] `PORT` e `HOST` dinâmicos na API
- [x] Next.js usa `PORT` do ambiente (Coolify)
- [x] `Dockerfile` de produção em `server/` e `views/`
- [x] `docker-compose.prod.yml` de referência
- [x] `server/.env.example` e `views/.env.production.example`
- [x] Rota `GET /health` na API
- [x] `output: standalone` no Next.js
- [x] `server/dist/` removido do Git (build no deploy)
- [x] CI valida testes (server) e build (views)
- [x] Vulnerabilidades npm corrigidas

---

## Checklist no Coolify (painel)

- [ ] Conectar repositório GitHub
- [ ] Criar serviço **API** (server)
- [ ] Criar serviço **Web** (views)
- [ ] Configurar variáveis de ambiente (API)
- [ ] Configurar `API_INTERNAL_URL` (Web)
- [ ] Volume persistente em `/app/uploads` (API)
- [ ] Domínio `app.giftmed.org` no serviço Web
- [ ] Preencher SMTP (se usar recuperação de senha)
- [ ] Primeiro deploy e teste `/agendar`

---

## Serviço 1 — API (`server/`)

| Campo | Valor |
|-------|-------|
| **Build Pack** | Dockerfile |
| **Dockerfile** | `server/Dockerfile` |
| **Base Directory** | `/server` |
| **Port** | `3333` (ou deixe Coolify definir `PORT`) |
| **Health Check** | `/health` |

### Variáveis de ambiente

Use `server/.env.example` como referência:

```env
NODE_ENV=production
JWT_SECRET=...
FRONTEND_URL=https://app.giftmed.org
FRONTEND_ORIGIN=https://app.giftmed.org
DATABASE_URL=postgresql://...@host:5432/giftmed_sys?sslmode=require
DIRECT_URL=postgresql://...@host:5432/giftmed_sys?sslmode=require
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=...
USE_WHATSAPP_BUSINESS_API=false
AUTO_INIT_WHATSAPP=false
```

### Volume persistente

Monte um volume em:

```
/app/uploads
```

Sem isso, fotos e receitas são perdidas a cada redeploy.

### Migrações

O container executa automaticamente:

```bash
npm run deploy:prod
# = prisma migrate deploy && node dist/server.js
```

---

## Serviço 2 — Frontend (`views/`)

| Campo | Valor |
|-------|-------|
| **Build Pack** | Dockerfile |
| **Dockerfile** | `views/Dockerfile` |
| **Base Directory** | `/views` |
| **Port** | `3000` |
| **Domínio** | `app.giftmed.org` |

### Variáveis de ambiente

```env
NODE_ENV=production
API_INTERNAL_URL=http://<nome-interno-da-api>:3333
```

No Coolify, use a **URL interna** do serviço API (ex.: `http://giftmed-api:3333`).

### Build arg (Dockerfile)

Se o build precisar da URL da API:

```
API_INTERNAL_URL=http://<nome-interno-da-api>:3333
```

---

## Deploy manual (Docker Compose)

```bash
cp server/.env.example server/.env   # preencha
docker compose -f docker-compose.prod.yml up --build -d
```

Acesse: http://localhost:3000

---

## Deploy manual (sem Docker)

```bash
# API
cd server
cp .env.example .env
npm ci
npm run deploy:prod

# Frontend (outro terminal)
cd views
cp .env.production.example .env.production
npm ci
npm run build:prod
npm run start:prod
```

---

## CI (GitHub Actions)

A cada push em `main` / `develop`:

- Testes do server
- Build de produção do views
- Audit npm (high)

---

## Troubleshooting

| Problema | Solução |
|----------|---------|
| **Bad Gateway** em `app.giftmed.org` | O log mostra **Nixpacks** (`nixpacks build`). Troque para **Build Pack: Dockerfile**, Base Directory `/views`, Dockerfile `Dockerfile`, **Porta exposta: 3000**. Confira logs do container (`docker logs`). Se mantiver Nixpacks, o `postbuild` copia assets do standalone — faça redeploy após push. |
| `/agendar` sem turnos | Verifique `API_INTERNAL_URL` no **views** (Runtime) e redeploy. Use `https://api.giftmed.org` ou URL interna Coolify (`http://<servico-api>:3333`) |
| CORS bloqueado | `FRONTEND_ORIGIN=https://app.giftmed.org` (sem `/` no final) |
| Uploads sumindo | Volume em `/app/uploads` no serviço API |
| Build falha Prisma | `DATABASE_URL` acessível no build/deploy |
| Permissão `node_modules` local | `sudo chown -R $USER:$USER server/node_modules views/node_modules` |

---

## Segurança

- **Nunca** commite `.env`, `.envproducao` ou senhas
- Gere `JWT_SECRET` exclusivo: `openssl rand -base64 48`
- SMTP: use senha de app (Gmail) ou credenciais do provedor
