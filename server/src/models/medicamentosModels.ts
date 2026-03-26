import prismaClient from "../tools/prisma";
import type { ParsedPagination } from "../utils/pagination";

export interface ListMedicamentosFilter {
    q?: string;
    campo?: string;
}

interface IMedicamento {
    descricao: string;
    principioativo: string;
}

interface IUpdateMedicamento {
    descricao?: string;
    principioativo?: string;
}

//Modelo de criar medicamento
class CreateMedicamentoModel {
    async execute({ descricao, principioativo }: IMedicamento) {
        if (!descricao || descricao.trim() === '') {
            throw new Error("Descrição é obrigatória");
        }

        if (!principioativo || principioativo.trim() === '') {
            throw new Error("Princípio ativo é obrigatório");
        }

        const medicamento = await prismaClient.medicamentos.create({
            data: {
                descricao: descricao.trim(),
                principioativo: principioativo.trim()
            }
        });
        return medicamento;
    }
}

//Modelo de listar medicamentos
class ListMedicamentosModel {
    async execute(p: ParsedPagination, opts?: ListMedicamentosFilter) {
        const orderBy = { descricao: 'asc' as const };
        const q = opts?.q?.trim();
        const campo = opts?.campo === "principioativo" ? "principioativo" : "descricao";
        const where =
            q && campo === "principioativo"
                ? { principioativo: { contains: q, mode: "insensitive" as const } }
                : q
                  ? { descricao: { contains: q, mode: "insensitive" as const } }
                  : {};
        const [total, items] = await Promise.all([
            prismaClient.medicamentos.count({ where }),
            prismaClient.medicamentos.findMany({
                where,
                orderBy,
                skip: p.skip,
                take: p.take,
            }),
        ]);
        return { items, total };
    }
}

//Modelo de visualizar medicamento
class GetMedicamentoModel {
    async execute(id: number) {
        const medicamento = await prismaClient.medicamentos.findUnique({
            where: {
                id: id
            }
        });
        
        if (!medicamento) {
            throw new Error("Medicamento não encontrado");
        }
        
        return medicamento;
    }
}

//Modelo de editar medicamento
class UpdateMedicamentoModel {
    async execute(id: number, data: IUpdateMedicamento) {
        const medicamentoExists = await prismaClient.medicamentos.findUnique({
            where: { id: id }
        });
        
        if (!medicamentoExists) {
            throw new Error("Medicamento não encontrado");
        }
        
        const updateData: any = {};
        if (data.descricao) {
            updateData.descricao = data.descricao.trim();
        }
        if (data.principioativo) {
            updateData.principioativo = data.principioativo.trim();
        }
        
        const medicamento = await prismaClient.medicamentos.update({
            where: {
                id: id
            },
            data: updateData
        });
        
        return medicamento;
    }
}

//Modelo de deletar medicamento
class DeleteMedicamentoModel {
    async execute(id: number) {
        const medicamentoExists = await prismaClient.medicamentos.findUnique({
            where: { id: id }
        });
        
        if (!medicamentoExists) {
            throw new Error("Medicamento não encontrado");
        }
        
        await prismaClient.medicamentos.delete({
            where: {
                id: id
            }
        });
        
        return { message: "Medicamento deletado com sucesso" };
    }
}

export { 
    CreateMedicamentoModel, 
    ListMedicamentosModel, 
    GetMedicamentoModel, 
    UpdateMedicamentoModel, 
    DeleteMedicamentoModel 
}

