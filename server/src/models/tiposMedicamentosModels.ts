import prismaClient from "../tools/prisma";

interface ITipoMedicamento {
    descricao: string;
}

interface IUpdateTipoMedicamento {
    descricao?: string;
}

//Modelo de criar tipo de medicamento
class CreateTipoMedicamentoModel {
    async execute({ descricao }: ITipoMedicamento) {
        if (!descricao || descricao.trim() === '') {
            throw new Error("Descrição é obrigatória");
        }

        const tipoMedicamento = await prismaClient.tiposMedicamentos.create({
            data: {
                descricao: descricao.trim()
            }
        });
        return tipoMedicamento;
    }
}

//Modelo de listar tipos de medicamentos
class ListTiposMedicamentosModel {
    async execute() {
        const tiposMedicamentos = await prismaClient.tiposMedicamentos.findMany({
            orderBy: {
                descricao: 'asc'
            }
        });
        return tiposMedicamentos;
    }
}

//Modelo de visualizar tipo de medicamento
class GetTipoMedicamentoModel {
    async execute(id: number) {
        const tipoMedicamento = await prismaClient.tiposMedicamentos.findUnique({
            where: {
                id: id
            }
        });
        
        if (!tipoMedicamento) {
            throw new Error("Tipo de medicamento não encontrado");
        }
        
        return tipoMedicamento;
    }
}

//Modelo de editar tipo de medicamento
class UpdateTipoMedicamentoModel {
    async execute(id: number, data: IUpdateTipoMedicamento) {
        const tipoMedicamentoExists = await prismaClient.tiposMedicamentos.findUnique({
            where: { id: id }
        });
        
        if (!tipoMedicamentoExists) {
            throw new Error("Tipo de medicamento não encontrado");
        }
        
        const updateData: any = {};
        if (data.descricao) {
            updateData.descricao = data.descricao.trim();
        }
        
        const tipoMedicamento = await prismaClient.tiposMedicamentos.update({
            where: {
                id: id
            },
            data: updateData
        });
        
        return tipoMedicamento;
    }
}

//Modelo de deletar tipo de medicamento
class DeleteTipoMedicamentoModel {
    async execute(id: number) {
        const tipoMedicamentoExists = await prismaClient.tiposMedicamentos.findUnique({
            where: { id: id }
        });
        
        if (!tipoMedicamentoExists) {
            throw new Error("Tipo de medicamento não encontrado");
        }
        
        await prismaClient.tiposMedicamentos.delete({
            where: {
                id: id
            }
        });
        
        return { message: "Tipo de medicamento deletado com sucesso" };
    }
}

export { 
    CreateTipoMedicamentoModel, 
    ListTiposMedicamentosModel, 
    GetTipoMedicamentoModel, 
    UpdateTipoMedicamentoModel, 
    DeleteTipoMedicamentoModel 
}

