import { Router } from "express";
import { CreateAgendamentosController, ListAgendamentosController, GetAgendamentoController, UpdateAgendamentoController, MarcarVisitadoController, DeleteAgendamentoController } from "./controllers/agendamentosController";
import { ListTurnosController } from "./controllers/turnosController";
import { AuthUserController, CreateUserController, DetailUserController, ForgotPasswordController, ResetPasswordController, ListUsersController, GetUserController, UpdateUserController, DeleteUserController } from "./controllers/usersController";
import { CreateTipoMedicamentoController, ListTiposMedicamentosController, GetTipoMedicamentoController, UpdateTipoMedicamentoController, DeleteTipoMedicamentoController } from "./controllers/tiposMedicamentosController";
import { CreateFormaFarmaceuticaController, ListFormasFarmaceuticasController, GetFormaFarmaceuticaController, UpdateFormaFarmaceuticaController, DeleteFormaFarmaceuticaController } from "./controllers/formasFarmaceuticasController";
import { CreateMedicamentoController, ListMedicamentosController, GetMedicamentoController, UpdateMedicamentoController, DeleteMedicamentoController } from "./controllers/medicamentosController";
import { CreateLoteController, ListLotesController, GetLoteController, UpdateLoteController, DeleteLoteController } from "./controllers/lotesController";
import { CreatePacienteController, ListPacientesController, GetPacienteController, UpdatePacienteController, DeletePacienteController } from "./controllers/pacientesController";
import { CreateRetiradaController, ListRetiradasController, GetRetiradaController, UpdateRetiradaController, DeleteRetiradaController } from "./controllers/retiradasController";
import { isAuthenticated } from "./middlewares/isAutenticated";

const router = Router();

//Rotas de agendamentos
router.post("/agendamento", new CreateAgendamentosController().handle);
router.get("/agendamentos", isAuthenticated, new ListAgendamentosController().handle);
router.get("/agendamento/:id", isAuthenticated, new GetAgendamentoController().handle);
router.put("/agendamento/:id", isAuthenticated, new UpdateAgendamentoController().handle);
router.patch("/agendamento/:id/visitar", isAuthenticated, new MarcarVisitadoController().handle);
router.delete("/agendamento/:id", isAuthenticated, new DeleteAgendamentoController().handle);

//Rotas de turnos
router.get("/turnos", new ListTurnosController().handle);

//Rotas de users
router.post("/auth", new AuthUserController().handle);
router.post("/user", new CreateUserController().handle);
router.get("/detail", isAuthenticated, new DetailUserController().handle);
router.post("/forgot-password", new ForgotPasswordController().handle);
router.post("/reset-password", new ResetPasswordController().handle);
router.get("/users", isAuthenticated, new ListUsersController().handle);
router.get("/user/:id", isAuthenticated, new GetUserController().handle);
router.put("/user/:id", isAuthenticated, new UpdateUserController().handle);
router.delete("/user/:id", isAuthenticated, new DeleteUserController().handle);

//Rotas de tipos de medicamentos
router.post("/tipo-medicamento", isAuthenticated, new CreateTipoMedicamentoController().handle);
router.get("/tipos-medicamentos", isAuthenticated, new ListTiposMedicamentosController().handle);
router.get("/tipo-medicamento/:id", isAuthenticated, new GetTipoMedicamentoController().handle);
router.put("/tipo-medicamento/:id", isAuthenticated, new UpdateTipoMedicamentoController().handle);
router.delete("/tipo-medicamento/:id", isAuthenticated, new DeleteTipoMedicamentoController().handle);

//Rotas de formas farmacêuticas
router.post("/forma-farmaceutica", isAuthenticated, new CreateFormaFarmaceuticaController().handle);
router.get("/formas-farmaceuticas", isAuthenticated, new ListFormasFarmaceuticasController().handle);
router.get("/forma-farmaceutica/:id", isAuthenticated, new GetFormaFarmaceuticaController().handle);
router.put("/forma-farmaceutica/:id", isAuthenticated, new UpdateFormaFarmaceuticaController().handle);
router.delete("/forma-farmaceutica/:id", isAuthenticated, new DeleteFormaFarmaceuticaController().handle);

//Rotas de medicamentos
router.post("/medicamento", isAuthenticated, new CreateMedicamentoController().handle);
router.get("/medicamentos", isAuthenticated, new ListMedicamentosController().handle);
router.get("/medicamento/:id", isAuthenticated, new GetMedicamentoController().handle);
router.put("/medicamento/:id", isAuthenticated, new UpdateMedicamentoController().handle);
router.delete("/medicamento/:id", isAuthenticated, new DeleteMedicamentoController().handle);

//Rotas de lotes
router.post("/lote", isAuthenticated, new CreateLoteController().handle);
router.get("/lotes", isAuthenticated, new ListLotesController().handle);
router.get("/lote/:id", isAuthenticated, new GetLoteController().handle);
router.put("/lote/:id", isAuthenticated, new UpdateLoteController().handle);
router.delete("/lote/:id", isAuthenticated, new DeleteLoteController().handle);

//Rotas de pacientes
router.post("/paciente", isAuthenticated, new CreatePacienteController().handle);
router.get("/pacientes", isAuthenticated, new ListPacientesController().handle);
router.get("/paciente/:id", isAuthenticated, new GetPacienteController().handle);
router.put("/paciente/:id", isAuthenticated, new UpdatePacienteController().handle);
router.delete("/paciente/:id", isAuthenticated, new DeletePacienteController().handle);

//Rotas de retiradas
router.post("/retirada", isAuthenticated, new CreateRetiradaController().handle);
router.get("/retiradas", isAuthenticated, new ListRetiradasController().handle);
router.get("/retirada/:id", isAuthenticated, new GetRetiradaController().handle);
router.put("/retirada/:id", isAuthenticated, new UpdateRetiradaController().handle);
router.delete("/retirada/:id", isAuthenticated, new DeleteRetiradaController().handle);

export default router;