import { Request, Response } from "express";
import { CreateSolicitacaoModel, ListSolicitacoesModel, GetSolicitacaoModel, ConfirmarSolicitacaoModel, RecusarSolicitacaoModel, DeleteSolicitacaoModel, ListSolicitacoesByPacienteModel } from "../models/solicitacoesModels";

class CreateSolicitacaoController {
    async handle(req: Request, res: Response) {
        try {
            const { qtde, id_lotes, id_pacientes } = req.body;

            const createSolicitacaoModel = new CreateSolicitacaoModel();
            const solicitacao = await createSolicitacaoModel.execute({
                qtde,
                id_lotes,
                id_pacientes,
                status: 'pendente'
            });

            return res.status(201).json(solicitacao);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class ListSolicitacoesController {
    async handle(req: Request, res: Response) {
        try {
            const { status } = req.query;
            const listSolicitacoesModel = new ListSolicitacoesModel();
            const solicitacoes = await listSolicitacoesModel.execute(status as string | undefined);

            return res.status(200).json(solicitacoes);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class GetSolicitacaoController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const getSolicitacaoModel = new GetSolicitacaoModel();
            const solicitacao = await getSolicitacaoModel.execute(parseInt(id));

            return res.status(200).json(solicitacao);
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }
}

class ConfirmarSolicitacaoController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const id_users = parseInt(req.query.userId as string);

            if (!id_users) {
                return res.status(401).json({ error: "Usuário não autenticado" });
            }

            const confirmarSolicitacaoModel = new ConfirmarSolicitacaoModel();
            const retirada = await confirmarSolicitacaoModel.execute(parseInt(id), id_users);

            return res.status(200).json(retirada);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class RecusarSolicitacaoController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const recusarSolicitacaoModel = new RecusarSolicitacaoModel();
            const solicitacao = await recusarSolicitacaoModel.execute(parseInt(id));

            return res.status(200).json(solicitacao);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class DeleteSolicitacaoController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const deleteSolicitacaoModel = new DeleteSolicitacaoModel();
            const result = await deleteSolicitacaoModel.execute(parseInt(id));

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class ListSolicitacoesByPacienteController {
    async handle(req: Request, res: Response) {
        try {
            const { paciente } = req.query;

            if (!paciente) {
                return res.status(400).json({ error: "ID do paciente é obrigatório" });
            }

            const listSolicitacoesByPacienteModel = new ListSolicitacoesByPacienteModel();
            const solicitacoes = await listSolicitacoesByPacienteModel.execute(parseInt(paciente as string));

            return res.status(200).json(solicitacoes);
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateSolicitacaoController, ListSolicitacoesController, GetSolicitacaoController, ConfirmarSolicitacaoController, RecusarSolicitacaoController, DeleteSolicitacaoController, ListSolicitacoesByPacienteController }
