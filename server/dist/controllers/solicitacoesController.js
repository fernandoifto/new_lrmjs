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
exports.ListSolicitacoesByPacienteController = exports.DeleteSolicitacaoController = exports.RecusarSolicitacaoController = exports.ConcluirDoacaoController = exports.ConfirmarSolicitacaoController = exports.GetSolicitacaoController = exports.ListSolicitacoesController = exports.CreateSolicitacaoController = void 0;
const pagination_1 = require("../utils/pagination");
const solicitacoesModels_1 = require("../models/solicitacoesModels");
const upload_1 = require("../middlewares/upload");
const pacienteContextToken_1 = require("../services/pacienteContextToken");
const responseTransforms_1 = require("../utils/responseTransforms");
function readPacienteContextHeader(req) {
    const h = req.headers["x-paciente-context"];
    if (typeof h === "string")
        return h.trim();
    if (Array.isArray(h) && h[0])
        return h[0].trim();
    return undefined;
}
class CreateSolicitacaoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Processar upload de foto da receita primeiro
                (0, upload_1.uploadSingleReceita)(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        return res.status(400).json({ error: err.message });
                    }
                    try {
                        const { qtde, id_lotes, id_pacientes } = req.body;
                        // Converter para números
                        const idLotes = parseInt(id_lotes);
                        const idPacientes = parseInt(id_pacientes);
                        const quantidade = parseInt(qtde);
                        if (isNaN(idLotes) || isNaN(idPacientes) || isNaN(quantidade)) {
                            return res.status(400).json({ error: "IDs e quantidade devem ser números válidos" });
                        }
                        const ctx = readPacienteContextHeader(req);
                        if ((0, pacienteContextToken_1.verifyPacienteContextToken)(ctx) !== idPacientes) {
                            return res.status(403).json({ error: "Token de contexto do paciente inválido ou expirado" });
                        }
                        // Processar foto da receita enviada
                        let fotoReceitaUrl = undefined;
                        if (req.file) {
                            // Retornar URL relativa para acesso
                            fotoReceitaUrl = `/uploads/receitas/${req.file.filename}`;
                        }
                        if (!fotoReceitaUrl) {
                            return res.status(400).json({ error: "Foto da receita médica é obrigatória" });
                        }
                        const createSolicitacaoModel = new solicitacoesModels_1.CreateSolicitacaoModel();
                        const solicitacao = yield createSolicitacaoModel.execute({
                            qtde: quantidade,
                            id_lotes: idLotes,
                            id_pacientes: idPacientes,
                            status: 'pendente_de_aprovacao',
                            foto_receita: fotoReceitaUrl
                        });
                        return res.status(201).json((0, responseTransforms_1.attachUploadTokensToSolicitacao)(solicitacao));
                    }
                    catch (error) {
                        return res.status(400).json({ error: error.message });
                    }
                }));
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateSolicitacaoController = CreateSolicitacaoController;
class ListSolicitacoesController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, search } = req.query;
                const p = (0, pagination_1.parsePaginationParams)(req.query);
                const listSolicitacoesModel = new solicitacoesModels_1.ListSolicitacoesModel();
                const { items, total } = yield listSolicitacoesModel.execute(status, p, search ? String(search) : undefined);
                const data = (0, responseTransforms_1.attachUploadTokensToSolicitacoes)(items);
                return res.status(200).json((0, pagination_1.paginatedResponse)(data, total, p.page, p.pageSize));
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListSolicitacoesController = ListSolicitacoesController;
class GetSolicitacaoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const getSolicitacaoModel = new solicitacoesModels_1.GetSolicitacaoModel();
                const solicitacao = yield getSolicitacaoModel.execute(parseInt(id));
                return res.status(200).json((0, responseTransforms_1.attachUploadTokensToSolicitacao)(solicitacao));
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetSolicitacaoController = GetSolicitacaoController;
class ConfirmarSolicitacaoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const confirmarSolicitacaoModel = new solicitacoesModels_1.ConfirmarSolicitacaoModel();
                const solicitacao = yield confirmarSolicitacaoModel.execute(parseInt(id));
                return res.status(200).json((0, responseTransforms_1.attachUploadTokensToSolicitacao)(solicitacao));
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ConfirmarSolicitacaoController = ConfirmarSolicitacaoController;
class ConcluirDoacaoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const id_users = parseInt(req.query.userId);
                if (!id_users) {
                    return res.status(401).json({ error: "Usuário não autenticado" });
                }
                const concluirDoacaoModel = new solicitacoesModels_1.ConcluirDoacaoModel();
                const retirada = yield concluirDoacaoModel.execute(parseInt(id), id_users);
                return res.status(200).json(retirada);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ConcluirDoacaoController = ConcluirDoacaoController;
class RecusarSolicitacaoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const recusarSolicitacaoModel = new solicitacoesModels_1.RecusarSolicitacaoModel();
                const solicitacao = yield recusarSolicitacaoModel.execute(parseInt(id));
                return res.status(200).json((0, responseTransforms_1.attachUploadTokensToSolicitacao)(solicitacao));
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.RecusarSolicitacaoController = RecusarSolicitacaoController;
class DeleteSolicitacaoController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleteSolicitacaoModel = new solicitacoesModels_1.DeleteSolicitacaoModel();
                const result = yield deleteSolicitacaoModel.execute(parseInt(id));
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DeleteSolicitacaoController = DeleteSolicitacaoController;
class ListSolicitacoesByPacienteController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { paciente } = req.query;
                const p = (0, pagination_1.parsePaginationParams)(req.query);
                const listSolicitacoesByPacienteModel = new solicitacoesModels_1.ListSolicitacoesByPacienteModel();
                const { items, total } = yield listSolicitacoesByPacienteModel.execute(parseInt(paciente), p);
                const data = (0, responseTransforms_1.stripFotoReceitaFromSolicitacoes)(items);
                return res.status(200).json((0, pagination_1.paginatedResponse)(data, total, p.page, p.pageSize));
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListSolicitacoesByPacienteController = ListSolicitacoesByPacienteController;
