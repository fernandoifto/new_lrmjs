import prismaClient from "../tools/prisma";
import type { ParsedPagination } from "../utils/pagination";

export const AGENDAMENTO_STATUS_ELEGIVEL_PARA_LOTE = "VISITADO";

const loteInclude = {
    medicamento: true,
    formaFarmaceutica: true,
    tipoMedicamento: true,
    agendamento: {
        select: {
            id: true,
            nome: true,
            status: true,
        },
    },
} as const;

export interface ListLotesFilter {
    q?: string;
    /** Restringe lotes a um medicamento (ex.: tela de detalhe). */
    idMedicamento?: number;
    /** Restringe lotes a um agendamento de doação. */
    idAgendamento?: number;
    sortBy?: "created" | "numero" | "datavencimento" | "qtde";
    sortOrder?: "asc" | "desc";
}

function parseBrDateDayRange(q: string): { gte: Date; lt: Date } | null {
    const m = q.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) {
        return null;
    }
    const d = parseInt(m[1], 10);
    const mo = parseInt(m[2], 10) - 1;
    const y = parseInt(m[3], 10);
    const start = new Date(y, mo, d);
    if (start.getFullYear() !== y || start.getMonth() !== mo || start.getDate() !== d) {
        return null;
    }
    const lt = new Date(start);
    lt.setDate(lt.getDate() + 1);
    return { gte: start, lt };
}

interface ILote {
    numero: string;
    datavencimento: string;
    datafabricacao: string;
    qtde: number;
    id_medicamento: number;
    id_forma_farmaceutica: number;
    id_tipo_medicamento: number;
    id_agendamento: number;
}

interface IUpdateLote {
    numero?: string;
    datavencimento?: string;
    datafabricacao?: string;
    qtde?: number;
    id_medicamento?: number;
    id_forma_farmaceutica?: number;
    id_tipo_medicamento?: number;
    id_agendamento?: number;
}

async function assertAgendamentoElegivelParaLote(id_agendamento: number) {
    if (!id_agendamento || Number.isNaN(id_agendamento)) {
        throw new Error("Agendamento é obrigatório");
    }

    const agendamento = await prismaClient.agendamentos.findUnique({
        where: { id: id_agendamento },
        select: { id: true, status: true, nome: true },
    });

    if (!agendamento) {
        throw new Error("Agendamento não encontrado");
    }

    if (agendamento.status !== AGENDAMENTO_STATUS_ELEGIVEL_PARA_LOTE) {
        throw new Error("Só é possível cadastrar lotes em agendamentos com status Concluída");
    }

    return agendamento;
}

//Modelo de criar lote
class CreateLoteModel {
    async execute({ numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento, id_agendamento }: ILote) {
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

        await assertAgendamentoElegivelParaLote(id_agendamento);

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
                id_tipo_medicamento: id_tipo_medicamento,
                id_agendamento: id_agendamento,
            },
            include: loteInclude,
        });
        return lote;
    }
}

//Modelo de listar lotes
class ListLotesModel {
    async execute(p: ParsedPagination, opts?: ListLotesFilter) {
        const base = {
            include: loteInclude,
            orderBy: {
                [(opts?.sortBy || "created")]: (opts?.sortOrder || "desc")
            } as Record<string, "asc" | "desc">
        };

        const and: object[] = [];
        if (opts?.idMedicamento != null && !Number.isNaN(opts.idMedicamento)) {
            and.push({ id_medicamento: opts.idMedicamento });
        }
        if (opts?.idAgendamento != null && !Number.isNaN(opts.idAgendamento)) {
            and.push({ id_agendamento: opts.idAgendamento });
        }

        const q = opts?.q?.trim();
        if (q) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const OR: any[] = [
                { numero: { contains: q, mode: "insensitive" as const } },
                { medicamento: { descricao: { contains: q, mode: "insensitive" as const } } },
                { medicamento: { principioativo: { contains: q, mode: "insensitive" as const } } },
                { formaFarmaceutica: { descricao: { contains: q, mode: "insensitive" as const } } },
                { tipoMedicamento: { descricao: { contains: q, mode: "insensitive" as const } } },
                { agendamento: { nome: { contains: q, mode: "insensitive" as const } } },
            ];
            const n = parseInt(String(q).replace(/\D/g, ""), 10);
            if (!Number.isNaN(n) && String(q).replace(/\D/g, "") === String(n)) {
                OR.push({ qtde: n });
            }
            const dr = parseBrDateDayRange(q);
            if (dr) {
                OR.push({ datafabricacao: { gte: dr.gte, lt: dr.lt } });
                OR.push({ datavencimento: { gte: dr.gte, lt: dr.lt } });
            }
            and.push({ OR });
        }

        const where = and.length ? { AND: and } : {};
        const [total, items] = await Promise.all([
            prismaClient.lotes.count({ where }),
            prismaClient.lotes.findMany({
                ...base,
                where,
                skip: p.skip,
                take: p.take,
            }),
        ]);
        return { items, total };
    }
}

//Modelo de listar lotes disponíveis (público - apenas não vencidos e com estoque)
class ListLotesDisponiveisModel {
    async execute(p: ParsedPagination) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const where = {
            qtde: {
                gt: 0
            },
            datavencimento: {
                gte: hoje
            }
        };
        const base = {
            where,
            include: loteInclude,
            orderBy: {
                datavencimento: 'asc' as const
            }
        };
        const [total, items] = await Promise.all([
            prismaClient.lotes.count({ where }),
            prismaClient.lotes.findMany({
                ...base,
                skip: p.skip,
                take: p.take,
            }),
        ]);
        return { items, total };
    }
}

//Modelo de visualizar lote
class GetLoteModel {
    async execute(id: number) {
        const lote = await prismaClient.lotes.findUnique({
            where: {
                id: id
            },
            include: loteInclude,
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

        if (data.id_agendamento !== undefined) {
            await assertAgendamentoElegivelParaLote(data.id_agendamento);
            updateData.id_agendamento = data.id_agendamento;
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
            include: loteInclude,
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
    ListLotesDisponiveisModel,
    GetLoteModel, 
    UpdateLoteModel, 
    DeleteLoteModel 
}
