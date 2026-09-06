-- Farmacêutico / usuário responsável pela triagem do lote.
ALTER TABLE "lotes" ADD COLUMN IF NOT EXISTS "id_user" INTEGER;

-- Backfill: lotes legado → admin Fernando (users.username/email; não existe coluna "nome").
UPDATE "lotes"
SET "id_user" = (
    SELECT u.id
    FROM "users" u
    WHERE u.is_admin = true
      AND (
          u.username ILIKE '%fernando%'
          OR u.email ILIKE '%fernando%'
      )
    ORDER BY u.id
    LIMIT 1
)
WHERE "id_user" IS NULL;

-- Fallback: qualquer admin, senão o primeiro usuário do sistema.
DO $$
DECLARE
    fallback_id INTEGER;
BEGIN
    IF EXISTS (SELECT 1 FROM "lotes" WHERE "id_user" IS NULL) THEN
        SELECT id INTO fallback_id
        FROM "users"
        WHERE is_admin = true
        ORDER BY id
        LIMIT 1;

        IF fallback_id IS NULL THEN
            SELECT id INTO fallback_id
            FROM "users"
            ORDER BY id
            LIMIT 1;
        END IF;

        IF fallback_id IS NULL THEN
            RAISE EXCEPTION 'Não há usuários para vincular aos lotes legados (id_user)';
        END IF;

        UPDATE "lotes"
        SET "id_user" = fallback_id
        WHERE "id_user" IS NULL;
    END IF;
END $$;

ALTER TABLE "lotes" ALTER COLUMN "id_user" SET NOT NULL;

ALTER TABLE "lotes"
    DROP CONSTRAINT IF EXISTS "lotes_id_user_fkey";

ALTER TABLE "lotes"
    ADD CONSTRAINT "lotes_id_user_fkey"
    FOREIGN KEY ("id_user") REFERENCES "users"("id")
    ON DELETE RESTRICT
    ON UPDATE CASCADE;

CREATE INDEX IF NOT EXISTS "lotes_id_user_idx" ON "lotes"("id_user");
