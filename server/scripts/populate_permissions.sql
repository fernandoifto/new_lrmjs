-- Script para popular permissões iniciais do sistema
-- Execute este script após criar as tabelas

-- Permissões para Agendamentos
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('agendamentos.ver', 'Ver agendamentos', 'Agendamentos', 'ver', NOW(), NOW()),
('agendamentos.criar', 'Criar agendamentos', 'Agendamentos', 'criar', NOW(), NOW()),
('agendamentos.editar', 'Editar agendamentos', 'Agendamentos', 'editar', NOW(), NOW()),
('agendamentos.excluir', 'Excluir agendamentos', 'Agendamentos', 'excluir', NOW(), NOW()),
('agendamentos.visitar', 'Marcar agendamento como visitado', 'Agendamentos', 'visitar', NOW(), NOW());

-- Permissões para Medicamentos
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('medicamentos.ver', 'Ver medicamentos', 'Medicamentos', 'ver', NOW(), NOW()),
('medicamentos.criar', 'Criar medicamentos', 'Medicamentos', 'criar', NOW(), NOW()),
('medicamentos.editar', 'Editar medicamentos', 'Medicamentos', 'editar', NOW(), NOW()),
('medicamentos.excluir', 'Excluir medicamentos', 'Medicamentos', 'excluir', NOW(), NOW());

-- Permissões para Lotes
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('lotes.ver', 'Ver lotes', 'Lotes', 'ver', NOW(), NOW()),
('lotes.criar', 'Criar lotes', 'Lotes', 'criar', NOW(), NOW()),
('lotes.editar', 'Editar lotes', 'Lotes', 'editar', NOW(), NOW()),
('lotes.excluir', 'Excluir lotes', 'Lotes', 'excluir', NOW(), NOW()),
('lotes.doar', 'Doar medicamentos', 'Lotes', 'doar', NOW(), NOW());

-- Permissões para Pacientes
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('pacientes.ver', 'Ver pacientes', 'Pacientes', 'ver', NOW(), NOW()),
('pacientes.criar', 'Criar pacientes', 'Pacientes', 'criar', NOW(), NOW()),
('pacientes.editar', 'Editar pacientes', 'Pacientes', 'editar', NOW(), NOW()),
('pacientes.excluir', 'Excluir pacientes', 'Pacientes', 'excluir', NOW(), NOW()),
('pacientes.doar', 'Doar para pacientes', 'Pacientes', 'doar', NOW(), NOW());

-- Permissões para Retiradas/Doações
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('retiradas.ver', 'Ver retiradas/doações', 'Retiradas', 'ver', NOW(), NOW()),
('retiradas.criar', 'Criar retiradas/doações', 'Retiradas', 'criar', NOW(), NOW()),
('retiradas.editar', 'Editar retiradas/doações', 'Retiradas', 'editar', NOW(), NOW()),
('retiradas.excluir', 'Excluir retiradas/doações', 'Retiradas', 'excluir', NOW(), NOW());

-- Permissões para Solicitações
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('solicitacoes.ver', 'Ver solicitações', 'Solicitações', 'ver', NOW(), NOW()),
('solicitacoes.criar', 'Criar solicitações', 'Solicitações', 'criar', NOW(), NOW()),
('solicitacoes.confirmar', 'Confirmar solicitações', 'Solicitações', 'confirmar', NOW(), NOW()),
('solicitacoes.recusar', 'Recusar solicitações', 'Solicitações', 'recusar', NOW(), NOW()),
('solicitacoes.excluir', 'Excluir solicitações', 'Solicitações', 'excluir', NOW(), NOW());

-- Permissões para Tipos de Medicamentos
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('tipos_medicamentos.ver', 'Ver tipos de medicamentos', 'Tipos de Medicamentos', 'ver', NOW(), NOW()),
('tipos_medicamentos.criar', 'Criar tipos de medicamentos', 'Tipos de Medicamentos', 'criar', NOW(), NOW()),
('tipos_medicamentos.editar', 'Editar tipos de medicamentos', 'Tipos de Medicamentos', 'editar', NOW(), NOW()),
('tipos_medicamentos.excluir', 'Excluir tipos de medicamentos', 'Tipos de Medicamentos', 'excluir', NOW(), NOW());

-- Permissões para Formas Farmacêuticas
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('formas_farmaceuticas.ver', 'Ver formas farmacêuticas', 'Formas Farmacêuticas', 'ver', NOW(), NOW()),
('formas_farmaceuticas.criar', 'Criar formas farmacêuticas', 'Formas Farmacêuticas', 'criar', NOW(), NOW()),
('formas_farmaceuticas.editar', 'Editar formas farmacêuticas', 'Formas Farmacêuticas', 'editar', NOW(), NOW()),
('formas_farmaceuticas.excluir', 'Excluir formas farmacêuticas', 'Formas Farmacêuticas', 'excluir', NOW(), NOW());

-- Permissões para Usuários
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('usuarios.ver', 'Ver usuários', 'Usuários', 'ver', NOW(), NOW()),
('usuarios.criar', 'Criar usuários', 'Usuários', 'criar', NOW(), NOW()),
('usuarios.editar', 'Editar usuários', 'Usuários', 'editar', NOW(), NOW()),
('usuarios.excluir', 'Excluir usuários', 'Usuários', 'excluir', NOW(), NOW());

-- Permissões para Permissões (meta-permissão)
INSERT INTO permissoes (nome, descricao, pagina, acao, created, modified) VALUES
('permissoes.gerenciar', 'Gerenciar permissões e roles', 'Permissões', 'gerenciar', NOW(), NOW());

