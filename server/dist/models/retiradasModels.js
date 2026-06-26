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
exports.DeleteRetiradaModel = exports.UpdateRetiradaModel = exports.GetRetiradaModel = exports.ListRetiradasModel = exports.CreateRetiradaModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
//Modelo de criar retirada (com transação para atualizar estoque)
class CreateRetiradaModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ qtde, id_users, id_lotes, id_pacientes }) {
            if (!qtde || qtde <= 0) {
                throw new Error("Quantidade deve ser maior que zero");
            }
            if (!id_users) {
                throw new Error("ID do usuário é obrigatório");
            }
            if (!id_lotes) {
                throw new Error("ID do lote é obrigatório");
            }
            if (!id_pacientes) {
                throw new Error("ID do paciente é obrigatório");
            }
            // Verificar se usuário existe
            const user = yield prisma_1.default.users.findUnique({
                where: { id: id_users }
            });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            // Verificar se paciente existe
            const paciente = yield prisma_1.default.pacientes.findUnique({
                where: { id: id_pacientes }
            });
            if (!paciente) {
                throw new Error("Paciente não encontrado");
            }
            // Verificar se lote existe e quantidade disponível
            const lote = yield prisma_1.default.lotes.findUnique({
                where: { id: id_lotes }
            });
            if (!lote) {
                throw new Error("Lote não encontrado");
            }
            // Verificar se o lote está vencido
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const dataVencimento = new Date(lote.datavencimento);
            dataVencimento.setHours(0, 0, 0, 0);
            if (dataVencimento < hoje) {
                throw new Error(`Não é possível realizar retirada de medicamento vencido. Data de vencimento: ${dataVencimento.toLocaleDateString('pt-BR')}`);
            }
            if (lote.qtde < qtde) {
                throw new Error(`Quantidade insuficiente. Disponível: ${lote.qtde}`);
            }
            // Transação: criar retirada e atualizar estoque
            const result = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // Criar retirada
                const retirada = yield tx.retiradas.create({
                    data: {
                        qtde,
                        id_users,
                        id_lotes,
                        id_pacientes,
                        created: new Date(),
                        modified: new Date()
                    },
                    include: {
                        lotes: {
                            include: {
                                medicamento: true,
                                formaFarmaceutica: true,
                                tipoMedicamento: true
                            }
                        },
                        paciente: true,
                        user: {
                            select: {
                                id: true,
                                username: true,
                                email: true
                            }
                        }
                    }
                });
                // Atualizar quantidade do lote
                yield tx.lotes.update({
                    where: { id: id_lotes },
                    data: {
                        qtde: {
                            decrement: qtde
                        }
                    }
                });
                return retirada;
            }));
            return result;
        });
    }
}
exports.CreateRetiradaModel = CreateRetiradaModel;
//Modelo de listar retiradas
class ListRetiradasModel {
    execute(p) {
        return __awaiter(this, void 0, void 0, function* () {
            const base = {
                include: {
                    lotes: {
                        include: {
                            medicamento: true,
                            formaFarmaceutica: true,
                            tipoMedicamento: true
                        }
                    },
                    paciente: true,
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
            };
            const [total, items] = yield Promise.all([
                prisma_1.default.retiradas.count(),
                prisma_1.default.retiradas.findMany(Object.assign(Object.assign({}, base), { skip: p.skip, take: p.take })),
            ]);
            return { items, total };
        });
    }
}
exports.ListRetiradasModel = ListRetiradasModel;
//Modelo de buscar retirada por ID
class GetRetiradaModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const retirada = yield prisma_1.default.retiradas.findUnique({
                where: { id },
                include: {
                    lotes: {
                        include: {
                            medicamento: true,
                            formaFarmaceutica: true,
                            tipoMedicamento: true
                        }
                    },
                    paciente: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            });
            if (!retirada) {
                throw new Error("Retirada não encontrada");
            }
            return retirada;
        });
    }
}
exports.GetRetiradaModel = GetRetiradaModel;
//Modelo de atualizar retirada (ajustar estoque se necessário)
class UpdateRetiradaModel {
    execute(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const retiradaAtual = yield prisma_1.default.retiradas.findUnique({
                where: { id },
                include: {
                    lotes: true
                }
            });
            if (!retiradaAtual) {
                throw new Error("Retirada não encontrada");
            }
            // Transação: atualizar retirada e ajustar estoque
            const result = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // Se a quantidade ou lote mudou, precisamos ajustar o estoque
                const qtdeMudou = data.qtde !== undefined && data.qtde !== retiradaAtual.qtde;
                const loteMudou = data.id_lotes !== undefined && data.id_lotes !== retiradaAtual.id_lotes;
                if (loteMudou) {
                    // Se mudou o lote, reverter o estoque do lote antigo e verificar o novo
                    yield tx.lotes.update({
                        where: { id: retiradaAtual.id_lotes },
                        data: {
                            qtde: {
                                increment: retiradaAtual.qtde
                            }
                        }
                    });
                    // Verificar novo lote
                    const novoLote = yield tx.lotes.findUnique({
                        where: { id: data.id_lotes }
                    });
                    if (!novoLote) {
                        throw new Error("Novo lote não encontrado");
                    }
                    const qtdeFinal = data.qtde !== undefined ? data.qtde : retiradaAtual.qtde;
                    // Verificar se o novo lote está vencido
                    const hoje = new Date();
                    hoje.setHours(0, 0, 0, 0);
                    const dataVencimentoNovo = new Date(novoLote.datavencimento);
                    dataVencimentoNovo.setHours(0, 0, 0, 0);
                    if (dataVencimentoNovo < hoje) {
                        throw new Error(`Não é possível alterar para um lote vencido. Data de vencimento: ${dataVencimentoNovo.toLocaleDateString('pt-BR')}`);
                    }
                    if (novoLote.qtde < qtdeFinal) {
                        throw new Error(`Quantidade insuficiente no novo lote. Disponível: ${novoLote.qtde}`);
                    }
                    // Decrementar do novo lote
                    yield tx.lotes.update({
                        where: { id: data.id_lotes },
                        data: {
                            qtde: {
                                decrement: qtdeFinal
                            }
                        }
                    });
                }
                else if (qtdeMudou) {
                    // Se só a quantidade mudou, ajustar a diferença
                    const diferenca = data.qtde - retiradaAtual.qtde;
                    const lote = yield tx.lotes.findUnique({
                        where: { id: retiradaAtual.id_lotes }
                    });
                    if (!lote) {
                        throw new Error("Lote não encontrado");
                    }
                    // Verificar se o lote está vencido
                    const hoje = new Date();
                    hoje.setHours(0, 0, 0, 0);
                    const dataVencimento = new Date(lote.datavencimento);
                    dataVencimento.setHours(0, 0, 0, 0);
                    if (dataVencimento < hoje) {
                        throw new Error(`Não é possível alterar quantidade de medicamento vencido. Data de vencimento: ${dataVencimento.toLocaleDateString('pt-BR')}`);
                    }
                    if (diferenca > 0) {
                        // Aumentou a quantidade, verificar se tem estoque
                        // Considerar que a quantidade já retirada está disponível para aumentar
                        const estoqueTotalDisponivel = lote.qtde + retiradaAtual.qtde;
                        if (estoqueTotalDisponivel < data.qtde) {
                            throw new Error(`Quantidade insuficiente. Disponível: ${estoqueTotalDisponivel} (${lote.qtde} atual + ${retiradaAtual.qtde} já retirado)`);
                        }
                        yield tx.lotes.update({
                            where: { id: retiradaAtual.id_lotes },
                            data: {
                                qtde: {
                                    decrement: diferenca
                                }
                            }
                        });
                    }
                    else {
                        // Diminuiu a quantidade, reverter a diferença
                        yield tx.lotes.update({
                            where: { id: retiradaAtual.id_lotes },
                            data: {
                                qtde: {
                                    increment: Math.abs(diferenca)
                                }
                            }
                        });
                    }
                }
                // Atualizar retirada
                const retirada = yield tx.retiradas.update({
                    where: { id },
                    data: {
                        qtde: data.qtde !== undefined ? data.qtde : retiradaAtual.qtde,
                        id_lotes: data.id_lotes !== undefined ? data.id_lotes : retiradaAtual.id_lotes,
                        id_pacientes: data.id_pacientes !== undefined ? data.id_pacientes : retiradaAtual.id_pacientes,
                        modified: new Date()
                    },
                    include: {
                        lotes: {
                            include: {
                                medicamento: true,
                                formaFarmaceutica: true,
                                tipoMedicamento: true
                            }
                        },
                        paciente: true,
                        user: {
                            select: {
                                id: true,
                                username: true,
                                email: true
                            }
                        }
                    }
                });
                return retirada;
            }));
            return result;
        });
    }
}
exports.UpdateRetiradaModel = UpdateRetiradaModel;
//Modelo de deletar retirada (reverter estoque)
class DeleteRetiradaModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const retirada = yield prisma_1.default.retiradas.findUnique({
                where: { id },
                include: {
                    lotes: true
                }
            });
            if (!retirada) {
                throw new Error("Retirada não encontrada");
            }
            // Transação: deletar retirada e reverter estoque
            yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // Reverter quantidade do lote
                yield tx.lotes.update({
                    where: { id: retirada.id_lotes },
                    data: {
                        qtde: {
                            increment: retirada.qtde
                        }
                    }
                });
                // Deletar retirada
                yield tx.retiradas.delete({
                    where: { id }
                });
            }));
            return { message: "Retirada excluída com sucesso e estoque revertido" };
        });
    }
}
exports.DeleteRetiradaModel = DeleteRetiradaModel;
