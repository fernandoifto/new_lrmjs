-- Alterar tamanho da coluna status
ALTER TABLE solicitacoes ALTER COLUMN status TYPE VARCHAR(30);

-- Atualizar status existentes
UPDATE solicitacoes SET status = 'pendente_de_aprovacao' WHERE status = 'pendente';
UPDATE solicitacoes SET status = 'aprovado_para_retirada' WHERE status = 'confirmada';

-- Atualizar valor padrão
ALTER TABLE solicitacoes ALTER COLUMN status SET DEFAULT 'pendente_de_aprovacao';
