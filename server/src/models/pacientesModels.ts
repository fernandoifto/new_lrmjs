import prismaClient from "../tools/prisma";

interface IPaciente {
    nome: string;
    cpf: string;
    datanascimento: string;
    telefone: string;
    cartaosus: string;
}

interface IUpdatePaciente {
    nome?: string;
    cpf?: string;
    datanascimento?: string;
    telefone?: string;
    cartaosus?: string;
}

//Modelo de criar paciente
class CreatePacienteModel {
    async execute({ nome, cpf, datanascimento, telefone, cartaosus }: IPaciente) {
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
        const pacienteExistente = await prismaClient.pacientes.findFirst({
            where: { cpf: cpf.trim() }
        });

        if (pacienteExistente) {
            throw new Error("CPF já cadastrado");
        }

        const paciente = await prismaClient.pacientes.create({
            data: {
                nome: nome.trim(),
                cpf: cpf.trim(),
                datanascimento: new Date(datanascimento),
                telefone: telefone.trim(),
                cartaosus: cartaosus.trim()
            }
        });

        return paciente;
    }
}

//Modelo de listar pacientes
class ListPacientesModel {
    async execute() {
        const pacientes = await prismaClient.pacientes.findMany({
            orderBy: {
                nome: 'asc'
            }
        });

        return pacientes;
    }
}

//Modelo de buscar paciente por ID
class GetPacienteModel {
    async execute(id: number) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const paciente = await prismaClient.pacientes.findUnique({
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
    }
}

//Modelo de atualizar paciente
class UpdatePacienteModel {
    async execute(id: number, data: IUpdatePaciente) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const paciente = await prismaClient.pacientes.findUnique({
            where: { id }
        });

        if (!paciente) {
            throw new Error("Paciente não encontrado");
        }

        const updateData: any = {};

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
            const pacienteExistente = await prismaClient.pacientes.findFirst({
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

        const pacienteAtualizado = await prismaClient.pacientes.update({
            where: { id },
            data: updateData
        });

        return pacienteAtualizado;
    }
}

//Modelo de deletar paciente
class DeletePacienteModel {
    async execute(id: number) {
        if (!id) {
            throw new Error("ID é obrigatório");
        }

        const paciente = await prismaClient.pacientes.findUnique({
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

        await prismaClient.pacientes.delete({
            where: { id }
        });

        return { message: "Paciente excluído com sucesso" };
    }
}

export { CreatePacienteModel, ListPacientesModel, GetPacienteModel, UpdatePacienteModel, DeletePacienteModel }

