import prismaClient from "../tools/prisma";
import type { ParsedPagination } from "../utils/pagination";

//Interface do turno
interface ITurno {
    id: number;
    descricao: string;
}

//Modelo de buscar turnos
class ListTurnosModel{
    async execute(p: ParsedPagination) {
        const orderBy = { descricao: 'asc' as const };
        const [total, items] = await Promise.all([
            prismaClient.turnos.count(),
            prismaClient.turnos.findMany({
                orderBy,
                skip: p.skip,
                take: p.take,
            }),
        ]);
        return { items, total };
    }
}

export { ListTurnosModel }   