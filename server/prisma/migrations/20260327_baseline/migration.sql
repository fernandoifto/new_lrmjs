-- CreateTable
CREATE TABLE "agendamentos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "endereco" VARCHAR(200) NOT NULL,
    "numero" VARCHAR(20) NOT NULL,
    "setor" VARCHAR(100) NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "telefone" VARCHAR(50) NOT NULL,
    "datavisita" TEXT,
    "fotos" TEXT,
    "google_maps_url" TEXT,
    "id_turno" INTEGER NOT NULL,
    "id_user" INTEGER,
    "visitado" BOOLEAN NOT NULL DEFAULT false,
    "status" VARCHAR(40) NOT NULL DEFAULT 'AGUARDANDO_AGENDAMENTO',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agendamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turnos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(50) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "turnos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(500),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissoes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" VARCHAR(500),
    "pagina" VARCHAR(200),
    "acao" VARCHAR(100),
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissoes" (
    "id" SERIAL NOT NULL,
    "id_role" INTEGER NOT NULL,
    "id_permissao" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "role_permissoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_role" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(50) NOT NULL,
    "datavencimento" TIMESTAMP(3) NOT NULL,
    "datafabricacao" TIMESTAMP(3) NOT NULL,
    "qtde" INTEGER NOT NULL,
    "id_medicamento" INTEGER NOT NULL,
    "id_forma_farmaceutica" INTEGER NOT NULL,
    "id_tipo_medicamento" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "retiradas" (
    "id" SERIAL NOT NULL,
    "qtde" INTEGER NOT NULL,
    "id_users" INTEGER NOT NULL,
    "id_lotes" INTEGER NOT NULL,
    "id_pacientes" INTEGER NOT NULL,
    "created" TIMESTAMP(3),
    "modified" TIMESTAMP(3),

    CONSTRAINT "retiradas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formas_farmaceuticas" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "formas_farmaceuticas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "medicamentos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(300) NOT NULL,
    "principioativo" VARCHAR(300) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "medicamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipos_medicamentos" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(200) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipos_medicamentos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(200) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "datanascimento" TIMESTAMP(3) NOT NULL,
    "telefone" VARCHAR(20) NOT NULL,
    "cartaosus" VARCHAR(20) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitacoes" (
    "id" SERIAL NOT NULL,
    "qtde" INTEGER NOT NULL,
    "id_lotes" INTEGER NOT NULL,
    "id_pacientes" INTEGER NOT NULL,
    "status" VARCHAR(30) NOT NULL DEFAULT 'pendente_de_aprovacao',
    "foto_receita" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "solicitacoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "role_permissoes_id_role_idx" ON "role_permissoes"("id_role");

-- CreateIndex
CREATE INDEX "role_permissoes_id_permissao_idx" ON "role_permissoes"("id_permissao");

-- CreateIndex
CREATE UNIQUE INDEX "role_permissoes_id_role_id_permissao_key" ON "role_permissoes"("id_role", "id_permissao");

-- CreateIndex
CREATE INDEX "user_roles_id_user_idx" ON "user_roles"("id_user");

-- CreateIndex
CREATE INDEX "user_roles_id_role_idx" ON "user_roles"("id_role");

-- CreateIndex
CREATE UNIQUE INDEX "user_roles_id_user_id_role_key" ON "user_roles"("id_user", "id_role");

-- CreateIndex
CREATE INDEX "retiradas_id_users_idx" ON "retiradas"("id_users");

-- CreateIndex
CREATE INDEX "retiradas_id_lotes_idx" ON "retiradas"("id_lotes");

-- CreateIndex
CREATE INDEX "retiradas_id_pacientes_idx" ON "retiradas"("id_pacientes");

-- CreateIndex
CREATE INDEX "solicitacoes_id_lotes_idx" ON "solicitacoes"("id_lotes");

-- CreateIndex
CREATE INDEX "solicitacoes_id_pacientes_idx" ON "solicitacoes"("id_pacientes");

-- CreateIndex
CREATE INDEX "solicitacoes_status_idx" ON "solicitacoes"("status");

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_id_turno_fkey" FOREIGN KEY ("id_turno") REFERENCES "turnos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendamentos" ADD CONSTRAINT "agendamentos_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissoes" ADD CONSTRAINT "role_permissoes_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "role_permissoes" ADD CONSTRAINT "role_permissoes_id_permissao_fkey" FOREIGN KEY ("id_permissao") REFERENCES "permissoes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_forma_farmaceutica_fkey" FOREIGN KEY ("id_forma_farmaceutica") REFERENCES "formas_farmaceuticas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_medicamento_fkey" FOREIGN KEY ("id_medicamento") REFERENCES "medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_id_tipo_medicamento_fkey" FOREIGN KEY ("id_tipo_medicamento") REFERENCES "tipos_medicamentos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retiradas" ADD CONSTRAINT "retiradas_id_users_fkey" FOREIGN KEY ("id_users") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retiradas" ADD CONSTRAINT "retiradas_id_lotes_fkey" FOREIGN KEY ("id_lotes") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "retiradas" ADD CONSTRAINT "retiradas_id_pacientes_fkey" FOREIGN KEY ("id_pacientes") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacoes" ADD CONSTRAINT "solicitacoes_id_lotes_fkey" FOREIGN KEY ("id_lotes") REFERENCES "lotes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitacoes" ADD CONSTRAINT "solicitacoes_id_pacientes_fkey" FOREIGN KEY ("id_pacientes") REFERENCES "pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

