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
exports.DeleteMedicamentoModel = exports.UpdateMedicamentoModel = exports.GetMedicamentoModel = exports.ListMedicamentosModel = exports.CreateMedicamentoModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
//Modelo de criar medicamento
class CreateMedicamentoModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ descricao, principioativo }) {
            if (!descricao || descricao.trim() === '') {
                throw new Error("Descrição é obrigatória");
            }
            if (!principioativo || principioativo.trim() === '') {
                throw new Error("Princípio ativo é obrigatório");
            }
            const medicamento = yield prisma_1.default.medicamentos.create({
                data: {
                    descricao: descricao.trim(),
                    principioativo: principioativo.trim()
                }
            });
            return medicamento;
        });
    }
}
exports.CreateMedicamentoModel = CreateMedicamentoModel;
//Modelo de listar medicamentos
class ListMedicamentosModel {
    execute(p, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const orderBy = { descricao: 'asc' };
            const q = (_a = opts === null || opts === void 0 ? void 0 : opts.q) === null || _a === void 0 ? void 0 : _a.trim();
            const campo = (opts === null || opts === void 0 ? void 0 : opts.campo) === "principioativo" ? "principioativo" : "descricao";
            const where = q && campo === "principioativo"
                ? { principioativo: { contains: q, mode: "insensitive" } }
                : q
                    ? { descricao: { contains: q, mode: "insensitive" } }
                    : {};
            const [total, items] = yield Promise.all([
                prisma_1.default.medicamentos.count({ where }),
                prisma_1.default.medicamentos.findMany({
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
exports.ListMedicamentosModel = ListMedicamentosModel;
//Modelo de visualizar medicamento
class GetMedicamentoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicamento = yield prisma_1.default.medicamentos.findUnique({
                where: {
                    id: id
                }
            });
            if (!medicamento) {
                throw new Error("Medicamento não encontrado");
            }
            return medicamento;
        });
    }
}
exports.GetMedicamentoModel = GetMedicamentoModel;
//Modelo de editar medicamento
class UpdateMedicamentoModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicamentoExists = yield prisma_1.default.medicamentos.findUnique({
                where: { id: id }
            });
            if (!medicamentoExists) {
                throw new Error("Medicamento não encontrado");
            }
            const updateData = {};
            if (data.descricao) {
                updateData.descricao = data.descricao.trim();
            }
            if (data.principioativo) {
                updateData.principioativo = data.principioativo.trim();
            }
            const medicamento = yield prisma_1.default.medicamentos.update({
                where: {
                    id: id
                },
                data: updateData
            });
            return medicamento;
        });
    }
}
exports.UpdateMedicamentoModel = UpdateMedicamentoModel;
//Modelo de deletar medicamento
class DeleteMedicamentoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicamentoExists = yield prisma_1.default.medicamentos.findUnique({
                where: { id: id }
            });
            if (!medicamentoExists) {
                throw new Error("Medicamento não encontrado");
            }
            yield prisma_1.default.medicamentos.delete({
                where: {
                    id: id
                }
            });
            return { message: "Medicamento deletado com sucesso" };
        });
    }
}
exports.DeleteMedicamentoModel = DeleteMedicamentoModel;
