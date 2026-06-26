"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLoteModel = exports.UpdateLoteModel = exports.GetLoteModel = exports.ListLotesDisponiveisModel = exports.ListLotesModel = exports.CreateLoteModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
function parseBrDateDayRange(q) {
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
//Modelo de criar lote
class CreateLoteModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento }) {
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
            const medicamento = yield prisma_1.default.medicamentos.findUnique({
                where: { id: id_medicamento }
            });
            if (!medicamento) {
                throw new Error("Medicamento não encontrado");
            }
            // Validar se forma farmacêutica existe
            const formaFarmaceutica = yield prisma_1.default.formasFarmaceuticas.findUnique({
                where: { id: id_forma_farmaceutica }
            });
            if (!formaFarmaceutica) {
                throw new Error("Forma farmacêutica não encontrada");
            }
            // Validar se tipo de medicamento existe
            const tipoMedicamento = yield prisma_1.default.tiposMedicamentos.findUnique({
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
            const lote = yield prisma_1.default.lotes.create({
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
        });
    }
}
exports.CreateLoteModel = CreateLoteModel;
//Modelo de listar lotes
class ListLotesModel {
    execute(p, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const base = {
                include: {
                    medicamento: true,
                    formaFarmaceutica: true,
                    tipoMedicamento: true
                },
                orderBy: {
                    created: 'desc'
                }
            };
            const and = [];
            if ((opts === null || opts === void 0 ? void 0 : opts.idMedicamento) != null && !Number.isNaN(opts.idMedicamento)) {
                and.push({ id_medicamento: opts.idMedicamento });
            }
            const q = (_a = opts === null || opts === void 0 ? void 0 : opts.q) === null || _a === void 0 ? void 0 : _a.trim();
            const campo = ((opts === null || opts === void 0 ? void 0 : opts.campo) || "numero").toLowerCase();
            if (q) {
                switch (campo) {
                    case "medicamento":
                        and.push({ medicamento: { descricao: { contains: q, mode: "insensitive" } } });
                        break;
                    case "principioativo":
                        and.push({ medicamento: { principioativo: { contains: q, mode: "insensitive" } } });
                        break;
                    case "formafarmaceutica":
                        and.push({ formaFarmaceutica: { descricao: { contains: q, mode: "insensitive" } } });
                        break;
                    case "tipomedicamento":
                        and.push({ tipoMedicamento: { descricao: { contains: q, mode: "insensitive" } } });
                        break;
                    case "quantidade": {
                        const n = parseInt(String(q).replace(/\D/g, ""), 10);
                        if (!Number.isNaN(n)) {
                            and.push({ qtde: n });
                        }
                        break;
                    }
                    case "datafabricacao": {
                        const dr = parseBrDateDayRange(q);
                        if (dr) {
                            and.push({ datafabricacao: { gte: dr.gte, lt: dr.lt } });
                        }
                        break;
                    }
                    case "datavencimento": {
                        const dr = parseBrDateDayRange(q);
                        if (dr) {
                            and.push({ datavencimento: { gte: dr.gte, lt: dr.lt } });
                        }
                        break;
                    }
                    case "numero":
                    default:
                        and.push({ numero: { contains: q, mode: "insensitive" } });
                }
            }
            const where = and.length ? { AND: and } : {};
            const [total, items] = yield Promise.all([
                prisma_1.default.lotes.count({ where }),
                prisma_1.default.lotes.findMany(Object.assign(Object.assign({}, base), { where, skip: p.skip, take: p.take })),
            ]);
            return { items, total };
        });
    }
}
exports.ListLotesModel = ListLotesModel;
//Modelo de listar lotes disponíveis (público - apenas não vencidos e com estoque)
class ListLotesDisponiveisModel {
    execute(p) {
        return __awaiter(this, void 0, void 0, function* () {
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
                include: {
                    medicamento: true,
                    formaFarmaceutica: true,
                    tipoMedicamento: true
                },
                orderBy: {
                    datavencimento: 'asc'
                }
            };
            const [total, items] = yield Promise.all([
                prisma_1.default.lotes.count({ where }),
                prisma_1.default.lotes.findMany(Object.assign(Object.assign({}, base), { skip: p.skip, take: p.take })),
            ]);
            return { items, total };
        });
    }
}
exports.ListLotesDisponiveisModel = ListLotesDisponiveisModel;
//Modelo de visualizar lote
class GetLoteModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lote = yield prisma_1.default.lotes.findUnique({
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
        });
    }
}
exports.GetLoteModel = GetLoteModel;
//Modelo de editar lote
class UpdateLoteModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const loteExists = yield prisma_1.default.lotes.findUnique({
                where: { id: id }
            });
            if (!loteExists) {
                throw new Error("Lote não encontrado");
            }
            const updateData = {};
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
                const medicamento = yield prisma_1.default.medicamentos.findUnique({
                    where: { id: data.id_medicamento }
                });
                if (!medicamento) {
                    throw new Error("Medicamento não encontrado");
                }
                updateData.id_medicamento = data.id_medicamento;
            }
            if (data.id_forma_farmaceutica !== undefined) {
                const formaFarmaceutica = yield prisma_1.default.formasFarmaceuticas.findUnique({
                    where: { id: data.id_forma_farmaceutica }
                });
                if (!formaFarmaceutica) {
                    throw new Error("Forma farmacêutica não encontrada");
                }
                updateData.id_forma_farmaceutica = data.id_forma_farmaceutica;
            }
            if (data.id_tipo_medicamento !== undefined) {
                const tipoMedicamento = yield prisma_1.default.tiposMedicamentos.findUnique({
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
            const lote = yield prisma_1.default.lotes.update({
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
        });
    }
}
exports.UpdateLoteModel = UpdateLoteModel;
//Modelo de deletar lote
class DeleteLoteModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const loteExists = yield prisma_1.default.lotes.findUnique({
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
            yield prisma_1.default.lotes.delete({
                where: {
                    id: id
                }
            });
            return { message: "Lote deletado com sucesso" };
        });
    }
}
exports.DeleteLoteModel = DeleteLoteModel;
