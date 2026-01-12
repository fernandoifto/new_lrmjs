-- Script para corrigir sequências do PostgreSQL
-- Execute este script se encontrar erros de "Unique constraint failed on the fields: (`id`)"
-- 
-- Para executar:
-- psql -U postgres -d remed -f fix_sequences.sql
-- OU
-- psql postgresql://postgres:tiifto@localhost:5432/remed -f fix_sequences.sql

-- Corrigir sequência de tipos_medicamentos
SELECT setval('tipos_medicamentos_id_seq', COALESCE((SELECT MAX(id) FROM tipos_medicamentos), 1), true);

-- Corrigir sequência de formas_farmaceuticas
SELECT setval('formas_farmaceuticas_id_seq', COALESCE((SELECT MAX(id) FROM formas_farmaceuticas), 1), true);

-- Corrigir sequência de medicamentos
SELECT setval('medicamentos_id_seq', COALESCE((SELECT MAX(id) FROM medicamentos), 1), true);

-- Corrigir sequência de lotes
SELECT setval('lotes_id_seq', COALESCE((SELECT MAX(id) FROM lotes), 1), true);

-- Corrigir sequência de agendamentos
SELECT setval('agendamentos_id_seq', COALESCE((SELECT MAX(id) FROM agendamentos), 1), true);

-- Corrigir sequência de users
SELECT setval('users_id_seq', COALESCE((SELECT MAX(id) FROM users), 1), true);

-- Corrigir sequência de turnos
SELECT setval('turnos_id_seq', COALESCE((SELECT MAX(id) FROM turnos), 1), true);

-- Corrigir sequência de retiradas
SELECT setval('retiradas_id_seq', COALESCE((SELECT MAX(id) FROM retiradas), 1), true);

-- Corrigir sequência de pacientes
SELECT setval('pacientes_id_seq', COALESCE((SELECT MAX(id) FROM pacientes), 1), true);

-- Mostrar status das sequências
SELECT 
    'tipos_medicamentos' as tabela,
    last_value as ultimo_valor,
    is_called as foi_usado
FROM tipos_medicamentos_id_seq
UNION ALL
SELECT 
    'formas_farmaceuticas' as tabela,
    last_value as ultimo_valor,
    is_called as foi_usado
FROM formas_farmaceuticas_id_seq
UNION ALL
SELECT 
    'medicamentos' as tabela,
    last_value as ultimo_valor,
    is_called as foi_usado
FROM medicamentos_id_seq;
