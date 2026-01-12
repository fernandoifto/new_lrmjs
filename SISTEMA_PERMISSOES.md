# Sistema de Controle de Acesso e Permissões

## Visão Geral

O sistema implementa um controle de acesso baseado em permissões (RBAC - Role-Based Access Control), onde:

- **Administradores** têm acesso total ao sistema
- **Outros usuários** recebem permissões através de **Roles** (papéis)
- Cada **Role** pode ter múltiplas **Permissões** configuradas
- Um usuário pode ter múltiplas **Roles**

## Estrutura do Banco de Dados

### Tabelas Criadas

1. **permissoes**: Armazena todas as permissões disponíveis no sistema
2. **roles**: Armazena os tipos de usuários/papéis
3. **role_permissoes**: Relaciona roles com permissões (many-to-many)
4. **user_roles**: Relaciona usuários com roles (many-to-many)
5. **users**: Adicionado campo `is_admin` (boolean)

## Como Usar

### 1. Configurar um Usuário como Administrador

```sql
UPDATE users SET is_admin = true WHERE id = 1;
```

### 2. Criar uma Nova Role

1. Acesse `/permissoes` no sistema
2. Clique em "Nova Role"
3. Preencha o nome e descrição
4. Clique em "Criar Role"

### 3. Atribuir Permissões a uma Role

1. Acesse `/permissoes`
2. Clique na role desejada
3. Marque as permissões que essa role deve ter
4. Clique em "Salvar Permissões"

### 4. Atribuir Roles a Usuários

(Esta funcionalidade ainda precisa ser implementada na interface, mas pode ser feita via SQL ou API)

```sql
INSERT INTO user_roles (id_user, id_role, created) VALUES (1, 1, NOW());
```

## Permissões Disponíveis

O sistema possui as seguintes permissões pré-configuradas:

### Agendamentos
- `agendamentos.ver`
- `agendamentos.criar`
- `agendamentos.editar`
- `agendamentos.excluir`
- `agendamentos.visitar`

### Medicamentos
- `medicamentos.ver`
- `medicamentos.criar`
- `medicamentos.editar`
- `medicamentos.excluir`

### Lotes
- `lotes.ver`
- `lotes.criar`
- `lotes.editar`
- `lotes.excluir`
- `lotes.doar`

### Pacientes
- `pacientes.ver`
- `pacientes.criar`
- `pacientes.editar`
- `pacientes.excluir`
- `pacientes.doar`

### Retiradas/Doações
- `retiradas.ver`
- `retiradas.criar`
- `retiradas.editar`
- `retiradas.excluir`

### Tipos de Medicamentos
- `tipos_medicamentos.ver`
- `tipos_medicamentos.criar`
- `tipos_medicamentos.editar`
- `tipos_medicamentos.excluir`

### Formas Farmacêuticas
- `formas_farmaceuticas.ver`
- `formas_farmaceuticas.criar`
- `formas_farmaceuticas.editar`
- `formas_farmaceuticas.excluir`

### Usuários
- `usuarios.ver`
- `usuarios.criar`
- `usuarios.editar`
- `usuarios.excluir`

### Permissões
- `permissoes.gerenciar`

## API Endpoints

### Permissões
- `GET /permissoes` - Listar todas as permissões
- `POST /permissao` - Criar nova permissão
- `GET /permissao/:id` - Obter permissão específica
- `PUT /permissao/:id` - Atualizar permissão
- `DELETE /permissao/:id` - Excluir permissão

### Roles
- `GET /roles` - Listar todas as roles
- `POST /role` - Criar nova role
- `GET /role/:id` - Obter role específica com suas permissões
- `PUT /role/:id` - Atualizar role
- `DELETE /role/:id` - Excluir role
- `PUT /role/:id/permissoes` - Atualizar permissões de uma role

### Permissões do Usuário
- `GET /user-permissoes?userId=X` - Obter todas as permissões de um usuário

## Middleware de Verificação

### Backend

Use o middleware `hasPermission` para proteger rotas:

```typescript
import { hasPermission } from "./middlewares/hasPermission";

router.get("/medicamentos", isAuthenticated, hasPermission("medicamentos.ver"), new ListMedicamentosController().handle);
```

### Frontend

Use o hook `usePermissions` nos componentes:

```typescript
import { usePermissions } from '@/hooks/usePermissions';

function MyComponent() {
    const { hasPermission, isAdmin } = usePermissions();
    
    if (!hasPermission('medicamentos.ver') && !isAdmin) {
        return <div>Acesso negado</div>;
    }
    
    return <div>Conteúdo protegido</div>;
}
```

## Próximos Passos

1. Implementar interface para atribuir roles a usuários
2. Aplicar verificação de permissões em todos os componentes do frontend
3. Aplicar middleware de permissões nas rotas do backend
4. Criar página para gerenciar permissões individuais
5. Adicionar logs de auditoria para ações sensíveis

