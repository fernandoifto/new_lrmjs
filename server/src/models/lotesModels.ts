import prismaClient from "../tools/prisma";
import type { ParsedPagination } from "../utils/pagination";
import {
    buildCodigoRastreioLote,
    formatValidadeAammdd,
    parseCodigoRastreio,
    sanitizeNumeroLoteParaCodigo,
} from "../utils/loteRastreio";

export const AGENDAMENTO_STATUS_ELEGIVEL_PARA_LOTE = "VISITADO";

/** Include autenticado (lista/detalhe internos). */
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
    user: {
        select: {
            id: true,
            username: true,
            email: true,
        },
    },
} as const;

/** Select público — sem PII de doador nem dados de staff (nem FKs sensíveis). */
const lotePublicSelect = {
    id: true,
    numero: true,
    datavencimento: true,
    datafabricacao: true,
    qtde: true,
    created: true,
    modified: true,
    medicamento: {
        select: {
            id: true,
            descricao: true,
            principioativo: true,
        },
    },
    formaFarmaceutica: {
        select: {
            id: true,
            descricao: true,
        },
    },
    tipoMedicamento: {
        select: {
            id: true,
            descricao: true,
        },
    },
} as const;

/** Include ampliado para consulta por código de etiqueta. */
const loteRastreioInclude = {
    medicamento: true,
    formaFarmaceutica: true,
    tipoMedicamento: true,
    agendamento: {
        select: {
            id: true,
            nome: true,
            endereco: true,
            numero: true,
            setor: true,
            cep: true,
            telefone: true,
            status: true,
            datavisita: true,
        },
    },
    user: {
        select: {
            id: true,
            username: true,
            email: true,
        },
    },
} as const;

