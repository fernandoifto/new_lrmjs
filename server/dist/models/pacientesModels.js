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
exports.DeletePacienteModel = exports.UpdatePacienteModel = exports.GetPacienteByCPFModel = exports.GetPacienteModel = exports.ListPacientesModel = exports.CreatePacienteModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
//Modelo de criar paciente
class CreatePacienteModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ nome, cpf, datanascimento, telefone, cartaosus }) {
            if (!nome || nome.trim() === "") {
                throw new Error("Nome é obrigatório");
            }
            if (!cpf || cpf.trim() === "") {
                throw new Error("CPF é obrigatório");
            }
            if (!datanascimento) {
                throw new Error("Data de nascimento é obrigatória");
            }
            if (!telefone || telefone.trim() === "") {
                throw new Error("Telefone é obrigatório");
            }
            if (!cartaosus || cartaosus.trim() === "") {
                throw new Error("Cartão SUS é obrigatório");
            }
            // Verificar se CPF já existe
            const pacienteExistente = yield prisma_1.default.pacientes.findFirst({
                where: { cpf: cpf.trim() }
            });
            if (pacienteExistente) {
                throw new Error("CPF já cadastrado");
            }
            const paciente = yield prisma_1.default.pacientes.create({
                data: {
                    nome: nome.trim(),
                    cpf: cpf.trim(),
                    datanascimento: new Date(datanascimento),
                    telefone: telefone.trim(),
                    cartaosus: cartaosus.trim()
                }
            });
            return paciente;
        });
    }
}
exports.CreatePacienteModel = CreatePacienteModel;
//Modelo de buscar paciente por CPF
class GetPacienteByCPFModel {
    execute(cpf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!cpf || cpf.trim() === "") {
                throw new Error("CPF é obrigatório");
            }
            const paciente = yield prisma_1.default.pacientes.findFirst({
                where: { cpf: cpf.trim() }
            });
            if (!paciente) {
                throw new Error("Paciente não encontrado");
            }
            return paciente;
        });
    }
}
exports.GetPacienteByCPFModel = GetPacienteByCPFModel;
class ListPacientesModel {
    execute(p, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const where = {};
            const q = (_a = opts === null || opts === void 0 ? void 0 : opts.q) === null || _a === void 0 ? void 0 : _a.trim();
            const campo = (opts === null || opts === void 0 ? void 0 : opts.campo) || "nome";
            if (q) {
                if (campo === "cpf" || campo === "telefone") {
                    const digits = q.replace(/\D/g, "");
                    if (campo === "cpf" && digits) {
                        where.cpf = { contains: digits };
                    }
                    else if (campo === "telefone" && digits) {
                        where.telefone = { contains: digits };
                    }
                }
                else if (campo === "cartaosus") {
                    where.cartaosus = { contains: q, mode: "insensitive" };
                }
                else {
                    where.nome = { contains: q, mode: "insensitive" };
                }
            }
            const orderBy = { nome: 'asc' };
            const [total, items] = yield Promise.all([
                prisma_1.default.pacientes.count({ where }),
                prisma_1.default.pacientes.findMany({
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
exports.ListPacientesModel = ListPacientesModel;
//Modelo de buscar paciente por ID
class GetPacienteModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const paciente = yield prisma_1.default.pacientes.findUnique({
                where: { id },
                include: {
                    retiradas: {
                        include: {
                            lotes: {
                                include: {
                                    medicamento: true,
                                    formaFarmaceutica: true,
                                    tipoMedicamento: true
                                }
                            },
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    email: true
                                }
                            }
                        },
                        orderBy: {
                            created: 'desc'
                        }
                    }
                }
            });
            if (!paciente) {
                throw new Error("Paciente não encontrado");
            }
            return paciente;
        });
    }
}
exports.GetPacienteModel = GetPacienteModel;
//Modelo de atualizar paciente
class UpdatePacienteModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const paciente = yield prisma_1.default.pacientes.findUnique({
                where: { id }
            });
            if (!paciente) {
                throw new Error("Paciente não encontrado");
            }
            const updateData = {};
            if (data.nome !== undefined) {
                if (data.nome.trim() === "") {
                    throw new Error("Nome não pode ser vazio");
                }
                updateData.nome = data.nome.trim();
            }
            if (data.cpf !== undefined) {
                if (data.cpf.trim() === "") {
                    throw new Error("CPF não pode ser vazio");
                }
                // Verificar se CPF já existe em outro paciente
                const pacienteExistente = yield prisma_1.default.pacientes.findFirst({
                    where: {
                        cpf: data.cpf.trim(),
                        id: { not: id }
                    }
                });
                if (pacienteExistente) {
                    throw new Error("CPF já cadastrado para outro paciente");
                }
                updateData.cpf = data.cpf.trim();
            }
            if (data.datanascimento !== undefined) {
                updateData.datanascimento = new Date(data.datanascimento);
            }
            if (data.telefone !== undefined) {
                if (data.telefone.trim() === "") {
                    throw new Error("Telefone não pode ser vazio");
                }
                updateData.telefone = data.telefone.trim();
            }
            if (data.cartaosus !== undefined) {
                if (data.cartaosus.trim() === "") {
                    throw new Error("Cartão SUS não pode ser vazio");
                }
                updateData.cartaosus = data.cartaosus.trim();
            }
            const pacienteAtualizado = yield prisma_1.default.pacientes.update({
                where: { id },
                data: updateData
            });
            return pacienteAtualizado;
        });
    }
}
exports.UpdatePacienteModel = UpdatePacienteModel;
//Modelo de deletar paciente
class DeletePacienteModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const paciente = yield prisma_1.default.pacientes.findUnique({
                where: { id },
                include: {
                    retiradas: true
                }
            });
            if (!paciente) {
                throw new Error("Paciente não encontrado");
            }
            // Verificar se paciente tem retiradas associadas
            if (paciente.retiradas.length > 0) {
                throw new Error("Não é possível excluir paciente com retiradas associadas");
            }
            yield prisma_1.default.pacientes.delete({
                where: { id }
            });
            return { message: "Paciente excluído com sucesso" };
        });
    }
}
exports.DeletePacienteModel = DeletePacienteModel;
