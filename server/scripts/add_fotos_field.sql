-- Script para adicionar campo fotos na tabela agendamentos
-- Execute este script diretamente no banco de dados se a migration do Prisma falhar

ALTER TABLE "agendamentos" ADD COLUMN IF NOT EXISTS "fotos" TEXT;
