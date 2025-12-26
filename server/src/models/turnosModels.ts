import prismaClient from "../tools/prisma";

//Interface do turno
interface ITurno {
    id: number;
    descricao: string;
}

//Modelo de buscar turnos
class ListTurnosModel{
    async execute() {
        const turnos = await prismaClient.turnos.findMany({
            orderBy: {
                descricao: 'asc'
            }
        });
        return turnos;
    }
}

export { ListTurnosModel }   