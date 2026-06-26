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
exports.DeleteTipoMedicamentoModel = exports.UpdateTipoMedicamentoModel = exports.GetTipoMedicamentoModel = exports.ListTiposMedicamentosModel = exports.CreateTipoMedicamentoModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
//Modelo de criar tipo de medicamento
class CreateTipoMedicamentoModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ descricao }) {
            if (!descricao || descricao.trim() === '') {
                throw new Error("Descrição é obrigatória");
            }
            const tipoMedicamento = yield prisma_1.default.tiposMedicamentos.create({
                data: {
                    descricao: descricao.trim()
                }
            });
            return tipoMedicamento;
        });
    }
}
exports.CreateTipoMedicamentoModel = CreateTipoMedicamentoModel;
//Modelo de listar tipos de medicamentos
class ListTiposMedicamentosModel {
    execute(p, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const orderBy = { descricao: 'asc' };
            const q = (_a = opts === null || opts === void 0 ? void 0 : opts.q) === null || _a === void 0 ? void 0 : _a.trim();
            const where = q ? { descricao: { contains: q, mode: 'insensitive' } } : {};
            const [total, items] = yield Promise.all([
                prisma_1.default.tiposMedicamentos.count({ where }),
                prisma_1.default.tiposMedicamentos.findMany({
                    where,
                    orderBy,
                    skip: p.skip,
                    take: p.take,
                }),
            ]);
            return { items, total };
        });
    }
}
exports.ListTiposMedicamentosModel = ListTiposMedicamentosModel;
//Modelo de visualizar tipo de medicamento
class GetTipoMedicamentoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoMedicamento = yield prisma_1.default.tiposMedicamentos.findUnique({
                where: {
                    id: id
                }
            });
            if (!tipoMedicamento) {
                throw new Error("Tipo de medicamento não encontrado");
            }
            return tipoMedicamento;
        });
    }
}
exports.GetTipoMedicamentoModel = GetTipoMedicamentoModel;
//Modelo de editar tipo de medicamento
class UpdateTipoMedicamentoModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoMedicamentoExists = yield prisma_1.default.tiposMedicamentos.findUnique({
                where: { id: id }
            });
            if (!tipoMedicamentoExists) {
                throw new Error("Tipo de medicamento não encontrado");
            }
            const updateData = {};
            if (data.descricao) {
                updateData.descricao = data.descricao.trim();
            }
            const tipoMedicamento = yield prisma_1.default.tiposMedicamentos.update({
                where: {
                    id: id
                },
                data: updateData
            });
            return tipoMedicamento;
        });
    }
}
exports.UpdateTipoMedicamentoModel = UpdateTipoMedicamentoModel;
//Modelo de deletar tipo de medicamento
class DeleteTipoMedicamentoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoMedicamentoExists = yield prisma_1.default.tiposMedicamentos.findUnique({
                where: { id: id }
            });
            if (!tipoMedicamentoExists) {
                throw new Error("Tipo de medicamento não encontrado");
            }
            yield prisma_1.default.tiposMedicamentos.delete({
                where: {
                    id: id
                }
            });
            return { message: "Tipo de medicamento deletado com sucesso" };
        });
    }
}
exports.DeleteTipoMedicamentoModel = DeleteTipoMedicamentoModel;
