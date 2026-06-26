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
exports.DeleteRetiradaController = exports.UpdateRetiradaController = exports.GetRetiradaController = exports.ListRetiradasController = exports.CreateRetiradaController = void 0;
const pagination_1 = require("../utils/pagination");
const retiradasModels_1 = require("../models/retiradasModels");
class CreateRetiradaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { qtde, id_lotes, id_pacientes } = req.body;
                const id_users = parseInt(req.query.userId); // ID do usuário logado
                if (!id_users) {
                    return res.status(401).json({ error: "Usuário não autenticado" });
                }
                const createRetiradaModel = new retiradasModels_1.CreateRetiradaModel();
                const retirada = yield createRetiradaModel.execute({
                    qtde,
                    id_users,
                    id_lotes,
                    id_pacientes
                });
                return res.status(201).json(retirada);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreateRetiradaController = CreateRetiradaController;
class ListRetiradasController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const p = (0, pagination_1.parsePaginationParams)(req.query);
                const listRetiradasModel = new retiradasModels_1.ListRetiradasModel();
                const { items, total } = yield listRetiradasModel.execute(p);
                return res.status(200).json((0, pagination_1.paginatedResponse)(items, total, p.page, p.pageSize));
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListRetiradasController = ListRetiradasController;
class GetRetiradaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const getRetiradaModel = new retiradasModels_1.GetRetiradaModel();
                const retirada = yield getRetiradaModel.execute(parseInt(id));
                return res.status(200).json(retirada);
            }
            catch (error) {
                return res.status(404).json({ error: error.message });
            }
        });
    }
}
exports.GetRetiradaController = GetRetiradaController;
class UpdateRetiradaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { qtde, id_lotes, id_pacientes } = req.body;
                const updateRetiradaModel = new retiradasModels_1.UpdateRetiradaModel();
                const retirada = yield updateRetiradaModel.execute(parseInt(id), {
                    qtde,
                    id_lotes,
                    id_pacientes
                });
                return res.status(200).json(retirada);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.UpdateRetiradaController = UpdateRetiradaController;
class DeleteRetiradaController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleteRetiradaModel = new retiradasModels_1.DeleteRetiradaModel();
                const result = yield deleteRetiradaModel.execute(parseInt(id));
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.DeleteRetiradaController = DeleteRetiradaController;
