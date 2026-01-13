import prismaClient from "../tools/prisma";

class UpdateUserGruposModel {
    async execute(id_user: number, grupos_ids: number[]) {
        const userExists = await prismaClient.users.findUnique({
            where: { id: id_user }
        });

        if (!userExists) {
            throw new Error("Usuário não encontrado");
        }

        // Remover todos os grupos atuais do usuário
        await prismaClient.userRoles.deleteMany({
            where: {
                id_user: id_user
            }
        });

        // Adicionar os novos grupos
        if (grupos_ids.length > 0) {
            await prismaClient.userRoles.createMany({
                data: grupos_ids.map(id_role => ({
                    id_user,
                    id_role
                }))
            });
        }

        const user = await prismaClient.users.findUnique({
            where: { id: id_user },
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

        return user;
    }
}

export { UpdateUserGruposModel };
