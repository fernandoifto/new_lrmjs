import { Request, Response } from "express";
import { CreateAgendamentosModel, ListAgendamentosModel, GetAgendamentoModel, UpdateAgendamentoModel, MarcarVisitadoModel, DeleteAgendamentoModel } from "../models/agendamentosModels";
import { uploadMultiple } from "../middlewares/upload";

class CreateAgendamentosController{
    async handle(request: Request, response: Response) {
        try {
            // Processar upload de fotos primeiro
            uploadMultiple(request, response, async (err) => {
                if (err) {
                    return response.status(400).json({ error: err.message });
                }

                try {
                    const { nome, endereco, numero, setor, cep, telefone, datavisita, google_maps_url, id_turno, id_user } = request.body;
                    
                    // Processar fotos enviadas
                    let fotosJson: string | undefined = undefined;
                    if (request.files && Array.isArray(request.files) && request.files.length > 0) {
                        const fotosUrls = (request.files as Express.Multer.File[]).map(file => {
                            // Retornar URL relativa para acesso
                            return `/uploads/agendamentos/${file.filename}`;
                        });
                        fotosJson = JSON.stringify(fotosUrls);
                    }

                    const createAgendamentos = new CreateAgendamentosModel();

                    const agendamento = await createAgendamentos.execute({
                        nome,
                        endereco,
                        numero,
                        setor,
                        cep,
                        telefone,
                        datavisita,
                        fotos: fotosJson,
                        google_maps_url: google_maps_url || undefined,
                        id_turno: parseInt(id_turno),
                        id_user: id_user ? parseInt(id_user) : undefined
                    });
                    return response.status(201).json(agendamento);
                } catch (error: any) {
                    return response.status(400).json({ error: error.message });
                }
            });
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

class ListAgendamentosController {
    async handle(request: Request, response: Response) {
        try {
            const listAgendamentos = new ListAgendamentosModel();
            const agendamentos = await listAgendamentos.execute();
            return response.json(agendamentos);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

class GetAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const getAgendamento = new GetAgendamentoModel();
            const agendamento = await getAgendamento.execute(parseInt(id));
            return response.json(agendamento);
        } catch (error: any) {
            return response.status(404).json({ error: error.message });
        }
    }
}

class UpdateAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { nome, endereco, numero, setor, cep, telefone, datavisita, fotos, google_maps_url, id_turno, id_user } = request.body;
            const updateAgendamento = new UpdateAgendamentoModel();
            
            const agendamento = await updateAgendamento.execute(parseInt(id), {
                nome,
                endereco,
                numero,
                setor,
                cep,
                telefone,
                datavisita,
                fotos,
                google_maps_url: google_maps_url || undefined,
                id_turno: id_turno ? parseInt(id_turno) : undefined,
                id_user: id_user ? parseInt(id_user) : undefined
            });
            
            return response.json(agendamento);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

class MarcarVisitadoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const userId = request.query.userId as string;
            
            if (!userId) {
                return response.status(401).json({ error: "User ID not found" });
            }
            
            const marcarVisitado = new MarcarVisitadoModel();
            
            const agendamento = await marcarVisitado.execute(parseInt(id), parseInt(userId));
            
            return response.json(agendamento);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

class DeleteAgendamentoController {
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const deleteAgendamento = new DeleteAgendamentoModel();
            
            const result = await deleteAgendamento.execute(parseInt(id));
            
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({ error: error.message });
        }
    }
}

export { CreateAgendamentosController, ListAgendamentosController, GetAgendamentoController, UpdateAgendamentoController, MarcarVisitadoController, DeleteAgendamentoController }