import prismaClient from "../tools/prisma";

//Interface do agendamento
interface IAgendamento {
    nome: string;
    endereco: string;
    numero: string;
    setor: string;
    cep: string;
    telefone: string;
    datavisita: string;
    id_turno: number;
    id_user?: number;
}

//Modelo de criar agendamento
class CreateAgendamentosModel{
    async execute({ nome, endereco, numero, setor, cep, telefone, datavisita, id_turno, id_user }: 
        IAgendamento) {
        const agendamento = await prismaClient.agendamentos.create({
            data: {
                nome: nome,
                endereco: endereco,
                numero: numero,
                setor: setor,
                cep: cep,
                telefone: telefone,
                datavisita: datavisita,
                id_turno: id_turno,
                id_user: id_user
            }
        });
        return agendamento;
    }
}
export { CreateAgendamentosModel }

