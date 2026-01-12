import { Request, Response } from "express";
import { CreatePacienteModel, ListPacientesModel, GetPacienteModel, UpdatePacienteModel, DeletePacienteModel } from "../models/pacientesModels";

class CreatePacienteController {
    async handle(req: Request, res: Response) {
        try {
            const { nome, cpf, datanascimento, telefone, cartaosus } = req.body;

            const createPacienteModel = new CreatePacienteModel();
            const paciente = await createPacienteModel.execute({
                nome,
                cpf,
                datanascimento,
                telefone,
                cartaosus
            });

            return res.status(201).json(paciente);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class ListPacientesController {
    async handle(req: Request, res: Response) {
        try {
            const listPacientesModel = new ListPacientesModel();
            const pacientes = await listPacientesModel.execute();

            return res.status(200).json(pacientes);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class GetPacienteController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const getPacienteModel = new GetPacienteModel();
            const paciente = await getPacienteModel.execute(parseInt(id));

            return res.status(200).json(paciente);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }
}

class UpdatePacienteController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;

            const updatePacienteModel = new UpdatePacienteModel();
            const paciente = await updatePacienteModel.execute(parseInt(id), data);

            return res.status(200).json(paciente);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class DeletePacienteController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deletePacienteModel = new DeletePacienteModel();
            const result = await deletePacienteModel.execute(parseInt(id));

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreatePacienteController, ListPacientesController, GetPacienteController, UpdatePacienteController, DeletePacienteController }

