import { Router } from "express";
import { CreateAgendamentosController, ListAgendamentosController, GetAgendamentoController, UpdateAgendamentoController, MarcarVisitadoController, DeleteAgendamentoController } from "./controllers/agendamentosController";
import { ListTurnosController } from "./controllers/turnosController";
import { AuthUserController, CreateUserController, DetailUserController, ForgotPasswordController, ResetPasswordController, ListUsersController, GetUserController, UpdateUserController, DeleteUserController } from "./controllers/usersController";
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

export default router;