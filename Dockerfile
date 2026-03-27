# syntax=docker/dockerfile:1
# -----------------------------------------------------------------------------
# Dockerfile multi-target — focado em DESENVOLVIMENTO (não use em produção).
# Targets disponíveis (via docker compose build target):
#   - server-dev → API Express + TypeScript (ts-node-dev) + Prisma
#   - views-dev  → Next.js (dev server com Turbopack)
#
# O código-fonte NÃO é copiado aqui: em runtime o docker-compose monta volumes
# (bind mount). Só package.json + lock entram na imagem para cache de npm ci.
# -----------------------------------------------------------------------------

# Imagem base: Node 22 (LTS atual; compatível com Next 16 e React 19)
FROM node:22-bookworm-slim AS base

# OpenSSL/ca-certificates: necessários para Prisma e HTTPS (ex.: Supabase)
RUN apt-get update \
    && apt-get install -y --no-install-recommends openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# -----------------------------------------------------------------------------
# Target: backend (server/)
# Linguagem: TypeScript · Framework: Express 4.x · ORM: Prisma 6.x
# -----------------------------------------------------------------------------
FROM base AS server-dev

# Só manifestos — instalação pesada fica em layer cacheada
COPY server/package.json server/package-lock.json ./

# Instala dependências de forma reprodutível (usa package-lock.json)
RUN npm ci

# Em desenvolvimento o compose sobrescreve com:
#   - bind ./server → /app (código no host)
#   - volume nomeado → /app/node_modules (deps só dentro do container)
# Por isso o CMD só documenta o padrão; o compose passa command com prisma + dev.
CMD ["npm", "run", "dev"]

# -----------------------------------------------------------------------------
# Target: frontend (views/)
# Linguagem: TypeScript · Framework: Next.js 16.x · React 19.x
# -----------------------------------------------------------------------------
FROM base AS views-dev

COPY views/package.json views/package-lock.json ./

RUN npm ci

# No compose usamos `npm run dev:docker` (Webpack) — Turbopack costuma falhar com volumes.
CMD ["npm", "run", "dev:docker"]
