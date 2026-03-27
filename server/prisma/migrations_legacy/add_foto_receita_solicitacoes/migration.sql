-- Adicionar campo foto_receita na tabela solicitacoes
ALTER TABLE "solicitacoes" ADD COLUMN IF NOT EXISTS "foto_receita" TEXT;
