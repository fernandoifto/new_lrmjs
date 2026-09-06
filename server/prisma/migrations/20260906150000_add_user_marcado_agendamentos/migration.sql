-- Agente que marcou o agendamento para hoje (claim de visita).
ALTER TABLE "agendamentos" ADD COLUMN IF NOT EXISTS "id_user_marcado" INTEGER;

ALTER TABLE "agendamentos"
    DROP CONSTRAINT IF EXISTS "agendamentos_id_user_marcado_fkey";

ALTER TABLE "agendamentos"
    ADD CONSTRAINT "agendamentos_id_user_marcado_fkey"
    FOREIGN KEY ("id_user_marcado") REFERENCES "users"("id")
    ON DELETE SET NULL
    ON UPDATE CASCADE;

CREATE INDEX IF NOT EXISTS "agendamentos_id_user_marcado_idx" ON "agendamentos"("id_user_marcado");
