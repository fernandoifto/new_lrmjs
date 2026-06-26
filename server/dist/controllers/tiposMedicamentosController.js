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
exports.DeleteTipoMedicamentoController = exports.UpdateTipoMedicamentoController = exports.GetTipoMedicamentoController = exports.ListTiposMedicamentosController = exports.CreateTipoMedicamentoController = void 0;
const pagination_1 = require("../utils/pagination");
const tiposMedicamentosModels_1 = require("../models/tiposMedicamentosModels");
class CreateTipoMedicamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { descricao } = request.body;
                const createTipoMedicamento = new tiposMedicamentosModels_1.CreateTipoMedicamentoModel();
                const tipoMedicamento = yield createTipoMedicamento.execute({ descricao });
                return response.status(201).json(tipoMedicamento);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateTipoMedicamentoController = CreateTipoMedicamentoController;
class ListTiposMedicamentosController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(request.query);
                const q = request.query.q ? String(request.query.q) : undefined;
                const listTiposMedicamentos = new tiposMedicamentosModels_1.ListTiposMedicamentosModel();
                const { items, total } = yield listTiposMedicamentos.execute(p, { q });
                return response.json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListTiposMedicamentosController = ListTiposMedicamentosController;
class GetTipoMedicamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const getTipoMedicamento = new tiposMedicamentosModels_1.GetTipoMedicamentoModel();
                const tipoMedicamento = yield getTipoMedicamento.execute(parseInt(id));
                return response.json(tipoMedicamento);
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetTipoMedicamentoController = GetTipoMedicamentoController;
class UpdateTipoMedicamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { descricao } = request.body;
                const updateTipoMedicamento = new tiposMedicamentosModels_1.UpdateTipoMedicamentoModel();
                const tipoMedicamento = yield updateTipoMedicamento.execute(parseInt(id), { descricao });
                return response.json(tipoMedicamento);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdateTipoMedicamentoController = UpdateTipoMedicamentoController;
class DeleteTipoMedicamentoController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deleteTipoMedicamento = new tiposMedicamentosModels_1.DeleteTipoMedicamentoModel();
                const result = yield deleteTipoMedicamento.execute(parseInt(id));
                return response.json(result);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DeleteTipoMedicamentoController = DeleteTipoMedicamentoController;
