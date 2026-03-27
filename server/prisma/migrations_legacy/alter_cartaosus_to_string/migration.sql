-- AlterTable
ALTER TABLE "pacientes" ALTER COLUMN "cartaosus" TYPE VARCHAR(20) USING cartaosus::text;

