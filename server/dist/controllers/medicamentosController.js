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
exports.DeleteMedicamentoController = exports.UpdateMedicamentoController = exports.GetMedicamentoController = exports.ListMedicamentosController = exports.CreateMedicamentoController = void 0;
const pagination_1 = require("../utils/pagination");
const medicamentosModels_1 = require("../models/medicamentosModels");
class CreateMedicamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { descricao, principioativo } = request.body;
                const createMedicamento = new medicamentosModels_1.CreateMedicamentoModel();
                const medicamento = yield createMedicamento.execute({ descricao, principioativo });
                return response.status(201).json(medicamento);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateMedicamentoController = CreateMedicamentoController;
class ListMedicamentosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(request.query);
                const q = request.query.q ? String(request.query.q) : undefined;
                const campo = request.query.campo ? String(request.query.campo) : undefined;
                const listMedicamentos = new medicamentosModels_1.ListMedicamentosModel();
                const { items, total } = yield listMedicamentos.execute(p, { q, campo });
                return response.json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListMedicamentosController = ListMedicamentosController;
class GetMedicamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const getMedicamento = new medicamentosModels_1.GetMedicamentoModel();
                const medicamento = yield getMedicamento.execute(parseInt(id));
                return response.json(medicamento);
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetMedicamentoController = GetMedicamentoController;
class UpdateMedicamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { descricao, principioativo } = request.body;
                const updateMedicamento = new medicamentosModels_1.UpdateMedicamentoModel();
                const medicamento = yield updateMedicamento.execute(parseInt(id), { descricao, principioativo });
                return response.json(medicamento);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdateMedicamentoController = UpdateMedicamentoController;
class DeleteMedicamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deleteMedicamento = new medicamentosModels_1.DeleteMedicamentoModel();
                const result = yield deleteMedicamento.execute(parseInt(id));
                return response.json(result);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DeleteMedicamentoController = DeleteMedicamentoController;
