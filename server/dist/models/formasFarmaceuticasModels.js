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
exports.DeleteFormaFarmaceuticaModel = exports.UpdateFormaFarmaceuticaModel = exports.GetFormaFarmaceuticaModel = exports.ListFormasFarmaceuticasModel = exports.CreateFormaFarmaceuticaModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
//Modelo de criar forma farmacêutica
class CreateFormaFarmaceuticaModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ descricao }) {
            if (!descricao || descricao.trim() === '') {
                throw new Error("Descrição é obrigatória");
            }
            const formaFarmaceutica = yield prisma_1.default.formasFarmaceuticas.create({
                data: {
                    descricao: descricao.trim()
                }
            });
            return formaFarmaceutica;
        });
    }
}
exports.CreateFormaFarmaceuticaModel = CreateFormaFarmaceuticaModel;
//Modelo de listar formas farmacêuticas
class ListFormasFarmaceuticasModel {
    execute(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const orderBy = { descricao: 'asc' };
            const [total, items] = yield Promise.all([
                prisma_1.default.formasFarmaceuticas.count(),
                prisma_1.default.formasFarmaceuticas.findMany({
                    orderBy,
                    skip: p.skip,
                    take: p.take,
                }),
            ]);
            return { items, total };
        });
    }
}
exports.ListFormasFarmaceuticasModel = ListFormasFarmaceuticasModel;
//Modelo de visualizar forma farmacêutica
class GetFormaFarmaceuticaModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const formaFarmaceutica = yield prisma_1.default.formasFarmaceuticas.findUnique({
                where: {
                    id: id
                }
            });
            if (!formaFarmaceutica) {
                throw new Error("Forma farmacêutica não encontrada");
            }
            return formaFarmaceutica;
        });
    }
}
exports.GetFormaFarmaceuticaModel = GetFormaFarmaceuticaModel;
//Modelo de editar forma farmacêutica
class UpdateFormaFarmaceuticaModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const formaFarmaceuticaExists = yield prisma_1.default.formasFarmaceuticas.findUnique({
                where: { id: id }
            });
            if (!formaFarmaceuticaExists) {
                throw new Error("Forma farmacêutica não encontrada");
            }
            const updateData = {};
            if (data.descricao) {
                updateData.descricao = data.descricao.trim();
            }
            const formaFarmaceutica = yield prisma_1.default.formasFarmaceuticas.update({
                where: {
                    id: id
                },
                data: updateData
            });
            return formaFarmaceutica;
        });
    }
}
exports.UpdateFormaFarmaceuticaModel = UpdateFormaFarmaceuticaModel;
//Modelo de deletar forma farmacêutica
class DeleteFormaFarmaceuticaModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const formaFarmaceuticaExists = yield prisma_1.default.formasFarmaceuticas.findUnique({
                where: { id: id }
            });
            if (!formaFarmaceuticaExists) {
                throw new Error("Forma farmacêutica não encontrada");
            }
            yield prisma_1.default.formasFarmaceuticas.delete({
                where: {
                    id: id
                }
            });
            return { message: "Forma farmacêutica deletada com sucesso" };
        });
    }
}
exports.DeleteFormaFarmaceuticaModel = DeleteFormaFarmaceuticaModel;
