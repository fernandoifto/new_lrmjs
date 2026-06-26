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
exports.DeletePacienteController = exports.UpdatePacienteController = exports.GetPacienteByCPFController = exports.GetPacienteController = exports.ListPacientesController = exports.CreatePacienteController = void 0;
const pagination_1 = require("../utils/pagination");
const pacientesModels_1 = require("../models/pacientesModels");
const pacienteContextToken_1 = require("../services/pacienteContextToken");
class CreatePacienteController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nome, cpf, datanascimento, telefone, cartaosus } = req.body;
                const createPacienteModel = new pacientesModels_1.CreatePacienteModel();
                const paciente = yield createPacienteModel.execute({
                    nome,
                    cpf,
                    datanascimento,
                    telefone,
                    cartaosus
                });
                const isPublic = req.path === "/paciente/public" || req.originalUrl.split("?")[0].endsWith("/paciente/public");
                if (isPublic) {
                    return res.status(201).json({
                        id: paciente.id,
                        pacienteContextToken: (0, pacienteContextToken_1.issuePacienteContextToken)(paciente.id),
                    });
                }
                return res.status(201).json(paciente);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreatePacienteController = CreatePacienteController;
class ListPacientesController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(req.query);
                const q = req.query.q ? String(req.query.q) : undefined;
                const campo = req.query.campo ? String(req.query.campo) : undefined;
                const listPacientesModel = new pacientesModels_1.ListPacientesModel();
                const { items, total } = yield listPacientesModel.execute(p, { q, campo });
                return res.status(200).json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListPacientesController = ListPacientesController;
class GetPacienteController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const getPacienteModel = new pacientesModels_1.GetPacienteModel();
                const paciente = yield getPacienteModel.execute(parseInt(id));
                return res.status(200).json(paciente);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetPacienteController = GetPacienteController;
class GetPacienteByCPFController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cpf } = req.params;
                const getPacienteByCPFModel = new pacientesModels_1.GetPacienteByCPFModel();
                const paciente = yield getPacienteByCPFModel.execute(cpf);
                return res.status(200).json({
                    id: paciente.id,
                    pacienteContextToken: (0, pacienteContextToken_1.issuePacienteContextToken)(paciente.id),
                });
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetPacienteByCPFController = GetPacienteByCPFController;
class UpdatePacienteController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatePacienteModel = new pacientesModels_1.UpdatePacienteModel();
                const paciente = yield updatePacienteModel.execute(parseInt(id), data);
                return res.status(200).json(paciente);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdatePacienteController = UpdatePacienteController;
class DeletePacienteController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deletePacienteModel = new pacientesModels_1.DeletePacienteModel();
                const result = yield deletePacienteModel.execute(parseInt(id));
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DeletePacienteController = DeletePacienteController;
