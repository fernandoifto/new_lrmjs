# Solução para Migration de Fotos - Erro P3006

## Problema

O Prisma está falhando ao criar o shadow database porque a migration `20250106190000_add_permissions_system` depende de tabelas que não existem no shadow database.

## Solução: Aplicar Migration Manualmente

### Opção 1: Executar SQL Diretamente (Recomendado)

Execute o SQL diretamente no banco de dados:

```sql
ALTER TABLE "agendamentos" ADD COLUMN IF NOT EXISTS "fotos" TEXT;
```

Você pode executar via:
- psql: `psql -U usuario -d remed -f server/scripts/add_fotos_field.sql`
- pgAdmin ou outra ferramenta gráfica
- Terminal: `psql -d remed -c "ALTER TABLE agendamentos ADD COLUMN IF NOT EXISTS fotos TEXT;"`

### Opção 2: Marcar Migration como Aplicada

Após executar o SQL, marque a migration como aplicada:

```bash
cd server
npx prisma migrate resolve --applied add_fotos_field_agendamentos
```

### Opção 3: Usar prisma db push (Alternativa)

Se você não precisa manter histórico de migrations:

```bash
cd server
npx prisma db push
```

Isso aplica as mudanças do schema diretamente no banco sem usar shadow database.

### Opção 4: Desabilitar Shadow Database Temporariamente

Adicione no `schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  shadowDatabaseUrl = env("DATABASE_URL") // Usa o mesmo banco como shadow
}
```

**Nota:** Isso não é recomendado para produção, mas funciona para desenvolvimento.

## Verificação

Após aplicar, verifique se a coluna foi criada:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'agendamentos' AND column_name = 'fotos';
```

## Próximos Passos

1. Execute o SQL manualmente
2. Marque a migration como aplicada (Opção 2)
3. Continue com o desenvolvimento
