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
import { CreatePermissaoController, ListPermissoesController, GetPermissaoController, UpdatePermissaoController, DeletePermissaoController } from "./controllers/permissoesController";
import { CreateRoleController, ListRolesController, GetRoleController, UpdateRoleController, DeleteRoleController, UpdateRolePermissoesController, GetUserPermissoesController } from "./controllers/rolesController";
import { UpdateUserGruposController } from "./controllers/userGruposController";
import { isAuthenticated } from "./middlewares/isAutenticated";
import { hasPermission } from "./middlewares/hasPermission";

const router = Router();

//Rotas de agendamentos
router.post("/agendamento", new CreateAgendamentosController().handle); // Rota pública para criação de agendamentos
router.get("/agendamentos", isAuthenticated, hasPermission("agendamentos.ver"), new ListAgendamentosController().handle);
router.get("/agendamento/:id", isAuthenticated, hasPermission("agendamentos.ver"), new GetAgendamentoController().handle);
router.put("/agendamento/:id", isAuthenticated, hasPermission("agendamentos.editar"), new UpdateAgendamentoController().handle);
router.patch("/agendamento/:id/visitar", isAuthenticated, hasPermission("agendamentos.visitar"), new MarcarVisitadoController().handle);
router.delete("/agendamento/:id", isAuthenticated, hasPermission("agendamentos.excluir"), new DeleteAgendamentoController().handle);

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
router.put("/user/:id/grupos", isAuthenticated, new UpdateUserGruposController().handle);

//Rotas de tipos de medicamentos
router.post("/tipo-medicamento", isAuthenticated, hasPermission("tipos_medicamentos.criar"), new CreateTipoMedicamentoController().handle);
router.get("/tipos-medicamentos", isAuthenticated, hasPermission("tipos_medicamentos.ver"), new ListTiposMedicamentosController().handle);
router.get("/tipo-medicamento/:id", isAuthenticated, hasPermission("tipos_medicamentos.ver"), new GetTipoMedicamentoController().handle);
router.put("/tipo-medicamento/:id", isAuthenticated, hasPermission("tipos_medicamentos.editar"), new UpdateTipoMedicamentoController().handle);
router.delete("/tipo-medicamento/:id", isAuthenticated, hasPermission("tipos_medicamentos.excluir"), new DeleteTipoMedicamentoController().handle);

//Rotas de formas farmacêuticas
router.post("/forma-farmaceutica", isAuthenticated, hasPermission("formas_farmaceuticas.criar"), new CreateFormaFarmaceuticaController().handle);
router.get("/formas-farmaceuticas", isAuthenticated, hasPermission("formas_farmaceuticas.ver"), new ListFormasFarmaceuticasController().handle);
router.get("/forma-farmaceutica/:id", isAuthenticated, hasPermission("formas_farmaceuticas.ver"), new GetFormaFarmaceuticaController().handle);
router.put("/forma-farmaceutica/:id", isAuthenticated, hasPermission("formas_farmaceuticas.editar"), new UpdateFormaFarmaceuticaController().handle);
router.delete("/forma-farmaceutica/:id", isAuthenticated, hasPermission("formas_farmaceuticas.excluir"), new DeleteFormaFarmaceuticaController().handle);

//Rotas de medicamentos
router.post("/medicamento", isAuthenticated, hasPermission("medicamentos.criar"), new CreateMedicamentoController().handle);
router.get("/medicamentos", isAuthenticated, hasPermission("medicamentos.ver"), new ListMedicamentosController().handle);
router.get("/medicamento/:id", isAuthenticated, hasPermission("medicamentos.ver"), new GetMedicamentoController().handle);
router.put("/medicamento/:id", isAuthenticated, hasPermission("medicamentos.editar"), new UpdateMedicamentoController().handle);
router.delete("/medicamento/:id", isAuthenticated, hasPermission("medicamentos.excluir"), new DeleteMedicamentoController().handle);

//Rotas de lotes
router.post("/lote", isAuthenticated, hasPermission("lotes.criar"), new CreateLoteController().handle);
router.get("/lotes", isAuthenticated, hasPermission("lotes.ver"), new ListLotesController().handle);
router.get("/lote/:id", isAuthenticated, hasPermission("lotes.ver"), new GetLoteController().handle);
router.put("/lote/:id", isAuthenticated, hasPermission("lotes.editar"), new UpdateLoteController().handle);
router.delete("/lote/:id", isAuthenticated, hasPermission("lotes.excluir"), new DeleteLoteController().handle);

//Rotas de pacientes
router.post("/paciente", isAuthenticated, hasPermission("pacientes.criar"), new CreatePacienteController().handle);
router.get("/pacientes", isAuthenticated, hasPermission("pacientes.ver"), new ListPacientesController().handle);
router.get("/paciente/:id", isAuthenticated, hasPermission("pacientes.ver"), new GetPacienteController().handle);
router.put("/paciente/:id", isAuthenticated, hasPermission("pacientes.editar"), new UpdatePacienteController().handle);
router.delete("/paciente/:id", isAuthenticated, hasPermission("pacientes.excluir"), new DeletePacienteController().handle);

//Rotas de retiradas
router.post("/retirada", isAuthenticated, hasPermission("retiradas.criar"), new CreateRetiradaController().handle);
router.get("/retiradas", isAuthenticated, hasPermission("retiradas.ver"), new ListRetiradasController().handle);
router.get("/retirada/:id", isAuthenticated, hasPermission("retiradas.ver"), new GetRetiradaController().handle);
router.put("/retirada/:id", isAuthenticated, hasPermission("retiradas.editar"), new UpdateRetiradaController().handle);
router.delete("/retirada/:id", isAuthenticated, hasPermission("retiradas.excluir"), new DeleteRetiradaController().handle);

//Rotas de permissões
router.post("/permissao", isAuthenticated, new CreatePermissaoController().handle);
router.get("/permissoes", isAuthenticated, new ListPermissoesController().handle);
router.get("/permissao/:id", isAuthenticated, new GetPermissaoController().handle);
router.put("/permissao/:id", isAuthenticated, new UpdatePermissaoController().handle);
router.delete("/permissao/:id", isAuthenticated, new DeletePermissaoController().handle);

//Rotas de roles
router.post("/role", isAuthenticated, new CreateRoleController().handle);
router.get("/roles", isAuthenticated, new ListRolesController().handle);
router.get("/role/:id", isAuthenticated, new GetRoleController().handle);
router.put("/role/:id", isAuthenticated, new UpdateRoleController().handle);
router.delete("/role/:id", isAuthenticated, new DeleteRoleController().handle);
router.put("/role/:id/permissoes", isAuthenticated, new UpdateRolePermissoesController().handle);

//Rotas de permissões do usuário
router.get("/user-permissoes", isAuthenticated, new GetUserPermissoesController().handle);

export default router;