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
exports.DeleteFormaFarmaceuticaController = exports.UpdateFormaFarmaceuticaController = exports.GetFormaFarmaceuticaController = exports.ListFormasFarmaceuticasController = exports.CreateFormaFarmaceuticaController = void 0;
const pagination_1 = require("../utils/pagination");
const formasFarmaceuticasModels_1 = require("../models/formasFarmaceuticasModels");
class CreateFormaFarmaceuticaController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { descricao } = request.body;
                const createFormaFarmaceutica = new formasFarmaceuticasModels_1.CreateFormaFarmaceuticaModel();
                const formaFarmaceutica = yield createFormaFarmaceutica.execute({ descricao });
                return response.status(201).json(formaFarmaceutica);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateFormaFarmaceuticaController = CreateFormaFarmaceuticaController;
class ListFormasFarmaceuticasController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(request.query);
                const listFormasFarmaceuticas = new formasFarmaceuticasModels_1.ListFormasFarmaceuticasModel();
                const { items, total } = yield listFormasFarmaceuticas.execute(p);
                return response.json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListFormasFarmaceuticasController = ListFormasFarmaceuticasController;
class GetFormaFarmaceuticaController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const getFormaFarmaceutica = new formasFarmaceuticasModels_1.GetFormaFarmaceuticaModel();
                const formaFarmaceutica = yield getFormaFarmaceutica.execute(parseInt(id));
                return response.json(formaFarmaceutica);
            }
            catch (error) {
                return response.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetFormaFarmaceuticaController = GetFormaFarmaceuticaController;
class UpdateFormaFarmaceuticaController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const { descricao } = request.body;
                const updateFormaFarmaceutica = new formasFarmaceuticasModels_1.UpdateFormaFarmaceuticaModel();
                const formaFarmaceutica = yield updateFormaFarmaceutica.execute(parseInt(id), { descricao });
                return response.json(formaFarmaceutica);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdateFormaFarmaceuticaController = UpdateFormaFarmaceuticaController;
class DeleteFormaFarmaceuticaController {
    handle(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = request.params;
                const deleteFormaFarmaceutica = new formasFarmaceuticasModels_1.DeleteFormaFarmaceuticaModel();
                const result = yield deleteFormaFarmaceutica.execute(parseInt(id));
                return response.json(result);
            }
            catch (error) {
                return response.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DeleteFormaFarmaceuticaController = DeleteFormaFarmaceuticaController;
