import prismaClient from "../tools/prisma";

interface IPermissao {
    nome: string;
    descricao?: string;
    pagina?: string;
    acao?: string;
}

interface IUpdatePermissao {
    nome?: string;
    descricao?: string;
    pagina?: string;
    acao?: string;
}

class CreatePermissaoModel {
    async execute({ nome, descricao, pagina, acao }: IPermissao) {
        if (!nome || nome.trim() === '') {
            throw new Error("Nome é obrigatório");
        }

        const permissaoExists = await prismaClient.permissoes.findFirst({
            where: {
                nome: nome
            }
        });

        if (permissaoExists) {
            throw new Error("Permissão já existe");
        }

        const permissao = await prismaClient.permissoes.create({
            data: {
                nome,
                descricao: descricao || null,
                pagina: pagina || null,
                acao: acao || null
            }
        });

        return permissao;
    }
}

class ListPermissoesModel {
    async execute() {
        const permissoes = await prismaClient.permissoes.findMany({
            orderBy: {
                nome: 'asc'
            }
        });
        return permissoes;
    }
}

class GetPermissaoModel {
    async execute(id: number) {
        const permissao = await prismaClient.permissoes.findUnique({
            where: {
                id: id
            }
        });

        if (!permissao) {
            throw new Error("Permissão não encontrada");
        }

        return permissao;
    }
}

class UpdatePermissaoModel {
    async execute(id: number, data: IUpdatePermissao) {
        const permissaoExists = await prismaClient.permissoes.findUnique({
            where: { id: id }
        });

        if (!permissaoExists) {
            throw new Error("Permissão não encontrada");
        }

        if (data.nome && data.nome.trim() !== '') {
            const permissaoComMesmoNome = await prismaClient.permissoes.findFirst({
                where: {
                    nome: data.nome,
                    id: { not: id }
                }
            });

            if (permissaoComMesmoNome) {
                throw new Error("Já existe uma permissão com este nome");
            }
        }

        const permissao = await prismaClient.permissoes.update({
            where: { id: id },
            data: {
                nome: data.nome,
                descricao: data.descricao,
                pagina: data.pagina,
                acao: data.acao
            }
        });

        return permissao;
    }
}

class DeletePermissaoModel {
    async execute(id: number) {
        const permissaoExists = await prismaClient.permissoes.findUnique({
            where: { id: id }
        });

        if (!permissaoExists) {
            throw new Error("Permissão não encontrada");
        }

        await prismaClient.permissoes.delete({
            where: { id: id }
        });

        return { message: "Permissão excluída com sucesso" };
    }
}

export { CreatePermissaoModel, ListPermissoesModel, GetPermissaoModel, UpdatePermissaoModel, DeletePermissaoModel };

