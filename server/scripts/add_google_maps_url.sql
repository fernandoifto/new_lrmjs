-- Script para adicionar campo google_maps_url na tabela agendamentos
-- Execute este script diretamente no banco de dados se a migration do Prisma falhar

ALTER TABLE "agendamentos" ADD COLUMN IF NOT EXISTS "google_maps_url" TEXT;
