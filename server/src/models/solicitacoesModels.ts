import prismaClient from "../tools/prisma";

interface ISolicitacao {
    qtde: number;
    id_lotes: number;
    id_pacientes: number;
    status?: string; // 'pendente', 'confirmada', 'recusada'
}

//Modelo de criar solicitação (pré-retirada)
class CreateSolicitacaoModel {
    async execute({ qtde, id_lotes, id_pacientes, status = 'pendente' }: ISolicitacao) {
        if (!qtde || qtde <= 0) {
            throw new Error("Quantidade deve ser maior que zero");
        }
        if (!id_lotes) {
            throw new Error("ID do lote é obrigatório");
        }
        if (!id_pacientes) {
            throw new Error("ID do paciente é obrigatório");
        }

        // Verificar se paciente existe
        const paciente = await prismaClient.pacientes.findUnique({
            where: { id: id_pacientes }
        });

        if (!paciente) {
            throw new Error("Paciente não encontrado");
        }

        // Verificar se lote existe e quantidade disponível
        const lote = await prismaClient.lotes.findUnique({
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
        const solicitacao = await prismaClient.solicitacoes.create({
            data: {
                qtde,
                id_lotes,
                id_pacientes,
                status: status,
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
    }
}

//Modelo de listar solicitações
class ListSolicitacoesModel {
    async execute(status?: string) {
        const where: any = {};
        if (status) {
            where.status = status;
        }

        const solicitacoes = await prismaClient.solicitacoes.findMany({
            where,
            include: {
                lotes: {
                    include: {
                        medicamento: true,
                        formaFarmaceutica: true,
                        tipoMedicamento: true
                    }
                },
                paciente: true
            },
            orderBy: {
                created: 'desc'
            }
        });

        return solicitacoes;
    }
}

//Modelo de buscar solicitação por ID
class GetSolicitacaoModel {
    async execute(id: number) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const solicitacao = await prismaClient.solicitacoes.findUnique({
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
    }
}

//Modelo de confirmar solicitação (cria retirada e decrementa estoque)
class ConfirmarSolicitacaoModel {
    async execute(id: number, id_users: number) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }
        if (!id_users) {
            throw new Error("ID do usuário é obrigatório");
        }

        const solicitacao = await prismaClient.solicitacoes.findUnique({
            where: { id },
            include: {
                lotes: true,
                paciente: true
            }
        });

        if (!solicitacao) {
            throw new Error("Solicitação não encontrada");
        }

        if (solicitacao.status !== 'pendente') {
            throw new Error(`Solicitação já foi ${solicitacao.status}`);
        }

        // Verificar se ainda há estoque disponível
        const lote = await prismaClient.lotes.findUnique({
            where: { id: solicitacao.id_lotes }
        });

        if (!lote) {
            throw new Error("Lote não encontrado");
        }

        if (lote.qtde < solicitacao.qtde) {
            throw new Error(`Quantidade insuficiente. Disponível: ${lote.qtde}`);
        }

        // Transação: criar retirada, atualizar estoque e marcar solicitação como confirmada
        const result = await prismaClient.$transaction(async (tx) => {
            // Criar retirada
            const retirada = await tx.retiradas.create({
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
            await tx.lotes.update({
                where: { id: solicitacao.id_lotes },
                data: {
                    qtde: {
                        decrement: solicitacao.qtde
                    }
                }
            });

            // Marcar solicitação como confirmada
            await tx.solicitacoes.update({
                where: { id },
                data: {
                    status: 'confirmada',
                    modified: new Date()
                }
            });

            return retirada;
        });

        return result;
    }
}

//Modelo de recusar solicitação
class RecusarSolicitacaoModel {
    async execute(id: number) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const solicitacao = await prismaClient.solicitacoes.findUnique({
            where: { id }
        });

        if (!solicitacao) {
            throw new Error("Solicitação não encontrada");
        }

        if (solicitacao.status !== 'pendente') {
            throw new Error(`Solicitação já foi ${solicitacao.status}`);
        }

        const solicitacaoAtualizada = await prismaClient.solicitacoes.update({
            where: { id },
            data: {
                status: 'recusada',
                modified: new Date()
            }
        });

        return solicitacaoAtualizada;
    }
}

//Modelo de deletar solicitação
class DeleteSolicitacaoModel {
    async execute(id: number) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const solicitacao = await prismaClient.solicitacoes.findUnique({
            where: { id }
        });

        if (!solicitacao) {
            throw new Error("Solicitação não encontrada");
        }

        if (solicitacao.status === 'confirmada') {
            throw new Error("Não é possível excluir uma solicitação confirmada");
        }

        await prismaClient.solicitacoes.delete({
            where: { id }
        });

        return { message: "Solicitação excluída com sucesso" };
    }
}

//Modelo de listar solicitações por paciente
class ListSolicitacoesByPacienteModel {
    async execute(id_pacientes: number) {
        if (!id_pacientes) {
            throw new Error("ID do paciente é obrigatório");
        }

        const solicitacoes = await prismaClient.solicitacoes.findMany({
            where: {
                id_pacientes: id_pacientes
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
            },
            orderBy: {
                created: 'desc'
            }
        });

        return solicitacoes;
    }
}

export { CreateSolicitacaoModel, ListSolicitacoesModel, GetSolicitacaoModel, ConfirmarSolicitacaoModel, RecusarSolicitacaoModel, DeleteSolicitacaoModel, ListSolicitacoesByPacienteModel }
