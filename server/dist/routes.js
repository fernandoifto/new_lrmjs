"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agendamentosController_1 = require("./controllers/agendamentosController");
const turnosController_1 = require("./controllers/turnosController");
const usersController_1 = require("./controllers/usersController");
const tiposMedicamentosController_1 = require("./controllers/tiposMedicamentosController");
const formasFarmaceuticasController_1 = require("./controllers/formasFarmaceuticasController");
const medicamentosController_1 = require("./controllers/medicamentosController");
const lotesController_1 = require("./controllers/lotesController");
const pacientesController_1 = require("./controllers/pacientesController");
const retiradasController_1 = require("./controllers/retiradasController");
const solicitacoesController_1 = require("./controllers/solicitacoesController");
const permissoesController_1 = require("./controllers/permissoesController");
const rolesController_1 = require("./controllers/rolesController");
const userGruposController_1 = require("./controllers/userGruposController");
const whatsappController_1 = require("./controllers/whatsappController");
const isAutenticated_1 = require("./middlewares/isAutenticated");
const hasPermission_1 = require("./middlewares/hasPermission");
const isAdmin_1 = require("./middlewares/isAdmin");
const pacienteContext_1 = require("./middlewares/pacienteContext");
const rateLimits_1 = require("./middlewares/rateLimits");
const router = (0, express_1.Router)();
//Rotas de agendamentos
router.post("/agendamento", new agendamentosController_1.CreateAgendamentosController().handle); // Rota pública para criação de agendamentos
router.get("/agendamentos", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("agendamentos.ver"), new agendamentosController_1.ListAgendamentosController().handle);
router.get("/agendamento/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("agendamentos.ver"), new agendamentosController_1.GetAgendamentoController().handle);
router.put("/agendamento/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("agendamentos.editar"), new agendamentosController_1.UpdateAgendamentoController().handle);
router.patch("/agendamento/:id/status", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("agendamentos.editar"), new agendamentosController_1.AtualizarStatusAgendamentoController().handle);
router.patch("/agendamento/:id/visitar", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("agendamentos.visitar"), new agendamentosController_1.MarcarVisitadoController().handle);
router.delete("/agendamento/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("agendamentos.excluir"), new agendamentosController_1.DeleteAgendamentoController().handle);
//Rotas de turnos
router.get("/turnos", new turnosController_1.ListTurnosController().handle);
//Rotas de users
router.post("/auth", rateLimits_1.loginLimiter, new usersController_1.AuthUserController().handle);
router.post("/user", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new usersController_1.CreateUserController().handle);
router.get("/detail", isAutenticated_1.isAuthenticated, new usersController_1.DetailUserController().handle);
router.post("/forgot-password", rateLimits_1.passwordResetLimiter, new usersController_1.ForgotPasswordController().handle);
router.post("/reset-password", rateLimits_1.passwordResetLimiter, new usersController_1.ResetPasswordController().handle);
router.get("/users", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new usersController_1.ListUsersController().handle);
router.get("/user/:id", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new usersController_1.GetUserController().handle);
router.put("/user/:id", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new usersController_1.UpdateUserController().handle);
router.delete("/user/:id", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new usersController_1.DeleteUserController().handle);
router.put("/user/:id/grupos", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new userGruposController_1.UpdateUserGruposController().handle);
//Rotas de tipos de medicamentos
router.post("/tipo-medicamento", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("tipos_medicamentos.criar"), new tiposMedicamentosController_1.CreateTipoMedicamentoController().handle);
router.get("/tipos-medicamentos", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("tipos_medicamentos.ver"), new tiposMedicamentosController_1.ListTiposMedicamentosController().handle);
router.get("/tipo-medicamento/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("tipos_medicamentos.ver"), new tiposMedicamentosController_1.GetTipoMedicamentoController().handle);
router.put("/tipo-medicamento/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("tipos_medicamentos.editar"), new tiposMedicamentosController_1.UpdateTipoMedicamentoController().handle);
router.delete("/tipo-medicamento/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("tipos_medicamentos.excluir"), new tiposMedicamentosController_1.DeleteTipoMedicamentoController().handle);
//Rotas de formas farmacêuticas
router.post("/forma-farmaceutica", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("formas_farmaceuticas.criar"), new formasFarmaceuticasController_1.CreateFormaFarmaceuticaController().handle);
router.get("/formas-farmaceuticas", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("formas_farmaceuticas.ver"), new formasFarmaceuticasController_1.ListFormasFarmaceuticasController().handle);
router.get("/forma-farmaceutica/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("formas_farmaceuticas.ver"), new formasFarmaceuticasController_1.GetFormaFarmaceuticaController().handle);
router.put("/forma-farmaceutica/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("formas_farmaceuticas.editar"), new formasFarmaceuticasController_1.UpdateFormaFarmaceuticaController().handle);
router.delete("/forma-farmaceutica/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("formas_farmaceuticas.excluir"), new formasFarmaceuticasController_1.DeleteFormaFarmaceuticaController().handle);
//Rotas de medicamentos
router.post("/medicamento", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("medicamentos.criar"), new medicamentosController_1.CreateMedicamentoController().handle);
router.get("/medicamentos", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("medicamentos.ver"), new medicamentosController_1.ListMedicamentosController().handle);
router.get("/medicamento/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("medicamentos.ver"), new medicamentosController_1.GetMedicamentoController().handle);
router.put("/medicamento/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("medicamentos.editar"), new medicamentosController_1.UpdateMedicamentoController().handle);
router.delete("/medicamento/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("medicamentos.excluir"), new medicamentosController_1.DeleteMedicamentoController().handle);
//Rotas de lotes
router.post("/lote", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("lotes.criar"), new lotesController_1.CreateLoteController().handle);
router.get("/lotes", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("lotes.ver"), new lotesController_1.ListLotesController().handle);
router.get("/lotes-disponiveis", new lotesController_1.ListLotesDisponiveisController().handle); // Rota pública para lotes disponíveis
router.get("/lote/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("lotes.ver"), new lotesController_1.GetLoteController().handle);
router.put("/lote/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("lotes.editar"), new lotesController_1.UpdateLoteController().handle);
router.delete("/lote/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("lotes.excluir"), new lotesController_1.DeleteLoteController().handle);
//Rotas de pacientes
// Rota pública para cadastro de pacientes (usado em solicitações)
router.post("/paciente/public", rateLimits_1.publicDataLimiter, new pacientesController_1.CreatePacienteController().handle);
router.post("/paciente", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("pacientes.criar"), new pacientesController_1.CreatePacienteController().handle);
router.get("/pacientes", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("pacientes.ver"), new pacientesController_1.ListPacientesController().handle);
router.get("/paciente/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("pacientes.ver"), new pacientesController_1.GetPacienteController().handle);
router.get("/paciente/cpf/:cpf", rateLimits_1.publicDataLimiter, new pacientesController_1.GetPacienteByCPFController().handle); // Pública: retorna apenas id + token de contexto
router.put("/paciente/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("pacientes.editar"), new pacientesController_1.UpdatePacienteController().handle);
router.delete("/paciente/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("pacientes.excluir"), new pacientesController_1.DeletePacienteController().handle);
//Rotas de retiradas
router.post("/retirada", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.criar"), new retiradasController_1.CreateRetiradaController().handle);
router.get("/retiradas", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.ver"), new retiradasController_1.ListRetiradasController().handle);
router.get("/retirada/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.ver"), new retiradasController_1.GetRetiradaController().handle);
router.put("/retirada/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.editar"), new retiradasController_1.UpdateRetiradaController().handle);
router.delete("/retirada/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.excluir"), new retiradasController_1.DeleteRetiradaController().handle);
//Rotas de solicitações (pré-retiradas)
router.post("/solicitacao", rateLimits_1.publicDataLimiter, new solicitacoesController_1.CreateSolicitacaoController().handle); // Pública: exige X-Paciente-Context
router.get("/solicitacoes/paciente", rateLimits_1.publicDataLimiter, pacienteContext_1.requirePacienteContextQuery, new solicitacoesController_1.ListSolicitacoesByPacienteController().handle);
router.get("/solicitacoes", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.ver"), new solicitacoesController_1.ListSolicitacoesController().handle);
router.get("/solicitacao/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.ver"), new solicitacoesController_1.GetSolicitacaoController().handle);
router.post("/solicitacao/:id/confirmar", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.criar"), new solicitacoesController_1.ConfirmarSolicitacaoController().handle);
router.post("/solicitacao/:id/concluir", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.criar"), new solicitacoesController_1.ConcluirDoacaoController().handle);
router.post("/solicitacao/:id/recusar", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.editar"), new solicitacoesController_1.RecusarSolicitacaoController().handle);
router.delete("/solicitacao/:id", isAutenticated_1.isAuthenticated, (0, hasPermission_1.hasPermission)("retiradas.excluir"), new solicitacoesController_1.DeleteSolicitacaoController().handle);
//Rotas de permissões (somente admin)
router.post("/permissao", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new permissoesController_1.CreatePermissaoController().handle);
router.get("/permissoes", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new permissoesController_1.ListPermissoesController().handle);
router.get("/permissao/:id", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new permissoesController_1.GetPermissaoController().handle);
router.put("/permissao/:id", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new permissoesController_1.UpdatePermissaoController().handle);
router.delete("/permissao/:id", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new permissoesController_1.DeletePermissaoController().handle);
//Rotas de roles (somente admin)
router.post("/role", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new rolesController_1.CreateRoleController().handle);
router.get("/roles", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new rolesController_1.ListRolesController().handle);
router.get("/role/:id", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new rolesController_1.GetRoleController().handle);
router.put("/role/:id", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new rolesController_1.UpdateRoleController().handle);
router.delete("/role/:id", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new rolesController_1.DeleteRoleController().handle);
router.put("/role/:id/permissoes", isAutenticated_1.isAuthenticated, isAdmin_1.isAdmin, new rolesController_1.UpdateRolePermissoesController().handle);
//Rotas de permissões do usuário
router.get("/user-permissoes", isAutenticated_1.isAuthenticated, new rolesController_1.GetUserPermissoesController().handle);
//Rotas de WhatsApp
const whatsappController = new whatsappController_1.WhatsAppController();
router.get("/whatsapp/status", isAutenticated_1.isAuthenticated, whatsappController.getStatus.bind(whatsappController));
router.post("/whatsapp/send", isAutenticated_1.isAuthenticated, whatsappController.sendMessage.bind(whatsappController));
router.post("/whatsapp/initialize", isAutenticated_1.isAuthenticated, whatsappController.initialize.bind(whatsappController));
// Webhook do WhatsApp Business API (rotas públicas, validação feita internamente)
router.get("/whatsapp/webhook", whatsappController.verifyWebhook.bind(whatsappController));
router.post("/whatsapp/webhook", whatsappController.receiveWebhook.bind(whatsappController));
exports.default = router;
