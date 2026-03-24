import { Request, Response } from "express";
import { CreateSolicitacaoModel, ListSolicitacoesModel, GetSolicitacaoModel, ConfirmarSolicitacaoModel, ConcluirDoacaoModel, RecusarSolicitacaoModel, DeleteSolicitacaoModel, ListSolicitacoesByPacienteModel } from "../models/solicitacoesModels";
import { uploadSingleReceita } from "../middlewares/upload";
import { verifyPacienteContextToken } from "../services/pacienteContextToken";
import {
    attachUploadTokensToSolicitacao,
    attachUploadTokensToSolicitacoes,
    stripFotoReceitaFromSolicitacoes,
} from "../utils/responseTransforms";

function readPacienteContextHeader(req: Request): string | undefined {
    const h = req.headers["x-paciente-context"];
    if (typeof h === "string") return h.trim();
    if (Array.isArray(h) && h[0]) return h[0].trim();
    return undefined;
}

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

                    const ctx = readPacienteContextHeader(req);
                    if (verifyPacienteContextToken(ctx) !== idPacientes) {
                        return res.status(403).json({ error: "Token de contexto do paciente inválido ou expirado" });
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

                    return res.status(201).json(attachUploadTokensToSolicitacao(solicitacao));
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

            return res.status(200).json(attachUploadTokensToSolicitacoes(solicitacoes));
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

            return res.status(200).json(attachUploadTokensToSolicitacao(solicitacao));
        } catch (error: any) {
            return res.status(404).json({ error: error.message });
        }
    }
}

class ConfirmarSolicitacaoController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const confirmarSolicitacaoModel = new ConfirmarSolicitacaoModel();
            const solicitacao = await confirmarSolicitacaoModel.execute(parseInt(id));

            return res.status(200).json(attachUploadTokensToSolicitacao(solicitacao));
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

class ConcluirDoacaoController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const id_users = parseInt(req.query.userId as string);

            if (!id_users) {
                return res.status(401).json({ error: "Usuário não autenticado" });
            }

            const concluirDoacaoModel = new ConcluirDoacaoModel();
            const retirada = await concluirDoacaoModel.execute(parseInt(id), id_users);

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

            return res.status(200).json(attachUploadTokensToSolicitacao(solicitacao));
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
            const listSolicitacoesByPacienteModel = new ListSolicitacoesByPacienteModel();
            const solicitacoes = await listSolicitacoesByPacienteModel.execute(parseInt(paciente as string));

            return res.status(200).json(stripFotoReceitaFromSolicitacoes(solicitacoes));
        } catch (error: any) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export { CreateSolicitacaoController, ListSolicitacoesController, GetSolicitacaoController, ConfirmarSolicitacaoController, ConcluirDoacaoController, RecusarSolicitacaoController, DeleteSolicitacaoController, ListSolicitacoesByPacienteController }
