// Mapeamento de rotas para permissões necessárias
export const routePermissions: Record<string, string> = {
    // Agendamentos
    '/agendamentos': 'agendamentos.ver',
    '/agendamentos/list': 'agendamentos.ver',
    '/agendamentos/novo': 'agendamentos.criar',
    '/agendamentos/[id]': 'agendamentos.ver',
    '/agendamentos/[id]/editar': 'agendamentos.editar',
    
    // Medicamentos
    '/medicamentos': 'medicamentos.ver',
    '/medicamentos/list': 'medicamentos.ver',
    '/medicamentos/novo': 'medicamentos.criar',
    '/medicamentos/[id]': 'medicamentos.ver',
    '/medicamentos/[id]/editar': 'medicamentos.editar',
    
    // Tipos de Medicamentos
    '/tipos-medicamentos': 'tipos_medicamentos.ver',
    '/tipos-medicamentos/novo': 'tipos_medicamentos.criar',
    '/tipos-medicamentos/[id]': 'tipos_medicamentos.ver',
    '/tipos-medicamentos/[id]/editar': 'tipos_medicamentos.editar',
    '/medicamentos/tipos-medicamentos': 'tipos_medicamentos.ver',
    '/medicamentos/tipos-medicamentos/novo': 'tipos_medicamentos.criar',
    '/medicamentos/tipos-medicamentos/[id]': 'tipos_medicamentos.ver',
    '/medicamentos/tipos-medicamentos/[id]/editar': 'tipos_medicamentos.editar',
    
    // Formas Farmacêuticas
    '/formas-farmaceuticas': 'formas_farmaceuticas.ver',
    '/formas-farmaceuticas/novo': 'formas_farmaceuticas.criar',
    '/formas-farmaceuticas/[id]': 'formas_farmaceuticas.ver',
    '/formas-farmaceuticas/[id]/editar': 'formas_farmaceuticas.editar',
    
    // Lotes
    '/lotes': 'lotes.ver',
    '/lotes/novo': 'lotes.criar',
    '/lotes/[id]': 'lotes.ver',
    '/lotes/[id]/editar': 'lotes.editar',
    
    // Pacientes e Doações (permite acesso com qualquer uma das permissões)
    '/pacientes-doacoes': 'pacientes.ver', // Verifica ambas as permissões no componente
    
    // Pacientes
    '/pacientes': 'pacientes.ver',
    '/pacientes/novo': 'pacientes.criar',
    '/pacientes/[id]': 'pacientes.ver',
    '/pacientes/[id]/editar': 'pacientes.editar',
    
    // Retiradas
    '/retiradas': 'retiradas.ver',
    '/retiradas/novo': 'retiradas.criar',
    '/retiradas/[id]': 'retiradas.ver',
    '/retiradas/[id]/editar': 'retiradas.editar',
    
    // Solicitações (pré-retiradas)
    '/solicitacoes': 'retiradas.ver',
    
    // Usuários e Grupos (apenas admin)
    '/users': 'admin', // Requer isAdmin
    '/users/list': 'admin',
    '/users/novo': 'admin',
    '/users/[id]': 'admin',
    '/users/[id]/editar': 'admin',
    '/permissoes': 'admin',
    '/permissoes/permissoes': 'admin',
    '/permissoes/permissoes/list': 'admin',
    '/permissoes/permissoes/novo': 'admin',
    '/permissoes/permissoes/[id]': 'admin',
    '/permissoes/permissoes/[id]/editar': 'admin',
    '/permissoes/grupos': 'admin',
    '/permissoes/grupos/list': 'admin',
    '/permissoes/grupos/novo': 'admin',
    '/permissoes/grupos/[id]': 'admin',
    '/permissoes/grupos/[id]/editar': 'admin',
};

/**
 * Obtém a permissão necessária para uma rota
 */
export function getRequiredPermission(pathname: string): string | null {
    // Verificar rota exata primeiro
    if (routePermissions[pathname]) {
        return routePermissions[pathname];
    }
    
    // Verificar rotas dinâmicas (com [id]) - ordem específica primeiro
    const dynamicRoutes = Object.entries(routePermissions)
        .filter(([route]) => route.includes('[id]'))
        .sort((a, b) => b[0].length - a[0].length); // Ordenar por tamanho (mais específico primeiro)
    
    for (const [route, permission] of dynamicRoutes) {
        // Converter rota dinâmica em regex
        const routePattern = route
            .replace(/\[id\]/g, '\\d+')
            .replace(/\//g, '\\/');
        const regex = new RegExp(`^${routePattern}$`);
        
        if (regex.test(pathname)) {
            return permission;
        }
    }
    
    // Verificar se começa com alguma rota (ordem específica primeiro)
    const staticRoutes = Object.entries(routePermissions)
        .filter(([route]) => !route.includes('[id]'))
        .sort((a, b) => b[0].length - a[0].length); // Ordenar por tamanho (mais específico primeiro)
    
    for (const [route, permission] of staticRoutes) {
        if (pathname.startsWith(route)) {
            // Verificar se é exatamente a rota ou se tem uma barra após
            if (pathname === route || pathname.startsWith(route + '/')) {
                return permission;
            }
        }
    }
    
    return null;
}
