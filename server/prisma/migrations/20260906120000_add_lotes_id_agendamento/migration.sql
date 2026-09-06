-- Vincular lotes a agendamentos de doação (obrigatório).
-- Passo 1: coluna nullable para permitir backfill dos registros legado.
ALTER TABLE "lotes" ADD COLUMN IF NOT EXISTS "id_agendamento" INTEGER;

-- Passo 2: lotes informados (000225446 e 000001124) → agendamento de José Pereira
-- (preferência pelo id 8; fallback pelo nome).
UPDATE "lotes" AS l
SET "id_agendamento" = a.id
FROM (
    SELECT id
    FROM "agendamentos"
    WHERE id = 8
       OR nome ILIKE '%José Pereira%'
       OR nome ILIKE '%Jose Pereira%'
    ORDER BY
        CASE
            WHEN id = 8 THEN 0
            WHEN nome ILIKE '%José Pereira%' OR nome ILIKE '%Jose Pereira%' THEN 1
            ELSE 2
        END,
        id
    LIMIT 1
) AS a
WHERE l.numero IN ('000225446', '000001124')
  AND l."id_agendamento" IS NULL;

-- Passo 3: demais lotes sem vínculo — usa um agendamento concluído existente,
-- ou qualquer agendamento, ou cria um registro de migração legado.
DO $$
DECLARE
    fallback_id INTEGER;
    turno_id INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM "lotes" WHERE "id_agendamento" IS NULL) THEN
        SELECT id INTO fallback_id
        FROM "agendamentos"
        WHERE status = 'VISITADO'
        ORDER BY id
        LIMIT 1;

        IF fallback_id IS NULL THEN
            SELECT id INTO fallback_id
            FROM "agendamentos"
            ORDER BY id
            LIMIT 1;
        END IF;

        IF fallback_id IS NULL THEN
            SELECT id INTO turno_id FROM "turnos" ORDER BY id LIMIT 1;
            IF turno_id IS NULL THEN
                INSERT INTO "turnos" ("descricao", "created", "modified")
                VALUES ('Migração', NOW(), NOW())
                RETURNING id INTO turno_id;
            END IF;

            INSERT INTO "agendamentos" (
                "nome", "endereco", "numero", "setor", "cep", "telefone",
                "id_turno", "status", "visitado", "created", "modified"
            ) VALUES (
                'Migração de lotes legado',
                'Não informado',
                'S/N',
                'Sistema',
                '00000-000',
                '00000000000',
                turno_id,
                'VISITADO',
                true,
                NOW(),
                NOW()
            )
            RETURNING id INTO fallback_id;
        END IF;

        UPDATE "lotes"
        SET "id_agendamento" = fallback_id
        WHERE "id_agendamento" IS NULL;
    END IF;
END $$;

-- Passo 4: obrigatoriedade + integridade referencial.
ALTER TABLE "lotes" ALTER COLUMN "id_agendamento" SET NOT NULL;

ALTER TABLE "lotes"
    DROP CONSTRAINT IF EXISTS "lotes_id_agendamento_fkey";

ALTER TABLE "lotes"
    ADD CONSTRAINT "lotes_id_agendamento_fkey"
    FOREIGN KEY ("id_agendamento") REFERENCES "agendamentos"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

CREATE INDEX IF NOT EXISTS "lotes_id_agendamento_idx" ON "lotes"("id_agendamento");
