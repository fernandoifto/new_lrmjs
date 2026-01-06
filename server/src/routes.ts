import { Router } from "express";
import { CreateAgendamentosController } from "./controllers/agendamentosController";
import { ListTurnosController } from "./controllers/turnosController";
import { AuthUserController, CreateUserController, DetailUserController, ForgotPasswordController, ResetPasswordController } from "./controllers/usersController";
import { isAuthenticated } from "./middlewares/isAutenticated";

const router = Router();

//Rotas de agendamentos
router.post("/agendamento", new CreateAgendamentosController().handle);

//Rotas de turnos
router.get("/turnos", new ListTurnosController().handle);

//Rotas de users
router.post("/auth", new AuthUserController().handle);
router.post("/user", new CreateUserController().handle);
router.get("/detail", isAuthenticated, new DetailUserController().handle);
router.post("/forgot-password", new ForgotPasswordController().handle);
router.post("/reset-password", new ResetPasswordController().handle);

export default router;