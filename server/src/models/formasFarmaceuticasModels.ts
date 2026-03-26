import prismaClient from "../tools/prisma";
import type { ParsedPagination } from "../utils/pagination";

interface IFormaFarmaceutica {
    descricao: string;
}

interface IUpdateFormaFarmaceutica {
    descricao?: string;
}

//Modelo de criar forma farmacêutica
class CreateFormaFarmaceuticaModel {
    async execute({ descricao }: IFormaFarmaceutica) {
        if (!descricao || descricao.trim() === '') {
            throw new Error("Descrição é obrigatória");
        }

        const formaFarmaceutica = await prismaClient.formasFarmaceuticas.create({
            data: {
                descricao: descricao.trim()
            }
        });
        return formaFarmaceutica;
    }
}

//Modelo de listar formas farmacêuticas
class ListFormasFarmaceuticasModel {
    async execute(p: ParsedPagination) {
        const orderBy = { descricao: 'asc' as const };
        const [total, items] = await Promise.all([
            prismaClient.formasFarmaceuticas.count(),
            prismaClient.formasFarmaceuticas.findMany({
                orderBy,
                skip: p.skip,
                take: p.take,
            }),
        ]);
        return { items, total };
    }
}

//Modelo de visualizar forma farmacêutica
class GetFormaFarmaceuticaModel {
    async execute(id: number) {
        const formaFarmaceutica = await prismaClient.formasFarmaceuticas.findUnique({
            where: {
                id: id
            }
        });
        
        if (!formaFarmaceutica) {
            throw new Error("Forma farmacêutica não encontrada");
        }
        
        return formaFarmaceutica;
    }
}

//Modelo de editar forma farmacêutica
class UpdateFormaFarmaceuticaModel {
    async execute(id: number, data: IUpdateFormaFarmaceutica) {
        const formaFarmaceuticaExists = await prismaClient.formasFarmaceuticas.findUnique({
            where: { id: id }
        });
        
        if (!formaFarmaceuticaExists) {
            throw new Error("Forma farmacêutica não encontrada");
        }
        
        const updateData: any = {};
        if (data.descricao) {
            updateData.descricao = data.descricao.trim();
        }
        
        const formaFarmaceutica = await prismaClient.formasFarmaceuticas.update({
            where: {
                id: id
            },
            data: updateData
        });
        
        return formaFarmaceutica;
    }
}

//Modelo de deletar forma farmacêutica
class DeleteFormaFarmaceuticaModel {
    async execute(id: number) {
        const formaFarmaceuticaExists = await prismaClient.formasFarmaceuticas.findUnique({
            where: { id: id }
        });
        
        if (!formaFarmaceuticaExists) {
            throw new Error("Forma farmacêutica não encontrada");
        }
        
        await prismaClient.formasFarmaceuticas.delete({
            where: {
                id: id
            }
        });
        
        return { message: "Forma farmacêutica deletada com sucesso" };
    }
}

export { 
    CreateFormaFarmaceuticaModel, 
    ListFormasFarmaceuticasModel, 
    GetFormaFarmaceuticaModel, 
    UpdateFormaFarmaceuticaModel, 
    DeleteFormaFarmaceuticaModel 
}

