-- CreateTable
CREATE TABLE IF NOT EXISTS solicitacoes (
    id SERIAL NOT NULL,
    qtde INTEGER NOT NULL,
    id_lotes INTEGER NOT NULL,
    id_pacientes INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pendente',
    created TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT solicitacoes_pkey PRIMARY KEY (id)
);

-- AddForeignKey
ALTER TABLE solicitacoes ADD CONSTRAINT solicitacoes_id_lotes_fkey FOREIGN KEY (id_lotes) REFERENCES lotes(id) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE solicitacoes ADD CONSTRAINT solicitacoes_id_pacientes_fkey FOREIGN KEY (id_pacientes) REFERENCES pacientes(id) ON DELETE RESTRICT ON UPDATE CASCADE;