export interface ListLotesFilter {
    q?: string;
    idMedicamento?: number;
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
    id_user: number;
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

type TxClient = Parameters<Parameters<typeof prismaClient.$transaction>[0]>[0];

async function assertAgendamentoElegivelParaLote(
    id_agendamento: number,
    tx: TxClient | typeof prismaClient = prismaClient
) {
    if (!id_agendamento || Number.isNaN(id_agendamento)) {
        throw new Error("Agendamento é obrigatório");
    }

    const agendamento = await tx.agendamentos.findUnique({
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

class CreateLoteModel {
    async execute({
        numero,
        datavencimento,
        datafabricacao,
        qtde,
        id_medicamento,
        id_forma_farmaceutica,
        id_tipo_medicamento,
        id_agendamento,
        id_user,
    }: ILote) {
        if (!numero || numero.trim() === "") {
            throw new Error("Número do lote é obrigatório");
        }
        if (!datavencimento) {
            throw new Error("Data de vencimento é obrigatória");
        }
        if (!datafabricacao) {
            throw new Error("Data de fabricação é obrigatória");
        }
        if (qtde === undefined || qtde === null || !Number.isInteger(qtde) || qtde < 1) {
            throw new Error("Quantidade deve ser um número inteiro positivo");
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
        if (!id_user || Number.isNaN(id_user)) {
            throw new Error("Usuário responsável pela triagem é obrigatório");
        }

        const dataFabricacaoDate = new Date(datafabricacao);
        const dataVencimentoDate = new Date(datavencimento);

        if (isNaN(dataFabricacaoDate.getTime())) {
            throw new Error("Data de fabricação inválida");
        }
        if (isNaN(dataVencimentoDate.getTime())) {
            throw new Error("Data de vencimento inválida");
        }
        if (dataFabricacaoDate >= dataVencimentoDate) {
            throw new Error("Data de fabricação deve ser anterior à data de vencimento");
        }

        return prismaClient.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT id FROM agendamentos WHERE id = ${id_agendamento} FOR UPDATE`;
            await assertAgendamentoElegivelParaLote(id_agendamento, tx);

            const farmaceutico = await tx.users.findUnique({
                where: { id: id_user },
                select: { id: true },
            });
            if (!farmaceutico) {
                throw new Error("Usuário responsável pela triagem não encontrado");
            }

            const medicamento = await tx.medicamentos.findUnique({
                where: { id: id_medicamento },
                select: { id: true },
            });
            if (!medicamento) {
                throw new Error("Medicamento não encontrado");
            }

            const formaFarmaceutica = await tx.formasFarmaceuticas.findUnique({
                where: { id: id_forma_farmaceutica },
                select: { id: true },
            });
            if (!formaFarmaceutica) {
                throw new Error("Forma farmacêutica não encontrada");
            }

            const tipoMedicamento = await tx.tiposMedicamentos.findUnique({
                where: { id: id_tipo_medicamento },
                select: { id: true },
            });
            if (!tipoMedicamento) {
                throw new Error("Tipo de medicamento não encontrado");
            }

            return tx.lotes.create({
                data: {
                    numero: numero.trim(),
                    datavencimento: dataVencimentoDate,
                    datafabricacao: dataFabricacaoDate,
                    qtde,
                    id_medicamento,
                    id_forma_farmaceutica,
                    id_tipo_medicamento,
                    id_agendamento,
                    id_user,
                },
                include: loteInclude,
            });
        });
    }
}

class ListLotesModel {
    async execute(p: ParsedPagination, opts?: ListLotesFilter) {
        const base = {
            include: loteInclude,
            orderBy: {
                [opts?.sortBy || "created"]: opts?.sortOrder || "desc",
            } as Record<string, "asc" | "desc">,
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
                { user: { username: { contains: q, mode: "insensitive" as const } } },
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

class ListLotesDisponiveisModel {
    async execute(p: ParsedPagination) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const where = {
            qtde: { gt: 0 },
            datavencimento: { gte: hoje },
        };
        const [total, items] = await Promise.all([
            prismaClient.lotes.count({ where }),
            prismaClient.lotes.findMany({
                where,
                select: lotePublicSelect,
                orderBy: { datavencimento: "asc" as const },
                skip: p.skip,
                take: p.take,
            }),
        ]);
        return { items, total };
    }
}

class GetLoteModel {
    async execute(id: number) {
        const lote = await prismaClient.lotes.findUnique({
            where: { id },
            include: loteInclude,
        });
        if (!lote) {
            throw new Error("Lote não encontrado");
        }
        return lote;
    }
}

class GetLoteByRastreioModel {
    async execute(codigoRaw: string) {
        const parsed = parseCodigoRastreio(codigoRaw);
        if (!parsed) {
            throw new Error("Código de etiqueta inválido. Use o formato L{id}-{lote}-{validade}[unidade]");
        }

        const lote = await prismaClient.lotes.findUnique({
            where: { id: parsed.idLote },
            include: loteRastreioInclude,
        });
        if (!lote) {
            throw new Error("Etiqueta não encontrada");
        }

        const numeroEsperado = sanitizeNumeroLoteParaCodigo(lote.numero);
        const validadeEsperada = formatValidadeAammdd(lote.datavencimento);
        if (parsed.numero !== numeroEsperado || parsed.validadeAammdd !== validadeEsperada) {
            throw new Error("Etiqueta não encontrada");
        }

        if (parsed.unidade !== null && parsed.unidade > lote.qtde) {
            throw new Error(
                `Unidade ${parsed.unidade} inválida para este lote (quantidade: ${lote.qtde})`
            );
        }

        const codigoBase = buildCodigoRastreioLote({
            id: lote.id,
            numero: lote.numero,
            datavencimento: lote.datavencimento,
        });

        return {
            codigo: parsed.codigo,
            codigoBase,
            unidade: parsed.unidade,
            lote,
        };
    }
}

class UpdateLoteModel {
    async execute(id: number, data: IUpdateLote) {
        const loteExists = await prismaClient.lotes.findUnique({ where: { id } });
        if (!loteExists) {
            throw new Error("Lote não encontrado");
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updateData: Record<string, any> = {};

        if (data.numero !== undefined) {
            if (data.numero.trim() === "") {
                throw new Error("Número do lote não pode ser vazio");
            }
            updateData.numero = data.numero.trim();
        }

        if (data.qtde !== undefined) {
            if (!Number.isInteger(data.qtde) || data.qtde < 1) {
                throw new Error("Quantidade deve ser um número inteiro positivo");
            }
            updateData.qtde = data.qtde;
        }

        if (data.id_medicamento !== undefined) {
            const medicamento = await prismaClient.medicamentos.findUnique({
                where: { id: data.id_medicamento },
                select: { id: true },
            });
            if (!medicamento) {
                throw new Error("Medicamento não encontrado");
            }
            updateData.id_medicamento = data.id_medicamento;
        }

        if (data.id_forma_farmaceutica !== undefined) {
            const formaFarmaceutica = await prismaClient.formasFarmaceuticas.findUnique({
                where: { id: data.id_forma_farmaceutica },
                select: { id: true },
            });
            if (!formaFarmaceutica) {
                throw new Error("Forma farmacêutica não encontrada");
            }
            updateData.id_forma_farmaceutica = data.id_forma_farmaceutica;
        }

        if (data.id_tipo_medicamento !== undefined) {
            const tipoMedicamento = await prismaClient.tiposMedicamentos.findUnique({
                where: { id: data.id_tipo_medicamento },
                select: { id: true },
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

        if (data.datafabricacao || data.datavencimento) {
            const dataFabricacaoDate = data.datafabricacao
                ? new Date(data.datafabricacao)
                : new Date(loteExists.datafabricacao);
            const dataVencimentoDate = data.datavencimento
                ? new Date(data.datavencimento)
                : new Date(loteExists.datavencimento);

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

        return prismaClient.lotes.update({
            where: { id },
            data: updateData,
            include: loteInclude,
        });
    }
}

class DeleteLoteModel {
    async execute(id: number) {
        const loteExists = await prismaClient.lotes.findUnique({
            where: { id },
            select: { id: true },
        });
        if (!loteExists) {
            throw new Error("Lote não encontrado");
        }

        const [retiradasCount, solicitacoesCount] = await Promise.all([
            prismaClient.retiradas.count({ where: { id_lotes: id } }),
            prismaClient.solicitacoes.count({ where: { id_lotes: id } }),
        ]);

        if (retiradasCount > 0) {
            throw new Error("Não é possível excluir um lote que possui retiradas associadas");
        }
        if (solicitacoesCount > 0) {
            throw new Error("Não é possível excluir um lote que possui solicitações associadas");
        }

        await prismaClient.lotes.delete({ where: { id } });
        return { message: "Lote deletado com sucesso" };
    }
}

export {
    CreateLoteModel,
    ListLotesModel,
    ListLotesDisponiveisModel,
    GetLoteModel,
    GetLoteByRastreioModel,
    UpdateLoteModel,
    DeleteLoteModel,
};
