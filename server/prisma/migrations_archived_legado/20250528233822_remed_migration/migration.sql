-- CreateTable
CREATE TABLE "Agendamentos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "endereco" VARCHAR(200) NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "setor" VARCHAR(100) NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "telefone" VARCHAR(50) NOT NULL,
    "datavisita" TEXT,
    "id_turno" INTEGER NOT NULL,
    "id_user" INTEGER,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turnos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Turnos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "role" VARCHAR(100),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lotes" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(50) NOT NULL,
    "datavencimento" TIMESTAMP(3) NOT NULL,
    "datafabricacao" TIMESTAMP(3) NOT NULL,
    "qdte" INTEGER NOT NULL,
    "id_medicamento" INTEGER NOT NULL,
    "id_forma_farmaceutica" INTEGER NOT NULL,
    "id_tipo_medicamento" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Retiradas" (
    "id" SERIAL NOT NULL,
    "qtde" INTEGER NOT NULL,
    "id_users" INTEGER NOT NULL,
    "id_lotes" INTEGER NOT NULL,
    "id_pacientes" INTEGER NOT NULL,
    "created" TIMESTAMP(3),
    "modified" TIMESTAMP(3),

    CONSTRAINT "Retiradas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormasFarmaceuticas" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FormasFarmaceuticas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicamentos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "principioativo" VARCHAR(300) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TiposMedicamentos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TiposMedicamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pacientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "datanascimento" TIMESTAMP(3) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "cartaosus" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pacientes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_id_turno_fkey" FOREIGN KEY ("id_turno") REFERENCES "Turnos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agendamentos" ADD CONSTRAINT "Agendamentos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lotes" ADD CONSTRAINT "Lotes_id_forma_farmaceutica_fkey" FOREIGN KEY ("id_forma_farmaceutica") REFERENCES "FormasFarmaceuticas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lotes" ADD CONSTRAINT "Lotes_id_medicamento_fkey" FOREIGN KEY ("id_medicamento") REFERENCES "Medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lotes" ADD CONSTRAINT "Lotes_id_tipo_medicamento_fkey" FOREIGN KEY ("id_tipo_medicamento") REFERENCES "TiposMedicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retiradas" ADD CONSTRAINT "Retiradas_id_users_fkey" FOREIGN KEY ("id_users") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retiradas" ADD CONSTRAINT "Retiradas_id_lotes_fkey" FOREIGN KEY ("id_lotes") REFERENCES "Lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Retiradas" ADD CONSTRAINT "Retiradas_id_pacientes_fkey" FOREIGN KEY ("id_pacientes") REFERENCES "Pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
