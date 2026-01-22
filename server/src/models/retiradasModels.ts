import prismaClient from "../tools/prisma";
import type { PrismaClient } from "../tools/generated/prisma";

interface IRetirada {
    qtde: number;
    id_users: number;
    id_lotes: number;
    id_pacientes: number;
}

//Modelo de criar retirada (com transação para atualizar estoque)
class CreateRetiradaModel {
    async execute({ qtde, id_users, id_lotes, id_pacientes }: IRetirada) {
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
        const user = await prismaClient.users.findUnique({
            where: { id: id_users }
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
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
        const result = await prismaClient.$transaction(async (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => {
            // Criar retirada
            const retirada = await tx.retiradas.create({
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
            await tx.lotes.update({
                where: { id: id_lotes },
                data: {
                    qtde: {
                        decrement: qtde
                    }
                }
            });

            return retirada;
        });

        return result;
    }
}

//Modelo de listar retiradas
class ListRetiradasModel {
    async execute() {
        const retiradas = await prismaClient.retiradas.findMany({
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
        });

        return retiradas;
    }
}

//Modelo de buscar retirada por ID
class GetRetiradaModel {
    async execute(id: number) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const retirada = await prismaClient.retiradas.findUnique({
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
    }
}

interface IUpdateRetirada {
    qtde?: number;
    id_lotes?: number;
    id_pacientes?: number;
}

//Modelo de atualizar retirada (ajustar estoque se necessário)
class UpdateRetiradaModel {
    async execute(id: number, data: IUpdateRetirada) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const retiradaAtual = await prismaClient.retiradas.findUnique({
            where: { id },
            include: {
                lotes: true
            }
        });

        if (!retiradaAtual) {
            throw new Error("Retirada não encontrada");
        }

        // Transação: atualizar retirada e ajustar estoque
        const result = await prismaClient.$transaction(async (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => {
            // Se a quantidade ou lote mudou, precisamos ajustar o estoque
            const qtdeMudou = data.qtde !== undefined && data.qtde !== retiradaAtual.qtde;
            const loteMudou = data.id_lotes !== undefined && data.id_lotes !== retiradaAtual.id_lotes;

            if (loteMudou) {
                // Se mudou o lote, reverter o estoque do lote antigo e verificar o novo
                await tx.lotes.update({
                    where: { id: retiradaAtual.id_lotes },
                    data: {
                        qtde: {
                            increment: retiradaAtual.qtde
                        }
                    }
                });

                // Verificar novo lote
                const novoLote = await tx.lotes.findUnique({
                    where: { id: data.id_lotes! }
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
                await tx.lotes.update({
                    where: { id: data.id_lotes! },
                    data: {
                        qtde: {
                            decrement: qtdeFinal
                        }
                    }
                });
            } else if (qtdeMudou) {
                // Se só a quantidade mudou, ajustar a diferença
                const diferenca = data.qtde! - retiradaAtual.qtde;
                const lote = await tx.lotes.findUnique({
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
                    if (estoqueTotalDisponivel < data.qtde!) {
                        throw new Error(`Quantidade insuficiente. Disponível: ${estoqueTotalDisponivel} (${lote.qtde} atual + ${retiradaAtual.qtde} já retirado)`);
                    }
                    await tx.lotes.update({
                        where: { id: retiradaAtual.id_lotes },
                        data: {
                            qtde: {
                                decrement: diferenca
                            }
                        }
                    });
                } else {
                    // Diminuiu a quantidade, reverter a diferença
                    await tx.lotes.update({
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
            const retirada = await tx.retiradas.update({
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
        });

        return result;
    }
}

//Modelo de deletar retirada (reverter estoque)
class DeleteRetiradaModel {
    async execute(id: number) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const retirada = await prismaClient.retiradas.findUnique({
            where: { id },
            include: {
                lotes: true
            }
        });

        if (!retirada) {
            throw new Error("Retirada não encontrada");
        }

        // Transação: deletar retirada e reverter estoque
        await prismaClient.$transaction(async (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => {
            // Reverter quantidade do lote
            await tx.lotes.update({
                where: { id: retirada.id_lotes },
                data: {
                    qtde: {
                        increment: retirada.qtde
                    }
                }
            });

            // Deletar retirada
            await tx.retiradas.delete({
                where: { id }
            });
        });

        return { message: "Retirada excluída com sucesso e estoque revertido" };
    }
}

export { CreateRetiradaModel, ListRetiradasModel, GetRetiradaModel, UpdateRetiradaModel, DeleteRetiradaModel }

