DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'agendamentos'
          AND column_name = 'status'
    ) THEN
        ALTER TABLE "agendamentos"
            ADD COLUMN "status" VARCHAR(40) NOT NULL DEFAULT 'AGUARDANDO_AGENDAMENTO';
    END IF;
END $$;

UPDATE "agendamentos"
SET "status" = CASE
    WHEN "status" IN ('A visitar', 'a_visitar', 'Aguardando agendamento', 'aguardando_agendamento', 'AGUARDANDO_AGENDAMENTO')
        THEN 'AGUARDANDO_AGENDAMENTO'
    WHEN "status" IN ('Visita marcada para hoje', 'visita_marcada_hoje', 'VISITA_MARCADA_PARA_HOJE')
        THEN 'VISITA_MARCADA_PARA_HOJE'
    WHEN "status" IN ('Visitado', 'visitado', 'VISITADO')
        THEN 'VISITADO'
    ELSE 'AGUARDANDO_AGENDAMENTO'
END;

UPDATE "agendamentos"
SET "status" = 'VISITADO'
WHERE "id_user" IS NOT NULL;

ALTER TABLE "agendamentos"
    DROP CONSTRAINT IF EXISTS "agendamentos_status_check";

ALTER TABLE "agendamentos"
    ADD CONSTRAINT "agendamentos_status_check"
    CHECK ("status" IN ('AGUARDANDO_AGENDAMENTO', 'VISITA_MARCADA_PARA_HOJE', 'VISITADO'));
