import prismaClient from "../tools/prisma";

interface ILote {
    numero: string;
    datavencimento: string;
    datafabricacao: string;
    qtde: number;
    id_medicamento: number;
    id_forma_farmaceutica: number;
    id_tipo_medicamento: number;
}

interface IUpdateLote {
    numero?: string;
    datavencimento?: string;
    datafabricacao?: string;
    qtde?: number;
    id_medicamento?: number;
    id_forma_farmaceutica?: number;
    id_tipo_medicamento?: number;
}

//Modelo de criar lote
class CreateLoteModel {
    async execute({ numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento }: ILote) {
        if (!numero || numero.trim() === '') {
            throw new Error("Número do lote é obrigatório");
        }

        if (!datavencimento) {
            throw new Error("Data de vencimento é obrigatória");
        }

        if (!datafabricacao) {
            throw new Error("Data de fabricação é obrigatória");
        }

        if (qtde === undefined || qtde === null || qtde < 0) {
            throw new Error("Quantidade deve ser um número positivo");
        }

        if (!id_medicamento) {
            throw new Error("Medicamento é obrigatório");
        }

        if (!id_forma_farmaceutica) {
            throw new Error("Forma farmacêutica é obrigatória");
        }

        if (!id_tipo_medicamento) {
            throw new Error("Tipo de medicamento é obrigatório");
        }

        // Validar se medicamento existe
        const medicamento = await prismaClient.medicamentos.findUnique({
            where: { id: id_medicamento }
        });
        if (!medicamento) {
            throw new Error("Medicamento não encontrado");
        }

        // Validar se forma farmacêutica existe
        const formaFarmaceutica = await prismaClient.formasFarmaceuticas.findUnique({
            where: { id: id_forma_farmaceutica }
        });
        if (!formaFarmaceutica) {
            throw new Error("Forma farmacêutica não encontrada");
        }

        // Validar se tipo de medicamento existe
        const tipoMedicamento = await prismaClient.tiposMedicamentos.findUnique({
            where: { id: id_tipo_medicamento }
        });
        if (!tipoMedicamento) {
            throw new Error("Tipo de medicamento não encontrado");
        }

        // Validar datas
        const dataFabricacaoDate = new Date(datafabricacao);
        const dataVencimentoDate = new Date(datavencimento);

        if (isNaN(dataFabricacaoDate.getTime())) {
            throw new Error("Data de fabricação inválida");
        }

        if (isNaN(dataVencimentoDate.getTime())) {
            throw new Error("Data de vencimento inválida");
        }

        // Validar que data de fabricação é anterior à data de vencimento
        if (dataFabricacaoDate >= dataVencimentoDate) {
            throw new Error("Data de fabricação deve ser anterior à data de vencimento");
        }

        const lote = await prismaClient.lotes.create({
            data: {
                numero: numero.trim(),
                datavencimento: dataVencimentoDate,
                datafabricacao: dataFabricacaoDate,
                qtde: qtde,
                id_medicamento: id_medicamento,
                id_forma_farmaceutica: id_forma_farmaceutica,
                id_tipo_medicamento: id_tipo_medicamento
            },
            include: {
                medicamento: true,
                formaFarmaceutica: true,
                tipoMedicamento: true
            }
        });
        return lote;
    }
}

//Modelo de listar lotes
class ListLotesModel {
    async execute() {
        const lotes = await prismaClient.lotes.findMany({
            include: {
                medicamento: true,
                formaFarmaceutica: true,
                tipoMedicamento: true
            },
            orderBy: {
                created: 'desc'
            }
        });
        return lotes;
    }
}

//Modelo de visualizar lote
class GetLoteModel {
    async execute(id: number) {
        const lote = await prismaClient.lotes.findUnique({
            where: {
                id: id
            },
            include: {
                medicamento: true,
                formaFarmaceutica: true,
                tipoMedicamento: true
            }
        });
        
        if (!lote) {
            throw new Error("Lote não encontrado");
        }
        
        return lote;
    }
}

