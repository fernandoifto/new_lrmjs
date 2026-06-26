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
exports.DeleteLoteController = exports.UpdateLoteController = exports.GetLoteController = exports.ListLotesDisponiveisController = exports.ListLotesController = exports.CreateLoteController = void 0;
const pagination_1 = require("../utils/pagination");
const lotesModels_1 = require("../models/lotesModels");
class CreateLoteController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento } = request.body;
                const createLote = new lotesModels_1.CreateLoteModel();
                const lote = yield createLote.execute({
                    numero,
                    datavencimento,
                    datafabricacao,
                    qtde,
                    id_medicamento,
                    id_forma_farmaceutica,
                    id_tipo_medicamento
                });
                return response.status(201).json(lote);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateLoteController = CreateLoteController;
class ListLotesController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(request.query);
                const q = request.query.q ? String(request.query.q) : undefined;
                const campo = request.query.campo ? String(request.query.campo) : undefined;
                const rawMed = request.query.idMedicamento;
                let idMedicamento;
                if (rawMed !== undefined && String(rawMed) !== "") {
                    const n = parseInt(String(rawMed), 10);
                    if (!Number.isNaN(n)) {
                        idMedicamento = n;
                    }
                }
                const listLotes = new lotesModels_1.ListLotesModel();
                const { items, total } = yield listLotes.execute(p, { q, campo, idMedicamento });
                return response.json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListLotesController = ListLotesController;
class ListLotesDisponiveisController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(request.query);
                const listLotesDisponiveis = new lotesModels_1.ListLotesDisponiveisModel();
                const { items, total } = yield listLotesDisponiveis.execute(p);
                return response.json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListLotesDisponiveisController = ListLotesDisponiveisController;
class GetLoteController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const getLote = new lotesModels_1.GetLoteModel();
                const lote = yield getLote.execute(parseInt(id));
                return response.json(lote);
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetLoteController = GetLoteController;
class UpdateLoteController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { numero, datavencimento, datafabricacao, qtde, id_medicamento, id_forma_farmaceutica, id_tipo_medicamento } = request.body;
                const updateLote = new lotesModels_1.UpdateLoteModel();
                const lote = yield updateLote.execute(parseInt(id), {
                    numero,
                    datavencimento,
                    datafabricacao,
                    qtde,
                    id_medicamento,
                    id_forma_farmaceutica,
                    id_tipo_medicamento
                });
                return response.json(lote);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdateLoteController = UpdateLoteController;
class DeleteLoteController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deleteLote = new lotesModels_1.DeleteLoteModel();
                const result = yield deleteLote.execute(parseInt(id));
                return response.json(result);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DeleteLoteController = DeleteLoteController;
