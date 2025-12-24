import { Request, Response } from "express";
import { CreateAgendamentosModel } from "../models/agendamentosModels";

class CreateAgendamentosController{
    async handle(request: Request, response: Response) {
        const { nome, endereco, numero, setor, cep, telefone, datavisita, id_turno, id_user } = request.body;
        const createAgendamentos = new CreateAgendamentosModel();

        const agendamento = await createAgendamentos.execute({
            nome,
            endereco,
            numero,
            setor,
            cep,
            telefone,
            datavisita,
            id_turno,
            id_user
        });
        return response.status(201).json(agendamento);
    }
}

export { CreateAgendamentosController }