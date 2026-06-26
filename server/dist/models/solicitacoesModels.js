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
exports.ListSolicitacoesByPacienteModel = exports.DeleteSolicitacaoModel = exports.RecusarSolicitacaoModel = exports.ConcluirDoacaoModel = exports.ConfirmarSolicitacaoModel = exports.GetSolicitacaoModel = exports.ListSolicitacoesModel = exports.CreateSolicitacaoModel = void 0;
const prisma_1 = __importDefault(require("../tools/prisma"));
//Modelo de criar solicitação (pré-retirada)
class CreateSolicitacaoModel {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ qtde, id_lotes, id_pacientes, status = 'pendente_de_aprovacao', foto_receita }) {
            if (!qtde || qtde <= 0) {
                throw new Error("Quantidade deve ser maior que zero");
            }
            if (!id_lotes) {
                throw new Error("ID do lote é obrigatório");
            }
            if (!id_pacientes) {
                throw new Error("ID do paciente é obrigatório");
            }
            if (!foto_receita) {
                throw new Error("Foto da receita médica é obrigatória");
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
                where: { id: id_lotes },
                include: {
                    medicamento: true,
                    formaFarmaceutica: true,
                    tipoMedicamento: true
                }
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
                throw new Error(`Não é possível solicitar medicamento vencido. Data de vencimento: ${dataVencimento.toLocaleDateString('pt-BR')}`);
            }
            if (lote.qtde < qtde) {
                throw new Error(`Quantidade insuficiente. Disponível: ${lote.qtde}`);
            }
            // Criar solicitação (não decrementa estoque ainda)
            const solicitacao = yield prisma_1.default.solicitacoes.create({
                data: {
                    qtde,
                    id_lotes,
                    id_pacientes,
                    status: status,
                    foto_receita: foto_receita || null,
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
                    paciente: true
                }
            });
            return solicitacao;
        });
    }
}
exports.CreateSolicitacaoModel = CreateSolicitacaoModel;
//Modelo de listar solicitações
class ListSolicitacoesModel {
    execute(status, p, search) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const andParts = [];
            if (status) {
                andParts.push({ status });
            }
            const q = search === null || search === void 0 ? void 0 : search.trim();
            if (q) {
                const digits = q.replace(/\D/g, "");
                const pacienteOr = [
                    { nome: { contains: q, mode: "insensitive" } },
                ];
                if (digits.length > 0) {
                    pacienteOr.push({ cpf: { contains: digits } });
                }
                andParts.push({
                    OR: [
                        { paciente: { OR: pacienteOr } },
                        { lotes: { numero: { contains: q, mode: "insensitive" } } },
                        { lotes: { medicamento: { descricao: { contains: q, mode: "insensitive" } } } },
                    ],
                });
            }
            const where = andParts.length > 0 ? { AND: andParts } : {};
            const include = {
                lotes: {
                    include: {
                        medicamento: true,
                        formaFarmaceutica: true,
                        tipoMedicamento: true
                    }
                },
                paciente: true
            };
            const orderBy = { created: "desc" };
            const [total, items] = yield Promise.all([
                prisma_1.default.solicitacoes.count({ where }),
                prisma_1.default.solicitacoes.findMany({
                    where,
                    include,
                    orderBy,
                    skip: p.skip,
                    take: p.take,
                }),
            ]);
            return { items, total };
        });
    }
}
exports.ListSolicitacoesModel = ListSolicitacoesModel;
//Modelo de buscar solicitação por ID
class GetSolicitacaoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const solicitacao = yield prisma_1.default.solicitacoes.findUnique({
                where: { id },
                include: {
                    lotes: {
                        include: {
                            medicamento: true,
                            formaFarmaceutica: true,
                            tipoMedicamento: true
                        }
                    },
                    paciente: true
                }
            });
            if (!solicitacao) {
                throw new Error("Solicitação não encontrada");
            }
            return solicitacao;
        });
    }
}
exports.GetSolicitacaoModel = GetSolicitacaoModel;
//Modelo de confirmar solicitação (apenas aprova para retirada, sem criar retirada nem atualizar estoque)
class ConfirmarSolicitacaoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const solicitacao = yield prisma_1.default.solicitacoes.findUnique({
                where: { id },
                include: {
                    lotes: true,
                    paciente: true
                }
            });
            if (!solicitacao) {
                throw new Error("Solicitação não encontrada");
            }
            if (solicitacao.status !== 'pendente_de_aprovacao') {
                throw new Error(`Solicitação já foi ${solicitacao.status}`);
            }
            // Verificar se ainda há estoque disponível
            const lote = yield prisma_1.default.lotes.findUnique({
                where: { id: solicitacao.id_lotes }
            });
            if (!lote) {
                throw new Error("Lote não encontrado");
            }
            if (lote.qtde < solicitacao.qtde) {
                throw new Error(`Quantidade insuficiente. Disponível: ${lote.qtde}`);
            }
            // Apenas marcar solicitação como aprovado para retirada (sem criar retirada nem atualizar estoque)
            const solicitacaoAtualizada = yield prisma_1.default.solicitacoes.update({
                where: { id },
                data: {
                    status: 'aprovado_para_retirada',
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
                    paciente: true
                }
            });
            return solicitacaoAtualizada;
        });
    }
}
exports.ConfirmarSolicitacaoModel = ConfirmarSolicitacaoModel;
//Modelo de concluir doação (cria retirada, decrementa estoque e marca como concluída)
class ConcluirDoacaoModel {
    execute(id, id_users) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            if (!id_users) {
                throw new Error("ID do usuário é obrigatório");
            }
            const solicitacao = yield prisma_1.default.solicitacoes.findUnique({
                where: { id },
                include: {
                    lotes: true,
                    paciente: true
                }
            });
            if (!solicitacao) {
                throw new Error("Solicitação não encontrada");
            }
            if (solicitacao.status !== 'aprovado_para_retirada') {
                throw new Error(`Solicitação deve estar aprovada para retirada. Status atual: ${solicitacao.status}`);
            }
            // Verificar se ainda há estoque disponível
            const lote = yield prisma_1.default.lotes.findUnique({
                where: { id: solicitacao.id_lotes }
            });
            if (!lote) {
                throw new Error("Lote não encontrado");
            }
            if (lote.qtde < solicitacao.qtde) {
                throw new Error(`Quantidade insuficiente. Disponível: ${lote.qtde}`);
            }
            // Transação: criar retirada, atualizar estoque e marcar solicitação como retirada concluída
            const result = yield prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                // Criar retirada
                const retirada = yield tx.retiradas.create({
                    data: {
                        qtde: solicitacao.qtde,
                        id_users,
                        id_lotes: solicitacao.id_lotes,
                        id_pacientes: solicitacao.id_pacientes,
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
                    where: { id: solicitacao.id_lotes },
                    data: {
                        qtde: {
                            decrement: solicitacao.qtde
                        }
                    }
                });
                // Marcar solicitação como retirada concluída
                yield tx.solicitacoes.update({
                    where: { id },
                    data: {
                        status: 'retirada_concluida',
                        modified: new Date()
                    }
                });
                return retirada;
            }));
            return result;
        });
    }
}
exports.ConcluirDoacaoModel = ConcluirDoacaoModel;
//Modelo de recusar solicitação
class RecusarSolicitacaoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const solicitacao = yield prisma_1.default.solicitacoes.findUnique({
                where: { id }
            });
            if (!solicitacao) {
                throw new Error("Solicitação não encontrada");
            }
            if (solicitacao.status !== 'pendente_de_aprovacao') {
                throw new Error(`Solicitação já foi ${solicitacao.status}`);
            }
            const solicitacaoAtualizada = yield prisma_1.default.solicitacoes.update({
                where: { id },
                data: {
                    status: 'recusada',
                    modified: new Date()
                }
            });
            return solicitacaoAtualizada;
        });
    }
}
exports.RecusarSolicitacaoModel = RecusarSolicitacaoModel;
//Modelo de deletar solicitação
class DeleteSolicitacaoModel {
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id) {
                throw new Error("ID é obrigatório");
            }
            const solicitacao = yield prisma_1.default.solicitacoes.findUnique({
                where: { id }
            });
            if (!solicitacao) {
                throw new Error("Solicitação não encontrada");
            }
            if (solicitacao.status === 'aprovado_para_retirada' || solicitacao.status === 'retirada_concluida') {
                throw new Error("Não é possível excluir uma solicitação aprovada ou com retirada concluída");
            }
            yield prisma_1.default.solicitacoes.delete({
                where: { id }
            });
            return { message: "Solicitação excluída com sucesso" };
        });
    }
}
exports.DeleteSolicitacaoModel = DeleteSolicitacaoModel;
//Modelo de listar solicitações por paciente
class ListSolicitacoesByPacienteModel {
    execute(id_pacientes, p) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id_pacientes) {
                throw new Error("ID do paciente é obrigatório");
            }
            const where = { id_pacientes: id_pacientes };
            const include = {
                lotes: {
                    include: {
                        medicamento: true,
                        formaFarmaceutica: true,
                        tipoMedicamento: true
                    }
                },
                paciente: true
            };
            const orderBy = { created: "desc" };
            const [total, items] = yield Promise.all([
                prisma_1.default.solicitacoes.count({ where }),
                prisma_1.default.solicitacoes.findMany({
                    where,
                    include,
                    orderBy,
                    skip: p.skip,
                    take: p.take,
                }),
            ]);
            return { items, total };
        });
    }
}
exports.ListSolicitacoesByPacienteModel = ListSolicitacoesByPacienteModel;
