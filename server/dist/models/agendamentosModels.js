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
exports.DeleteAgendamentoModel = exports.AtualizarStatusAgendamentoModel = exports.MarcarVisitadoModel = exports.UpdateAgendamentoModel = exports.GetAgendamentoModel = exports.ListAgendamentosModel = exports.CreateAgendamentosModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
const safeGoogleMapsUrl_1 = require("../utils/safeGoogleMapsUrl");
function isAgendamentoStatus(value) {
    return value === "AGUARDANDO_AGENDAMENTO" || value === "VISITA_MARCADA_PARA_HOJE" || value === "VISITADO";
}
function validateStatusTransition(current, next, allowRollback = true) {
    if (current === next)
        return;
    if (allowRollback)
        return;
    const allowedForward = {
        AGUARDANDO_AGENDAMENTO: ["VISITA_MARCADA_PARA_HOJE"],
        VISITA_MARCADA_PARA_HOJE: ["VISITADO"],
        VISITADO: [],
    };
    if (!allowedForward[current].includes(next)) {
        throw new Error("Transição de status inválida");
    }
}
//Modelo de criar agendamento
class CreateAgendamentosModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome, endereco, numero, setor, cep, telefone, datavisita, fotos, google_maps_url, id_turno, id_user }) {
            const agendamento = yield prisma_1.default.agendamentos.create({
                data: {
                    nome: nome,
                    endereco: endereco,
                    numero: numero,
                    setor: setor,
                    cep: cep,
                    telefone: telefone,
                    datavisita: datavisita,
                    fotos: fotos || null,
                    google_maps_url: google_maps_url || null,
                    id_turno: id_turno,
                    id_user: id_user,
                    status: "AGUARDANDO_AGENDAMENTO",
                },
                include: {
                    turno: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            });
            return agendamento;
        });
    }
}
exports.CreateAgendamentosModel = CreateAgendamentosModel;
//Modelo de listar agendamentos
class ListAgendamentosModel {
    execute(p, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const t = (_a = opts === null || opts === void 0 ? void 0 : opts.q) === null || _a === void 0 ? void 0 : _a.trim();
            const filtroStatus = opts === null || opts === void 0 ? void 0 : opts.status;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const andParts = [];
            if (filtroStatus) {
                andParts.push({ status: filtroStatus });
            }
            if (t) {
                const digits = t.replace(/\D/g, "");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const OR = [
                    { nome: { contains: t, mode: "insensitive" } },
                    { endereco: { contains: t, mode: "insensitive" } },
                    { setor: { contains: t, mode: "insensitive" } },
                ];
                if (digits.length > 0) {
                    OR.push({ telefone: { contains: digits } });
                }
                andParts.push({ OR });
            }
            const where = andParts.length > 0 ? { AND: andParts } : {};
            const base = {
                where,
                include: {
                    turno: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                },
                orderBy: {
                    created: 'desc'
                }
            };
            const [total, items] = yield Promise.all([
                prisma_1.default.agendamentos.count({ where }),
                prisma_1.default.agendamentos.findMany(Object.assign(Object.assign({}, base), { skip: p.skip, take: p.take })),
            ]);
            return { items, total };
        });
    }
}
exports.ListAgendamentosModel = ListAgendamentosModel;
//Modelo de visualizar agendamento
class GetAgendamentoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const agendamento = yield prisma_1.default.agendamentos.findUnique({
                where: {
                    id: id
                },
                include: {
                    turno: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            });
            if (!agendamento) {
                throw new Error("Agendamento não encontrado");
            }
            return agendamento;
        });
    }
}
exports.GetAgendamentoModel = GetAgendamentoModel;
//Modelo de editar agendamento
class UpdateAgendamentoModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verificar se o agendamento existe
            const agendamentoExists = yield prisma_1.default.agendamentos.findUnique({
                where: { id: id }
            });
            if (!agendamentoExists) {
                throw new Error("Agendamento não encontrado");
            }
            const updateData = {};
            if (data.nome)
                updateData.nome = data.nome;
            if (data.endereco)
                updateData.endereco = data.endereco;
            if (data.numero)
                updateData.numero = data.numero;
            if (data.setor)
                updateData.setor = data.setor;
            if (data.cep)
                updateData.cep = data.cep;
            if (data.telefone)
                updateData.telefone = data.telefone;
            if (data.datavisita !== undefined)
                updateData.datavisita = data.datavisita;
            if (data.fotos !== undefined)
                updateData.fotos = data.fotos;
            if (data.google_maps_url !== undefined) {
                updateData.google_maps_url = (0, safeGoogleMapsUrl_1.parseAndValidateGoogleMapsUrl)(data.google_maps_url);
            }
            if (data.id_turno)
                updateData.id_turno = data.id_turno;
            if (data.id_user !== undefined)
                updateData.id_user = data.id_user;
            if (data.status !== undefined) {
                if (!isAgendamentoStatus(data.status)) {
                    throw new Error("Status de agendamento inválido");
                }
                const currentStatus = agendamentoExists.status || "AGUARDANDO_AGENDAMENTO";
                validateStatusTransition(currentStatus, data.status, true);
                updateData.status = data.status;
                if (data.status !== "VISITADO") {
                    updateData.id_user = null;
                }
                else if (updateData.id_user === undefined && agendamentoExists.id_user == null) {
                    throw new Error("É necessário informar o usuário responsável ao marcar como visitado");
                }
            }
            const agendamento = yield prisma_1.default.agendamentos.update({
                where: {
                    id: id
                },
                data: updateData,
                include: {
                    turno: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            });
            return agendamento;
        });
    }
}
exports.UpdateAgendamentoModel = UpdateAgendamentoModel;
//Modelo de marcar agendamento como visitado
class MarcarVisitadoModel {
    execute(id, idUserVisitou) {
        return __awaiter(this, void 0, void 0, function* () {
            const agendamentoExists = yield prisma_1.default.agendamentos.findUnique({
                where: { id: id }
            });
            if (!agendamentoExists) {
                throw new Error("Agendamento não encontrado");
            }
            const currentStatus = agendamentoExists.status || "AGUARDANDO_AGENDAMENTO";
            if (currentStatus === "VISITADO") {
                throw new Error("Agendamento já foi visitado");
            }
            if (currentStatus !== "VISITA_MARCADA_PARA_HOJE") {
                throw new Error("Para concluir a visita, primeiro marque como 'Visita marcada para hoje'");
            }
            const agendamento = yield prisma_1.default.agendamentos.update({
                where: {
                    id: id
                },
                data: {
                    id_user: idUserVisitou,
                    status: "VISITADO"
                },
                include: {
                    turno: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            });
            return agendamento;
        });
    }
}
exports.MarcarVisitadoModel = MarcarVisitadoModel;
class AtualizarStatusAgendamentoModel {
    execute(id, status, idUserVisitou) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!isAgendamentoStatus(status)) {
                throw new Error("Status de agendamento inválido");
            }
            const agendamentoExists = yield prisma_1.default.agendamentos.findUnique({
                where: { id },
            });
            if (!agendamentoExists) {
                throw new Error("Agendamento não encontrado");
            }
            const currentStatus = agendamentoExists.status || "AGUARDANDO_AGENDAMENTO";
            validateStatusTransition(currentStatus, status, false);
            if (status === "VISITADO" && (!idUserVisitou || Number.isNaN(idUserVisitou))) {
                throw new Error("É necessário informar o usuário responsável ao marcar como visitado");
            }
            const agendamento = yield prisma_1.default.agendamentos.update({
                where: { id },
                data: {
                    status,
                    id_user: status === "VISITADO" ? idUserVisitou : null,
                },
                include: {
                    turno: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true,
                        },
                    },
                },
            });
            return agendamento;
        });
    }
}
exports.AtualizarStatusAgendamentoModel = AtualizarStatusAgendamentoModel;
//Modelo de deletar agendamento
class DeleteAgendamentoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const agendamentoExists = yield prisma_1.default.agendamentos.findUnique({
                where: { id: id }
            });
            if (!agendamentoExists) {
                throw new Error("Agendamento não encontrado");
            }
            yield prisma_1.default.agendamentos.delete({
                where: {
                    id: id
                }
            });
            return { message: "Agendamento deletado com sucesso" };
        });
    }
}
exports.DeleteAgendamentoModel = DeleteAgendamentoModel;