//Modelo de editar lote
class UpdateLoteModel {
    async execute(id: number, data: IUpdateLote) {
        const loteExists = await prismaClient.lotes.findUnique({
            where: { id: id }
        });
        
        if (!loteExists) {
            throw new Error("Lote não encontrado");
        }
        
        const updateData: any = {};
        
        if (data.numero !== undefined) {
            if (data.numero.trim() === '') {
                throw new Error("Número do lote não pode ser vazio");
            }
            updateData.numero = data.numero.trim();
        }
        
        if (data.qtde !== undefined) {
            if (data.qtde < 0) {
                throw new Error("Quantidade deve ser um número positivo");
            }
            updateData.qtde = data.qtde;
        }
        
        if (data.id_medicamento !== undefined) {
            const medicamento = await prismaClient.medicamentos.findUnique({
                where: { id: data.id_medicamento }
            });
            if (!medicamento) {
                throw new Error("Medicamento não encontrado");
            }
            updateData.id_medicamento = data.id_medicamento;
        }
        
        if (data.id_forma_farmaceutica !== undefined) {
            const formaFarmaceutica = await prismaClient.formasFarmaceuticas.findUnique({
                where: { id: data.id_forma_farmaceutica }
            });
            if (!formaFarmaceutica) {
                throw new Error("Forma farmacêutica não encontrada");
            }
            updateData.id_forma_farmaceutica = data.id_forma_farmaceutica;
        }
        
        if (data.id_tipo_medicamento !== undefined) {
            const tipoMedicamento = await prismaClient.tiposMedicamentos.findUnique({
                where: { id: data.id_tipo_medicamento }
            });
            if (!tipoMedicamento) {
                throw new Error("Tipo de medicamento não encontrado");
            }
            updateData.id_tipo_medicamento = data.id_tipo_medicamento;
        }
        
        // Validar datas se fornecidas
        if (data.datafabricacao || data.datavencimento) {
            const dataFabricacaoDate = data.datafabricacao ? new Date(data.datafabricacao) : new Date(loteExists.datafabricacao);
            const dataVencimentoDate = data.datavencimento ? new Date(data.datavencimento) : new Date(loteExists.datavencimento);
            
            if (isNaN(dataFabricacaoDate.getTime())) {
                throw new Error("Data de fabricação inválida");
            }
            
            if (isNaN(dataVencimentoDate.getTime())) {
                throw new Error("Data de vencimento inválida");
            }
            
            if (dataFabricacaoDate >= dataVencimentoDate) {
                throw new Error("Data de fabricação deve ser anterior à data de vencimento");
            }
            
            if (data.datafabricacao) {
                updateData.datafabricacao = dataFabricacaoDate;
            }
            if (data.datavencimento) {
                updateData.datavencimento = dataVencimentoDate;
            }
        }
        
        const lote = await prismaClient.lotes.update({
            where: {
                id: id
            },
            data: updateData,
            include: {
                medicamento: true,
                formaFarmaceutica: true,
                tipoMedicamento: true
            }
        });
        
        return lote;
    }
}

//Modelo de deletar lote
class DeleteLoteModel {
    async execute(id: number) {
        const loteExists = await prismaClient.lotes.findUnique({
            where: { id: id },
            include: {
                retiradas: true
            }
        });
        
        if (!loteExists) {
            throw new Error("Lote não encontrado");
        }
        
        // Verificar se há retiradas associadas
        if (loteExists.retiradas && loteExists.retiradas.length > 0) {
            throw new Error("Não é possível excluir um lote que possui retiradas associadas");
        }
        
        await prismaClient.lotes.delete({
            where: {
                id: id
            }
        });
        
        return { message: "Lote deletado com sucesso" };
    }
}

export { 
    CreateLoteModel, 
    ListLotesModel, 
    GetLoteModel, 
    UpdateLoteModel, 
    DeleteLoteModel 
}

