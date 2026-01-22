-- Script para adicionar campo foto_receita na tabela solicitacoes
-- Execute este script diretamente no banco de dados se a migration do Prisma falhar

ALTER TABLE "solicitacoes" ADD COLUMN IF NOT EXISTS "foto_receita" TEXT;
