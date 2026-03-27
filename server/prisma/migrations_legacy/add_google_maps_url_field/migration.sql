-- Adicionar campo google_maps_url na tabela agendamentos
ALTER TABLE "agendamentos" ADD COLUMN IF NOT EXISTS "google_maps_url" TEXT;
