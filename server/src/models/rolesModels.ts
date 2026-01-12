import prismaClient from "../tools/prisma";

interface IRole {
    nome: string;
    descricao?: string;
}

interface IUpdateRole {
    nome?: string;
    descricao?: string;
}

class CreateRoleModel {
    async execute({ nome, descricao }: IRole) {
        if (!nome || nome.trim() === '') {
            throw new Error("Nome é obrigatório");
        }

        const roleExists = await prismaClient.roles.findFirst({
            where: {
                nome: nome
            }
        });

        if (roleExists) {
            throw new Error("Role já existe");
        }

        const role = await prismaClient.roles.create({
            data: {
                nome,
                descricao: descricao || null
            }
        });

        return role;
    }
}

class ListRolesModel {
    async execute() {
        const roles = await prismaClient.roles.findMany({
            include: {
                _count: {
                    select: {
                        userRoles: true
                    }
                }
            },
            orderBy: {
                nome: 'asc'
            }
        });
        return roles;
    }
}

class GetRoleModel {
    async execute(id: number) {
        const role = await prismaClient.roles.findUnique({
            where: {
                id: id
            },
            include: {
                rolePermissoes: {
                    include: {
                        permissao: true
                    }
                }
            }
        });

        if (!role) {
            throw new Error("Role não encontrada");
        }

        return role;
    }
}

class UpdateRoleModel {
    async execute(id: number, data: IUpdateRole) {
        const roleExists = await prismaClient.roles.findUnique({
            where: { id: id }
        });

        if (!roleExists) {
            throw new Error("Role não encontrada");
        }

        if (data.nome && data.nome.trim() !== '') {
            const roleComMesmoNome = await prismaClient.roles.findFirst({
                where: {
                    nome: data.nome,
                    id: { not: id }
                }
            });

            if (roleComMesmoNome) {
                throw new Error("Já existe uma role com este nome");
            }
        }

        const role = await prismaClient.roles.update({
            where: { id: id },
            data: {
                nome: data.nome,
                descricao: data.descricao
            }
        });

        return role;
    }
}

class DeleteRoleModel {
    async execute(id: number) {
        const roleExists = await prismaClient.roles.findUnique({
            where: { id: id }
        });

        if (!roleExists) {
            throw new Error("Role não encontrada");
        }

        await prismaClient.roles.delete({
            where: { id: id }
        });

        return { message: "Role excluída com sucesso" };
    }
}

class UpdateRolePermissoesModel {
    async execute(id_role: number, permissoes_ids: number[]) {
        const roleExists = await prismaClient.roles.findUnique({
            where: { id: id_role }
        });

        if (!roleExists) {
            throw new Error("Role não encontrada");
        }

        // Remover todas as permissões atuais
        await prismaClient.rolePermissoes.deleteMany({
            where: {
                id_role: id_role
            }
        });

        // Adicionar as novas permissões
        if (permissoes_ids.length > 0) {
            await prismaClient.rolePermissoes.createMany({
                data: permissoes_ids.map(id_permissao => ({
                    id_role,
                    id_permissao
                }))
            });
        }

        const role = await prismaClient.roles.findUnique({
            where: { id: id_role },
            include: {
                rolePermissoes: {
                    include: {
                        permissao: true
                    }
                }
            }
        });

        return role;
    }
}

class GetUserPermissoesModel {
    async execute(userId: number) {
        const user = await prismaClient.users.findUnique({
            where: { id: userId },
            include: {
                userRoles: {
                    include: {
                        role: {
                            include: {
                                rolePermissoes: {
                                    include: {
                                        permissao: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        // Se for admin, retorna todas as permissões
        if (user.is_admin) {
            const allPermissoes = await prismaClient.permissoes.findMany();
            return allPermissoes.map(p => p.nome);
        }

        // Coletar todas as permissões únicas dos roles do usuário
        const permissoesSet = new Set<string>();
        user.userRoles.forEach(userRole => {
            userRole.role.rolePermissoes.forEach(rp => {
                permissoesSet.add(rp.permissao.nome);
            });
        });

        return Array.from(permissoesSet);
    }
}

export { 
    CreateRoleModel, 
    ListRolesModel, 
    GetRoleModel, 
    UpdateRoleModel, 
    DeleteRoleModel,
    UpdateRolePermissoesModel,
    GetUserPermissoesModel
};

