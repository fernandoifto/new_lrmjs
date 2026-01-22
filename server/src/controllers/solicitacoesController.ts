import { Request, Response } from "express";
import { CreateSolicitacaoModel, ListSolicitacoesModel, GetSolicitacaoModel, ConfirmarSolicitacaoModel, RecusarSolicitacaoModel, DeleteSolicitacaoModel, ListSolicitacoesByPacienteModel } from "../models/solicitacoesModels";
import { uploadSingleReceita } from "../middlewares/upload";

class CreateSolicitacaoController {
    async handle(req: Request, res: Response) {
        try {
            // Processar upload de foto da receita primeiro
            uploadSingleReceita(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ error: err.message });
                }

                try {
                    const { qtde, id_lotes, id_pacientes } = req.body;
                    
                    // Converter para números
                    const idLotes = parseInt(id_lotes);
                    const idPacientes = parseInt(id_pacientes);
                    const quantidade = parseInt(qtde);
                    
                    if (isNaN(idLotes) || isNaN(idPacientes) || isNaN(quantidade)) {
                        return res.status(400).json({ error: "IDs e quantidade devem ser números válidos" });
                    }
                    
                    // Processar foto da receita enviada
                    let fotoReceitaUrl: string | undefined = undefined;
                    if (req.file) {
                        // Retornar URL relativa para acesso
                        fotoReceitaUrl = `/uploads/receitas/${req.file.filename}`;
                    }

                    if (!fotoReceitaUrl) {
                        return res.status(400).json({ error: "Foto da receita médica é obrigatória" });
                    }

                    const createSolicitacaoModel = new CreateSolicitacaoModel();
                    const solicitacao = await createSolicitacaoModel.execute({
                        qtde: quantidade,
                        id_lotes: idLotes,
                        id_pacientes: idPacientes,
                        status: 'pendente_de_aprovacao',
                        foto_receita: fotoReceitaUrl
                    });

                    return res.status(201).json(solicitacao);
                } catch (error: any) {
                    return res.status(400).json({ error: error.message });
                }
            });
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
