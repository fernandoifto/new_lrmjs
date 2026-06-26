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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAgendamentoController = exports.AtualizarStatusAgendamentoController = exports.MarcarVisitadoController = exports.UpdateAgendamentoController = exports.GetAgendamentoController = exports.ListAgendamentosController = exports.CreateAgendamentosController = void 0;
const pagination_1 = require("../utils/pagination");
const agendamentosModels_1 = require("../models/agendamentosModels");
const upload_1 = require("../middlewares/upload");
const responseTransforms_1 = require("../utils/responseTransforms");
const whatsappService_1 = require("../services/whatsapp/whatsappService");
function parseStatusFilter(raw) {
    if (!raw || raw === "todos")
        return undefined;
    if (raw === "aguardando_agendamento")
        return "AGUARDANDO_AGENDAMENTO";
    if (raw === "visita_marcada_hoje")
        return "VISITA_MARCADA_PARA_HOJE";
    if (raw === "visitado")
        return "VISITADO";
    // Compatibilidade com links antigos
    if (raw === "visitados")
        return "VISITADO";
    if (raw === "nao-visitados")
        return "AGUARDANDO_AGENDAMENTO";
    return undefined;
}
function formatPhoneForWhatsApp(telefone) {
    const digits = telefone.replace(/\D/g, "");
    if (digits.startsWith("55"))
        return digits;
    return `55${digits}`;
}
function notifyVisitaMarcadaHoje(agendamento) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const telefone = agendamento === null || agendamento === void 0 ? void 0 : agendamento.telefone;
        if (!telefone)
            return;
        if (!whatsappService_1.whatsappService.isConnected())
            return;
        const message = `Olá ${agendamento.nome}!\n\n` +
            `Sua visita foi marcada para hoje.\n` +
            `📍 Endereço: ${agendamento.endereco}, ${agendamento.numero}\n` +
            `🕒 Turno: ${((_a = agendamento.turno) === null || _a === void 0 ? void 0 : _a.descricao) || "Não informado"}\n\n` +
            `Nossa equipe entrará em contato se necessário.`;
        yield whatsappService_1.whatsappService.sendMessage(formatPhoneForWhatsApp(telefone), message);
    });
}
class CreateAgendamentosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Processar upload de fotos primeiro
                (0, upload_1.uploadMultiple)(request, response, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return response.status(400).json({ error: err.message });
                    }
                    try {
                        const { nome, endereco, numero, setor, cep, telefone, datavisita, google_maps_url, id_turno, id_user } = request.body;
                        const parsedIdUser = id_user != null && String(id_user) !== "" && String(id_user) !== "null"
                            ? Number(id_user)
                            : undefined;
                        // Processar fotos enviadas
                        let fotosJson = undefined;
                        if (request.files && Array.isArray(request.files) && request.files.length > 0) {
                            const fotosUrls = request.files.map(file => {
                                // Retornar URL relativa para acesso
                                return `/uploads/agendamentos/${file.filename}`;
                            });
                            fotosJson = JSON.stringify(fotosUrls);
                        }
                        const createAgendamentos = new agendamentosModels_1.CreateAgendamentosModel();
                        const agendamento = yield createAgendamentos.execute({
                            nome,
                            endereco,
                            numero,
                            setor,
                            cep,
                            telefone,
                            datavisita,
                            fotos: fotosJson,
                            google_maps_url: google_maps_url || undefined,
                            id_turno: parseInt(id_turno),
                            id_user: Number.isNaN(parsedIdUser) ? undefined : parsedIdUser
                        });
                        return response.status(201).json((0, responseTransforms_1.attachUploadTokensToAgendamentoFotos)(agendamento));
                    }
                    catch (error) {
                        return response.status(400).json({ error: error.message });
                    }
                }));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateAgendamentosController = CreateAgendamentosController;
class ListAgendamentosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(request.query);
                const q = request.query.q ? String(request.query.q) : undefined;
                const filtro = request.query.filtro ? String(request.query.filtro) : "todos";
                const status = parseStatusFilter(filtro);
                const listAgendamentos = new agendamentosModels_1.ListAgendamentosModel();
                const { items, total } = yield listAgendamentos.execute(p, { q, status });
                const data = (0, responseTransforms_1.attachUploadTokensToAgendamentos)(items);
                return response.json((0, pagination_1.paginatedResponse)(data, total, p.page, p.pageSize));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListAgendamentosController = ListAgendamentosController;
class GetAgendamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const getAgendamento = new agendamentosModels_1.GetAgendamentoModel();
                const agendamento = yield getAgendamento.execute(parseInt(id));
                return response.json((0, responseTransforms_1.attachUploadTokensToAgendamentoFotos)(agendamento));
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetAgendamentoController = GetAgendamentoController;
class UpdateAgendamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { nome, endereco, numero, setor, cep, telefone, datavisita, fotos, google_maps_url, id_turno, id_user } = request.body;
                const parsedIdUser = id_user != null && String(id_user) !== "" && String(id_user) !== "null"
                    ? Number(id_user)
                    : undefined;
                const updateAgendamento = new agendamentosModels_1.UpdateAgendamentoModel();
                const getAgendamento = new agendamentosModels_1.GetAgendamentoModel();
                const before = yield getAgendamento.execute(parseInt(id));
                const agendamento = yield updateAgendamento.execute(parseInt(id), {
                    nome,
                    endereco,
                    numero,
                    setor,
                    cep,
                    telefone,
                    datavisita,
                    fotos,
                    google_maps_url: google_maps_url || undefined,
                    id_turno: id_turno ? parseInt(id_turno) : undefined,
                    id_user: Number.isNaN(parsedIdUser) ? undefined : parsedIdUser,
                    status: request.body.status || undefined,
                });
                if (before.status !== "VISITA_MARCADA_PARA_HOJE" && agendamento.status === "VISITA_MARCADA_PARA_HOJE") {
                    yield notifyVisitaMarcadaHoje(agendamento);
                }
                return response.json((0, responseTransforms_1.attachUploadTokensToAgendamentoFotos)(agendamento));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdateAgendamentoController = UpdateAgendamentoController;
class MarcarVisitadoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const userId = request.query.userId;
                if (!userId) {
                    return response.status(401).json({ error: "User ID not found" });
                }
                const marcarVisitado = new agendamentosModels_1.MarcarVisitadoModel();
                const agendamento = yield marcarVisitado.execute(parseInt(id), parseInt(userId));
                return response.json((0, responseTransforms_1.attachUploadTokensToAgendamentoFotos)(agendamento));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.MarcarVisitadoController = MarcarVisitadoController;
class AtualizarStatusAgendamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { id } = request.params;
                const { status } = request.body;
                if (!status) {
                    return response.status(400).json({ error: "Status é obrigatório" });
                }
                const userIdQuery = request.query.userId ? Number(request.query.userId) : undefined;
                const userIdFromReq = ((_a = request.user) === null || _a === void 0 ? void 0 : _a.id) ? Number(request.user.id) : undefined;
                const idUserVisitou = userIdQuery || userIdFromReq;
                const atualizarStatus = new agendamentosModels_1.AtualizarStatusAgendamentoModel();
                const agendamento = yield atualizarStatus.execute(parseInt(id), status, idUserVisitou);
                if (status === "VISITA_MARCADA_PARA_HOJE") {
                    yield notifyVisitaMarcadaHoje(agendamento);
                }
                return response.json((0, responseTransforms_1.attachUploadTokensToAgendamentoFotos)(agendamento));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.AtualizarStatusAgendamentoController = AtualizarStatusAgendamentoController;
class DeleteAgendamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deleteAgendamento = new agendamentosModels_1.DeleteAgendamentoModel();
                const result = yield deleteAgendamento.execute(parseInt(id));
                return response.json(result);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DeleteAgendamentoController = DeleteAgendamentoController;
